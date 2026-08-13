import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { AIAdoptionGapChecklist } from "@/components/sections/AIAdoptionGapChecklist";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-adoption-gap-assistants-to-agents",
)!;
const heroImage = "/images/insights/ai-adoption-gap-assistants-agents-hero.png";

export const metadata = generatePageMetadata({
  title: "AI Adoption Gap: Move From Assistants to Agents",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "OpenAI — Enterprise Signals",
    href: "https://openai.com/signals/enterprise-data/",
    description:
      "The August 12, 2026 update on the widening frontier gap, assistance-to-execution shift, advanced capabilities, cross-functional Codex growth, and enterprise controls.",
  },
  {
    label: "OpenAI — How agents are transforming work",
    href: "https://openai.com/index/how-agents-are-transforming-work/",
    description:
      "OpenAI's economic research on delegated, long-horizon work and the spread of Codex from engineering into legal, finance, recruiting, marketing, and operations.",
  },
  {
    label: "OpenAI — RingCentral customer story",
    href: "https://openai.com/index/ringcentral/",
    description:
      "The August 12 case study on RingCentral's AI-Native Challenge, human review, and tool-connected PMO workflows for reporting, governance, and knowledge transfer.",
  },
  {
    label: "OpenAI — ChatGPT Work for every team",
    href: "https://openai.com/chatgpt-work/",
    description:
      "Current examples of reusable, cross-functional workflows and adoption research, including RingCentral's shared execution view and Shopify's high- and low-adopter program.",
  },
  {
    label: "Deloitte — The State of AI in the Enterprise",
    href: "https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html",
    description:
      "Current enterprise coverage on the AI skills barrier, limited workflow reinvention, operational readiness, and the maturity gap in autonomous-agent governance.",
  },
  {
    label: "ITECS — AI Training",
    href: "/training",
    description:
      "Role-based training, governance, and adoption support for teams moving from basic prompting to repeatable, accountable AI workflows.",
  },
];

export default function AIAdoptionGapAssistantsToAgentsPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Adoption Gap"
      faqHeading="AI Adoption Gap And Agentic Execution FAQ"
      sources={sources}
      ctaText="Ready to move beyond isolated prompting? Build the shared playbooks, permissions, evidence, and training loops that let teams delegate work safely."
      heroImage={heroImage}
      heroImageAlt="Abstract enterprise AI system showing isolated chat prompts crossing an adoption gap into a governed agent network with approved tools, permission gates, human review, completed business work, and a continuous training loop"
      heroCaption="The adoption gap widens when one group delegates complete work while the rest remain in isolated chats. Close it by turning proven workflows into governed team systems."
      blocks={{
        ADOPTION_CHECKLIST: <AIAdoptionGapChecklist />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="12 min read"
    />
  );
}
