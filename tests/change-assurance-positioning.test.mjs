import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const normalize = (value) => value.replace(/\s+/g, " ").trim();

test("Change Assurance stays canonical, review-only, and in public parity", () => {
  const page = normalize(read("src/app/it-change-readiness/page.tsx"));
  const hero = normalize(
    read("src/components/sections/ChangeAssuranceHero.tsx"),
  );
  const flow = normalize(
    read("src/components/sections/ChangeAssuranceReviewFlow.tsx"),
  );
  const decision = normalize(
    read("src/components/sections/ChangeAssuranceDecisionModel.tsx"),
  );
  const demonstration = normalize(
    read("src/components/sections/ChangeAssuranceDemonstration.tsx"),
  );
  const homepage = normalize(
    read("src/components/sections/FeaturedAgentBuilds.tsx"),
  );
  const opsMemory = normalize(
    read("src/components/sections/OpsMemoryOverview.tsx"),
  );
  const constants = read("src/lib/constants.ts");
  const product = normalize(
    constants.slice(
      constants.indexOf("export const CHANGE_ASSURANCE_SERVICE"),
      constants.indexOf("// Tool-specific AI Training & Implementation pages."),
    ),
  );
  const sitemap = normalize(read("src/app/sitemap.ts"));
  const knowledge = normalize(read("src/lib/intelligence/knowledge.ts"));
  const validation = normalize(read("src/lib/intelligence/validation.ts"));
  const ai = normalize(read("public/ai.txt"));
  const llms = normalize(read("public/llms.txt"));
  const llmsFull = normalize(read("public/llms-full.txt"));
  const publicProductText = [
    page,
    hero,
    flow,
    decision,
    demonstration,
    homepage,
    opsMemory,
    product,
    ai,
    llms,
    llmsFull,
  ].join("\n");
  const changeContent = [page, hero, flow, decision, demonstration, product].join(
    "\n",
  );

  assert.match(
    page,
    /IT Change Readiness Reviews \| ITECS Change Assurance/,
  );
  assert.match(
    page,
    /Stress-test infrastructure change plans, verify critical prerequisites, research vendor requirements, and create auditable readiness verdicts\./,
  );
  assert.match(product, /h1: "Challenge High-Risk IT Changes Before Production"/);
  assert.match(product, /title: "ITECS Change Assurance"/);
  assert.match(product, /shortTitle: "ITECS Change Assurance"/);
  assert.match(product, /href: "\/it-change-readiness"/);
  assert.match(hero, /AI-Assisted IT Change Readiness/);
  assert.match(
    hero,
    /Managed pre-change technical review for infrastructure teams/,
  );
  assert.match(
    hero,
    /Challenge the plan before the change challenges production\./,
  );
  assert.match(hero, /Review-only\. It never executes the change\./);
  assert.match(hero, /NO-GO — critical evidence still required/);
  assert.match(hero, /Illustrative readiness console/);
  assert.match(hero, /Fictional shared service/);

  assert.match(flow, /Why technically plausible change plans still fail/);
  assert.match(flow, /How the review works/);
  assert.match(product, /Plan intake/);
  assert.match(product, /Risk tier/);
  assert.match(product, /Documentation and current vendor evidence/);
  assert.match(product, /Constructively adversarial technical review/);
  assert.match(product, /Readiness verdict and report/);
  assert.match(flow, /Environment facts/);
  assert.match(flow, /Current official vendor guidance/);
  assert.match(flow, /Approved company and OpsMemory documentation/);
  assert.match(flow, /Unverified memory or assumption/);
  assert.match(flow, /technician-reported live observations are required/i);
  assert.match(flow, /does not prove current live state/i);
  assert.match(flow, /universal numerical confidence score/i);
  assert.match(flow, /<ol/);
  assert.match(flow, /<figure/);

  for (const area of [
    "Prerequisites and compatibility",
    "Dependencies and blast radius",
    "Backup and pre-change safety",
    "Maintenance window and communications",
    "Post-change functional verification",
    "Security and access",
    "Logistics, ownership, and escalation",
  ]) {
    assert.match(decision, new RegExp(area));
  }
  for (const tier of ["Routine", "Elevated", "Critical"]) {
    assert.match(decision, new RegExp(tier));
  }
  for (const status of [
    "OPEN",
    "VERIFIED LIVE",
    "DOC-ONLY FLAGGED",
    "MITIGATED",
    "ACCEPTED RISK",
  ]) {
    assert.match(decision, new RegExp(status));
  }
  for (const verdict of [
    "GO",
    "CONDITIONAL GO",
    "NO-GO",
    "TECHNICIAN OVERRIDE RECORDED",
  ]) {
    assert.match(decision, new RegExp(verdict));
  }
  assert.match(decision, /never converts unresolved risk into GO/);

  assert.match(demonstration, /fictional shared backup-platform upgrade/i);
  assert.match(demonstration, /compatibility is not yet live-verified/i);
  assert.match(demonstration, /snapshot is named/i);
  assert.match(demonstration, /functional backup-and-restore test/i);
  assert.match(
    demonstration,
    /NO-GO until critical evidence and mitigations are supplied/,
  );
  assert.match(demonstration, /Readiness Report Preview/);
  assert.match(demonstration, /T\+24h and T\+72h/);
  assert.match(demonstration, /Valid only for the reviewed plan and for 14 days/);

  assert.match(page, /ITSM, CAB, and change ownership/);
  assert.match(page, /OpsMemory and sourced context/);
  assert.match(page, /MSP technical and service leaders/);
  assert.match(page, /Internal IT and infrastructure teams/);
  assert.match(page, /Regulated or uptime-sensitive organizations/);
  assert.match(page, /Change-workflow assessment/);
  assert.match(page, /Sanitized acceptance testing/);
  assert.match(page, /Ongoing tuning and quality review/);
  assert.match(page, /<FAQ items={service\.faq}/);
  assert.match(page, /generateFAQSchema\(service\.faq\)/);
  assert.match(page, /generateServiceSchema\(service\)/);
  assert.match(opsMemory, /href="\/it-change-readiness"/);

  const faqQuestions = [
    "What is an AI-assisted IT change readiness review?",
    "Does ITECS Change Assurance execute infrastructure changes?",
    "How are critical prerequisites verified?",
    "Which changes require a full review?",
    "What is included in the readiness report?",
    "Can a technician override a no-go verdict?",
    "Can it use our documentation and ticketing process?",
    "Does it replace a change advisory board or change owner?",
  ];
  for (const question of faqQuestions) {
    assert.match(product, new RegExp(question.replace(/[?]/g, "\\?")));
  }

  assert.match(homepage, /IT Operations & Change Assurance/);
  assert.match(homepage, /AI-Assisted IT Change Readiness/);
  assert.match(homepage, /badge: "Review-only"/);
  assert.match(homepage, /cta: "Explore Change Assurance"/);
  assert.match(homepage, /href: CHANGE_ASSURANCE_SERVICE\.href/);
  assert.match(homepage, /It never executes the change\./);
  assert.match(homepage, /PPV_AGENT_USE_CASE/);
  assert.match(homepage, /FIELD_EXAM_ANALYZER_USE_CASE/);
  assert.match(homepage, /title: "ITECS OpsMemory"/);
  assert.match(homepage, /md:grid-cols-2/);

  assert.match(sitemap, /CHANGE_ASSURANCE_SERVICE\.href/);
  assert.match(knowledge, /CHANGE_ASSURANCE_SERVICE/);
  assert.match(knowledge, /change readiness\|change risk\|change plan/);
  assert.match(validation, /"\/it-change-readiness"/);
  for (const summary of [ai, llms, llmsFull]) {
    assert.match(summary, /ITECS Change Assurance/);
    assert.match(summary, /https:\/\/itecs\.ai\/it-change-readiness/);
    assert.match(summary, /technician-reported live verification/);
    assert.match(summary, /never executes/i);
  }

  assert.doesNotMatch(publicProductText, /GAUNTLET/i);
  assert.doesNotMatch(
    publicProductText,
    /HaloPSA|Jira|ServiceNow|Freshservice|direct (?:Slack|Teams|CMDB|infrastructure-discovery) connector/i,
  );
  assert.doesNotMatch(
    publicProductText,
    /prevents all outages|eliminates risk|guaranteed success|equivalent to a 20-year engineer|validated customer outcome|presented as a customer case study/i,
  );
  assert.doesNotMatch(
    changeContent,
    /\d+(?:\.\d+)?%|\bROI\b|payback|times faster|x faster|hours saved|customer count|market share/i,
  );
  assert.doesNotMatch(
    page,
    /"@type": "(?:Product|SoftwareApplication|Offer|AggregateRating|Review)"/,
  );
  assert.equal(existsSync(join(root, "src/app/gauntlet/page.tsx")), false);
  assert.equal(existsSync(join(root, "src/app/changeguard/page.tsx")), false);
  assert.equal(existsSync(join(root, "src/app/preflight/page.tsx")), false);
});
