import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { AgentAuthControlTable } from "@/components/sections/AgentAuthControlTable";
import { SequenceAuthDiagram } from "@/components/sections/SequenceAuthDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-agent-authorization-control-sequences"
)!;
const heroImage = "/images/insights/ai-agent-authorization-hero.png";

export const metadata = generatePageMetadata({
  title: "AI Agent Authorization: Control Sequences, Not Actions",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "AWS — Securing AI agents with temporal policies in Amazon Bedrock AgentCore",
    href: "https://aws.amazon.com/blogs/machine-learning/securing-ai-agents-with-temporal-policies-in-amazon-bedrock-agentcore/",
    description:
      "AWS's August 2026 introduction of temporal policies — stateful gateway authorization that evaluates a tool call against the agent's session history, with prerequisite-order, output-matching, and cumulative-spend examples.",
  },
  {
    label: "AWS Open Source — Introducing Dogwood: runtime verification for AI agents",
    href: "https://aws.amazon.com/blogs/opensource/introducing-dogwood-runtime-verification-for-ai-agents/",
    description:
      "AWS's release of Dogwood, an open-source policy language built on Cedar for history-aware agent authorization, noting the reference interpreter is for testing rather than production enforcement.",
  },
  {
    label: "The New Stack — AWS's Dogwood aims to fix the valid-but-wrong agent tool call",
    href: "https://thenewstack.io/aws-dogwood-agent-policies/",
    description:
      "Coverage of Dogwood and why authorizing sequences of agent actions — not just each isolated call — is the emerging control for long-running agents.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for designing and governing AI agents with sequence-aware authorization, gateway enforcement, cumulative caps, and recorded human approval.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS audit that threat-models an agent's high-risk tool chains before it runs unattended in production.",
  },
];

export default function AIAgentAuthorizationPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Agent Authorization"
      faqHeading="AI Agent Authorization FAQ"
      sources={sources}
      ctaText="Running agents that chain tool calls? Let's authorize the sequence, not just the click."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of sequence-aware AI agent authorization — a chain of agent tool calls flowing through a gateway policy engine that checks each call against the session history, allowing the correct ordered sequence and denying an out-of-order or over-budget call, in violet and blue"
      heroCaption="The danger is the chain, not the click. A gateway policy judges each tool call against the whole sequence before it runs."
      blocks={{
        CONTROL_TABLE: <AgentAuthControlTable />,
        READINESS_DIAGRAM: <SequenceAuthDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
