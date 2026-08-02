import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { SecretsFlowDiagram } from "@/components/sections/SecretsFlowDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "secure-ai-agents-1password-secrets"
)!;
const heroImage = "/images/insights/secure-ai-agents-1password-hero.png";

export const metadata = generatePageMetadata({
  title: "How to Use 1Password With Cowork, Codex & AI Agent CLIs",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "1Password Developer — Secret references",
    href: "https://developer.1password.com/docs/cli/secret-references/",
    description:
      "Official documentation for op://vault/item/field secret references and how the 1Password CLI resolves them at runtime without writing secrets to disk.",
  },
  {
    label: "1Password Developer — Use biometric unlock for the CLI",
    href: "https://developer.1password.com/docs/cli/use-biometric-unlock/",
    description:
      "How to authenticate the 1Password CLI with Touch ID or Windows Hello through the desktop app integration — the human-in-the-loop approval step.",
  },
  {
    label: "1Password Developer — Integrate 1Password SDKs with AI agents",
    href: "https://developer.1password.com/docs/sdks/ai-agent/",
    description:
      "Official tutorial for building AI agent workflows that securely read, write, and rotate secrets through the 1Password SDK.",
  },
  {
    label: "1Password — Where MCP fits, and where it doesn't",
    href: "https://1password.com/blog/where-mcp-fits-and-where-it-doesnt",
    description:
      "1Password's stance that credentials and secrets should not be exchanged over a non-deterministic channel driven by an AI model.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service page for governed custom AI agents with scoped credentials, secrets management, audit logging, and human approval gates.",
  },
  {
    label: "ITECS — Self-Hosted AI Agents With Seafile",
    href: "/insights/self-hosted-ai-agents-seafile",
    description:
      "How ITECS shares internal App-enabled documentation agents across the team using a self-hosted, open-source stack.",
  },
];

export default function SecureAIAgents1PasswordPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="AI Agents & 1Password"
      faqHeading="AI Agents & 1Password Secrets FAQ"
      sources={sources}
      ctaText="Want AI agents that reach your real systems without ever exposing a secret?"
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of secure secret injection — a glowing vault and fingerprint approval gate feeding an encrypted credential into developer and AI agent tools, with the language model kept separate from the secret, in violet and blue"
      heroCaption="Secrets flow from 1Password through a biometric approval into the tools that need them — the AI model orchestrates the work but never receives the credential."
      blocks={{
        SECRETS_FLOW: <SecretsFlowDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="9 min read"
    />
  );
}
