import assert from "node:assert/strict";
import test from "node:test";

import type {
  ThreadEvent,
  ThreadOptions,
  TurnOptions,
} from "@openai/codex-sdk";

import {
  CodexSdkDriver,
  type CodexLike,
  sanitizedCodexEnvironment,
} from "../src/codex-driver.js";
import { CODEX_THREAD_OPTIONS } from "../src/constants.js";
import { renderProgressMilestone } from "../src/slack-response.js";
import type { CodexProgress } from "../src/types.js";

function events(threadId: string): AsyncGenerator<ThreadEvent> {
  return (async function* () {
    yield { type: "thread.started", thread_id: threadId };
    yield { type: "turn.started" };
    yield {
      type: "item.completed",
      item: { id: "item-1", type: "agent_message", text: "Final response" },
    };
    yield {
      type: "turn.completed",
      usage: {
        input_tokens: 1,
        cached_input_tokens: 0,
        cache_write_input_tokens: 0,
        output_tokens: 1,
        reasoning_output_tokens: 0,
      },
    };
  })();
}

test("passes the exact unrestricted Codex options with no model override", async () => {
  let startOptions: ThreadOptions | undefined;
  let turnOptions: TurnOptions | undefined;
  const fake: CodexLike = {
    startThread(options) {
      startOptions = options;
      return {
        id: null,
        async runStreamed(_input, optionsForTurn) {
          turnOptions = optionsForTurn;
          return { events: events("thread-new") };
        },
      };
    },
    resumeThread() {
      throw new Error("resume should not be called");
    },
  };
  const controller = new AbortController();
  const driver = new CodexSdkDriver(fake);
  const result = await driver.run({
    threadId: null,
    prompt: "test prompt",
    signal: controller.signal,
    onThreadId: async () => undefined,
    onProgress: async () => undefined,
  });

  assert.deepEqual(startOptions, {
    workingDirectory: "/home/itecs/itecs.ai",
    sandboxMode: "danger-full-access",
    approvalPolicy: "never",
  });
  assert.equal(Object.hasOwn(startOptions ?? {}, "model"), false);
  assert.deepEqual(startOptions, CODEX_THREAD_OPTIONS);
  assert.equal(turnOptions?.signal, controller.signal);
  assert.equal(result.threadId, "thread-new");
});

test("resumes the durable Codex thread with the same exact options", async () => {
  let resumedId = "";
  let resumeOptions: ThreadOptions | undefined;
  const fake: CodexLike = {
    startThread() {
      throw new Error("start should not be called");
    },
    resumeThread(id, options) {
      resumedId = id;
      resumeOptions = options;
      return {
        id,
        async runStreamed() {
          return { events: events(id) };
        },
      };
    },
  };
  const driver = new CodexSdkDriver(fake);
  await driver.run({
    threadId: "thread-saved",
    prompt: "resume",
    signal: new AbortController().signal,
    onThreadId: async () => undefined,
    onProgress: async () => undefined,
  });
  assert.equal(resumedId, "thread-saved");
  assert.deepEqual(resumeOptions, CODEX_THREAD_OPTIONS);
  assert.equal(Object.hasOwn(resumeOptions ?? {}, "model"), false);
});

test("removes Slack and 1Password secrets from the Codex child environment", () => {
  const sanitized = sanitizedCodexEnvironment({
    PATH: "/usr/bin",
    HOME: "/home/itecs",
    SHELL: "/usr/bin/zsh",
    SLACK_BOT_TOKEN: "sensitive-bot-value",
    SLACK_APP_TOKEN: "sensitive-app-value",
    OP_SERVICE_ACCOUNT_TOKEN: "sensitive-op-value",
    OP_SESSION_example: "secret",
  });
  assert.deepEqual(sanitized, {
    PATH: "/usr/bin",
    HOME: "/home/itecs",
    SHELL: "/usr/bin/zsh",
  });
});

