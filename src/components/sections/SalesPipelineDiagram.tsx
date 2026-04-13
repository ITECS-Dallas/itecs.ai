"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  UserPlus,
  Search,
  BarChart3,
  Mail,
  Handshake,
  Database,
} from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientOrb } from "@/components/effects/GradientOrb";

const stages = [
  {
    icon: UserPlus,
    label: "Lead Enters CRM",
    detail: "Form, referral, or import",
    color: "var(--brand-accent)",
  },
  {
    icon: Search,
    label: "AI Researches",
    detail: "Company, contacts, signals",
    color: "var(--brand-accent)",
  },
  {
    icon: BarChart3,
    label: "AI Scores Lead",
    detail: "Fit, intent, engagement",
    color: "var(--brand-purple)",
  },
  {
    icon: Mail,
    label: "AI Drafts Outreach",
    detail: "Personalized from CRM data",
    color: "var(--brand-purple)",
  },
  {
    icon: Handshake,
    label: "Rep Closes Deal",
    detail: "Focused on selling, not admin",
    color: "var(--brand-accent)",
  },
  {
    icon: Database,
    label: "Auto-Logged",
    detail: "CRM updated, pipeline clean",
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

function HConnector({ delay }: { delay: number }) {
  return (
    <div className="hidden md:flex items-center justify-center w-8 shrink-0">
      <motion.svg
        width="32"
        height="2"
        viewBox="0 0 32 2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.line
          x1="0"
          y1="1"
          x2="32"
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

function VConnector({ delay }: { delay: number }) {
  return (
    <div className="flex md:hidden items-center justify-center h-6">
      <motion.svg
        width="2"
        height="24"
        viewBox="0 0 2 24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="24"
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

export function SalesPipelineDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <GradientOrb
        color="purple"
        size="sm"
        position={{ top: "25%", right: "8%" }}
      />
      <GradientOrb
        color="cyan"
        size="sm"
        position={{ bottom: "25%", left: "5%" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.05em] uppercase text-brand-accent mb-3">
              AI-Powered Pipeline
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-[-0.02em] text-text-primary">
              From New Lead to Closed Deal — Automated
            </h2>
          </div>
        </ScrollReveal>

        <figure
          role="img"
          aria-label="AI CRM sales pipeline diagram showing six stages: lead enters HubSpot or Salesforce CRM, AI researches company and contacts via Apollo, AI scores lead by fit and intent, AI drafts personalized outreach email, sales rep closes the deal, and activity is auto-logged back to CRM"
        >
          {/* Desktop: horizontal flow — 2 rows of 3 */}
          <div ref={ref} className="hidden md:block">
            {/* Top row */}
            <div className="flex items-start justify-center">
              {stages.slice(0, 3).map((stage, i) => (
                <div key={i} className="contents">
                  <motion.div
                    className="flex flex-col items-center text-center max-w-[140px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                  >
                    <motion.div
                      className="flex items-center justify-center w-14 h-14 rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/80"
                      whileHover={{
                        scale: 1.08,
                        borderColor: stage.color,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <stage.icon
                        className="h-6 w-6"
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
                  {i < 2 && <HConnector delay={0.4 + i * 0.15} />}
                </div>
              ))}
            </div>

            {/* Connecting arc between rows */}
            <div className="flex justify-center my-6">
              <motion.svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.path
                  d="M 20 0 L 20 40"
                  stroke="var(--brand-accent)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  fill="none"
                  variants={lineVariants}
                  transition={{ delay: 0.7, duration: 0.5 }}
                />
              </motion.svg>
            </div>

            {/* Bottom row */}
            <div className="flex items-start justify-center">
              {stages.slice(3).map((stage, i) => (
                <div key={i + 3} className="contents">
                  <motion.div
                    className="flex flex-col items-center text-center max-w-[140px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                  >
                    <motion.div
                      className="flex items-center justify-center w-14 h-14 rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/80"
                      whileHover={{
                        scale: 1.08,
                        borderColor: stage.color,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <stage.icon
                        className="h-6 w-6"
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
                  {i < 2 && <HConnector delay={1.0 + i * 0.15} />}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical flow */}
          <div className="flex md:hidden flex-col items-center">
            {stages.map((stage, i) => (
              <div key={i} className="contents">
                <motion.div
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/80">
                    <stage.icon
                      className="h-5 w-5"
                      style={{ color: stage.color }}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium text-text-primary">
                    {stage.label}
                  </p>
                  <p className="mt-1 text-xs text-text-dim">{stage.detail}</p>
                </motion.div>
                {i < stages.length - 1 && <VConnector delay={0.3 + i * 0.1} />}
              </div>
            ))}
          </div>

          <ScrollReveal delay={0.5}>
            <figcaption className="mt-10 text-center text-sm text-text-dim italic">
              AI handles research, scoring, and outreach drafting — your reps
              focus on conversations that close deals.
            </figcaption>
          </ScrollReveal>
        </figure>
      </div>
    </section>
  );
}
