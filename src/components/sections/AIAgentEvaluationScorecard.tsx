const dimensions = [
  {
    dimension: "Business goal",
    level: "Session",
    evidence: "Expected outcome, assertions, resulting system state, and completion record",
    releaseRule:
      "Every critical goal passes; partial completion and false-success messages fail",
  },
  {
    dimension: "Response correctness",
    level: "Trace",
    evidence: "Expected answer, cited source state, tool results, and final response",
    releaseRule:
      "Meets the task-specific accuracy floor with no critical factual error",
  },
  {
    dimension: "Helpfulness",
    level: "Trace / session",
    evidence: "User intent, response, required next step, and reviewer rubric",
    releaseRule:
      "Clears the minimum score without hiding an incomplete or failed action",
  },
  {
    dimension: "Safety and policy",
    level: "Span / trace / session",
    evidence: "Prohibited-action tests, sensitive-data checks, approvals, and policy decisions",
    releaseRule:
      "Zero unauthorized high-impact actions or critical data-policy violations",
  },
  {
    dimension: "Tool selection",
    level: "Tool call",
    evidence: "Available tools, selected tool, request context, and necessity of the call",
    releaseRule:
      "Wrong, unnecessary, or omitted critical tools stay below the approved failure ceiling",
  },
  {
    dimension: "Tool parameters",
    level: "Tool call",
    evidence: "Tool schema, required fields, passed values, target identifiers, and context",
    releaseRule:
      "All high-impact parameters are present, justified, correctly scoped, and non-fabricated",
  },
  {
    dimension: "Tool-call order",
    level: "Session trajectory",
    evidence: "Expected trajectory, actual ordered calls, approvals, and resulting side effects",
    releaseRule:
      "Required prerequisites and approvals occur before consequential actions",
  },
  {
    dimension: "Repeatability",
    level: "Scenario cohort",
    evidence: "Repeated runs, pass distribution, failure clusters, and seed/configuration record",
    releaseRule:
      "The lower-bound result clears the threshold; one lucky pass cannot promote a release",
  },
  {
    dimension: "Operating efficiency",
    level: "Trace / accepted task",
    evidence: "End-to-end latency, model and tool calls, input/output tokens, retries, and review time",
    releaseRule:
      "Meets service targets and the approved cost per completed, accepted task",
  },
  {
    dimension: "Audit and recovery",
    level: "Release / incident",
    evidence: "Versioned trace, evaluator outputs, human decisions, state changes, and rollback result",
    releaseRule:
      "A reviewer can reconstruct the run and recover from every tested high-impact failure",
  },
];

export function AIAgentEvaluationScorecard() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to review the complete scorecard →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[1080px] border-collapse text-left text-sm">
          <caption className="sr-only">
            End-to-end AI agent evaluation scorecard covering evaluation level,
            retained evidence, and production release rules.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Dimension
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Evaluation level
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Evidence to retain
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Minimum production rule
              </th>
            </tr>
          </thead>
          <tbody>
            {dimensions.map((item) => (
              <tr
                key={item.dimension}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {item.dimension}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {item.level}
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {item.evidence}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {item.releaseRule}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
