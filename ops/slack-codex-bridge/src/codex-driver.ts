import {
  Codex,
  type ThreadEvent,
  type ThreadOptions,
  type TurnOptions,
} from "@openai/codex-sdk";

import { CODEX_THREAD_OPTIONS } from "./constants.js";
import { SafeError } from "./errors.js";
import type {
  CodexDriver,
  CodexProgress,
  CodexRunRequest,
  CodexRunResult,
} from "./types.js";

type ThreadLike = {
  readonly id: string | null;
  runStreamed(
    input: string,
    options?: TurnOptions,
  ): Promise<{ events: AsyncGenerator<ThreadEvent> }>;
};

export type CodexLike = {
  startThread(options?: ThreadOptions): ThreadLike;
  resumeThread(id: string, options?: ThreadOptions): ThreadLike;
};

const SECRET_ENVIRONMENT_NAMES = new Set([
  "SLACK_BOT_TOKEN",
  "SLACK_APP_TOKEN",
  "OP_SERVICE_ACCOUNT_TOKEN",
  "OP_CONNECT_TOKEN",
  "CREDENTIALS_DIRECTORY",
]);

export function sanitizedCodexEnvironment(
  environment: NodeJS.ProcessEnv,
): Record<string, string> {
  const sanitized: Record<string, string> = {};
  for (const [name, value] of Object.entries(environment)) {
    if (
      value === undefined ||
      SECRET_ENVIRONMENT_NAMES.has(name) ||
      name.startsWith("OP_SESSION_")
    ) {
      continue;
    }
    sanitized[name] = value;
  }
  return sanitized;
}

type ItemLifecycle = "started" | "updated" | "completed";

type FailableProgressKind =
  "command" | "file_change" | "connected_tool" | "web_search";

function terminalLifecycle(
  status: "in_progress" | "completed" | "failed",
  eventLifecycle: ItemLifecycle,
): "started" | "completed" | "failed" {
  if (status === "failed") {
    return "failed";
  }
  if (status === "completed" || eventLifecycle === "completed") {
    return "completed";
  }
  return "started";
}

function progressForItem(
  event: Extract<
    ThreadEvent,
    { type: "item.started" | "item.updated" | "item.completed" }
  >,
): CodexProgress | null {
  const eventLifecycle = event.type.slice("item.".length) as ItemLifecycle;
  switch (event.item.type) {
    case "reasoning":
      if (eventLifecycle === "completed") {
        return null;
      }
      return { kind: "reasoning", lifecycle: eventLifecycle };
    case "command_execution":
      return {
        kind: "command",
        lifecycle: terminalLifecycle(event.item.status, eventLifecycle),
      };
    case "file_change":
      return {
        kind: "file_change",
        lifecycle:
          eventLifecycle === "started"
            ? "started"
            : event.item.status === "failed"
              ? "failed"
              : "completed",
        changeCount: event.item.changes.length,
      };
    case "mcp_tool_call":
      return {
        kind: "connected_tool",
        lifecycle: terminalLifecycle(event.item.status, eventLifecycle),
      };
    case "web_search":
      return {
        kind: "web_search",
        lifecycle: eventLifecycle === "completed" ? "completed" : "started",
      };
    case "todo_list":
      return {
        kind: "plan",
        lifecycle: eventLifecycle,
        completedCount: event.item.items.filter((item) => item.completed)
          .length,
        totalCount: event.item.items.length,
      };
    case "agent_message":
      return eventLifecycle === "started"
        ? { kind: "agent_message", lifecycle: "started" }
        : null;
    case "error":
      return null;
  }
}

function progressForEvent(event: ThreadEvent): CodexProgress | null {
  if (event.type === "turn.started") {
    return { kind: "turn", lifecycle: "started" };
  }
  if (event.type === "turn.completed") {
    return { kind: "turn", lifecycle: "completed" };
  }
  if (
    event.type !== "item.started" &&
    event.type !== "item.updated" &&
    event.type !== "item.completed"
  ) {
    return null;
  }
  return progressForItem(event);
}

function failableProgressKind(event: ThreadEvent): FailableProgressKind | null {
  if (event.type !== "item.started" && event.type !== "item.updated") {
    return null;
  }
  switch (event.item.type) {
    case "command_execution":
      return event.item.status === "in_progress" ? "command" : null;
    case "file_change":
      return event.type === "item.started" ? "file_change" : null;
    case "mcp_tool_call":
      return event.item.status === "in_progress" ? "connected_tool" : null;
    case "web_search":
      return "web_search";
    case "agent_message":
    case "reasoning":
    case "todo_list":
    case "error":
      return null;
  }
}

function failedProgress(
  kind: FailableProgressKind,
  changeCount: number,
): CodexProgress {
  if (kind === "file_change") {
    return { kind, lifecycle: "failed", changeCount };
  }
  return { kind, lifecycle: "failed" };
}

export class CodexSdkDriver implements CodexDriver {
  private readonly codex: CodexLike;

  constructor(codex?: CodexLike, environment: NodeJS.ProcessEnv = process.env) {
    this.codex =
      codex ??
      new Codex({
        env: sanitizedCodexEnvironment(environment),
      });
  }

  async run(request: CodexRunRequest): Promise<CodexRunResult> {
    const thread =
      request.threadId === null
        ? this.codex.startThread(CODEX_THREAD_OPTIONS)
        : this.codex.resumeThread(request.threadId, CODEX_THREAD_OPTIONS);
    const { events } = await thread.runStreamed(request.prompt, {
      signal: request.signal,
    });
    let threadId = request.threadId;
    let finalResponse = "";
    let completed = false;
    const activeFailableItems = new Map<
      string,
      { kind: FailableProgressKind; changeCount: number }
    >();

    for await (const event of events) {
      if (event.type === "thread.started") {
        threadId = event.thread_id;
        await request.onThreadId(event.thread_id);
        continue;
      }
      if (event.type === "turn.failed" || event.type === "error") {
        for (const active of activeFailableItems.values()) {
          await request.onProgress(
            failedProgress(active.kind, active.changeCount),
          );
        }
        throw new SafeError("codex_turn_failed", "Codex turn failed");
      }
      if (event.type === "item.completed") {
        activeFailableItems.delete(event.item.id);
      } else if (
        event.type === "item.started" ||
        event.type === "item.updated"
      ) {
        const kind = failableProgressKind(event);
        if (kind !== null) {
          activeFailableItems.set(event.item.id, {
            kind,
            changeCount:
              event.item.type === "file_change" ? event.item.changes.length : 0,
          });
        } else if (event.type === "item.updated") {
          activeFailableItems.delete(event.item.id);
        }
      }
      if (
        event.type === "item.completed" &&
        event.item.type === "agent_message"
      ) {
        finalResponse = event.item.text;
      }
      if (event.type === "turn.completed") {
        completed = true;
      }
      const progress = progressForEvent(event);
      if (progress !== null) {
        await request.onProgress(progress);
      }
    }

    threadId ??= thread.id;
    if (!completed || threadId === null || finalResponse.length === 0) {
      throw new SafeError(
        "codex_incomplete",
        "Codex did not produce a complete textual response",
      );
    }
    return { threadId, finalResponse };
  }
}
