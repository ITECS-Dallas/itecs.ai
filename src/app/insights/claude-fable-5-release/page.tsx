import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "claude-fable-5-release")!;
const heroImage = "/images/insights/claude-fable-5-release-hero.png";

export const metadata = generatePageMetadata({
  title: insight.title,
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Anthropic — Claude Fable 5 and Claude Mythos 5 announcement",
    href: "https://www.anthropic.com/news/claude-fable-5-mythos-5",
    description:
      "Anthropic's June 9, 2026 launch post describing Fable 5 as state-of-the-art on nearly all tested benchmarks, the Mythos 5 restrictions, the three safeguard categories, and platform availability.",
  },
  {
    label: "Anthropic — Introducing Claude Fable 5 and Claude Mythos 5 (API docs)",
    href: "https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5",
    description:
      "Official model documentation covering pricing ($10/M input, $50/M output), the Opus 4.8 safeguard fallback, the under-5%-of-sessions trigger rate, and subscription availability through June 22, 2026.",
  },
  {
    label: "Anthropic Acceptable Use Policy",
    href: "https://www.anthropic.com/legal/aup",
    description:
      "Anthropic's usage policy describing the boundaries the Fable 5 cybersecurity, biology, and distillation safeguards enforce.",
  },
  {
    label: "NIST AI Risk Management Framework",
    href: "https://www.nist.gov/itl/ai-risk-management-framework",
    description:
      "The U.S. National Institute of Standards and Technology framework ITECS uses as the governance backbone for every AI model and agent deployment.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS AI consulting and readiness engagements — model selection, cost guardrails, and a board-ready AI adoption and governance roadmap.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service page for governed custom AI agents that route work across models, with scoped credentials, audit logging, and human approval gates.",
  },
];

export default function ClaudeFable5ReleasePage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Claude Fable 5"
      faqHeading="Claude Fable 5 FAQ"
      sources={sources}
      ctaText="Want Anthropic's newest model working for your business without the bill surprises?"
      heroImage={heroImage}
      heroImageAlt="Abstract dark operations center visualization of Claude Fable 5 benchmark dominance — towering cyan and violet performance bars above shorter competitor bars beside a draining amber usage-limit ring"
      heroCaption="Fable 5 tops the field on coding and knowledge-work benchmarks (the tall cyan-violet bars) while consuming subscription usage limits about twice as fast as Opus 4.8 (the draining ring)."
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="9 min read"
    />
  );
}
