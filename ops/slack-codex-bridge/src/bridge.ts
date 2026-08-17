import { randomUUID } from "node:crypto";

import { ActiveTurnRegistry } from "./active-turns.js";
import { authorizeInvocation, conversationKey } from "./authorization.js";
import type { BridgeConfig } from "./config.js";
import { CONTROL_COMMANDS } from "./constants.js";
import { EventDeduplicator } from "./dedupe.js";
import { SafeError, isAbortError } from "./errors.js";
import type {
  AuditOutcome,
  AuditWriter,
  BridgeInvocation,
  CodexDriver,
  ResponseSink,
  SessionRepository,
  SlackFileStager,
} from "./types.js";

export type BridgeDependencies = {
  config: BridgeConfig;
  sessions: SessionRepository;
  audit: AuditWriter;
  activeTurns: ActiveTurnRegistry;
  deduplicator: EventDeduplicator;
  files: SlackFileStager;
  codex: CodexDriver;
};

export class BridgeService {
  constructor(private readonly dependencies: BridgeDependencies) {}

  async handle(
    invocation: BridgeInvocation,
    sinkFactory: (correlationId: string) => ResponseSink,
  ): Promise<AuditOutcome> {
    const correlationId = randomUUID();
    const sink = sinkFactory(correlationId);
    const authorization = authorizeInvocation(
      invocation,
      this.dependencies.config,
    );
    if (!authorization.authorized) {
      const outcome =
        authorization.reason === "bot"
          ? "bot_rejected"
          : "authorization_denied";
      await this.audit(invocation, correlationId, null, outcome).catch(
        () => undefined,
      );
      if (authorization.reason === "user") {
        await sink
          .notice(":no_entry: You are not authorized to use this app.")
          .catch(() => undefined);
      }
      return outcome;
    }

    if (!this.dependencies.deduplicator.claim(invocation.eventId)) {
      await this.audit(
        invocation,
        correlationId,
        this.dependencies.sessions.get(conversationKey(invocation)),
        "duplicate_suppressed",
      );
      return "duplicate_suppressed";
    }

    const key = conversationKey(invocation);
    const command = invocation.text.trim().toLowerCase();
    if (CONTROL_COMMANDS.has(command)) {
      return this.handleControl(command, key, invocation, correlationId, sink);
    }
    if (invocation.text.trim().length === 0) {
      await sink.notice(this.helpText());
      await this.audit(
        invocation,
        correlationId,
        this.dependencies.sessions.get(key),
        "help",
      );
      return "help";
    }

    const controller = this.dependencies.activeTurns.start(key, correlationId);
    if (controller === null) {
      await sink.notice(
        ":hourglass_flowing_sand: A Codex turn is already active in this Slack conversation. Use `status` or `stop`.",
      );
      await this.audit(
        invocation,
        correlationId,
        this.dependencies.sessions.get(key),
        "busy",
      );
      return "busy";
    }

    let codexThreadId = this.dependencies.sessions.get(key);
    try {
      try {
        await this.audit(invocation, correlationId, codexThreadId, "accepted");
      } catch {
        await sink
          .failure("audit_failed", correlationId)
          .catch(() => undefined);
        return "audit_failed";
      }

      const staged = await this.dependencies.files.stage(
        invocation.files,
        this.dependencies.config.slackBotToken,
        controller.signal,
      );
      try {
        const result = await this.dependencies.codex.run({
          threadId: codexThreadId,
          prompt: `${invocation.text}${staged.promptSuffix}`,
          signal: controller.signal,
          onThreadId: async (threadId) => {
            codexThreadId = threadId;
            await this.dependencies.sessions.set(key, threadId);
          },
          onProgress: async (progress) => {
            await sink.progress(progress);
          },
        });
        codexThreadId = result.threadId;
        await this.dependencies.sessions.set(key, result.threadId);
        await staged.cleanup();
        await sink.final(result.finalResponse, correlationId);
        await this.audit(
          invocation,
          correlationId,
          result.threadId,
          "completed",
        );
        return "completed";
      } finally {
        await staged.cleanup();
      }
    } catch (error) {
      let outcome: AuditOutcome;
      if (isAbortError(error, controller.signal)) {
        outcome = "cancelled";
      } else if (error instanceof SafeError && error.code.startsWith("file_")) {
        outcome = "file_rejected";
      } else if (
        error instanceof SafeError &&
        error.code.startsWith("slack_")
      ) {
        outcome = "slack_delivery_failed";
      } else {
        outcome = "codex_failed";
      }
      await sink.failure(outcome, correlationId).catch(() => undefined);
      await this.audit(invocation, correlationId, codexThreadId, outcome).catch(
        () => undefined,
      );
      return outcome;
    } finally {
      this.dependencies.activeTurns.finish(key, correlationId);
    }
  }

  private async handleControl(
    command: string,
    key: string,
    invocation: BridgeInvocation,
    correlationId: string,
    sink: ResponseSink,
  ): Promise<AuditOutcome> {
    const threadId = this.dependencies.sessions.get(key);
    let outcome: AuditOutcome;
    if (command === "help") {
      await sink.notice(this.helpText());
      outcome = "help";
    } else if (command === "status") {
      const active = this.dependencies.activeTurns.isBusy(key);
      await sink.notice(
        [
          `*${this.dependencies.config.appDisplayName} status*`,
          `Turn: ${active ? "active" : "idle"}`,
          `Codex thread: ${threadId ?? "not started"}`,
        ].join("\n"),
      );
      outcome = "status";
    } else if (command === "stop") {
      const stopped = this.dependencies.activeTurns.stop(key);
      await sink.notice(
        stopped
          ? ":octagonal_sign: Cancellation requested for the active Codex turn."
          : "There is no active Codex turn in this Slack conversation.",
      );
      outcome = stopped ? "stop_requested" : "stop_idle";
    } else {
      if (this.dependencies.activeTurns.isBusy(key)) {
        await sink.notice(
          ":hourglass_flowing_sand: Stop the active turn before starting a new Codex session.",
        );
        outcome = "busy";
      } else {
        await this.dependencies.sessions.delete(key);
        await sink.notice(
          ":new: The saved Codex session for this Slack conversation was cleared. The next prompt will start a new session.",
        );
        outcome = "new_session";
      }
    }
    await this.audit(invocation, correlationId, threadId, outcome);
    return outcome;
  }

  private helpText(): string {
    return [
      `*${this.dependencies.config.appDisplayName}*`,
      "Send ordinary text to start or resume Codex in this Slack conversation.",
      "`help` — show this message",
      "`status` — show the active turn and saved Codex thread",
      "`stop` — cancel the active turn",
      "`new` — clear the saved Codex thread after the active turn stops",
    ].join("\n");
  }

  private async audit(
    invocation: BridgeInvocation,
    correlationId: string,
    codexThreadId: string | null,
    outcome: AuditOutcome,
  ): Promise<void> {
    await this.dependencies.audit.record({
      correlationId,
      userId: invocation.userId,
      channelId: invocation.channelId,
      threadTs: invocation.threadTs,
      eventId: invocation.eventId,
      eventType: invocation.eventType,
      codexThreadId,
      receivedAt: invocation.receivedAt,
      outcome,
    });
  }
}
