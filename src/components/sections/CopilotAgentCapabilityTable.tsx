const rows = [
  {
    can: "Check who is on call",
    does: "Answers from the live rotation, right in Teams",
  },
  {
    can: "See the support calendar",
    does: "Reads the current on-call and support calendars",
  },
  {
    can: "Create a calendar event",
    does: "Adds the event to the support calendar from plain language",
  },
  {
    can: "Request coverage for a shift",
    does: "Finds available technicians and runs the approval flow",
  },
  {
    can: "Approve or reject a request",
    does: "Available techs respond in one tap; first yes wins",
  },
  {
    can: "Reference a PSA ticket or event",
    does: "Pulls the ticket or event details from our PSA in the chat",
  },
];

// Maps what ITECS staff can ask the on-call Copilot agent to do, and how the
// agent handles each, for the on-call scheduling case study. Semantic <table>
// in a horizontally scrollable container so the page never overflows on mobile.
export function CopilotAgentCapabilityTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to read what the agent does →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <caption className="sr-only">
            What ITECS staff can ask the on-call Copilot agent to do inside
            Microsoft Teams, and how the agent handles each request — from
            checking the rotation to running the coverage-swap approval flow and
            referencing PSA tickets.
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-default)]">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-dim"
              >
                Staff can
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                What the agent does
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.can}
                className="border-b border-[var(--border-subtle)] last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-4 py-3 font-medium text-text-primary"
                >
                  {row.can}
                </th>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {row.does}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
