import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { PlanComparisonTable } from "@/components/sections/PlanComparisonTable";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "claude-plan-comparison")!;
const heroImage = "/images/insights/claude-plan-comparison-hero.png";

export const metadata = generatePageMetadata({
  title: insight.title,
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Claude Plans & Pricing",
    href: "https://claude.com/pricing",
    description:
      "Anthropic's official pricing page for Free, Pro, Max, Team, and Enterprise — the source for current per-plan prices, seats, and features.",
  },
  {
    label: "Claude Help Center — What is the Max plan?",
    href: "https://support.claude.com/en/articles/11049741-what-is-the-max-plan",
    description:
      "Official confirmation that Max 5x is $100/month (5x Pro usage) and Max 20x is $200/month (20x Pro usage), plus how the five-hour and weekly limits work.",
  },
  {
    label: "Claude Help Center — Usage and length limits",
    href: "https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work",
    description:
      "How Claude meters usage against a rolling window, and the 200K context window on paid plans versus 500K on some Enterprise models.",
  },
  {
    label: "Anthropic Trust Center",
    href: "https://trust.anthropic.com",
    description:
      "Anthropic's security, compliance, and data-handling documentation — certifications and the commitment not to train on business-plan content by default.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS AI consulting and readiness engagements that right-size Claude seats, configure governance, and build a board-ready adoption plan.",
  },
  {
    label: "ITECS Data and AI Readiness Audit",
    href: "/data-audit",
    description:
      "The data classification and access-control review ITECS runs before connecting Claude to sensitive business systems.",
  },
];

export default function ClaudePlanComparisonPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Claude Plan Comparison"
      faqHeading="Claude Plan Comparison FAQ"
      sources={sources}
      ctaText="Not sure which Claude plan fits your team — or how to deploy it securely?"
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization comparing five Claude subscription tiers — Free, Pro, Max, Team, and Enterprise — as ascending illuminated columns in violet and blue, representing rising price, usage limits, and security controls"
      heroCaption="The five Claude plans rise in price, usage, and control — Free and Pro for individuals, Max for heavy users, Team and Enterprise for businesses that need admin and compliance."
      tableNode={<PlanComparisonTable />}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="10 min read"
    />
  );
}
