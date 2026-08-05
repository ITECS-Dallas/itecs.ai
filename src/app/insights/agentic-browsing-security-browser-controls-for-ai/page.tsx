import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { BrowserAgentControlTable } from "@/components/sections/BrowserAgentControlTable";
import { BrowserAgentReadinessDiagram } from "@/components/sections/BrowserAgentReadinessDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "agentic-browsing-security-browser-controls-for-ai"
)!;
const heroImage = "/images/insights/agentic-browsing-security-hero.png";

export const metadata = generatePageMetadata({
  title: "Agentic Browsing Security: Browser Controls for AI",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Google Cloud — Future Mode part 1: the intelligent and secure browser for enterprises",
    href: "https://cloud.google.com/blog/products/chrome-enterprise/future-mode-part-1-the-intelligent-and-secure-browser-for-enterprises",
    description:
      "Google's Chrome Enterprise Future Mode series framing a browser that is both agentic and secure, with real-time DLP and AI governance in Chrome Enterprise Premium.",
  },
  {
    label: "TechCrunch — Google brings Gemini in Chrome and agentic browsing to US users",
    href: "https://techcrunch.com/2025/09/18/google-brings-gemini-in-chrome-to-us-users-unveils-agentic-browsing-capabilities-and-more/",
    description:
      "Coverage of Gemini in Chrome and Auto Browse, the agent that completes multi-step web tasks by scrolling, clicking, and typing, with approval for sensitive steps.",
  },
  {
    label: "University of Washington — Some agentic AI browsers come with major cybersecurity risks",
    href: "https://www.washington.edu/news/2026/06/30/some-agentic-ai-browsers-come-with-major-cybersecurity-risks-uw-study-finds/",
    description:
      "UW research finding that four of seven studied agentic browsers could be used to bypass the same-origin policy, building on indirect prompt injection.",
  },
  {
    label: "Brave — Agentic Browser Security: Indirect Prompt Injection in Perplexity Comet",
    href: "https://brave.com/blog/comet-prompt-injection/",
    description:
      "Brave's security team demonstrating hidden-instruction prompt injection that hijacked Perplexity's Comet into cross-site actions like fetching a one-time passcode.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS vendor-neutral consulting that governs browser-based AI agents — identity, DLP, scoping, extension risk, logging, approvals, and prompt-injection testing.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS audit that maps which browser agents reach which systems and red-teams them against prompt injection before they run on real work.",
  },
];

export default function AgenticBrowsingSecurityPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Agentic Browsing Security"
      faqHeading="Agentic Browsing Security FAQ"
      sources={sources}
      ctaText="Employees running browser AI agents? Let's govern them before an attacker does."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of agentic browsing security — an AI agent core operating inside a browser window, reaching multiple SaaS app tabs and forms through an employee identity gate, ringed by DLP, site-scope, logging, and human-approval checkpoints, with a malicious hidden-instruction page being deflected, in violet and blue"
      heroCaption="The agent acts in the browser, with the employee's access. That makes the browser where you enforce identity, DLP, scope, logging, and approvals."
      blocks={{
        CONTROL_TABLE: <BrowserAgentControlTable />,
        READINESS_DIAGRAM: <BrowserAgentReadinessDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
