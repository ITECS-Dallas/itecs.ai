import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { CodingAgentComparisonTable } from "@/components/sections/CodingAgentComparisonTable";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "openai-codex-vs-claude-code")!;
const heroImage = "/images/insights/openai-codex-vs-claude-code-hero.png";

export const metadata = {
  ...generatePageMetadata({
    title: "OpenAI Codex vs. Claude Code: Enterprise Coding Agents Compared",
    description: insight.description,
    path: insight.href,
    keywords: insight.keywords,
    ogImage: heroImage,
  }),
  title: "OpenAI Codex vs. Claude Code: Enterprise Coding Agents",
};

const sources: ArticleSource[] = [
  {
    label: "OpenAI — Codex",
    href: "https://openai.com/codex/",
    description:
      "OpenAI's current Codex product page covering available surfaces, agent workflows, and product capabilities.",
  },
  {
    label: "OpenAI Developers — Codex",
    href: "https://developers.openai.com/codex/",
    description:
      "OpenAI's current developer documentation for Codex setup, permissions, environments, and supported workflows.",
  },
  {
    label: "Anthropic — Claude Code overview",
    href: "https://docs.anthropic.com/en/docs/claude-code/overview",
    description:
      "Anthropic's current Claude Code documentation covering supported development workflows and deployment surfaces.",
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
