import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { AgentforceCoworkerReadinessChecklist } from "@/components/sections/AgentforceCoworkerReadinessChecklist";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "agentforce-coworker-prepare-auto-enablement",
)!;

export const metadata = generatePageMetadata({
  title: "Agentforce Coworker: Prepare for Auto-Enablement",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
});

const sources: ArticleSource[] = [
  {
    label: "Salesforce — Automatic-enablement FAQ",
    href: "https://help.salesforce.com/s/articleView?id=005388192&language=en_US&type=1",
    description:
      "Salesforce's July 9 FAQ covering the rolling August 4 start, eligible and excluded organizations, user experience, opt-out controls, optional sources, seat changes, and credit behavior.",
  },
  {
    label: "Salesforce — Summer '26 general enhancements",
    href: "https://help.salesforce.com/s/articleView?id=release-notes.rn_general_enhancements.htm&language=en_US&release=262&type=5",
    description:
      "The Summer '26 release note describing Agentforce Coworker beta, its CRM, Slack, and Data 360 context, permission-based access, governance, classification, and action-oriented capabilities.",
  },
  {
    label: "Salesforce — Feature availability matrix",
    href: "https://help.salesforce.com/s/articleView?id=release-notes.rn_feature_impact.htm&language=en_US&release=262&type=5",
    description:
      "Salesforce's Summer '26 impact matrix, which marks the Coworker feature as requiring administrator setup and reinforces the need to verify the actual organization state.",
  },
  {
    label: "Salesforce — Set up Agentforce Coworker",
    href: "https://help.salesforce.com/s/articleView?id=service.knowledge_ek_aes_setup.htm&language=en_US&type=5",
    description:
      "Current setup guidance for administrator prerequisites, AI Search licensing, Access_Ai_Search assignments, Data 360 access, license monitoring, and user-access removal.",
  },
  {
    label: "ITECS — Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS assessment for data ownership, access control, source quality, retention, and governance before business AI receives broad access.",
  },
];

export default function AgentforceCoworkerAutoEnablementPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Agentforce Coworker"
      faqHeading="Agentforce Coworker Auto-Enablement FAQ"
      sources={sources}
      ctaText="Preparing for Agentforce Coworker? Validate seats, permissions, connected sources, answer quality, and credit behavior before broad access."
      blocks={{
        READINESS_CHECKLIST: <AgentforceCoworkerReadinessChecklist />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="10 min read"
    />
  );
}
