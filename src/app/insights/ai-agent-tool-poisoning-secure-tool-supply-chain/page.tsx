import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { AIAgentToolSupplyChainTable } from "@/components/sections/AIAgentToolSupplyChainTable";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-agent-tool-poisoning-secure-tool-supply-chain",
)!;
const heroImage = "/images/insights/ai-agent-tool-poisoning-hero.png";

export const metadata = generatePageMetadata({
  title: "AI Agent Tool Poisoning: Secure the Tool Supply Chain",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Google Cloud — Advanced security governance for autonomous agents",
    href: "https://cloud.google.com/blog/topics/ai-infrastructure/state-of-ai-infrastructure-report-agent-governance-and-security",
    description:
      "Google Cloud's August 25, 2026 warning that tool poisoning and indirect prompt injection can hijack agent logic, with guidance on provenance, purpose-built permissions, oversight, and human approval for critical actions.",
  },
  {
    label: "ISACA — Four governance questions before an AI agent goes live",
    href: "https://www.isaca.org/resources/news-and-trends/isaca-now-blog/2026/four-governance-questions-to-ask-before-an-ai-agent-goes-live",
    description:
      "ISACA's August 24, 2026 production-agent guidance on delegation chains, approved tool registries, pinned packages, schema review, exercised-scope monitoring, and accountable lifecycle records.",
  },
  {
    label: "OWASP — Top 10 for Agentic Applications 2026",
    href: "https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/",
    description:
      "OWASP's community security framework covering Agentic Supply Chain Vulnerabilities and related risks, with mitigations for provenance, pinning, sandboxing, telemetry, staged updates, rollback, and emergency disablement.",
  },
  {
    label: "Google Cloud — The files AI coding agents trust",
    href: "https://cloud.google.com/blog/products/identity-security/beyond-source-code-the-files-ai-coding-agents-trust-and-attackers-exploit",
    description:
      "Google Cloud security research on persistent instruction files, runtime configuration, extensions, publisher compromise, poisoned update paths, and why semantic inspection must complement signature-based scanning.",
  },
  {
    label: "ITECS — Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for designing and operating bounded AI agents with controlled tools, business context, permissions, approval points, and measurable outcomes.",
  },
  {
    label: "ITECS — AI DevOps",
    href: "/ai-devops",
    description:
      "ITECS operating model for versioned agent releases, evaluations, observability, incident controls, rollback, and production change governance.",
  },
  {
    label: "ITECS — Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS assessment for mapping data sources, classifications, identities, owners, integrations, retention, and risk before AI tools receive production access.",
  },
];

export default function AIAgentToolPoisoningPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Agent Tool Poisoning"
      faqHeading="AI Agent Tool Supply-Chain FAQ"
      sources={sources}
      ctaText="Need a production-safe agent toolchain? ITECS can inventory tools and MCP servers, define admission and change gates, narrow identities and data access, build behavioral telemetry, and test a quarantine drill before agents receive broader authority."
      heroImage={heroImage}
      heroImageAlt="Abstract AI orchestration core verifying connected tool modules at a security gateway while a suspect module is diverted into an isolated quarantine chamber"
      heroCaption="An agent tool is more than executable code. Its publisher, package, description, schema, permissions, endpoint, dependencies, and update path form one governed trust object."
      blocks={{
        TOOL_SUPPLY_CHAIN_TABLE: <AIAgentToolSupplyChainTable />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="15 min read"
    />
  );
}
