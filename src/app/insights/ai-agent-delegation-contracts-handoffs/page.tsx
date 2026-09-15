import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { AIAgentDelegationContractTable } from "@/components/sections/AIAgentDelegationContractTable";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-agent-delegation-contracts-handoffs",
)!;

export const metadata = generatePageMetadata({
  title: "AI Agent Delegation: Define Contracts and Handoffs",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: insight.image.src,
});

const sources: ArticleSource[] = [
  {
    label: "Google Cloud — How agents can delegate better",
    href: "https://cloud.google.com/blog/products/ai-machine-learning/how-agents-can-delegate-better",
    description:
      "Google Cloud's August 21, 2026 guidance on contract-first decomposition, cost-aware assignment, minimum permissions, verifiable outcomes, and the risk of compliant agents propagating misaligned intent.",
  },
  {
    label: "Google DeepMind — Intelligent AI Delegation",
    href: "https://arxiv.org/abs/2602.11865",
    description:
      "The February 2026 research paper proposing an adaptive framework for task allocation, authority, responsibility, accountability, boundaries, monitoring, verification, and failure handling across human and AI delegation chains.",
  },
  {
    label: "Google DeepMind — Three Layers of Agent Security",
    href: "https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/securing-the-future-of-ai-agents/three-layers-of-agent-security.pdf",
    description:
      "Google DeepMind's June 2026 security paper, including current cautions about multi-agent complexity, accountability gaps, and the fact that adding agents does not automatically make a system safer or more capable.",
  },
  {
    label: "A2A Protocol — Current specification",
    href: "https://a2a-protocol.org/latest/specification/",
    description:
      "The current Agent2Agent specification for agent discovery, task lifecycles, messages, artifacts, capability validation, security, and task-history semantics.",
  },
  {
    label: "ITECS — Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for designing governed AI agents around approved business processes, systems, permissions, and human controls.",
  },
  {
    label: "ITECS — AI DevOps",
    href: "/ai-devops",
    description:
      "ITECS operating model for versioned AI releases, evaluations, observability, incident response, rollback, and production support.",
  },
  {
    label: "ITECS — Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS assessment for mapping approved data, identities, integrations, owners, and risks before production AI access is granted.",
  },
];

export default function AIAgentDelegationContractsPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Agent Delegation"
      faqHeading="AI Agent Delegation FAQ"
      sources={sources}
      ctaText="Need a production-ready delegation model? ITECS can decompose one workflow, define its contract and evidence envelope, implement task-scoped permissions, exercise failures, and establish the operating controls required before agents delegate autonomously."
      heroCaption="Reliable multi-agent work is not a chain of messages. It is a chain of bounded assignments, attenuated authority, verifiable evidence, and accountable acceptance decisions."
      blocks={{
        DELEGATION_CONTRACT_TABLE: <AIAgentDelegationContractTable />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="15 min read"
    />
  );
}
