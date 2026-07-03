import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { AIRiskGovernedDiagram } from "@/components/sections/AIRiskGovernedDiagram";
import { AIGovernanceMaturity } from "@/components/sections/AIGovernanceMaturity";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-governance-training-dallas-businesses"
)!;
const heroImage = "/images/insights/ai-governance-training-dallas-hero.png";

export const metadata = generatePageMetadata({
  title:
    "AI Governance & Training for Dallas Businesses | ITECS",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "NIST AI Risk Management Framework",
    href: "https://www.nist.gov/itl/ai-risk-management-framework",
    description:
      "The U.S. standard ITECS uses as the governance backbone for every AI policy, tool approval, and agent deployment.",
  },
  {
    label: "Microsoft Work Trend Index",
    href: "https://www.microsoft.com/en-us/worklab/work-trend-index",
    description:
      "Microsoft's research showing most employees already bring their own AI tools to work — the reality behind shadow AI.",
  },
  {
    label: "OWASP Top 10 for Large Language Model Applications",
    href: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    description:
      "The industry reference for AI security risks — data leakage, prompt injection, and more — that governance and training address.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS AI consulting and governance engagements — policy, tool approval, adoption roadmap, and board-ready ROI.",
  },
  {
    label: "ITECS AI Training",
    href: "/training",
    description:
      "Hands-on, role-specific training on Claude, ChatGPT, Copilot, and Gemini for secure, high-productivity AI use.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "The data classification and access-control review ITECS runs before connecting AI tools to sensitive systems.",
  },
];

export default function AIGovernanceTrainingPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Governance & Training"
      faqHeading="AI Governance & Training FAQ"
      sources={sources}
      ctaText="Ready to turn ungoverned AI into a secure, high-ROI advantage for your Dallas business?"
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of governed AI adoption — a central control hub with policy, security, and training safeguards routing multiple AI tools through approval gates in violet and blue"
      heroCaption="Governed AI adoption: ITECS routes every tool your team uses — Claude, ChatGPT, Copilot, and Gemini — through policy, security, and training so risk falls and ROI rises."
      blocks={{
        RISK_DIAGRAM: <AIRiskGovernedDiagram />,
        MATURITY_DIAGRAM: <AIGovernanceMaturity />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="10 min read"
    />
  );
}
