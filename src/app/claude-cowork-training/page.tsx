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
import { GuidedBuildEngagement } from "@/components/sections/GuidedBuildEngagement";
import { Integrations } from "@/components/sections/Integrations";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { PricingROI } from "@/components/sections/PricingROI";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

const service = TRAINING_SERVICES.find((s) => s.slug === "claude-cowork-training")!;
const heroImage = "/images/services/claude-cowork-training.png";

export const metadata = generatePageMetadata({
  title: "Claude Cowork Training & Implementation in Dallas",
  description:
    "Hands-on Claude Cowork training and Guided Build Sessions for Dallas teams. Build a working agent in your project folder with secure setup and team handoff.",
  path: service.href,
  keywords: service.keywords,
  ogImage: heroImage,
});

export default function ClaudeCoworkTrainingPage() {
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
        eyebrow="What Is Claude Cowork"
        heading="An AI Teammate That Runs Whole Projects"
        paragraphs={[
          "Claude Cowork is Anthropic's agentic workspace. Instead of answering one question at a time, Claude takes a full brief and does the work — researching, drafting documents, analyzing spreadsheets, and completing multi-step tasks while your team reviews and steers.",
          "The technology is remarkable. The results depend on how your people use it. ITECS closes that gap with secure implementation and hands-on training so Claude Cowork becomes a dependable part of how your business operates.",
        ]}
        bullets={[
          "Delegate research, reports, and analysis in plain language",
          "Keep a human in the loop to review and approve every result",
          "Connect Claude to Microsoft 365, Google Workspace, and Slack",
          "Standardize the best workflows into reusable team templates",
        ]}
        image={{
          src: heroImage,
          alt: "Abstract visualization of the Claude Cowork agentic AI workspace coordinating documents, research, and spreadsheets in violet and blue",
          caption:
            "Claude Cowork turns a plain-language brief into completed work — with your team reviewing every step.",
        }}
      />

      <PainPoint
        stat="80%"
        statLabel="of AI rollouts stall because employees never learn to delegate real work to the tool"
        heading="Your Team Has Access to Claude. They're Still Using It Like Google."
        paragraphs={[
          "Buying licenses is easy. Changing how people work is not. Most employees treat powerful AI like a search box — asking one-line questions and pasting back whatever comes out. The agentic workflows that actually save hours go untouched because nobody showed the team how to use them.",
          "Meanwhile, sensitive data leaks into tools with no guardrails, and leadership has no visibility into what is working. The tool is capable. The adoption is not. That gap is exactly what training and implementation fix.",
        ]}
        scenario={{
          business: "A 40-person marketing agency in Plano",
          problem:
            "paid for Claude across the team but saw almost no change in output after two months. Staff used it for the occasional email rewrite and little else. Client research, campaign briefs, and reporting — the work that ate their week — never moved into the tool because no one knew how to delegate it.",
          result:
            "ITECS implemented Claude Cowork on the right plan, connected it to their Google Workspace and Slack securely, and ran two weeks of hands-on delegation workshops. The agency now runs first-draft research and reporting through Claude and recovered roughly 12 hours per week across the team.",
        }}
      />

      <ServiceFeatures
        features={service.features}
        title="Claude Cowork Training & Implementation"
      />

      <HowItWorks steps={service.howItWorks} heading={service.howItWorksHeading} />

      <ToolTrainingDiagram
        eyebrow="Implementation Path"
        heading="From First Login to Delegated Projects in Two Weeks"
        ariaLabel="Five-stage Claude Cowork rollout: assess the work worth delegating, implement the workspace and plan, secure tool connections and data access, run hands-on training workshops, then scale with templates and new teams."
        caption="Every ITECS Claude Cowork engagement follows the same governed path — assess, implement, secure, train, and scale — so adoption sticks and data stays protected."
        stages={[
          { icon: "Search", label: "Assess", detail: "Map projects worth delegating" },
          { icon: "SlidersHorizontal", label: "Implement", detail: "Set up workspace & plan" },
          { icon: "ShieldCheck", label: "Secure", detail: "Connect tools, govern data" },
          { icon: "GraduationCap", label: "Train", detail: "Hands-on delegation workshops" },
          { icon: "Rocket", label: "Scale", detail: "Templates & new teams" },
        ]}
      />

      <GuidedBuildEngagement context="claude" />

      <Integrations
        tools={service.integrations}
        heading="Tools We Connect Claude Cowork To"
      />

      <SecurityGuarantee
        title="Secure Claude Cowork Adoption"
        description="Your documents, client records, and internal workflows stay protected throughout the engagement. ITECS AI is backed by ITECS — a Dallas cybersecurity MSP operating since 2002."
        points={[
          "Business-plan configuration — on Anthropic's Team and Enterprise plans, your content is not used to train models by default",
          "Scoped data access — we control which files, drives, and apps Claude can reach, so sensitive records stay out of scope",
          "Written AI usage policy — every engagement defines what data employees may and may not share with the tool",
          "Readiness first — we review and classify your data before connecting Claude to any sensitive system",
        ]}
        internalLink={{
          text: "Run a data & AI readiness audit before rollout",
          href: "/data-audit",
        }}
        externalLink={{
          text: "Anthropic Trust Center",
          href: "https://trust.anthropic.com",
        }}
      />

      <PricingROI
        heading="What Does Claude Cowork Training Cost?"
        description="Most teams buy licenses, watch adoption stall, then wonder where the ROI went. Here is how a structured ITECS engagement compares for a team of 10–50 people."
        traditionalLabel="Licenses Only"
        aiLabel="ITECS Program"
        comparison={[
          {
            label: "Time to real adoption",
            traditional: "3–6 months, if ever",
            ai: "About 2 weeks",
          },
          {
            label: "Work delegated to AI",
            traditional: "Occasional email edits",
            ai: "Research, reporting, analysis",
          },
          {
            label: "Data governance",
            traditional: "Ad hoc, uncontrolled",
            ai: "Scoped access + usage policy",
          },
          {
            label: "Employee confidence",
            traditional: "Low — trial and error",
            ai: "High — hands-on practice",
          },
          {
            label: "Ongoing support",
            traditional: "None",
            ai: "AI Retainer, 12-month expiry",
          },
        ]}
        roiStatement="Typical outcome: about 12 hours saved per team each week within 30 days — enough to cover the engagement in the first month through productivity gains alone."
        pricingNotes={[
          "Implementation + core workshop (up to 20 staff): scoped flat fee covering setup, secure tool connections, and delegation training",
          "Multi-team rollout: flat-fee program with role-specific sessions and reusable project templates",
          "Prepaid retainer hours cover refreshers, new-team onboarding, and workflow tuning with a 12-month expiry",
        ]}
      />

      <ServiceStats stats={service.stats} />

      <FAQ items={service.faq} heading="Claude Cowork Training FAQ" />

      <CTASection />

      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
    </>
  );
}
