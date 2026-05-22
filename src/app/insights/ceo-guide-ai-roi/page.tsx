import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "ceo-guide-ai-roi")!;
const heroImage = "/images/insights/ceo-guide-ai-roi-hero.png";

export const metadata = generatePageMetadata({
  title: insight.title,
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
      "The U.S. National Institute of Standards and Technology framework ITECS uses as the governance and accountability backbone that makes AI ROI defensible to auditors and boards.",
  },
  {
    label: "McKinsey — The State of AI",
    href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    description:
      "McKinsey's recurring global survey on enterprise AI adoption, value capture, and the gap between AI experimentation and measurable bottom-line impact.",
  },
  {
    label: "U.S. GAO — Artificial Intelligence Accountability Framework",
    href: "https://www.gao.gov/products/gao-21-519sp",
    description:
      "The Government Accountability Office framework for governance, performance, and monitoring of AI systems — useful structure for executives building AI accountability and ROI review.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS' AI consulting and readiness service for Dallas leadership teams that want use cases ranked by payback and deployments instrumented for measurable ROI.",
  },
  {
    label: "ITECS Data Audit",
    href: "/data-audit",
    description:
      "ITECS' data and AI readiness audit — the foundation that lets a business measure AI ROI cleanly before scaling any deployment.",
  },
];

export default function CeoGuideAiRoiPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="The CEO's Guide to AI ROI"
      faqHeading="AI ROI for Executives FAQ"
      sources={sources}
      ctaText="Ready to prove and scale the ROI of your AI investment?"
      heroImage={heroImage}
      heroImageAlt="Empty executive boardroom at night with a glowing wall display showing an upward-climbing AI efficiency curve and dimensional financial growth bars, representing measurable AI ROI for a Dallas leadership team"
      heroCaption="In 2026, boards fund AI against measurable payback — hours recovered, revenue influenced, and risk reduced — not adoption metrics. The CEOs who scale AI are the ones who can prove the return."
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="9 min read"
    />
  );
}
