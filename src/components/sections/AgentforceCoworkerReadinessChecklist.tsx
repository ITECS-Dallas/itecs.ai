const rows = [
  {
    decision: "Eligible users",
    adminAction: "Reconcile unmetered seats, access assignments, roles, and status",
    evidence: "Named user list, entitlement source, exceptions, and owner",
  },
  {
    decision: "Search sources",
    adminAction: "Approve CRM objects; review Slack and Data 360 separately",
    evidence: "Source register, data owner, classification, and retention rule",
  },
  {
    decision: "Least privilege",
    adminAction: "Narrow source permissions and keep the pilot read-only",
    evidence: "Permission map, role tests, revoked-access test, and review date",
  },
  {
    decision: "Opt-out",
    adminAction: "Enable, defer, or disable based on unresolved control gaps",
    evidence: "Decision record, approver, open gaps, and next decision date",
  },
  {
    decision: "Communication",
    adminAction: "Brief users and managers on sources, verification, and limits",
    evidence: "Role guidance, acknowledgment, support path, and escalation route",
  },
  {
    decision: "Answer testing",
    adminAction: "Test approved, stale, conflicting, missing, and restricted records",
    evidence: "Fixed question set, expected sources, results, and corrections",
  },
  {
    decision: "Monitoring",
    adminAction: "Measure accepted answers, corrections, incidents, and useful work",
    evidence: "Quality sample, trend review, incident log, and change trigger",
  },
  {
    decision: "Ownership",
    adminAction: "Assign admin, data, security, business, and finance owners",
    evidence: "RACI, disablement authority, support contact, and incident playbook",
  },
  {
    decision: "Billing",
    adminAction: "Verify seat, source, Data 360, and post-license credit behavior",
    evidence: "Order form, license inventory, Digital Wallet check, and cost owner",
  },
];

export function AgentforceCoworkerReadinessChecklist() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to review every decision →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Nine Agentforce Coworker readiness decisions with the required
            administrator action and launch evidence for each.
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
                Administrator action
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Launch evidence
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
                  {row.adminAction}
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.evidence}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
