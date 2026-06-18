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
                className={`chamfer-md relative flex flex-col h-full border p-8 transition-colors ${
                  tier.highlighted
                    ? "border-itecs-blue bg-brand-subtle"
                    : "border-[var(--card-line)] bg-card hover:border-itecs-steel"
                }`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {tier.highlighted && (
                  <div className="chamfer-sm absolute top-4 right-4 px-3 py-1 bg-itecs-blue text-white font-mono text-xs font-semibold uppercase tracking-wide">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-ink">
                    {tier.tier}
                  </h3>
                  <p className="mt-1 text-sm text-ink-body">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="font-display text-4xl font-semibold tracking-[-0.01em] text-itecs-blue">
                    {tier.price}
                  </span>
                  <span className="ml-2 text-sm text-ink-faint">flat fee</span>
                  <p className="mt-1 text-xs text-ink-faint">{tier.users}</p>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-ink-body"
                    >
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-itecs-blue-bright" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className={`inline-flex items-center justify-center rounded-[10px] px-6 py-3 text-sm font-semibold transition-colors ${
                    tier.highlighted
                      ? "bg-itecs-blue text-white hover:bg-[var(--brand-active)]"
                      : "border border-[var(--border-strong)] text-ink hover:border-itecs-blue hover:text-itecs-blue"
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
