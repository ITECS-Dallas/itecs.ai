import type { WebClient } from "@slack/web-api";

import { LIMITS } from "./constants.js";
import { SafeError } from "./errors.js";
import type {
  BridgeFailureReason,
  BridgeInvocation,
  CodexProgress,
  ResponseSink,
} from "./types.js";

type TimerHandle = ReturnType<typeof setTimeout>;

export type ProgressRuntime = {
  now(): number;
  setTimer(callback: () => void, delayMs: number): TimerHandle;
  clearTimer(handle: TimerHandle): void;
};

const SYSTEM_PROGRESS_RUNTIME: ProgressRuntime = {
  now: () => Date.now(),
  setTimer: (callback, delayMs) => setTimeout(callback, delayMs),
  clearTimer: (handle) => clearTimeout(handle),
};

const FAILURE_TEXT: Readonly<Record<BridgeFailureReason, string>> =
  Object.freeze({
    audit_failed:
      "The audit record could not be written, so the turn was not dispatched.",
    cancelled: "The active Codex turn was stopped.",
    file_rejected:
      "One or more Slack files were rejected by the bridge safety limits.",
    codex_failed: "The Codex turn failed.",
    slack_delivery_failed: "Slack delivery failed.",
  });

function splitText(text: string, limit: number): string[] {
  const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
  const points = Array.from(segmenter.segment(text), (part) => part.segment);
  if (points.length <= limit) {
    return [text];
  }
  const chunks: string[] = [];
  let offset = 0;
  while (offset < points.length) {
    let end = Math.min(offset + limit, points.length);
    if (end < points.length) {
      const minimumBreak = offset + Math.floor(limit / 2);
      for (let index = end; index > minimumBreak; index -= 1) {
        if (points[index - 1] === "\n") {
          end = index;
          break;
        }
      }
    }
    chunks.push(points.slice(offset, end).join(""));
    offset = end;
  }
  return chunks;
}

export function renderProgressMilestone(progress: CodexProgress): string {
  switch (progress.kind) {
    case "turn":
      return progress.lifecycle === "started"
        ? "Analyzing the request"
        : "Finalizing the response";
    case "reasoning":
      return "Checking requirements and constraints";
    case "command":
      return `Command ${progress.lifecycle}`;
    case "file_change": {
      const noun = progress.changeCount === 1 ? "change" : "changes";
      return `File change ${progress.lifecycle} (${progress.changeCount} ${noun})`;
    }
    case "connected_tool":
      return `Connected tool ${progress.lifecycle}`;
    case "web_search":
      return `Research ${progress.lifecycle}`;
    case "plan":
      return `Plan: ${progress.completedCount}/${progress.totalCount} steps complete`;
    case "agent_message":
      return "Drafting the final response";
  }
}

function safeIdentifier(value: string): string {
  return value.replaceAll(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 64);
}

export class SlackResponseSink implements ResponseSink {
  private progressTs: string | null = null;
  private lastProgressAt: number | null = null;
  private readonly milestones: string[] = [];
  private revision = 0;
  private writtenRevision = 0;
  private progressDisabled = false;
  private progressClosed = false;
  private terminalFailure: BridgeFailureReason | null = null;
  private terminalClaim: "final" | "failure" | null = null;
  private writeQueue: Promise<void> = Promise.resolve();
  private timerHandle: TimerHandle | null = null;
  private timerPromise: Promise<void> | null = null;
  private timerResolve: (() => void) | null = null;
  private readonly safeAppDisplayName: string;
  private readonly safeCorrelationId: string;

  constructor(
    private readonly client: WebClient,
    private readonly invocation: BridgeInvocation,
    appDisplayName: string,
    correlationId: string,
    private readonly runtime: ProgressRuntime = SYSTEM_PROGRESS_RUNTIME,
  ) {
    this.safeAppDisplayName = safeIdentifier(appDisplayName);
    this.safeCorrelationId = safeIdentifier(correlationId);
  }

  async progress(progress: CodexProgress): Promise<void> {
    if (this.progressClosed || this.progressDisabled) {
      return;
    }
    const milestone = renderProgressMilestone(progress);
    if (!this.rememberMilestone(milestone)) {
      return;
    }
    this.revision += 1;
    await this.requestProgressWrite();
  }

