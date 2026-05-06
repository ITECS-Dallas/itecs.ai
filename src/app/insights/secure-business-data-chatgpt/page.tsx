import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "secure-business-data-chatgpt")!;

export const metadata = generatePageMetadata({
  title: insight.title,
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
});

const sources: ArticleSource[] = [
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service page for secure, governed AI agents and business workflows connected to approved systems.",
  },
  {
    label: "ITECS AI Data Audit",
    href: "/data-audit",
    description:
      "ITECS data readiness and security audit for organizations preparing to adopt AI tools.",
  },
  {
    label: "OpenAI ChatGPT Business Data Privacy",
    href: "https://help.openai.com/en/articles/8798634-managing-data-sharing-and-privacy-in-chatgpt-business",
    description:
      "OpenAI Help Center guidance on ChatGPT Business workspace data handling, sharing, privacy, and security.",
  },
  {
    label: "Azure OpenAI Data Privacy",
    href: "https://learn.microsoft.com/en-us/legal/cognitive-services/openai/data-privacy",
    description:
      "Microsoft documentation covering Azure OpenAI data privacy, processing, and abuse monitoring concepts.",
  },
  {
    label: "Microsoft Purview DLP",
    href: "https://learn.microsoft.com/en-us/purview/dlp-learn-about-dlp",
    description:
      "Microsoft guidance for data loss prevention controls that help reduce sensitive data exposure.",
  },
];

export default function SecureDataPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Secure Business Data"
      faqHeading="ChatGPT Data Security FAQ"
      sources={sources}
      ctaText="Want a private, governed AI workflow for your business?"
      publishedDate="2026-05-06"
    />
  );
}
