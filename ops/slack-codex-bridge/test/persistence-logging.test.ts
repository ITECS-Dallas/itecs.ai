import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { MetadataAuditWriter } from "../src/audit.js";
import { SafeMetadataLogger } from "../src/safe-logger.js";
import { AtomicSessionStore } from "../src/session-store.js";
import { testConfig } from "./helpers.js";

test("persists and resumes session mappings with atomic writes", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "bridge-state-"));
  try {
    const stateFile = path.join(directory, "sessions.json");
    const first = await AtomicSessionStore.open(stateFile);
    await first.set("T:C:TS", "thread-123");
    const second = await AtomicSessionStore.open(stateFile);
    assert.equal(second.get("T:C:TS"), "thread-123");
    assert.deepEqual(
      (await readdir(directory)).filter((name) => name.endsWith(".tmp")),
      [],
    );
    assert.equal(await second.delete("T:C:TS"), true);
    assert.equal(
      (await AtomicSessionStore.open(stateFile)).get("T:C:TS"),
      null,
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("fails visibly on corrupt durable session state", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "bridge-corrupt-"));
  try {
    const stateFile = path.join(directory, "sessions.json");
    await writeFile(stateFile, "{not-json", { mode: 0o600 });
    await assert.rejects(AtomicSessionStore.open(stateFile), /invalid JSON/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("safe runtime logger drops prompts, responses, errors, and environment values", () => {
  const marker = "SECRET_NEVER_SEND";
  const lines: string[] = [];
  const logger = new SafeMetadataLogger((line) => lines.push(line));
  logger.setName("bridge");
  logger.info(`raw prompt ${marker}`);
  logger.warn({ response: `private response ${marker}` });
  logger.error(
    new Error(`raw tool output ${marker}`),
    `SLACK_BOT_TOKEN=${marker}`,
  );
  const output = lines.join("\n");
  assert.doesNotMatch(
    output,
    /raw prompt|private response|raw tool output|SECRET_NEVER_SEND/,
  );
  assert.match(output, /sdk_log/);
});

test("audit records only the metadata allowlist", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "bridge-audit-"));
  try {
    const auditFile = path.join(directory, "audit.jsonl");
    const writer = new MetadataAuditWriter(auditFile, testConfig());
    await writer.record({
      correlationId: "corr-1",
      userId: "U03231JGNQ1",
      channelId: "D123",
      threadTs: "1700.1",
      eventId: "Ev-1",
      eventType: "direct_message",
      codexThreadId: "thread-1",
      receivedAt: "2026-07-27T00:00:00.000Z",
      outcome: "completed",
      prompt: "must not be written",
      response: "must not be written",
      environment: "must not be written",
    } as Parameters<typeof writer.record>[0] & {
      prompt: string;
      response: string;
      environment: string;
    });
    const output = await readFile(auditFile, "utf8");
    assert.doesNotMatch(
      output,
      /must not be written|prompt|response|environment/,
    );
    assert.match(output, /"correlationId":"corr-1"/);
    assert.match(output, /"outcome":"completed"/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
