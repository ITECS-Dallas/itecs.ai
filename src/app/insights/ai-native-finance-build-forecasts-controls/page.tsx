import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import {
  FinanceAgentReadinessTable,
  FinanceControlChecklistTable,
} from "@/components/sections/AINativeFinanceControlTables";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-native-finance-build-forecasts-controls",
)!;
const heroImage = "/images/insights/ai-native-finance-controls-hero.png";

export const metadata = generatePageMetadata({
  title: "AI-Native Finance: Build Forecasts With Controls",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "OpenAI — What building an AI-native finance function taught me",
    href: "https://openai.com/index/building-an-ai-native-finance-function/",
    description:
      "Sarah Friar's August 10, 2026 lessons on broad access, workflow redesign, finance builders, accountable controls, dependable-work metrics, zero-day close, and continuous forecasting.",
  },
  {
    label: "OpenAI — How OpenAI's Finance team uses AI",
    href: "https://openai.com/business/solutions/finance/workflows/",
    description:
      "Sixteen current ChatGPT Work and Codex workflows across planning, forecasting, monthly close, treasury, reporting, and investor relations.",
  },
  {
    label: "PwC — PwC and OpenAI build an AI-native finance function",
    href: "https://www.pwc.com/us/en/about-us/newsroom/press-releases/pwc-openai-native-finance-function.html",
    description:
      "The May 5, 2026 collaboration announcement covering human-supervised agents for procurement, accruals, close, reconciliation, reporting, planning, and forecasting.",
  },
  {
    label: "McKinsey — How AI agents can help FP&A steer the business",
    href: "https://www.mckinsey.com/capabilities/operations/our-insights/how-ai-agents-can-help-fp-and-a-better-steer-the-business",
    description:
      "July 2026 finance-operations coverage on continuous planning and the need to redesign end-to-end workflows, roles, governance, data ownership, and working practices.",
  },
  {
    label: "Gartner — AI in cloud ERP and the financial close",
    href: "https://www.gartner.com/en/newsroom/press-releases/2026-02-24-gartner-predicts-embedded-ai-in-cloud-erp-applications-will-drive-a-30-percent-faster-financial-close-by-2028",
    description:
      "Current market analysis on reconciliation, continuous controls monitoring, audit logging, forecasting, and the data, integration, and skills barriers to adoption.",
  },
  {
    label: "ITECS AI Automation",
    href: "/automation",
    description:
      "ITECS workflow discovery, data integration, control design, agent implementation, testing, and managed optimization for practical business automation.",
  },
];

export default function AINativeFinanceControlsPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI-Native Finance"
      faqHeading="AI-Native Finance FAQ"
      sources={sources}
      ctaText="Ready to turn one recurring finance decision into a controlled AI workflow?"
      heroImage={heroImage}
      heroImageAlt="Abstract AI-native finance system connecting approved ledger data through reconciliation controls, exception review, traceable approval gates, and continuously updating forecast scenarios"
      heroCaption="AI-native finance connects approved evidence to live forecasts while exceptions, baseline changes, and final decisions remain under accountable human control."
      blocks={{
        CONTROL_CHECKLIST: <FinanceControlChecklistTable />,
        AGENT_READINESS: <FinanceAgentReadinessTable />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
