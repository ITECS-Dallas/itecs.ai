import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const normalize = (value) => value.replace(/\s+/g, " ").trim();

function publicSourceText(directory) {
  return readdirSync(join(root, directory))
    .flatMap((entry) => {
      const relativePath = join(directory, entry);
      const absolutePath = join(root, relativePath);
      return statSync(absolutePath).isDirectory()
        ? [publicSourceText(relativePath)]
        : /\.(?:ts|tsx|txt)$/.test(entry)
          ? [read(relativePath)]
          : [];
    })
    .join("\n");
}

test("OpsMemory positioning stays canonical, bounded, and in parity", () => {
  const page = read("src/app/ai-knowledge-base/page.tsx");
  const overview = normalize(
    read("src/components/sections/OpsMemoryOverview.tsx").replaceAll("&amp;", "&"),
  );
  const homepage = normalize(
    read("src/components/sections/FeaturedAgentBuilds.tsx"),
  );
  const constants = read("src/lib/constants.ts");
  const service = constants.slice(
    constants.indexOf('slug: "ai-knowledge-base"'),
    constants.indexOf('slug: "data-audit"'),
  );
  const publicSources = `${publicSourceText("src")}\n${publicSourceText("public")}`;

  assert.match(page, /AI Knowledge Base & SOP Automation \| ITECS OpsMemory/);
  assert.match(
    page,
    /ITECS OpsMemory turns approved company knowledge into cited answers and maintained SOPs, with managed permissions, review, and ongoing support\./,
  );
  assert.match(overview, /Managed Knowledge & Document Operations Agent/);
  assert.match(overview, /Meet ITECS OpsMemory/);
  assert.match(
    overview,
    /Your company&apos;s operational memory—organized, source-backed, and ready to use\./,
  );
  assert.match(overview, /MSPs and multi-client IT service teams/);
  assert.match(overview, /Internal IT and security departments/);
  assert.match(overview, /Documentation-heavy or regulated operations teams/);
  assert.match(overview, /Does not store secrets in its knowledge base/);

  assert.match(homepage, /Knowledge & IT Operations/);
  assert.match(homepage, /title: "ITECS OpsMemory"/);
  assert.match(homepage, /cta: "Explore OpsMemory"/);
  assert.match(homepage, /href: "\/ai-knowledge-base"/);
  assert.match(homepage, /PPV_AGENT_USE_CASE/);
  assert.match(homepage, /FIELD_EXAM_ANALYZER_USE_CASE/);

  assert.match(service, /h1: "AI Knowledge Base & SOP Automation"/);
  assert.match(service, /approved organization and client documentation first/i);
  assert.match(service, /current authoritative guidance when local material is missing or stale/i);
  assert.match(service, /human review and existing approvals/i);
  assert.doesNotMatch(
    service,
    /5 seconds|50% faster|70% fewer|4[–-]6 weeks|SharePoint|Google Drive|Notion|Confluence|600\+/i,
  );
  assert.doesNotMatch(page, /Product|AggregateRating|Review|Offer/);
  assert.doesNotMatch(publicSources, /DOC-?BOT/i);
  assert.equal(existsSync(join(root, "src/app/opsmemory/page.tsx")), false);

  for (const summary of ["public/ai.txt", "public/llms.txt", "public/llms-full.txt"]) {
    assert.match(read(summary), /ITECS OpsMemory/);
    assert.match(read(summary), /https:\/\/itecs\.ai\/ai-knowledge-base/);
  }
});
