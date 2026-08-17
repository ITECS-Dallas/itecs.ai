import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";

const root = process.cwd();
const skillNames = [
  "itecs-seo-audit",
  "itecs-seo-weekly",
  "itecs-write-content",
  "itecs-insight-articles",
];

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function frontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, "SKILL.md must have YAML frontmatter");
  return match[1]
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.slice(0, line.indexOf(":")));
}

test("repository-local SEO skills use supported packaging", () => {
  for (const name of skillNames) {
    const directory = `.codex/skills/${name}`;
    const skillPath = `${directory}/SKILL.md`;
    const agentPath = `${directory}/agents/openai.yaml`;
    const source = read(skillPath);
    const agent = read(agentPath);

    assert.deepEqual(frontmatter(source), ["name", "description"]);
    assert.match(source, new RegExp(`^name: ${name}$`, "m"));
    assert.match(agent, new RegExp(`\\$${name}\\b`));

    for (const match of source.matchAll(/\]\((references\/[^)#]+\.md)(?:#[^)]+)?\)/g)) {
      assert.ok(existsSync(join(root, directory, match[1])), `${name} reference ${match[1]} must exist`);
    }
  }
});

test("generic content requests do not grant publication authority", () => {
  const insight = read(".codex/skills/itecs-insight-articles/SKILL.md");
  const content = read(".codex/skills/itecs-write-content/SKILL.md");
  const createCommand = read("plugins/itecs-insight-articles/commands/create.md");
  const mainCommand = read("plugins/itecs-insight-articles/commands/itecs-insight-articles.md");

  for (const source of [insight, content, createCommand, mainCommand]) {
    assert.doesNotMatch(source, /CPBA/i);
    assert.match(source, /explicit/i);
  }

  assert.match(insight, /Write, create, research, outline, or draft:[\s\S]*Do not build, commit, push, publish, deploy, activate/);
  assert.match(content, /write, create, research, outline, draft, review, audit, or recommend does not authorize a repository build/);
  assert.match(mainCommand, /generic write, create, research, or draft request authorizes only the requested copy/i);
  assert.match(mainCommand, /Local repository implementation, commit, push, publication, deployment, and activation require explicit user authority/i);
});

test("validator scripts enforce durable contracts instead of SEO quotas", () => {
  const validators = [
    "scripts/seo-audit.mjs",
    "scripts/validate-epic8-geo-answer-engine.mjs",
    "scripts/validate-epic8-technical-seo-schema.mjs",
  ].map(read).join("\n");

  for (const forbidden of [
    /faqMatches/,
    /at least 5 FAQ/i,
    /must emit FAQPage/i,
    /must emit Service, FAQPage, and HowTo/i,
    /public\/llms-full\.txt must exist/i,
    /Header should use centralized mega-menu categories/,
    /Services grid should reflect 10 AI services/,
  ]) {
    assert.doesNotMatch(validators, forbidden);
  }

  assert.match(validators, /proposal routes/i);
  assert.match(validators, /canonical sitemap/i);
  assert.match(validators, /stable .*ID/i);
});

test("the plugin remains a thin delegate to the repository skill", () => {
  const pluginSkill = read("plugins/itecs-insight-articles/skills/itecs-insight-articles/SKILL.md");
  assert.match(pluginSkill, /repository-local skill is authoritative/i);
  assert.ok(pluginSkill.split("\n").length < 20);
  assert.equal(dirname("plugins/itecs-insight-articles/skills/itecs-insight-articles/SKILL.md"), "plugins/itecs-insight-articles/skills/itecs-insight-articles");
});
