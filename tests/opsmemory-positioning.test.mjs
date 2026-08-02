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
  const retrieval = normalize(
    read("src/components/sections/OpsMemoryRetrievalFlow.tsx"),
  );
  const desktop = normalize(
    read("src/components/sections/OpsMemoryDesktopExperience.tsx"),
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
    /ITECS OpsMemory turns approved company knowledge into cited answers and visual SOPs, with structured retrieval, managed permissions, review, and support\./,
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

  assert.match(page, /<OpsMemoryRetrievalFlow \/>/);
  assert.match(page, /<OpsMemoryDesktopExperience \/>/);
  assert.match(retrieval, /How OpsMemory Finds the Right Answer/);
  assert.match(
    retrieval,
    /The efficiency comes from reducing the search space, not from skipping verification\./,
  );
  assert.match(retrieval, /knowledge index, coverage file, category, filename, title, and headings/);
  assert.match(retrieval, /The full Markdown body supplies steps, values, conditions, and surrounding context/);
  assert.match(retrieval, /Relative media links connect the article/);
  assert.match(retrieval, /Approved organization or client documentation/);
  assert.match(retrieval, /Reusable internal knowledge/);
  assert.match(retrieval, /Authoritative official or vendor guidance/);
  assert.match(retrieval, /Missing, stale, or conflicting evidence is identified/);
  assert.match(retrieval, /source path, exact heading/);
  assert.match(retrieval, /conceptual workflow and design comparison—not a measured customer benchmark/);
  assert.match(retrieval, /Manual knowledge search/);
  assert.match(retrieval, /OpsMemory-assisted search/);
  assert.match(retrieval, /<figure/);
  assert.match(retrieval, /<ol/);

  assert.match(desktop, /Knowledge That Stays Visual/);
  assert.match(desktop, /Show the firewall replacement procedure and rack diagram\./);
  assert.match(
    desktop,
    /\/clients\/sample-company\/network\/firewall-replacement\.md#rack-diagram/,
  );
  assert.match(desktop, /Source-backed answer/);
  assert.match(desktop, /Human review required/);
  assert.match(desktop, /Sample Company/);
  assert.match(desktop, /role="img"/);
  assert.match(desktop, /viewBox="0 0 640 400"/);
  assert.match(desktop, /width="640"/);
  assert.match(desktop, /height="400"/);
  assert.match(desktop, /ChatGPT Work\/Codex Desktop or Claude Cowork/);
  assert.match(
    desktop,
    /Desktop behavior depends on the platform, plan or feature availability, device, folder permissions, and configuration\./,
  );
  assert.match(desktop, /does not promise cloud sync or universal device support/);

  assert.match(homepage, /Knowledge & IT Operations/);
  assert.match(homepage, /title: "ITECS OpsMemory"/);
  assert.match(homepage, /cta: "Explore OpsMemory"/);
  assert.match(homepage, /href: "\/ai-knowledge-base"/);
  assert.match(homepage, /PPV_AGENT_USE_CASE/);
  assert.match(homepage, /FIELD_EXAM_ANALYZER_USE_CASE/);

  assert.match(service, /h1: "AI Knowledge Base & SOP Automation"/);
  assert.match(service, /How does OpsMemory search headings and document content\?/);
  assert.match(service, /Can OpsMemory show images and diagrams from our documentation\?/);
  assert.match(service, /structured Markdown retrieval/i);
  assert.match(service, /relative media links/i);
  assert.match(service, /approved organization and client documentation first/i);
  assert.match(service, /current authoritative guidance when local material is missing or stale/i);
  assert.match(service, /human review and existing approvals/i);
  assert.doesNotMatch(
    service,
    /5 seconds|50% faster|70% fewer|4[–-]6 weeks|600\+|SharePoint|Google Drive|Notion|Confluence|vector database|embeddings?|RAG pipeline|Pinecone|confidence scor|autonomous universal synchronization/i,
  );
  assert.doesNotMatch(
    `${retrieval}\n${desktop}`,
    /\d+(?:\.\d+)?%|\bROI\b|payback|times faster|x faster|query volume|customer benchmark result/i,
  );
  assert.doesNotMatch(page, /Product|AggregateRating|Review|Offer/);
  assert.doesNotMatch(publicSources, /DOC-?BOT/i);
  assert.equal(existsSync(join(root, "src/app/opsmemory/page.tsx")), false);

  for (const summary of ["public/ai.txt", "public/llms.txt", "public/llms-full.txt"]) {
    const summaryText = normalize(read(summary));
    assert.match(summaryText, /ITECS OpsMemory/);
    assert.match(summaryText, /https:\/\/itecs\.ai\/ai-knowledge-base/);
    assert.match(summaryText, /structured Markdown/);
    assert.match(summaryText, /relative media links/);
  }

  assert.match(page, /<FAQ items={service\.faq}/);
  assert.match(page, /generateFAQSchema\(service\.faq\)/);
});
