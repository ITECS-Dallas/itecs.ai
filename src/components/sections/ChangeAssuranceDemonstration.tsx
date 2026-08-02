import {
  AlertTriangle,
  BookMarked,
  CalendarClock,
  CheckSquare2,
  FileClock,
  RotateCcw,
  ShieldAlert,
  TestTube2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const scenarioItems = [
  {
    title: "Target compatibility",
    status: "OPEN",
    detail: "The target is documented, but compatibility is not yet live-verified.",
  },
  {
    title: "Rollback",
    status: "DOC-ONLY FLAGGED",
    detail: "A snapshot is named, but the restoration sequence and trigger are incomplete.",
  },
  {
    title: "Functional validation",
    status: "OPEN",
    detail: "The plan does not include a functional backup-and-restore test.",
  },
  {
    title: "Readiness verdict",
    status: "NO-GO",
    detail: "Critical evidence and mitigations are required before the plan can proceed.",
  },
] as const;

const reportSections = [
  {
    title: "Scope and tier",
    detail: "Fictional shared backup-platform upgrade · Critical",
    icon: ShieldAlert,
  },
  {
    title: "Verified and open items",
    detail: "Live observations remain separate from documentation-only evidence.",
    icon: CheckSquare2,
  },
  {
    title: "Pre-flight checklist",
    detail: "Ownership, prerequisites, backup safety, access, and communications.",
    icon: BookMarked,
  },
  {
    title: "Rollback criteria",
    detail: "Explicit trigger, restoration steps, duration, and point of no return.",
    icon: RotateCcw,
  },
  {
    title: "Validation windows",
    detail: "Immediate functional tests plus T+24h and T+72h silent-failure checks.",
    icon: TestTube2,
  },
  {
    title: "Cited sources",
    detail: "Approved internal context and current official vendor requirements.",
    icon: FileClock,
  },
] as const;

export function ChangeAssuranceDemonstration() {
  return (
    <>
      <section className="border-y border-[var(--card-line)] bg-canvas-sunken py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Illustrative Review Demonstration"
            title="A plausible plan is not the same as a ready plan"
            description="This sanitized scenario uses a fictional shared backup-platform upgrade. It is an example of the review logic—not a customer case study or production incident."
          />

          <figure
            role="img"
            aria-label="Illustrative status board for a fictional backup-platform upgrade ending in a no-go verdict"
            className="mt-12"
          >
            <ol className="grid gap-4 lg:grid-cols-4">
              {scenarioItems.map((item, index) => (
                <li
                  key={item.title}
                  value={index + 1}
                  className="chamfer-md border border-[var(--card-line)] bg-card p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-xs font-semibold text-ink-faint">
                      0{index + 1}
                    </span>
                    <span
                      className={`chamfer-sm px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.08em] ${
                        item.status === "NO-GO"
                          ? "border border-red-700/30 bg-red-50 text-red-800"
                          : "border border-amber-700/30 bg-amber-50 text-amber-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-body">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ol>
            <figcaption className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-ink-muted">
              The illustrative review returns NO-GO until critical evidence and
              mitigations are supplied. No real platform detail, ticket,
              topology, client, or session artifact is represented.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="py-24 md:py-32" aria-labelledby="report-preview-heading">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div id="report-preview-heading">
            <SectionHeading
              eyebrow="Readiness Report Preview"
              title="The review ends with a record people can examine"
              description="The report preserves the submitted plan, evidence decisions, sources, readiness verdict, and validation obligations for the exact version reviewed."
            />
          </div>

          <figure
            role="img"
            aria-label="Original sanitized readiness report mockup showing scope, evidence, rollback, validation windows, sources, and validity"
            className="mx-auto mt-12 max-w-6xl"
          >
            <div className="overflow-hidden rounded-[var(--r-section)] border border-[var(--card-line)] bg-card shadow-[var(--elev-2)]">
              <header className="grid gap-5 bg-itecs-navy p-6 text-white md:grid-cols-[1fr_auto] md:items-end md:p-8">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-itecs-blue-pale">
                    Sanitized illustrative report
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">
                    Infrastructure Change Readiness Review
                  </h3>
                  <p className="mt-2 text-sm text-[#b8c8d4]">
                    Fictional shared backup-platform upgrade
                  </p>
                </div>
                <span className="chamfer-sm w-fit border border-red-300/30 bg-red-950/40 px-4 py-2 font-mono text-xs font-semibold tracking-[0.08em] text-red-200">
                  NO-GO
                </span>
              </header>

              <div className="grid gap-5 p-6 md:grid-cols-2 md:p-8 lg:grid-cols-3">
                {reportSections.map(({ title, detail, icon: Icon }) => (
                  <article
                    key={title}
                    className="chamfer-sm border border-[var(--card-line)] bg-canvas-sunken p-5"
                  >
                    <Icon aria-hidden="true" className="h-5 w-5 text-itecs-blue" />
                    <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-body">
                      {detail}
                    </p>
                  </article>
                ))}
              </div>

              <footer className="flex flex-col gap-4 border-t border-[var(--card-line)] bg-canvas-sunken px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
                <div className="flex items-start gap-3">
                  <CalendarClock
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-itecs-blue"
                  />
                  <p className="text-sm leading-relaxed text-ink-body">
                    Valid only for the reviewed plan and for 14 days. It expires
                    earlier if the plan or target version changes.
                  </p>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                  Human authority retained
                </span>
              </footer>
            </div>
            <figcaption className="mt-5 text-center text-sm leading-relaxed text-ink-muted">
              Original HTML/CSS mockup. It is not a screenshot of a real report
              and contains no client or production data.
            </figcaption>
          </figure>

          <aside className="chamfer-md mx-auto mt-8 flex max-w-4xl items-start gap-4 border-l-2 border-amber-600 bg-amber-50 p-5">
            <AlertTriangle
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-800"
            />
            <p className="text-sm leading-relaxed text-ink-body">
              A readiness report applies only to the reviewed plan. It does not
              approve the change or transfer responsibility from the technician,
              change owner, approver, or CAB.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
