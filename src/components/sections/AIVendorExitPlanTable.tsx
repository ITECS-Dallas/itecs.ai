const controls = [
  {
    control: "1. Dependency register",
    owner: "AI platform owner and workflow owner",
    evidence:
      "Model IDs, endpoints, regions, SDKs, identities, quotas, tools, data stores, contracts, and named owners",
    exitTest:
      "Every production dependency maps to an owner and an approved replacement or manual path",
  },
  {
    control: "2. Criticality and recovery",
    owner: "Business continuity owner",
    evidence:
      "Business impact tier, maximum outage, RTO, RPO, minimum service, and restoration priority",
    exitTest:
      "Recovery targets reflect business impact and are approved before production use",
  },
  {
    control: "3. Data portability",
    owner: "Data owner, privacy, and legal",
    evidence:
      "Export formats, retention and deletion terms, log and memory treatment, timing, cost, and tested archive",
    exitTest:
      "Required records can be exported, read, reconciled, and deleted on the agreed clock",
  },
  {
    control: "4. Portable workflow boundary",
    owner: "Application architecture owner",
    evidence:
      "Versioned prompts, schemas, tool contracts, business rules, provider adapters, and routing configuration",
    exitTest:
      "A provider change does not require rebuilding the business process from a closed workspace",
  },
  {
    control: "5. Evaluated replacements",
    owner: "Model risk and product owner",
    evidence:
      "Approved candidates, representative test set, current evaluation date, limits, and degraded-mode decision",
    exitTest:
      "At least one replacement meets the minimum quality and control threshold for each critical workflow",
  },
  {
    control: "6. Production qualification",
    owner: "Security, platform, finance, and quality owners",
    evidence:
      "Authentication, quota, region, latency, schema, safety, observability, cost, and load-test results",
    exitTest:
      "Replacement capacity and controls work under realistic demand—not only in a demo",
  },
  {
    control: "7. Manual operating path",
    owner: "Business operations owner",
    evidence:
      "Manual intake, queue, prioritization, approval, reconciliation, backlog, staffing, and return-to-service steps",
    exitTest:
      "People can sustain the minimum service for the maximum planned manual window",
  },
  {
    control: "8. Trigger and authority",
    owner: "Executive risk owner and incident commander",
    evidence:
      "Migration triggers, decision thresholds, contact tree, change authority, rollback authority, and communications",
    exitTest:
      "The on-call team can name who decides, switch, stop, notify, and reverse without an ad hoc meeting",
  },
  {
    control: "9. Failover exercise",
    owner: "Resilience program owner",
    evidence:
      "Scenario, timeline, RTO and RPO results, accepted-output rate, control parity, cost, backlog, and corrective actions",
    exitTest:
      "A scheduled exercise meets targets and every missed target has an owner and due date",
  },
];

// Keeps the vendor-exit operating contract readable on narrow screens while
// preserving a semantic table for assistive technology and search rendering.
export function AIVendorExitPlanTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to review every exit control →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[1060px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Nine-control AI vendor exit plan with accountable owners, required
            evidence, and a pass condition for each control.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Exit control
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Accountable owner
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Required evidence
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Pass condition
              </th>
            </tr>
          </thead>
          <tbody>
            {controls.map((item) => (
              <tr
                key={item.control}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {item.control}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {item.owner}
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {item.evidence}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {item.exitTest}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