  async notice(text: string): Promise<void> {
    await this.client.chat.postMessage({
      channel: this.invocation.channelId,
      ...(this.invocation.threadTs === null
        ? {}
        : { thread_ts: this.invocation.threadTs }),
      text,
    });
  }

  async final(text: string, correlationId: string): Promise<void> {
    void correlationId;
    if (this.terminalClaim !== null) {
      return;
    }
    this.terminalClaim = "final";
    this.progressClosed = true;
    await this.settleProgress();
    const rendered = `*${this.safeAppDisplayName}* · correlation \`${this.safeCorrelationId}\`\n\n${text}`;
    try {
      if (
        this.invocation.threadTs !== null &&
        rendered.length <= LIMITS.slackStreamMaxChars
      ) {
        try {
          await this.stream(rendered);
          return;
        } catch {
          // The bounded standard-message path owns the complete final response.
        }
      }
      await this.postChunks(rendered);
    } catch (error) {
      this.terminalClaim = null;
      throw error;
    }
  }

  async failure(
    reason: BridgeFailureReason,
    correlationId: string,
  ): Promise<void> {
    void correlationId;
    if (this.terminalClaim !== null) {
      return;
    }
    this.terminalClaim = "failure";
    this.progressClosed = true;
    this.terminalFailure = reason;
    this.revision += 1;
    await this.settleProgress();
    if (!this.progressDisabled && this.writtenRevision === this.revision) {
      return;
    }

    await this.client.chat.postMessage({
      channel: this.invocation.channelId,
      ...(this.invocation.threadTs === null
        ? {}
        : { thread_ts: this.invocation.threadTs }),
      text: this.renderProgressText(),
    });
  }

  private rememberMilestone(milestone: string): boolean {
    if (this.milestones.at(-1) === milestone) {
      return false;
    }
    const earlier = this.milestones.indexOf(milestone);
    if (earlier !== -1) {
      this.milestones.splice(earlier, 1);
    }
    this.milestones.push(milestone);
    if (this.milestones.length > LIMITS.progressMaxMilestones) {
      this.milestones.splice(
        0,
        this.milestones.length - LIMITS.progressMaxMilestones,
      );
    }
    return true;
  }

  private renderProgressText(): string {
    const icon =
      this.terminalFailure === null ? ":hourglass_flowing_sand:" : ":warning:";
    const visibleMilestones = [...this.milestones];
    const render = (): string =>
      [
        `${icon} *${this.safeAppDisplayName} · Live progress (sanitized)*`,
        ...visibleMilestones.map((milestone) => `• ${milestone}`),
        ...(this.terminalFailure === null
          ? []
          : [`*Outcome:* ${FAILURE_TEXT[this.terminalFailure]}`]),
        `Correlation: \`${this.safeCorrelationId}\``,
      ].join("\n");
    let rendered = render();
    while (
      rendered.length > LIMITS.progressMaxChars &&
      visibleMilestones.length > 1
    ) {
      visibleMilestones.shift();
      rendered = render();
    }
    return rendered.slice(0, LIMITS.progressMaxChars);
  }

  private async requestProgressWrite(): Promise<void> {
    if (
      this.progressDisabled ||
      this.writtenRevision >= this.revision ||
      this.timerPromise !== null
    ) {
      return;
    }
    const delayMs = this.remainingThrottleMs();
    if (delayMs > 0) {
      this.scheduleProgressWrite(delayMs);
      return;
    }
    await this.enqueueProgressWrite();
  }

  private remainingThrottleMs(): number {
    if (this.lastProgressAt === null) {
      return 0;
    }
    return Math.max(
      0,
      LIMITS.progressIntervalMs - (this.runtime.now() - this.lastProgressAt),
    );
  }

