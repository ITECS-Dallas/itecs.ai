const rows = [
  {
    decision: "Tiers and markets",
    test: "Confirm the user plans, delivery markets, and advertiser access available now",
    guardrail: "Record the verified scope and recheck it before every budget change",
    evidence: "Eligible plans, target locations, account approval, and campaign delivery",
  },
  {
    decision: "Paid versus organic",
    test: "Review the sponsored card and the answer above it as two separate placements",
    guardrail: "Never describe an ad impression as an organic recommendation or citation",
    evidence: "Screenshots, landing page, ad disclosure, and organic mention tracking",
  },
  {
    decision: "High-intent themes",
    test: "Build narrow ad groups around one decision-oriented query category",
    guardrail: "Use specific context hints, qualified landing pages, and small budgets",
    evidence: "Impressions, clicks, qualified visits, leads, and irrelevant delivery notes",
  },
  {
    decision: "Privacy and policy",
    test: "Map data from ad delivery through the website, forms, CRM, pixel, and API",
    guardrail: "Exclude sensitive data and prohibited or approval-only categories",
    evidence: "Data map, consent language, retention rule, vendor terms, and policy review",
  },
  {
    decision: "Measurement",
    test: "Join platform results to analytics and CRM outcomes with consistent tagging",
    guardrail: "Report platform-attributed, observed, and assisted outcomes separately",
    evidence: "UTMs, conversion events, lead quality, pipeline, revenue, and attribution window",
  },
  {
    decision: "Brand and delivery",
    test: "Review creative, landing pages, adjacency, geography, and delivery patterns",
    guardrail: "Set a stop rule for unsafe context, demographic imbalance, or poor relevance",
    evidence: "Approval record, incident log, delivery audit, and corrective action",
  },
  {
    decision: "Channel role",
    test: "Compare incremental value with SEO, Google Ads, and AI Overview visibility",
    guardrail: "Fund ChatGPT ads as a bounded test instead of replacing proven channels",
    evidence: "Marginal cost per qualified lead, overlap, assisted paths, and lift",
  },
];

export function ChatGPTAdsEvaluationTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to review every decision →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Seven decisions for evaluating ChatGPT ads, with the test,
            guardrail, and evidence required for each.
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
                Test
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Guardrail
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Evidence
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
                  {row.test}
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.guardrail}
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
