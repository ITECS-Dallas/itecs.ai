import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* ---------------------------------------------------------------------------
   ADOPTION JOURNEY — the self-locate ladder for the mid-market buyer.
   Five stages matching how 50-300 employee companies actually progress:
   secure the assistants they already bought → train and govern → personal
   desktop agents → enterprise hosted agents → managed AI operations.
   Each stage names the signal that you're standing on it and links to the
   service line that serves it.
   --------------------------------------------------------------------------- */

const STAGES = [
  {
    stage: "01",
    title: "Secure the tools you already bought",
    description:
      "Copilot, ChatGPT, and Claude seats with data rules, DLP, and private environments instead of ungoverned free accounts.",
    signal: "Employees use AI daily. Nobody owns it.",
    href: "/data-audit",
    linkLabel: "Data & AI readiness audit",
  },
  {
    stage: "02",
    title: "Train teams and set policy",
    description:
      "Role-based training, approved use cases, and prompt libraries so licenses turn into measurable usage.",
    signal: "Licenses are paid for. Adoption is uneven.",
    href: "/training",
    linkLabel: "AI training programs",
  },
  {
    stage: "03",
    title: "Personal agents on every desktop",
    description:
      "Agents built in Claude Cowork and Codex on each employee's machine — skills and workflows tuned to their role.",
    signal: "Power users have outgrown the chat window.",
    href: "/claude-cowork-training",
    linkLabel: "Claude Cowork rollout",
  },
  {
    stage: "04",
    title: "Enterprise agents in your systems",
    description:
      "ITECS-engineered agents connected to ERP, CRM, and finance data, with a human-in-the-loop review portal.",
    signal: "One workflow is worth automating end to end.",
    href: "/custom-ai-agents",
    linkLabel: "Custom AI agents",
  },
  {
    stage: "05",
    title: "Managed AI operations",
    description:
      "Monitoring, prompt and model versioning, cost control, and quarterly optimization once AI is business-critical.",
    signal: "The business now depends on what you built.",
    href: "/managed-intelligence-provider",
    linkLabel: "Managed intelligence",
  },
] as const;

export function AdoptionJourney() {
  return (
    <section
      id="adoption-journey"
      className="border-y border-[var(--card-line)] bg-canvas-sunken py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="The Adoption Curve"
          title="Where is your organization on the AI journey?"
          description="Most 50-300 employee companies move through the same five stages. Find yours — each stage maps to a service line with a defined starting point, not an open-ended engagement."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-5 xl:gap-0">
          {STAGES.map((item) => (
            <Link
              key={item.stage}
              href={item.href}
              className="group flex flex-col border-t-2 border-[var(--card-line)] bg-transparent px-1 pt-4 pb-6 transition-colors hover:border-itecs-blue-bright xl:px-5 xl:first:pl-1 xl:last:pr-1"
            >
              <span className="font-mono text-[11px] font-semibold text-itecs-blue-bright">
                Stage {item.stage}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                {item.description}
              </p>
              <p className="mt-4 border-l-2 border-itecs-blue-bright pl-3 text-xs leading-relaxed text-ink-body">
                <span className="font-mono font-semibold uppercase tracking-[0.08em] text-ink-faint">
                  You&apos;re here if:
                </span>{" "}
                {item.signal}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-itecs-blue transition-colors group-hover:text-itecs-blue-bright">
                {item.linkLabel}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
