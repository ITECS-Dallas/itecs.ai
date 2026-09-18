import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { INSIGHTS } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/metadata";

const insight = INSIGHTS.find(
  (item) => item.slug === "chatgpt-data-agent-governed-dashboards",
)!;

export const metadata = generatePageMetadata({
  title: insight.title,
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: insight.image.src,
});

const sources: ArticleSource[] = [
  {
    label: "OpenAI — Now everyone can put data to work",
    href: "https://openai.com/index/put-data-to-work/",
    description: "September 10, 2026 launch: connected analysis, company definitions, dashboards, and inherited query permissions.",
  },
  {
    label: "OpenAI — Using the Data plugin in ChatGPT Work and Codex",
    href: "https://help.openai.com/en/articles/20001518",
    description: "Setup, source access, and the explicit warning that Sites publication copies analysis data. Checked September 18, 2026.",
  },
  {
    label: "OpenAI — Roles and workspace permissions",
    href: "https://learn.chatgpt.com/docs/enterprise/roles-and-workspace-permissions",
    description: "Separate controls for seats, administrative roles, feature access, plugins, and connected systems.",
  },
  {
    label: "Sigma — The Sigma plugin is live for ChatGPT Work and Codex",
    href: "https://www.sigmacomputing.com/blog/sigma-plugin-chatgpt",
    description: "September 10, 2026 integration announcement and dashboard-building license distinction.",
  },
  {
    label: "Sigma — Use the Sigma plugin for ChatGPT",
    href: "https://help.sigmacomputing.com/docs/use-the-sigma-plugin-for-ai-assistants",
    description: "OAuth, operation permissions, and current workbook creation, sharing, export, and restoration limitations.",
  },
  {
    label: "Sigma — Manage workbook refresh options",
    href: "https://help.sigmacomputing.com/docs/workbook-refresh-options",
    description: "Refresh behavior, schedule permissions, and the warehouse cost implications of frequent queries.",
  },
];

const pilotSteps = [
  ["Agree on the decision", "The operations lead names the expediting decision, the approved report, the comparison periods, and acceptable reconciliation differences before analysis begins."],
  ["Verify the source and calculation", "The analyst reviews joins, aggregation grain, duplicate handling, exclusions, time zones, and null values. Match totals and selected records to the trusted backlog report using the same cutoff."],
  ["Challenge the explanation", "Distinguish a measured increase from a proposed cause. Check whether a status change, late data load, or changed promise-date definition explains the apparent trend. Do not present correlation as causation."],
  ["Exercise the dashboard", "Test region, product, and period filters across every chart and total. Verify freshness, empty states, and expected denials using representative restricted accounts."],
  ["Approve the audience and action", "The data owner checks included fields and recipients. The operations lead approves the reviewed view and decides what action to take. Complete sharing in the destination's supported controls."],
  ["Record and repeat", "Keep the accepted query or calculation, reconciliation evidence, owner, version, and update procedure. Run the next cycle against the same acceptance criteria and record any changes."],
];

export default function ChatGPTDataAgentPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="ChatGPT Data Agent"
      faqHeading="ChatGPT Data Agent FAQ"
      sources={sources}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="9 min read"
      heroCaption="ITECS pilot guidance: permission to query and approval to share are separate decisions. Validate the analysis between them. This is a conceptual workflow, not a vendor interface."
      ctaText="Want to pilot a business dashboard without losing control of your data? Talk with ITECS about data readiness, approved sources, metric definitions, access testing, and a reviewed operational pilot."
      blocks={{
        DASHBOARD_PILOT: (
          <ol className="list-decimal space-y-5 pl-6 text-text-secondary">
            {pilotSteps.map(([title, description], index) => (
              <li key={title} value={index + 1} className="pl-2 leading-relaxed">
                <strong className="font-medium text-ink">{title}.</strong>{" "}
                {description}
              </li>
            ))}
          </ol>
        ),
      }}
    />
  );
}
