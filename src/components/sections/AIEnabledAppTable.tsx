const rows = [
  {
    category: "SaaS apps",
    capability: "Built-in agents that act on your records",
    control: "Review vendor AI settings; disable or scope agentic features",
  },
  {
    category: "Browsers",
    capability: "AI that browses and acts on pages for you",
    control: "Control AI browser use; restrict what it can reach",
  },
  {
    category: "Developer tools",
    capability: "Coding agents that edit and run code",
    control: "Sandbox agent runs; require approval on writes",
  },
  {
    category: "Plugins & extensions",
    capability: "Third-party code gaining tool access",
    control: "Approve extensions; audit their permissions",
  },
  {
    category: "MCP servers",
    capability: "Agents connecting to your tools and data",
    control: "Inventory MCP connections; scope and log each",
  },
  {
    category: "Internal apps",
    capability: "Home-grown tools wired to AI",
    control: "Register them; require attribution logs",
  },
  {
    category: "Identities & tokens",
    capability: "Agents acting under human credentials",
    control: "Give each agent its own scoped identity",
  },
];

// Maps each business-software category to the agentic capability it may gain
// and the control that keeps it governed. Semantic <table> in a horizontally
// scrollable container so the page never overflows on mobile.
export function AIEnabledAppTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each control →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Business software categories — SaaS apps, browsers, developer tools,
            plugins, MCP servers, internal apps, and identities — mapped to the
            agentic capability each may gain and the control that governs it.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                App category
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Agentic capability it may gain
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                The control
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.category}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.category}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.capability}
                </td>
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
