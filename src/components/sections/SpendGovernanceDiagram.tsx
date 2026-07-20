"use client";

import { motion } from "framer-motion";
import { Search, Gauge, ShieldAlert, TrendingDown } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const steps = [
  {
    icon: Search,
    name: "Baseline",
    detail:
      "Inventory every AI tool, its pricing model, and who uses it. Know today's spend.",
  },
  {
    icon: Gauge,
    name: "Instrument",
    detail:
      "Turn on usage analytics and a cost API. Make spend visible per user, model, and task.",
  },
  {
    icon: ShieldAlert,
    name: "Cap",
    detail:
      "Set hard spend limits and approval workflows at workspace, group, and user level.",
  },
  {
    icon: TrendingDown,
    name: "Optimize",
    detail:
      "Route models by task and measure cost per accepted outcome. Cut what does not pay.",
  },
];

export function SpendGovernanceDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="A four-phase path to AI platform spend governance. Phase one, Baseline: inventory every AI tool, its pricing model, and who uses it to know today's spend. Phase two, Instrument: turn on usage analytics and a cost API to make spend visible per user, model, and task. Phase three, Cap: set hard spend limits and approval workflows at the workspace, group, and user level. Phase four, Optimize: route models by task and measure cost per accepted outcome, cutting what does not pay."
      >
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.name} delay={i * 0.1}>
                <motion.li
                  className="relative flex h-full flex-col chamfer-md border border-[var(--card-line)] bg-card p-5"
                  whileHover={{
                    borderColor: "var(--itecs-blue)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <span
                    className="absolute left-0 top-0 h-0.5 bg-itecs-blue-bright"
                    style={{ width: `${25 + i * 25}%` }}
                    aria-hidden="true"
                  />
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center chamfer-sm bg-brand-subtle text-itecs-blue">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs text-itecs-blue">
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-base font-semibold text-ink">
                        {step.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {step.detail}
                  </p>
                </motion.li>
              </ScrollReveal>
            );
          })}
        </ol>
        <figcaption className="mt-5 text-center text-sm italic text-ink-muted">
          Baseline, instrument, cap, then optimize — so AI spend stays visible
          and tied to value as budgets scale. ITECS runs it with your team.
        </figcaption>
      </figure>
    </section>
  );
}
