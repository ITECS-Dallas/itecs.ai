import assert from "node:assert/strict";
import { access, mkdtemp, readdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { LIMITS } from "../src/constants.js";
import { BoundedSlackFileStager } from "../src/slack-files.js";

test("stages bounded Slack files in a unique directory and always cleans up", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "bridge-files-"));
  try {
    let authorization = "";
    const stager = new BoundedSlackFileStager(root, async (_url, init) => {
      authorization = new Headers(init?.headers).get("authorization") ?? "";
      return new Response("untrusted file contents", {
        status: 200,
        headers: { "content-length": "23" },
      });
    });
    const staged = await stager.stage(
      [
        {
          id: "../../F123",
          name: "../../notes.txt",
          size: 23,
          mimetype: "text/plain",
          urlPrivateDownload:
            "https://files.slack.com/files-pri/T-F/download/notes.txt",
        },
      ],
      "test-token",
      new AbortController().signal,
    );
    assert.equal(authorization, "Bearer test-token");
    const pathMatch = staged.promptSuffix.match(
      /(- \/.* \(untrusted Slack file;)/,
    );
    assert.ok(pathMatch);
    const stagedPath = pathMatch[1]
      ?.replace(/^- /, "")
      .replace(/ \(untrusted Slack file;$/, "");
    assert.ok(stagedPath);
    await access(stagedPath);
    await staged.cleanup();
    await staged.cleanup();
    assert.deepEqual(await readdir(root), []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects oversized files before making a network request", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "bridge-files-limit-"));
  try {
    let fetchCalls = 0;
    const stager = new BoundedSlackFileStager(root, async () => {
      fetchCalls += 1;
      return new Response("unexpected");
    });
    await assert.rejects(
      stager.stage(
        [
          {
            id: "F-LARGE",
            name: "large.bin",
            size: LIMITS.maxFileBytes + 1,
            urlPrivate: "https://files.slack.com/files-pri/T-F/large.bin",
          },
        ],
        "test-token",
        new AbortController().signal,
      ),
      /per-file size limit/,
    );
    assert.equal(fetchCalls, 0);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects non-Slack download URLs and cleans the temporary directory", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "bridge-files-host-"));
  try {
    const stager = new BoundedSlackFileStager(root, async () => {
      throw new Error("fetch must not be called");
    });
    await assert.rejects(
      stager.stage(
        [
          {
            id: "F-EVIL",
            name: "evil.txt",
            size: 1,
            urlPrivate: "https://example.com/evil.txt",
          },
        ],
        "test-token",
        new AbortController().signal,
      ),
      /trusted Slack domain/,
    );
    assert.deepEqual(await readdir(root), []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("enforces the total limit against downloaded bytes, not only Slack metadata", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "bridge-files-total-"));
  try {
    const body = "x".repeat(6 * 1024 * 1024);
    let fetchCalls = 0;
    const stager = new BoundedSlackFileStager(root, async () => {
      fetchCalls += 1;
      return new Response(body, {
        status: 200,
        headers: { "content-length": String(body.length) },
      });
    });
    await assert.rejects(
      stager.stage(
        ["F1", "F2", "F3"].map((id) => ({
          id,
          name: `${id}.bin`,
          size: 1,
          urlPrivate: `https://files.slack.com/files-pri/T/${id}`,
        })),
        "test-token",
        new AbortController().signal,
      ),
      /response exceeds the size limit/,
    );
    assert.equal(fetchCalls, 3);
    assert.deepEqual(await readdir(root), []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
