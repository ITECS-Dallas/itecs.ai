import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find((i) => i.slug === "enterprise-agentic-skills-repo")!;
const heroImage = "/images/insights/enterprise-agentic-skills-repo-hero.png";

export const metadata = generatePageMetadata({
  title: insight.title,
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "ITECS Agent Skills Repository",
    href: "https://github.com/ITECS-Dallas/agent-skills",
    description:
      "Public GitHub repository for ITECS portable agent skills, validation scripts, installation workflow, and plugin metadata.",
  },
  {
    label: "Portable Development Workflow Plugin",
    href: "https://github.com/ITECS-Dallas/agent-skills/tree/main/plugins/portable-development-workflow",
    description:
      "Plugin bundle containing project-neutral frontend, backend, testing, documentation, and delivery workflow skills.",
  },
  {
    label: "ITECS AI DevOps",
    href: "/ai-devops",
    description:
      "ITECS service page for bringing AI discipline into development, operations, testing, and delivery workflows.",
  },
  {
    label: "ITECS Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "ITECS service page for custom AI workflows, agentic RAG systems, and secure integrations with business platforms.",
  },
  {
    label: "ITECS AI Training",
    href: "/training",
    description:
      "ITECS training services for helping business teams adopt AI tools with practical, role-specific guidance.",
  },
];

export default function EnterpriseAgenticSkillsRepoPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Enterprise Agentic Skills Repo"
      faqHeading="Enterprise Agentic Skills FAQ"
      sources={sources}
      ctaText="Want a safer operating model for AI-assisted development?"
      heroImage={heroImage}
      heroImageAlt="Empty enterprise AI operations room with abstract secure workflow displays"
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="7 min read"
    />
  );
}
