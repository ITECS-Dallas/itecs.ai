"use client";

import { motion } from "framer-motion";
import { ClipboardList, GitCompare, MessageSquareQuote, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const steps = [
  {
    icon: ClipboardList,
    name: "Inventory",
    detail:
      "List every AI system, what data it reaches, and what it can do — read, write, send, publish, or transact.",
  },
  {
    icon: GitCompare,
    name: "Map",
    detail:
      "Match each realistic failure to the policy that would respond — and where no policy would.",
  },
  {
    icon: MessageSquareQuote,
    name: "Ask",
    detail:
      "Take specific questions to your broker. Request the actual policy wording, not a summary.",
  },
  {
    icon: ShieldCheck,
    name: "Decide",
    detail:
      "Buy an endorsement, pursue AI cover, or reduce agent permissions until exposure matches coverage.",
  },
];

export function CoverageReviewDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="A four-step executive insurance review to run before deploying AI agents. Step one, Inventory: list every AI system, what data it reaches, and what it can do — read, write, send, publish, or transact. Step two, Map: match each realistic failure to the insurance policy that would respond, and identify where no policy would. Step three, Ask: take specific questions to your broker and request the actual policy wording rather than a summary. Step four, Decide: buy an endorsement, pursue dedicated AI coverage, or reduce agent permissions until the exposure matches the coverage."
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
          Run this review before the agent gets access — not after a claim.
          ITECS produces the inventory and permissions evidence your broker asks
          for.
        </figcaption>
      </figure>
    </section>
  );
}
