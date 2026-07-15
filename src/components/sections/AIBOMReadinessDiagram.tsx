"use client";

import { motion } from "framer-motion";
import { Radar, FileText, ScanSearch, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const steps = [
  {
    icon: Radar,
    name: "Discover",
    detail:
      "Find every model, agent, dataset, and dependency actually running — including the shadow AI nobody registered.",
  },
  {
    icon: FileText,
    name: "Document",
    detail:
      "Generate an AI-BOM covering models, data, infrastructure, and components, aligned to the CISA and G7 elements.",
  },
  {
    icon: ScanSearch,
    name: "Assess",
    detail:
      "Map each component to risk: data exposure, licensing, drift, and regulatory scope.",
  },
  {
    icon: ShieldCheck,
    name: "Govern",
    detail:
      "Assign ownership, keep the inventory live, and gate production on a current AI-BOM.",
  },
];

export function AIBOMReadinessDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="A four-phase path to AI Bill of Materials readiness before production. Phase one, Discover: find every model, agent, dataset, and dependency actually running, including shadow AI that was never registered. Phase two, Document: generate an AI-BOM covering models, data, infrastructure, and components, aligned to the CISA and G7 minimum elements. Phase three, Assess: map each component to its risk, including data exposure, licensing, drift, and regulatory scope. Phase four, Govern: assign ownership, keep the inventory live, and gate production on a current AI-BOM."
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
          Discover, document, assess, and govern — the path from an AI pilot to a
          production system you can audit. ITECS runs it with your team.
        </figcaption>
      </figure>
    </section>
  );
}
