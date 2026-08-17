const rows = [
  {
    decision: "Approved teams",
    allow: "Named marketing, proposal, communications, and creative groups",
    require:
      "Business owner, technical owner, training, allowed use cases, and reviewers",
  },
  {
    decision: "Guest access",
    allow: "Public, approved, or disposable inputs for low-risk tasks",
    require:
      "No confidential client files; verify current terms and retention behavior",
  },
  {
    decision: "Adobe sign-in",
    allow: "Creative Cloud assets, generative features, and saved work",
    require:
      "Managed business identity, least-privilege libraries, and normal offboarding",
  },
  {
    decision: "Files and assets",
    allow: "Sanitized working copies from an approved AI-input library",
    require:
      "Rights review, data classification, current templates, and restricted masters",
  },
  {
    decision: "Final content",
    allow: "Draft generation and internal review",
    require:
      "Named human approval before publishing, sending, or overwriting a final asset",
  },
  {
    decision: "Tool depth",
    allow: "Chat for rapid edits, variations, and first-pass assembly",
    require:
      "Adobe apps for precision, preflight, redaction, signatures, or high-impact work",
  },
  {
    decision: "Work and Codex",
    allow: "Approved plugins and project-scoped working assets",
    require:
      "Surface-specific instructions, protected credentials, review gates, and ownership records",
  },
];

export function AdobeChatGPTGovernanceTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each decision →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Seven governance decisions for Adobe in ChatGPT, showing what a
            business may allow and the control it should require.
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
                Allow
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Require
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
                  {row.allow}
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.require}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
