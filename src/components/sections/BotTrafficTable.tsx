const rows = [
  {
    type: "Search",
    impact: "Indexes your site; sends visitors and revenue",
    action: "Allow — this is the discovery you want",
  },
  {
    type: "Agent",
    impact: "AI assistants answer using your content",
    action: "Allow if it refers customers; gate if it just extracts",
  },
  {
    type: "Training",
    impact: "Harvests content to train models",
    action: "Block or charge — no traffic value to you",
  },
  {
    type: "Transact",
    impact: "Agents that browse and check out",
    action: "Verify identity; protect checkout from fraud",
  },
  {
    type: "Data collection",
    impact: "Bulk extraction and scraping, often abusive",
    action: "Block and rate-limit; watch for spoofing",
  },
];

// Maps each AI bot / traffic category to its business impact and the policy
// action, for the AI bot traffic article. Semantic <table> in a horizontally
// scrollable container so the page never overflows on mobile.
export function BotTrafficTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each policy →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <caption className="sr-only">
            AI bot traffic categories — Search, Agent, Training, Transact, and
            data collection — mapped to their business impact and the policy
            action to take for each.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Traffic type
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Business impact
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Policy / action
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.type}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.type}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.impact}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {row.action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
