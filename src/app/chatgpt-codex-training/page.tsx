import { generatePageMetadata } from "@/lib/metadata";
import {
  generateServiceSchema,
  generateFAQSchema,
  generateHowToSchema,
} from "@/lib/seo";
import { TRAINING_SERVICES } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { TrainingToolShowcase } from "@/components/sections/TrainingToolShowcase";
import { PainPoint } from "@/components/sections/PainPoint";
import { ServiceFeatures } from "@/components/sections/ServiceFeatures";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ToolTrainingDiagram } from "@/components/sections/ToolTrainingDiagram";
import { Integrations } from "@/components/sections/Integrations";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

const service = TRAINING_SERVICES.find((s) => s.slug === "chatgpt-codex-training")!;
const heroImage = "/images/services/chatgpt-codex-training.png";

export const metadata = generatePageMetadata({
  title: "ChatGPT Codex Training & Implementation in Dallas",
  description:
    "ITECS trains and implements OpenAI's ChatGPT Codex for Dallas engineering teams — secure, sandboxed setup with guardrails and hands-on developer workshops.",
  path: service.href,
  keywords: service.keywords,
  ogImage: heroImage,
});

export default function ChatGPTCodexTrainingPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: service.shortTitle, href: service.href },
          ]}
        />
      </div>

      <ServiceHero service={service} />

      <TrainingToolShowcase
        eyebrow="What Is ChatGPT Codex"
        heading="An Engineering Agent That Ships Real Pull Requests"
        paragraphs={[
          "ChatGPT Codex is OpenAI's software-engineering agent. It reads your repository, writes and edits code across files, runs commands in a sandbox, and opens pull requests your team reviews. It works in the terminal, inside your IDE, and in the cloud.",
          "In the right hands it clears backlogs and compresses days of work into hours. Without guardrails it can introduce risk. ITECS implements Codex safely and trains your developers to drive it like a disciplined teammate.",
        ]}
        bullets={[
          "Delegate refactors, tests, migrations, and routine bug fixes",
          "Sandboxed runs and approval gates keep production protected",
          "Every change arrives as a reviewable pull request",
          "Spending caps keep agent usage inside a predictable budget",
        ]}
        image={{
          src: heroImage,
          alt: "Abstract visualization of the ChatGPT Codex coding agent reading a repository and generating pull requests in a violet and blue terminal aesthetic",
          caption:
            "Codex turns scoped engineering tasks into reviewable pull requests — inside guardrails your team controls.",
        }}
        imageLeft
      />

      <PainPoint
        stat="40%"
        statLabel="of developer time goes to routine code an agent could handle — if it's governed"
        heading="Codex Can Write Your Code. Ungoverned, It Can Also Break It."
        paragraphs={[
          "Handing an autonomous agent write access to your codebase without guardrails is how good intentions become production incidents. Unscoped credentials, no sandbox, no review standard, and no spending cap turn a productivity tool into a liability.",
          "The answer is not to ban the agent — it is to govern it. With sandboxed execution, approval gates, and trained developers, Codex safely absorbs the routine engineering that drains your team's week.",
        ]}
        scenario={{
          business: "A 25-developer SaaS company in Dallas",
          problem:
            "let engineers experiment with Codex on their own. One agent run, given broad access and no review gate, force-pushed a half-finished refactor and broke the build for a full afternoon. Leadership nearly banned the tool outright despite its obvious upside.",
          result:
            "ITECS re-implemented Codex with sandboxed execution, scoped credentials, spending caps, and a mandatory pull-request review standard. We trained the team on task scoping and agent review. Codex now clears routine tickets safely, and the team ships noticeably more each sprint.",
        }}
      />

      <ServiceFeatures
        features={service.features}
        title="ChatGPT Codex Training & Implementation"
      />

      <HowItWorks steps={service.howItWorks} heading={service.howItWorksHeading} />

      <ToolTrainingDiagram
        eyebrow="Implementation Path"
        heading="From Sandbox Setup to Governed Agent Workflows"
        ariaLabel="Five-stage ChatGPT Codex rollout: assess the codebase and workflow, implement Codex with sandboxing and guardrails, secure credentials and approval gates, train developers hands-on, then optimize cost and workflow."
        caption="ITECS stands up Codex the safe way — assess, implement, secure, train, and optimize — so agent-written code is always sandboxed, reviewed, and within budget."
        stages={[
          { icon: "Search", label: "Assess", detail: "Review repos & workflow" },
          { icon: "Terminal", label: "Implement", detail: "Configure CLI, IDE & cloud agent" },
          { icon: "ShieldCheck", label: "Secure", detail: "Sandboxes, scopes, approvals" },
          { icon: "GraduationCap", label: "Train", detail: "Scope, prompt, review on live tickets" },
          { icon: "LineChart", label: "Optimize", detail: "Tune cost & standards" },
        ]}
      />

      <Integrations
        tools={service.integrations}
        heading="Tools We Integrate Codex With"
      />

      <SecurityGuarantee
        title="Secure, Governed Codex Deployment"
        description="Your source code, secrets, and infrastructure stay protected throughout the engagement. ITECS AI is backed by ITECS — a Dallas cybersecurity MSP operating since 2002."
        points={[
          "Sandboxed execution — agent runs are isolated so they never touch production systems unchecked",
          "Scoped credentials — Codex receives only the repository and permissions each task requires",
          "Mandatory human review — every agent-written change lands as a pull request a developer approves",
          "Spending and usage caps — agent runs stay within a budget you set and can audit",
        ]}
        internalLink={{
          text: "See how we govern custom AI agents",
          href: "/custom-ai-agents",
        }}
        externalLink={{
          text: "OpenAI Enterprise Privacy",
          href: "https://openai.com/enterprise-privacy/",
        }}
      />

      <PricingROI
        heading="What Does ChatGPT Codex Training Cost?"
        description="Most teams either avoid Codex out of fear or adopt it with no guardrails. Here is how a governed ITECS engagement compares for a team of 5–30 developers."
        traditionalLabel="Self-Taught / Ungoverned"
        aiLabel="ITECS Program"
        comparison={[
          {
            label: "Time to safe adoption",
            traditional: "Months of trial and error",
            ai: "2–3 weeks",
          },
          {
            label: "Production risk",
            traditional: "High — no guardrails",
            ai: "Low — sandboxed + reviewed",
          },
          {
            label: "Code review standard",
            traditional: "Inconsistent",
            ai: "Defined and enforced",
          },
          {
            label: "Cost control",
            traditional: "Unpredictable runs",
            ai: "Spending caps in place",
          },
          {
            label: "Ongoing support",
            traditional: "None",
            ai: "AI Retainer, 12-month expiry",
          },
        ]}
        roiStatement="Typical outcome: routine engineering runs meaningfully faster and teams clear more tickets per sprint — without a single unreviewed change reaching production."
        pricingNotes={[
          "Implementation + guardrails: scoped flat fee covering CLI, IDE, and cloud-agent setup with sandboxing and approval gates",
          "Developer enablement: hands-on workshops on live tickets, plus a documented review standard for agent output",
          "Prepaid retainer hours cover workflow tuning, new-repo onboarding, and cost optimization with a 12-month expiry",
        ]}
      />

      <ServiceStats stats={service.stats} />

      <FAQ items={service.faq} heading="ChatGPT Codex Training FAQ" />

      <CTASection />

      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
    </>
  );
}
