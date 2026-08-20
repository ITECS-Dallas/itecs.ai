import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { AgentIncidentPlaybookTable } from "@/components/sections/AgentIncidentPlaybookTable";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-agent-incident-reporting-safe-playbook",
)!;
const heroImage = "/images/insights/ai-agent-incident-reporting-hero.png";

export const metadata = generatePageMetadata({
  title: "AI Agent Incident Reporting: Build a SAFE Playbook",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Linux Foundation — Proposing the SAFE Working Group",
    href: "https://www.linuxfoundation.org/blog/proposing-the-safe-working-group-an-open-community-effort-to-improve-ai-security",
    description:
      "The Linux Foundation's August 4, 2026 announcement that SAFE is a draft Request for Comments open to community review, not a finished specification.",
  },
  {
    label: "Open Secure AI Alliance — SAFE draft RFC",
    href: "https://github.com/OpenSecureAIAlliance/RFCs/blob/main/rfc-safe-proposal.md",
    description:
      "The current proposal for reportable events, notification timelines, evidence preservation, full-stack review, de-identified disclosure, and incident-driven corrective controls.",
  },
  {
    label: "Open Secure AI Alliance — RFC repository",
    href: "https://github.com/OpenSecureAIAlliance/RFCs",
    description:
      "The public repository describing these RFCs as proposals intended to start open community discussion, review, and contribution.",
  },
  {
    label: "NIST — Incident Response Recommendations, SP 800-61 Rev. 3",
    href: "https://www.nist.gov/publications/incident-response-recommendations-and-considerations-cybersecurity-risk-management-csf",
    description:
      "NIST's April 2025 guidance for integrating incident preparation, detection, response, recovery, documentation, and improvement into cybersecurity risk management.",
  },
  {
    label: "NIST — Generative AI Profile, NIST AI 600-1",
    href: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf",
    description:
      "NIST guidance on AI incident disclosure, actor responsibilities, third-party inputs, logging, version history, metadata, and information sharing.",
  },
  {
    label: "FIRST — Traffic Light Protocol 2.0",
    href: "https://www.first.org/tlp/",
    description:
      "Current sharing-boundary labels for sensitive security information, including the limits of TLP as an information-handling mechanism.",
  },
  {
    label: "ITECS — Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for building and operating bounded agents with scoped identities, approved tools, action gates, monitoring, and incident controls.",
  },
  {
    label: "ITECS — Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS assessment for inventorying agent data, identities, permissions, owners, retention rules, and operating risks before production use.",
  },
];

export default function AIAgentIncidentReportingPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Agent Incident Reporting"
      faqHeading="AI Agent Incident Reporting FAQ"
      sources={sources}
      ctaText="Need an incident-ready AI agent program? ITECS can map identities, tools, evidence, stop controls, notification ownership, and recovery tests before production use."
      heroImage={heroImage}
      heroImageAlt="Abstract incident-response sequence showing unauthorized AI agent activity stopped at a containment barrier, preserved evidence, coordinated notifications, root-cause review, corrective controls, and verified recovery"
      heroCaption="An AI agent incident record must connect the action that occurred to the identity, instructions, tools, evidence, containment decision, and verified corrective control."
      blocks={{
        PLAYBOOK_TABLE: <AgentIncidentPlaybookTable />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="13 min read"
    />
  );
}
