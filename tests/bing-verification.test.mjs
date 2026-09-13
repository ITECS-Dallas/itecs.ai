import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("root metadata publishes the owner-approved Bing verification token once", () => {
  const source = readFileSync(new URL("../src/app/layout.tsx", import.meta.url), "utf8");
  assert.match(source, /verification:\s*\{\s*other:\s*\{\s*"msvalidate\.01":\s*"6B6C52FD6B99566CEE4ABC6BDD379C95"/);
  assert.equal(source.split('"msvalidate.01"').length - 1, 1);
});
