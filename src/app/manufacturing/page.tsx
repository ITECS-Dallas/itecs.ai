import Link from "next/link";
import { ArrowRight, Factory } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema, generateNationalServiceSchema } from "@/lib/seo";
import { MANUFACTURING_VERTICAL } from "@/lib/constants";
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

const page = MANUFACTURING_VERTICAL;

export const metadata = generatePageMetadata({
  title: "Manufacturing AI for Finance and Operations",
  description: page.description,
  path: page.href,
  keywords: page.keywords,
});

export default function ManufacturingPage() {
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
      />

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <div className="rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-brand-accent/20 bg-brand-accent/10">
                <Factory className="h-6 w-6 text-brand-accent" />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.05em] text-brand-accent">
                  Dallas credibility, national manufacturing reach
                </p>
                <h2 className="mt-3 text-2xl font-light tracking-[-0.02em] text-text-primary md:text-3xl">
                  Practical AI for manufacturers from the ITECS team in Dallas.
                </h2>
                <p className="mt-4 text-text-secondary leading-relaxed">
                  ITECS AI is backed by ITECS, a Dallas-based MSP operating
                  since 2002. The manufacturing offer is not limited to local
                  companies; Dallas is the operating base behind the IT,
                  cybersecurity, infrastructure, and managed-service discipline
                  that production AI needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ManufacturingPressure groups={page.pressureGroups} />

      <ManufacturingMetricsChart chart={page.metricChart} />

      <ManufacturingUseCases useCases={page.useCases} />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Featured first use case"
            title="PPV Agent: Purchase Price Variance and Commodity Cost Intelligence"
            description="The first detailed manufacturing use case focuses on a CFO-owned problem with measurable economics: explaining what changed in material cost, what exposure is coming next, and which actions need approval."
          />
          <div className="mt-10 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/70 p-6 md:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-light text-text-primary">
                  Turn PPV from a close artifact into a forward risk signal.
                </h3>
                <p className="mt-4 leading-relaxed text-text-secondary">
                  The PPV agent connects procurement transactions, standards,
                  BOMs or formulas, contract terms, and reporting context so
                  finance can decompose variance, identify recoverable
                  pass-throughs, and see forward exposure before month-end.
                </p>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <Button
                  href="/manufacturing/ppv-agent"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  View PPV Agent
                </Button>
                <Link
                  href={page.primaryCtaHref}
                  className="text-sm text-text-secondary hover:text-brand-accent"
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

      <ManufacturingGovernance groups={page.governance} />

      <SecurityGuarantee
        title="Security for Manufacturing AI Workflows"
        description="Manufacturing AI can touch financial data, ERP records, supplier terms, plant signals, quality records, and customer contracts. ITECS designs these systems with scoped access, audit logs, and human approval before sensitive actions."
        points={[
          "Private data boundaries aligned to the client's identity, role, and access-control model",
          "Encrypted credentials and integration secrets managed outside prompts and browser code",
          "Human approval before purchases, hedges, journal entries, standard-cost updates, or master-data changes",
          "Audit-ready recommendation records for assumptions, source data, model context, and reviewer decisions",
        ]}
        internalLink={{
          text: "Explore the PPV Agent manufacturing use case",
          href: "/manufacturing/ppv-agent",
        }}
        externalLink={{
          text: "NIST AI Risk Management Framework",
          href: "https://www.nist.gov/itl/ai-risk-management-framework",
        }}
      />

      <FAQ items={page.faq} heading="Manufacturing AI FAQ" />

      <CTASection />

      <JsonLd data={generateFAQSchema(page.faq)} />
      <JsonLd data={generateNationalServiceSchema(page)} />
    </>
  );
}
