import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { ChatGPTWorkControlTable } from "@/components/sections/ChatGPTWorkControlTable";
import { PilotPhaseDiagram } from "@/components/sections/PilotPhaseDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "chatgpt-work-secure-admin-checklist"
)!;
const heroImage = "/images/insights/chatgpt-work-admin-hero.png";

export const metadata = generatePageMetadata({
  title: "ChatGPT Work for Business: Secure Admin Checklist",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Forbes — OpenAI Launches GPT-5.6 and ChatGPT Work AI Agent",
    href: "https://www.forbes.com/sites/madhulika-pathak/2026/07/09/openai-debuts-chatgpt-work-workplace-ai-agent-with-gpt-56/",
    description:
      "Reporting on the July 9, 2026 launch of ChatGPT Work and the GPT-5.6 model, including its Sol, Luna, and Terra variants.",
  },
  {
    label: "OpenAI Help Center — ChatGPT Workspace Agents for Enterprise and Business",
    href: "https://help.openai.com/en/articles/20001143-chatgpt-workspace-agents-for-enterprise-and-business",
    description:
      "Official admin documentation for who can build, publish, share, schedule, and configure workspace agents and shared connections.",
  },
  {
    label: "OpenAI Help Center — Admin controls, security, and compliance for apps",
    href: "https://help.openai.com/en/articles/11509118-admin-controls-security-and-compliance-in-apps-enterprise-edu-and-business",
    description:
      "Official reference for connector action controls (read-only or custom action sets), RBAC, and write-action approvals.",
  },
  {
    label: "OpenAI — Enterprise privacy",
    href: "https://openai.com/enterprise-privacy/",
    description:
      "OpenAI's enterprise data-handling commitments, including that business-tier content is not used to train models by default.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for selecting, governing, and deploying AI agents with scoped credentials, approval gates, and audit logging.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "The data classification and access-control review ITECS runs before connecting an AI agent to sensitive systems.",
  },
];

export default function ChatGPTWorkAdminPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="ChatGPT Work Admin"
      faqHeading="ChatGPT Work Admin FAQ"
      sources={sources}
      ctaText="Rolling out ChatGPT Work? Get the admin controls and pilot plan right first."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of a ChatGPT Work AI agent surrounded by admin control gates — connector permissions, write-action approvals, and publishing controls — governing its access to files, apps, and Sites, in violet and blue"
      heroCaption="ChatGPT Work can act across your files, apps, and Sites. Admin controls — connector scopes, write approvals, and publishing rules — decide how far its reach extends."
      blocks={{
        CAPABILITY_TABLE: <ChatGPTWorkControlTable />,
        PILOT_DIAGRAM: <PilotPhaseDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
