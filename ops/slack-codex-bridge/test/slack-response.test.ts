import assert from "node:assert/strict";
import test from "node:test";
import type { WebClient } from "@slack/web-api";

import { LIMITS } from "../src/constants.js";
import {
  SlackResponseSink,
  type ProgressRuntime,
} from "../src/slack-response.js";
import { invocation } from "./helpers.js";

type Posted = { channel: string; thread_ts?: string; text: string };
type Updated = { channel: string; ts: string; text: string };
type StreamRequest = {
  channel: string;
  thread_ts: string;
  recipient_team_id: string;
  recipient_user_id: string;
  buffer_size: number;
};

function fakeClient(
  options: {
    failStream?: boolean;
    failProgressPost?: boolean;
    failProgressUpdate?: boolean;
  } = {},
): {
  client: WebClient;
  posted: Posted[];
  updated: Updated[];
  streamed: string[];
  streamRequests: StreamRequest[];
} {
  const posted: Posted[] = [];
  const updated: Updated[] = [];
  const streamed: string[] = [];
  const streamRequests: StreamRequest[] = [];
  const client = {
    chat: {
      async postMessage(message: Posted) {
        posted.push(message);
        if (
          options.failProgressPost &&
          message.text.includes("Live progress (sanitized)")
        ) {
          throw new Error("rate-limited progress payload");
        }
        return { ok: true, ts: `posted-${posted.length}` };
      },
      async update(message: Updated) {
        updated.push(message);
        if (
          options.failProgressUpdate &&
          message.text.includes("Live progress (sanitized)")
        ) {
          throw new Error("rate-limited progress payload");
        }
        return { ok: true, ts: message.ts };
      },
    },
    chatStream(request: StreamRequest) {
      streamRequests.push(request);
      return {
        ts: "stream-1",
        async append(input: { markdown_text: string }) {
          if (options.failStream) {
            throw new Error("stream API failure");
          }
          streamed.push(input.markdown_text);
          return { ok: true };
        },
        async stop() {
          return { ok: true };
        },
      };
    },
  };
  return {
    client: client as unknown as WebClient,
    posted,
    updated,
    streamed,
    streamRequests,
  };
}

type FakeTimer = {
  at: number;
  callback: () => void;
};

class FakeProgressRuntime implements ProgressRuntime {
  private time = 0;
  private readonly timers = new Set<FakeTimer>();

  now(): number {
    return this.time;
  }

  setTimer(
    callback: () => void,
    delayMs: number,
  ): ReturnType<typeof setTimeout> {
    const timer = { at: this.time + delayMs, callback };
    this.timers.add(timer);
    return timer as unknown as ReturnType<typeof setTimeout>;
  }

  clearTimer(handle: ReturnType<typeof setTimeout>): void {
    this.timers.delete(handle as unknown as FakeTimer);
  }

  async advance(delayMs: number): Promise<void> {
    const target = this.time + delayMs;
    while (true) {
      const next = [...this.timers]
        .filter((timer) => timer.at <= target)
        .sort((left, right) => left.at - right.at)[0];
      if (next === undefined) {
        break;
      }
      this.time = next.at;
      this.timers.delete(next);
      next.callback();
      await new Promise((resolve) => setImmediate(resolve));
    }
    this.time = target;
    await new Promise((resolve) => setImmediate(resolve));
  }
}

test("uses the installed Slack streaming helper for bounded final responses", async () => {
  const slack = fakeClient();
  const sink = new SlackResponseSink(
    slack.client,
    invocation(),
    "ITECS.AI-CODEX",
    "corr-1",
  );
  await sink.progress({ kind: "turn", lifecycle: "started" });
  await sink.final("final response", "corr-1");
  assert.match(slack.streamed.join(""), /final response/);
  assert.match(slack.streamed.join(""), /corr-1/);
});

