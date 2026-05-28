import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "openclaw-security-crisis")!;
const heroImage = "/images/insights/openclaw-security-crisis-hero.png";

export const metadata = generatePageMetadata({
  title: insight.title,
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Cyera Research — Claw Chain disclosure",
    href: "https://www.cyera.com/blog/claw-chain-cyera-research-unveil-four-chainable-vulnerabilities-in-openclaw",
    description:
      "Cyera's May 15, 2026 disclosure of four chainable OpenClaw vulnerabilities (CVE-2026-44112, 44113, 44115, 44118), patched in OpenClaw 2026.4.22.",
  },
  {
    label: "Koi Security — ClawHavoc analysis",
    href: "https://www.koi.ai/blog/clawhavoc-341-malicious-clawedbot-skills-found-by-the-bot-they-were-targeting",
    description:
      "Koi Security's February 2026 audit of ClawHub identifying 341 malicious skills, the payload families used, and the marketplace's publisher policy at the time of the attack.",
  },
  {
    label: "The Hacker News — Four OpenClaw flaws",
    href: "https://thehackernews.com/2026/05/four-openclaw-flaws-enable-data-theft.html",
    description:
      "The Hacker News coverage of the Claw Chain CVEs, CVSS scores, disclosure timeline, and the patched version number.",
  },
  {
    label: "Kaspersky — OpenClaw vulnerabilities assessment",
    href: "https://www.kaspersky.com/blog/openclaw-vulnerabilities-exposed/55263/",
    description:
      "Kaspersky's enterprise risk assessment, including their position that OpenClaw remains unsafe for business use without significant hardening.",
  },
  {
    label: "NIST AI Risk Management Framework",
    href: "https://www.nist.gov/itl/ai-risk-management-framework",
    description:
      "The U.S. National Institute of Standards and Technology framework ITECS uses as the governance backbone for every AI agent deployment.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service page for governed custom AI agent builds — scoped credentials, sandboxed runtime, audit logging, and human approval gates.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS AI consulting and readiness engagements — current-state audit, prioritized use cases, and a board-ready security and governance roadmap.",
  },
];

export default function OpenClawSecurityCrisisPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="OpenClaw Security Crisis"
      faqHeading="OpenClaw Security Crisis FAQ"
      sources={sources}
      ctaText="Want a governed agent deployment your auditor will sign off on?"
      heroImage={heroImage}
      heroImageAlt="Abstract dimensional visualization of a compromised AI agent sandbox with cyan and violet circuit traces fracturing in a dark security operations center"
      heroCaption="The Claw Chain compromise pattern: an isolated agent sandbox cracked by chained TOCTOU and privilege flaws, then used to exfiltrate credentials and plant a backdoor."
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="8 min read"
    />
  );
}
