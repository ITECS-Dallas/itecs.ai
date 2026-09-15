import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { ChatGPTAdminPluginRolloutTable } from "@/components/sections/ChatGPTAdminPluginRolloutTable";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "chatgpt-admin-plugin-automate-workspace-management",
)!;

export const metadata = generatePageMetadata({
  title: "ChatGPT Admin Plugin: Automate Workspace Management",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: insight.image.src,
});

const sources: ArticleSource[] = [
  {
    label: "OpenAI — Introducing the Admin plugin",
    href: "https://openai.com/index/introducing-admin-plugin/",
    description:
      "OpenAI's August 25, 2026 launch announcement covering supported workspace analytics, member and group administration, permission changes, usage limits, spending requests, structured results, recurring workflows, and existing-role enforcement.",
  },
  {
    label: "OpenAI — Plugins in ChatGPT and Codex",
    href: "https://help.openai.com/en/articles/20001256",
    description:
      "Current Help Center guidance on plugin eligibility, installation policies, included apps and skills, role assignment, read and write actions, confirmations, testing, disabling, version refresh, and pilot rollout.",
  },
  {
    label: "OpenAI — Plugin controls",
    href: "https://learn.chatgpt.com/docs/enterprise/apps-and-connectors",
    description:
      "OpenAI's current capability-chain model separating plugin availability, included skills, app access, actions, connected-service authorization, and runtime permissions.",
  },
  {
    label: "OpenAI — ChatGPT Work admin FAQ",
    href: "https://learn.chatgpt.com/docs/enterprise/work-admin-faq",
    description:
      "Current administration guidance for roles, Work and Codex access, plugins, action restrictions, credits, analytics, audit boundaries, incident response, and phased rollout.",
  },
  {
    label: "OpenAI — Roles and workspace permissions",
    href: "https://learn.chatgpt.com/docs/enterprise/roles-and-workspace-permissions",
    description:
      "Current documentation distinguishing seats, built-in roles, custom roles, plugin permissions, local runtime controls, connected-system authorization, and Analytics Viewer access.",
  },
  {
    label: "OpenAI — Usage limits and spend controls",
    href: "https://learn.chatgpt.com/docs/enterprise/usage-limits",
    description:
      "Plan-dependent boundaries for eligible ChatGPT workspace activity, Enterprise and Edu limit procedures, Business credit and spend controls, and separation from Platform API billing.",
  },
  {
    label: "OpenAI — Workspace analytics",
    href: "https://learn.chatgpt.com/docs/enterprise/workspace-analytics",
    description:
      "Current distinctions among workspace analytics, Codex analytics, aggregated Analytics API reporting, and auditable Compliance API records.",
  },
  {
    label: "ITECS — Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS design and governance support for permission-aware agents, approval-gated tools, observable workflows, exception handling, testing, and managed operation.",
  },
];

export default function ChatGPTAdminPluginWorkspaceManagementPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="ChatGPT Admin Plugin"
      faqHeading="ChatGPT Admin Plugin Governance FAQ"
      sources={sources}
      ctaText="Planning an Admin plugin pilot? ITECS can inventory the actions, map roles and approvals, build nonproduction tests, define verification and rollback, and turn recurring administration into a controlled operating workflow."
      heroCaption="Conversational administration is safe only when read access, proposed changes, approval, authoritative-state verification, exceptions, and rollback remain distinct controls."
      blocks={{
        ADMIN_PLUGIN_ROLLOUT_TABLE: <ChatGPTAdminPluginRolloutTable />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="16 min read"
    />
  );
}
