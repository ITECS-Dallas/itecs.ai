"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  GraduationCap,
  ServerCog,
  ShieldCheck,
} from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const practiceAreas = [
  {
    label: "AI Consulting",
    href: "/consulting",
    icon: Brain,
    summary:
      "Workflow discovery, readiness scoring, vendor evaluation, and ROI roadmaps before anyone buys another tool.",
    proof: "2-week AI insight sprints",
  },
  {
    label: "AI Training",
    href: "/training",
    icon: GraduationCap,
    summary:
      "Hands-on workshops for ChatGPT, Claude, Gemini, Microsoft Copilot, prompts, role-specific workflows, and safe employee adoption.",
    proof: "Policies plus live practice",
  },
  {
    label: "AI Security",
    href: "/data-audit",
    icon: ShieldCheck,
    summary:
      "Private AI environments, data readiness audits, DLP guardrails, access control, and compliance-aware rollout plans.",
    proof: "Built by a cybersecurity MSP",
  },
  {
    label: "AI DevOps",
    href: "/ai-devops",
    icon: ServerCog,
    summary:
      "CI/CD, model and prompt versioning, RAG pipeline monitoring, cost controls, rollback plans, and managed operations.",
    proof: "Production support after launch",
  },
] as const;

const operatingFlow = [
  "Assess workflows",
  "Secure data",
  "Build agents",
  "Operate pipelines",
  "Train teams",
] as const;

export function AIPracticeAreas() {
  return (
    <section className="border-y border-[var(--border-subtle)] bg-bg-surface/65 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <ScrollReveal>
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
              ITECS AI Practice
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight tracking-normal text-text-primary md:text-5xl">
              One AI division for consulting, training, security, and DevOps.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              itecs.ai focuses on the AI layer of ITECS: deciding where AI
              belongs, protecting the data it touches, deploying it into real
              business systems, and training teams to use it without creating
              new risk.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="relative min-h-[340px] overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-bg-void">
              <Image
                src="/images/services/cybersecurity.webp"
                alt="ITECS command center monitoring secure AI, automation, and infrastructure operations"
                fill
                className="object-cover opacity-75"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bg-void via-bg-void/55 to-bg-void/10" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-300">
                  Built on ITECS managed IT
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {operatingFlow.map((step, index) => (
                    <span
                      key={step}
                      className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-text-secondary"
                    >
                      <span className="font-mono text-brand-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {practiceAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <ScrollReveal key={area.label} delay={index * 0.08}>
                <Link
                  href={area.href}
                  className="group block h-full rounded-lg border border-[var(--border-subtle)] bg-bg-void/55 p-5 transition-colors hover:border-[var(--border-active)]"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-brand-accent/25 bg-brand-accent/10">
                      <Icon
                        className="h-5 w-5 text-brand-accent"
                        aria-hidden="true"
                      />
                    </span>
                    <ArrowRight
                      className="h-4 w-4 text-text-dim transition-transform group-hover:translate-x-1 group-hover:text-brand-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary">
                    {area.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {area.summary}
                  </p>
                  <p className="mt-5 border-t border-[var(--border-subtle)] pt-4 text-xs uppercase tracking-[0.08em] text-text-dim">
                    {area.proof}
                  </p>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
