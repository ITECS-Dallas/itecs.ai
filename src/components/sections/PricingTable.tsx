"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DATA_AUDIT_PRICING } from "@/lib/constants";

export function PricingTable() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Transparent Pricing"
            title="Flat-Fee Audit Packages"
            description="No hourly billing, no surprise invoices. Pick the tier that fits your team size and get your full report in 7 days."
          />
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {DATA_AUDIT_PRICING.map((tier, i) => (
            <ScrollReveal key={tier.tier} delay={i * 0.1}>
              <motion.div
                className={`relative flex flex-col h-full rounded-2xl border p-8 transition-colors ${
                  tier.highlighted
                    ? "border-brand-accent bg-brand-accent/5"
                    : "border-[var(--border-subtle)] bg-bg-surface/50 hover:border-[var(--border-active)]"
                }`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-accent text-bg-void text-xs font-medium tracking-wide">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-text-primary">
                    {tier.tier}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-extralight tracking-tight text-text-primary">
                    {tier.price}
                  </span>
                  <span className="ml-2 text-sm text-text-dim">flat fee</span>
                  <p className="mt-1 text-xs text-text-dim">{tier.users}</p>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-brand-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                    tier.highlighted
                      ? "bg-brand-accent text-bg-void hover:bg-brand-accent-bright"
                      : "border border-[var(--border-subtle)] text-text-primary hover:border-brand-accent hover:text-brand-accent"
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
