import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { AIBOMComponentTable } from "@/components/sections/AIBOMComponentTable";
import { AIBOMReadinessDiagram } from "@/components/sections/AIBOMReadinessDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-bill-of-materials-inventory-agents"
)!;
const heroImage = "/images/insights/ai-bill-of-materials-hero.png";

export const metadata = generatePageMetadata({
  title: "AI Bill of Materials: Inventory Agents Before Production",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "CISA — Software Bill of Materials for AI: Minimum Elements",
    href: "https://www.cisa.gov/resources-tools/resources/software-bill-materials-ai-minimum-elements",
    description:
      "The official CISA and G7 joint guidance defining the minimum elements for AI SBOMs across seven clusters, from models to infrastructure.",
  },
  {
    label: "Google Cloud — k8s-aibom (GitHub)",
    href: "https://github.com/GoogleCloudPlatform/k8s-aibom",
    description:
      "Google's open-source Kubernetes controller that generates CycloneDX 1.6 ML-BOM documents for AI workloads at runtime, including agent stacks and RAG pipelines.",
  },
  {
    label: "CyberScoop — Major economies spell out key elements of AI 'ingredients list'",
    href: "https://cyberscoop.com/g7-cisa-ai-sbom-security-guidance/",
    description:
      "Reporting on the CISA and G7 AI SBOM guidance and its seven-cluster structure for AI supply-chain transparency.",
  },
  {
    label: "SecurityBrief — Google open-sources k8s-aibom for live AI workload audits",
    href: "https://securitybrief.com.au/story/google-open-sources-k8s-aibom-for-live-ai-workload-audits",
    description:
      "Coverage of the k8s-aibom release and how runtime discovery surfaces unregistered AI workloads on Kubernetes.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for inventorying, governing, and deploying AI agents with scoped permissions, approval gates, and audit logging.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "The audit that produces the documented AI inventory and access record needed before an AI system reaches production.",
  },
];

export default function AIBillOfMaterialsPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Bill of Materials"
      faqHeading="AI Bill of Materials FAQ"
      sources={sources}
      ctaText="Moving AI agents to production? Inventory every model, agent, and dependency first."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of an AI Bill of Materials — a central inventory ledger connected to labeled component nodes for models, datasets, agent frameworks, vector databases, dependencies, and infrastructure, in violet and blue"
      heroCaption="An AI Bill of Materials inventories every component of an AI system — models, datasets, agents, vector databases, dependencies, and infrastructure — so it can be governed before production."
      blocks={{
        COMPONENT_TABLE: <AIBOMComponentTable />,
        READINESS_DIAGRAM: <AIBOMReadinessDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
