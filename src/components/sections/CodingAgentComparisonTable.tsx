import { CODING_AGENT_COMPARISON } from "@/lib/constants";

// Vendor-neutral OpenAI Codex vs Claude Code comparison table for the
// enterprise coding agents insight article. Semantic <table> (caption +
// scoped headers) wrapped in a horizontally scrollable container so the page
// never overflows on mobile, while the grid stays parseable by search engines.
export function CodingAgentComparisonTable() {
  const { caption, plans, rows } = CODING_AGENT_COMPARISON;

  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to compare both agents →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Dimension
              </th>
              {plans.map((plan) => (
                <th key={plan.name} scope="col" className="px-4 py-3 align-bottom">
                  <span className="block text-base font-semibold text-text-primary">
                    {plan.name}
                  </span>
                  <span className="mt-0.5 block font-mono text-xs font-normal text-itecs-blue">
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
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-secondary"
                >
                  {row.feature}
                </th>
                {row.values.map((value, i) => (
                  <td
                    key={i}
                    className="px-4 py-3 align-top text-text-secondary"
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
