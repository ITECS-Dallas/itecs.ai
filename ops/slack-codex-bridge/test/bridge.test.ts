import assert from "node:assert/strict";
import test from "node:test";

import { conversationKey } from "../src/authorization.js";
import { BridgeService } from "../src/bridge.js";
import type {
  CodexDriver,
  CodexRunRequest,
  CodexRunResult,
} from "../src/types.js";
import {
  CaptureSink,
  MemoryAudit,
  MemorySessions,
  dependencies,
  invocation,
} from "./helpers.js";

class ImmediateCodex implements CodexDriver {
  calls = 0;
  readonly requestedThreadIds: Array<string | null> = [];

  async run(request: CodexRunRequest): Promise<CodexRunResult> {
    this.calls += 1;
    this.requestedThreadIds.push(request.threadId);
    const threadId = request.threadId ?? `thread-${this.calls}`;
    await request.onThreadId(threadId);
    await request.onProgress({ kind: "reasoning", lifecycle: "started" });
    return { threadId, finalResponse: "Completed response" };
  }
}

class BlockingCodex implements CodexDriver {
  calls = 0;
  private releaseTurn: (() => void) | null = null;

  async run(request: CodexRunRequest): Promise<CodexRunResult> {
    this.calls += 1;
    const threadId = request.threadId ?? "thread-blocking";
    await request.onThreadId(threadId);
    await new Promise<void>((resolve, reject) => {
      this.releaseTurn = resolve;
      request.signal.addEventListener(
        "abort",
        () => reject(new DOMException("Aborted", "AbortError")),
        { once: true },
      );
    });
    return { threadId, finalResponse: "Finished" };
  }

  release(): void {
    this.releaseTurn?.();
  }
}

test("suppresses duplicate events without a second Codex turn", async () => {
  const codex = new ImmediateCodex();
  const bridge = new BridgeService(dependencies(codex));
  const firstSink = new CaptureSink();
  const secondSink = new CaptureSink();
  const input = invocation();

  assert.equal(await bridge.handle(input, () => firstSink), "completed");
  assert.equal(
    await bridge.handle(input, () => secondSink),
    "duplicate_suppressed",
  );
  assert.equal(codex.calls, 1);
  assert.equal(secondSink.finalMessages.length, 0);
});

test("continues top-level DMs by channel while keeping explicit threads independent", async () => {
  const codex = new ImmediateCodex();
  const sessions = new MemorySessions();
  const bridge = new BridgeService(dependencies(codex, { sessions }));

  const firstTopLevel = invocation({
    threadTs: null,
    eventId: "Ev-dm-1",
  });
  const secondTopLevel = invocation({
    threadTs: null,
    eventId: "Ev-dm-2",
  });
  const explicitThread = invocation({
    threadTs: "1700000000.000099",
    eventId: "Ev-dm-thread",
  });
  const otherChannel = invocation({
    channelId: "D456",
    threadTs: null,
    eventId: "Ev-other-dm",
  });

  assert.equal(
    await bridge.handle(firstTopLevel, () => new CaptureSink()),
    "completed",
  );
  assert.equal(
    await bridge.handle(secondTopLevel, () => new CaptureSink()),
    "completed",
  );
  assert.equal(
    await bridge.handle(explicitThread, () => new CaptureSink()),
    "completed",
  );
  assert.equal(
    await bridge.handle(otherChannel, () => new CaptureSink()),
    "completed",
  );

  assert.deepEqual(codex.requestedThreadIds, [null, "thread-1", null, null]);
  assert.equal(sessions.get(conversationKey(firstTopLevel)), "thread-1");
  assert.equal(conversationKey(firstTopLevel), conversationKey(secondTopLevel));
  assert.notEqual(
    conversationKey(firstTopLevel),
    conversationKey(explicitThread),
  );
  assert.notEqual(
    conversationKey(firstTopLevel),
    conversationKey(otherChannel),
  );
});

