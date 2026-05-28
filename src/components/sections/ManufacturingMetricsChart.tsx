"use client";

import { CheckCircle2, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ManufacturingMetricChart } from "@/lib/constants";

const kpiToneClasses = {
  risk: "border-rose-400/25 bg-rose-400/10 text-rose-200",
  recoverable: "border-brand-accent/25 bg-brand-accent/10 text-brand-accent",
  watch: "border-amber-300/25 bg-amber-300/10 text-amber-200",
  stable: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
} as const;

const barToneClasses = {
  risk: "bg-gradient-to-r from-rose-400 to-amber-300",
  recoverable: "bg-gradient-to-r from-brand-accent to-emerald-300",
  watch: "bg-gradient-to-r from-amber-300 to-brand-accent",
} as const;

export function ManufacturingMetricsChart({
  chart,
}: {
  chart: ManufacturingMetricChart;
}) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow={chart.eyebrow}
            title={chart.title}
            description={chart.description}
          />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <ScrollReveal className="lg:col-span-3">
            <div className="h-full rounded-xl border border-[var(--border-subtle)] bg-bg-surface/70 p-5 md:p-6">
              <div className="mb-6 flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.05em] text-text-dim">
                    Exposure bridge
                  </p>
                  <h3 className="mt-1 text-xl font-light text-text-primary">
                    PPV and margin drivers
                  </h3>
                </div>
                <div className="hidden items-center gap-2 text-xs text-text-dim sm:flex">
                  <TrendingUp className="h-4 w-4 text-rose-300" />
                  Risk
                  <TrendingDown className="ml-3 h-4 w-4 text-brand-accent" />
                  Recoverable
                </div>
              </div>

              <div className="space-y-5">
                {chart.drivers.map((driver, index) => (
                  <div key={driver.label}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-sm text-text-secondary">
                        {driver.label}
                      </span>
                      <span className="font-mono text-sm text-text-primary">
                        {driver.value}
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-bg-void">
                      <motion.div
                        className={`h-full rounded-full ${barToneClasses[driver.tone]}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${driver.width}%` }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{
                          delay: index * 0.08,
                          duration: 0.7,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-6 lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {chart.kpis.map((kpi, index) => (
                <ScrollReveal key={kpi.label} delay={index * 0.06}>
                  <div
                    className={`rounded-xl border p-5 ${kpiToneClasses[kpi.tone]}`}
                  >
                    <p className="text-sm text-text-secondary">{kpi.label}</p>
                    <p className="mt-2 font-mono text-3xl font-thin">
                      {kpi.value}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-text-dim">
                      {kpi.detail}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.25}>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-bg-surface/50 p-5">
                <h3 className="text-lg font-light text-text-primary">
                  What leadership sees
                </h3>
                <ul className="mt-4 space-y-3">
                  {chart.notes.map((note) => (
                    <li
                      key={note}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
