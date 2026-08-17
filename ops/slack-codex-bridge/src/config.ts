import path from "node:path";

import { EXPECTED } from "./constants.js";
import { SafeError } from "./errors.js";

export type BridgeConfig = {
  teamId: string;
  appId: string;
  allowedUserIds: ReadonlySet<string>;
  workingDirectory: string;
  siteDisplayName: string;
  appDisplayName: string;
  slashCommand: string;
  globalShortcutCallbackId: string;
  messageShortcutCallbackId: string;
  modalCallbackId: string;
  stateFile: string;
  auditFile: string;
  tempRoot: string;
  slackBotToken: string;
  slackAppToken: string;
};

function required(env: NodeJS.ProcessEnv, name: string): string {
  const value = env[name];
  if (typeof value !== "string" || value.length === 0) {
    throw new SafeError(
      "config_missing",
      `Required configuration is missing: ${name}`,
    );
  }
  return value;
}

function exact(name: string, actual: string, expected: string): string {
  if (actual !== expected) {
    throw new SafeError(
      "config_binding_mismatch",
      `${name} does not match the authorized bridge binding`,
    );
  }
  return actual;
}

function absolutePath(name: string, value: string): string {
  if (!path.isAbsolute(value)) {
    throw new SafeError(
      "config_path_invalid",
      `${name} must be an absolute path`,
    );
  }
  return value;
}

function tokenWithPrefix(
  env: NodeJS.ProcessEnv,
  name: string,
  prefix: string,
): string {
  const value = required(env, name);
  if (!value.startsWith(prefix)) {
    throw new SafeError(
      "config_token_prefix_invalid",
      `${name} does not have the expected token prefix`,
    );
  }
  return value;
}

export function loadConfig(env: NodeJS.ProcessEnv): BridgeConfig {
  const allowedUserValue = exact(
    "SLACK_ALLOWED_USER_IDS",
    required(env, "SLACK_ALLOWED_USER_IDS"),
    EXPECTED.allowedUserId,
  );

  return {
    teamId: exact(
      "SLACK_TEAM_ID",
      required(env, "SLACK_TEAM_ID"),
      EXPECTED.teamId,
    ),
    appId: exact("SLACK_APP_ID", required(env, "SLACK_APP_ID"), EXPECTED.appId),
    allowedUserIds: new Set([allowedUserValue]),
    workingDirectory: exact(
      "CODEX_WORKING_DIRECTORY",
      absolutePath(
        "CODEX_WORKING_DIRECTORY",
        required(env, "CODEX_WORKING_DIRECTORY"),
      ),
      EXPECTED.workingDirectory,
    ),
    siteDisplayName: exact(
      "SITE_DISPLAY_NAME",
      required(env, "SITE_DISPLAY_NAME"),
      EXPECTED.siteDisplayName,
    ),
    appDisplayName: exact(
      "SLACK_APP_DISPLAY_NAME",
      required(env, "SLACK_APP_DISPLAY_NAME"),
      EXPECTED.appDisplayName,
    ),
    slashCommand: exact(
      "SLACK_SLASH_COMMAND",
      required(env, "SLACK_SLASH_COMMAND"),
      EXPECTED.slashCommand,
    ),
    globalShortcutCallbackId: exact(
      "SLACK_GLOBAL_SHORTCUT_CALLBACK_ID",
      required(env, "SLACK_GLOBAL_SHORTCUT_CALLBACK_ID"),
      EXPECTED.globalShortcutCallbackId,
    ),
    messageShortcutCallbackId: exact(
      "SLACK_MESSAGE_SHORTCUT_CALLBACK_ID",
      required(env, "SLACK_MESSAGE_SHORTCUT_CALLBACK_ID"),
      EXPECTED.messageShortcutCallbackId,
    ),
    modalCallbackId: exact(
      "SLACK_MODAL_CALLBACK_ID",
      required(env, "SLACK_MODAL_CALLBACK_ID"),
      EXPECTED.modalCallbackId,
    ),
    stateFile: absolutePath(
      "BRIDGE_STATE_FILE",
      required(env, "BRIDGE_STATE_FILE"),
    ),
    auditFile: absolutePath(
      "BRIDGE_AUDIT_FILE",
      required(env, "BRIDGE_AUDIT_FILE"),
    ),
    tempRoot: absolutePath(
      "BRIDGE_TEMP_ROOT",
      required(env, "BRIDGE_TEMP_ROOT"),
    ),
    slackBotToken: tokenWithPrefix(env, "SLACK_BOT_TOKEN", "xoxb-"),
    slackAppToken: tokenWithPrefix(env, "SLACK_APP_TOKEN", "xapp-"),
  };
}
