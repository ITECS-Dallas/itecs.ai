"use client";

import { StatCounter } from "@/components/ui/StatCounter";
import { GridBackground } from "@/components/effects/GridBackground";
import { SITE_CONFIG } from "@/lib/constants";

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
        <p className="mt-6 text-center text-sm leading-relaxed text-text-tertiary">
          Company history and managed-endpoint source: {" "}
          <a
            href={SITE_CONFIG.companyFactsUrl}
            target="_blank"
            rel="noreferrer"
            className="text-brand-hover underline underline-offset-4 hover:text-itecs-blue"
          >
            ITECS managed-services site
          </a>
          . Retention source: {" "}
          <a
            href={SITE_CONFIG.retentionSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-brand-hover underline underline-offset-4 hover:text-itecs-blue"
          >
            December 2025 company announcement
          </a>
          .
        </p>
      </div>
    </section>
  );
}
