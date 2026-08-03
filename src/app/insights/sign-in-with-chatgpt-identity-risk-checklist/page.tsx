import { InsightArticleLayout, type ArticleSource } from "@/components/insights/InsightArticleLayout";
import { SignInChecklistTable } from "@/components/sections/SignInChecklistTable";
import { IdentityReadinessDiagram } from "@/components/sections/IdentityReadinessDiagram";
import { generatePageMetadata } from "@/lib/metadata";
import { INSIGHTS } from "@/lib/constants";

const insight = INSIGHTS.find(
  (i) => i.slug === "sign-in-with-chatgpt-identity-risk-checklist"
)!;
const heroImage = "/images/insights/sign-in-with-chatgpt-hero.png";

export const metadata = generatePageMetadata({
  title: "Sign in with ChatGPT: Identity Risk Checklist",
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
  ogImage: heroImage,
});

const sources: ArticleSource[] = [
  {
    label: "Supabase — Sign in with ChatGPT is in beta on Supabase",
    href: "https://supabase.com/blog/sign-in-with-chatgpt-beta",
    description:
      "Supabase's rollout of Sign in with ChatGPT in beta, on the supabase.com login page and through the Supabase plugin in ChatGPT, with the approve-on-the-ChatGPT-side flow.",
  },
  {
    label: "OpenAI Help Center — ChatGPT release notes",
    href: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
    description:
      "OpenAI's release notes covering Sign in with ChatGPT in beta across partners including Airtable, GitLab, HubSpot, Notion, Supabase, and Vercel, sharing only name, email, and profile picture.",
  },
  {
    label: "Supabase Docs — OAuth 2.1 Server",
    href: "https://supabase.com/docs/guides/auth/oauth-server",
    description:
      "Supabase's OAuth server capabilities, including authorizing the ChatGPT app integration to act on a Postgres database — the authorization step that is distinct from sign-in.",
  },
  {
    label: "ITECS AI Consulting",
    href: "/consulting",
    description:
      "ITECS vendor-neutral consulting that governs identity, SSO and 2FA, and app-authorization decisions before you enable a new sign-in path.",
  },
  {
    label: "ITECS Data & AI Readiness Audit",
    href: "/data-audit",
    description:
      "ITECS audit that inventories the AI-connected apps and identities reaching your systems, the first step in a Sign in with ChatGPT decision.",
  },
];

export default function SignInWithChatGPTPage() {
  return (
    <InsightArticleLayout
      insight={insight}
      breadcrumbLabel="Sign in with ChatGPT"
      faqHeading="Sign in with ChatGPT FAQ"
      sources={sources}
      ctaText="Adding Sign in with ChatGPT? Let's make it an identity decision, not a default."
      heroImage={heroImage}
      heroImageAlt="Abstract dark visualization of a Sign in with ChatGPT identity decision — a single sign-in credential passing through an identity gate that shares only basic profile fields, set apart from a separate, heavily gated data-connector path that can reach a database, with SSO, consent, and disconnect checkpoints, in violet and blue"
      heroCaption="Signing in is not the same as granting access. Keep authentication and data-connector authorization as two separate, governed decisions."
      blocks={{
        CHECKLIST_TABLE: <SignInChecklistTable />,
        READINESS_DIAGRAM: <IdentityReadinessDiagram />,
      }}
      publishedDate={insight.publishedDate}
      modifiedDate={insight.modifiedDate}
      readTime="11 min read"
    />
  );
}
