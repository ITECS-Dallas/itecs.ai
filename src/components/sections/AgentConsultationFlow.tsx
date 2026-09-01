import { ArrowDown, ArrowRight, Check, MessageSquareText } from "lucide-react";

const exchange = [
  {
    step: "1",
    owner: "Agent A · accountable owner",
    title: "Draft or plan",
    detail:
      "Codex frames the goal, assumptions, constraints, open questions, and proposed answer before asking for help.",
  },
  {
    step: "2",
    owner: "Conversation controller",
    title: "Send a focused consultation",
    detail:
      "The controller attaches the conversation ID, selected context, authorship, deadline, and turn budget—not the entire workspace by default.",
  },
  {
    step: "3",
    owner: "Agent B · consulting challenger",
    title: "Challenge and respond",
    detail:
      "Fable 5 identifies weak assumptions, alternatives, missing evidence, risks, contradictions, and questions that still need answers.",
  },
  {
    step: "4",
    owner: "Agent A · accountable owner",
    title: "Follow up and reconcile",
    detail:
      "Codex asks bounded follow-ups, tests disputed claims, records what changed or was rejected, and owns the final output.",
  },
];

export function AgentConsultationFlow() {
  return (
    <figure
      role="img"
      aria-label="Agent-to-agent consultation workflow. Codex drafts a plan, a conversation controller sends selected context to Fable 5, Fable 5 challenges the plan, and Codex asks follow-up questions, reconciles the findings, records what changed, and finalizes. The controller preserves conversation identity, authorship, limits, and provenance throughout."
      className="not-prose rounded-lg border border-[var(--card-line)] bg-card p-5 md:p-7"
    >
      <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
        <div className="hex flex h-10 w-10 shrink-0 items-center justify-center bg-brand-subtle">
          <MessageSquareText
            className="h-5 w-5 text-itecs-blue"
            aria-hidden="true"
          />
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            Persistent agent consultation
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            One owner, one bounded dialogue, one traceable final decision
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-stretch">
        {exchange.map((item, index) => (
          <div key={item.step} className="contents">
            <div className="chamfer-sm border border-[var(--border-subtle)] bg-canvas-sunken p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-itecs-blue">
                  Step {item.step}
                </span>
                {index === exchange.length - 1 && (
                  <Check className="h-4 w-4 text-itecs-blue" aria-hidden="true" />
                )}
              </div>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-text-dim">
                {item.owner}
              </p>
              <p className="mt-2 font-medium text-text-primary">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {item.detail}
              </p>
            </div>

            {index < exchange.length - 1 && (
              <div className="flex items-center justify-center py-1 text-itecs-blue">
                <ArrowDown className="h-5 w-5 md:hidden" aria-hidden="true" />
                <ArrowRight
                  className="hidden h-5 w-5 md:block"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 border-l-2 border-itecs-blue bg-brand-subtle px-4 py-3">
        <p className="text-sm leading-relaxed text-text-secondary">
          <strong className="font-medium text-text-primary">Audit layer:</strong>{" "}
          preserve stable message and conversation IDs, sender and recipient,
          selected context references, timestamps, model and instruction versions,
          timeouts, turn limits, source links, and the owner&apos;s reconciliation record.
        </p>
      </div>

      <figcaption className="mt-4 text-center text-sm leading-relaxed text-text-dim">
        Consultation improves a draft before it is final. A formal review remains a
        separate gate applied to the completed, versioned artifact.
      </figcaption>
    </figure>
  );
}
