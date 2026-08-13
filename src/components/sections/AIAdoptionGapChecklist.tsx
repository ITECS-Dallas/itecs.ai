const rows = [
  {
    decision: "Frontier users",
    start: "Find people already completing valuable, repeatable work with AI",
    control:
      "Review quality, data handling, and judgment before copying their method",
    evidence:
      "Finished work, time saved, exception rate, and named workflow owner",
  },
  {
    decision: "Shared playbooks",
    start:
      "Turn a proven personal workflow into reusable instructions and examples",
    control:
      "Version the playbook and assign an owner for every material change",
    evidence:
      "Workflow definition, approved examples, test cases, and change log",
  },
  {
    decision: "Context and tools",
    start:
      "Connect only the systems and records needed for the defined outcome",
    control:
      "Use approved sources, least privilege, data boundaries, and access reviews",
    evidence:
      "Source inventory, permission map, connection owner, and access logs",
  },
  {
    decision: "Agent actions",
    start:
      "Separate read, draft, write, send, publish, and transact permissions",
    control:
      "Require human review for high-impact, external, or hard-to-reverse actions",
    evidence:
      "Approval record, action log, exception queue, and rollback procedure",
  },
  {
    decision: "Function expansion",
    start:
      "Pilot one bounded workflow in sales, legal, recruiting, or marketing",
    control:
      "Give each function its own data, policy, quality, and review criteria",
    evidence:
      "Function owner, baseline, acceptance test, and expansion decision",
  },
  {
    decision: "Completed work",
    start:
      "Measure dependable outcomes instead of chats, seats, prompts, or tokens",
    control:
      "Count work only when it meets quality, timeliness, and policy standards",
    evidence:
      "Accepted deliverables, cycle time, rework, exceptions, and business result",
  },
  {
    decision: "Training loop",
    start: "Pair frontier users with teams still limited to basic prompting",
    control:
      "Teach the workflow, test it in role context, and refresh it from failures",
    evidence:
      "Practice completion, adoption by cohort, quality gains, and updated playbook",
  },
];

export function AIAdoptionGapChecklist() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to review every decision →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Seven decisions for closing the AI adoption gap, with a starting
            action, control, and evidence for each.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Decision
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Start
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Control
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Evidence
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.decision}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.decision}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.start}
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.control}
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.evidence}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
