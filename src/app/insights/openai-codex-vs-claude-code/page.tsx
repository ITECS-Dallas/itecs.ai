import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { CodingAgentComparisonTable } from "@/components/sections/CodingAgentComparisonTable";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "openai-codex-vs-claude-code")!;
const heroImage = "/images/insights/openai-codex-vs-claude-code-hero.png";

export const metadata = generatePageMetadata({
  title: "OpenAI Codex vs. Claude Code: Enterprise Coding Agents Compared",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "OpenAI — Codex",
    href: "https://openai.com/codex/",
    description:
      "OpenAI's Codex product page covering GPT-5.5, parallel worktrees, cloud environments, and the agent sandbox.",
  },
  {
    label: "OpenAI Developers — GPT-5.5 model",
    href: "https://developers.openai.com/api/docs/models/gpt-5.5",
    description:
      "Official GPT-5.5 specifications — ~1.05M-token context window, 128K max output, pricing, and tool support including MCP.",
  },
  {
    label: "Anthropic — Introducing Claude Opus 4.8",
    href: "https://www.anthropic.com/news/claude-opus-4-8",
    description:
      "Anthropic's announcement of Claude Opus 4.8 (May 2026), its 1M-token context window, and Claude Code capabilities.",
  },
  {
    label: "OpenAI — Named a Leader in the 2026 Gartner Magic Quadrant for Enterprise AI Coding Agents",
    href: "https://openai.com/index/gartner-2026-agentic-coding-leader/",
    description:
      "OpenAI's announcement of its Leader placement in Gartner's 2026 Magic Quadrant for Enterprise AI Coding Agents.",
  },
  {
    label: "OWASP Top 10 for Large Language Model Applications",
    href: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    description:
      "The industry reference for AI application risks — excessive agency, insecure output handling — that govern how coding agents must be deployed.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for selecting, governing, and deploying custom AI agents with scoped credentials, sandboxing, and human approval gates.",
  },
];

export default function OpenAICodexVsClaudeCodePage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Codex vs. Claude Code"
      faqHeading="OpenAI Codex vs. Claude Code FAQ"
      sources={sources}
      ctaText="Choosing between OpenAI Codex and Claude Code for your engineering org?"
      heroImage={heroImage}
      heroImageAlt="Abstract dark split visualization comparing two enterprise AI coding agents — parallel sandboxed worktrees on one side and a deep large-context reasoning core on the other — in violet and blue"
      heroCaption="Two frontier coding agents, two architectures: Codex's parallel sandboxed worktrees versus Claude Code's deep, MCP-connected reasoning over a million-token context."
      tableNode={<CodingAgentComparisonTable />}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
