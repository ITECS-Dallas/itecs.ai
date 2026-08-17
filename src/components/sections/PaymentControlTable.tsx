const rows = [
  {
    control: "Agent identity and intent",
    why: "A payment is safe only if you know who and why",
    build: "Verified agent identity tied to a mandate",
  },
  {
    control: "Scope limits",
    why: "An unbounded agent can pay anyone, any amount",
    build: "Per-agent caps on payee, amount, and type",
  },
  {
    control: "Approval thresholds",
    why: "Large or unusual payments need a human",
    build: "Value and risk thresholds that force review",
  },
  {
    control: "Separation of duties",
    why: "The initiator should not also approve",
    build: "Different agents or people for each step",
  },
  {
    control: "Auditable trails",
    why: "You must reconstruct every payment later",
    build: "Immutable logs the agent cannot alter",
  },
  {
    control: "Fraud-control testing",
    why: "Attackers target the reasoning layer",
    build: "Red-team tests against prompt injection",
  },
  {
    control: "Capability ceiling",
    why: "Recommend, initiate, and complete differ",
    build: "A set line for how far each agent goes",
  },
];

// Maps each payment-agent control to why it matters and what to build, for the
// AI payment agents article. Semantic <table> in a horizontally scrollable
// container so the page never overflows on mobile.
export function PaymentControlTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each control →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <caption className="sr-only">
            AI payment-agent controls — agent identity and intent, scope limits,
            approval thresholds, separation of duties, auditable trails,
            fraud-control testing, and a capability ceiling — mapped to why each
            matters and what to build.
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
                What to build
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
                  {row.build}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
