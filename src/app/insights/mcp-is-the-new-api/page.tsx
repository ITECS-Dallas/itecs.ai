import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "mcp-is-the-new-api")!;
const heroImage = "/images/insights/mcp-is-the-new-api-hero.png";

export const metadata = generatePageMetadata({
  title: insight.title,
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Anthropic — Donating the Model Context Protocol",
    href: "https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation",
    description:
      "Anthropic's December 9, 2025 announcement donating MCP to the Linux Foundation's new Agentic AI Foundation, with adoption metrics and governance details.",
  },
  {
    label: "Linux Foundation — Agentic AI Foundation (AAIF)",
    href: "https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation",
    description:
      "Official Linux Foundation press release announcing the AAIF, founding members, and seed projects including MCP, goose, and AGENTS.md.",
  },
  {
    label: "Model Context Protocol — 2026 Roadmap",
    href: "https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/",
    description:
      "The MCP project's 2026 roadmap covering transport scalability, agent communication, governance maturation, and enterprise readiness.",
  },
  {
    label: "IBM — What is Model Context Protocol?",
    href: "https://www.ibm.com/think/topics/model-context-protocol",
    description:
      "IBM's enterprise overview of MCP, governance considerations, and how it integrates into watsonx and agentic enterprise architectures.",
  },
  {
    label: "NIST AI Risk Management Framework",
    href: "https://www.nist.gov/itl/ai-risk-management-framework",
    description:
      "The U.S. National Institute of Standards and Technology framework that ITECS uses as the policy backbone for AI governance and risk management.",
  },
  {
    label: "ITECS Managed Intelligence Provider",
    href: "/managed-intelligence-provider",
    description:
      "ITECS' Managed Intelligence Provider service page for Dallas businesses adopting governed AI agents, automations, and MCP-based workflows.",
  },
];

export default function McpIsTheNewApiPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="MCP Is the New API"
      faqHeading="Model Context Protocol FAQ"
      sources={sources}
      ctaText="Need a governed way to plug AI agents into your business systems?"
      heroImage={heroImage}
      heroImageAlt="Abstract managed MCP gateway diagram brokering AI assistants and business systems for a Dallas business"
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="9 min read"
    />
  );
}
