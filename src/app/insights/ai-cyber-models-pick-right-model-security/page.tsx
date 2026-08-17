import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { CyberModelSelectionTable } from "@/components/sections/CyberModelSelectionTable";
import { ModelRoutingDiagram } from "@/components/sections/ModelRoutingDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-cyber-models-pick-right-model-security"
)!;
const heroImage = "/images/insights/ai-cyber-models-hero.png";

export const metadata = generatePageMetadata({
  title: "AI Cyber Models: Pick the Right Model for Security",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Cisco Blogs — Introducing Antares: Efficient Open-Weight AI Models for Vulnerability Localization",
    href: "https://blogs.cisco.com/ai/introducing-antares-the-most-efficient-open-weight-ai-models-for-vulnerability-localization",
    description:
      "Cisco's July 21, 2026 introduction of Antares-350M and Antares-1B, small open-weight models on Hugging Face built to locate known vulnerabilities and run locally.",
  },
  {
    label: "Help Net Security — Microsoft unveils MAI-Cyber-1-Flash",
    href: "https://www.helpnetsecurity.com/2026/07/27/microsoft-mai-cyber-1-flash-ai-model/",
    description:
      "Coverage of Microsoft's July 27, 2026 launch of MAI-Cyber-1-Flash, its CyberGym benchmark and cost claims, and the MDASH remediation system behind Project Perception.",
  },
  {
    label: "TechCrunch — Microsoft launches its first cyber model and an agentic cybersecurity system",
    href: "https://techcrunch.com/2026/07/27/microsoft-launches-its-first-cyber-model-and-a-new-agentic-cybersecurity-system/",
    description:
      "Reporting on MAI-Cyber-1-Flash and Project Perception, Microsoft's agentic security system entering public preview August 3, 2026.",
  },
  {
    label: "Google DeepMind — Introducing Gemini 3.5 Flash Cyber",
    href: "https://deepmind.google/blog/introducing-gemini-3-5-flash-cyber/",
    description:
      "Google's July 21, 2026 post on Gemini 3.5 Flash Cyber and CodeMender, which builds exploits in a sandbox to confirm bugs and generates patches, offered through a gated pilot.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS vendor-neutral AI consulting that selects, routes, and governs security models by task rather than selling a single tool.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS audit that tests a security model against a slice of your real code and inventories what runs where before you adopt it.",
  },
];

export default function AICyberModelsPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Cyber Models"
      faqHeading="AI Cyber Model Selection FAQ"
      sources={sources}
      ctaText="Buying security AI by the model? Let's pick the right one for each task."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of security AI model selection — a central routing hub directing code-scanning work to three model tiers, a small local model, a specialized frontier model, and a sandboxed agentic patching model, with a human-review checkpoint before any fix reaches production, in violet and blue"
      heroCaption="No single model wins. Route each security task to the right tier — small and local, frontier, or agentic — and sandbox anything that patches."
      blocks={{
        SELECTION_TABLE: <CyberModelSelectionTable />,
        ROUTING_DIAGRAM: <ModelRoutingDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
