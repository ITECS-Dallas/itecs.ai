"use client";

import { StatCounter } from "@/components/ui/StatCounter";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GridBackground } from "@/components/effects/GridBackground";

interface StatItem {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
}

export function AboutStats({ stats }: { stats: readonly StatItem[] }) {
  return (
    <section className="relative py-20 md:py-24 bg-bg-surface">
      <GridBackground opacity={0.03} />
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div
                className={
                  i < stats.length - 1
                    ? "md:border-r md:border-[var(--border-subtle)]"
                    : ""
                }
              >
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
