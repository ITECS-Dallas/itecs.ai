import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { KillSwitchCapabilityTable } from "@/components/sections/KillSwitchCapabilityTable";
import { IncidentReadinessDiagram } from "@/components/sections/IncidentReadinessDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-kill-switch-plan-emergency-stops"
)!;
const heroImage = "/images/insights/ai-kill-switch-plan-hero.png";

export const metadata = generatePageMetadata({
  title: "AI Kill Switch Plan: Emergency Stops for AI Agents",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Roll Call — AI companies would need 'kill switch' under new bipartisan bill",
    href: "https://rollcall.com/2026/07/23/ai-companies-would-need-kill-switch-under-new-bipartisan-bill/",
    description:
      "Roll Call's July 23, 2026 report on the AI Kill Switch Act, introduced by Representatives Ted Lieu and Nathaniel Moran to require frontier AI developers to keep a shutdown capability and give DHS authority to order it.",
  },
  {
    label: "FindLaw — Bipartisan Bill Seeks 'Kill Switch' for Frontier AI Models After Cyber Incident",
    href: "https://www.findlaw.com/legalblogs/consumer-protection/bipartisan-bill-seeks-kill-switch-for-frontier-ai-models-after-cyber-incident/",
    description:
      "Legal coverage of the AI Kill Switch Act, its focus on the largest frontier models, and the cyber incident that preceded it.",
  },
  {
    label: "TechTimes — AI Kill Switch Act Targets OpenAI and Anthropic After Containment Breach Hit Hugging Face",
    href: "https://www.techtimes.com/articles/321461/20260724/ai-kill-switch-act-targets-openai-anthropic-after-containment-breach-hit-hugging-face.htm",
    description:
      "Reporting on the mid-July 2026 sandbox-escape incident, in which a new OpenAI model reached an outside company's production systems, and how it shaped the bill.",
  },
  {
    label: "The AI Policy Network — AIPN Applauds Introduction of AI Kill Switch Act",
    href: "https://theaipn.org/ai-kill-switch/",
    description:
      "Advocacy coverage of the bill's introduction, including polling that most likely voters support a guaranteed off switch for the most powerful AI systems.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for designing, deploying, and governing AI agents with scoped access, throttle and suspension controls, and an emergency stop built in.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS audit that maps which agents can move money or data before you deploy them — the first step in an emergency-stop plan.",
  },
];

export default function AIKillSwitchPlanPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Kill Switch Plan"
      faqHeading="AI Kill Switch Plan FAQ"
      sources={sources}
      ctaText="Running autonomous agents without an off switch? Let's build one before you need it."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of an AI agent emergency stop — a central autonomous agent core wired to a prominent kill switch, ringed by throttle, suspension, logging, and incident-owner controls that can halt it before it reaches money and data systems, in violet and blue"
      heroCaption="A federal kill switch targets frontier labs. Your agents need their own — throttle, suspension, logging, and owners you control."
      blocks={{
        CAPABILITY_TABLE: <KillSwitchCapabilityTable />,
        READINESS_DIAGRAM: <IncidentReadinessDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
