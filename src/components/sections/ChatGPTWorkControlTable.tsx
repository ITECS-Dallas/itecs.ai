const rows = [
  {
    capability: "Works across connected apps",
    risk: "Reads and changes real business data",
    control: "RBAC + connector action controls (read-only or a custom set)",
  },
  {
    capability: "Takes actions and writes changes",
    risk: "Unintended edits, sends, or deletions",
    control: "Require write-action approvals; add connector action constraints",
  },
  {
    capability: "Browses the web",
    risk: "Prompt injection and data exfiltration",
    control: "Restrict browsing; require approval on sensitive steps",
  },
  {
    capability: "Runs scheduled / background tasks",
    risk: "Actions run unattended, unnoticed",
    control: "Limit who can schedule agents; review scheduled runs",
  },
  {
    capability: "Creates and publishes Sites",
    risk: "Internal content becomes public",
    control: "Control who can publish; keep Sites private until reviewed",
  },
  {
    capability: "Builds and shares reusable agents",
    risk: "Over-permissioned agents spread",
    control: "RBAC for who can build, publish, and share agents",
  },
  {
    capability: "Model tier (Sol / Luna / Terra)",
    risk: "Reasoning cost and speed vary widely",
    control: "Match tier to task; set spend caps; default to efficient tier",
  },
];

// Maps each ChatGPT Work agent capability to its business risk and the admin
// control that contains it. Semantic <table> (caption + scoped headers) in a
// horizontally scrollable container so the page never overflows on mobile.
export function ChatGPTWorkControlTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each control →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <caption className="sr-only">
            ChatGPT Work agent capabilities mapped to their business risk and the
            admin control that contains each one — connectors, write actions,
            browsing, scheduled tasks, Sites publishing, agent building, and
            model tier.
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
                Risk
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Admin control
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
                <td className="px-4 py-3 align-top text-danger">{row.risk}</td>
                <td className="px-4 py-3 align-top text-text-secondary">
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
