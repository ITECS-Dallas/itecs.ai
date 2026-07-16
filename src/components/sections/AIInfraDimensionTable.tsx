const rows = [
  {
    dimension: "Fluid / elastic compute",
    stress: "One prompt can fan out into hundreds of parallel actions",
    question: "Does compute scale up and down with unpredictable agent bursts?",
  },
  {
    dimension: "Agent identity & permissions",
    stress: "Agents act across systems; shared credentials become a breach vector",
    question: "Does every agent have a scoped identity and centrally managed access?",
  },
  {
    dimension: "Audit trails & observability",
    stress: "Autonomous, multistep actions must be traceable end to end",
    question: "Can you see and log every action an agent takes?",
  },
  {
    dimension: "Unified data access",
    stress: "Agents need governed data, not scattered, inconsistent silos",
    question: "Can agents reach the data they need through governed access?",
  },
  {
    dimension: "Edge / hybrid placement",
    stress: "Latency, data residency, and cost dictate where agents run",
    question: "Is each workload placed deliberately, not by default?",
  },
  {
    dimension: "Power & cost visibility",
    stress: "Inference tax and power draw quietly blow up budgets",
    question: "Do you see real per-agent cost and power before scaling?",
  },
];

// Maps each agentic AI infrastructure dimension to why autonomous agents stress
// it and the readiness question a leader should answer before production.
// Semantic <table> in a horizontally scrollable container so the page never
// overflows on mobile.
export function AIInfraDimensionTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each readiness question →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[740px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Agentic AI infrastructure dimensions — fluid compute, agent identity
            and permissions, audit and observability, unified data access, edge
            or hybrid placement, and power and cost visibility — mapped to why
            autonomous agents stress each and the readiness question to answer
            before production.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Dimension
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Why agents stress it
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Readiness question
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.dimension}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.dimension}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.stress}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {row.question}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
