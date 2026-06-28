import Link from "next/link";
import { ArrowRight, Landmark } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema, generateNationalServiceSchema } from "@/lib/seo";
import { FINANCIAL_SERVICES_VERTICAL } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ManufacturingHero } from "@/components/sections/ManufacturingHero";
import {
  ManufacturingAssessment,
  ManufacturingGovernance,
  ManufacturingPressure,
} from "@/components/sections/ManufacturingProof";
import { ManufacturingUseCases } from "@/components/sections/ManufacturingUseCases";
import { ManufacturingMetricsChart } from "@/components/sections/ManufacturingMetricsChart";
import { SecurityGuarantee } from "@/components/sections/SecurityGuarantee";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const page = FINANCIAL_SERVICES_VERTICAL;

export const metadata = generatePageMetadata({
  title: "Financial Services AI for Lenders and Advisory Firms",
  description: page.description,
  path: page.href,
  keywords: page.keywords,
});

export default function FinancialServicesPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: page.shortTitle, href: page.href },
          ]}
        />
      </div>

      <ManufacturingHero
        eyebrow={page.eyebrow}
        h1={page.h1}
        heroSummary={page.heroSummary}
        longDescription={page.longDescription}
        primaryCta={page.primaryCta}
        primaryCtaHref={page.primaryCtaHref}
        secondaryCta={page.secondaryCta}
        secondaryCtaHref={page.secondaryCtaHref}
        stats={page.stats}
        iconName="Landmark"
        signalLabel="Financial services signal map"
        signalSublabel="Credit + advisory + IT"
      />

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div className="rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-brand-accent/20 bg-brand-accent/10">
                <Landmark className="h-6 w-6 text-brand-accent" />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.05em] text-brand-accent">
                  Dallas credibility, national financial-services reach
                </p>
                <h2 className="mt-3 text-2xl font-light tracking-[-0.02em] text-text-primary md:text-3xl">
                  Confidential AI for lenders and advisory firms from the ITECS
                  team in Dallas.
                </h2>
                <p className="mt-4 text-text-secondary leading-relaxed">
                  ITECS AI is backed by ITECS, a Dallas-based MSP operating
                  since 2002. The financial-services offer is not limited to
                  local firms; Dallas is the operating base behind the
                  managed-security, infrastructure, and governance discipline
                  that confidential financial AI needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ManufacturingPressure
        groups={page.pressureGroups}
        eyebrow="Operating pressure"
        title="Financial Services AI Starts With Capacity, Turnaround, and Risk"
        description="The first step is not picking a model. It is identifying the credit, advisory, and finance decisions where senior judgment is buried under data assembly or where risk is surfaced too late."
      />

      <ManufacturingMetricsChart
        chart={page.metricChart}
        bridgeEyebrow="Exposure bridge"
        bridgeTitle="Collateral and risk drivers"
      />

      <ManufacturingUseCases
        useCases={page.useCases}
        eyebrow="Financial services use cases"
        title="Where AI Creates Measurable Value"
        description="Start with the engagements where better signals change a credit, advisory, or finance decision—and where the data already arrives."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Featured first use case"
            title="Field Examination Analyzer: Collateral Roll-Forward Intelligence"
            description="The first detailed use case focuses on a high-volume, standardized deliverable: the working-capital field exam that repeats across every engagement and feeds the comprehensive cash flow model."
          />
          <div className="mt-10 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/70 p-6 md:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-light text-text-primary">
                  Turn the field exam into a first-draft report in hours.
                </h3>
                <p className="mt-4 leading-relaxed text-text-secondary">
                  The analyzer connects borrower agings, inventory, GL, bank
                  statements, and prior workpapers so examiners move straight to
                  findings—roll-forward, dilution, ineligibles, and net
                  availability—with every figure traceable to its source.
                </p>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <Button
                  href="/financial-services/field-examination-analyzer"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  View Field Exam Analyzer
                </Button>
                <Link
                  href={page.primaryCtaHref}
                  className="inline-flex min-h-11 items-center text-sm text-text-secondary transition-colors hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                >
                  Start with the readiness assessment &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ManufacturingAssessment
        eyebrow={page.assessment.eyebrow}
        title={page.assessment.title}
        description={page.assessment.description}
        steps={page.assessment.steps}
        primaryCta={page.primaryCta}
        primaryCtaHref={page.primaryCtaHref}
      />

      <ManufacturingGovernance
        groups={page.governance}
        eyebrow="Governance"
        title="Built for Confidential Financial Work"
        description="ITECS designs financial-services AI around the firm's existing IT, security, approval, and confidentiality boundaries, on a managed-security foundation."
      />

      <SecurityGuarantee
        title="Security for Financial Services AI Workflows"
        description="Financial-services AI can touch borrower financials, lender collateral data, distressed-company information, and bankruptcy-sensitive records. ITECS designs these systems with scoped access, audit logs, and human approval before sensitive actions."
        points={[
          "Business and enterprise tiers that contractually isolate firm data and never train on it",
          "Encrypted credentials and integration secrets managed outside prompts and browser code",
          "Human approval before client communications, finalized valuations, or collateral-record changes",
          "Audit-ready recommendation records for assumptions, source data, and reviewer decisions",
        ]}
        internalLink={{
          text: "Explore the Field Examination Analyzer use case",
          href: "/financial-services/field-examination-analyzer",
        }}
        externalLink={{
          text: "NIST AI Risk Management Framework",
          href: "https://www.nist.gov/itl/ai-risk-management-framework",
        }}
      />

      <FAQ items={page.faq} heading="Financial Services AI FAQ" />

      <CTASection />

      <JsonLd data={generateFAQSchema(page.faq)} />
      <JsonLd data={generateNationalServiceSchema(page)} />
    </>
  );
}