test("derives the safe lifecycle matrix and plan counts without reading payload strings", async () => {
  const marker = "SECRET_NEVER_SEND";
  const lifecycleEvents: ThreadEvent[] = [
    { type: "thread.started", thread_id: "thread-private-payloads" },
    { type: "turn.started" },
    {
      type: "item.started",
      item: { id: "reasoning-1", type: "reasoning", text: marker },
    },
    {
      type: "item.updated",
      item: { id: "reasoning-1", type: "reasoning", text: marker },
    },
    {
      type: "item.started",
      item: {
        id: "command-success",
        type: "command_execution",
        command: marker,
        aggregated_output: marker,
        status: "in_progress",
      },
    },
    {
      type: "item.completed",
      item: {
        id: "command-success",
        type: "command_execution",
        command: marker,
        aggregated_output: marker,
        exit_code: 0,
        status: "completed",
      },
    },
    {
      type: "item.started",
      item: {
        id: "command-failure",
        type: "command_execution",
        command: marker,
        aggregated_output: marker,
        status: "in_progress",
      },
    },
    {
      type: "item.completed",
      item: {
        id: "command-failure",
        type: "command_execution",
        command: marker,
        aggregated_output: marker,
        exit_code: 1,
        status: "failed",
      },
    },
    {
      type: "item.started",
      item: {
        id: "file-success",
        type: "file_change",
        changes: [{ path: marker, kind: "update" }],
        status: "completed",
      },
    },
    {
      type: "item.completed",
      item: {
        id: "file-success",
        type: "file_change",
        changes: [{ path: marker, kind: "update" }],
        status: "completed",
      },
    },
    {
      type: "item.started",
      item: {
        id: "file-failure",
        type: "file_change",
        changes: [
          { path: marker, kind: "add" },
          { path: marker, kind: "delete" },
        ],
        status: "failed",
      },
    },
    {
      type: "item.completed",
      item: {
        id: "file-failure",
        type: "file_change",
        changes: [
          { path: marker, kind: "add" },
          { path: marker, kind: "delete" },
        ],
        status: "failed",
      },
    },
    {
      type: "item.started",
      item: {
        id: "tool-success",
        type: "mcp_tool_call",
        server: marker,
        tool: marker,
        arguments: { privateArgument: marker },
        status: "in_progress",
      },
    },
    {
      type: "item.completed",
      item: {
        id: "tool-success",
        type: "mcp_tool_call",
        server: marker,
        tool: marker,
        arguments: { privateArgument: marker },
        result: {
          content: [{ type: "text", text: marker }],
          structured_content: { privateResult: marker },
        },
        status: "completed",
      },
    },
    {
      type: "item.started",
      item: {
        id: "tool-failure",
        type: "mcp_tool_call",
        server: marker,
        tool: marker,
        arguments: marker,
        status: "in_progress",
      },
    },
    {
      type: "item.completed",
      item: {
        id: "tool-failure",
        type: "mcp_tool_call",
        server: marker,
        tool: marker,
        arguments: marker,
        error: { message: marker },
        status: "failed",
      },
    },
    {
      type: "item.started",
      item: { id: "search-1", type: "web_search", query: marker },
    },
    {
      type: "item.completed",
      item: { id: "search-1", type: "web_search", query: marker },
    },
    {
      type: "item.started",
      item: {
        id: "plan-1",
        type: "todo_list",
        items: [
          { text: marker, completed: false },
          { text: marker, completed: false },
        ],
      },
    },
    {
      type: "item.updated",
      item: {
        id: "plan-1",
        type: "todo_list",
        items: [
          { text: marker, completed: true },
          { text: marker, completed: false },
        ],
      },
    },
    {
      type: "item.completed",
      item: {
        id: "plan-1",
        type: "todo_list",
        items: [
          { text: marker, completed: true },
          { text: marker, completed: true },
        ],
      },
    },
    {
      type: "item.started",
      item: { id: "message-1", type: "agent_message", text: marker },
    },
    {
      type: "item.completed",
      item: { id: "error-1", type: "error", message: marker },
    },
    {
      type: "item.completed",
      item: {
        id: "message-1",
        type: "agent_message",
        text: "Safe final response",
      },
    },
    {
      type: "turn.completed",
      usage: {
        input_tokens: 1,
        cached_input_tokens: 0,
        cache_write_input_tokens: 0,
        output_tokens: 1,
        reasoning_output_tokens: 0,
      },
    },
  ];
  const fake: CodexLike = {
    startThread() {
      return {
        id: null,
        async runStreamed() {
          return {
            events: (async function* () {
              yield* lifecycleEvents;
            })(),
          };
        },
      };
    },
    resumeThread() {
      throw new Error("resume should not be called");
    },
  };
  const progress: CodexProgress[] = [];
  const result = await new CodexSdkDriver(fake).run({
    threadId: null,
    prompt: marker,
    signal: new AbortController().signal,
    onThreadId: async () => undefined,
    onProgress: async (milestone) => {
      progress.push(milestone);
    },
  });
  const rendered = progress.map(renderProgressMilestone).join("\n");

  assert.equal(result.finalResponse, "Safe final response");
  assert.doesNotMatch(JSON.stringify(progress), new RegExp(marker));
  assert.doesNotMatch(rendered, new RegExp(marker));
  assert.ok(
    ["started", "completed", "failed"].every((lifecycle) =>
      progress.some(
        (milestone) =>
          milestone.kind === "command" && milestone.lifecycle === lifecycle,
      ),
    ),
  );
  assert.ok(
    ["started", "completed", "failed"].every((lifecycle) =>
      progress.some(
        (milestone) =>
          milestone.kind === "file_change" && milestone.lifecycle === lifecycle,
      ),
    ),
  );
  assert.ok(
    ["started", "completed", "failed"].every((lifecycle) =>
      progress.some(
        (milestone) =>
          milestone.kind === "connected_tool" &&
          milestone.lifecycle === lifecycle,
      ),
    ),
  );
  assert.deepEqual(
    progress.filter((milestone) => milestone.kind === "plan"),
    [
      {
        kind: "plan",
        lifecycle: "started",
        completedCount: 0,
        totalCount: 2,
      },
      {
        kind: "plan",
        lifecycle: "updated",
        completedCount: 1,
        totalCount: 2,
      },
      {
        kind: "plan",
        lifecycle: "completed",
        completedCount: 2,
        totalCount: 2,
      },
    ],
  );
  assert.match(rendered, /Drafting the final response/);
  assert.match(rendered, /Finalizing the response/);
});

