const rows = [
  {
    control: "Bounded outcome",
    runRule:
      "One workflow, named inputs, accepted output, and explicit exclusions",
    launchEvidence: "Run contract and test cases",
  },
  {
    control: "Owner and clock",
    runRule:
      "Business owner, operator, checkpoints, stop rules, and maximum duration",
    launchEvidence: "RACI, schedule, and timeout test",
  },
  {
    control: "Dedicated identity",
    runRule:
      "One least-privilege identity per agent; no shared human credential",
    launchEvidence: "Permission map and revocation test",
  },
  {
    control: "Tools and data",
    runRule:
      "Allowlisted tools, approved records, field limits, and network boundaries",
    launchEvidence: "Tool registry and source inventory",
  },
  {
    control: "Approval gates",
    runRule:
      "Pause before sends, writes, purchases, deletes, or regulated decisions",
    launchEvidence: "Action matrix and approver test",
  },
  {
    control: "Cost and retries",
    runRule:
      "Per-run token, tool, retry, and spend ceilings with no infinite loops",
    launchEvidence: "Budget counters and forced-limit test",
  },
  {
    control: "State and memory",
    runRule:
      "Persist only necessary state, scope it, encrypt it, and expire it",
    launchEvidence: "State schema, retention rule, and deletion test",
  },
  {
    control: "Observability",
    runRule:
      "Track progress, errors, approvals, model calls, and every tool action",
    launchEvidence: "Dashboard, alerts, and trace sample",
  },
  {
    control: "Recovery",
    runRule: "Resume safely, avoid duplicate effects, compensate, and escalate",
    launchEvidence: "Checkpoint replay and recovery drill",
  },
  {
    control: "Output acceptance",
    runRule:
      "Hold final work until sources, quality, policy, and freshness pass",
    launchEvidence: "Acceptance rubric and human sign-off",
  },
];

// Maps each long-running-agent control to its operating rule and the evidence
// required before launch. The horizontal container keeps the semantic table
// usable without causing page-level overflow on narrow screens.
export function LongRunningAgentControlTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to review every control →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Ten controls for long-running AI agents, with the operating rule and
            required launch evidence for each.
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
                Run rule
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Launch evidence
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
                  {row.runRule}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {row.launchEvidence}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
