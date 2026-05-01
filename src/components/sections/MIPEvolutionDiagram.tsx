"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Server, ShieldCheck, Brain } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stages = [
  {
    acronym: "MSP",
    label: "Managed Service Provider",
    era: "2000s–2010s",
    icon: Server,
    color: "var(--text-dim)",
    description:
      "Keeps servers running, patches software, manages helpdesk tickets. Reactive IT support — fixes problems after they happen.",
    capabilities: [
      "Infrastructure monitoring",
      "Helpdesk & break-fix",
      "Patch management",
      "Backup & disaster recovery",
    ],
  },
  {
    acronym: "MSSP",
    label: "Managed Security Service Provider",
    era: "2015–2023",
    icon: ShieldCheck,
    color: "var(--brand-purple)",
    description:
      "Adds cybersecurity to the MSP model. Monitors threats, manages firewalls, runs compliance audits. Protects your data — but doesn't use it.",
    capabilities: [
      "Everything in MSP",
      "SIEM & threat detection",
      "Endpoint protection (EDR)",
      "Compliance (HIPAA, SOC 2)",
    ],
  },
  {
    acronym: "MIP",
    label: "Managed Intelligence Provider",
    era: "2024+",
    icon: Brain,
    color: "var(--brand-accent)",
    description:
      "Deploys AI automation, custom AI agents, and data intelligence on top of IT and security. Makes your business smarter — not just safer.",
    capabilities: [
      "Everything in MSSP",
      "AI workflow automation",
      "Custom AI agents",
      "AI-powered CRM & sales",
      "Employee AI training",
    ],
  },
];

function ConnectorArrow() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <svg
      ref={ref}
      viewBox="0 0 40 24"
      fill="none"
      className="hidden lg:block w-10 h-6 mx-2 shrink-0"
      aria-hidden="true"
    >
      <motion.path
        d="M 2 12 L 30 12 M 26 6 L 34 12 L 26 18"
        stroke="var(--brand-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </svg>
  );
}

function MobileConnector() {
  return (
    <div className="lg:hidden flex justify-center py-3" aria-hidden="true">
      <svg viewBox="0 0 24 32" fill="none" className="w-6 h-8">
        <path
          d="M 12 2 L 12 22 M 6 18 L 12 26 L 18 18"
          stroke="var(--brand-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

export function MIPEvolutionDiagram() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="The Evolution"
            title="From MSP to Managed Intelligence Provider"
            description="The IT industry evolved from managing servers to managing security. The next shift is managing intelligence — and ITECS is leading it in Dallas."
          />
        </ScrollReveal>

        <figure
          role="img"
          aria-label="Three-stage evolution of managed IT services: MSP handles infrastructure and helpdesk, MSSP adds cybersecurity and compliance, MIP adds AI automation, custom AI agents, AI-powered CRM, and employee AI training"
          className="mt-16"
        >
          {/* Desktop: horizontal flow */}
          <div className="hidden lg:flex items-start justify-center">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              const isActive = stage.acronym === "MIP";
              return (
                <div key={stage.acronym} className="flex items-start">
                  <ScrollReveal delay={i * 0.15}>
                    <div
                      className={`relative w-72 p-6 rounded-xl border transition-colors ${
                        isActive
                          ? "border-[var(--border-active)] bg-bg-surface/80"
                          : "border-[var(--border-subtle)] bg-bg-surface/30"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-xs font-medium tracking-wide uppercase bg-brand-accent text-bg-void"
                          initial={{ opacity: 0, y: 5 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 }}
                        >
                          ITECS Today
                        </motion.div>
                      )}

                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-lg"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${stage.color} 12%, transparent)`,
                          }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: stage.color }}
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <span
                            className="block text-xl font-light"
                            style={{ color: stage.color }}
                          >
                            {stage.acronym}
                          </span>
                          <span className="block text-xs text-text-dim">
                            {stage.era}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-sm font-medium text-text-primary mb-2">
                        {stage.label}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed mb-4">
                        {stage.description}
                      </p>

                      <ul className="space-y-1.5">
                        {stage.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-start gap-2 text-xs text-text-dim"
                          >
                            <span
                              className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                              style={{ backgroundColor: stage.color }}
                              aria-hidden="true"
                            />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                  {i < stages.length - 1 && <ConnectorArrow />}
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical stack */}
          <div className="lg:hidden space-y-0">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              const isActive = stage.acronym === "MIP";
              return (
                <div key={stage.acronym}>
                  <ScrollReveal delay={i * 0.1}>
                    <div
                      className={`relative p-5 rounded-xl border ${
                        isActive
                          ? "border-[var(--border-active)] bg-bg-surface/80"
                          : "border-[var(--border-subtle)] bg-bg-surface/30"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute -top-3 left-5 px-3 py-0.5 rounded-full text-xs font-medium tracking-wide uppercase bg-brand-accent text-bg-void">
                          ITECS Today
                        </div>
                      )}

                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="flex items-center justify-center w-9 h-9 rounded-lg"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${stage.color} 12%, transparent)`,
                          }}
                        >
                          <Icon
                            className="h-4 w-4"
                            style={{ color: stage.color }}
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <span
                            className="block text-lg font-light"
                            style={{ color: stage.color }}
                          >
                            {stage.acronym}
                          </span>
                          <span className="block text-xs text-text-dim">
                            {stage.era}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-sm font-medium text-text-primary mb-2">
                        {stage.label}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed mb-3">
                        {stage.description}
                      </p>

                      <ul className="space-y-1.5">
                        {stage.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-start gap-2 text-xs text-text-dim"
                          >
                            <span
                              className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                              style={{ backgroundColor: stage.color }}
                              aria-hidden="true"
                            />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                  {i < stages.length - 1 && <MobileConnector />}
                </div>
              );
            })}
          </div>

          <figcaption className="mt-8 text-center text-sm text-text-dim">
            The managed services evolution — from reactive IT support to
            AI-powered business intelligence
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
