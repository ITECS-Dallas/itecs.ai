import type { ThreadOptions } from "@openai/codex-sdk";

export const EXPECTED = Object.freeze({
  teamId: "T031MF3U529",
  appId: "A0BLY157WF2",
  allowedUserId: "U03231JGNQ1",
  workingDirectory: "/home/itecs/itecs.ai",
  siteDisplayName: "ITECS.AI",
  appDisplayName: "ITECS.AI-CODEX",
  slashCommand: "/itecsai-codex",
  globalShortcutCallbackId: "itecs_ai_codex_open",
  messageShortcutCallbackId: "itecs_ai_codex_analyze",
  modalCallbackId: "itecs_ai_codex_submit",
});

export const CODEX_THREAD_OPTIONS: Readonly<ThreadOptions> = Object.freeze({
  workingDirectory: EXPECTED.workingDirectory,
  sandboxMode: "danger-full-access",
  approvalPolicy: "never",
});

export const LIMITS = Object.freeze({
  dedupeTtlMs: 10 * 60 * 1_000,
  dedupeMaxEntries: 10_000,
  maxFiles: 4,
  maxFileBytes: 8 * 1024 * 1024,
  maxTotalFileBytes: 16 * 1024 * 1024,
  fileDownloadTimeoutMs: 30_000,
  progressIntervalMs: 2_000,
  progressMaxMilestones: 6,
  progressMaxChars: 700,
  slackStreamMaxChars: 11_500,
  slackMessageChunkChars: 3_500,
  shutdownTimeoutMs: 20_000,
});

export const CONTROL_COMMANDS = new Set(["help", "status", "stop", "new"]);
