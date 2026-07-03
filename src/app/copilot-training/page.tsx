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

const service = TRAINING_SERVICES.find((s) => s.slug === "copilot-training")!;
const heroImage = "/images/services/copilot-training.png";

export const metadata = generatePageMetadata({
  title: "Microsoft Copilot Training & Implementation in Dallas | ITECS",
  description:
    "ITECS rolls out Microsoft 365 Copilot across Word, Excel, Outlook, and Teams for Dallas businesses — permission cleanup, governance, and role-specific training.",
  path: service.href,
  keywords: service.keywords,
  ogImage: heroImage,
});

export default function CopilotTrainingPage() {
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
        eyebrow="What Is Microsoft 365 Copilot"
        heading="AI Inside the Office Apps Your Team Already Uses"
        paragraphs={[
          "Microsoft 365 Copilot builds AI directly into Word, Excel, PowerPoint, Outlook, and Teams. It drafts documents, analyzes spreadsheets, summarizes meetings, and clears your inbox — using your organization's own files, chats, and email as context.",
          "Because Copilot works with your real business data, rollout is as much a governance project as a training one. ITECS handles both, so your licenses turn into daily productivity instead of shelfware.",
        ]}
        bullets={[
          "Draft and rewrite documents and email in seconds",
          "Turn raw spreadsheets into analysis and summaries",
          "Catch up on any Teams meeting or thread instantly",
          "Grounded in your data — with permissions and governance enforced",
        ]}
        image={{
          src: heroImage,
          alt: "Abstract visualization of Microsoft 365 Copilot assisting across Word, Excel, Outlook, and Teams in a violet and blue productivity aesthetic",
          caption:
            "Copilot brings AI into the Microsoft 365 apps your team already lives in — once permissions and governance are set correctly.",
        }}
      />

      <PainPoint
        stat="60%"
        statLabel="of Copilot licenses go underused within 90 days when there's no rollout plan"
        heading="You're Paying for Copilot. Is Anyone Actually Using It?"
        paragraphs={[
          "Microsoft 365 Copilot is a premium per-user add-on, and buying seats is the easy part. Without a rollout plan, most employees try it once, get an underwhelming result, and go back to their old habits. The license keeps billing; the productivity never shows up.",
          "There is also a hidden risk. Copilot can surface anything a user already has permission to open — so years of oversharing inside your tenant becomes visible the moment it goes live. Governance and training are what turn Copilot from a liability into a return.",
        ]}
        scenario={{
          business: "A 120-employee professional services firm in Dallas",
          problem:
            "rolled out 90 Copilot licenses with no plan. Adoption cratered within a month, and an internal check found Copilot could surface HR and finance files that had been quietly overshared across the tenant for years. Leadership questioned the entire investment.",
          result:
            "ITECS ran a Copilot readiness assessment, fixed the oversharing with Microsoft Purview sensitivity labels, and delivered role-specific training to every department. Adoption climbed sharply, the data-exposure risk was closed, and the firm now measures real time savings on documents and email.",
        }}
      />

      <ServiceFeatures
        features={service.features}
        title="Microsoft Copilot Training & Implementation"
      />

      <HowItWorks steps={service.howItWorks} heading={service.howItWorksHeading} />

      <ToolTrainingDiagram
        eyebrow="Rollout Path"
        heading="From Readiness Check to Company-Wide Adoption"
        ariaLabel="Five-stage Microsoft Copilot rollout: run a readiness assessment on permissions, configure governance and licensing, train every department hands-on, drive adoption, then measure ROI."
        caption="ITECS rolls out Copilot in the right order — readiness, governance, training, adoption, and measurement — so data risk is closed before employees ever start prompting."
        stages={[
          { icon: "ClipboardCheck", label: "Readiness", detail: "Audit permissions & oversharing" },
          { icon: "ShieldCheck", label: "Govern", detail: "Purview labels & licensing" },
          { icon: "GraduationCap", label: "Train", detail: "Role-specific department sessions" },
          { icon: "Users", label: "Adopt", detail: "Prompt libraries & habits" },
          { icon: "LineChart", label: "Measure", detail: "Track usage & ROI" },
        ]}
      />

      <Integrations
        tools={service.integrations}
        heading="What We Configure & Train Across"
      />

      <SecurityGuarantee
        title="Governed, Compliant Copilot Rollout"
        description="Your Microsoft 365 tenant, files, and communications stay protected throughout the engagement. ITECS AI is backed by ITECS — a Dallas cybersecurity MSP operating since 2002."
        points={[
          "Permission cleanup — we fix tenant oversharing before Copilot can surface data users should not see",
          "Microsoft Purview controls — sensitivity labels and data-loss policies keep confidential content protected",
          "Respects existing access — Copilot honors your Microsoft 365 permissions and does not train foundation models on your data",
          "Compliance-aligned — rollout accounts for HIPAA, SOC 2, and industry requirements with documented governance",
        ]}
        internalLink={{
          text: "Run a data & AI readiness audit before rollout",
          href: "/data-audit",
        }}
        externalLink={{
          text: "Microsoft 365 Copilot Data Privacy",
          href: "https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy",
        }}
      />

      <PricingROI
        heading="What Does Microsoft Copilot Training Cost?"
        description="Buying licenses without a rollout is the most expensive way to adopt Copilot. Here is how a structured ITECS engagement compares for a business of 25–150 employees."
        traditionalLabel="Licenses Only"
        aiLabel="ITECS Rollout"
        comparison={[
          {
            label: "License utilization",
            traditional: "Drops within 90 days",
            ai: "High and sustained",
          },
          {
            label: "Data-exposure risk",
            traditional: "Oversharing goes live",
            ai: "Fixed before rollout",
          },
          {
            label: "Employee proficiency",
            traditional: "Tried once, abandoned",
            ai: "Role-specific and confident",
          },
          {
            label: "Governance",
            traditional: "Default settings",
            ai: "Purview labels + policies",
          },
          {
            label: "Ongoing support",
            traditional: "None",
            ai: "Retainer hours, no expiration",
          },
        ]}
        roiStatement="Typical outcome: 30% faster document and email work and far higher license utilization within the first month — turning a recurring cost into a measurable return."
        pricingNotes={[
          "Readiness assessment + governance setup: scoped flat fee covering permission cleanup and Microsoft Purview configuration",
          "Department training: role-specific workshops with prompt libraries for Word, Excel, Outlook, and Teams",
          "Prepaid retainer hours cover refreshers, new-hire onboarding, and new-workflow enablement with no monthly minimum",
        ]}
      />

      <ServiceStats stats={service.stats} />

      <FAQ items={service.faq} heading="Microsoft Copilot Training FAQ" />

      <CTASection />

      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
    </>
  );
}
