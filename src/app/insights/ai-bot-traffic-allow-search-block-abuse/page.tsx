import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { BotTrafficTable } from "@/components/sections/BotTrafficTable";
import { BotPolicyDiagram } from "@/components/sections/BotPolicyDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-bot-traffic-allow-search-block-abuse"
)!;
const heroImage = "/images/insights/ai-bot-traffic-policy-hero.png";

export const metadata = generatePageMetadata({
  title: "AI Bot Traffic: Allow Search, Block Agent Abuse",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "HUMAN Security — 2026 State of AI Traffic & Cyberthreat Benchmark Report",
    href: "https://www.humansecurity.com/newsroom/2026-state-of-ai-traffic-cyberthreat-benchmark-report/",
    description:
      "HUMAN Security's benchmark finding agentic AI traffic grew 7,851% year over year in 2025, with automated traffic outpacing human traffic and benign and malicious automation nearly indistinguishable.",
  },
  {
    label: "Cloudflare — Pay Per Crawl and AI Crawl Control",
    href: "https://developers.cloudflare.com/changelog/2025-07-01-pay-per-crawl/",
    description:
      "Cloudflare's changelog for Pay Per Crawl and the classification of crawlers into Search, Agent, and Training with per-category policy controls.",
  },
  {
    label: "PPC Land — Cloudflare stops charging AI per crawl and starts paying per answer",
    href: "https://ppc.land/cloudflare-stops-charging-ai-per-crawl-and-starts-paying-per-answer/",
    description:
      "Coverage of Cloudflare's shift to a Pay Per Use model and the September 15, 2026 default block of Training and Agent crawlers on ad pages.",
  },
  {
    label: "HUMAN Security — Visibility and control to protect against AI agent commerce fraud",
    href: "https://www.humansecurity.com/learn/blog/visibility-and-control-to-protect-against-ai-agent-commerce-fraud/",
    description:
      "HUMAN Security on why an AI agent checking out can be a shopping assistant or a fraud operation — the behavior is identical, the intent is not.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS AI consulting and governance engagements that set AI bot policy, verification, and monitoring across your stack.",
  },
  {
    label: "ITECS AI-Optimized SEO",
    href: "/ai-optimized-seo",
    description:
      "ITECS service for AI-era search visibility, so blocking bot abuse never costs you the legitimate discovery that sends customers.",
  },
];

export default function AIBotTrafficPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Bot Traffic Policy"
      faqHeading="AI Bot Traffic Policy FAQ"
      sources={sources}
      ctaText="Running allow-all or block-all for AI bots? We'll build you a policy that pays."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of an AI bot traffic policy — a central verification gateway sorting incoming bot streams into allowed search traffic and blocked training, scraping, and fraudulent agent traffic, protecting checkout and ad pages, in violet and blue"
      heroCaption="Not all bots are equal. A policy sorts search and helpful agents from training, scraping, and fraud — verified by identity, not a user-agent string."
      blocks={{
        TRAFFIC_TABLE: <BotTrafficTable />,
        POLICY_DIAGRAM: <BotPolicyDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
