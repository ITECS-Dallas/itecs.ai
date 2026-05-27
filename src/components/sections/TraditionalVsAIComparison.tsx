"use client";

import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AISEOComparisonRow } from "@/lib/constants";

interface Props {
  title: string;
  intro: string;
  rows: AISEOComparisonRow[];
  leftLabel?: string;
  rightLabel?: string;
}

export function TraditionalVsAIComparison({
  title,
  intro,
  rows,
  leftLabel = "Traditional SEO",
  rightLabel = "AI-Optimized SEO (GEO)",
}: Props) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading eyebrow="The Shift" title={title} description={intro} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-bg-surface">
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.4fr_1.4fr] border-b border-[var(--border-subtle)] bg-bg-elevated/60">
              <div className="px-5 py-4 text-xs font-medium tracking-[0.08em] uppercase text-text-dim">
                Aspect
              </div>
              <div className="px-5 py-4 text-xs font-medium tracking-[0.08em] uppercase text-text-dim border-t md:border-t-0 md:border-l border-[var(--border-subtle)]">
                {leftLabel}
              </div>
              <div className="px-5 py-4 text-xs font-medium tracking-[0.08em] uppercase text-brand-accent border-t md:border-t-0 md:border-l border-[var(--border-subtle)]">
                {rightLabel}
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-1 md:grid-cols-[1.2fr_1.4fr_1.4fr] ${
                  i !== rows.length - 1
                    ? "border-b border-[var(--border-subtle)]"
                    : ""
                }`}
              >
                <div className="px-5 py-5 font-medium text-text-primary text-sm">
                  {row.aspect}
                </div>
                <div className="px-5 py-5 text-sm text-text-secondary leading-relaxed border-t md:border-t-0 md:border-l border-[var(--border-subtle)]">
                  {row.traditional}
                </div>
                <div className="px-5 py-5 text-sm text-text-primary leading-relaxed border-t md:border-t-0 md:border-l border-[var(--border-subtle)] bg-brand-accent/5">
                  {row.aiOptimized}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
