import {
  AlertTriangle,
  CheckCheck,
  CircleSlash2,
  Clock3,
  FileWarning,
  KeyRound,
  ListTodo,
  MessageSquareText,
  Network,
  RotateCcw,
  ShieldCheck,
  TestTube2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reviewAreas = [
  { title: "Prerequisites and compatibility", icon: ListTodo },
  { title: "Dependencies and blast radius", icon: Network },
  { title: "Backup and pre-change safety", icon: ShieldCheck },
  { title: "Rollback trigger, steps, duration, and point of no return", icon: RotateCcw },
  { title: "Maintenance window and communications", icon: MessageSquareText },
  { title: "Post-change functional verification", icon: TestTube2 },
  { title: "Silent-failure checks: immediate, T+24h, and T+72h", icon: Clock3 },
  { title: "Security and access", icon: KeyRound },
  { title: "Logistics, ownership, and escalation", icon: FileWarning },
] as const;

const riskTiers = [
  {
    name: "Routine",
    treatment: "Bounded review",
    examples: "Single-user or endpoint work with trivial reversal.",
    tone: "border-itecs-blue-bright",
  },
  {
    name: "Elevated",
    treatment: "Expanded evidence",
    examples:
      "Server, multi-user, DNS, GPO, firewall-rule, or application changes.",
    tone: "border-amber-600",
  },
  {
    name: "Critical",
    treatment: "Full review and live proof",
    examples:
      "Backup or disaster recovery, identity, hypervisor, core network, storage, certificate authority, or shared-platform work.",
    tone: "border-red-600",
  },
] as const;

const evidenceStatuses = [
  "OPEN",
  "VERIFIED LIVE",
  "DOC-ONLY FLAGGED",
  "MITIGATED",
  "ACCEPTED RISK",
] as const;

const verdicts = [
  { name: "GO", detail: "Required evidence supports the reviewed plan." },
  {
    name: "CONDITIONAL GO",
    detail: "Named conditions must be satisfied and preserved in the record.",
  },
  {
    name: "NO-GO",
    detail: "Critical evidence or mitigation is still missing.",
  },
  {
    name: "TECHNICIAN OVERRIDE RECORDED",
    detail: "The technician's attributable decision and unresolved risk remain visible.",
  },
] as const;

export function ChangeAssuranceDecisionModel() {
  return (
    <>
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Technical Review Surface"
            title="What Change Assurance reviews"
            description="The review follows the submitted plan through readiness, reversal, verification, ownership, and delayed-failure questions instead of returning a generic checklist wall."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviewAreas.map(({ title, icon: Icon }) => (
              <li
                key={title}
                className="chamfer-sm flex items-start gap-4 border border-[var(--card-line)] bg-card p-5"
              >
                <span className="hex flex h-10 w-10 shrink-0 items-center justify-center bg-brand-subtle text-itecs-blue">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="font-semibold leading-relaxed text-ink">
                  {title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-[var(--card-line)] bg-canvas-sunken py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Risk Treatment"
            title="Routine, elevated, and critical changes"
            description="Scope, reversibility, dependencies, and evidence determine treatment. The matrix provides bounded examples, not a certification or universal risk score."
          />

          <dl
            aria-label="Change Assurance risk-tier matrix"
            className="mt-12 grid gap-5 lg:grid-cols-3"
          >
            {riskTiers.map((tier) => (
              <div
                key={tier.name}
                className={`chamfer-md border border-[var(--card-line)] border-t-2 ${tier.tone} bg-card p-6 md:p-7`}
              >
                <dt className="font-display text-2xl font-semibold text-ink">
                  {tier.name}
                </dt>
                <dd className="mt-2 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-itecs-blue">
                  {tier.treatment}
                </dd>
                <dd className="mt-5 text-sm leading-relaxed text-ink-body md:text-base">
                  {tier.examples}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Auditable Decision Record"
            title="Evidence statuses stay separate from verdicts"
            description="Each item keeps its evidence state. The readiness verdict summarizes the reviewed plan without hiding open or accepted risk."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <article className="chamfer-md border border-[var(--card-line)] bg-card p-6 md:p-8">
              <div className="flex items-center gap-3">
                <CheckCheck aria-hidden="true" className="h-6 w-6 text-itecs-blue" />
                <h3 className="font-display text-2xl font-semibold text-ink">
                  Evidence statuses
                </h3>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {evidenceStatuses.map((status) => (
                  <li
                    key={status}
                    className="chamfer-sm border border-[var(--card-line)] bg-canvas-sunken px-4 py-3 font-mono text-xs font-semibold tracking-[0.08em] text-ink"
                  >
                    {status}
                  </li>
                ))}
              </ul>
            </article>

            <article className="chamfer-md border border-white/15 bg-itecs-navy p-6 md:p-8">
              <div className="flex items-center gap-3">
                <AlertTriangle
                  aria-hidden="true"
                  className="h-6 w-6 text-itecs-blue-pale"
                />
                <h3 className="font-display text-2xl font-semibold text-white">
                  Readiness outcomes
                </h3>
              </div>
              <dl className="mt-6 space-y-4">
                {verdicts.map((verdict) => (
                  <div
                    key={verdict.name}
                    className="chamfer-sm border border-white/10 bg-white/[0.04] p-4"
                  >
                    <dt className="font-mono text-xs font-semibold tracking-[0.08em] text-itecs-blue-pale">
                      {verdict.name}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-[#c5d2dc]">
                      {verdict.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </div>

          <aside className="chamfer-md mx-auto mt-8 flex max-w-4xl items-start gap-4 border-l-2 border-amber-600 bg-amber-50 p-5 md:p-6">
            <CircleSlash2
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-800"
            />
            <p className="text-sm leading-relaxed text-ink-body md:text-base">
              An override preserves the technician&apos;s decision and unresolved
              risks in the audit record. It never converts unresolved risk into
              GO.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
