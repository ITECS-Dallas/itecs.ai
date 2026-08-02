import {
  AlertOctagon,
  ArrowDown,
  BookOpenCheck,
  FileInput,
  GitBranch,
  ListChecks,
  Radar,
  SearchCheck,
  ShieldQuestion,
  TriangleAlert,
  Undo2,
} from "lucide-react";
import { CHANGE_ASSURANCE_SERVICE } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

const failurePatterns = [
  {
    title: "Overlooked prerequisites",
    description:
      "Version compatibility and exact migration requirements are assumed instead of checked against current official guidance.",
    icon: SearchCheck,
  },
  {
    title: "Hidden dependencies",
    description:
      "The submitted scope misses upstream, downstream, shared-platform, identity, or access relationships that expand the blast radius.",
    icon: GitBranch,
  },
  {
    title: "Rollback that cannot run",
    description:
      "The plan says “roll back” without defining the trigger, steps, duration, restored state, or point of no return.",
    icon: Undo2,
  },
  {
    title: "Silent failures after the window",
    description:
      "Immediate checks look healthy, but delayed jobs, authentication paths, backups, or dependent workflows fail later.",
    icon: Radar,
  },
] as const;

const stageIcons = [FileInput, TriangleAlert, BookOpenCheck, ShieldQuestion, ListChecks] as const;

const evidenceLanes = [
  {
    title: "Environment facts",
    label: "Live observation",
    description:
      "Technician-reported live observations are required for critical prerequisites. The agent records what the technician inspected and reported.",
    tone: "border-itecs-blue-bright",
  },
  {
    title: "Requirements",
    label: "Official source",
    description:
      "Current official vendor guidance establishes supported versions, prerequisites, upgrade paths, and known issues.",
    tone: "border-itecs-blue",
  },
  {
    title: "Context",
    label: "Approved documentation",
    description:
      "Approved company and OpsMemory documentation supplies history and operating context, but may be stale and does not prove current live state.",
    tone: "border-amber-600",
  },
  {
    title: "Unverified memory or assumption",
    label: "Cannot close a critical item",
    description:
      "A remembered value or unsupported assumption stays open until stronger evidence or an explicit mitigation is recorded.",
    tone: "border-red-600",
  },
] as const;

export function ChangeAssuranceReviewFlow() {
  return (
    <>
      <section className="border-y border-[var(--card-line)] bg-canvas-sunken py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Change Failure Modes"
            title="Why technically plausible change plans still fail"
            description="ITECS Change Assurance is designed to expose hidden risk before work begins. It does not eliminate risk or promise that every outage can be avoided."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {failurePatterns.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="chamfer-md border border-[var(--card-line)] bg-card p-6"
              >
                <span className="hex flex h-11 w-11 items-center justify-center bg-brand-subtle text-itecs-blue">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-body">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32" aria-labelledby="review-process-heading">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div id="review-process-heading">
            <SectionHeading
              eyebrow="Constructively Adversarial Review"
              title="How the review works"
              description="The agent asks focused question batches, distinguishes evidence types, and keeps every unresolved critical item visible through the final decision."
            />
          </div>

          <figure
            role="img"
            aria-label="Five-stage IT change readiness review from plan intake through readiness verdict and report"
            className="mt-12"
          >
            <ol className="grid gap-4 lg:grid-cols-5">
              {CHANGE_ASSURANCE_SERVICE.howItWorks.map((stage, index) => {
                const Icon = stageIcons[index];
                return (
                  <li
                    key={stage.step}
                    value={index + 1}
                    className="chamfer-md relative border border-[var(--card-line)] bg-card p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="hex flex h-10 w-10 items-center justify-center bg-brand-subtle text-itecs-blue">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs font-semibold text-ink-faint">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                      {stage.step}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-body">
                      {stage.description}
                    </p>
                    {index < CHANGE_ASSURANCE_SERVICE.howItWorks.length - 1 && (
                      <ArrowDown
                        aria-hidden="true"
                        className="absolute -bottom-4 left-1/2 z-10 h-7 w-7 -translate-x-1/2 bg-canvas p-1 text-itecs-blue lg:-right-3.5 lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:-rotate-90"
                      />
                    )}
                  </li>
                );
              })}
            </ol>
            <figcaption className="mt-5 text-center text-sm text-ink-muted">
              The process records the submitted plan and evidence; it does not
              authorize or perform the infrastructure change.
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className="bg-canvas-sunken py-24 md:py-32"
        aria-labelledby="evidence-model-heading"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div id="evidence-model-heading">
            <SectionHeading
              eyebrow="Evidence Model"
              title="Different evidence earns different treatment"
              description="A current live fact, an official requirement, useful operating context, and an assumption are not interchangeable. Change Assurance keeps those lanes distinct."
            />
          </div>

          <figure
            role="img"
            aria-label="Four evidence lanes converging on a readiness decision gate"
            className="mt-12"
          >
            <div className="grid gap-5 lg:grid-cols-4">
              {evidenceLanes.map((lane, index) => (
                <article
                  key={lane.title}
                  className={`chamfer-md border border-[var(--card-line)] border-t-2 ${lane.tone} bg-card p-6`}
                >
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                    Evidence lane 0{index + 1}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                    {lane.title}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-itecs-blue">
                    {lane.label}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-body">
                    {lane.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mx-auto flex max-w-4xl flex-col items-center">
              <ArrowDown aria-hidden="true" className="my-5 h-8 w-8 text-itecs-blue" />
              <div className="chamfer-md w-full border-l-2 border-itecs-blue-bright bg-itecs-navy p-6 text-center md:p-8">
                <AlertOctagon
                  aria-hidden="true"
                  className="mx-auto h-7 w-7 text-itecs-blue-pale"
                />
                <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                  Readiness decision gate
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#c5d2dc] md:text-base">
                  Critical evidence must be closed, mitigated, or preserved as
                  explicit accepted risk. Unresolved risk never becomes GO.
                </p>
              </div>
            </div>
            <figcaption className="mt-5 text-center text-sm leading-relaxed text-ink-muted">
              This evidence model does not collapse unlike facts into a
              misleading universal numerical confidence score.
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
