const rows = [
  {
    decision: "Surface scope",
    why: "Not every AI surface needs a gate",
    todo: "List which surfaces to inspect",
  },
  {
    decision: "DLP integration",
    why: "Reuse the policies you already run",
    todo: "Connect your DLP or security server",
  },
  {
    decision: "Prompt and tool inspection",
    why: "Data leaks in prompts and tool results",
    todo: "Inspect both before the model sees them",
  },
  {
    decision: "Failure handling",
    why: "A slow server can block or leak",
    todo: "Set timeouts and a fail policy",
  },
  {
    decision: "Shadow mode",
    why: "Blocking blind breaks work",
    todo: "Observe verdicts before you enforce",
  },
  {
    decision: "Denial logging",
    why: "Compliance needs the record",
    todo: "Send every denial to your log or SIEM",
  },
  {
    decision: "Known limits",
    why: "It gates, it does not redact",
    todo: "Confirm file and redaction handling",
  },
  {
    decision: "Block vs audit",
    why: "Some risk needs a hard stop",
    todo: "Decide per surface: block or log",
  },
];

// Maps each AI prompt DLP decision to why it matters and what to do, for the
// prompt DLP article. Semantic <table> in a horizontally scrollable container
// so the page never overflows on mobile.
export function PromptDLPDecisionTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each decision →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <caption className="sr-only">
            AI prompt DLP decisions — surface scope, DLP integration, prompt and
            tool inspection, failure handling, shadow mode, denial logging,
            known limits, and block versus audit — mapped to why each matters
            and what to do.
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
