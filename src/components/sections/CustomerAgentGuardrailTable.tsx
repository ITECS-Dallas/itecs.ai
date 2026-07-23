const rows = [
  {
    guardrail: "One job per agent",
    why: "A broad agent fails in more ways",
    require: "Scope each agent to a single, defined task",
  },
  {
    guardrail: "Limited knowledge & access",
    why: "Agents leak or act beyond their remit",
    require: "Least-privilege data and system access",
  },
  {
    guardrail: "Escalation rules",
    why: "Some issues need a human, fast",
    require: "Written rules for when to hand off to staff",
  },
  {
    guardrail: "Simulation testing & graders",
    why: "You cannot ship what you have not tested",
    require: "Automated graders and realistic test conversations",
  },
  {
    guardrail: "Human review for high-risk actions",
    why: "Refunds, claims, and changes carry risk",
    require: "Approval gates before money or records move",
  },
  {
    guardrail: "Production monitoring",
    why: "Behavior drifts once real customers arrive",
    require: "Live session monitoring and quality sampling",
  },
  {
    guardrail: "Update approval",
    why: "A silent change can break trust overnight",
    require: "Review and approve every change before launch",
  },
];

// Maps each customer-facing AI agent guardrail to why it matters and what to
// require before launch. Semantic <table> in a horizontally scrollable
// container so the page never overflows on mobile.
export function CustomerAgentGuardrailTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read what to require →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Customer-facing AI agent guardrails — one job per agent, limited
            knowledge and access, escalation rules, simulation testing, human
            review for high-risk actions, production monitoring, and update
            approval — mapped to why each matters and what to require before
            launch.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Guardrail
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
                key={row.guardrail}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.guardrail}
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
