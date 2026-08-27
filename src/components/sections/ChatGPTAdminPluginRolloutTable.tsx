const controls = [
  {
    control: "1. Eligibility",
    pilotRule:
      "Verify the workspace plan, seat, built-in admin authority, plugin installation policy, app requirements, region, and supported surface for each tester",
    evidence:
      "Admin plugin listing, assigned roles, effective permissions, workspace settings, client version, and test date",
    pause:
      "A tester can invoke a capability that their approved role, seat, or workspace policy should not permit",
  },
  {
    control: "2. Pilot group",
    pilotRule:
      "Limit availability to named owners and administrators with a defined business purpose; do not use workspace-wide installation",
    evidence:
      "Pilot roster, accountable owner, use cases, start and end dates, training record, and removal procedure",
    pause:
      "The plugin becomes available outside the approved group or an unowned administrator joins the pilot",
  },
  {
    control: "3. Action inventory",
    pilotRule:
      "Catalog every supported read and write action, its parameters, target scope, side effects, dependencies, and reversibility",
    evidence:
      "Versioned capability register with read, propose, write, deny, and not-yet-tested classifications",
    pause:
      "A new, renamed, or behaviorally changed action appears without review and a representative test",
  },
  {
    control: "4. Approval gates",
    pilotRule:
      "Require a named human reviewer before member removal, broad group changes, permission changes, model access, workspace limits, or spending decisions",
    evidence:
      "Approval policy, reviewer identity, requested delta, affected scope, decision, timestamp, and final result",
    pause:
      "A high-impact write completes without the required reviewer or exceeds the reviewer’s delegated authority",
  },
  {
    control: "5. Nonproduction tests",
    pilotRule:
      "Exercise member, group, permission, usage-limit, and spending workflows against a sandbox or reversible test identities and groups",
    evidence:
      "Test cases, expected result, before state, structured result, Admin Console after state, cleanup, and exceptions",
    pause:
      "Testing touches a real employee, production group, live entitlement, or budget that was not explicitly placed in scope",
  },
  {
    control: "6. Result verification",
    pilotRule:
      "Treat the plugin response as a receipt, then independently compare identifiers, fields, and effective state with the Admin Console or owning system",
    evidence:
      "Request ID, target IDs, before-and-after values, verification source, verifier, timestamp, and mismatch disposition",
    pause:
      "The response says completed but authoritative state is missing, delayed beyond the runbook threshold, or materially different",
  },
  {
    control: "7. Exception routing",
    pilotRule:
      "Auto-route incomplete context, policy conflicts, outliers, ambiguous identities, unusual spend, and unsupported requests to an owner",
    evidence:
      "Exception rules, destination queue, severity, response target, owner, decision, and no-action outcome",
    pause:
      "An automation guesses through an exception, broadens scope, retries a mutation, or grants access to clear its own error",
  },
  {
    control: "8. Automation records",
    pilotRule:
      "Register every recurring or event-driven workflow with its trigger, cadence, identity, data, actions, limits, reviewers, and destinations",
    evidence:
      "Automation ID, version, owner, schedule or event, approval path, run history, costs, failures, and retirement date",
    pause:
      "A recurring workflow runs without an owner, current policy, bounded identity, review path, or usable run history",
  },
  {
    control: "9. Analytics separation",
    pilotRule:
      "Give reporting users analytics-only access and keep member, group, permission, limit, and spending mutations with separate admin roles",
    evidence:
      "Role map, analytics audience, export handling policy, mutation denial tests, and periodic access certification",
    pause:
      "A reporting identity can change workspace state or an admin export reaches an unapproved audience or destination",
  },
  {
    control: "10. Rollback",
    pilotRule:
      "Capture the pre-change state and define the inverse action, recovery owner, maximum recovery time, and manual Admin Console path",
    evidence:
      "Rollback test, saved state, dependency order, result verification, unresolved side effects, and recovery timestamp",
    pause:
      "The team cannot restore the prior effective state or determine which downstream systems received the change",
  },
  {
    control: "11. Escalation",
    pilotRule:
      "Define operational, identity, security, finance, privacy, and OpenAI support paths with severity and notification thresholds",
    evidence:
      "On-call contacts, incident criteria, evidence checklist, containment steps, communications owner, and tabletop results",
    pause:
      "Unauthorized access, unexplained mutations, spending anomalies, missing evidence, or repeated verification mismatches occur",
  },
  {
    control: "12. Change review",
    pilotRule:
      "Re-review the plugin whenever its version, skills, apps, actions, permissions, approval behavior, fields, or supported surfaces change",
    evidence:
      "Version diff, refreshed inventory, targeted regression tests, access recertification, approval, and rollback target",
    pause:
      "A capability change reaches the pilot before its read/write classification, tests, permissions, and recovery path are renewed",
  },
];

export function ChatGPTAdminPluginRolloutTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to review every rollout control →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[1160px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Twelve-control rollout contract for the ChatGPT Admin plugin,
            including pilot rules, retained evidence, and pause or rollback
            conditions.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Control
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Pilot rule
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Evidence to retain
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Pause or roll back when
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
                  {item.pilotRule}
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {item.evidence}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {item.pause}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
