import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "how-to-use-ai-small-business")!;

export const metadata = generatePageMetadata({
  title: insight.title,
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
});

const sources: ArticleSource[] = [
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS guidance for planning AI adoption, tool selection, cost control, and workflow discovery for small and mid-sized businesses.",
  },
  {
    label: "ITECS AI Training",
    href: "/training",
    description:
      "Hands-on training approach for helping non-technical employees use AI tools safely and productively.",
  },
  {
    label: "Microsoft Copilot For Business",
    href: "https://www.microsoft.com/en-us/microsoft-365/copilot/business",
    description:
      "Microsoft's business Copilot offering for Microsoft 365 productivity workflows.",
  },
  {
    label: "OpenAI ChatGPT Business",
    href: "https://openai.com/chatgpt/business/",
    description:
      "OpenAI's business workspace information for teams evaluating ChatGPT at work.",
  },
  {
    label: "Zapier Automation Platform",
    href: "https://zapier.com/",
    description:
      "No-code workflow automation platform commonly used to connect business applications.",
  },
];

export default function HowToUseAIPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="How to Use AI"
      faqHeading="AI for Small Business FAQ"
      sources={sources}
      ctaText="Ready to see what AI can do for your business?"
      publishedDate="2026-05-06"
    />
  );
}
