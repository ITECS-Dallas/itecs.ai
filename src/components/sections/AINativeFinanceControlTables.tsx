const controlRows = [
  {
    decision: "Recurring decision",
    launchRule:
      "Choose one decision with a known cadence, owner, inputs, and acceptable outcome",
    evidence:
      "Baseline cycle time, review effort, error rate, and decision deadline",
  },
  {
    decision: "Controlled access",
    launchRule:
      "Give a named finance cohort secure AI access plus scheduled time to experiment",
    evidence:
      "Approved users, training completion, workspace rules, and experiment log",
  },
  {
    decision: "Approved data",
    launchRule:
      "Connect only governed systems, files, fields, and definitions required for the workflow",
    evidence:
      "Source owner, freshness target, lineage, permissions, and tie-out checks",
  },
  {
    decision: "Human ownership",
    launchRule:
      "Name who reviews exceptions, authorizes changes, and signs the final output",
    evidence:
      "Approval thresholds, escalation path, segregation of duties, and review record",
  },
  {
    decision: "Dependable work",
    launchRule:
      "Measure accepted work and decision improvement, including review and rework costs",
    evidence:
      "Usable completion rate, exceptions, cycle time, accuracy, and total cost",
  },
  {
    decision: "Agent authority",
    launchRule:
      "Advance from assist, to prepare, to limited action only when evidence supports it",
    evidence:
      "Test results, action limits, rollback, audit trail, and named accountable owner",
  },
];

const readinessRows = [
  {
    workflow: "Accruals",
    firstRole:
      "Draft accruals from purchase orders, receipts, invoices, contracts, and owner notes",
    actionGate:
      "Evidence is complete, accounting policy is encoded, thresholds are tested, and posting approval is separated",
    owner: "Controller",
  },
  {
    workflow: "Reconciliation",
    firstRole:
      "Match deterministic items, explain differences, and route unresolved exceptions",
    actionGate:
      "Match rules are validated, source coverage is high, evidence is retained, and reversals are controlled",
    owner: "Accounting lead",
  },
  {
    workflow: "Reporting",
    firstRole:
      "Refresh approved tables and charts, draft variance commentary, and run tie-out checks",
    actionGate:
      "Numbers trace to the approved close, definitions are fixed, QA passes, and distribution still requires sign-off",
    owner: "Controller or FP&A lead",
  },
  {
    workflow: "Procurement",
    firstRole:
      "Answer policy questions, classify intake, and prepare requisitions or approval packets",
    actionGate:
      "Vendor, budget, authority, receipt, and commitment controls are enforced before any transaction",
    owner: "Procurement owner",
  },
  {
    workflow: "Forecasting",
    firstRole:
      "Refresh the baseline, surface drivers, gather evidence, and generate decision scenarios",
    actionGate:
      "Drivers and source data are approved, forecast performance is monitored, and finance authorizes baseline changes",
    owner: "FP&A lead or CFO",
  },
];

export function FinanceControlChecklistTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to review every control →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[780px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Six controls for launching an AI-native finance workflow, with the
            rule and evidence required for each decision.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Control decision
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Launch rule
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Evidence to retain
              </th>
            </tr>
          </thead>
          <tbody>
            {controlRows.map((row) => (
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
                  {row.launchRule}
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

export function FinanceAgentReadinessTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to compare finance workflows →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[920px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Readiness gates for AI agents in accruals, reconciliation,
            reporting, procurement, and forecasting.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Workflow
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Safe first role
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Before limited action
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Accountable owner
              </th>
            </tr>
          </thead>
          <tbody>
            {readinessRows.map((row) => (
              <tr
                key={row.workflow}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.workflow}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.firstRole}
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.actionGate}
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.owner}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
