"use client";

import { StatCounter } from "@/components/ui/StatCounter";
import { GridBackground } from "@/components/effects/GridBackground";

interface StatItem {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
}

export function AboutStats({ stats }: { stats: readonly StatItem[] }) {
  return (
    <section className="relative bg-bg-surface py-20 md:py-24">
      <GridBackground opacity={0.03} />
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-lg border border-[var(--border-default)] bg-bg-elevated p-6 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]"
            >
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
