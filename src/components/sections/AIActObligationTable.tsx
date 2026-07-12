const rows = [
  {
    useCase: "Customer chatbots & AI agents",
    article: "50(1)",
    requirement: "Tell people they are interacting with AI, at first contact",
  },
  {
    useCase: "AI-generated images, audio, video, or text",
    article: "50(2)",
    requirement:
      "Mark outputs as artificially generated in a machine-readable format",
  },
  {
    useCase: "Deepfakes (realistic synthetic media)",
    article: "50(4)",
    requirement: "Disclose that the content is AI-generated or manipulated",
  },
  {
    useCase: "AI-written text on matters of public interest",
    article: "50(4)",
    requirement:
      "Disclose it is AI-generated, unless a human took editorial responsibility",
  },
  {
    useCase: "Emotion recognition or biometric categorization",
    article: "50(3)",
    requirement: "Inform the people exposed to the system",
  },
];

// Maps common generative-AI business use cases to their EU AI Act Article 50
// transparency obligation. Semantic <table> (caption + scoped headers) in a
// horizontally scrollable container so the page never overflows on mobile.
export function AIActObligationTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each obligation →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">
            EU AI Act Article 50 transparency obligations mapped to common
            generative-AI business use cases — chatbots, synthetic content,
            deepfakes, public-interest text, and emotion or biometric systems.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                AI use case
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Article 50
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                What you must do
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.useCase}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.useCase}
                </th>
                <td className="px-4 py-3 align-top">
                  <span className="font-mono text-xs text-itecs-blue">
                    {row.article}
                  </span>
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.requirement}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