test("keeps top-level DM progress, controls, failures, and finals unthreaded", async () => {
  const slack = fakeClient();
  const topLevelDm = invocation({ threadTs: null });
  const sink = new SlackResponseSink(
    slack.client,
    topLevelDm,
    "ITECS.AI-CODEX",
    "corr-dm",
  );
  await sink.progress({ kind: "turn", lifecycle: "started" });
  await sink.notice("control notice");
  await sink.final("top-level final response", "corr-dm");

  const failedSlack = fakeClient();
  await new SlackResponseSink(
    failedSlack.client,
    topLevelDm,
    "ITECS.AI-CODEX",
    "corr-failure",
  ).failure("codex_failed", "corr-failure");

  assert.equal(slack.streamRequests.length, 0);
  assert.equal(slack.posted.length, 3);
  assert.ok(
    slack.posted.some((message) =>
      message.text.includes("top-level final response"),
    ),
  );
  for (const message of [...slack.posted, ...failedSlack.posted]) {
    assert.equal(Object.hasOwn(message, "thread_ts"), false);
  }
});

test("keeps explicit DM thread progress and final responses threaded", async () => {
  const slack = fakeClient();
  const threadTs = "1700000000.000099";
  const sink = new SlackResponseSink(
    slack.client,
    invocation({ threadTs }),
    "ITECS.AI-CODEX",
    "corr-thread",
  );
  await sink.progress({ kind: "turn", lifecycle: "started" });
  await sink.notice("control notice");
  await sink.final("threaded final response", "corr-thread");

  assert.ok(slack.posted.every((message) => message.thread_ts === threadTs));
  assert.equal(slack.streamRequests[0]?.thread_ts, threadTs);
  assert.match(slack.streamed.join(""), /threaded final response/);
});

test("keeps app mention progress and final responses threaded", async () => {
  const slack = fakeClient();
  const mentionTs = "1700000000.000200";
  const sink = new SlackResponseSink(
    slack.client,
    invocation({ eventType: "app_mention", threadTs: mentionTs }),
    "ITECS.AI-CODEX",
    "corr-mention",
  );
  await sink.progress({ kind: "turn", lifecycle: "started" });
  await sink.final("mention final response", "corr-mention");

  assert.equal(slack.posted[0]?.thread_ts, mentionTs);
  assert.equal(slack.streamRequests[0]?.thread_ts, mentionTs);
  assert.match(slack.streamed.join(""), /mention final response/);
});

test("makes a streaming API failure visible and delivers the final by fallback", async () => {
  const slack = fakeClient({ failStream: true });
  const sink = new SlackResponseSink(
    slack.client,
    invocation(),
    "ITECS.AI-CODEX",
    "corr-2",
  );
  await sink.progress({ kind: "turn", lifecycle: "started" });
  await sink.final("complete fallback response", "corr-2");
  assert.ok(
    slack.updated.some((message) =>
      message.text.includes("Streaming delivery failed"),
    ),
  );
  assert.ok(
    slack.posted.some((message) =>
      message.text.includes("complete fallback response"),
    ),
  );
});

test("chunks oversized final text without silently truncating it", async () => {
  const slack = fakeClient();
  const sink = new SlackResponseSink(
    slack.client,
    invocation(),
    "ITECS.AI-CODEX",
    "corr-large",
  );
  const marker = "END-OF-OVERSIZED-RESPONSE";
  const large = `${"x".repeat(LIMITS.slackStreamMaxChars + 2_000)}${marker}`;
  await sink.progress({ kind: "turn", lifecycle: "started" });
  await sink.final(large, "corr-large");
  assert.equal(slack.streamed.length, 0);
  assert.ok(slack.posted.length > 2);
  assert.ok(slack.posted.some((message) => message.text.includes(marker)));
});

