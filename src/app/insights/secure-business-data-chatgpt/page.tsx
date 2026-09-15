import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "secure-business-data-chatgpt")!;

export const metadata = generatePageMetadata({
  title: insight.title,
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: insight.image.src,
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
    href: "https://openai.com/business-data/",
    description:
      "OpenAI's business-data commitments, including its statement that Business, Enterprise, and API content is not used to train models by default.",
  },
  {
    label: "OpenAI — HIPAA eligible services and features",
    href: "https://help.openai.com/en/articles/20001069",
    description:
      "OpenAI's current feature-level guidance for eligible healthcare offerings and configurations; a BAA does not cover every product feature.",
  },
  {
    label: "Azure OpenAI Data Privacy",
    href: "https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/data-privacy",
    description:
      "Microsoft documentation covering Azure OpenAI data privacy, processing, and abuse monitoring concepts.",
  },
  {
    label: "Microsoft — Cloud services in compliance scope",
    href: "https://learn.microsoft.com/en-us/azure/compliance/offerings/cloud-services-in-audit-scope",
    description:
      "Microsoft's service-level compliance scope; workload compliance still depends on architecture, configuration, contracts, and customer controls.",
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
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
    />
  );
}
