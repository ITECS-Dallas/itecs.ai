"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Ban,
  KeyRound,
  Fingerprint,
  Terminal,
  Server,
} from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const pipeline = [
  {
    icon: KeyRound,
    label: "1Password Vault",
    detail: "Secrets stored encrypted",
    gate: false,
  },
  {
    icon: Fingerprint,
    label: "Biometric Approval",
    detail: "Touch ID / Windows Hello",
    gate: true,
  },
  {
    icon: Terminal,
    label: "Agent / CLI / IDE",
    detail: "Secret injected at runtime",
    gate: false,
  },
  {
    icon: Server,
    label: "External Systems",
    detail: "PSA · Hypervisors · PAX8",
    gate: false,
  },
];

function Connector({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <div className="flex md:hidden items-center justify-center h-6" aria-hidden="true">
        <span className="h-6 w-px bg-itecs-blue-bright" />
      </div>
    );
  }
  return (
    <div className="hidden md:flex items-center justify-center w-8 shrink-0 pt-8" aria-hidden="true">
      <span className="h-px w-8 bg-itecs-blue-bright" />
    </div>
  );
}

export function SecretsFlowDiagram() {
  return (
    <section className="not-prose py-4">
      <figure
        role="img"
        aria-label="Architecture of secure secret injection for AI agents. The AI model receives only prompts, instructions, and results — never the secret. Separately, the secret flows in one path: from the 1Password vault, through a biometric approval gate using Touch ID or Windows Hello, into the agent, CLI, or IDE process where it is injected at runtime, and finally into external systems such as the PSA, datacenter hypervisors, and PAX8. The secret never enters the language model's context."
      >
        {/* The LLM lane — deliberately separated from the secret path */}
        <ScrollReveal>
          <div className="chamfer-md border border-[var(--card-line)] border-l-2 border-l-itecs-blue bg-card p-5">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center chamfer-sm bg-brand-subtle text-itecs-blue">
                  <Cpu className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-base font-semibold text-ink">
                    The AI Model (LLM)
                  </p>
                  <p className="text-sm text-ink-muted">
                    Reads your request and the results — decides which tool to call.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 chamfer-sm bg-danger/10 px-3 py-1.5 text-xs font-medium text-danger">
                <Ban className="h-3.5 w-3.5" aria-hidden="true" />
                Secret never enters the model
              </span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="my-4 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
            ↓ Prompts &amp; results only — the secret travels a separate path ↓
          </p>
        </ScrollReveal>

        {/* The secret path */}
        <div className="flex flex-col items-stretch md:flex-row md:items-start md:justify-center">
          {pipeline.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <div key={stage.label} className="contents">
                <ScrollReveal delay={0.15 + i * 0.1}>
                  <motion.div
                    className={`flex items-center gap-4 md:flex-col md:items-center md:text-center md:max-w-[150px] chamfer-md border bg-card p-4 md:p-4 ${
                      stage.gate
                        ? "border-itecs-blue bg-brand-subtle"
                        : "border-[var(--card-line)]"
                    }`}
                    whileHover={{
                      borderColor: "var(--itecs-blue)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center chamfer-sm ${
                        stage.gate
                          ? "bg-itecs-blue text-white"
                          : "bg-brand-subtle text-itecs-blue"
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="md:mt-3">
                      <p className="text-sm font-semibold text-ink">
                        {stage.label}
                      </p>
                      <p className="mt-0.5 text-xs leading-snug text-ink-muted">
                        {stage.detail}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
                {i < pipeline.length - 1 && (
                  <>
                    <Connector />
                    <Connector vertical />
                  </>
                )}
              </div>
            );
          })}
        </div>

        <ScrollReveal delay={0.5}>
          <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-itecs-blue">
            Encrypted secret — injected at runtime, never printed
          </p>
        </ScrollReveal>

        <figcaption className="mt-5 text-center text-sm italic text-ink-muted">
          The AI agent orchestrates the work, but the secret flows only from
          1Password — through a biometric approval — into the tool that makes the
          call. It never touches the LLM.
        </figcaption>
      </figure>
    </section>
  );
}
