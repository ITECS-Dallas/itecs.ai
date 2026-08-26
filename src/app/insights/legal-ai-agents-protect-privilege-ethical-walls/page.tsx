import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { LegalAIAgentReadinessTable } from "@/components/sections/LegalAIAgentReadinessTable";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "legal-ai-agents-protect-privilege-ethical-walls",
)!;
const heroImage =
  "/images/insights/legal-ai-agents-privilege-ethical-walls-hero.png";

export const metadata = generatePageMetadata({
  title: "Legal AI Agents: Protect Privilege and Ethical Walls",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Google Cloud — Gemini Enterprise for Legal launch",
    href: "https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-for-legal",
    description:
      "Google Cloud's August 25, 2026 preview announcement covering legal skills, permission-aware MCP connectors, governed data isolation, traceable citations, ethical-wall claims, and practitioner review workflows.",
  },
  {
    label: "Google Cloud — Gemini Enterprise app FAQ",
    href: "https://cloud.google.com/gemini-enterprise/faq",
    description:
      "Current Google product statements about customer data ownership, model-training restrictions, audit logging, data residency, and encryption controls across identified Gemini Enterprise editions.",
  },
  {
    label: "Google Cloud — Data-source access controls",
    href: "https://docs.cloud.google.com/gemini/enterprise/docs/identity",
    description:
      "Current configuration guidance for preserving document access through identity providers and access-control metadata in Gemini Enterprise custom data sources.",
  },
  {
    label: "American Bar Association — Formal Opinion 512",
    href: "https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf",
    description:
      "The ABA Standing Committee's July 29, 2024 guidance on competence, confidentiality, client communication and consent, candor, supervision, provider diligence, and fees when lawyers use generative AI.",
  },
  {
    label: "American Bar Association — Model Rule 1.6",
    href: "https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_1_6_confidentiality_of_information/",
    description:
      "The ABA model rule requiring protection of information relating to a representation and reasonable efforts against unauthorized access or disclosure; jurisdictions adopt and modify their own rules.",
  },
  {
    label: "ABA Law Practice — When client AI use may affect privilege",
    href: "https://www.americanbar.org/groups/law_practice/resources/law-technology-today/2026/when-does-client-use-of-ai-waive-privilege/",
    description:
      "Current ABA Law Practice analysis of divergent 2026 federal decisions, emphasizing that privilege and work-product consequences of consumer AI use remain fact- and jurisdiction-dependent.",
  },
  {
    label: "American Bar Association — Formal Opinion 483",
    href: "https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-op-483.pdf",
    description:
      "ABA guidance on lawyers' detection, containment, restoration, and current-client notification duties after an electronic breach involving material client information.",
  },
  {
    label: "Solicitors Regulation Authority — Misuse of AI warning",
    href: "https://www.sra.org.uk/solicitors/guidance/misuse-ai/",
    description:
      "The SRA's August 17, 2026 warning for regulated firms and solicitors on hallucinated legal work, court duties, supervision, confidentiality, privilege, safeguards, and accountability.",
  },
  {
    label: "ITECS — Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for designing bounded AI agents with controlled data, tools, identities, approvals, evaluations, and production ownership.",
  },
  {
    label: "ITECS — Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS assessment for mapping repositories, permissions, data classifications, owners, connectors, retention, and risk before production AI access is granted.",
  },
  {
    label: "ITECS — AI DevOps",
    href: "/ai-devops",
    description:
      "ITECS operating model for versioned agent releases, evaluation, observability, incident controls, rollback, and governed production change.",
  },
];

export default function LegalAIAgentsPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Legal AI Agents"
      faqHeading="Legal AI Agent Governance FAQ"
      sources={sources}
      ctaText="Need a defensible legal-agent pilot? ITECS can map matter permissions, preserve connector ACLs and ethical walls, define attorney approval gates, test citations and redactions, and build the release and incident evidence your legal, security, and privacy owners need."
      heroImage={heroImage}
      heroImageAlt="Abstract legal AI workflow with three isolated document vaults, a luminous ethical wall, permission gates, a controlled analysis core, and a final attorney approval checkpoint"
      heroCaption="A legal AI agent should inherit the matter boundary, not flatten it: authorized sources enter a controlled analysis path, restricted matters remain isolated, and a lawyer approves the exact final artifact."
      blocks={{
        LEGAL_AI_READINESS_TABLE: <LegalAIAgentReadinessTable />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="18 min read"
    />
  );
}
