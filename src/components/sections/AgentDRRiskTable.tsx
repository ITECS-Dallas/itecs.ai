const rows = [
  {
    risk: "Deletes production data",
    why: "Acts in seconds, at machine speed, with no hesitation",
    control: "Destructive-action approval gates before any delete",
  },
  {
    risk: "Wipes the backups too",
    why: "One over-privileged token reaches production and backups",
    control: "Separate backup blast radius; isolate credentials",
  },
  {
    risk: "Uses a legitimate credential",
    why: "Looks like authorized activity, not an attack",
    control: "Scoped, least-privilege identity — no golden tokens",
  },
  {
    risk: "Acts on unrelated systems",
    why: "Follows any API it finds, beyond its assigned task",
    control: "Restrict which systems and actions each agent can touch",
  },
  {
    risk: "Moves faster than humans react",
    why: "No time to notice the action and intervene",
    control: "Immutable, WORM backups an agent cannot alter",
  },
  {
    risk: "Leaves an unclear trail",
    why: "Hard to reconstruct exactly what it changed",
    control: "Log every agent action, end to end",
  },
  {
    risk: "Recovery never tested",
    why: "Nobody rehearsed an agent-caused loss",
    control: "Regularly test restore from an agent mistake",
  },
];

// Maps each AI-agent disaster-recovery risk to why it is worse than a
// human error and the control that contains it. Semantic <table> in a
// horizontally scrollable container so the page never overflows on mobile.
export function AgentDRRiskTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each control →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[740px] border-collapse text-left text-sm">
          <caption className="sr-only">
            AI agent disaster-recovery risks mapped to why each is worse than a
            human error and the control that contains it — approval gates,
            separate backup blast radius, scoped identity, immutable backups,
            logging, and tested recovery.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Agent DR risk
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Why it is worse than human error
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                The control
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.risk}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.risk}
                </th>
                <td className="px-4 py-3 align-top text-danger">{row.why}</td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {row.control}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
