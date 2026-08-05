import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import {
  MCPRequirementsTable,
  DesktopConfigBlock,
  DesktopStatusPanel,
  ClaudeCodeTerminal,
  ConnectorDialog,
} from "@/components/sections/MCPGuideVisuals";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "how-to-set-up-mcp-in-claude")!;
const heroImage = "/images/insights/mcp-claude-setup-hero.png";

export const metadata = generatePageMetadata({
  title: "How to Set Up Model Context Protocol (MCP) in Claude",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Model Context Protocol — Connect to local MCP servers",
    href: "https://modelcontextprotocol.io/docs/develop/connect-local-servers",
    description:
      "The official MCP documentation for running local servers, including transports and the Claude Desktop configuration model.",
  },
  {
    label: "Anthropic — Getting started with local MCP servers on Claude Desktop",
    href: "https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop",
    description:
      "Anthropic's help-center guide to editing claude_desktop_config.json, the config file locations, and confirming a server is running.",
  },
  {
    label: "Anthropic — Get started with custom connectors using remote MCP",
    href: "https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp",
    description:
      "Anthropic's guide to adding remote MCP servers as custom connectors, plan availability, and OAuth setup across Claude clients.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service for designing, deploying, and governing MCP servers and AI agents with least-privilege scoping and approval controls.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS audit that maps which tools and data Claude should reach before you wire up MCP across your team.",
  },
];

export default function HowToSetUpMCPPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Set Up MCP in Claude"
      faqHeading="MCP in Claude FAQ"
      sources={sources}
      ctaText="Rolling out MCP across your team? Let's set it up useful and contained."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of Model Context Protocol connecting Claude to tools — a central Claude client core linked by luminous channels to a local filesystem server, a code-terminal server, and a remote cloud connector, each passing through a permission gate, in violet and blue"
      heroCaption="MCP connects Claude to your tools three ways: a local config file, the Claude Code CLI, and remote connectors — each gated by your approval."
      blocks={{
        REQUIREMENTS_TABLE: <MCPRequirementsTable />,
        DESKTOP_CONFIG: <DesktopConfigBlock />,
        DESKTOP_STATUS: <DesktopStatusPanel />,
        CODE_TERMINAL: <ClaudeCodeTerminal />,
        CONNECTOR_DIALOG: <ConnectorDialog />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="12 min read"
    />
  );
}
