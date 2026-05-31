"use client";

import { TrendingUp, Sparkles, Users, Globe } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AISEOProofStat, AISEOTrafficSource } from "@/lib/constants";

const statIcons = [Users, TrendingUp, Sparkles, Globe];

interface Props {
  title: string;
  intro: string;
  stats: AISEOProofStat[];
  trafficSources: AISEOTrafficSource[];
  dateRange: string;
}

export function LiveAnalyticsProof({
  title,
  intro,
  stats,
  trafficSources,
  dateRange,
}: Props) {
  return (
    <section className="py-24 md:py-32 bg-bg-surface">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading eyebrow="Proof" title={title} description={intro} />
          <p className="-mt-6 text-center text-xs text-text-dim tracking-[0.06em] uppercase">
            Source: itecsonline.com GA4 · {dateRange}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
          {/* Stats grid */}
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => {
                const Icon = statIcons[i % statIcons.length];
                return (
                  <div
                    key={stat.label}
                    className="relative rounded-xl border border-[var(--border-subtle)] bg-bg-void p-6 overflow-hidden"
                  >
                    <Icon
                      className="absolute top-4 right-4 h-4 w-4 text-brand-accent/40"
                      aria-hidden="true"
                    />
                    <p className="text-4xl md:text-5xl font-thin tracking-[-0.02em] text-text-primary">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs text-text-dim tracking-[0.04em] uppercase leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Traffic source breakdown */}
          <ScrollReveal delay={0.2}>
            <div className="h-full rounded-xl border border-[var(--border-subtle)] bg-bg-void p-6">
              <p className="text-xs font-medium tracking-[0.08em] uppercase text-text-dim mb-5">
                Traffic Sources (Sessions)
              </p>
              <ul className="space-y-3">
                {trafficSources.map((s) => {
                  // Compute a relative bar width vs the max source
                  const max = Math.max(
                    ...trafficSources.map((t) =>
                      parseInt(t.sessions.replace(/[,+]/g, ""), 10) || 0
                    )
                  );
                  const value =
                    parseInt(s.sessions.replace(/[,+]/g, ""), 10) || 0;
                  const pct = max > 0 ? Math.max(6, (value / max) * 100) : 0;
                  const isAI = ["ChatGPT.com", "Claude.ai", "Perplexity"].some(
                    (a) => s.source.includes(a)
                  );
                  return (
                    <li key={s.source}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span
                          className={
                            isAI
                              ? "text-brand-accent font-medium"
                              : "text-text-secondary"
                          }
                        >
                          {s.source}
                        </span>
                        <span
                          className={
                            isAI
                              ? "text-brand-accent font-medium"
                              : "text-text-dim"
                          }
                        >
                          {s.sessions}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-bg-elevated overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isAI
                              ? "bg-gradient-to-r from-brand to-cyan"
                              : "bg-brand-accent/40"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
