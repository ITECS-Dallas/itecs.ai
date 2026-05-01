"use client";

import {
  Activity,
  GitBranch,
  Lock,
  Rocket,
  Wrench,
} from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const stages = [
  {
    icon: GitBranch,
    label: "Version",
    detail: "Prompts, code, models, and retrieval settings tracked together",
  },
  {
    icon: Lock,
    label: "Secure",
    detail: "Secrets, access, and environments separated before release",
  },
  {
    icon: Wrench,
    label: "Validate",
    detail: "Regression tests, retrieval checks, and approval gates",
  },
  {
    icon: Rocket,
    label: "Deploy",
    detail: "Controlled rollout with rollback paths and release notes",
  },
  {
    icon: Activity,
    label: "Monitor",
    detail: "Latency, cost, drift, errors, and answer quality watched live",
  },
] as const;

const telemetry = [
  ["prompt", "v42 approved"],
  ["retrieval", "97% cited"],
  ["latency", "1.8s p95"],
  ["budget", "under cap"],
] as const;

export function AIDevOpsWorkflowDiagram() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(rgba(6,182,212,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
              AI DevOps Pipeline
            </p>
            <h2 className="mt-3 text-3xl font-light leading-tight tracking-normal text-text-primary md:text-4xl">
              Production AI needs release control, observability, and rollback.
            </h2>
          </div>
        </ScrollReveal>

        <figure
          role="img"
          aria-label="AI DevOps workflow diagram showing version control, security, validation, deployment, and monitoring for production AI systems"
          className="mt-14"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <ScrollReveal key={stage.label} delay={index * 0.08}>
                  <div className="relative h-full rounded-lg border border-[var(--border-subtle)] bg-bg-surface/80 p-5">
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
                      {stage.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {stage.detail}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.45}>
            <div className="mt-8 rounded-lg border border-[var(--border-subtle)] bg-bg-void/80 p-5 font-mono text-sm">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-text-dim">$ deploy ai-stack</span>
                <span className="rounded bg-emerald-400/10 px-2 py-1 text-emerald-300">
                  checks passed
                </span>
                <span className="rounded bg-brand-accent/10 px-2 py-1 text-brand-accent">
                  production healthy
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                {telemetry.map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-md border border-white/10 bg-white/[0.03] p-3"
                  >
                    <p className="text-xs uppercase tracking-[0.08em] text-text-dim">
                      {label}
                    </p>
                    <p className="mt-2 text-text-primary">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <figcaption className="mt-8 text-center text-sm text-text-dim">
            ITECS manages the operating layer around AI systems so each release
            is tracked, tested, deployed, observed, and recoverable.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
