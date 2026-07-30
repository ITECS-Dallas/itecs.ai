import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { EvaluationPracticeTable } from "@/components/sections/EvaluationPracticeTable";
import { EvaluationReadinessDiagram } from "@/components/sections/EvaluationReadinessDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-model-evaluation-blind-tests"
)!;
const heroImage = "/images/insights/ai-model-evaluation-hero.png";

export const metadata = generatePageMetadata({
  title: "AI Model Evaluation: Blind Tests Before You Deploy",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "NIST — Announcing NIST's Artificial Intelligence Technology Evaluation (AITE)",
    href: "https://www.nist.gov/news-events/news/2026/07/announcing-nists-artificial-intelligence-technology-evaluation-aite",
    description:
      "NIST's July 2026 announcement of AITE, a voluntary program that evaluates AI models on blind data in a sequestered testbed to mitigate train/test data contamination.",
  },
  {
    label: "NIST — AITE program",
    href: "https://ai-challenges.nist.gov/aite",
    description:
      "The AITE program page describing its sequestered testbed, blind-data evaluations, initial vision-language tasks, and phased rollout beginning in August 2026.",
  },
  {
    label: "PYMNTS — NIST Launches AI Model Evaluation Program to Benchmark Performance on Blind Test Data",
    href: "https://www.pymnts.com/news/artificial-intelligence/2026/nist-launches-ai-model-evaluation-program-benchmark-performance-blind-test-data/",
    description:
      "Coverage of the AITE launch and why blind, sequestered evaluation matters for objective, contamination-free assessment of AI model capability.",
  },
  {
    label: "NIST — Center for AI Standards and Innovation (CAISI)",
    href: "https://www.nist.gov/caisi",
    description:
      "NIST's CAISI, which runs pre-deployment safety evaluations of frontier AI models — separate from AITE but part of NIST's broader rigorous-evaluation push.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS vendor-neutral AI consulting that designs blind, task-specific model evaluations and post-deployment monitoring instead of trusting a leaderboard.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS audit that builds a blind test set from your own data and defines the metric that means success for your workflow before you deploy a model.",
  },
];

export default function AIModelEvaluationPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Model Evaluation"
      faqHeading="AI Model Evaluation FAQ"
      sources={sources}
      ctaText="About to deploy a model on a leaderboard score? Let's blind-test it on your data first."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of blind AI model evaluation — several candidate model cores feeding into a sealed, sequestered testbed chamber that scores them against held-out domain data, producing a ranked result with uncertainty bars, while a public leaderboard panel is set aside, in violet and blue"
      heroCaption="A leaderboard measures a public test, not your job. Score every model on blind, held-out data from your own workflow before you deploy."
      blocks={{
        PRACTICE_TABLE: <EvaluationPracticeTable />,
        READINESS_DIAGRAM: <EvaluationReadinessDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
