const rows = [
  {
    component: "Models",
    why: "Unknown models mean unknown behavior, licensing, and provenance",
    ask: "Which models, versions, and providers run in production?",
  },
  {
    component: "Datasets",
    why: "Training and RAG data drive bias, privacy, and IP risk",
    ask: "What data trained or feeds this, and can it reach regulated records?",
  },
  {
    component: "Agent frameworks",
    why: "Agents act; the framework defines their reach",
    ask: "What framework runs, and what can it access or execute?",
  },
  {
    component: "Vector databases / RAG",
    why: "Your data lives here; retrieval leaks are real",
    ask: "What is indexed, where is it stored, and who can query it?",
  },
  {
    component: "Dependencies & libraries",
    why: "Supply-chain vulnerabilities inherit straight into AI",
    ask: "What open-source and third-party components are pulled in?",
  },
  {
    component: "Infrastructure",
    why: "Where it runs shapes exposure and compliance scope",
    ask: "What clusters, clouds, and services host the workload?",
  },
  {
    component: "Versions & drift",
    why: "Yesterday's inventory is already wrong today",
    ask: "How is the inventory kept current as models and configs change?",
  },
];

// Maps each AI Bill of Materials component category to why it matters and the
// question a leader should ask before production. Semantic <table> in a
// horizontally scrollable container so the page never overflows on mobile.
export function AIBOMComponentTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each question →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <caption className="sr-only">
            AI Bill of Materials component categories — models, datasets, agent
            frameworks, vector databases, dependencies, infrastructure, and
            drift — mapped to why each matters and the question leaders should
            ask before production.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Component
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Why it matters
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                What to ask
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.component}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.component}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.why}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">{row.ask}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
