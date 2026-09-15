import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { PaymentControlTable } from "@/components/sections/PaymentControlTable";
import { MoneyMovementReadinessDiagram } from "@/components/sections/MoneyMovementReadinessDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "ai-payment-agents-control-money-movement"
)!;

export const metadata = generatePageMetadata({
  title: "AI Payment Agents: Control Money Movement Before Launch",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: insight.image.src,
});

const sources: ArticleSource[] = [
  {
    label: "Corpay — Corpay Introduces Agent Card Capability to Power Secure Agentic Payments",
    href: "https://www.stocktitan.net/news/CPAY/corpay-introduces-agent-card-capability-to-power-secure-agentic-cjhishcwz5kc.html",
    description:
      "Corpay's July 2026 introduction of Agent Card, which lets trusted AI agents create controlled virtual cards for approved business transactions under Corpay's authorization, control, and visibility rules.",
  },
  {
    label: "PR Newswire — Sunrate and Mastercard Release White Paper on Agentic AI and the Future of B2B Global Payments",
    href: "https://www.prnewswire.com/news-releases/sunrate-and-mastercard-release-white-paper-on-agentic-ai-and-the-future-of-b2b-global-payments-302832129.html",
    description:
      "The July 2026 white paper \"Beyond Automation: Defining Agentic Global Payments,\" mapping 16 B2B payment pain points and 13 agent use cases within defined governance frameworks.",
  },
  {
    label: "Visa — Enabling AI agents to buy securely and seamlessly (Intelligent Commerce)",
    href: "https://corporate.visa.com/en/products/intelligent-commerce.html",
    description:
      "Visa Intelligent Commerce, which gives AI agents tokenized credentials bound to a specific agent, user authentication, and spend controls, with support for emerging agent payment protocols.",
  },
  {
    label: "arXiv — Whispers of Wealth: A Systematic Red-Teaming Study of the Agent Payments Protocol (AP2)",
    href: "https://arxiv.org/html/2601.22569",
    description:
      "A 2026 red-teaming study reporting that prompt-injection attacks bypassed AP2's cryptographically signed mandate constraints with roughly 90 to 100 percent success in adversarial tests.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for designing and governing AI agents with scoped access, approval thresholds, separation of duties, and audit trails around any payment workflow.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS audit that maps which agents can move money before you launch them — the first step in controlling payment-agent money movement.",
  },
];

export default function AIPaymentAgentsPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Payment Agents"
      faqHeading="AI Payment Agent Controls FAQ"
      sources={sources}
      ctaText="Letting an AI agent move money? Let's build the controls before it does."
      heroCaption="The rails now assume agents pay. Before launch, gate every agent by scope, identity, approval, and separation of duties — and audit every move."
      blocks={{
        CONTROL_TABLE: <PaymentControlTable />,
        READINESS_DIAGRAM: <MoneyMovementReadinessDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
