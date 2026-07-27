const rows = [
  {
    capability: "Loss-of-control definition",
    why: "You cannot stop what you have not defined",
    build: "Written trigger criteria for each agent",
  },
  {
    capability: "Money and data map",
    why: "Some agents can do real damage in seconds",
    build: "Inventory of what each agent can move or reach",
  },
  {
    capability: "Throttle control",
    why: "Slowing an agent buys decision time",
    build: "Rate limits you can drop to zero instantly",
  },
  {
    capability: "Suspension switch",
    why: "A full stop must be one action away",
    build: "A tested control that halts an agent at once",
  },
  {
    capability: "Preserved logs",
    why: "You must investigate after you stop",
    build: "Immutable action logs kept off the agent",
  },
  {
    capability: "Incident owners",
    why: "Someone has to pull the trigger",
    build: "Named owners with authority and 2 a.m. access",
  },
  {
    capability: "Shutdown drills",
    why: "An untested switch is a hope, not a control",
    build: "Scheduled rehearsals that prove it works",
  },
];

// Maps each agent kill-switch capability to why it matters and what to build,
// for the AI kill switch article. Semantic <table> in a horizontally
// scrollable container so the page never overflows on mobile.
export function KillSwitchCapabilityTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each control →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Agent emergency-stop capabilities — loss-of-control definition,
            money and data map, throttle control, suspension switch, preserved
            logs, incident owners, and shutdown drills — mapped to why each
            matters and what to build.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Capability
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
                key={row.capability}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.capability}
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
