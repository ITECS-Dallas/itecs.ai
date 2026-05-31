interface AIOperationsConsoleProps {
  className?: string;
}

const agentRuns = [
  { label: "Invoice variance agent", status: "Policy checked", value: "24 sample runs" },
  { label: "Knowledge retrieval", status: "Grounding passed", value: "18 sample runs" },
  { label: "Lead routing workflow", status: "Human review", value: "6 sample runs" },
];

const tickerItems = [
  "Connector health verified",
  "Prompt policy audit complete",
  "Human approval queued",
  "Model-cost guardrail active",
];

const chartPoints = [
  "4,78",
  "38,60",
  "72,66",
  "106,38",
  "140,46",
  "174,24",
  "208,30",
  "242,16",
];

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function AIOperationsConsole({ className }: AIOperationsConsoleProps) {
  return (
    <figure className={joinClasses("relative max-w-full", className)}>
      <figcaption className="sr-only">
        Illustrative ITECS AI Operations Console showing agent runs, a sample
        success-rate metric, a live ticker, and a mini time-series chart.
      </figcaption>

      <div
        aria-hidden="true"
        className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-bg-surface p-4 shadow-e3 [box-shadow:var(--elev-1-inset),var(--elev-3)]"
      >
        <div className="absolute inset-0 bg-[image:var(--glow-hero)] opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:32px_32px] opacity-25" />

        <div className="relative min-w-0 rounded-lg border border-[var(--border-default)] bg-bg-sunken">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--border-default)] px-4 py-3">
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase text-text-tertiary">
                ITECS Managed Intelligence
              </p>
              <h3 className="mt-1 text-sm font-semibold text-text-primary">
                AI Operations Console
              </h3>
            </div>
            <div className="inline-flex shrink-0 items-center gap-2 rounded-pill border border-[var(--border-default)] bg-bg-elevated px-3 py-1 font-mono text-xs uppercase text-brand-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-pill bg-accent-cyan opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-pill bg-accent-cyan" />
              </span>
              Live
            </div>
          </div>

          <div className="grid min-w-0 gap-4 p-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <section className="min-w-0 rounded-md border border-[var(--border-default)] bg-bg-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase text-text-tertiary">
                    Agent runs
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text-primary">
                    Sample operating queue
                  </p>
                </div>
                <span className="shrink-0 rounded-pill border border-[var(--border-default)] bg-bg-elevated px-3 py-1 font-mono text-xs uppercase text-text-tertiary">
                  Illustrative
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {agentRuns.map((run, index) => (
                  <div
                    key={run.label}
                    className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-[var(--border-subtle)] bg-bg-elevated px-3 py-3"
                  >
                    <span
                      className={joinClasses(
                        "h-2.5 w-2.5 rounded-pill",
                        index === 0 && "bg-[var(--viz-1)]",
                        index === 1 && "bg-[var(--viz-2)]",
                        index === 2 && "bg-[var(--viz-5)]",
                      )}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text-primary">{run.label}</p>
                      <p className="mt-0.5 text-xs text-text-tertiary">{run.status}</p>
                    </div>
                    <p className="max-w-20 text-right font-mono text-xs leading-snug text-text-secondary">
                      {run.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid min-w-0 gap-4">
              <div className="min-w-0 rounded-md border border-[var(--border-default)] bg-bg-surface p-4">
                <p className="font-mono text-xs uppercase text-text-tertiary">
                  Success rate
                </p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
                  <p className="font-mono text-4xl font-semibold leading-none text-text-primary">
                    97.4
                    <span className="text-[0.45em] text-brand-accent">%</span>
                  </p>
                  <span className="shrink-0 rounded-pill border border-[var(--success)] bg-bg-elevated px-3 py-1 font-mono text-xs uppercase text-success">
                    Sample
                  </span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-text-tertiary">
                  Illustrative quality gate pass rate, not a published proof point.
                </p>
              </div>

              <div className="min-w-0 rounded-md border border-[var(--border-default)] bg-bg-surface p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono text-xs uppercase text-text-tertiary">
                    Ticker
                  </p>
                  <span className="shrink-0 font-mono text-xs uppercase text-brand-accent">
                    Live pulse
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {tickerItems.map((item) => (
                    <div key={item} className="flex min-w-0 items-center gap-2 text-xs text-text-secondary">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-pill bg-brand-accent" />
                      <span className="min-w-0">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="min-w-0 rounded-md border border-[var(--border-default)] bg-bg-surface p-4 lg:col-span-2">
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase text-text-tertiary">
                    Time series
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text-primary">
                    Sample agent throughput trend
                  </p>
                </div>
                <div className="flex shrink-0 gap-3 font-mono text-xs uppercase text-text-tertiary">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-pill bg-[var(--viz-1)]" />
                    Runs
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-pill bg-[var(--viz-2)]" />
                    Pass
                  </span>
                </div>
              </div>

              <svg
                className="mt-4 h-28 w-full min-w-0 overflow-visible"
                viewBox="0 0 246 96"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 82H242"
                  stroke="var(--border-default)"
                  strokeWidth="1"
                />
                <path
                  d="M4 56H242"
                  stroke="var(--border-subtle)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <path
                  d={`M${chartPoints.join(" L")}`}
                  stroke="var(--viz-2)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 72L38 68L72 48L106 52L140 34L174 42L208 28L242 22"
                  stroke="var(--viz-1)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.75"
                />
                {chartPoints.map((point) => {
                  const [cx, cy] = point.split(",");
                  return (
                    <circle
                      key={point}
                      cx={cx}
                      cy={cy}
                      r="3"
                      fill="var(--viz-2)"
                    />
                  );
                })}
              </svg>
            </section>
          </div>
        </div>
      </div>
    </figure>
  );
}
