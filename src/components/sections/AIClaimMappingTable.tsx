const rows = [
  {
    scenario: "Agent leaks customer data through a connector",
    claim: "Privacy breach, regulatory action",
    policy: "Cyber",
    gap: "New AI exclusions may bar the claim",
  },
  {
    scenario: "Agent gives a client wrong professional advice",
    claim: "Professional negligence",
    policy: "Tech E&O / Professional liability",
    gap: "AI exclusion or narrowed definitions",
  },
  {
    scenario: "Agent publishes infringing or defamatory marketing",
    claim: "Personal and advertising injury",
    policy: "General liability (Coverage B)",
    gap: "ISO gen-AI endorsement can exclude it",
  },
  {
    scenario: "AI-generated output contributes to physical harm",
    claim: "Bodily injury / property damage",
    policy: "General liability (Coverage A)",
    gap: "Broad gen-AI exclusion may apply",
  },
  {
    scenario: "Agent is manipulated into transferring funds",
    claim: "Social engineering, fraudulent transfer",
    policy: "Crime / fidelity",
    gap: "Often needs a specific endorsement",
  },
  {
    scenario: "AI screening tool produces biased hiring outcomes",
    claim: "Discrimination",
    policy: "EPLI",
    gap: "AI exclusion may be attached",
  },
  {
    scenario: "Board approves AI with no governance; investors sue",
    claim: "Breach of oversight duty",
    policy: "D&O",
    gap: "AI oversight is a rising D&O theme",
  },
];

// Maps realistic AI/agent failure scenarios to the likely claim, the policy
// that would normally respond, and where the 2026 coverage gap sits. Semantic
// <table> in a horizontally scrollable container so the page never overflows.
export function AIClaimMappingTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to see each policy and gap →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <caption className="sr-only">
            AI and agent failure scenarios mapped to the likely claim, the
            insurance policy that would normally respond, and the coverage gap
            risk — across cyber, technology errors and omissions, general
            liability, crime, employment practices, and directors and officers
            policies.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                AI failure scenario
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Likely claim
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Policy that may respond
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Gap risk
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.scenario}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.scenario}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.claim}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {row.policy}
                </td>
                <td className="px-4 py-3 align-top text-danger">{row.gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
