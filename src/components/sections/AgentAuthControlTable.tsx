const rows = [
  {
    control: "Tool-chain map",
    why: "Risk lives in sequences, not steps",
    todo: "Identify the dangerous call chains",
  },
  {
    control: "Prerequisite order",
    why: "A skipped step breaks the SOP",
    todo: "Require the right tool called first",
  },
  {
    control: "Safe output carry",
    why: "Agents substitute values between steps",
    todo: "Match arguments to prior outputs",
  },
  {
    control: "Cumulative caps",
    why: "Small calls add up to big loss",
    todo: "Tally session spend and exposure",
  },
  {
    control: "Human approval",
    why: "Some steps need a person",
    todo: "Require a recorded approval first",
  },
  {
    control: "Deterministic logging",
    why: "You must prove each decision",
    todo: "Log every allow or deny at the gate",
  },
  {
    control: "Enforcement point",
    why: "Agent code can be bypassed",
    todo: "Enforce at the gateway, not the agent",
  },
];

// Maps each sequence-aware agent authorization control to why it matters and
// what to do, for the agent authorization article. Semantic <table> in a
// horizontally scrollable container so the page never overflows on mobile.
export function AgentAuthControlTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each control →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Sequence-aware AI agent authorization controls — tool-chain map,
            prerequisite order, safe output carry, cumulative caps, human
            approval, deterministic logging, and enforcement point — mapped to
            why each matters and what to do.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Control
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
                key={row.control}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.control}
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
