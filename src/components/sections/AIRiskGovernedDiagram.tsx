"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck, X, Check } from "lucide-react";

const ungoverned = [
  "Sensitive data pasted into public AI tools",
  "Shadow AI use no one can see or measure",
  "Confident but wrong answers trusted as fact",
  "Agents act on systems with no approval gate",
  "Quiet compliance gaps — HIPAA, PCI, contracts",
  "Licenses paid for, ROI unclear or missing",
];

const governed = [
  "Approved tools with clear data boundaries",
  "Full visibility into how AI is used",
  "Outputs verified with a human in the loop",
  "Approval gates on every agent action",
  "Policy aligned to NIST and your compliance",
  "Staff trained, time saved, ROI measured",
];

export function AIRiskGovernedDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="Side-by-side comparison of ungoverned AI use versus AI governed and trained by ITECS. Ungoverned use leads to data leakage, shadow AI, unverified answers, unapproved agent actions, compliance gaps, and unclear ROI. Governed AI provides approved tools with data boundaries, full visibility, verified outputs with human review, approval gates on agents, policy aligned to the NIST framework, and trained staff with measured ROI."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Ungoverned */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="chamfer-md border border-[var(--card-line)] border-l-2 border-l-danger bg-card p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center chamfer-sm bg-danger/10 text-danger">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold text-ink">
                AI Without Guidance
              </h3>
            </div>
            <ul className="space-y-3">
              {ungoverned.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-ink-body"
                >
                  <X
                    className="mt-0.5 h-4 w-4 shrink-0 text-danger"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Governed */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="chamfer-md border border-[var(--card-line)] border-l-2 border-l-itecs-blue bg-card p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center chamfer-sm bg-brand-subtle text-itecs-blue">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold text-ink">
                AI Governed & Trained by ITECS
              </h3>
            </div>
            <ul className="space-y-3">
              {governed.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-ink-body"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-itecs-blue-bright"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <figcaption className="mt-5 text-center text-sm italic text-ink-muted">
          The same AI tools, two very different outcomes. Governance and training
          are what separate exposure from return.
        </figcaption>
      </figure>
    </section>
  );
}
