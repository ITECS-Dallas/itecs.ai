const rows = [
  {
    control: "Corporate identity",
    why: "Agents act with a user's access",
    todo: "Tie every agent to context-aware SSO",
  },
  {
    control: "Browser DLP",
    why: "Agents can paste or upload data",
    todo: "Enforce DLP on copy-paste and files",
  },
  {
    control: "Site scoping",
    why: "An agent roams every open tab",
    todo: "Limit actions to relevant sites only",
  },
  {
    control: "Extension and DOM risk",
    why: "Extensions and scrapers read pages",
    todo: "Vet extensions; curb DOM scraping",
  },
  {
    control: "Activity logging",
    why: "You must see what an agent did",
    todo: "Log every agent action in the browser",
  },
  {
    control: "Human approval",
    why: "Some actions cannot be undone",
    todo: "Require sign-off for high-stakes steps",
  },
  {
    control: "Prompt-injection testing",
    why: "Pages can hijack an agent",
    todo: "Red-team injection before production",
  },
];

// Maps each browser-agent control to why it matters and what to do, for the
// agentic browsing security article. Semantic <table> in a horizontally
// scrollable container so the page never overflows on mobile.
export function BrowserAgentControlTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each control →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Browser-based AI agent controls — corporate identity, browser DLP,
            site scoping, extension and DOM risk, activity logging, human
            approval, and prompt-injection testing — mapped to why each matters
            and what to do.
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
                What to do
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
                  {row.todo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
