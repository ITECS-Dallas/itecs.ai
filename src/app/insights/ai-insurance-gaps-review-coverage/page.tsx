import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { AIClaimMappingTable } from "@/components/sections/AIClaimMappingTable";
import { CoverageReviewDiagram } from "@/components/sections/CoverageReviewDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-insurance-gaps-review-coverage"
)!;
const heroImage = "/images/insights/ai-insurance-gaps-hero.png";

export const metadata = generatePageMetadata({
  title: "AI Insurance Gaps: Review Coverage Before Deploying Agents",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Fenwick — The End of 'Silent AI'? Emerging AI Exclusions and Coverage Fragmentation",
    href: "https://www.fenwick.com/insights/publications/end-silent-ai-emerging-ai-exclusions-coverage-fragmentation-and-practical-implications",
    description:
      "Legal analysis of the shift away from silent AI coverage, the emerging AI exclusions, and the fragmentation of policy language across carriers.",
  },
  {
    label: "Business Insurance — Insurers, brokers adjust as AI exclusions emerge",
    href: "https://www.businessinsurance.com/insurers-brokers-adjust-as-ai-exclusions-emerge/",
    description:
      "Trade reporting on how carriers and brokers are responding to AI exclusions ahead of and through the 2026 renewal cycle.",
  },
  {
    label: "Policyholder Pulse — AI Exclusions in Insurance Policies: Broad Language, Uncertain Impact",
    href: "https://www.policyholderpulse.com/ai-exclusions-insurance-policies/",
    description:
      "Policyholder-side analysis of the ISO generative-AI exclusion endorsements and how broadly their language may reach.",
  },
  {
    label: "Insurance Insider — Is the market headed towards a second silent cyber problem with AI?",
    href: "https://www.insuranceinsider.com/sample-content/is-the-market-headed-towards-a-second-silent-cyber-problem-with-ai",
    description:
      "Market commentary noting that current endorsements address chatbots and generative AI but do not cleanly cover autonomous AI agents.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS AI consulting and governance engagements — AI inventory, scoped agent permissions, approval gates, and audit logging.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "The audit that produces the documented AI inventory and access record underwriters increasingly ask to see.",
  },
];

export default function AIInsuranceGapsPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Insurance Gaps"
      faqHeading="AI Insurance Gaps FAQ"
      sources={sources}
      ctaText="Deploying AI agents? Build the inventory, permissions, and audit trail your insurer will ask for."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of insurance coverage gaps around AI agents — a protective shield made of policy panels with visible fractures where an autonomous agent's activity slips through, in violet and blue"
      heroCaption="Autonomous agents fall between policies. Cyber, tech E&O, crime, and general liability can each be implicated — and each can exclude the loss."
      blocks={{
        CLAIM_TABLE: <AIClaimMappingTable />,
        REVIEW_DIAGRAM: <CoverageReviewDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
