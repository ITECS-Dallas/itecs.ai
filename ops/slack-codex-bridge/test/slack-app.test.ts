import assert from "node:assert/strict";
import test from "node:test";

import type { GlobalShortcut } from "@slack/bolt";
import type { WebClient } from "@slack/web-api";

import {
  handleGlobalShortcut,
  slackThreadTsForEvent,
} from "../src/slack-app.js";
import { testConfig } from "./helpers.js";

function globalShortcut(
  input: {
    teamId?: string;
    userId?: string;
  } = {},
): GlobalShortcut {
  return {
    type: "shortcut",
    callback_id: "itecs_ai_codex_open",
    trigger_id: "trigger-placeholder",
    user: {
      id: input.userId ?? "U03231JGNQ1",
      username: "authorized-user",
      team_id: input.teamId ?? "T031MF3U529",
    },
    team: {
      id: input.teamId ?? "T031MF3U529",
      domain: "workspace-placeholder",
    },
    token: "verification-token-placeholder",
    action_ts: "1785174360.000001",
  };
}

function viewClient(
  open: WebClient["views"]["open"],
): Pick<WebClient, "views"> {
  return {
    views: { open },
  } as Pick<WebClient, "views">;
}

test("opens the global shortcut modal from Bolt's app-id-free payload", async () => {
  const opened: unknown[] = [];
  let acknowledgements = 0;
  await handleGlobalShortcut(
    {
      shortcut: globalShortcut(),
      client: viewClient(async (request) => {
        opened.push(request);
        return { ok: true };
      }),
      ack: async () => {
        acknowledgements += 1;
      },
    },
    testConfig(),
  );

  assert.equal(acknowledgements, 1);
  assert.deepEqual(opened, [
    {
      trigger_id: "trigger-placeholder",
      view: {
        type: "modal",
        callback_id: "itecs_ai_codex_submit",
        private_metadata: JSON.stringify({ kind: "global" }),
        title: { type: "plain_text", text: "ITECS.AI-CODEX" },
        submit: { type: "plain_text", text: "Run" },
        close: { type: "plain_text", text: "Cancel" },
        blocks: [
          {
            type: "input",
            block_id: "conversation_block",
            label: {
              type: "plain_text",
              text: "Send the response to",
            },
            element: {
              type: "conversations_select",
              action_id: "conversation",
              filter: {
                include: ["im", "mpim", "private", "public"],
                exclude_bot_users: true,
              },
            },
          },
          {
            type: "input",
            block_id: "prompt_block",
            label: { type: "plain_text", text: "Codex request" },
            element: {
              type: "plain_text_input",
              action_id: "prompt",
              multiline: true,
            },
          },
        ],
      },
    },
  ]);
});

test("acknowledges but rejects global shortcuts from another workspace or user", async () => {
  for (const shortcut of [
    globalShortcut({ teamId: "T_OTHER" }),
    globalShortcut({ userId: "U_OTHER" }),
  ]) {
    let acknowledgements = 0;
    let opens = 0;
    await handleGlobalShortcut(
      {
        shortcut,
        client: viewClient(async () => {
          opens += 1;
          return { ok: true };
        }),
        ack: async () => {
          acknowledgements += 1;
        },
      },
      testConfig(),
    );

    assert.equal(acknowledgements, 1);
    assert.equal(opens, 0);
  }
});

test("keeps top-level DMs unthreaded while explicit DM threads and mentions stay threaded", () => {
  assert.equal(
    slackThreadTsForEvent("direct_message", {
      ts: "1785174360.000010",
    }),
    null,
  );
  assert.equal(
    slackThreadTsForEvent("direct_message", {
      ts: "1785174360.000011",
      thread_ts: "1785174360.000001",
    }),
    "1785174360.000001",
  );
  assert.equal(
    slackThreadTsForEvent("app_mention", {
      ts: "1785174360.000020",
    }),
    "1785174360.000020",
  );
  assert.throws(
    () => slackThreadTsForEvent("app_mention", {}),
    /must have a message timestamp/,
  );
});
