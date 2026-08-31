const phases = [
  {
    phase: "Prioritize",
    owner: "Executive sponsor + workflow owner",
    evidence:
      "High-risk role, recurring decision or exception, affected users, consequence, approved scope, and baseline",
    gate:
      "One bounded knowledge flow has a named owner and a measurable business reason",
  },
  {
    phase: "Capture",
    owner: "Subject-matter expert + knowledge lead",
    evidence:
      "Consented interviews, observed cases, source documents, decisions, rationale, exceptions, and escalation paths",
    gate:
      "The expert has corrected the record and approved what may become reusable knowledge",
  },
  {
    phase: "Govern",
    owner: "Knowledge owner + data/security owners",
    evidence:
      "Provenance, classification, permissions, effective date, review date, alternate owner, and retirement trigger",
    gate:
      "Every object is attributable, access-controlled, reviewable, and removable",
  },
  {
    phase: "Ground",
    owner: "Platform owner + knowledge owner",
    evidence:
      "Approved ingestion, permission-aware retrieval, citations, source versions, abstention, and conflict handling",
    gate:
      "The system answers only from authorized evidence and refuses when support is insufficient",
  },
  {
    phase: "Validate",
    owner: "Frontline users + qualified experts",
    evidence:
      "Representative questions, exceptions, stale sources, denied access, expert grading, usability tests, and corrections",
    gate:
      "Evidence support, workability, safety, and negative access cases meet the agreed thresholds",
  },
  {
    phase: "Renew",
    owner: "Knowledge owner + operational manager",
    evidence:
      "Usage outcomes, knowledge gaps, feedback, source changes, review completion, onboarding measures, and mentoring plan",
    gate:
      "Approved guidance stays current while unsupported knowledge is corrected, restricted, or retired",
  },
];

export function AIKnowledgeManagementPlan() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to review the complete operating model →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
          <caption className="sr-only">
            AI knowledge-management operating model from prioritization and
            consented capture through governed retrieval, validation, and renewal.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Phase
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Accountable roles
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Evidence and controls
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Gate to advance
              </th>
            </tr>
          </thead>
          <tbody>
            {phases.map((item) => (
              <tr
                key={item.phase}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {item.phase}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {item.owner}
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {item.evidence}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {item.gate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
