import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { AIVendorExitPlanTable } from "@/components/sections/AIVendorExitPlanTable";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-vendor-exit-plan-critical-workflows",
)!;
const heroImage = "/images/insights/ai-vendor-exit-plan-hero.png";

export const metadata = generatePageMetadata({
  title: "AI Vendor Exit Plan: Keep Critical Workflows Running",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "TechRadar Pro — AI vendor dependency is becoming a resilience risk",
    href: "https://www.techradar.com/pro/ai-vendor-dependency-is-becoming-a-resilience-risk",
    description:
      "The August 20, 2026 opinion that asks how businesses will continue operating when an external access, policy, or provider decision removes an AI capability.",
  },
  {
    label: "Google Cloud — Grok 4.1 Fast model notice",
    href: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/grok/grok-4-1-fast",
    description:
      "Google's notice that its Gemini Enterprise Agent Platform stopped serving the Grok 4.1 Fast reasoning and non-reasoning endpoints on August 20, 2026, with migration guidance.",
  },
  {
    label: "Google Cloud — Open model deprecations",
    href: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deprecations/open-models",
    description:
      "Google's definitions of model deprecation and retirement, current schedules, and managed or self-deployed alternatives for affected Model as a Service endpoints.",
  },
  {
    label: "Google Cloud — Vertex AI and zero data retention",
    href: "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/vertex-ai-zero-data-retention",
    description:
      "Current examples of how retention can vary by service feature and configuration, reinforcing the need to verify terms and data paths for each workload.",
  },
  {
    label: "NIST — AI Risk Management Framework Core",
    href: "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/",
    description:
      "NIST outcomes for AI inventories, safe decommissioning, third-party risk, contingency processes, viable non-AI alternatives, and assigned disengagement authority.",
  },
  {
    label: "NIST — Contingency planning",
    href: "https://csrc.nist.gov/topics/security-and-privacy/security-programs-and-operations/contingency-planning",
    description:
      "NIST guidance for recovering systems, operations, and data through alternate technology or short-term manual processing based on business impact.",
  },
  {
    label: "ITECS — AI DevOps",
    href: "/ai-devops",
    description:
      "ITECS service for operating AI systems with versioned releases, evaluations, observability, incident controls, rollback, and production support.",
  },
  {
    label: "ITECS — Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS assessment for inventorying AI data, identities, integrations, owners, retention rules, and production risks before critical use.",
  },
];

export default function AIVendorExitPlanPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Vendor Exit Plan"
      faqHeading="AI Vendor Exit Planning FAQ"
      sources={sources}
      ctaText="Need an exit-ready AI operating model? ITECS can map provider dependencies, establish portable workflow boundaries, evaluate replacements, define recovery targets, and run a controlled failover exercise before a critical service is interrupted."
      heroImage={heroImage}
      heroImageAlt="Abstract enterprise AI workflow routing around a disabled provider gateway through evaluated replacement models and a manual operating path, then passing a recovery validation gate"
      heroCaption="An AI exit plan preserves the workflow, evidence, control boundary, and minimum business service—even when the preferred model or platform is no longer available."
      blocks={{
        EXIT_PLAN_TABLE: <AIVendorExitPlanTable />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="14 min read"
    />
  );
}
