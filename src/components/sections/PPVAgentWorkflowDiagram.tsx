"use client";

import { ArrowRight, CheckCircle2, Database, FileText, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PPVAgentWorkflowDiagram({
  steps,
}: {
  steps: readonly { title: string; description: string }[];
}) {
  return (
    <section className="py-24 md:py-32 bg-bg-surface">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Workflow"
            title="Read-Heavy, Write-Controlled PPV Intelligence"
            description="The agent connects approved signals, decomposes variance, models exposure, and routes recommendations for human approval before any financial action."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-12 rounded-xl border border-[var(--border-subtle)] bg-bg-void/60 p-5 md:p-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
              {steps.map((step, index) => {
                const Icon =
                  index === 0
                    ? Database
                    : index === steps.length - 1
                      ? ShieldCheck
                      : index === steps.length - 2
                        ? FileText
                        : CheckCircle2;

                return (
                  <div key={step.title} className="relative">
                    <div className="h-full rounded-lg border border-[var(--border-subtle)] bg-bg-surface/70 p-4">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-brand-accent/20 bg-brand-accent/10">
                        <Icon className="h-5 w-5 text-brand-accent" />
                      </div>
                      <p className="font-mono text-xs uppercase tracking-[0.05em] text-text-dim">
                        0{index + 1}
                      </p>
                      <h3 className="mt-2 text-lg font-light text-text-primary">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {step.description}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-brand-accent/60 lg:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
