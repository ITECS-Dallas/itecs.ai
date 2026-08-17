import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { CustomerAgentGuardrailTable } from "@/components/sections/CustomerAgentGuardrailTable";
import { AgentLaunchReadinessDiagram } from "@/components/sections/AgentLaunchReadinessDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-customer-service-agents-guardrails"
)!;
const heroImage = "/images/insights/ai-customer-service-guardrails-hero.png";

export const metadata = generatePageMetadata({
  title: "AI Customer Service Agents: Guardrails Before Launch",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "OpenAI — Introducing OpenAI Presence",
    href: "https://openai.com/index/introducing-openai-presence/",
    description:
      "OpenAI's July 22, 2026 announcement of Presence, its enterprise platform for building and governing customer-service voice and chat agents with policies, guardrails, and escalation rules.",
  },
  {
    label: "NoJitter — OpenAI makes its Presence felt in CX",
    href: "https://www.nojitter.com/ai-automation/openai-makes-its-presence-felt-in-cx",
    description:
      "Industry coverage of the Presence launch and what a managed, guardrailed CX agent platform means for contact centers.",
  },
  {
    label: "PYMNTS — OpenAI Unveils Product to Hone AI Voice and Chat Agents",
    href: "https://www.pymnts.com/news/artificial-intelligence/2026/openai-unveils-product-to-hone-ai-voice-and-chat-agents/",
    description:
      "Reporting on Presence and OpenAI's reported results running the platform for its own customer support.",
  },
  {
    label: "VentureBeat — OpenAI unveils Presence for real-time voice agents and chatbots",
    href: "https://venturebeat.com/orchestration/openai-unveils-presence-a-new-platform-that-lets-enterprises-launch-and-manage-realtime-voice-agents-and-chatbots",
    description:
      "Coverage of how Presence lets enterprises launch and manage production voice and chat agents.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for designing, testing, and governing customer-facing AI agents with scoped access, escalation rules, and human review.",
  },
  {
    label: "ITECS AI Receptionist",
    href: "/ai-receptionist",
    description:
      "ITECS AI receptionist and voice-agent service, built one job at a time with guardrails and escalation to your team.",
  },
];

export default function AICustomerServiceGuardrailsPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Customer Service Guardrails"
      faqHeading="AI Customer Service Agent Guardrails FAQ"
      sources={sources}
      ctaText="Launching a customer-facing AI agent? Get the guardrails right before customers do."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of a customer-facing AI agent behind launch guardrails — a central conversational agent core ringed by policy, escalation, testing, and human-review checkpoints before it reaches customer channels, in violet and blue"
      heroCaption="A customer-facing AI agent should pass through scope, testing, escalation, and human-review guardrails before it ever reaches a live customer."
      blocks={{
        GUARDRAIL_TABLE: <CustomerAgentGuardrailTable />,
        READINESS_DIAGRAM: <AgentLaunchReadinessDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
