import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("homepage description preserves the approved service and platform intent", () => {
  const source = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");
  const description = source.match(/description:\s*"([^"]+)"/)?.[1];
  assert.equal(description, "AI consulting, governance, training, and custom agents for Dallas businesses. ITECS helps teams use Copilot, Claude, and ChatGPT securely and effectively.");
  assert.equal(description.length, 154);
  assert.match(source, /title: "Managed Intelligence & Secure AI Operations in Dallas \| ITECS"/);
  assert.match(source, /path: "\/"/);
});
