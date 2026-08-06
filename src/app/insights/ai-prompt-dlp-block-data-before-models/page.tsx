import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { PromptDLPDecisionTable } from "@/components/sections/PromptDLPDecisionTable";
import { DLPRolloutDiagram } from "@/components/sections/DLPRolloutDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-prompt-dlp-block-data-before-models"
)!;
const heroImage = "/images/insights/ai-prompt-dlp-hero.png";

export const metadata = generatePageMetadata({
  title: "AI Prompt DLP: Block Data Before It Reaches Models",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Anthropic — Inference hooks: inline data loss prevention for Claude Enterprise",
    href: "https://claude.com/blog/claude-enterprise-inference-hooks",
    description:
      "Anthropic's August 5, 2026 launch of inference hooks, which route every governed prompt and tool response through your security server for an allow or deny verdict before inference.",
  },
  {
    label: "Claude Platform Docs — Inference hooks",
    href: "https://platform.claude.com/docs/en/manage-claude/inference-hooks",
    description:
      "The official documentation for the inference hooks webhook schema, verdict timeout, signing, governed surfaces, and shadow-mode rollout controls.",
  },
  {
    label: "Unite.AI — Anthropic Puts Inline Data Loss Prevention Inside Claude Enterprise",
    href: "https://www.unite.ai/anthropic-puts-inline-data-loss-prevention-inside-claude-enterprise/",
    description:
      "Same-day coverage of inference hooks and how the feature extends email- and web-style inline DLP to Claude chat, Claude Code, and Cowork.",
  },
  {
    label: "Zscaler — Integrating with Claude inference hooks",
    href: "https://www.zscaler.com/blogs/product-insights/zscaler-integrates-claude-inference-hooks-scale-ai-while-addressing-risks",
    description:
      "A DLP vendor's account of connecting an existing security platform to Claude inference hooks — an example of the integration pattern the feature is built for.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS vendor-neutral consulting that designs pre-inference DLP — surface selection, hook integration, shadow-mode rollout, failure handling, and compliance logging.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS audit that maps what data must never reach a model before you wire a pre-inference DLP gate to your AI surfaces.",
  },
];

export default function AIPromptDLPPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Prompt DLP"
      faqHeading="AI Prompt DLP FAQ"
      sources={sources}
      ctaText="Sensitive data reaching your AI models? Let's put a gate in front, not a log behind."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of pre-inference AI prompt DLP — an employee prompt passing through a security-server inspection gate that returns an allow or deny verdict before it reaches a model core, with denied prompts deflected and logged, in violet and blue"
      heroCaption="A prompt gate, not a log behind it. Sensitive content is inspected and allowed or denied before it ever reaches the model."
      blocks={{
        DECISION_TABLE: <PromptDLPDecisionTable />,
        ROLLOUT_DIAGRAM: <DLPRolloutDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
