import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { AIKnowledgeManagementPlan } from "@/components/sections/AIKnowledgeManagementPlan";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-knowledge-management-capture-expertise",
)!;

export const metadata = generatePageMetadata({
  title: "AI Knowledge Management: Capture Expertise Before It Leaves",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
});

const sources: ArticleSource[] = [
  {
    label: "AWS — Democratizing institutional knowledge",
    href: "https://aws.amazon.com/blogs/machine-learning/democratizing-institutional-knowledge-building-an-ai-powered-knowledge-management-system-with-aws/",
    description:
      "AWS's August 24, 2026 reference architecture for authenticated access, controlled orchestration, source storage, retrieval-augmented generation, vector retrieval, caching, citations, monitoring, freshness, and human-review limits.",
  },
  {
    label: "MIT Press — From Knowledge to Value",
    href: "https://hdsr.mitpress.mit.edu/pub/jude8rkl/release/2",
    description:
      "The August 13, 2026 Harvard Data Science Review article on problem-specific knowledge flows, business outcome metrics, workflow integration, curated architecture, frontline testing, and active human governance.",
  },
  {
    label: "Wiley — Generative AI Meets Knowledge Management",
    href: "https://onlinelibrary.wiley.com/doi/10.1002/kpm.70004",
    description:
      "A 2025 qualitative study of 11 software developers across eight countries examining AI-assisted knowledge creation, retrieval, learning, onboarding, continuous verification, collaboration, privacy, and data integrity.",
  },
  {
    label: "Wiley — On the Dangers of LLM-Mediated Learning",
    href: "https://onlinelibrary.wiley.com/doi/full/10.1111/1748-8583.70036",
    description:
      "A 2026 research provocation distinguishing codifiable knowledge from embodied practice, shared culture, and expert judgment, with guidance to preserve mentoring, shadowing, reflection, and first-hand experience.",
  },
  {
    label: "MIT — How some skills become second nature",
    href: "https://news.mit.edu/2026/how-some-skills-become-second-nature-0304",
    description:
      "MIT's March 4, 2026 report on a controlled visual-classification study showing that some tacit knowledge can appear in attention patterns even when participants cannot verbalize what they learned, with limits on generalization beyond the experiment.",
  },
  {
    label: "ITECS — AI Knowledge Base and SOP Automation",
    href: "/ai-knowledge-base",
    description:
      "ITECS OpsMemory's managed approach to approved sources, source priority, permission-aware retrieval, citations, review, freshness, corrections, maintained SOPs, and ongoing knowledge operations.",
  },
];

export default function AIKnowledgeManagementCaptureExpertisePage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Knowledge Management"
      faqHeading="AI Knowledge Management FAQ"
      sources={sources}
      ctaText="Concerned that critical expertise is concentrated in a few employees? ITECS can help identify the highest-risk knowledge flows, capture approved sources and rationale, preserve access boundaries, build cited retrieval, and establish the review and correction workflow that keeps the knowledge useful after roles change."
      blocks={{
        AI_KNOWLEDGE_MANAGEMENT_PLAN: <AIKnowledgeManagementPlan />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="16 min read"
    />
  );
}
