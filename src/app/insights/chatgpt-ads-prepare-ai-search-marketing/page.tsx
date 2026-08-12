import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { ChatGPTAdsEvaluationTable } from "@/components/sections/ChatGPTAdsEvaluationTable";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "chatgpt-ads-prepare-ai-search-marketing"
)!;
const heroImage = "/images/insights/chatgpt-ads-ai-search-marketing-hero.png";

export const metadata = generatePageMetadata({
  title: "ChatGPT Ads: Prepare for AI Search Marketing",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "OpenAI — Ads in ChatGPT: The Basics",
    href: "https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics",
    description:
      "OpenAI's advertiser guidance updated August 11, 2026, covering eligible plans, sponsored format, context-based delivery, CPC and CPM buying, measurement, and brand safety.",
  },
  {
    label: "OpenAI — New ways to buy ChatGPT ads",
    href: "https://openai.com/index/new-ways-to-buy-chatgpt-ads/",
    description:
      "The May 5, 2026 announcement of beta self-serve Ads Manager, partner access, CPC bidding, pixel measurement, and the Conversions API.",
  },
  {
    label: "OpenAI — ChatGPT release notes",
    href: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
    description:
      "OpenAI's dated rollout record for ChatGPT ads on Free and Go plans in the United States, Australia, New Zealand, Canada, and the United Kingdom.",
  },
  {
    label: "OpenAI — Ads Manager availability",
    href: "https://help.openai.com/en/articles/20001245-ads-manager-availability",
    description:
      "The current country list for businesses seeking access to Ads Manager, which is distinct from consumer plan and delivery availability.",
  },
  {
    label: "Lurie et al. — The Beginning of ChatGPT Ads",
    href: "https://arxiv.org/abs/2608.05008",
    description:
      "The August 5, 2026 independent sock-puppet audit of early ChatGPT ad format, advertiser mix, prompt categories, and demographic delivery patterns.",
  },
  {
    label: "Google Ads — About ads and AI Overviews",
    href: "https://support.google.com/google-ads/answer/16297775",
    description:
      "Google's current guidance on paid placements around and within AI Overviews, eligible campaign types, market scope, sensitive categories, and reporting limits.",
  },
];

export default function ChatGPTAdsAISearchMarketingPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="ChatGPT Ads"
      faqHeading="ChatGPT Ads And AI Search Marketing FAQ"
      sources={sources}
      ctaText="Evaluating ChatGPT ads? Build the measurement, privacy, brand-safety, and channel rules before moving meaningful search budget."
      heroImage={heroImage}
      heroImageAlt="Abstract AI search marketing system separating an organic conversational answer from a sponsored placement, then routing the paid path through privacy, brand safety, human review, attribution, and multichannel measurement controls"
      heroCaption="ChatGPT ads create a paid discovery lane beside the organic answer. Treat that lane as a measured channel with its own privacy, safety, and attribution controls."
      blocks={{
        EVALUATION_CHECKLIST: <ChatGPTAdsEvaluationTable />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="12 min read"
    />
  );
}
