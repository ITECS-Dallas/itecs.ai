"use client";

import { CheckCircle2, Gauge, Layers3, TimerReset } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ManufacturingSpokeChart } from "@/lib/constants";

const toneClasses = {
  risk: {
    card: "border-rose-400/25 bg-rose-400/10 text-rose-200",
    bar: "bg-gradient-to-r from-rose-400 to-amber-300",
    text: "text-rose-200",
  },
  watch: {
    card: "border-amber-300/25 bg-amber-300/10 text-amber-200",
    bar: "bg-gradient-to-r from-amber-300 to-brand-accent",
    text: "text-amber-200",
  },
  recoverable: {
    card: "border-brand-accent/25 bg-brand-accent/10 text-brand-accent",
    bar: "bg-gradient-to-r from-brand-accent to-emerald-300",
    text: "text-brand-accent",
  },
  stable: {
    card: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
    bar: "bg-gradient-to-r from-emerald-300 to-brand-accent",
    text: "text-emerald-200",
  },
} as const;

function clampScore(score: number) {
  return Math.min(100, Math.max(8, score));
}

function TimelineChart({ chart }: { chart: ManufacturingSpokeChart }) {
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-bg-surface/70 p-5 md:p-6">
      <div className="mb-6 flex items-start justify-between gap-6 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.05em] text-text-dim">
            Signal timeline
          </p>
          <h3 className="mt-1 text-xl font-light text-text-primary">
            Decision sequence
          </h3>
        </div>
        <TimerReset className="h-5 w-5 shrink-0 text-brand-accent" />
      </div>
      <div className="space-y-5">
        {chart.signals.map((signal, index) => (
          <div key={signal.label} className="relative pl-8">
            <div className="absolute left-2 top-2 h-full w-px bg-[var(--border-subtle)]" />
            <div
              className={`absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full border ${toneClasses[signal.tone].card}`}
            />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {signal.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-text-dim">
                  {signal.detail}
                </p>
              </div>
              <span className={`font-mono text-sm ${toneClasses[signal.tone].text}`}>
                {signal.value}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-bg-void">
              <motion.div
                className={`h-full rounded-full ${toneClasses[signal.tone].bar}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${clampScore(signal.score)}%` }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ delay: index * 0.08, duration: 0.65 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatrixChart({ chart }: { chart: ManufacturingSpokeChart }) {
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-bg-surface/70 p-5 md:p-6">
      <div className="mb-6 flex items-start justify-between gap-6 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.05em] text-text-dim">
            Risk matrix
          </p>
          <h3 className="mt-1 text-xl font-light text-text-primary">
            Priority by evidence
          </h3>
        </div>
        <Gauge className="h-5 w-5 shrink-0 text-brand-accent" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {chart.signals.map((signal, index) => (
          <motion.div
            key={signal.label}
            className={`rounded-lg border p-4 ${toneClasses[signal.tone].card}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.06, duration: 0.35 }}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-text-primary">
                {signal.label}
              </p>
              <span className="font-mono text-sm">{signal.value}</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-text-dim">
              {signal.detail}
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-bg-void/80">
              <motion.div
                className={`h-full rounded-full ${toneClasses[signal.tone].bar}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${clampScore(signal.score)}%` }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ delay: index * 0.08, duration: 0.65 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function WaterfallChart({ chart }: { chart: ManufacturingSpokeChart }) {
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-bg-surface/70 p-5 md:p-6">
      <div className="mb-6 flex items-start justify-between gap-6 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.05em] text-text-dim">
            Executive bridge
          </p>
          <h3 className="mt-1 text-xl font-light text-text-primary">
            Value movement
          </h3>
        </div>
        <Layers3 className="h-5 w-5 shrink-0 text-brand-accent" />
      </div>
      <div className="grid min-h-[300px] grid-cols-2 items-end gap-4 sm:grid-cols-4">
        {chart.signals.map((signal, index) => (
          <div key={signal.label} className="flex h-full flex-col justify-end">
            <motion.div
              className={`min-h-16 rounded-t-lg border border-b-0 px-3 py-4 ${toneClasses[signal.tone].card}`}
              initial={{ height: 48 }}
              whileInView={{ height: `${Math.max(88, clampScore(signal.score) * 2.4)}px` }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: index * 0.08, duration: 0.65 }}
            >
              <p className="font-mono text-lg font-light">{signal.value}</p>
              <p className="mt-2 text-xs leading-snug text-text-dim">
                {signal.detail}
              </p>
            </motion.div>
            <div className="border-t border-[var(--border-subtle)] pt-3">
              <p className="text-xs font-medium leading-snug text-text-secondary">
                {signal.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ManufacturingSpokeMetricsChart({
  chart,
}: {
  chart: ManufacturingSpokeChart;
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
            {chart.mode === "matrix" ? (
              <MatrixChart chart={chart} />
            ) : chart.mode === "waterfall" ? (
              <WaterfallChart chart={chart} />
            ) : (
              <TimelineChart chart={chart} />
            )}
          </ScrollReveal>
          <div className="space-y-6 lg:col-span-2">
            <ScrollReveal>
              <div className="rounded-xl border border-brand-accent/25 bg-brand-accent/10 p-5">
                <p className="text-sm text-text-secondary">
                  {chart.summaryMetric.label}
                </p>
                <p className="mt-2 font-mono text-4xl font-semibold text-brand-accent">
                  {chart.summaryMetric.value}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-text-dim">
                  {chart.summaryMetric.detail}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
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
