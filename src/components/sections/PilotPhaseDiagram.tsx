"use client";

import { motion } from "framer-motion";
import { Lock, FlaskConical, Expand, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

interface Phase {
  icon: typeof Lock;
  name: string;
  detail: string;
  /** filled dots out of 4 — how much agent access is granted at this phase */
  access: number;
}

const phases: Phase[] = [
  {
    icon: Lock,
    name: "Contain",
    detail: "Connectors and publishing off. Work enabled for a small pilot group only.",
    access: 1,
  },
  {
    icon: FlaskConical,
    name: "Pilot",
    detail: "Read-only connectors. Every write action requires approval. One team, low-risk tasks.",
    access: 2,
  },
  {
    icon: Expand,
    name: "Expand",
    detail: "Add write approvals for proven workflows. Widen the group. Watch the audit logs.",
    access: 3,
  },
  {
    icon: ShieldCheck,
    name: "Govern",
    detail: "Set RBAC, Sites rules, spend caps, and a review cadence before broad rollout.",
    access: 4,
  },
];

export function PilotPhaseDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="A four-phase ChatGPT Work pilot plan that grants agent access in stages. Phase one, Contain: connectors and publishing are off and Work is enabled for a small pilot group only, with the least access. Phase two, Pilot: read-only connectors with every write action requiring approval, for one team on low-risk tasks. Phase three, Expand: add write approvals for proven workflows, widen the group, and watch the audit logs. Phase four, Govern: set role-based access control, Sites publishing rules, spend caps, and a review cadence before broad rollout, with the most access but full governance."
      >
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase, i) => {
            const Icon = phase.icon;
            return (
              <ScrollReveal key={phase.name} delay={i * 0.1}>
                <motion.li
                  className="relative flex h-full flex-col chamfer-md border border-[var(--card-line)] bg-card p-5"
                  whileHover={{
                    borderColor: "var(--itecs-blue)",
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* access grows with each phase */}
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
                        {phase.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-ink-muted">
                    {phase.detail}
                  </p>
                  <div className="flex items-center gap-2 border-t border-[var(--card-line)] pt-3">
                    <span className="w-14 shrink-0 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                      Access
                    </span>
                    <span className="flex gap-1" aria-hidden="true">
                      {[0, 1, 2, 3].map((d) => (
                        <span
                          key={d}
                          className={`h-1.5 w-4 rounded-sm ${
                            d < phase.access
                              ? "bg-itecs-blue-bright"
                              : "bg-[var(--card-line)]"
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                </motion.li>
              </ScrollReveal>
            );
          })}
        </ol>
        <figcaption className="mt-5 text-center text-sm italic text-ink-muted">
          Grant access in stages, not all at once. Each phase widens what the
          agent can do only after the last one earned it.
        </figcaption>
      </figure>
    </section>
  );
}
