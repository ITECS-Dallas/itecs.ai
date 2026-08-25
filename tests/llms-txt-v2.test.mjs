import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const llmsPath = join(root, "public/llms.txt");
const source = readFileSync(llmsPath, "utf8").replace(/^\uFEFF/, "");
const layout = readFileSync(join(root, "src/app/layout.tsx"), "utf8");
const lines = source.split(/\r?\n/);

test("llms.txt follows the v2 ordered Markdown structure", () => {
  const headings = lines.filter((line) => /^#{1,6}\s/.test(line));
  const h2Indexes = lines
    .map((line, index) => (line.startsWith("## ") ? index : -1))
    .filter((index) => index >= 0);

  assert.equal(lines[0], "# ITECS AI");
  assert.match(source, /^# ITECS AI\n\n> \S/);
  assert.equal(headings.filter((line) => line.startsWith("# ")).length, 1);
  assert.ok(
    h2Indexes.length > 0,
    "llms.txt must include at least one file list",
  );
  assert.doesNotMatch(source, /^#{3,6}\s/m);

  for (let section = 0; section < h2Indexes.length; section += 1) {
    const start = h2Indexes[section] + 1;
    const end = h2Indexes[section + 1] ?? lines.length;
    const entries = lines.slice(start, end).filter(Boolean);

    assert.ok(
      entries.length > 0,
      `${lines[h2Indexes[section]]} must not be empty`,
    );
    for (const entry of entries) {
      assert.match(
        entry,
        /^- \[[^\]]+\]\(https:\/\/[^\s)]+\)(?:: .+)?$/,
        `${lines[h2Indexes[section]]} must contain only v2 file-list entries`,
      );
    }
  }
});

test("llms.txt contains unique, public HTTPS destinations and current facts", () => {
  const links = [...source.matchAll(/\[[^\]]+\]\((https:\/\/[^\s)]+)\)/g)].map(
    (match) => match[1],
  );

  assert.equal(
    new Set(links).size,
    links.length,
    "llms.txt links must be unique",
  );
  assert.doesNotMatch(source, /https?:\/\/itecs\.ai\/p\//);
  assert.match(source, /https:\/\/maps\.app\.goo\.gl\/oFDotCsqC2SpdppV6/);
  assert.match(source, /ITECS OpsMemory/);
  assert.match(source, /structured Markdown/);
  assert.match(source, /relative media links/);
  assert.match(source, /ITECS Change Assurance/);
  assert.match(source, /technician-reported live verification/);
  assert.match(source, /never executes/i);
});

test("public pages advertise the root llms.txt description", () => {
  assert.match(layout, /<link rel="describedby" href="\/llms\.txt" \/>/);
});
