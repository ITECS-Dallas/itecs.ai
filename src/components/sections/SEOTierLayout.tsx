"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Layers,
  ShieldCheck,
  X,
} from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { SEOCircuit } from "@/components/effects/circuits/SEOCircuit";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { AI_SEO_VELOCITY_VS_MOMENTUM } from "@/lib/constants";
import type { AISEOTier } from "@/lib/constants";

interface Props {
  tier: AISEOTier;
}

export function SEOTierLayout({ tier }: Props) {
  const isFoundation = tier.slug === "foundation";
  const isVelocity = tier.slug === "velocity";
  const isMomentum = tier.slug === "momentum";

  return (
    <>
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "AI-Optimized SEO", href: "/ai-optimized-seo" },
            { label: tier.shortName, href: tier.href },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-accent/[0.04] via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 px-6 md:px-8 items-center">
          <div>
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-brand-accent mb-3">
              {tier.eyebrow}
            </p>
            <h1 className="text-4xl md:text-6xl font-light tracking-[-0.02em] text-text-primary">
              {tier.h1}
            </h1>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-2xl">
              {tier.heroSubline}
            </p>

            {/* Pricing pill */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-bg-surface/80 px-4 py-2">
              <span className="text-xl font-light text-text-primary">
                {tier.priceLabel}
              </span>
              {tier.minimumTerm && (
                <span className="text-xs text-text-dim tracking-[0.04em] uppercase border-l border-[var(--border-subtle)] pl-3">
                  {tier.minimumTerm}
                </span>
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/contact" size="lg">
                {tier.heroCTA}
              </Button>
              <Link
                href="/ai-optimized-seo"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm text-text-secondary hover:text-brand-accent transition-colors"
              >
                ← All AI-SEO tiers
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <SEOCircuit />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-20 bg-bg-surface">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <ScrollReveal>
            <p className="text-lg text-text-secondary leading-relaxed text-center">
              {tier.overview}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Prerequisites (Momentum + Velocity) */}
      {tier.prerequisites && tier.prerequisites.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Prerequisites"
                title={tier.prerequisitesHeading ?? "Before we start"}
              />
            </ScrollReveal>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              {tier.prerequisites.map((p, i) => (
                <ScrollReveal key={p.title} delay={i * 0.08}>
                  <div className="h-full rounded-xl border border-[var(--border-subtle)] bg-bg-surface p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center shrink-0 w-8 h-8 rounded-lg bg-brand-accent/10">
                        <ShieldCheck
                          className="h-4 w-4 text-brand-accent"
                          aria-hidden="true"
                        />
                      </span>
                      <h3 className="text-sm font-medium text-text-primary">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Foundation: internal pricing tiers */}
      {isFoundation && tier.internalTiers && (
        <section className="py-24 md:py-28 bg-bg-surface">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Project Pricing"
                title="Three project sizes — pick what fits your site"
                description="Foundation is a one-time project. Pricing scales with page count and complexity."
              />
            </ScrollReveal>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              {tier.internalTiers.map((t, i) => {
                const featured = i === 1;
                return (
                  <ScrollReveal key={t.name} delay={i * 0.08}>
                    <div
                      className={`relative h-full rounded-xl border p-6 bg-bg-void ${
                        featured
                          ? "border-brand-accent/50 shadow-[0_0_30px_rgba(6,182,212,0.12)]"
                          : "border-[var(--border-subtle)]"
                      }`}
                    >
                      {featured && (
                        <span className="absolute -top-3 left-6 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-[0.1em] uppercase border border-brand-accent/40 bg-bg-elevated text-brand-accent">
                          Most Popular
                        </span>
                      )}
                      <h3 className="text-xl font-medium text-text-primary">
                        {t.name}
                      </h3>
                      <p className="mt-3 text-3xl font-thin text-brand-accent">
                        {t.price}
                      </p>
                      <p className="mt-1 text-xs text-text-dim tracking-[0.04em] uppercase">
                        {t.pages}
                      </p>
                      <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                        {t.target}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {tier.internalTiersNote && (
              <ScrollReveal delay={0.3}>
                <p className="mt-8 text-center text-xs text-text-dim italic max-w-3xl mx-auto">
                  {tier.internalTiersNote}
                </p>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* Monthly Services (Momentum + Velocity) */}
      {tier.monthlyServices && tier.monthlyServices.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <ScrollReveal>
              <SectionHeading
                eyebrow="What's Included"
                title={`Inside your monthly ${tier.shortName} retainer`}
                description="Categorized list of every workstream included each month."
              />
            </ScrollReveal>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
              {tier.monthlyServices.map((cat, i) => (
                <ScrollReveal key={cat.category} delay={(i % 4) * 0.06}>
                  <div className="h-full rounded-xl border border-[var(--border-subtle)] bg-bg-surface p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex items-center justify-center shrink-0 w-9 h-9 rounded-lg bg-brand-accent/10">
                        <Layers
                          className="h-4 w-4 text-brand-accent"
                          aria-hidden="true"
                        />
                      </span>
                      <h3 className="text-base font-medium text-text-primary">
                        {cat.category}
                      </h3>
                    </div>
                    <ul className="space-y-2.5">
                      {cat.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed"
                        >
                          <Check
                            className="h-4 w-4 text-brand-accent shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Foundation: Deliverables */}
      {isFoundation && tier.deliverables && (
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Deliverables"
                title="What you get from the Foundation engagement"
                description="Four core areas of work, every project."
              />
            </ScrollReveal>

            <div className="mt-12 space-y-6">
              {tier.deliverables.map((area, i) => (
                <ScrollReveal key={area.area} delay={i * 0.06}>
                  <div className="rounded-xl border border-[var(--border-subtle)] bg-bg-surface p-6 md:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6">
                      <div>
                        <p className="text-xs font-medium tracking-[0.08em] uppercase text-brand-accent mb-2">
                          Area {i + 1}
                        </p>
                        <h3 className="text-xl font-medium text-text-primary">
                          {area.area}
                        </h3>
                        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                      <ul className="space-y-2.5">
                        {area.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed"
                          >
                            <CheckCircle2
                              className="h-4 w-4 text-brand-accent shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Foundation: Content add-ons */}
      {isFoundation && tier.addOns && (
        <section className="py-20 md:py-24 bg-bg-surface">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Add-Ons"
                title="Optional content writing"
                description="If you want ITECS to write new pages or blog articles during the Foundation project."
              />
            </ScrollReveal>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {tier.addOns.map((a, i) => (
                <ScrollReveal key={a.name} delay={i * 0.08}>
                  <div className="rounded-xl border border-[var(--border-subtle)] bg-bg-void p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText
                        className="h-4 w-4 text-brand-accent"
                        aria-hidden="true"
                      />
                      <h3 className="text-base font-medium text-text-primary">
                        {a.name}
                      </h3>
                    </div>
                    <p className="text-2xl font-light text-text-primary">
                      {a.price}
                    </p>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      {a.description}
                    </p>
                    {a.volumeDiscount && (
                      <p className="mt-3 text-xs text-brand-accent">
                        Bundle: {a.volumeDiscount}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline & Terms */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Terms"
              title={isFoundation ? "Timeline & terms" : "Investment & terms"}
            />
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TermCard
              icon={<Clock className="h-4 w-4 text-brand-accent" />}
              label="Pricing"
              value={tier.priceLabel}
            />
            {tier.minimumTerm && (
              <TermCard
                icon={<ShieldCheck className="h-4 w-4 text-brand-accent" />}
                label="Term"
                value={tier.minimumTerm}
              />
            )}
            {tier.projectTimeline && (
              <TermCard
                icon={<Clock className="h-4 w-4 text-brand-accent" />}
                label={isFoundation ? "Project timeline" : "Timeline to results"}
                value={tier.projectTimeline}
              />
            )}
            {tier.cancellationPolicy && (
              <TermCard
                icon={<FileText className="h-4 w-4 text-brand-accent" />}
                label="Cancellation"
                value={tier.cancellationPolicy}
              />
            )}
            {tier.billingTerms && (
              <TermCard
                icon={<FileText className="h-4 w-4 text-brand-accent" />}
                label="Billing"
                value={tier.billingTerms}
              />
            )}
            {tier.paymentTerms && (
              <TermCard
                icon={<FileText className="h-4 w-4 text-brand-accent" />}
                label="Payment"
                value={tier.paymentTerms}
              />
            )}
            {tier.postDeliverySupport && (
              <TermCard
                icon={<ShieldCheck className="h-4 w-4 text-brand-accent" />}
                label="Post-delivery support"
                value={tier.postDeliverySupport}
              />
            )}
            {tier.proposalValidity && (
              <TermCard
                icon={<Clock className="h-4 w-4 text-brand-accent" />}
                label="Proposal validity"
                value={tier.proposalValidity}
              />
            )}
            {tier.refundPolicy && (
              <TermCard
                icon={<FileText className="h-4 w-4 text-brand-accent" />}
                label="Refunds"
                value={tier.refundPolicy}
              />
            )}
          </div>
        </div>
      </section>

      {/* Not Included (Momentum + Velocity) */}
      {tier.notIncluded && tier.notIncluded.length > 0 && (
        <section className="py-20 md:py-24 bg-bg-surface">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Honest Scope"
                title="What's not included in this tier"
                description="So you know exactly what to expect — and what would require an upgrade."
              />
            </ScrollReveal>
            <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
              {tier.notIncluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-[var(--border-subtle)] bg-bg-void/60 p-4"
                >
                  <span className="flex items-center justify-center shrink-0 w-5 h-5 rounded bg-text-dim/10 mt-0.5">
                    <X className="h-3 w-3 text-text-dim" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-text-secondary leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Velocity vs Momentum comparison (Velocity page only) */}
      {isVelocity && (
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Velocity vs Momentum"
                title="Where Velocity pulls ahead"
                description="Side-by-side of every dimension. Decide which tier matches your growth ambition."
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-10 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-bg-surface">
                <div className="grid grid-cols-3 border-b border-[var(--border-subtle)] bg-bg-elevated/60">
                  <div className="px-4 py-3 text-xs font-medium tracking-[0.08em] uppercase text-text-dim">
                    Feature
                  </div>
                  <div className="px-4 py-3 text-xs font-medium tracking-[0.08em] uppercase text-text-dim border-l border-[var(--border-subtle)]">
                    Momentum
                  </div>
                  <div className="px-4 py-3 text-xs font-medium tracking-[0.08em] uppercase text-brand-accent border-l border-[var(--border-subtle)]">
                    Velocity
                  </div>
                </div>
                {AI_SEO_VELOCITY_VS_MOMENTUM.map((row, i) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-3 ${
                      i !== AI_SEO_VELOCITY_VS_MOMENTUM.length - 1
                        ? "border-b border-[var(--border-subtle)]"
                        : ""
                    }`}
                  >
                    <div className="px-4 py-3 text-sm font-medium text-text-primary">
                      {row.feature}
                    </div>
                    <div className="px-4 py-3 text-sm text-text-secondary border-l border-[var(--border-subtle)]">
                      {row.momentum}
                    </div>
                    <div className="px-4 py-3 text-sm text-text-primary border-l border-[var(--border-subtle)] bg-brand-accent/5">
                      {row.velocity}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Ideal Client Profile (Velocity only) */}
      {tier.idealClient && tier.idealClient.length > 0 && (
        <section className="py-20 md:py-24 bg-bg-surface">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Ideal Client"
                title={`Who ${tier.shortName} is built for`}
              />
            </ScrollReveal>
            <ul className="mt-10 space-y-3">
              {tier.idealClient.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-[var(--border-subtle)] bg-bg-void/60 p-4"
                >
                  <CheckCircle2
                    className="h-5 w-5 text-brand-accent shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-text-secondary leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Why ITECS */}
      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <ScrollReveal>
            <SectionHeading eyebrow="Why ITECS" title="Why teams pick this tier" />
          </ScrollReveal>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {tier.whyItecs.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg border border-[var(--border-subtle)] bg-bg-surface p-5"
              >
                <ShieldCheck
                  className="h-5 w-5 text-brand-accent shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-sm text-text-secondary leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Upgrade Path (Momentum only) */}
      {isMomentum && tier.upgradePath && (
        <section className="py-20 md:py-24 bg-bg-surface">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <ScrollReveal>
              <div className="rounded-xl border border-brand-purple/30 bg-gradient-to-br from-brand-purple/10 to-brand-accent/5 p-8 md:p-10 text-center">
                <h2 className="text-2xl md:text-3xl font-light text-text-primary">
                  {tier.upgradePath.headline}
                </h2>
                <p className="mt-4 text-text-secondary leading-relaxed max-w-2xl mx-auto">
                  {tier.upgradePath.description}
                </p>
                <Link
                  href={`/ai-optimized-seo/${tier.upgradePath.targetSlug}`}
                  className="mt-6 inline-flex items-center gap-2 text-brand-purple hover:text-brand-purple-bright transition-colors"
                >
                  {tier.upgradePath.ctaText}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQ items={tier.faq} heading={`${tier.shortName} — FAQ`} />

      {/* CTA */}
      <CTASection />
    </>
  );
}

function TermCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[var(--border-subtle)] bg-bg-surface p-4">
      <span className="flex items-center justify-center shrink-0 w-8 h-8 rounded-md bg-brand-accent/10 mt-0.5">
        {icon}
      </span>
      <div>
        <p className="text-xs font-medium tracking-[0.08em] uppercase text-text-dim">
          {label}
        </p>
        <p className="mt-1 text-sm text-text-primary leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
