import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { AgentDRRiskTable } from "@/components/sections/AgentDRRiskTable";
import { BackupHardeningDiagram } from "@/components/sections/BackupHardeningDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-agent-recovery-plan-protect-backups"
)!;
const heroImage = "/images/insights/ai-agent-recovery-plan-hero.png";

export const metadata = generatePageMetadata({
  title: "AI Agent Recovery Plan: Protect Backups First",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "ITPro / ChannelPro — Agent 009: the nine-second warning",
    href: "https://www.itpro.com/technology/artificial-intelligence/agent-009-the-nine-second-warning",
    description:
      "Trade coverage of the PocketOS incident, in which an AI coding agent deleted a production database in roughly nine seconds.",
  },
  {
    label: "Snowflake — AI agent backup protection for enterprise data",
    href: "https://www.snowflake.com/en/blog/ai-agent-backup-protection/",
    description:
      "Snowflake's guidance on backup and recovery in the AI agent era, including write-once-read-many immutable backups and point-in-time recovery.",
  },
  {
    label: "Eon — How an AI Agent Deleted Production Data and Its Backups",
    href: "https://www.eon.io/blog/ai-agent-data-loss",
    description:
      "Analysis of how the same over-privileged action wiped both production data and the backups stored alongside it.",
  },
  {
    label: "Apono — Nine Seconds to Delete a Database: AI Agent Privilege Management",
    href: "https://www.apono.io/blog/nine-seconds-to-delete-a-database-what-the-pocketos-incident-teaches-us-about-ai-agent-privilege-management/",
    description:
      "A privilege-management perspective on the PocketOS incident and why least-privilege agent identity matters.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for governed AI agents with scoped identities, approval gates on destructive actions, and audit logging.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "The audit ITECS runs to map what each agent can reach and to separate and harden backups before agents go live.",
  },
];

export default function AIAgentRecoveryPlanPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Agent Recovery Plan"
      faqHeading="AI Agent Recovery Plan FAQ"
      sources={sources}
      ctaText="Deploying AI agents? Harden your backups and agent governance before they touch production."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of protecting backups from an AI agent — a production data core and a separate, shielded immutable backup vault, with a destructive agent action blocked at an approval gate before it can reach the backups, in violet and blue"
      heroCaption="An AI agent can reach production and backups alike. Recovery survives only when backups sit outside the blast radius, immutable and gated."
      blocks={{
        RISK_TABLE: <AgentDRRiskTable />,
        HARDENING_DIAGRAM: <BackupHardeningDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