test("keeps six unique milestones bounded, ordered, and free of duplicate labels", async () => {
  const clock = new FakeProgressRuntime();
  const slack = fakeClient();
  const sink = new SlackResponseSink(
    slack.client,
    invocation(),
    "ITECS.AI-CODEX",
    "corr-bounds",
    clock,
  );

  await sink.progress({ kind: "turn", lifecycle: "started" });
  await sink.progress({ kind: "reasoning", lifecycle: "started" });
  await sink.progress({ kind: "reasoning", lifecycle: "updated" });
  await sink.progress({ kind: "command", lifecycle: "started" });
  await sink.progress({ kind: "command", lifecycle: "completed" });
  await sink.progress({
    kind: "file_change",
    lifecycle: "completed",
    changeCount: 3,
  });
  await sink.progress({ kind: "connected_tool", lifecycle: "started" });
  await sink.progress({ kind: "web_search", lifecycle: "started" });
  await sink.progress({
    kind: "plan",
    lifecycle: "updated",
    completedCount: 2,
    totalCount: 4,
  });
  await sink.progress({ kind: "command", lifecycle: "started" });
  await clock.advance(LIMITS.progressIntervalMs);

  const rendered = slack.updated.at(-1)?.text ?? "";
  const milestones = rendered
    .split("\n")
    .filter((line) => line.startsWith("• "));
  assert.equal(milestones.length, LIMITS.progressMaxMilestones);
  assert.equal(rendered.length <= LIMITS.progressMaxChars, true);
  assert.equal(
    milestones.filter((line) => line === "• Command started").length,
    1,
  );
  assert.ok(
    rendered.indexOf("Research started") < rendered.indexOf("Plan: 2/4"),
  );
  assert.ok(
    rendered.indexOf("Plan: 2/4") < rendered.indexOf("Command started"),
  );
  assert.doesNotMatch(rendered, /Analyzing the request/);
});

test("throttles writes to two seconds and retains the trailing coalesced milestone", async () => {
  const clock = new FakeProgressRuntime();
  const slack = fakeClient();
  const sink = new SlackResponseSink(
    slack.client,
    invocation(),
    "ITECS.AI-CODEX",
    "corr-throttle",
    clock,
  );

  await sink.progress({ kind: "turn", lifecycle: "started" });
  await sink.progress({ kind: "reasoning", lifecycle: "started" });
  await sink.progress({ kind: "command", lifecycle: "started" });
  await sink.progress({ kind: "command", lifecycle: "completed" });
  assert.equal(slack.updated.length, 0);
  await clock.advance(LIMITS.progressIntervalMs - 1);
  assert.equal(slack.updated.length, 0);
  await clock.advance(1);
  assert.equal(slack.updated.length, 1);
  assert.match(slack.updated[0]?.text ?? "", /Command completed/);

  await sink.progress({ kind: "web_search", lifecycle: "started" });
  await sink.progress({ kind: "web_search", lifecycle: "completed" });
  assert.equal(slack.updated.length, 1);
  await clock.advance(LIMITS.progressIntervalMs);
  assert.equal(slack.updated.length, 2);
  assert.match(slack.updated[1]?.text ?? "", /Research completed/);
});

test("updates one top-level DM progress message in place", async () => {
  const clock = new FakeProgressRuntime();
  const slack = fakeClient();
  const sink = new SlackResponseSink(
    slack.client,
    invocation({ threadTs: null }),
    "ITECS.AI-CODEX",
    "corr-single-dm",
    clock,
  );

  await sink.progress({ kind: "turn", lifecycle: "started" });
  await sink.progress({ kind: "command", lifecycle: "started" });
  await clock.advance(LIMITS.progressIntervalMs);
  await sink.progress({ kind: "command", lifecycle: "completed" });
  await clock.advance(LIMITS.progressIntervalMs);
  await sink.final("complete response", "corr-single-dm");

  const progressPosts = slack.posted.filter((message) =>
    message.text.includes("Live progress (sanitized)"),
  );
  assert.equal(progressPosts.length, 1);
  assert.equal(slack.updated.length, 2);
  assert.ok(slack.updated.every((message) => message.ts === "posted-1"));
  assert.ok(
    slack.posted.some((message) => message.text.includes("complete response")),
  );
  assert.ok(slack.posted.every((message) => !("thread_ts" in message)));
});

