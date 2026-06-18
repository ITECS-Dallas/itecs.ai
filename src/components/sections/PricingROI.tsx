"use client";

import { Check } from "lucide-react";
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
  /** Column header for the "traditional" column (default: "Traditional") */
  traditionalLabel?: string;
  /** Column header for the "AI" column (default: "AI Solution") */
  aiLabel?: string;
}

export function PricingROI({
  heading,
  description,
  comparison,
  roiStatement,
  pricingNotes,
  traditionalLabel = "Traditional",
  aiLabel = "AI Solution",
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
          <div className="mt-12 overflow-hidden rounded-[var(--r-section)] border border-[var(--card-line)] bg-card">
            {/* Header */}
            <div className="grid grid-cols-3 bg-canvas-sunken">
              <div className="p-4 text-sm font-medium text-ink-faint" />
              <div className="p-4 text-center text-sm font-medium text-ink-body border-l border-[var(--card-line)]">
                {traditionalLabel}
              </div>
              <div className="p-4 text-center font-mono text-sm font-medium uppercase tracking-wide text-itecs-blue border-l border-[var(--card-line)]">
                {aiLabel}
              </div>
            </div>

            {/* Rows */}
            {comparison.map((row, i) => (
              <motion.div
                key={i}
                className="grid grid-cols-3 border-t border-[var(--card-line)]"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
              >
                <div className="p-4 text-sm text-ink font-medium">
                  {row.label}
                </div>
                <div className="p-4 text-center text-sm text-ink-muted border-l border-[var(--card-line)]">
                  {row.traditional}
                </div>
                <div className="p-4 text-center text-sm text-ink font-medium border-l border-[var(--card-line)] bg-brand-subtle">
                  {row.ai}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* ROI callout */}
        <ScrollReveal delay={0.3}>
          <div className="chamfer-md mt-8 p-6 border-l-2 border-itecs-blue bg-brand-subtle text-center">
            <p className="text-lg text-ink font-medium">
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
