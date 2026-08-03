const rows = [
  {
    item: "Know the partner apps",
    why: "Only some services support it",
    todo: "List which apps offer ChatGPT sign-in",
  },
  {
    item: "Separate auth from authorization",
    why: "Sign-in and data access differ",
    todo: "Approve each grant on its own",
  },
  {
    item: "Verify shared profile data",
    why: "You must know what leaves",
    todo: "Confirm name, email, and picture only",
  },
  {
    item: "Preserve SSO and 2FA",
    why: "A shortcut can bypass controls",
    todo: "Keep SSO and 2FA required",
  },
  {
    item: "Review team and project scope",
    why: "Access can exceed one user",
    todo: "Check workspace and project rights",
  },
  {
    item: "Document consent screens",
    why: "You cannot audit what you did not record",
    todo: "Screenshot and log each consent",
  },
  {
    item: "Plan offboarding and disconnect",
    why: "People and apps must be revocable",
    todo: "Define a disconnect path per app",
  },
  {
    item: "Decide convenient vs risky",
    why: "Not every workflow should allow it",
    todo: "Set a policy per use case",
  },
];

// Maps each Sign in with ChatGPT checklist item to why it matters and what to
// do, for the identity risk article. Semantic <table> in a horizontally
// scrollable container so the page never overflows on mobile.
export function SignInChecklistTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read each step →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Sign in with ChatGPT identity checklist — know the partner apps,
            separate authentication from authorization, verify shared profile
            data, preserve SSO and 2FA, review team and project scope, document
            consent screens, plan offboarding and disconnect, and decide
            convenient versus risky — mapped to why each matters and what to do.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Checklist item
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Why it matters
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                What to do
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.item}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.item}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.why}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {row.todo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
