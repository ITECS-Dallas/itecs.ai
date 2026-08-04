"use client";

import { motion } from "framer-motion";
import { FileText, FlaskConical, Server, ClipboardCheck } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const steps = [
  {
    icon: FileText,
    name: "Classify",
    detail:
      "Confirm whether it is open weight or open source, and read the license.",
  },
  {
    icon: FlaskConical,
    name: "Test",
    detail:
      "Run cyber and misuse evaluations on the model before any deployment.",
  },
  {
    icon: Server,
    name: "Host",
    detail:
      "Decide where it runs — private infrastructure where data control matters.",
  },
  {
    icon: ClipboardCheck,
    name: "Approve",
    detail:
      "Gate deployment behind named sign-off, with provenance on record.",
  },
];

export function OpenWeightGovernanceDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="A four-phase path to open-weight model governance. Phase one, Classify: confirm whether it is open weight or open source, and read the license. Phase two, Test: run cyber and misuse evaluations on the model before any deployment. Phase three, Host: decide where it runs, using private infrastructure where data control matters. Phase four, Approve: gate deployment behind named sign-off, with provenance on record."
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
          Classify, test, host, then approve — so a downloadable model is a
          governed procurement decision, not an accident. ITECS builds and runs
          it with your team.
        </figcaption>
      </figure>
    </section>
  );
}
