const steps = [
  {
    step: "1. Classify",
    owner: "AI governance owner",
    clock: "Thresholds approved before launch; assess at detection",
    record: "Incident and near-miss decision with severity and rationale",
  },
  {
    step: "2. Stop and contain",
    owner: "Incident commander and agent platform owner",
    clock: "Immediately when unauthorized activity is suspected",
    record: "Stop event, revoked access, isolated systems, and blocked actions",
  },
  {
    step: "3. Preserve evidence",
    owner: "Forensics lead and evidence custodian",
    clock: "Begin during containment; preserve originals before alteration",
    record: "Sealed evidence manifest, hashes, custody, access, and retention",
  },
  {
    step: "4. Scope impact",
    owner: "Security lead and affected system owners",
    clock: "Within the severity-based triage window",
    record: "Identities, systems, data, actions, third parties, and unknowns",
  },
  {
    step: "5. Notify",
    owner: "Legal, privacy, security, communications, and vendor leads",
    clock: "At preapproved internal, contractual, and legal deadlines",
    record: "Decision log showing who was notified, when, why, and by whom",
  },
  {
    step: "6. Separate facts",
    owner: "Incident recorder",
    clock: "At declaration and every material update",
    record: "Sourced factual timeline, hypothesis register, and open questions",
  },
  {
    step: "7. Sanitize sharing",
    owner: "Privacy counsel and evidence custodian",
    clock: "Before any evidence leaves the approved response group",
    record: "De-identified copy, redaction log, recipient, purpose, and limits",
  },
  {
    step: "8. Analyze cause",
    owner: "Cross-functional review lead",
    clock: "After containment is stable; before closure",
    record: "Control-failure analysis across the complete agent stack",
  },
  {
    step: "9. Correct and verify",
    owner: "Named control owners",
    clock: "Due dates set before incident closure",
    record:
      "Control change, verification test, result, residual risk, and approver",
  },
  {
    step: "10. Exercise",
    owner: "Incident program owner",
    clock: "On a risk-based schedule and after material agent changes",
    record: "Tabletop results, missed decisions, time gaps, and assigned fixes",
  },
];

// Maps the agent-incident lifecycle to accountable owners, clock rules, and
// retained evidence. The horizontal container keeps the semantic table usable
// without causing page-level overflow on narrow screens.
export function AgentIncidentPlaybookTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to review every response step →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Ten-step AI agent incident-reporting playbook with the accountable
            owner, required clock, and retained record for each step.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Response step
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Accountable owner
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Clock rule
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Required record
              </th>
            </tr>
          </thead>
          <tbody>
            {steps.map((item) => (
              <tr
                key={item.step}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {item.step}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {item.owner}
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {item.clock}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {item.record}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
