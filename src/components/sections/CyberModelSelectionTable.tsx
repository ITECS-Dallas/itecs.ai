const rows = [
  {
    criterion: "Task fit",
    why: "Small, frontier, and agentic models do different jobs",
    check: "The model class matches the task",
  },
  {
    criterion: "Code and data privacy",
    why: "Some scans send your source code to a cloud",
    check: "Whether it runs locally or off-site",
  },
  {
    criterion: "Benchmark relevance",
    why: "Vendor scores use their test, not your stack",
    check: "If the benchmark reflects your code",
  },
  {
    criterion: "False positives",
    why: "Noisy findings burn out your analysts",
    check: "Real-world precision, not the demo",
  },
  {
    criterion: "Cost per scan",
    why: "Frontier calls add up across a large codebase",
    check: "Price per repository, not per token",
  },
  {
    criterion: "Sandboxing",
    why: "Some models run exploit code to confirm a bug",
    check: "That exploits stay in isolation",
  },
  {
    criterion: "Auditability",
    why: "You must prove what the model found and did",
    check: "A traceable log of every action",
  },
  {
    criterion: "Human review",
    why: "Machine speed is wrong for irreversible fixes",
    check: "Where a person signs off",
  },
  {
    criterion: "Locate vs patch",
    why: "Finding a bug and fixing it carry different risk",
    check: "Whether it only finds or also patches",
  },
];

// Maps each security-AI model selection criterion to why it matters and what to
// check, for the AI cyber models article. Semantic <table> in a horizontally
// scrollable container so the page never overflows on mobile.
export function CyberModelSelectionTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each criterion →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Security-AI model selection criteria — task fit, code and data
            privacy, benchmark relevance, false positives, cost per scan,
            sandboxing, auditability, human review, and locate versus patch —
            mapped to why each matters and what to check.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Criterion
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Why it matters
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                What to check
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.criterion}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.criterion}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.why}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {row.check}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
