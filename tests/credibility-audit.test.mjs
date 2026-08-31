import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const read = (relativePath) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

const constants = read("src/lib/constants.ts");
const siteConfig = read("src/lib/site-config.ts");
const footer = read("src/components/layout/Footer.tsx");
const trustBar = read("src/components/sections/TrustBar.tsx");
const testimonials = read("src/components/sections/Testimonials.tsx");
const casePage = read("src/app/case-studies/[slug]/page.tsx");
const assessmentPage = read("src/app/assessment/page.tsx");
const assessmentForm = read("src/components/forms/AIReadinessAssessmentForm.tsx");
const assessmentRoute = read("src/app/api/assessment/route.ts");
const trainingWorkflow = read("src/components/sections/TrainingWorkflowDiagram.tsx");
const automationPage = read("src/app/automation/page.tsx");
const crmPage = read("src/app/crm-sales-ai/page.tsx");
const contactForm = read("src/components/forms/ContactForm.tsx");
const logoWall = read("src/components/ui/LogoWall.tsx");
const aboutStats = read("src/app/about/AboutStats.tsx");
const serviceStats = read("src/components/sections/ServiceStats.tsx");
const publicConversionCopy = [
  constants,
  siteConfig,
  footer,
  read("src/app/about/page.tsx"),
  read("src/app/ai-devops/page.tsx"),
  read("src/app/ai-optimized-seo/page.tsx"),
  read("src/app/ai-receptionist/page.tsx"),
  read("src/app/assessment/page.tsx"),
  read("src/app/automation/page.tsx"),
  read("src/app/chatgpt-codex-training/page.tsx"),
  read("src/app/claude-cowork-training/page.tsx"),
  read("src/app/consulting/page.tsx"),
  read("src/app/contact/page.tsx"),
  read("src/app/copilot-training/page.tsx"),
  read("src/app/crm-sales-ai/page.tsx"),
  read("src/app/custom-ai-agents/page.tsx"),
  read("src/app/data-audit/page.tsx"),
  read("src/app/financial-services/page.tsx"),
  read("src/app/financial-services/field-examination-analyzer/page.tsx"),
  read("src/app/manufacturing/page.tsx"),
  read("src/app/manufacturing/ppv-agent/page.tsx"),
  read("src/app/services/page.tsx"),
  read("src/app/training/page.tsx"),
  read("src/components/sections/FinancialServicesSpokePage.tsx"),
  read("src/components/sections/ManufacturingSpokePage.tsx"),
].join("\n");

