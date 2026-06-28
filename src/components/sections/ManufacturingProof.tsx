"use client";

import { Check, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import type { ManufacturingProofGroup } from "@/lib/constants";

export function ManufacturingPressure({
  groups,
  eyebrow = "Operating pressure",
  title = "Manufacturing AI Starts With Margin, Throughput, and Risk",
  description = "The first step is not picking a model. It is identifying the operating decisions where finance and plant signals are late, fragmented, or too manual to trust at speed.",
}: {
  groups: readonly ManufacturingProofGroup[];
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-24 md:py-32 bg-bg-surface">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {groups.map((group, index) => (
            <ScrollReveal key={group.title} delay={index * 0.08}>
              <div className="h-full rounded-xl border border-[var(--border-subtle)] bg-bg-void/50 p-6">
                <h3 className="text-xl font-light text-text-primary">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {group.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {group.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ManufacturingAssessment({
  eyebrow,
  title,
  description,
  steps,
  primaryCta,
  primaryCtaHref,
}: {
  eyebrow: string;
  title: string;
  description: string;
  steps: readonly { title: string; description: string }[];
  primaryCta: string;
  primaryCtaHref: string;
}) {
  return (
    <section className="py-24 md:py-32 bg-bg-surface">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 0.08}>
              <div className="flex h-full gap-5 rounded-xl border border-[var(--border-subtle)] bg-bg-void/50 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border-active)] bg-brand-accent/10 font-mono text-lg font-semibold text-brand-accent">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.35}>
          <div className="mt-10 text-center">
            <Button
              href={primaryCtaHref}
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              {primaryCta}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function ManufacturingGovernance({
  groups,
  eyebrow = "Governance",
  title = "Built for Manufacturing Controls",
  description = "ITECS designs manufacturing AI around the client's existing IT, security, approval, and finance control boundaries.",
}: {
  groups: readonly ManufacturingProofGroup[];
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {groups.map((group, index) => (
            <ScrollReveal key={group.title} delay={index * 0.08}>
              <div className="h-full rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-6">
                <h3 className="text-xl font-light text-text-primary">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {group.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {group.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
