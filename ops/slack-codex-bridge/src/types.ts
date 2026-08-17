export type SlackFileReference = {
  id: string;
  name: string;
  size: number;
  mimetype?: string;
  urlPrivate?: string;
  urlPrivateDownload?: string;
};

export type InvocationType =
  | "direct_message"
  | "app_mention"
  | "slash_command"
  | "global_shortcut"
  | "message_shortcut"
  | "modal_submission";

export type BridgeInvocation = {
  teamId: string;
  appId: string;
  userId: string;
  channelId: string;
  threadTs: string | null;
  eventId: string;
  eventType: InvocationType;
  text: string;
  receivedAt: string;
  isBot: boolean;
  files: SlackFileReference[];
};

export type AuditOutcome =
  | "accepted"
  | "authorization_denied"
  | "bot_rejected"
  | "duplicate_suppressed"
  | "busy"
  | "help"
  | "status"
  | "stop_requested"
  | "stop_idle"
  | "new_session"
  | "cancelled"
  | "completed"
  | "file_rejected"
  | "codex_failed"
  | "slack_delivery_failed"
  | "audit_failed";

export type AuditEvent = {
  correlationId: string;
  userId: string;
  channelId: string;
  threadTs: string | null;
  eventId: string;
  eventType: InvocationType;
  codexThreadId: string | null;
  receivedAt: string;
  outcome: AuditOutcome;
};

export type ResponseSink = {
  progress(progress: CodexProgress): Promise<void>;
  notice(text: string): Promise<void>;
  final(text: string, correlationId: string): Promise<void>;
  failure(reason: BridgeFailureReason, correlationId: string): Promise<void>;
};

export type CodexProgress =
  | { kind: "turn"; lifecycle: "started" | "completed" }
  | { kind: "reasoning"; lifecycle: "started" | "updated" }
  | {
      kind: "command";
      lifecycle: "started" | "completed" | "failed";
    }
  | {
      kind: "file_change";
      lifecycle: "started" | "completed" | "failed";
      changeCount: number;
    }
  | {
      kind: "connected_tool";
      lifecycle: "started" | "completed" | "failed";
    }
  | {
      kind: "web_search";
      lifecycle: "started" | "completed" | "failed";
    }
  | {
      kind: "plan";
      lifecycle: "started" | "updated" | "completed";
      completedCount: number;
      totalCount: number;
    }
  | { kind: "agent_message"; lifecycle: "started" };

export type BridgeFailureReason =
  | "audit_failed"
  | "cancelled"
  | "file_rejected"
  | "codex_failed"
  | "slack_delivery_failed";

export type CodexRunRequest = {
  threadId: string | null;
  prompt: string;
  signal: AbortSignal;
  onThreadId(threadId: string): Promise<void>;
  onProgress(progress: CodexProgress): Promise<void>;
};

export type CodexRunResult = {
  threadId: string;
  finalResponse: string;
};

export type CodexDriver = {
  run(request: CodexRunRequest): Promise<CodexRunResult>;
};

export type SessionRepository = {
  get(conversationKey: string): string | null;
  set(conversationKey: string, threadId: string): Promise<void>;
  delete(conversationKey: string): Promise<boolean>;
};

export type AuditWriter = {
  record(event: AuditEvent): Promise<void>;
};

export type StagedSlackFiles = {
  promptSuffix: string;
  cleanup(): Promise<void>;
};

export type SlackFileStager = {
  stage(
    files: readonly SlackFileReference[],
    botToken: string,
    signal: AbortSignal,
  ): Promise<StagedSlackFiles>;
};
