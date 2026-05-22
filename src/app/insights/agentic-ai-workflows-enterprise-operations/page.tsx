import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "agentic-ai-workflows-enterprise-operations")!;
const heroImage = "/images/insights/agentic-ai-workflows-enterprise-operations-hero.png";

export const metadata = generatePageMetadata({
  title: insight.title,
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "NIST AI Risk Management Framework",
    href: "https://www.nist.gov/itl/ai-risk-management-framework",
    description:
      "The U.S. National Institute of Standards and Technology framework that ITECS uses as the policy backbone for production agentic AI workflows.",
  },
  {
    label: "Anthropic — Building Effective AI Agents",
    href: "https://www.anthropic.com/research/building-effective-agents",
    description:
      "Anthropic's research summary on designing reliable agentic systems — when to use agents vs. workflows, and the planner/tool/observation loop ITECS implementations are based on.",
  },
  {
    label: "Microsoft — Responsible AI Standard",
    href: "https://www.microsoft.com/en-us/ai/responsible-ai",
    description:
      "Microsoft's enterprise-grade responsible AI standard that governs Azure OpenAI deployments, including the private endpoint, DLP, and audit log patterns ITECS uses for regulated industries.",
  },
  {
    label: "Linux Foundation — Agentic AI Foundation (AAIF)",
    href: "https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation",
    description:
      "The neutral, vendor-independent governance body now overseeing the Model Context Protocol and core agentic AI tooling — relevant for any business adopting MCP-based agent workflows.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS' Custom AI Agents service page for Dallas businesses moving agentic workflows from concept to governed production deployment.",
  },
  {
    label: "ITECS Managed Intelligence Provider",
    href: "/managed-intelligence-provider",
    description:
      "ITECS' Managed Intelligence Provider service page describing the operational layer — governance, observability, and rollout discipline — that keeps agentic AI workflows reliable in production.",
  },
];

export default function AgenticAiWorkflowsEnterpriseOperationsPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Agentic AI Workflows for Enterprise Operations"
      faqHeading="Agentic AI Workflows FAQ"
      sources={sources}
      ctaText="Ready to move your agentic AI workflow from pilot to production?"
      heroImage={heroImage}
      heroImageAlt="Enterprise agentic AI workflow architecture diagram showing planner model, MCP tool layer connecting to finance, procurement, and HR systems, and governance layer for a Dallas business operations center"
      heroCaption="A production-grade enterprise agentic AI workflow always has three layers — a planner model, a governed tool layer reaching into finance, procurement, and HR systems, and a governance layer with audit logging and human review. Treating any layer as optional is what causes pilots to fail."
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="10 min read"
    />
  );
}
