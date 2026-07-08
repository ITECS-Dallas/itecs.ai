import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Laptop,
  ShieldCheck,
  UserCheck,
  Workflow,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* ---------------------------------------------------------------------------
   AGENT TAXONOMY — the positioning section for the 50-300 employee buyer.
   Distinguishes the two agent investments a mid-market company actually
   shops for: enterprise hosted agents (ITECS-engineered, system-connected,
   human-in-the-loop) vs personal desktop agents (Claude Cowork / Codex /
   Copilot on each employee's machine, deployed through training).
   --------------------------------------------------------------------------- */

const ENTERPRISE_SPECS = [
  {
    icon: Workflow,
    label: "Connects to",
    value: "ERP, CRM, finance, BI, and document systems",
  },
  {
    icon: ShieldCheck,
    label: "Runs in",
    value: "A governed hosted environment with audit trails",
  },
  {
    icon: UserCheck,
    label: "Oversight",
    value: "Human-in-the-loop review portal before any action",
  },
] as const;

const PERSONAL_SPECS = [
  {
    icon: Laptop,
    label: "Runs in",
    value: "Claude Cowork, Codex, and Copilot on each desktop",
  },
  {
    icon: Workflow,
    label: "Built for",
    value: "Role-specific skills, files, and daily workflows",
  },
  {
    icon: ShieldCheck,
    label: "Oversight",
    value: "Usage policy, guardrails, and hands-on training",
  },
] as const;

const ENTERPRISE_EXAMPLES = [
  { label: "PPV Agent · Manufacturing finance", href: "/manufacturing/ppv-agent" },
  {
    label: "Field Exam Analyzer · Asset-based lending",
    href: "/financial-services/field-examination-analyzer",
  },
] as const;

const PERSONAL_EXAMPLES = [
  { label: "Claude Cowork training", href: "/claude-cowork-training" },
  { label: "ChatGPT Codex training", href: "/chatgpt-codex-training" },
  { label: "Microsoft Copilot training", href: "/copilot-training" },
] as const;

export function AgentTaxonomy() {
  return (
    <section id="ai-agents" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Two Kinds of AI Agents"
          title="Enterprise agents and personal agents are different investments."
          description="Most companies evaluating agents are shopping for two different things without a vendor ever saying so. One is an engineered system wired into your core software. The other is a working assistant on every employee's computer. ITECS builds both — and will tell you which one your workflow actually needs."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Enterprise hosted agents — navy plate */}
          <article
            className="chamfer-md relative flex flex-col p-7 md:p-9"
            style={{ background: "var(--itecs-navy)" }}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-itecs-blue-pale">
                Enterprise Agents · Hosted
              </p>
              <span className="hex flex h-11 w-11 shrink-0 items-center justify-center bg-white/10 text-itecs-blue-pale">
                <Building2 aria-hidden="true" className="h-5 w-5" />
              </span>
            </div>

            <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-white md:text-[1.75rem]">
              Engineered agents wired into your business systems.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#aebfcb] md:text-base">
              Built by ITECS AI engineers for a specific operating workflow —
              variance analysis, exam preparation, order intelligence. They read
              from and write to the systems you already run, and every
              consequential action routes through a human review portal before
              it touches the business.
            </p>

            <dl className="mt-7 grid gap-3">
              {ENTERPRISE_SPECS.map((spec) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={spec.label}
                    className="chamfer-sm flex items-start gap-3 border border-white/10 bg-white/5 p-4"
                  >
                    <Icon
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-itecs-blue-bright"
                    />
                    <div>
                      <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-itecs-blue-pale">
                        {spec.label}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-white/90">
                        {spec.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>

            <div className="mt-7 border-t border-white/10 pt-5">
              <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-itecs-blue-pale">
                Flagship builds
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ENTERPRISE_EXAMPLES.map((example) => (
                  <Link
                    key={example.href}
                    href={example.href}
                    className="chamfer-sm inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white/90 transition-colors hover:border-itecs-blue-bright hover:text-white"
                  >
                    {example.label}
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-1 items-end justify-between gap-4">
              <p className="text-xs leading-relaxed text-[#7c8a96]">
                Evaluated by COOs, CFOs, and operations leadership.
              </p>
              <Link
                href="/custom-ai-agents"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-itecs-blue-pale transition-colors hover:text-white"
              >
                Explore custom AI agents
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </article>

          {/* Personal desktop agents — light card */}
          <article className="chamfer-md relative flex flex-col border border-[var(--card-line)] bg-card p-7 md:p-9">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-itecs-blue">
                Personal Agents · Desktop
              </p>
              <span className="hex flex h-11 w-11 shrink-0 items-center justify-center bg-brand-subtle text-itecs-blue">
                <Laptop aria-hidden="true" className="h-5 w-5" />
              </span>
            </div>

            <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-ink md:text-[1.75rem]">
              Working agents on every employee&apos;s computer.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-body md:text-base">
              Designed and executed inside Claude Cowork, Codex, and Microsoft
              Copilot on the individual&apos;s own machine. Each person gets
              agents tuned to their role — drafting, analysis, reporting, file
              work — rolled out through hands-on training instead of another
              unused license.
            </p>

            <dl className="mt-7 grid gap-3">
              {PERSONAL_SPECS.map((spec) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={spec.label}
                    className="chamfer-sm flex items-start gap-3 border border-[var(--card-line)] bg-canvas-sunken p-4"
                  >
                    <Icon
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-itecs-blue-bright"
                    />
                    <div>
                      <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-itecs-blue">
                        {spec.label}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-ink-body">
                        {spec.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>

            <div className="mt-7 border-t border-[var(--card-line)] pt-5">
              <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-itecs-blue">
                Deployed through
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PERSONAL_EXAMPLES.map((example) => (
                  <Link
                    key={example.href}
                    href={example.href}
                    className="chamfer-sm inline-flex items-center gap-2 border border-[var(--card-line)] bg-canvas-sunken px-3 py-2 text-xs font-medium text-ink-body transition-colors hover:border-itecs-blue hover:text-itecs-blue"
                  >
                    {example.label}
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-1 items-end justify-between gap-4">
              <p className="text-xs leading-relaxed text-ink-faint">
                Evaluated by department heads and team leads.
              </p>
              <Link
                href="/training"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-itecs-blue transition-colors hover:text-itecs-blue-bright"
              >
                Explore AI training
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-ink-muted">
          Not sure which one your workflow needs? Most engagements start with
          personal agents and graduate the highest-value workflow into an
          enterprise build.{" "}
          <Link
            href="/assessment"
            className="font-semibold text-itecs-blue transition-colors hover:text-itecs-blue-bright"
          >
            Start with a free AI assessment
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
