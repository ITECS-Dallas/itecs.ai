import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { AIActObligationTable } from "@/components/sections/AIActObligationTable";
import { ComplianceChecklistDiagram } from "@/components/sections/ComplianceChecklistDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "eu-ai-act-transparency-rules-checklist"
)!;
const heroImage = "/images/insights/eu-ai-act-transparency-hero.png";

export const metadata = generatePageMetadata({
  title: "EU AI Act Transparency Rules: Business Checklist (Article 50)",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "European Commission — Code of Practice on Transparency of AI-Generated Content",
    href: "https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content",
    description:
      "The Commission's official page for the Code of Practice published June 10, 2026, elaborating the Article 50 marking and labeling rules.",
  },
  {
    label: "European Commission — Signing the Code of Practice (FAQ)",
    href: "https://digital-strategy.ec.europa.eu/en/faqs/signing-code-practice-transparency-ai-generated-content",
    description:
      "Official FAQ on signing the Code, the July 22, 2026 signatory window, and how a positive adequacy assessment grants a presumption of conformity.",
  },
  {
    label: "EU Artificial Intelligence Act — Article 50 (full text)",
    href: "https://artificialintelligenceact.eu/article/50/",
    description:
      "The binding text of Article 50 transparency obligations for providers and deployers of certain AI systems.",
  },
  {
    label: "Bird & Bird — The Final Transparency Code of Practice",
    href: "https://www.twobirds.com/en/insights/2026/taking-the-eu-ai-act-to-practice-the-final-transparency-code-of-practice",
    description:
      "Independent legal analysis of the final Transparency Code of Practice and what it means for providers and deployers.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS AI consulting and governance engagements — policy, inventory, compliance readiness, and a defensible AI adoption roadmap.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "The inventory and classification review ITECS runs to document AI-generated content and the controls each obligation requires.",
  },
];

export default function EUAIActTransparencyPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="EU AI Act Transparency"
      faqHeading="EU AI Act Transparency Rules FAQ"
      sources={sources}
      ctaText="Need to be ready for the EU AI Act's August 2 transparency rules?"
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of AI content transparency compliance — a stream of AI-generated media passing through a labeling and disclosure checkpoint marked with the EU circle of stars motif, in violet and blue"
      heroCaption="Under EU AI Act Article 50, AI-generated content must pass through disclosure and machine-readable marking before it reaches EU users."
      blocks={{
        USECASE_TABLE: <AIActObligationTable />,
        CHECKLIST_DIAGRAM: <ComplianceChecklistDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="10 min read"
    />
  );
}
