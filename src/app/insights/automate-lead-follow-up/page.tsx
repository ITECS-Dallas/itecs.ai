import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "automate-lead-follow-up")!;

export const metadata = generatePageMetadata({
  title: insight.title,
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
});

const sources: ArticleSource[] = [
  {
    label: "ITECS AI Workflow Automation",
    href: "/automation",
    description:
      "ITECS service page for automating repetitive workflows, lead routing, notifications, and business process handoffs.",
  },
  {
    label: "ITECS CRM And Sales AI",
    href: "/crm-sales-ai",
    description:
      "ITECS guidance for using AI in sales workflows, CRM updates, lead qualification, and customer follow-up.",
  },
  {
    label: "Harvard Business Review",
    href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
    description:
      "Research-backed context on why fast response time matters for web leads.",
  },
  {
    label: "HubSpot CRM",
    href: "https://www.hubspot.com/products/crm",
    description:
      "CRM platform information for businesses evaluating lead capture, routing, and sales workflow tools.",
  },
  {
    label: "Twilio SMS",
    href: "https://www.twilio.com/en-us/messaging/channels/sms",
    description:
      "SMS messaging platform documentation for automated customer notifications and lead response workflows.",
  },
];

export default function AutomateLeadPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Automate Lead Follow-Up"
      faqHeading="Lead Automation FAQ"
      sources={sources}
      ctaText="Ready to automate your lead follow-up?"
      publishedDate="2026-05-06"
    />
  );
}
