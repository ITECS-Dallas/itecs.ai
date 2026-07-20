const rows = [
  {
    criterion: "Usage visibility",
    why: "You cannot govern what you cannot see",
    require: "Per-user, per-model, per-product usage in one console",
  },
  {
    criterion: "Cost transparency",
    why: "Usage-based bills surprise finance",
    require: "A clear rate card and a real-time cost API",
  },
  {
    criterion: "Evals",
    why: "Quality must be measured, not assumed",
    require: "Repeatable evals tied to your actual tasks",
  },
  {
    criterion: "Latency",
    why: "Slow AI kills adoption and inflates cost",
    require: "Documented latency targets and live monitoring",
  },
  {
    criterion: "Reliability",
    why: "Downtime stalls production workflows",
    require: "Uptime SLAs and public status transparency",
  },
  {
    criterion: "Model routing",
    why: "The wrong model on easy work wastes money",
    require: "Route by task; default to the efficient model",
  },
  {
    criterion: "Spend limits",
    why: "Agents can burn budget unattended",
    require: "Hard caps at workspace, group, and user level",
  },
  {
    criterion: "Review workflows",
    why: "Overspend needs a human gate",
    require: "Requests, approvals, and per-team budgets",
  },
  {
    criterion: "Cost per accepted outcome",
    why: "Tokens are not value; accepted work is",
    require: "Measure cost per outcome a human accepted",
  },
];

// Maps each AI-platform evaluation criterion to why it matters and what to
// require from the vendor before budgets scale. Semantic <table> in a
// horizontally scrollable container so the page never overflows on mobile.
export function AISpendCriteriaTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read what to require →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <caption className="sr-only">
            AI platform evaluation criteria — usage visibility, cost
            transparency, evals, latency, reliability, model routing, spend
            limits, review workflows, and cost per accepted outcome — mapped to
            why each matters and what to require from the vendor before budgets
            scale.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Criterion
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Why it matters
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                What to require
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.criterion}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.criterion}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.why}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {row.require}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