test("progress rate limits do not hot-loop or block final delivery", async () => {
  const postFailure = fakeClient({ failProgressPost: true });
  const postSink = new SlackResponseSink(
    postFailure.client,
    invocation({ threadTs: null }),
    "ITECS.AI-CODEX",
    "corr-post-rate-limit",
  );
  await postSink.progress({ kind: "turn", lifecycle: "started" });
  await postSink.progress({ kind: "reasoning", lifecycle: "started" });
  await postSink.final("post failure final", "corr-post-rate-limit");
  assert.equal(
    postFailure.posted.filter((message) =>
      message.text.includes("Live progress (sanitized)"),
    ).length,
    1,
  );
  assert.ok(
    postFailure.posted.some((message) =>
      message.text.includes("post failure final"),
    ),
  );

  const clock = new FakeProgressRuntime();
  const updateFailure = fakeClient({ failProgressUpdate: true });
  const updateSink = new SlackResponseSink(
    updateFailure.client,
    invocation({ threadTs: null }),
    "ITECS.AI-CODEX",
    "corr-update-rate-limit",
    clock,
  );
  await updateSink.progress({ kind: "turn", lifecycle: "started" });
  await updateSink.progress({ kind: "command", lifecycle: "started" });
  await clock.advance(LIMITS.progressIntervalMs);
  await updateSink.progress({ kind: "command", lifecycle: "completed" });
  await updateSink.final("update failure final", "corr-update-rate-limit");
  assert.equal(updateFailure.updated.length, 1);
  assert.ok(
    updateFailure.posted.some((message) =>
      message.text.includes("update failure final"),
    ),
  );
});

test("completion, failure, and cancellation settle pending progress without duplicate terminal delivery", async () => {
  const completionClock = new FakeProgressRuntime();
  const completionSlack = fakeClient();
  const completionSink = new SlackResponseSink(
    completionSlack.client,
    invocation({ threadTs: null }),
    "ITECS.AI-CODEX",
    "corr-race-final",
    completionClock,
  );
  await completionSink.progress({ kind: "turn", lifecycle: "started" });
  await completionSink.progress({
    kind: "agent_message",
    lifecycle: "started",
  });
  const final = completionSink.final("race-safe final", "corr-race-final");
  const competingFailure = completionSink.failure(
    "codex_failed",
    "corr-race-final",
  );
  await completionClock.advance(LIMITS.progressIntervalMs);
  await Promise.all([final, competingFailure]);
  assert.equal(
    completionSlack.posted.filter((message) =>
      message.text.includes("race-safe final"),
    ).length,
    1,
  );
  assert.doesNotMatch(
    completionSlack.updated.map((message) => message.text).join("\n"),
    /Outcome:/,
  );

  const cancellationClock = new FakeProgressRuntime();
  const cancellationSlack = fakeClient();
  const cancellationSink = new SlackResponseSink(
    cancellationSlack.client,
    invocation(),
    "ITECS.AI-CODEX",
    "corr-race-cancel",
    cancellationClock,
  );
  await cancellationSink.progress({ kind: "turn", lifecycle: "started" });
  await cancellationSink.progress({ kind: "command", lifecycle: "started" });
  const cancelled = cancellationSink.failure("cancelled", "corr-race-cancel");
  await cancellationClock.advance(LIMITS.progressIntervalMs);
  await cancelled;
  assert.equal(cancellationSlack.posted.length, 1);
  assert.equal(cancellationSlack.updated.length, 1);
  assert.match(cancellationSlack.updated[0]?.text ?? "", /turn was stopped/);
  assert.match(cancellationSlack.updated[0]?.text ?? "", /Command started/);
});
