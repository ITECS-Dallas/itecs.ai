import Link from "next/link";
import { ArrowRight, Check, Cpu, Sparkles, ShieldCheck } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import {
  generateAISEOServiceSchema,
  generateAggregateOfferSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import { AI_SEO_OVERVIEW, AI_SEO_TIERS, SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SEOCircuit } from "@/components/effects/circuits/SEOCircuit";
import { AISEOMethodology } from "@/components/sections/AISEOMethodology";
import { TraditionalVsAIComparison } from "@/components/sections/TraditionalVsAIComparison";
import { SEOPhilosophyContrast } from "@/components/sections/SEOPhilosophyContrast";
import { LiveAnalyticsProof } from "@/components/sections/LiveAnalyticsProof";
import { SEOEngagementTiers } from "@/components/sections/SEOEngagementTiers";
import { AISEOGlossary } from "@/components/sections/AISEOGlossary";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

const overview = AI_SEO_OVERVIEW;

export const metadata = generatePageMetadata({
  title: overview.title,
  description: overview.description,
  path: overview.href,
  keywords: overview.keywords,
  ogImage: "/images/og/ai-optimized-seo.png",
});

export default function AIOptimizedSEOPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "AI-Optimized SEO", href: overview.href },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-accent/[0.06] via-bg-void to-transparent" />
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 px-6 md:px-8 items-center">
          <div>
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-brand-accent mb-3">
              {overview.eyebrow}
            </p>
            <h1 className="text-4xl md:text-6xl font-light tracking-[-0.02em] text-text-primary">
              {overview.h1}
            </h1>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-2xl">
              {overview.heroSubline}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/contact" size="lg">
                {overview.heroCTA}
              </Button>
              <Link
                href="#tiers"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm text-text-secondary hover:text-brand-accent transition-colors"
              >
                See pricing tiers ↓
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <SEOCircuit />
          </div>
        </div>
      </section>

      {/* What is AI SEO — definition */}
      <section className="py-20 md:py-24 bg-bg-surface">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Definition"
              title={overview.definitionTitle}
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed">
              {overview.definitionBody}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* GEO Mechanics — 3 steps */}
      <AISEOMethodology
        title={overview.mechanicsTitle}
        intro={overview.mechanicsIntro}
        steps={overview.mechanicsSteps}
      />

      {/* Traditional vs AI SEO comparison */}
      <TraditionalVsAIComparison
        title={overview.comparisonTitle}
        intro={overview.comparisonIntro}
        rows={overview.comparisonRows}
      />

      {/* Clean SEO Philosophy */}
      <SEOPhilosophyContrast
        title={overview.philosophyTitle}
        intro={overview.philosophyIntro}
        philosophy={overview.philosophy}
      />

      {/* What AI-Optimized SEO Includes — 2-layer model */}
      <section className="py-24 md:py-32 bg-bg-surface">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Scope"
              title={overview.includesTitle}
              description={overview.includesIntro}
            />
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {overview.includes.map((cat, i) => {
              const Icon = i === 0 ? Cpu : Sparkles;
              const accent =
                i === 0 ? "text-brand-accent" : "text-brand-purple";
              const bg =
                i === 0 ? "bg-brand-accent/10" : "bg-brand-purple/10";
              return (
                <ScrollReveal key={cat.category} delay={i * 0.1}>
                  <div className="h-full rounded-xl border border-[var(--border-subtle)] bg-bg-void p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className={`flex items-center justify-center shrink-0 w-10 h-10 rounded-lg ${bg}`}
                      >
                        <Icon
                          className={`h-5 w-5 ${accent}`}
                          aria-hidden="true"
                        />
                      </span>
                      <h3 className="text-lg font-medium text-text-primary">
                        {cat.category}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {cat.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed"
                        >
                          <Check
                            className={`h-4 w-4 ${accent} shrink-0 mt-0.5`}
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process — 4-step methodology */}
      <AISEOMethodology
        title={overview.methodologyTitle}
        intro={overview.methodologyIntro}
        steps={overview.methodology}
      />

      {/* Technical Foundation — spec badges */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Under the Hood"
              title={overview.technicalTitle}
              description={overview.technicalIntro}
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ul className="mt-10 flex flex-wrap gap-2.5 justify-center">
              {overview.technicalSpecs.map((spec) => (
                <li
                  key={spec}
                  className="px-3.5 py-2 rounded-md border border-[var(--border-subtle)] bg-bg-surface text-xs text-text-secondary tracking-[0.02em]"
                >
                  <span className="text-brand-accent mr-2">▸</span>
                  {spec}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Live analytics proof */}
      <LiveAnalyticsProof
        title={overview.proofTitle}
        intro={overview.proofIntro}
        stats={overview.proofStats}
        trafficSources={overview.proofTrafficSources}
        dateRange={overview.proofDateRange}
      />

      {/* Engagement tiers — Foundation / Momentum / Velocity */}
      <div id="tiers">
        <SEOEngagementTiers tiers={AI_SEO_TIERS} />
      </div>

      {/* Why ITECS shortcut block */}
      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <ScrollReveal>
            <div className="rounded-xl border border-brand-accent/30 bg-gradient-to-br from-brand-accent/5 to-brand-purple/5 p-8 md:p-10">
              <div className="flex items-start gap-4">
                <ShieldCheck
                  className="h-6 w-6 text-brand-accent shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="text-2xl font-light text-text-primary">
                    Why ITECS for AI-Optimized SEO
                  </h2>
                  <p className="mt-3 text-text-secondary leading-relaxed">
                    ITECS AI is the AI division of ITECS — a Dallas managed IT
                    and cybersecurity firm operating since 2002. We do not
                    outsource technical work. Schema, llms.txt, Core Web
                    Vitals, and AI visibility audits are run by the same
                    engineers who manage{" "}
                    <a
                      href="https://itecsonline.com/it-services/managed-it-services-in-dallas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-accent underline decoration-brand-accent/40 underline-offset-2 hover:decoration-brand-accent"
                    >
                      enterprise infrastructure
                    </a>{" "}
                    for Dallas businesses.
                  </p>
                  <Link
                    href="/about"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-brand-accent hover:text-brand-accent-bright transition-colors"
                  >
                    Learn more about ITECS
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Glossary */}
      <AISEOGlossary
        title={overview.glossaryTitle}
        intro={overview.glossaryIntro}
        terms={overview.glossary}
      />

      {/* FAQ */}
      <FAQ items={overview.faq} heading="AI-Optimized SEO FAQ" />

      {/* Final CTA */}
      <CTASection />

      {/* JSON-LD schemas */}
      <JsonLd data={generateAISEOServiceSchema(overview)} />
      <JsonLd data={generateAggregateOfferSchema(AI_SEO_TIERS)} />
      <JsonLd data={generateFAQSchema(overview.faq)} />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: `${SITE_CONFIG.url}/` },
          {
            name: "AI-Optimized SEO",
            url: `${SITE_CONFIG.url}${overview.href}`,
          },
        ])}
      />
    </>
  );
}