test("allows one active turn per Slack conversation and reports busy", async () => {
  const codex = new BlockingCodex();
  const bridge = new BridgeService(dependencies(codex));
  const firstSink = new CaptureSink();
  const secondSink = new CaptureSink();
  const first = bridge.handle(invocation(), () => firstSink);
  await new Promise((resolve) => setImmediate(resolve));

  const secondOutcome = await bridge.handle(
    invocation({ eventId: "Ev-2", text: "Second turn" }),
    () => secondSink,
  );
  assert.equal(secondOutcome, "busy");
  assert.match(secondSink.notices[0] ?? "", /already active/);
  assert.equal(codex.calls, 1);

  codex.release();
  assert.equal(await first, "completed");
});

test("stop aborts the active turn and new clears the durable mapping", async () => {
  const codex = new BlockingCodex();
  const sessions = new MemorySessions();
  const audit = new MemoryAudit();
  const bridge = new BridgeService(dependencies(codex, { sessions, audit }));
  const threadInvocation = invocation();
  const running = bridge.handle(threadInvocation, () => new CaptureSink());
  await new Promise((resolve) => setImmediate(resolve));

  const stopSink = new CaptureSink();
  assert.equal(
    await bridge.handle(
      invocation({ eventId: "Ev-stop", text: "stop" }),
      () => stopSink,
    ),
    "stop_requested",
  );
  assert.equal(await running, "cancelled");
  assert.equal(
    sessions.get(conversationKey(threadInvocation)),
    "thread-blocking",
  );

  const newSink = new CaptureSink();
  assert.equal(
    await bridge.handle(
      invocation({ eventId: "Ev-new", text: "new" }),
      () => newSink,
    ),
    "new_session",
  );
  assert.equal(sessions.get(conversationKey(threadInvocation)), null);
  assert.ok(audit.events.some((event) => event.outcome === "cancelled"));
});

test("status reports the saved session without dispatching another turn", async () => {
  const codex = new ImmediateCodex();
  const bridge = new BridgeService(dependencies(codex));
  assert.equal(
    await bridge.handle(
      invocation({ eventId: "Ev-status-seed" }),
      () => new CaptureSink(),
    ),
    "completed",
  );

  const statusSink = new CaptureSink();
  assert.equal(
    await bridge.handle(
      invocation({ eventId: "Ev-status", text: "status" }),
      () => statusSink,
    ),
    "status",
  );
  assert.equal(codex.calls, 1);
  assert.match(statusSink.notices[0] ?? "", /Turn: idle/);
  assert.match(statusSink.notices[0] ?? "", /Codex thread: thread-1/);
});

test("rejects bot input without invoking Codex", async () => {
  const codex = new ImmediateCodex();
  const bridge = new BridgeService(dependencies(codex));
  assert.equal(
    await bridge.handle(invocation({ isBot: true }), () => new CaptureSink()),
    "bot_rejected",
  );
  assert.equal(codex.calls, 0);
});

test("makes Codex failure visible without exposing the error", async () => {
  const codex: CodexDriver = {
    async run() {
      throw new Error("raw prompt and tool output must stay private");
    },
  };
  const audit = new MemoryAudit();
  const bridge = new BridgeService(dependencies(codex, { audit }));
  const sink = new CaptureSink();
  assert.equal(await bridge.handle(invocation(), () => sink), "codex_failed");
  assert.equal(sink.failures.length, 1);
  assert.equal(sink.failures[0]?.reason, "codex_failed");
  assert.doesNotMatch(JSON.stringify(sink.failures), /raw prompt|tool output/);
  assert.equal(audit.events.at(-1)?.outcome, "codex_failed");
});

test("refuses dispatch when the metadata audit cannot be written", async () => {
  const codex = new ImmediateCodex();
  const bridge = new BridgeService(
    dependencies(codex, {
      audit: {
        async record() {
          throw new Error("disk failure");
        },
      },
    }),
  );
  const sink = new CaptureSink();
  assert.equal(await bridge.handle(invocation(), () => sink), "audit_failed");
  assert.equal(codex.calls, 0);
  assert.equal(sink.failures[0]?.reason, "audit_failed");
});
