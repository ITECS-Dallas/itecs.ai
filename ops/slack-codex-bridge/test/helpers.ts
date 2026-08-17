import type { BridgeDependencies } from "../src/bridge.js";
import type { BridgeConfig } from "../src/config.js";
import { ActiveTurnRegistry } from "../src/active-turns.js";
import { EventDeduplicator } from "../src/dedupe.js";
import type {
  AuditEvent,
  AuditWriter,
  BridgeFailureReason,
  BridgeInvocation,
  CodexDriver,
  CodexProgress,
  ResponseSink,
  SessionRepository,
  SlackFileStager,
} from "../src/types.js";

export function testConfig(): BridgeConfig {
  return {
    teamId: "T031MF3U529",
    appId: "A0BLY157WF2",
    allowedUserIds: new Set(["U03231JGNQ1"]),
    workingDirectory: "/home/itecs/itecs.ai",
    siteDisplayName: "ITECS.AI",
    appDisplayName: "ITECS.AI-CODEX",
    slashCommand: "/itecsai-codex",
    globalShortcutCallbackId: "itecs_ai_codex_open",
    messageShortcutCallbackId: "itecs_ai_codex_analyze",
    modalCallbackId: "itecs_ai_codex_submit",
    stateFile: "/tmp/bridge-test-state.json",
    auditFile: "/tmp/bridge-test-audit.jsonl",
    tempRoot: "/tmp/bridge-test-files",
    slackBotToken: "xoxb-",
    slackAppToken: "xapp-",
  };
}

export function invocation(
  overrides: Partial<BridgeInvocation> = {},
): BridgeInvocation {
  return {
    teamId: "T031MF3U529",
    appId: "A0BLY157WF2",
    userId: "U03231JGNQ1",
    channelId: "D123",
    threadTs: "1700000000.000001",
    eventId: "Ev-1",
    eventType: "direct_message",
    text: "Do the requested work",
    receivedAt: "2026-07-27T00:00:00.000Z",
    isBot: false,
    files: [],
    ...overrides,
  };
}

export class MemorySessions implements SessionRepository {
  readonly values = new Map<string, string>();

  get(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  async set(key: string, threadId: string): Promise<void> {
    this.values.set(key, threadId);
  }

  async delete(key: string): Promise<boolean> {
    return this.values.delete(key);
  }
}

export class MemoryAudit implements AuditWriter {
  readonly events: AuditEvent[] = [];

  async record(event: AuditEvent): Promise<void> {
    this.events.push(event);
  }
}

export class CaptureSink implements ResponseSink {
  readonly progressMessages: CodexProgress[] = [];
  readonly notices: string[] = [];
  readonly finalMessages: Array<{ text: string; correlationId: string }> = [];
  readonly failures: Array<{
    reason: BridgeFailureReason;
    correlationId: string;
  }> = [];

  async progress(progress: CodexProgress): Promise<void> {
    this.progressMessages.push(progress);
  }

  async notice(text: string): Promise<void> {
    this.notices.push(text);
  }

  async final(text: string, correlationId: string): Promise<void> {
    this.finalMessages.push({ text, correlationId });
  }

  async failure(
    reason: BridgeFailureReason,
    correlationId: string,
  ): Promise<void> {
    this.failures.push({ reason, correlationId });
  }
}

export const noFiles: SlackFileStager = {
  async stage() {
    return {
      promptSuffix: "",
      cleanup: async () => undefined,
    };
  },
};

export function dependencies(
  codex: CodexDriver,
  overrides: Partial<BridgeDependencies> = {},
): BridgeDependencies {
  return {
    config: testConfig(),
    sessions: new MemorySessions(),
    audit: new MemoryAudit(),
    activeTurns: new ActiveTurnRegistry(),
    deduplicator: new EventDeduplicator(),
    files: noFiles,
    codex,
    ...overrides,
  };
}
