"use client";

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ComparisonRow {
  label: string;
  traditional: string;
  ai: string;
}

interface PricingROIProps {
  heading: string;
  /** Brief context paragraph */
  description: string;
  /** Side-by-side comparison rows */
  comparison: ComparisonRow[];
  /** Bottom-line ROI statement */
  roiStatement: string;
  /** Optional pricing tiers or notes */
  pricingNotes?: string[];
}

export function PricingROI({
  heading,
  description,
  comparison,
  roiStatement,
  pricingNotes,
}: PricingROIProps) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading eyebrow="Pricing" title={heading} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 text-text-secondary leading-relaxed max-w-3xl mx-auto text-center">
            {description}
          </p>
        </ScrollReveal>

        {/* Comparison table */}
        <ScrollReveal delay={0.15}>
          <div className="mt-12 overflow-hidden rounded-xl border border-[var(--border-subtle)]">
            {/* Header */}
            <div className="grid grid-cols-3 bg-bg-surface">
              <div className="p-4 text-sm font-medium text-text-dim" />
              <div className="p-4 text-center text-sm font-medium text-text-secondary border-l border-[var(--border-subtle)]">
                Traditional Receptionist
              </div>
              <div className="p-4 text-center text-sm font-medium text-brand-accent border-l border-[var(--border-subtle)]">
                AI Receptionist
              </div>
            </div>

            {/* Rows */}
            {comparison.map((row, i) => (
              <motion.div
                key={i}
                className="grid grid-cols-3 border-t border-[var(--border-subtle)]"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
              >
                <div className="p-4 text-sm text-text-primary font-medium">
                  {row.label}
                </div>
                <div className="p-4 text-center text-sm text-text-secondary border-l border-[var(--border-subtle)]">
                  {row.traditional}
                </div>
                <div className="p-4 text-center text-sm text-text-primary border-l border-[var(--border-subtle)]">
                  {row.ai}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* ROI callout */}
        <ScrollReveal delay={0.3}>
          <div className="mt-8 p-6 rounded-xl border border-brand-accent/20 bg-brand-accent/5 text-center">
            <p className="text-lg text-text-primary font-medium">
              {roiStatement}
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing notes */}
        {pricingNotes && pricingNotes.length > 0 && (
          <ScrollReveal delay={0.35}>
            <ul className="mt-6 space-y-2 max-w-2xl mx-auto">
              {pricingNotes.map((note, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <Check className="h-4 w-4 text-brand-accent mt-0.5 shrink-0" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
