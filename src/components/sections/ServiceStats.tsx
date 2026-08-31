"use client";

import { StatCounter } from "@/components/ui/StatCounter";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SITE_CONFIG } from "@/lib/constants";

export function ServiceStats({
  stats,
  context = "targets",
}: {
  stats: { value: number; suffix: string; label: string }[];
  context?: "targets" | "company-proof";
}) {
  if (stats.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-canvas-sunken">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-brand-accent">
            {context === "company-proof"
              ? "Company Operating Foundation"
              : "Engagement Targets"}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {context === "company-proof"
              ? "Current ITECS company facts: 24+ years of operations, 95% client retention, and 7,000+ managed endpoints."
              : "Illustrative targets to baseline and validate during discovery — not reported client results or performance guarantees."}
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
        {context === "company-proof" ? (
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
        ) : null}
      </div>
    </section>
  );
}
