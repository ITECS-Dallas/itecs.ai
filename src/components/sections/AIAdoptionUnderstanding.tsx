"use client";

import {
  ArrowRight,
  Bot,
  ClipboardList,
  DollarSign,
  GraduationCap,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const journeySteps = [
  {
    label: "Understand",
    detail: "Find the workflows, risks, and tools already in play.",
    icon: Lightbulb,
  },
  {
    label: "Design",
    detail: "Set the AI agenda, priorities, and guardrails.",
    icon: ClipboardList,
  },
  {
    label: "Implement",
    detail: "Configure apps, automate workflows, or build only when needed.",
    icon: Wrench,
  },
  {
    label: "Train",
    detail: "Teach your team how to use AI safely in real work.",
    icon: GraduationCap,
  },
  {
    label: "Test",
    detail: "Validate quality, security, usage, and ROI before scaling.",
    icon: Rocket,
  },
] as const;

const adoptionPrinciples = [
  {
    title: "Start with the work, not the model",
    description:
      "We map where time, errors, rework, and handoffs actually happen before recommending any AI tool.",
    icon: ClipboardList,
  },
  {
    title: "Use proven AI apps when they are enough",
    description:
      "ChatGPT, Claude, Gemini, Microsoft Copilot, and similar tools can reduce hours of manual work when they are configured, governed, and taught properly.",
    icon: Bot,
  },
  {
    title: "Protect data before adoption spreads",
    description:
      "We define what can be shared, where AI can run, who has access, and which workflows require private or controlled environments.",
    icon: ShieldCheck,
  },
  {
    title: "Keep costs visible",
    description:
      "Consulting time is tracked clearly. Scoped builds are quoted separately so owners know what is advisory work and what is a project.",
    icon: DollarSign,
  },
] as const;

export function AIAdoptionUnderstanding() {
  return (
    <section className="border-y border-[var(--border-subtle)] bg-bg-surface/45 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <ScrollReveal>
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
              Understanding AI Adoption
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight tracking-normal text-text-primary md:text-5xl">
              AI should feel guided, secure, and financially predictable.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
              Business AI does not have to start with a custom agent, a new
              software platform, or a six-month transformation program. ITECS
              helps owners decide what can be handled with properly configured
              AI applications, what needs workflow automation, and what truly
              justifies a custom build.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-bg-void/80 p-6">
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-300">
                How ITECS Prices AI Adoption
              </p>
              <h3 className="mt-3 text-2xl font-light tracking-normal text-text-primary">
                Consulting first. Projects only when the scope is clear.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                We can work hourly, but most clients prefer a prepaid retainer:
                a block of consulting time your team can use at its discretion.
                There is no minimum monthly usage and no expiration date.
              </p>
              <div className="mt-5 space-y-3 text-sm text-text-secondary">
                {[
                  "Every hour consumed is documented and transparent.",
                  "Retainer time can cover discovery, tool setup, training, testing, and advisory work.",
                  "Flat-rate fees are reserved for scoped projects such as AI agents or secure platform integrations.",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <ArrowRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-5">
          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.label} delay={index * 0.06}>
                <div className="h-full rounded-lg border border-[var(--border-subtle)] bg-bg-void/55 p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-text-dim">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      className="h-5 w-5 text-brand-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-5 text-base font-medium text-text-primary">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {step.detail}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {adoptionPrinciples.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <ScrollReveal key={principle.title} delay={0.12 + index * 0.06}>
                <div className="h-full rounded-lg border border-[var(--border-subtle)] bg-bg-surface p-5">
                  <Icon
                    className="h-5 w-5 text-brand-accent"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 text-base font-medium text-text-primary">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {principle.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
