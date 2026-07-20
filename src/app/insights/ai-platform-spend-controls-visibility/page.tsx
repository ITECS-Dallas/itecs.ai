import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { AISpendCriteriaTable } from "@/components/sections/AISpendCriteriaTable";
import { SpendGovernanceDiagram } from "@/components/sections/SpendGovernanceDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-platform-spend-controls-visibility"
)!;
const heroImage = "/images/insights/ai-platform-spend-controls-hero.png";

export const metadata = generatePageMetadata({
  title: "AI Platform Spend Controls: Buy AI With Visibility",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Gartner — Worldwide AI platforms and models market to reach $64B in 2026",
    href: "https://aninews.in/news/business/global-ai-platforms-and-models-market-to-grow-63-pc-to-usd-64-billion-in-2026-gartner20260720151040/",
    description:
      "Coverage of Gartner's July 20, 2026 forecast that AI platforms and models spending will reach $64 billion in 2026, up 63.4 percent from 2025.",
  },
  {
    label: "Gartner — Worldwide AI Spending forecast",
    href: "https://www.gartner.com/en/newsroom/press-releases/2026-05-19-gartner-forecasts-worldwide-ai-spending-to-grow-47-percent-in-2026",
    description:
      "Gartner's newsroom forecast for accelerating worldwide AI spending across models, platforms, software, and infrastructure.",
  },
  {
    label: "Gartner — $234 billion in enterprise app software spend at risk from agentic AI",
    href: "https://www.gartner.com/en/newsroom/press-releases/2026-07-01-gartner-says-us-dollars-234-billion-in-enterprise-application-software-spend-is-at-risk-from-agentic-artificial-intelligence",
    description:
      "Gartner's July 2026 analysis of how agentic AI is reshaping and putting at risk enterprise application software spend.",
  },
  {
    label: "OpenAI — New usage analytics and updated spend controls for enterprises",
    href: "https://openai.com/index/chatgpt-enterprise-spend-controls/",
    description:
      "OpenAI's announcement of a global admin console, unified cost API, and tiered spend limits for ChatGPT Enterprise — a template for usage-based visibility.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS AI consulting and cost-governance engagements — spend visibility, guardrails, model routing, and outcome-based measurement.",
  },
  {
    label: "ITECS AI DevOps",
    href: "/ai-devops",
    description:
      "ITECS service for operating AI in production, including ongoing cost instrumentation, usage monitoring, and spend controls.",
  },
];

export default function AIPlatformSpendControlsPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Spend Controls"
      faqHeading="AI Platform Spend Controls FAQ"
      sources={sources}
      ctaText="Before your AI budget scales, get the visibility and guardrails in place."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of AI platform spend visibility — a central cost-governance dashboard with usage meters, spend-limit gauges, and model-routing lines, keeping a rising AI budget under control, in violet and blue"
      heroCaption="Usage-based AI turns every workflow into a variable cost. Visibility, spend limits, and cost-per-outcome measurement keep the budget under control."
      blocks={{
        CRITERIA_TABLE: <AISpendCriteriaTable />,
        GOVERNANCE_DIAGRAM: <SpendGovernanceDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
