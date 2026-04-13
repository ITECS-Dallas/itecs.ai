"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Bot,
  Zap,
  GraduationCap,
  Phone,
  BarChart3,
  BookOpen,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";

const phases = [
  {
    phase: "01",
    label: "Assess",
    tagline: "Find the gaps",
    color: "var(--brand-accent)",
    services: [
      {
        icon: Brain,
        name: "AI Consulting",
        href: "/consulting",
        desc: "Audit workflows and build your AI roadmap",
      },
      {
        icon: ShieldCheck,
        name: "Data Audit",
        href: "/data-audit",
        desc: "Score your data readiness before any AI build",
      },
    ],
  },
  {
    phase: "02",
    label: "Build",
    tagline: "Deploy solutions",
    color: "var(--brand-purple)",
    services: [
      {
        icon: Bot,
        name: "Custom ChatGPT",
        href: "/custom-chatgpt",
        desc: "Private AI agents trained on your data",
      },
      {
        icon: Zap,
        name: "Automation",
        href: "/automation",
        desc: "Connect tools and eliminate manual handoffs",
      },
      {
        icon: Phone,
        name: "AI Receptionist",
        href: "/ai-receptionist",
        desc: "24/7 call answering and appointment booking",
      },
      {
        icon: BarChart3,
        name: "CRM & Sales AI",
        href: "/crm-sales-ai",
        desc: "AI-powered lead scoring and pipeline automation",
      },
      {
        icon: BookOpen,
        name: "Knowledge Base",
        href: "/ai-knowledge-base",
        desc: "Internal RAG search across company documents",
      },
    ],
  },
  {
    phase: "03",
    label: "Scale",
    tagline: "Train your team",
    color: "var(--brand-accent-bright, #22d3ee)",
    services: [
      {
        icon: GraduationCap,
        name: "AI Training",
        href: "/training",
        desc: "Hands-on workshops for safe, effective AI use",
      },
    ],
  },
];

function PhaseCard({
  phase,
  index,
}: {
  phase: (typeof phases)[number];
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 0.12}>
      <div className="relative">
        {/* Phase header */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className="text-4xl font-extralight tracking-tight"
            style={{ color: phase.color }}
          >
            {phase.phase}
          </span>
          <div>
            <span className="block text-lg font-light text-text-primary">
              {phase.label}
            </span>
            <span className="block text-sm text-text-dim">{phase.tagline}</span>
          </div>
        </div>

        {/* Service links */}
        <div className="space-y-3">
          {phase.services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.name}
                href={service.href}
                className="group flex items-start gap-3 p-4 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/30 hover:border-[var(--border-active)] transition-colors"
              >
                <div
                  className="flex items-center justify-center shrink-0 w-9 h-9 rounded-lg"
                  style={{ backgroundColor: `color-mix(in srgb, ${phase.color} 12%, transparent)` }}
                >
                  <Icon
                    className="h-4.5 w-4.5"
                    style={{ color: phase.color }}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-medium text-text-primary group-hover:text-brand-accent transition-colors">
                    {service.name}
                  </span>
                  <span className="block text-xs text-text-dim leading-relaxed mt-0.5">
                    {service.desc}
                  </span>
                </div>
                <ArrowRight
                  className="h-3.5 w-3.5 text-text-dim group-hover:text-brand-accent transition-colors mt-1 shrink-0"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </ScrollReveal>
  );
}

function ConnectorLine() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <svg
      ref={ref}
      viewBox="0 0 40 100"
      fill="none"
      className="hidden lg:block w-10 h-full mx-auto"
      aria-hidden="true"
    >
      <motion.line
        x1="20"
        y1="0"
        x2="20"
        y2="100"
        stroke="var(--brand-accent)"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.3 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <motion.circle
        cx="20"
        cy="50"
        r="3"
        fill="var(--brand-accent)"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 0.5 } : {}}
        transition={{ delay: 0.8, duration: 0.3 }}
      />
    </svg>
  );
}

export function ServiceJourneyDiagram() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Your AI Journey"
            title="From Assessment to Adoption in Three Phases"
            description="Most businesses stall because they try to do everything at once. We break AI adoption into three phases — so you start with quick wins and scale from there."
          />
        </ScrollReveal>

        <figure
          role="img"
          aria-label="Three-phase AI adoption journey: Phase 1 Assess covers AI Consulting and Data Audit; Phase 2 Build covers Custom ChatGPT, Automation, AI Receptionist, CRM and Sales AI, and Knowledge Base; Phase 3 Scale covers AI Training for team enablement"
          className="mt-16"
        >
          {/* Desktop: 3 columns with connectors */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_40px_1fr_40px_1fr] items-start">
            <PhaseCard phase={phases[0]} index={0} />
            <ConnectorLine />
            <PhaseCard phase={phases[1]} index={1} />
            <ConnectorLine />
            <PhaseCard phase={phases[2]} index={2} />
          </div>

          {/* Mobile: stacked with dividers */}
          <div className="lg:hidden space-y-10">
            {phases.map((phase, i) => (
              <div key={phase.phase}>
                <PhaseCard phase={phase} index={i} />
                {i < phases.length - 1 && (
                  <div className="flex justify-center mt-6" aria-hidden="true">
                    <div className="w-px h-8 bg-gradient-to-b from-brand-accent/40 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <figcaption className="mt-8 text-center text-sm text-text-dim">
            ITECS AI adoption framework — 8 managed services across assessment,
            deployment, and team enablement phases
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
