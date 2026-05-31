import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "claude-cowork-for-small-business")!;
const heroImage = "/images/insights/claude-cowork-for-small-business-hero.png";

export const metadata = generatePageMetadata({
  title: insight.title,
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Anthropic — Claude for Small Business",
    href: "https://www.anthropic.com/claude/business",
    description:
      "Anthropic's product page for Claude Cowork business tiers, including the Small Business toggle, pre-built workflows, and supported integrations.",
  },
  {
    label: "Anthropic — 2026 Work Trend Index",
    href: "https://www.anthropic.com/research",
    description:
      "Anthropic's annual research on how knowledge workers use Claude, including the finding that only sixteen percent of users have moved beyond chat into orchestrated agents.",
  },
  {
    label: "NIST AI Risk Management Framework",
    href: "https://www.nist.gov/itl/ai-risk-management-framework",
    description:
      "The U.S. National Institute of Standards and Technology framework ITECS uses as the policy backbone for AI governance, audit logging, and approval discipline on Cowork rollouts.",
  },
  {
    label: "ITECS AI Workflow Automation",
    href: "/automation",
    description:
      "ITECS' AI workflow automation service for Dallas teams adopting Claude Cowork, with project sandboxes, memory files, scheduled briefings, and approval gates configured by an experienced operator.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS' AI consulting and readiness service for owners deciding which Cowork workflows to enable first and what to wire around them.",
  },
  {
    label: "ITECS Data Audit",
    href: "/data-audit",
    description:
      "ITECS' data and AI readiness audit — the foundation that lets a growing organization automate finance, sales, and customer workflows on a clean data layer.",
  },
];

export default function ClaudeCoworkForSmallBusinessPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Claude Cowork for Small Business"
      faqHeading="Claude Cowork for Small Business FAQ"
      sources={sources}
      ctaText="Ready to turn Claude Cowork into ten production workflows for your team?"
      heroImage={heroImage}
      heroImageAlt="Abstract Claude Cowork Small Business workspace diagram showing isolated Project Sandboxes for Finance, Sales, Marketing, and Operations connected to QuickBooks, PayPal, HubSpot, Canva, Docusign, Google Workspace, and Microsoft 365 through approval gates"
      heroCaption="A correctly configured Claude Cowork deployment runs as four isolated Project Sandboxes — Finance, Sales, Marketing, and Operations — connected to the core operating apps through owner-approved gates."
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="9 min read"
    />
  );
}
