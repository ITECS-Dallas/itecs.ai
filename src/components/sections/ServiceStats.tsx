"use client";

import { StatCounter } from "@/components/ui/StatCounter";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function ServiceStats({
  stats,
}: {
  stats: { value: number; suffix: string; label: string }[];
}) {
  if (stats.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-canvas-sunken">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-brand-accent">
            Engagement Targets
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Illustrative targets to baseline and validate during discovery —
            not reported client results or performance guarantees.
          </p>
        </div>
        <div
          className={`grid gap-8 ${
            stats.length <= 3
              ? `grid-cols-1 md:grid-cols-${stats.length}`
              : "grid-cols-2 md:grid-cols-4"
          }`}
        >
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
