import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "claude-fable-5-id-verification-return")!;
const heroImage = "/images/insights/claude-fable-5-id-verification-return-hero.png";

export const metadata = generatePageMetadata({
  title: insight.title,
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Anthropic — Statement on the US directive to suspend Fable 5 and Mythos 5",
    href: "https://www.anthropic.com/news/fable-mythos-access",
    description:
      "Anthropic's official statement on the June 12, 2026 US export-control order suspending Fable 5 and Mythos 5 access for all foreign nationals worldwide.",
  },
  {
    label: "Anthropic — Detecting and preventing distillation attacks",
    href: "https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks",
    description:
      "Anthropic's disclosure of the 16M-exchange distillation campaign by DeepSeek, Moonshot AI, and MiniMax through ~24,000 fraudulent accounts, and the safeguards it is deploying.",
  },
  {
    label: "Claude Help Center — Identity verification on Claude",
    href: "https://support.claude.com/en/articles/14328960-identity-verification-on-claude",
    description:
      "Official details on Claude identity verification: government ID plus selfie, processed by Persona, with identity data not used for model training.",
  },
  {
    label: "Fortune — Anthropic disables Fable and Mythos after US bars foreign access",
    href: "https://fortune.com/2026/06/13/anthropic-disables-fable-mythos-export-controls-national-security-threat/",
    description:
      "Independent reporting on the export-control suspension, the NSA red-team finding, and the national security rationale behind the directive.",
  },
  {
    label: "NIST Digital Identity Guidelines (SP 800-63)",
    href: "https://pages.nist.gov/800-63-3/",
    description:
      "The US standard for identity assurance levels that ITECS applies so verification matches a use case's real risk without over-collecting sensitive data.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service page for governed custom AI agents with scoped identity, access controls, audit logging, and human approval gates.",
  },
];

export default function ClaudeFable5IdVerificationReturnPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Fable 5 & ID Verification"
      faqHeading="Claude Fable 5 and ID Verification FAQ"
      sources={sources}
      ctaText="Want frontier AI like Claude deployed with real identity governance, not personal accounts?"
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of a powerful glowing AI core behind an identity verification checkpoint — a luminous gate with a verified-identity badge and scanning beams in violet and blue, representing controlled access to a frontier model"
      heroCaption="Identity verification is becoming the gate to frontier AI: a verified-identity checkpoint controls who reaches the most powerful model, the mechanism analysts believe could reopen Fable 5."
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="9 min read"
    />
  );
}
