import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { LongRunningAgentControlTable } from "@/components/sections/LongRunningAgentControlTable";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "long-running-ai-agents-control-seven-day-workflows",
)!;
const heroImage = "/images/insights/long-running-ai-agents-hero.png";

export const metadata = generatePageMetadata({
  title: "Long-Running AI Agents: Control Seven-Day Workflows",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Google Cloud — What's new in Gemini Enterprise Agent Platform",
    href: "https://cloud.google.com/blog/products/ai-machine-learning/whats-new-in-gemini-enterprise-agent-platform",
    description:
      "Google Cloud's July 29, 2026 announcement of Agent Runtime workflows that can run continuously for up to seven days, alongside Memory Bank, Agent Identity, Agent Gateway, Agent Registry, observability, and evaluation capabilities.",
  },
  {
    label: "Google Cloud — Introducing Agent Executor",
    href: "https://cloud.google.com/blog/products/ai-machine-learning/agent-executor-googles-distributed-agent-runtime/",
    description:
      "Google Cloud's May 20, 2026 explanation of durable execution, event logs, snapshots, human-in-the-loop resumption, secure isolation, session consistency, connection recovery, and checkpoint branching.",
  },
  {
    label: "Google Cloud — Agent Identity overview",
    href: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview",
    description:
      "Current guidance on unique per-agent identities, certificate-bound credentials, least privilege, access revocation, and audit attribution for agents acting under their own or a user's authority.",
  },
  {
    label: "Google Cloud — Monitor Agent Runtime",
    href: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/monitoring",
    description:
      "Current monitoring guidance for built-in request and resource metrics, custom tool-call metrics, dashboards, and alert policies for deployed agents.",
  },
  {
    label: "Google Cloud — Generate Memory Bank memories",
    href: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank/generate-memories",
    description:
      "Current Memory Bank guidance, including scoped persistence and Google's warning that sensitive or personal information may still be stored despite filtering instructions.",
  },
  {
    label: "Google Cloud — Manage spend cap budgets",
    href: "https://docs.cloud.google.com/billing/docs/how-to/budgets-spend-caps",
    description:
      "Current preview guidance for project-and-service spend caps, supported services, enforcement behavior, in-flight request limits, and costs that can continue after a cap is triggered.",
  },
  {
    label: "ITECS — Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for designing and operating bounded agents with scoped identities, approved tools, checkpoints, action gates, observability, and acceptance testing.",
  },
  {
    label: "ITECS — Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS assessment for source ownership, permissions, retention, risk, and operating controls before an agent receives persistent access to business systems.",
  },
];

export default function LongRunningAIAgentsPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Long-Running AI Agents"
      faqHeading="Long-Running AI Agent Governance FAQ"
      sources={sources}
      ctaText="Planning a multi-day agent workflow? Define its run contract, identity, checkpoints, and acceptance gate before it reaches production."
      heroImage={heroImage}
      heroImageAlt="Abstract technical illustration of a long-running AI agent crossing monitored checkpoints, approval gates, protected state, a stop control, and final verification before reaching a downstream system"
      heroCaption="A durable runtime can keep an agent working for days. A run contract determines what it may do, when it must stop, and who accepts the result."
      blocks={{
        CONTROL_TABLE: <LongRunningAgentControlTable />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="12 min read"
    />
  );
}
