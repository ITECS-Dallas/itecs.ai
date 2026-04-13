"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Bot, Calendar, UserCheck, MessageSquare } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientOrb } from "@/components/effects/GradientOrb";

const steps = [
  {
    icon: Phone,
    label: "Call Comes In",
    detail: "24/7 on your business line",
    color: "var(--brand-accent)",
  },
  {
    icon: Bot,
    label: "AI Answers",
    detail: "Human-sounding voice agent",
    color: "var(--brand-accent)",
  },
  {
    icon: MessageSquare,
    label: "Handles Request",
    detail: "FAQs, routing, qualification",
    color: "var(--brand-purple)",
  },
  {
    icon: Calendar,
    label: "Books or Routes",
    detail: "Calendar booking or live transfer",
    color: "var(--brand-purple)",
  },
  {
    icon: UserCheck,
    label: "Lead Captured",
    detail: "CRM updated automatically",
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

/* Mobile vertical connector */
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

export function CallFlowDiagram() {
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
              How Calls Flow
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-[-0.02em] text-text-primary">
              From Ring to Resolution in Seconds
            </h2>
          </div>
        </ScrollReveal>

        {/* Desktop: horizontal flow */}
        <div ref={ref} className="hidden md:flex items-start justify-center">
          {steps.map((step, i) => (
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
                    borderColor: step.color,
                    transition: { duration: 0.2 },
                  }}
                >
                  <step.icon
                    className="h-7 w-7"
                    style={{ color: step.color }}
                  />
                </motion.div>
                <p className="mt-3 text-sm font-medium text-text-primary">
                  {step.label}
                </p>
                <p className="mt-1 text-xs text-text-dim leading-snug">
                  {step.detail}
                </p>
              </motion.div>
              {i < steps.length - 1 && (
                <FlowConnector delay={0.4 + i * 0.15} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical flow */}
        <div className="flex md:hidden flex-col items-center">
          {steps.map((step, i) => (
            <div key={i} className="contents">
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/80">
                  <step.icon
                    className="h-6 w-6"
                    style={{ color: step.color }}
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-text-primary">
                  {step.label}
                </p>
                <p className="mt-1 text-xs text-text-dim">{step.detail}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <VerticalConnector delay={0.3 + i * 0.12} />
              )}
            </div>
          ))}
        </div>

        {/* Caption — secondary keyword */}
        <ScrollReveal delay={0.5}>
          <p className="mt-10 text-center text-sm text-text-dim italic">
            AI voice agents handle the entire call lifecycle — from greeting to
            CRM entry — without human intervention.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
