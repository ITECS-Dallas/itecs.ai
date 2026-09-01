import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { AgentConsultationFlow } from "@/components/sections/AgentConsultationFlow";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (item) => item.slug === "how-to-make-ai-agents-talk",
)!;

export const metadata = generatePageMetadata({
  title: "How to Make Two AI Agents Talk to Each Other",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
});

const sources: ArticleSource[] = [
  {
    label: "OpenAI — Codex SDK",
    href: "https://developers.openai.com/codex/sdk/",
    description:
      "Current official documentation for embedding Codex in internal workflows and starting, continuing, or resuming local Codex threads by ID.",
  },
  {
    label: "OpenAI — Agent orchestration",
    href: "https://openai.github.io/openai-agents-js/guides/multi-agent/",
    description:
      "Official guidance distinguishing manager-owned agent-as-tool consultation from conversation handoffs, plus deterministic code orchestration and evaluator loops.",
  },
  {
    label: "OpenAI — Agent sessions",
    href: "https://openai.github.io/openai-agents-js/guides/sessions/",
    description:
      "Official documentation for persistent agent memory, stored conversation items, conversation IDs, session backends, resumption, and compaction.",
  },
  {
    label: "OpenAI — Agent tracing",
    href: "https://openai.github.io/openai-agents-js/guides/tracing/",
    description:
      "Official tracing guidance for agent runs, turns, generations, tool calls, handoffs, guardrails, trace grouping, and sensitive-data controls.",
  },
  {
    label: "OpenAI — Codex code review",
    href: "https://developers.openai.com/codex/code-review/",
    description:
      "Current official workflow for applying a dedicated reviewer to a selected, completed code change and returning prioritized findings without changing the working tree.",
  },
  {
    label: "Agent2Agent Protocol — Current specification",
    href: "https://a2a-protocol.org/latest/specification/",
    description:
      "The current A2A data and lifecycle contract for agent identity, messages, task and context identifiers, multi-turn interaction, authentication, history, artifacts, and cancellation.",
  },
  {
    label: "Anthropic — Claude Fable 5",
    href: "https://www.anthropic.com/news/claude-fable-5-mythos-5",
    description:
      "Anthropic's current first-party announcement and update record for the Fable 5 model referenced in the ITECS consultation pattern.",
  },
  {
    label: "NIST — Generative AI Profile",
    href: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
    description:
      "NIST's cross-sector companion to the AI Risk Management Framework for governing, mapping, measuring, and managing generative-AI risks across the lifecycle.",
  },
  {
    label: "ITECS — Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for designing governed agents around approved workflows, data, tools, permissions, evidence, human decisions, and production operating controls.",
  },
  {
    label: "ITECS — AI DevOps",
    href: "/ai-devops",
    description:
      "ITECS operating model for versioned agent releases, evaluation, observability, incident response, rollback, and managed improvement.",
  },
];

export default function HowToMakeAIAgentsTalkPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Two AI Agents Talking"
      faqHeading="AI Agent-to-Agent Communication FAQ"
      sources={sources}
      ctaText="Want two AI agents to collaborate without losing ownership, context, or control? ITECS can scope one bounded consultation, define its message and evidence contract, connect approved model interfaces, test disagreement and failure paths, and establish the review and operating controls required for production."
      blocks={{
        AGENT_CONSULTATION_FLOW: <AgentConsultationFlow />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="16 min read"
    />
  );
}