test("marks an active web search failed on a fatal SDK event without exposing its query or error", async () => {
  const marker = "SECRET_NEVER_SEND";
  const fake: CodexLike = {
    startThread() {
      return {
        id: null,
        async runStreamed() {
          return {
            events: (async function* (): AsyncGenerator<ThreadEvent> {
              yield { type: "thread.started", thread_id: "thread-failed" };
              yield { type: "turn.started" };
              yield {
                type: "item.started",
                item: { id: marker, type: "web_search", query: marker },
              };
              yield { type: "turn.failed", error: { message: marker } };
            })(),
          };
        },
      };
    },
    resumeThread() {
      throw new Error("resume should not be called");
    },
  };
  const progress: CodexProgress[] = [];
  await assert.rejects(
    new CodexSdkDriver(fake).run({
      threadId: null,
      prompt: marker,
      signal: new AbortController().signal,
      onThreadId: async () => undefined,
      onProgress: async (milestone) => {
        progress.push(milestone);
      },
    }),
    /Codex turn failed/,
  );
  const rendered = progress.map(renderProgressMilestone).join("\n");
  assert.match(rendered, /Research failed/);
  assert.doesNotMatch(rendered, new RegExp(marker));
  assert.doesNotMatch(JSON.stringify(progress), new RegExp(marker));
});
