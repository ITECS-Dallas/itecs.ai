const controls = [
  {
    control: "1. Ownership and purpose",
    registry:
      "Named business owner, technical custodian, approved use case, prohibited uses, review date, and retirement contact",
    releaseGate:
      "Owner accepts the business purpose and confirms that an existing approved tool cannot meet it",
    runtimeResponse:
      "Route unexplained use to the owner; disable the registration when ownership lapses",
  },
  {
    control: "2. Publisher and provenance",
    registry:
      "Publisher identity, source repository or endpoint, signing identity, distribution channel, and dependency lineage",
    releaseGate:
      "Verify publisher and provenance through an independent channel; reject unsigned or unverified artifacts",
    runtimeResponse:
      "Alert on publisher, certificate, registry, endpoint, or dependency-lineage changes",
  },
  {
    control: "3. Version and integrity",
    registry:
      "Exact package, image, server, skill, prompt, schema, and configuration versions with digests or commits",
    releaseGate:
      "Pin approved versions and compare code plus semantic metadata to the reviewed manifest",
    runtimeResponse:
      "Block unapproved updates; quarantine immediately when a signature, digest, or manifest no longer matches",
  },
  {
    control: "4. Description and schema",
    registry:
      "Tool description, input and output schemas, examples, embedded prompts, defaults, and declared side effects",
    releaseGate:
      "Scan and review natural-language instructions, invisible characters, remote references, coercive wording, and schema changes",
    runtimeResponse:
      "Alert when metadata changes or the agent selects the tool for tasks outside its approved description",
  },
  {
    control: "5. Data and destinations",
    registry:
      "Allowed data classifications, systems, fields, tenants, network destinations, recipients, retention, and prohibited domains",
    releaseGate:
      "Test with synthetic data and deny every source or destination not required by the approved task",
    runtimeResponse:
      "Log data-domain references without copying secrets; block and investigate new domains or destinations",
  },
  {
    control: "6. Side effects",
    registry:
      "Read, create, change, delete, send, purchase, execute, or delegate actions and their reversibility",
    releaseGate:
      "Map each side effect to an enforceable policy and require independent approval for high-impact actions",
    runtimeResponse:
      "Stop unauthorized writes or external communication; reconcile completed side effects before retrying",
  },
  {
    control: "7. Task-scoped authority",
    registry:
      "Dedicated workload identity, allowed actions, record scope, time window, call and spend caps, and approval rules",
    releaseGate:
      "Prove the tool operates with least privilege and fails closed when its task grant expires or is absent",
    runtimeResponse:
      "Alert on exercised scope outside the task envelope even when the underlying credential is technically valid",
  },
  {
    control: "8. Isolated evaluation",
    registry:
      "Representative tasks, adversarial cases, expected calls, acceptable outputs, denied actions, and evaluator version",
    releaseGate:
      "Pass sandbox tests with fake credentials, controlled egress, poisoned metadata, malformed inputs, and failed dependencies",
    runtimeResponse:
      "Canary new versions; roll back when tool choice, arguments, destinations, side effects, or output quality drifts",
  },
  {
    control: "9. Invocation evidence",
    registry:
      "Required task, agent, tool, version, policy, approval, data-domain, destination, action, result, and timestamp fields",
    releaseGate:
      "Confirm logs are complete, time-synchronized, access-controlled, tamper-resistant, and useful to responders",
    runtimeResponse:
      "Baseline exercised behavior; alert on abnormal selection rate, arguments, domains, retries, errors, or side effects",
  },
  {
    control: "10. Change and quarantine",
    registry:
      "Change triggers, reviewer, staged rollout, kill-switch owner, revocation steps, evidence location, and replacement path",
    releaseGate:
      "Treat code, metadata, schema, publisher, endpoint, dependency, permission, and update-channel changes as a new review",
    runtimeResponse:
      "Disable registration and credentials, block connections, preserve evidence, identify affected work, and restore only after reapproval",
  },
];

// Keeps the tool-admission contract readable on narrow screens while
// preserving a semantic table for assistive technology and search rendering.
export function AIAgentToolSupplyChainTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to review every tool control →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[1160px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Ten-control AI agent tool supply-chain registry with release gates,
            runtime monitoring, and quarantine responses.
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
                Registry and evidence
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Release gate
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Runtime and incident response
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
                  {item.registry}
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {item.releaseGate}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {item.runtimeResponse}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