describe("2026 website credibility audit contract", () => {
  it("keeps the corrected company facts on shared public surfaces", () => {
    assert.match(constants, /value: 7000, suffix: "\+", label: "Managed Endpoints"/);
    assert.match(constants, /value: 95, suffix: "%", label: "Client Retention Rate"/);
    assert.match(constants, /value: "7,000\+", label: "Managed Endpoints"/);
    assert.match(
      constants,
      /ITECS maintains 24\/7 NOC coverage[\s\S]*?NOC is not represented as Dallas-based/,
    );
    assert.doesNotMatch(constants, /value: 92, suffix: "%"/);
    assert.doesNotMatch(constants, /value: 200, suffix: "\+"/);
    assert.doesNotMatch(constants, /500\+ Endpoints Under Management/);
  });

  it("uses Managed Intelligence Provider and rejects the incorrect expansion", () => {
    assert.match(constants, /Managed Intelligence Provider/);
    assert.doesNotMatch(constants, /Managed Integration Provider/i);
  });

  it("states credential and attestation scope without false certifications", () => {
    assert.match(constants, /Promus Hosting — SOC 2 Type II/);
    assert.match(
      footer,
      /SOC 2 Type II[\s\S]*?applies only to ITECS Promus managed cloud hosting/,
    );
    assert.match(constants, /CMMC Readiness Services/);
    assert.doesNotMatch(constants.slice(constants.indexOf("export const CERTIFICATION_BADGES")), /label: "ISO 27001"/);
    assert.doesNotMatch(constants, /ITECS's SOC 2 Type II, ISO 27001/);
  });

  it("links every displayed testimonial directly to Google Maps or G2", () => {
    assert.match(siteConfig, /googleMapsUrl: "https:\/\/maps\.app\.goo\.gl\//);
    assert.match(siteConfig, /g2ReviewsUrl: "https:\/\/www\.g2\.com\/products\/itecs-outsourcing\/reviews"/);
    assert.match(constants, /sourceHref: SITE_CONFIG\.googleMapsUrl/);
    assert.match(constants, /sourceHref: SITE_CONFIG\.g2ReviewsUrl/g);
    assert.match(testimonials, /href=\{testimonial\.sourceHref\}/);
    assert.doesNotMatch(constants, /sourceLabel: "Pegasus Foods case study"/);
  });

  it("makes company proof and client-logo evidence directly inspectable", () => {
    assert.match(constants, /href: "\/case-studies\/pegasus-foods-zero-downtime-relocation"/);
    assert.match(constants, /href: "\/case-studies\/opentext-dallas-onsite-support"/);
    assert.match(constants, /href: "\/case-studies\/pepsico-subsidiary-it-transitions"/);
    assert.match(logoWall, /logo\.href[\s\S]*?Read the \$\{logo\.name\} case study/);
    assert.match(aboutStats, /SITE_CONFIG\.companyFactsUrl/);
    assert.match(aboutStats, /SITE_CONFIG\.retentionSourceUrl/);
    assert.match(serviceStats, /SITE_CONFIG\.companyFactsUrl/);
    assert.match(serviceStats, /SITE_CONFIG\.retentionSourceUrl/);
    assert.doesNotMatch(constants, /sourceLabel: "Verify (?:partner|Sophos|Check Point)/);
  });

  it("states contact-data use and links the existing privacy policy", () => {
    assert.match(contactForm, /uses the information submitted here to respond/);
    assert.match(contactForm, /https:\/\/itecsonline\.com\/privacy-policy/);
  });

  it("labels logos, scenarios, targets, and historical cases honestly", () => {
    assert.match(trustBar, /Published historical case studies/);
    assert.match(trustBar, /do not imply a current[\s\S]*?engagement, endorsement, or AI-specific result/);
    assert.doesNotMatch(constants, /title: "Anonymized .* scenario"/);
    assert.match(casePage, /Metrics below are source-reported/);
    assert.doesNotMatch(casePage, /caseStudy\.quote/);
    assert.doesNotMatch(constants, /\$1,467 per minute/);
  });

  it("separates the no-cost intake from the paid readiness assessment", () => {
    assert.match(assessmentPage, /no-cost intake, not the paid AI Readiness/);
    assert.match(assessmentPage, /formalAssessment\.price/);
    assert.match(constants, /name: "AI Readiness Assessment"[\s\S]*?price: "\$6,500"/);
    assert.match(assessmentForm, /Intake received/);
    assert.doesNotMatch(assessmentForm, /Dallas-based architect|Talk to an architect/);
    assert.match(assessmentRoute, /formName: "AI Readiness Intake"/);
    assert.match(assessmentRoute, /We could not send your intake/);
    assert.doesNotMatch(assessmentRoute, /Assessment request received/);
  });

  it("rejects inherited timing and result guarantees on shared conversion surfaces", () => {
    assert.doesNotMatch(trainingWorkflow, /AI-Proficient Team in 2 Weeks/);
    assert.doesNotMatch(automationPage, /10–20\+ multi-step pipelines|3–6 months of tinkering/);
    assert.doesNotMatch(crmPage, /Instant, automated|Real-time, auto-enriched/);
  });

  it("rejects the report's obsolete credentials, proof labels, and contact facts", () => {
    for (const forbidden of [
      /ISO\s*27001/i,
      /92%/,
      /500\+\s+endpoints/i,
      /200\+\s+client engagements/i,
      /approved live proof/i,
      /17250\s+Dallas/i,
      /12700\s+Park Central/i,
      /214-777-0050/,
      /info@itecsonline\.com/i,
    ]) {
      assert.doesNotMatch(publicConversionCopy, forbidden);
    }
  });
});
