const rows = [
  {
    item: "Weights vs source",
    why: "\"Open\" rarely means fully open",
    todo: "Read the license, not the label",
  },
  {
    item: "Benefits vs irreversible risk",
    why: "A released model cannot be recalled",
    todo: "Weigh data control against exposure",
  },
  {
    item: "Cyber and misuse testing",
    why: "Open models are closing the cyber gap",
    todo: "Test capability before you deploy",
  },
  {
    item: "Private hosting fit",
    why: "Some data cannot touch a cloud",
    todo: "Self-host where control matters most",
  },
  {
    item: "Provenance and licenses",
    why: "Origin and terms carry risk",
    todo: "Track who made it and how you may use it",
  },
  {
    item: "Approval rules",
    why: "Anyone can download a model",
    todo: "Gate deployment behind sign-off",
  },
  {
    item: "Ongoing monitoring",
    why: "Models and licenses change",
    todo: "Re-check provenance and terms over time",
  },
];

// Maps each open-weight model risk-checklist item to why it matters and what to
// do, for the open-weight models article. Semantic <table> in a horizontally
// scrollable container so the page never overflows on mobile.
export function OpenWeightRiskTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each item →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Open-weight AI model risk checklist — open weights versus source,
            benefits versus irreversible risk, cyber and misuse testing, private
            hosting fit, provenance and licenses, approval rules, and ongoing
            monitoring — mapped to why each matters and what to do.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Checklist item
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
                key={row.item}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.item}
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
