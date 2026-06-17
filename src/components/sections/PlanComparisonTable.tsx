import { CLAUDE_PLAN_COMPARISON } from "@/lib/constants";

// Side-by-side Claude plan comparison table for the plan-comparison insight
// article. Renders a semantic <table> (caption + scoped headers) wrapped in a
// horizontally scrollable container so the page never overflows on mobile,
// while the table itself stays a single scannable grid Google can parse.
export function PlanComparisonTable() {
  const { caption, plans, rows } = CLAUDE_PLAN_COMPARISON;

  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to compare all five plans →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--border-default)] bg-bg-surface">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-bg-surface px-4 py-3 font-medium text-text-dim"
              >
                Plan
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  scope="col"
                  className={`px-4 py-3 align-bottom ${
                    plan.highlight ? "bg-brand-accent/10" : ""
                  }`}
                >
                  <span
                    className={`block text-base font-semibold ${
                      plan.highlight ? "text-brand-accent" : "text-text-primary"
                    }`}
                  >
                    {plan.name}
                  </span>
                  <span className="mt-0.5 block text-xs font-normal text-text-dim">
                    {plan.tagline}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.feature}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-bg-surface px-4 py-3 font-medium text-text-secondary"
                >
                  {row.feature}
                </th>
                {row.values.map((value, i) => (
                  <td
                    key={i}
                    className={`px-4 py-3 align-top text-text-secondary ${
                      plans[i]?.highlight ? "bg-brand-accent/[0.06]" : ""
                    }`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
