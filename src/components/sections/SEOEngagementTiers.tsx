"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AISEOTier } from "@/lib/constants";

interface Props {
  title?: string;
  intro?: string;
  tiers: AISEOTier[];
}

const accentClasses: Record<
  AISEOTier["cardAccent"],
  { border: string; accent: string; glow: string; ring: string; badge: string }
> = {
  cyan: {
    border: "border-[var(--border-subtle)] hover:border-brand-accent/60",
    accent: "text-brand-accent",
    glow: "hover:shadow-[0_0_40px_var(--accent-cyan-subtle)]",
    ring: "bg-brand-accent/10",
    badge: "border-brand-accent/30 text-brand-accent bg-brand-accent/10",
  },
  brand: {
    border: "border-[var(--border-subtle)] hover:border-brand/60",
    accent: "text-brand",
    glow: "hover:shadow-[0_0_40px_var(--brand-subtle)]",
    ring: "bg-brand/10",
    badge: "border-brand/30 text-brand bg-brand/10",
  },
  gradient: {
    border: "border-brand/30 hover:border-brand/70",
    accent: "text-text-primary",
    glow: "hover:shadow-[0_0_50px_var(--brand-subtle)]",
    ring: "bg-gradient-to-br from-brand/15 to-cyan/15",
    badge:
      "border-brand/30 text-text-primary bg-gradient-to-r from-brand/15 to-cyan/20",
  },
};

export function SEOEngagementTiers({
  title = "Engagement Options",
  intro = "Three ways to engage — pick the tier that matches your growth ambition.",
  tiers,
}: Props) {
  return (
    <section className="py-24 md:py-32 bg-bg-surface">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading eyebrow="Pricing" title={title} description={intro} />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier, i) => {
            const c = accentClasses[tier.cardAccent];
            const isFlagship = tier.cardAccent === "gradient";
            return (
              <ScrollReveal key={tier.slug} delay={i * 0.08}>
                <div
                  className={`relative h-full rounded-xl border bg-bg-void p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col ${c.border} ${c.glow}`}
                >
                  {isFlagship && (
                    <span className="absolute -top-3 left-6 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-[0.1em] uppercase border bg-bg-elevated border-brand/40 text-brand">
                      Most Aggressive
                    </span>
                  )}

                  <span
                    className={`inline-flex w-fit px-2.5 py-1 rounded-full text-[10px] font-medium tracking-[0.1em] uppercase border ${c.badge}`}
                  >
                    {tier.shortName}
                  </span>

                  <h3 className="mt-4 text-2xl font-light tracking-[-0.01em] text-text-primary">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {tier.cardTagline}
                  </p>

                  <div className="mt-6 pb-6 border-b border-[var(--border-subtle)]">
                    <p className={`text-2xl font-light ${c.accent}`}>
                      {tier.cardPriceLabel}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3 flex-1">
                    {tier.cardHighlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm">
                        <span
                          className={`flex items-center justify-center shrink-0 w-4 h-4 rounded mt-0.5 ${c.ring}`}
                        >
                          <Check
                            className={`h-3 w-3 ${c.accent}`}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="text-text-secondary leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tier.href}
                    className={`mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-all hover:gap-2.5 ${c.accent}`}
                  >
                    Explore {tier.shortName}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
