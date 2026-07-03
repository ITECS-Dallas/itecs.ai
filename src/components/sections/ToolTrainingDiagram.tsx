"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  GraduationCap,
  Rocket,
  ShieldCheck,
  LineChart,
  Terminal,
  GitBranch,
  Bot,
  Users,
  FileText,
  Workflow,
  Cpu,
  Sparkles,
  ClipboardCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const ICON_MAP: Record<string, LucideIcon> = {
  Search,
  SlidersHorizontal,
  GraduationCap,
  Rocket,
  ShieldCheck,
  LineChart,
  Terminal,
  GitBranch,
  Bot,
  Users,
  FileText,
  Workflow,
  Cpu,
  Sparkles,
  ClipboardCheck,
  Wrench,
};

export interface DiagramStage {
  icon: string;
  label: string;
  detail: string;
}

interface ToolTrainingDiagramProps {
  eyebrow: string;
  heading: string;
  caption: string;
  ariaLabel: string;
  stages: DiagramStage[];
}

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut" as const },
  },
};

function FlowConnector({ delay }: { delay: number }) {
  return (
    <div className="hidden md:flex items-center justify-center w-10 shrink-0 pt-8">
      <motion.svg
        width="40"
        height="2"
        viewBox="0 0 40 2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        aria-hidden="true"
      >
        <motion.line
          x1="0"
          y1="1"
          x2="40"
          y2="1"
          stroke="var(--itecs-blue-bright)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          variants={lineVariants}
          transition={{ delay }}
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
        aria-hidden="true"
      >
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="32"
          stroke="var(--itecs-blue-bright)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          variants={lineVariants}
          transition={{ delay }}
        />
      </motion.svg>
    </div>
  );
}

export function ToolTrainingDiagram({
  eyebrow,
  heading,
  caption,
  ariaLabel,
  stages,
}: ToolTrainingDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h2 className="font-display text-3xl md:text-[2.5rem] font-semibold tracking-[-0.02em] text-ink">
              {heading}
            </h2>
          </div>
        </ScrollReveal>

        <figure role="img" aria-label={ariaLabel}>
          {/* Desktop: horizontal flow */}
          <div
            ref={ref}
            className="hidden md:flex items-start justify-center"
          >
            {stages.map((stage, i) => {
              const Icon = ICON_MAP[stage.icon] ?? Sparkles;
              return (
                <div key={i} className="contents">
                  <motion.div
                    className="flex flex-col items-center text-center max-w-[150px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.15, duration: 0.5 }}
                  >
                    <motion.div
                      className="flex items-center justify-center w-16 h-16 chamfer-md border border-[var(--card-line)] bg-card"
                      whileHover={{
                        scale: 1.06,
                        borderColor: "var(--itecs-blue)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Icon
                        className="h-7 w-7 text-itecs-blue"
                        aria-hidden="true"
                      />
                    </motion.div>
                    <p className="mt-4 text-sm font-semibold text-ink">
                      {stage.label}
                    </p>
                    <p className="mt-1 text-xs text-ink-muted leading-snug">
                      {stage.detail}
                    </p>
                  </motion.div>
                  {i < stages.length - 1 && (
                    <FlowConnector delay={0.35 + i * 0.15} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical flow */}
          <div className="flex md:hidden flex-col items-center">
            {stages.map((stage, i) => {
              const Icon = ICON_MAP[stage.icon] ?? Sparkles;
              return (
                <div
                  key={i}
                  className="contents"
                >
                  <motion.div
                    className="flex items-center gap-4 w-full max-w-sm chamfer-md border border-[var(--card-line)] bg-card p-4"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 shrink-0 chamfer-sm bg-brand-subtle">
                      <Icon
                        className="h-6 w-6 text-itecs-blue"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {stage.label}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-muted leading-snug">
                        {stage.detail}
                      </p>
                    </div>
                  </motion.div>
                  {i < stages.length - 1 && (
                    <VerticalConnector delay={0.2 + i * 0.05} />
                  )}
                </div>
              );
            })}
          </div>

          <ScrollReveal delay={0.4}>
            <figcaption className="mt-12 text-center text-sm text-ink-muted italic max-w-2xl mx-auto">
              {caption}
            </figcaption>
          </ScrollReveal>
        </figure>
      </div>
    </section>
  );
}
