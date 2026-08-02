import {
  AlertTriangle,
  ArrowDown,
  BookOpenCheck,
  FileSearch,
  FolderTree,
  ImageIcon,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const workflowSteps = [
  {
    title: "Ask the operational question",
    description:
      "A technician asks, “Where is the approved firewall replacement procedure for Sample Company?”",
    icon: FileSearch,
  },
  {
    title: "Resolve the working context",
    description:
      "OpsMemory identifies the organization or client, the system, and the task before it searches for an answer.",
    icon: SearchCheck,
  },
  {
    title: "Narrow the candidate set",
    description:
      "The knowledge index, coverage file, category, filename, title, and headings reduce the material that must be verified.",
    icon: FolderTree,
  },
] as const;

const documentSignals = [
  {
    label: "Topic routing",
    detail: "Filename, title, and headings identify likely sections.",
    icon: SearchCheck,
  },
  {
    label: "Exact detail",
    detail:
      "The full Markdown body supplies steps, values, conditions, and surrounding context.",
    icon: BookOpenCheck,
  },
  {
    label: "Visual evidence",
    detail:
      "Relative media links connect the article to its local screenshots, photos, or diagrams.",
    icon: ImageIcon,
  },
] as const;

const manualSteps = [
  "Remember where the information might live",
  "Browse folders",
  "Open and scan documents",
  "Verify the source",
  "Reconstruct the answer and interrupt another person when needed",
] as const;

const assistedSteps = [
  "Ask the operational question",
  "Scope the organization, system, and task",
  "Use headings, body text, and media together",
  "Reconcile the available evidence",
  "Return a cited answer",
] as const;

export function OpsMemoryRetrievalFlow() {
  return (
    <section
      aria-labelledby="opsmemory-retrieval-heading"
      className="bg-canvas-sunken py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div id="opsmemory-retrieval-heading">
          <SectionHeading
            eyebrow="Retrieval Logic"
            title="How OpsMemory Finds the Right Answer"
            description="OpsMemory uses document structure, full article content, and linked media together, then verifies the result against an explicit source hierarchy."
          />
        </div>

        <p className="chamfer-md mx-auto mt-8 max-w-4xl border-l-2 border-itecs-blue bg-card px-6 py-5 text-center font-display text-xl font-semibold leading-snug text-ink md:text-2xl">
          The efficiency comes from reducing the search space, not from skipping
          verification.
        </p>

        <figure className="mt-12" aria-labelledby="retrieval-flow-caption">
          <ol className="grid gap-4 lg:grid-cols-3">
            {workflowSteps.map(({ title, description, icon: Icon }, index) => (
              <li
                key={title}
                className="chamfer-md relative border border-[var(--card-line)] bg-card p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="hex flex h-11 w-11 shrink-0 items-center justify-center bg-brand-subtle text-itecs-blue">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-itecs-blue">
                      Step 0{index + 1}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-body">
                      {description}
                    </p>
                  </div>
                </div>
                {index < workflowSteps.length - 1 && (
                  <ArrowDown
                    aria-hidden="true"
                    className="absolute -bottom-4 left-1/2 z-10 h-7 w-7 -translate-x-1/2 bg-canvas-sunken p-1 text-itecs-blue lg:-right-3.5 lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:-rotate-90"
                  />
                )}
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="chamfer-md border border-[var(--card-line)] bg-card p-6 md:p-8">
              <p className="eyebrow">Use the document signals together</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
                Structure routes the search. The article verifies the detail.
              </h3>
              <ul className="mt-6 grid gap-4">
                {documentSignals.map(({ label, detail, icon: Icon }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="chamfer-sm flex h-10 w-10 shrink-0 items-center justify-center bg-brand-subtle text-itecs-blue">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                        {detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            <article
              className="chamfer-md border border-white/15 p-6 text-white md:p-8"
              style={{ background: "var(--itecs-navy)" }}
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-itecs-blue-pale">
                Verify against the source hierarchy
              </p>
              <ol className="mt-6 space-y-5">
                <li className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-mono text-sm text-itecs-blue-pale">01</span>
                  <div>
                    <h3 className="font-semibold text-white">
                      Approved organization or client documentation
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#c5d2dc]">
                      Consult the approved local source first.
                    </p>
                  </div>
                </li>
                <li className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-mono text-sm text-itecs-blue-pale">02</span>
                  <div>
                    <h3 className="font-semibold text-white">
                      Reusable internal knowledge
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#c5d2dc]">
                      Check approved shared standards and procedures next.
                    </p>
                  </div>
                </li>
                <li className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-mono text-sm text-itecs-blue-pale">03</span>
                  <div>
                    <h3 className="font-semibold text-white">
                      Authoritative official or vendor guidance
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#c5d2dc]">
                      Use it only when local material is missing, stale, or the
                      question is general.
                    </p>
                  </div>
                </li>
              </ol>
            </article>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="chamfer-sm flex items-start gap-4 border border-amber-600/30 bg-amber-50 p-5">
              <AlertTriangle
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
              />
              <div>
                <h3 className="font-semibold text-ink">Evidence checkpoint</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">
                  Missing, stale, or conflicting evidence is identified instead
                  of being silently invented.
                </p>
              </div>
            </article>
            <article className="chamfer-sm flex items-start gap-4 border border-itecs-blue/25 bg-brand-subtle p-5">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-itecs-blue"
              />
              <div>
                <h3 className="font-semibold text-ink">Cited output</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">
                  Return a concise answer with its source path, exact heading,
                  and relevant article or visual. Consequential changes remain
                  under human review.
                </p>
              </div>
            </article>
          </div>

          <figcaption
            id="retrieval-flow-caption"
            className="mt-5 text-center text-sm leading-relaxed text-ink-muted"
          >
            Fictional Sample Company example. The workflow shows how OpsMemory
            narrows, reads, reconciles, and cites approved evidence.
          </figcaption>
        </figure>

        <div className="mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Qualitative Workflow Comparison</p>
            <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
              Less browsing. The same obligation to verify.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-body">
              This is a conceptual workflow and design comparison—not a measured
              customer benchmark.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="chamfer-md border border-[var(--card-line)] bg-card p-6 md:p-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
                Manual knowledge search
              </p>
              <ol className="mt-6 space-y-4">
                {manualSteps.map((step, index) => (
                  <li key={step} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="font-mono text-sm text-ink-faint">
                      0{index + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-ink-body md:text-base">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="chamfer-md border border-itecs-blue/30 bg-brand-subtle p-6 md:p-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-itecs-blue">
                OpsMemory-assisted search
              </p>
              <ol className="mt-6 space-y-4">
                {assistedSteps.map((step, index) => (
                  <li key={step} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="font-mono text-sm text-itecs-blue">
                      0{index + 1}
                    </span>
                    <span className="text-sm font-medium leading-relaxed text-ink md:text-base">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
