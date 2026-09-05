import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { generatePageMetadata } from "@/lib/metadata";
import { ASTRA_ORDER_EXCEPTION_STEPS, INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (item) => item.slug === "gpt-6-astra-managed-intelligence-providers",
)!;

export const metadata = generatePageMetadata({
  title: insight.title,
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
});

const sources: ArticleSource[] = [
  {
    label: "OpenAI — What's new: August 31–September 4, 2026",
    href: "https://learn.chatgpt.com/docs/whats-new",
    description:
      "The weekly product update identifying GPT-6 Astra for demanding work in ChatGPT Work and Codex.",
  },
  {
    label: "OpenAI — Workspace model availability",
    href: "https://learn.chatgpt.com/docs/enterprise/workspace-model-availability",
    description:
      "Initial Enterprise rollout eligibility, administrator enablement, and the distinction between workspace and API access.",
  },
  {
    label: "OpenAI — GPT-6 Astra model reference",
    href: "https://developers.openai.com/api/docs/models/gpt-6-astra",
    description:
      "Model identity, supported capabilities, and current API specifications. Capability documentation is not evidence of a client-specific outcome.",
  },
  {
    label: "OpenAI — Latest-model implementation guidance",
    href: "https://developers.openai.com/api/docs/guides/latest-model",
    description:
      "Astra-specific API integration and migration considerations, including Responses tool calling.",
  },
  {
    label: "OpenAI — Asynchronous tool calling",
    href: "https://developers.openai.com/api/docs/guides/async-tool-calling",
    description:
      "Application-owned background tool execution, tool-call identifiers, and result handling.",
  },
  {
    label: "OpenAI — Mid-turn steering",
    href: "https://developers.openai.com/api/docs/guides/steering",
    description:
      "Responses WebSocket steering, queued instructions, and lifecycle limitations relevant to scope changes.",
  },
  {
    label: "OpenAI — Safety best practices",
    href: "https://developers.openai.com/api/docs/guides/safety-best-practices",
    description:
      "Adversarial testing, human review, and understanding model limitations before operational use.",
  },
  {
    label: "OpenAI — Misalignment monitoring",
    href: "https://developers.openai.com/api/docs/guides/safety-checks/misalignment-monitoring",
    description:
      "Monitoring coverage, automatic-stop limitations, incident signals, and recommended handling of blocked workflows.",
  },
  {
    label: "OpenAI — API data controls",
    href: "https://developers.openai.com/api/docs/guides/your-data",
    description:
      "Training opt-in, abuse-monitoring logs, application state, and Zero Data Retention eligibility and limitations.",
  },
  {
    label: "OpenAI — Agent evaluations",
    href: "https://developers.openai.com/api/docs/guides/agent-evals",
    description:
      "Trace-based investigation and repeatable evaluation datasets for agent workflows.",
  },
  {
    label: "OpenAI — ChatGPT Work and Codex usage and pricing",
    href: "https://learn.chatgpt.com/docs/pricing",
    description:
      "Shared Work/Codex usage and the separate API-key billing context. Check current account terms before quoting a service.",
  },
];

export default function GPT6AstraManagedIntelligenceProvidersPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="GPT-6 Astra for Business"
      faqHeading="GPT-6 Astra and Managed Intelligence FAQ"
      sources={sources}
      ctaText="Planning an Astra pilot for your team or clients? ITECS can help define one useful workflow, connect approved data and tools, establish evaluation and approval gates, and scope the managed operating responsibilities before production."
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="12 min read"
      blocks={{
        ASTRA_ORDER_EXCEPTION: (
          <ol className="my-8 list-decimal space-y-6 pl-6 text-text-secondary">
            {ASTRA_ORDER_EXCEPTION_STEPS.map((step, index) => (
              <li key={step.title} value={index + 1} className="pl-2 leading-relaxed">
                <strong className="font-medium text-text-primary">
                  {step.title}.
                </strong>{" "}
                {step.description}
              </li>
            ))}
          </ol>
        ),
      }}
    />
  );
}
