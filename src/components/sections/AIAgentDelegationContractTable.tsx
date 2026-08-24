const clauses = [
  {
    clause: "1. Task identity and bounded goal",
    decision:
      "One task ID, parent ID, intended outcome, permitted subtasks, and explicit exclusions",
    evidence:
      "Contract version, requester, task owner, and the exact work product to return",
    failure: "Reject or escalate work whose goal cannot be stated or verified",
  },
  {
    clause: "2. Inputs and context",
    decision:
      "Approved records, source versions, data classifications, assumptions, and missing-input behavior",
    evidence:
      "Source references, timestamps, checksums where useful, and disclosed gaps",
    failure: "Pause for missing, stale, conflicting, or unauthorized input",
  },
  {
    clause: "3. Delegate and capability",
    decision:
      "Named agent or human, allowed model and tools, current evaluation, capacity, and availability",
    evidence:
      "Agent, model, prompt, tool, and evaluation versions used for the assignment",
    failure:
      "Reassign when capability, capacity, or availability no longer meets the contract",
  },
  {
    clause: "4. Authority boundary",
    decision:
      "Actions the delegate may propose, execute, approve, communicate, or never perform",
    evidence:
      "Identity, granted scopes, approval references, and every consequential tool action",
    failure: "Stop and contain any attempted action outside the assignment",
  },
  {
    clause: "5. Data limits",
    decision:
      "Permitted fields, systems, recipients, regions, retention, and prohibited secondary use",
    evidence:
      "Data references and access events without copying sensitive payloads into broad logs",
    failure:
      "Stop, revoke access, preserve evidence, and invoke the incident path",
  },
  {
    clause: "6. Budget and resource limits",
    decision:
      "Token, tool, compute, transaction, and retry caps plus who may raise them",
    evidence:
      "Actual usage, elapsed time, tool charges, retries, and exception approvals",
    failure:
      "Pause or stop at the cap; never silently buy more time or attempts",
  },
  {
    clause: "7. Deadline and checkpoints",
    decision:
      "Due time, progress cadence, maximum runtime, heartbeat, and stale-work threshold",
    evidence:
      "Checkpoint status, completed steps, blockers, remaining budget, and next action",
    failure: "Reassign or escalate unresponsive, late, or stalled work",
  },
  {
    clause: "8. Acceptance and verifier",
    decision:
      "Observable pass criteria, tolerance, test method, and the person or system authorized to accept",
    evidence:
      "Test results, supporting records, exceptions, and an explicit accept or reject decision",
    failure:
      "Reject incomplete or unverified output even when it appears plausible",
  },
  {
    clause: "9. Handoff package",
    decision:
      "Required artifact, provenance, citations, tool results, assumptions, approvals, and open risks",
    evidence:
      "Tamper-evident references linked to the task and its parent delegation",
    failure:
      "Return an evidence-deficient handoff; do not let it advance downstream",
  },
  {
    clause: "10. Subdelegation and accountability",
    decision:
      "Whether subdelegation is allowed, maximum depth, eligible delegates, and attenuated permissions",
    evidence:
      "Complete parent-child chain, each sub-contract, and each delegator's verification",
    failure:
      "Stop unauthorized delegation and escalate an accountability-chain break",
  },
  {
    clause: "11. Retry, reassignment, escalation, and stop",
    decision:
      "Failure classes, retry count, idempotency rule, alternate owner, escalation target, and kill conditions",
    evidence:
      "Failure reason, attempted recovery, side-effect check, final disposition, and owner",
    failure:
      "Use the preassigned response; never let agents invent a new risk threshold",
  },
];

// Keeps the delegation contract legible on narrow screens while preserving a
// semantic table for assistive technology and search rendering.
export function AIAgentDelegationContractTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to review every contract clause →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[1160px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Eleven-clause AI delegation contract with required decisions,
            handoff evidence, and failure responses.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Contract clause
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Required decision
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Handoff evidence
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Failure response
              </th>
            </tr>
          </thead>
          <tbody>
            {clauses.map((item) => (
              <tr
                key={item.clause}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {item.clause}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {item.decision}
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {item.evidence}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {item.failure}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
