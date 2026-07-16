import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { AIInfraDimensionTable } from "@/components/sections/AIInfraDimensionTable";
import { InfraReadinessDiagram } from "@/components/sections/InfraReadinessDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "agentic-ai-infrastructure-production-readiness"
)!;
const heroImage = "/images/insights/agentic-ai-infrastructure-hero.png";

export const metadata = generatePageMetadata({
  title: "Agentic AI Infrastructure: Production Readiness Checklist",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Google Cloud — State of AI Infrastructure report overview",
    href: "https://cloud.google.com/blog/products/compute/state-of-ai-infrastructure-report-overview/",
    description:
      "Google Cloud's overview of its 2026 State of AI Infrastructure report and the shift to production-grade agentic AI.",
  },
  {
    label: "Google Cloud — 2026 State of infrastructure in the agentic AI era",
    href: "https://cloud.google.com/resources/content/state-of-infrastructure-in-the-agentic-ai-era",
    description:
      "The report resource page, including the finding that 83% of organizations need infrastructure upgrades for production agentic AI.",
  },
  {
    label: "eWeek — Google Cloud Says 83% of Organizations Need Agentic AI Infrastructure Upgrades",
    href: "https://www.eweek.com/news/agentic-ai-infrastructure-upgrades/",
    description:
      "Independent reporting on the report's headline findings, including the inference tax and operational complexity figures.",
  },
  {
    label: "AIwire — Inside Google's New AI Infrastructure Report",
    href: "https://www.hpcwire.com/aiwire/2026/07/15/inside-googles-new-ai-infrastructure-report/",
    description:
      "Analysis of the report's compute, cost, and power findings for organizations moving agents into production.",
  },
  {
    label: "ITECS AI DevOps",
    href: "/ai-devops",
    description:
      "ITECS service for operating AI in production — agents, RAG, cost, observability, and release governance.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "The readiness review ITECS runs to benchmark data access, permissions, and cost before agents reach production.",
  },
];

export default function AgenticAIInfrastructurePage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Agentic AI Infrastructure"
      faqHeading="Agentic AI Infrastructure FAQ"
      sources={sources}
      ctaText="Moving agents from pilot to production? Assess your infrastructure readiness first."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of agentic AI infrastructure under load — a central agent core drawing on elastic compute, data, and network layers, with cost and power gauges, as many parallel actions fan out, in violet and blue"
      heroCaption="A single agent can fan out into hundreds of parallel actions. Production readiness means compute, data, governance, and cost that hold under that load."
      blocks={{
        DIMENSION_TABLE: <AIInfraDimensionTable />,
        READINESS_DIAGRAM: <InfraReadinessDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
