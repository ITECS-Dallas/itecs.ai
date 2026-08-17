import assert from "node:assert/strict";
import test from "node:test";

import { authorizeInvocation } from "../src/authorization.js";
import { loadConfig } from "../src/config.js";
import { invocation, testConfig } from "./helpers.js";

function validEnvironment(): NodeJS.ProcessEnv {
  return {
    SLACK_TEAM_ID: "T031MF3U529",
    SLACK_APP_ID: "A0BLY157WF2",
    SLACK_ALLOWED_USER_IDS: "U03231JGNQ1",
    CODEX_WORKING_DIRECTORY: "/home/itecs/itecs.ai",
    SITE_DISPLAY_NAME: "ITECS.AI",
    SLACK_APP_DISPLAY_NAME: "ITECS.AI-CODEX",
    SLACK_SLASH_COMMAND: "/itecsai-codex",
    SLACK_GLOBAL_SHORTCUT_CALLBACK_ID: "itecs_ai_codex_open",
    SLACK_MESSAGE_SHORTCUT_CALLBACK_ID: "itecs_ai_codex_analyze",
    SLACK_MODAL_CALLBACK_ID: "itecs_ai_codex_submit",
    BRIDGE_STATE_FILE: "/var/lib/itecs-ai-codex-slack/sessions.json",
    BRIDGE_AUDIT_FILE: "/var/log/itecs-ai-codex-slack/audit.jsonl",
    BRIDGE_TEMP_ROOT: "/run/itecs-ai-codex-slack/tmp",
    SLACK_BOT_TOKEN: "xoxb-",
    SLACK_APP_TOKEN: "xapp-",
  };
}

test("authorizes only the exact workspace, app, and user", () => {
  const config = testConfig();
  assert.deepEqual(authorizeInvocation(invocation(), config), {
    authorized: true,
  });
  assert.deepEqual(
    authorizeInvocation(invocation({ teamId: "T-WRONG" }), config),
    { authorized: false, reason: "workspace" },
  );
  assert.deepEqual(
    authorizeInvocation(invocation({ appId: "A-WRONG" }), config),
    { authorized: false, reason: "app" },
  );
  assert.deepEqual(
    authorizeInvocation(invocation({ userId: "U-WRONG" }), config),
    { authorized: false, reason: "user" },
  );
});

test("rejects bot-originated input before user dispatch", () => {
  assert.deepEqual(
    authorizeInvocation(invocation({ isBot: true }), testConfig()),
    { authorized: false, reason: "bot" },
  );
});

test("configuration is pinned to the authorized app and token prefixes", () => {
  const config = loadConfig(validEnvironment());
  assert.equal(config.teamId, "T031MF3U529");
  assert.equal(config.appId, "A0BLY157WF2");
  assert.throws(
    () =>
      loadConfig({
        ...validEnvironment(),
        SLACK_APP_ID: "A-WRONG",
      }),
    /authorized bridge binding/,
  );
  assert.throws(
    () =>
      loadConfig({
        ...validEnvironment(),
        SLACK_BOT_TOKEN: "not-a-bot-token",
      }),
    /expected token prefix/,
  );
});
