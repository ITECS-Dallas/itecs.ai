"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Plug2, ScanSearch, BrainCircuit, FileCheck, Users } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientOrb } from "@/components/effects/GradientOrb";

const stages = [
  {
    icon: Plug2,
    label: "Connect",
    detail: "Read-only API access",
    color: "var(--brand-accent)",
  },
  {
    icon: ScanSearch,
    label: "Scan",
    detail: "Permissions, sharing, exposure",
    color: "var(--brand-accent)",
  },
  {
    icon: BrainCircuit,
    label: "Analyze",
    detail: "Risks, gaps, opportunities",
    color: "var(--brand-purple)",
  },
  {
    icon: FileCheck,
    label: "Report",
    detail: "Prioritized action items",
    color: "var(--brand-purple)",
  },
  {
    icon: Users,
    label: "Review",
    detail: "Live walkthrough session",
    color: "var(--brand-accent)",
  },
];

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut" as const },
  },
};

function FlowConnector({ delay }: { delay: number }) {
  return (
    <div className="hidden md:flex items-center justify-center w-12 shrink-0">
      <motion.svg
        width="48"
        height="2"
        viewBox="0 0 48 2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.line
          x1="0"
          y1="1"
          x2="48"
          y2="1"
          stroke="var(--brand-accent)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          variants={lineVariants}
          transition={{ delay, duration: 0.5 }}
        />
      </motion.svg>
    </div>
  );
}

function VerticalConnector({ delay }: { delay: number }) {
  return (
    <div className="flex md:hidden items-center justify-center h-8">
      <motion.svg
        width="2"
        height="32"
        viewBox="0 0 2 32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="32"
          stroke="var(--brand-accent)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          variants={lineVariants}
          transition={{ delay, duration: 0.5 }}
        />
      </motion.svg>
    </div>
  );
}

export function DataAuditDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <GradientOrb
        color="cyan"
        size="sm"
        position={{ top: "30%", left: "5%" }}
      />
      <GradientOrb
        color="purple"
        size="sm"
        position={{ bottom: "20%", right: "10%" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.05em] uppercase text-brand-accent mb-3">
              Audit Process
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-[-0.02em] text-text-primary">
              From Connection to Action Plan in 7 Days
            </h2>
          </div>
        </ScrollReveal>

        <figure
          role="img"
          aria-label="AI data readiness audit flow diagram showing five stages: connect to Microsoft 365 or Google Workspace via read-only API, automated scan of permissions and sharing settings, expert analysis of security risks and compliance gaps, deliver prioritized report with remediation steps, and live review session with leadership team"
        >
          {/* Desktop: horizontal flow */}
          <div ref={ref} className="hidden md:flex items-start justify-center">
            {stages.map((stage, i) => (
              <div key={i} className="contents">
                <motion.div
                  className="flex flex-col items-center text-center max-w-[140px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                >
                  <motion.div
                    className="flex items-center justify-center w-16 h-16 rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/80"
                    whileHover={{
                      scale: 1.08,
                      borderColor: stage.color,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <stage.icon
                      className="h-7 w-7"
                      style={{ color: stage.color }}
                      aria-hidden="true"
                    />
                  </motion.div>
                  <p className="mt-3 text-sm font-medium text-text-primary">
                    {stage.label}
                  </p>
                  <p className="mt-1 text-xs text-text-dim leading-snug">
                    {stage.detail}
                  </p>
                </motion.div>
                {i < stages.length - 1 && (
                  <FlowConnector delay={0.4 + i * 0.15} />
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical flow */}
          <div className="flex md:hidden flex-col items-center">
            {stages.map((stage, i) => (
              <div key={i} className="contents">
                <motion.div
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/80">
                    <stage.icon
                      className="h-6 w-6"
                      style={{ color: stage.color }}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium text-text-primary">
                    {stage.label}
                  </p>
                  <p className="mt-1 text-xs text-text-dim">{stage.detail}</p>
                </motion.div>
                {i < stages.length - 1 && (
                  <VerticalConnector delay={0.3 + i * 0.12} />
                )}
              </div>
            ))}
          </div>

          <ScrollReveal delay={0.5}>
            <figcaption className="mt-10 text-center text-sm text-text-dim italic">
              Automated scanning covers your entire Microsoft 365 or Google
              Workspace environment — every permission, sharing link, and
              security configuration assessed without disruption.
            </figcaption>
          </ScrollReveal>
        </figure>
      </div>
    </section>
  );
}
