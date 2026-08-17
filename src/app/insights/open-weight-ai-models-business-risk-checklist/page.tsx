import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { OpenWeightRiskTable } from "@/components/sections/OpenWeightRiskTable";
import { OpenWeightGovernanceDiagram } from "@/components/sections/OpenWeightGovernanceDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "open-weight-ai-models-business-risk-checklist"
)!;
const heroImage = "/images/insights/open-weight-ai-models-hero.png";

export const metadata = generatePageMetadata({
  title: "Open-Weight AI Models: Business Risk Checklist",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "NVIDIA — Open Weights and American AI Leadership",
    href: "https://images.nvidia.com/pdf/Open-Weights-and-American-AI-Leadership.pdf",
    description:
      "The July 24, 2026 letter led by NVIDIA's Jensen Huang, signed by dozens of companies, urging Washington not to restrict open-weight models that can be downloaded and run on private infrastructure.",
  },
  {
    label: "Anthropic — Our position on open-weights models",
    href: "https://www.anthropic.com/news/position-open-weights-models",
    description:
      "Anthropic's July 27, 2026 position: it has never advocated a ban on open-weight models, but presses for capability-based safety testing of powerful open and closed models.",
  },
  {
    label: "UK AI Security Institute — How Far Behind the Frontier are Leading Open Weight Models on Cyber?",
    href: "https://www.aisi.gov.uk/blog/how-far-behind-the-frontier-are-leading-open-weight-models-on-cyber",
    description:
      "The UK AISI's July 2026 measurement finding open-weight models trail closed systems on offensive cyber tasks by roughly four to seven months, at a fraction of the cost.",
  },
  {
    label: "CNBC — White House to host AI companies to review new model-testing framework",
    href: "https://www.cnbc.com/2026/08/03/white-house-ai-companies-voluntary-framework-meeting.html",
    description:
      "August 3, 2026 coverage of the White House convening major AI labs on a framework to review frontier models before release, amid the open-weight and Chinese-model debate.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS vendor-neutral consulting that governs open-weight model procurement — license, testing, private hosting, provenance, and approval — model by model.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS audit that tests an open-weight model's capability and misuse potential on your own data and decides where private hosting earns its keep before deployment.",
  },
];

export default function OpenWeightAIModelsPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Open-Weight AI Models"
      faqHeading="Open-Weight AI Model FAQ"
      sources={sources}
      ctaText="Teams downloading open-weight models? Let's make it a governed decision."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of open-weight AI model governance — a downloadable model core passing through classify, test, private-host, and approval gates before it reaches a business workflow, with a license document and provenance chain recorded alongside, in violet and blue"
      heroCaption="Open weights are downloadable and cheap, but a released model can never be recalled. Classify, test, host, and approve before you deploy."
      blocks={{
        CHECKLIST_TABLE: <OpenWeightRiskTable />,
        GOVERNANCE_DIAGRAM: <OpenWeightGovernanceDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