  private scheduleProgressWrite(delayMs: number): void {
    if (this.timerPromise !== null || this.progressDisabled) {
      return;
    }
    let resolveTimer: () => void = () => undefined;
    const pending = new Promise<void>((resolve) => {
      resolveTimer = resolve;
    });
    this.timerPromise = pending;
    this.timerResolve = resolveTimer;
    this.timerHandle = this.runtime.setTimer(() => {
      this.timerHandle = null;
      this.timerPromise = null;
      this.timerResolve = null;
      void this.enqueueProgressWrite().finally(resolveTimer);
    }, delayMs);
  }

  private async enqueueProgressWrite(): Promise<void> {
    const operation = this.writeQueue.then(async () => {
      await this.writeProgressIfDue();
    });
    this.writeQueue = operation.catch(() => undefined);
    await operation;
  }

  private async writeProgressIfDue(): Promise<void> {
    if (this.progressDisabled || this.writtenRevision >= this.revision) {
      return;
    }
    const delayMs = this.remainingThrottleMs();
    if (delayMs > 0) {
      this.scheduleProgressWrite(delayMs);
      return;
    }

    const revision = this.revision;
    const text = this.renderProgressText();
    try {
      if (this.progressTs === null) {
        const response = await this.client.chat.postMessage({
          channel: this.invocation.channelId,
          ...(this.invocation.threadTs === null
            ? {}
            : { thread_ts: this.invocation.threadTs }),
          text,
        });
        if (typeof response.ts !== "string") {
          throw new SafeError(
            "slack_progress_failed",
            "Slack did not return a progress message timestamp",
          );
        }
        this.progressTs = response.ts;
      } else {
        await this.client.chat.update({
          channel: this.invocation.channelId,
          ts: this.progressTs,
          text,
        });
      }
    } catch {
      this.disableProgress();
      return;
    }
    this.lastProgressAt = this.runtime.now();
    this.writtenRevision = revision;
    if (this.writtenRevision < this.revision) {
      await this.requestProgressWrite();
    }
  }

  private async settleProgress(): Promise<void> {
    while (!this.progressDisabled && this.writtenRevision < this.revision) {
      await this.requestProgressWrite();
      const timer = this.timerPromise;
      if (timer !== null) {
        await timer;
      }
      await this.writeQueue;
    }
  }

  private disableProgress(): void {
    this.progressDisabled = true;
    if (this.timerHandle !== null) {
      this.runtime.clearTimer(this.timerHandle);
      this.timerHandle = null;
    }
    this.timerPromise = null;
    this.timerResolve?.();
    this.timerResolve = null;
  }

  private async stream(text: string): Promise<void> {
    if (this.invocation.threadTs === null) {
      throw new SafeError(
        "slack_stream_requires_thread",
        "Slack streaming requires a thread",
      );
    }
    if (typeof this.client.chatStream !== "function") {
      throw new SafeError(
        "slack_stream_unavailable",
        "Slack streaming is unavailable",
      );
    }
    const stream = this.client.chatStream({
      channel: this.invocation.channelId,
      thread_ts: this.invocation.threadTs,
      recipient_team_id: this.invocation.teamId,
      recipient_user_id: this.invocation.userId,
      buffer_size: 512,
    });
    try {
      for (const chunk of splitText(text, 2_000)) {
        await stream.append({ markdown_text: chunk });
      }
      await stream.stop();
    } catch (error) {
      if (stream.ts !== undefined) {
        await this.client.chat
          .update({
            channel: this.invocation.channelId,
            ts: stream.ts,
            text: `:warning: Streaming delivery failed. The complete response follows in standard messages.\nCorrelation: \`${this.safeCorrelationId}\``,
          })
          .catch(() => undefined);
      }
      throw new SafeError("slack_stream_failed", "Slack streaming failed", {
        cause: error,
      });
    }
  }

  private async postChunks(text: string): Promise<void> {
    const chunks = splitText(text, LIMITS.slackMessageChunkChars);
    for (const [index, chunk] of chunks.entries()) {
      const part =
        chunks.length === 1
          ? chunk
          : `*Part ${index + 1} of ${chunks.length}*\n${chunk}`;
      await this.client.chat.postMessage({
        channel: this.invocation.channelId,
        ...(this.invocation.threadTs === null
          ? {}
          : { thread_ts: this.invocation.threadTs }),
        text: part,
      });
    }
  }
}
