import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { CopilotAgentCapabilityTable } from "@/components/sections/CopilotAgentCapabilityTable";
import { ToolTrainingDiagram } from "@/components/sections/ToolTrainingDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "copilot-teams-on-call-scheduling-agent"
)!;
const heroImage = "/images/insights/copilot-oncall-agent-hero.png";

export const metadata = generatePageMetadata({
  title: "ITECS Copilot Teams Agent for On-Call Scheduling: A Case Study",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Microsoft Learn — Microsoft 365 Copilot data privacy",
    href: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy",
    description:
      "Microsoft's documentation on how Copilot grounds in Microsoft 365 data and respects existing permissions inside the tenant.",
  },
  {
    label: "Microsoft Learn — What is Microsoft Copilot Studio?",
    href: "https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio",
    description:
      "Overview of Microsoft Copilot Studio, the platform for building and publishing custom Copilot agents into Microsoft Teams.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for designing and building governed custom AI agents that automate real workflows inside your existing tools.",
  },
  {
    label: "ITECS Microsoft Copilot Training & Implementation",
    href: "/copilot-training",
    description:
      "How ITECS rolls out and governs Microsoft 365 Copilot before building agents on top of it.",
  },
  {
    label: "ITECS — Self-Hosted AI Agents and DOCBOT",
    href: "/insights/self-hosted-ai-agents-seafile",
    description:
      "Another ITECS-built agent, DOCBOT, applying the same principle: meet people in the tools they use and connect the systems that were not talking.",
  },
  {
    label: "ITECS Workflow Automation",
    href: "/automation",
    description:
      "ITECS service for turning manual, chat-based coordination — scheduling, approvals, dispatch, handoffs — into governed automation.",
  },
];

export default function CopilotOnCallAgentPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Copilot On-Call Agent"
      faqHeading="Copilot On-Call Scheduling Agent FAQ"
      sources={sources}
      ctaText="Have a workflow that runs on manual coordination? We can turn it into a governed agent."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of a Microsoft Copilot on-call scheduling agent inside Microsoft Teams — a central agent core connected to a rotation calendar, technician availability, and a PSA ticket system, routing a coverage-swap approval, in violet and blue"
      heroCaption="An ITECS-built Copilot agent lives inside Microsoft Teams, connecting the on-call calendar, technician availability, and the PSA to automate coverage swaps."
      blocks={{
        CAPABILITY_TABLE: <CopilotAgentCapabilityTable />,
        WORKFLOW_DIAGRAM: (
          <ToolTrainingDiagram
            eyebrow="Coverage-Swap Flow"
            heading="How a Shift Handoff Gets Covered"
            ariaLabel="Five-step coverage-swap approval flow inside Microsoft Teams: a technician requests to hand off a scheduled event; the agent checks the team's availability for that window; it notifies every available technician; technicians approve or reject in a single tap; and the first approval reassigns the event so the original technician is covered."
            caption="A coverage swap runs entirely inside Microsoft Teams — request, availability check, notification, approval, and reassignment — with no group chat and no gaps."
            stages={[
              { icon: "ClipboardCheck", label: "Request", detail: "A tech asks to hand off an event" },
              { icon: "Search", label: "Check", detail: "Agent checks team availability" },
              { icon: "Users", label: "Notify", detail: "Messages available technicians" },
              { icon: "ShieldCheck", label: "Respond", detail: "Techs approve or reject in a tap" },
              { icon: "Rocket", label: "Covered", detail: "First approval reassigns the event" },
            ]}
          />
        ),
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="8 min read"
    />
  );
}
