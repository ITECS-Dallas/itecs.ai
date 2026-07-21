import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { AIEnabledAppTable } from "@/components/sections/AIEnabledAppTable";
import { AppGovernanceDiagram } from "@/components/sections/AppGovernanceDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-enabled-app-inventory-govern-software"
)!;
const heroImage = "/images/insights/ai-enabled-app-inventory-hero.png";

export const metadata = generatePageMetadata({
  title: "AI-Enabled App Inventory: Govern Software That Acts",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Gartner — 40% of enterprise apps will feature task-specific AI agents by 2026",
    href: "https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025",
    description:
      "Gartner's forecast that 40 percent of enterprise applications will feature task-specific AI agents by the end of 2026, up from less than 5 percent in 2025.",
  },
  {
    label: "Neo — Launches with $100M to Secure AI Software Across the Enterprise",
    href: "https://www.globenewswire.com/news-release/2026/07/20/3329638/0/en/Neo-Launches-with-100M-to-Secure-AI-Software-Across-the-Enterprise.html",
    description:
      "The July 20, 2026 launch of Neo, a security company built to inventory, attribute, and control AI agents, AI-enabled applications, and software gaining agentic capabilities.",
  },
  {
    label: "GovInfoSecurity — Neo Launches With $100M to Guard Agentic Enterprise Software",
    href: "https://www.govinfosecurity.com/neo-launches-100m-to-guard-agentic-enterprise-software-a-32272",
    description:
      "Independent coverage of the Neo launch and the emerging category of governing enterprise software that has gained agentic capabilities.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for building and governing AI agents with scoped identities, approval gates, and attribution logging.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS AI consulting and governance engagements that inventory AI-enabled apps and set the controls to manage software that acts.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "The audit ITECS runs to map what each AI-enabled app can reach before it touches sensitive systems.",
  },
];

export default function AIEnabledAppInventoryPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI-Enabled App Inventory"
      faqHeading="AI-Enabled App Inventory FAQ"
      sources={sources}
      ctaText="Do you know which of your approved apps can now act on their own? We can find out."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of an AI-enabled application inventory — a central governance registry connected to app, browser, plugin, and MCP-server nodes, with some nodes lighting up as they gain agentic action capabilities, in violet and blue"
      heroCaption="Approved software is quietly gaining the power to act. An AI-enabled app inventory shows which apps can now take actions — and keeps them governed."
      blocks={{
        CAPABILITY_TABLE: <AIEnabledAppTable />,
        GOVERNANCE_DIAGRAM: <AppGovernanceDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
