const rows = [
  {
    practice: "Task-specific blind data",
    why: "Public scores do not predict your task",
    todo: "Test on held-out data the model never saw",
  },
  {
    practice: "Contamination checks",
    why: "Models memorize benchmarks in training",
    todo: "Confirm the test set is not in training",
  },
  {
    practice: "Common metrics",
    why: "Different scales cannot be compared",
    todo: "Score every model the same way",
  },
  {
    practice: "Your domain datasets",
    why: "Generic tests miss your real inputs",
    todo: "Add data from your actual workflow",
  },
  {
    practice: "Claims vs approval",
    why: "A vendor benchmark is marketing",
    todo: "Make deployment a separate decision",
  },
  {
    practice: "Documented uncertainty",
    why: "One number hides the error bars",
    todo: "Record confidence and failure modes",
  },
  {
    practice: "Post-deployment monitoring",
    why: "Models drift once real data arrives",
    todo: "Keep scoring the model after go-live",
  },
];

// Maps each model-evaluation practice to why it matters and what to do, for the
// AI model evaluation article. Semantic <table> in a horizontally scrollable
// container so the page never overflows on mobile.
export function EvaluationPracticeTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each practice →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <caption className="sr-only">
            AI model evaluation practices — task-specific blind data,
            contamination checks, common metrics, your domain datasets, claims
            versus approval, documented uncertainty, and post-deployment
            monitoring — mapped to why each matters and what to do.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Practice
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Why it matters
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                What to do
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.practice}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.practice}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.why}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {row.todo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
