import {
  InsightArticleLayout,
  type ArticleSource,
} from "@/components/insights/InsightArticleLayout";
import { AdobeChatGPTGovernanceTable } from "@/components/sections/AdobeChatGPTGovernanceTable";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "adobe-in-chatgpt-govern-creative-ai-workflows"
)!;
const heroImage = "/images/insights/adobe-in-chatgpt-governance-hero.png";

export const metadata = generatePageMetadata({
  title: "Adobe in ChatGPT: Govern Creative AI Workflows",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Adobe — Introducing Adobe for ChatGPT",
    href: "https://blog.adobe.com/en/publish/2026/08/06/introducing-adobe-chatgpt-create-edit-get-work-done-all-in-chatgpt",
    description:
      "Adobe's August 6, 2026 launch post for the unified plugin, its 70-plus tools, ChatGPT Work and Codex support, guest access, Adobe sign-in, and app handoff.",
  },
  {
    label: "OpenAI — Plugin controls for ChatGPT Work and Codex",
    href: "https://learn.chatgpt.com/docs/enterprise/apps-and-connectors",
    description:
      "OpenAI's current administration model for plugin availability, connector access, source authorization, action controls, and runtime permissions.",
  },
  {
    label: "Digital Camera World — Adobe brings 70-plus tools to ChatGPT",
    href: "https://www.digitalcameraworld.com/tech/artificial-intelligence/adobe-polish-my-pics-adobes-new-chatgpt-plug-in-gives-the-chatbot-access-to-70-tools-including-photoshop-and-lightroom-favorites",
    description:
      "Current launch coverage of creative workflows, Creative Cloud storage, guest use, signed-in capabilities, and the boundary between the plugin and flagship apps.",
  },
  {
    label: "Adobe — Approach to generative AI with Firefly",
    href: "https://www.adobe.com/ai/overview/firefly/gen-ai-approach.html",
    description:
      "Adobe's published position on customer content, model training, output ownership, partner models, and creator responsibility.",
  },
  {
    label: "U.S. Copyright Office — AI copyrightability report",
    href: "https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf",
    description:
      "Primary guidance on human authorship, AI-assisted work, purely AI-generated material, prompts, and case-by-case copyrightability.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS governance and implementation support for AI tool selection, access design, data controls, pilot policy, employee training, and measurable rollout.",
  },
];

export default function AdobeInChatGPTGovernancePage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Adobe in ChatGPT"
      faqHeading="Adobe in ChatGPT Governance FAQ"
      sources={sources}
      ctaText="Planning to enable Adobe in ChatGPT? Put the access, file, brand, and approval rules in place first."
      heroImage={heroImage}
      heroImageAlt="Abstract governed creative AI workflow with image, video, design, spreadsheet, and PDF assets moving through a conversational workspace, security checks, brand review, human approval, and approved output gates"
      heroCaption="Creative speed becomes a governed workflow when files, identity, brand review, human approval, and output ownership have explicit checkpoints."
      blocks={{
        GOVERNANCE_MATRIX: <AdobeChatGPTGovernanceTable />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="12 min read"
    />
  );
}
