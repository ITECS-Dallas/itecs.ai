"use client";

import { ArrowDownRight, ArrowUpRight, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PPVExposureWaterfall as PPVExposureWaterfallContent } from "@/lib/constants";

const stageToneClasses = {
  risk: {
    bar: "from-rose-400 to-amber-300",
    text: "text-rose-200",
    border: "border-rose-400/25 bg-rose-400/10",
    icon: "text-rose-300",
  },
  watch: {
    bar: "from-amber-300 to-brand-accent",
    text: "text-amber-200",
    border: "border-amber-300/25 bg-amber-300/10",
    icon: "text-amber-200",
  },
  recoverable: {
    bar: "from-brand-accent to-emerald-300",
    text: "text-brand-accent",
    border: "border-brand-accent/25 bg-brand-accent/10",
    icon: "text-brand-accent",
  },
  controlled: {
    bar: "from-emerald-300 to-slate-300",
    text: "text-emerald-200",
    border: "border-emerald-300/25 bg-emerald-300/10",
    icon: "text-emerald-200",
  },
} as const;

const windowToneClasses = {
  risk: "border-rose-400/25 bg-rose-400/10 text-rose-200",
  watch: "border-amber-300/25 bg-amber-300/10 text-amber-200",
  recoverable: "border-brand-accent/25 bg-brand-accent/10 text-brand-accent",
} as const;

export function PPVExposureWaterfall({
  waterfall,
}: {
  waterfall: PPVExposureWaterfallContent;
}) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow={waterfall.eyebrow}
            title={waterfall.title}
            description={waterfall.description}
          />
        </ScrollReveal>

        <div className="mt-12 grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
          <ScrollReveal className="min-w-0">
            <div className="min-w-0 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/70 p-5 md:p-6">
              <div className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.05em] text-text-dim">
                    Illustrative 90-day waterfall
                  </p>
                  <h3 className="mt-2 text-xl font-light text-text-primary">
                    From gross PPV exposure to unresolved margin risk
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-xs text-text-dim">
                  <span className="flex items-center gap-1.5">
                    <ArrowUpRight className="h-4 w-4 text-rose-300" />
                    Exposure added
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ArrowDownRight className="h-4 w-4 text-brand-accent" />
                    Exposure reduced
                  </span>
                </div>
              </div>

              <div className="mt-8 w-full max-w-[calc(100vw-4rem)] overflow-x-auto pb-2 md:max-w-full">
                <div className="min-w-[720px]">
                  <div className="relative grid h-64 grid-cols-6 gap-4">
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-[var(--border-subtle)]" />
                    {waterfall.stages.map((stage, index) => {
                      const tone = stageToneClasses[stage.tone];
                      const Icon =
                        stage.direction === "increase"
                          ? ArrowUpRight
                          : ArrowDownRight;

                      return (
                        <div
                          key={stage.label}
                          className="relative grid grid-rows-[1fr_auto_1fr] gap-2"
                        >
                          <div className="flex items-end justify-center">
                            {stage.direction === "increase" ? (
                              <motion.div
                                className={`w-full max-w-20 rounded-t-lg bg-gradient-to-t ${tone.bar}`}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${stage.height}%` }}
                                viewport={{ once: true, amount: 0.7 }}
                                transition={{
                                  delay: index * 0.08,
                                  duration: 0.7,
                                  ease: [0.25, 0.1, 0.25, 1],
                                }}
                              />
                            ) : null}
                          </div>

                          <div className="z-10 mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-bg-void">
                            <Icon className={`h-4 w-4 ${tone.icon}`} />
                          </div>

                          <div className="flex items-start justify-center">
                            {stage.direction === "decrease" ? (
                              <motion.div
                                className={`w-full max-w-20 rounded-b-lg bg-gradient-to-b ${tone.bar}`}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${stage.height}%` }}
                                viewport={{ once: true, amount: 0.7 }}
                                transition={{
                                  delay: index * 0.08,
                                  duration: 0.7,
                                  ease: [0.25, 0.1, 0.25, 1],
                                }}
                              />
                            ) : null}
                          </div>

                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-5 grid grid-cols-6 gap-4">
                    {waterfall.stages.map((stage) => {
                      const tone = stageToneClasses[stage.tone];

                      return (
                        <div
                          key={stage.label}
                          className={`rounded-lg border p-3 ${tone.border}`}
                        >
                          <p className={`font-mono text-lg ${tone.text}`}>
                            {stage.value}
                          </p>
                          <p className="mt-2 text-xs leading-snug text-text-primary">
                            {stage.label}
                          </p>
                          <p className="mt-2 text-xs leading-relaxed text-text-dim">
                            {stage.detail}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal delay={0.08}>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-bg-surface/50 p-5">
                <h3 className="text-lg font-light text-text-primary">
                  Exposure windows
                </h3>
                <div className="mt-5 space-y-3">
                  {waterfall.windows.map((window) => (
                    <div
                      key={window.label}
                      className={`rounded-lg border p-4 ${windowToneClasses[window.tone]}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm text-text-secondary">
                          {window.label}
                        </p>
                        <p className="font-mono text-2xl font-semibold">
                          {window.exposure}
                        </p>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-text-dim">
                        {window.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-bg-surface/50 p-5">
                <h3 className="text-lg font-light text-text-primary">
                  Decision queue
                </h3>
                <div className="mt-5 space-y-4">
                  {waterfall.decisions.map((decision) => (
                    <div
                      key={decision.action}
                      className="border-l border-brand-accent/35 pl-4"
                    >
                      <p className="text-sm text-text-primary">
                        {decision.action}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-text-dim">
                        <span>{decision.owner}</span>
                        <span className="flex items-center gap-1 text-brand-accent">
                          <Clock3 className="h-3.5 w-3.5" />
                          {decision.timing}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                        {decision.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
