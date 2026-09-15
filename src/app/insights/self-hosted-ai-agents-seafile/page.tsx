import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "self-hosted-ai-agents-seafile")!;

export const metadata = {
  ...generatePageMetadata({
    title: insight.title,
    description: insight.description,
    path: insight.href,
    keywords: insight.keywords,
    ogImage: insight.image.src,
  }),
  title: "Self-Hosted AI Agents: Shared Codex and Cowork Files",
};

const sources: ArticleSource[] = [
  {
    label: "Seafile — open-source self-hosted file sync",
    href: "https://www.seafile.com/en/home/",
    description:
      "The open-source file-sync and version-control platform ITECS self-hosts on Linux to keep AI agent project folders identical across every employee endpoint.",
  },
  {
    label: "NIST AI Risk Management Framework",
    href: "https://www.nist.gov/itl/ai-risk-management-framework",
    description:
      "The U.S. standard ITECS aligns its self-hosted AI agent controls to — scoped access, audit logging, and human approval gates that enterprise auditors expect.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service page for private, governed custom AI agents with scoped credentials, audit logging, and no third-party model training on your data.",
  },
  {
    label: "ITECS AI Knowledge Base",
    href: "/ai-knowledge-base",
    description:
      "ITECS OpsMemory applies managed source priority, permissions, review, freshness, and quality to answers, SOPs, and runbooks.",
  },
  {
    label: "ITECS Data and AI Readiness Audit",
    href: "/data-audit",
    description:
      "The data classification and access-control review ITECS runs before any client data feeds a self-hosted AI agent.",
  },
  {
    label: "Claude Cowork for Small Business",
    href: "/insights/claude-cowork-for-small-business",
    description:
      "ITECS guide to Claude Cowork — one of the App-enabled AI tools employees run locally on top of the shared, synced agent library.",
  },
];

export default function SelfHostedAiAgentsSeafilePage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Self-Hosted AI Agents"
      faqHeading="Self-Hosted AI Agents FAQ"
      sources={sources}
      ctaText="Want a private, self-hosted AI agent platform that keeps client data inside your walls?"
      heroCaption="ITECS syncs App-enabled Codex and Cowork agents from a self-hosted Seafile server to every employee's Windows and macOS endpoint — keeping client data inside the security boundary."
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="8 min read"
    />
  );
}
