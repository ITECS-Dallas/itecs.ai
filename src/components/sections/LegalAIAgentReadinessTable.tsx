const controls = [
  {
    control: "1. Bounded workflow",
    design:
      "One named matter workflow, such as clause review or regulatory scanning, limited to read and propose",
    evidence:
      "Owner, matter type, allowed inputs, prohibited actions, output schema, reviewer, and success criteria",
    stop:
      "The task expands into advice, negotiation, filing, disclosure, or another matter without a new approval",
  },
  {
    control: "2. Matter permissions",
    design:
      "Connector queries run as the authorized user and preserve repository, workspace, document, and field permissions",
    evidence:
      "Positive and negative identity tests across active, closed, transferred, and newly restricted matters",
    stop:
      "The agent returns a document, citation, snippet, or metadata that the requesting user cannot open at the source",
  },
  {
    control: "3. Ethical walls",
    design:
      "Conflict screens apply to retrieval, memory, caches, embeddings, logs, evaluations, and generated work product",
    evidence:
      "Wall membership, restricted groups, deny tests, alert routing, and periodic access recertification",
    stop:
      "Any cross-wall retrieval, inference, recommendation, or undisclosed restricted-matter reference occurs",
  },
  {
    control: "4. No bulk exports",
    design:
      "Process records in their governed source or retrieve only the minimum authorized documents for the task",
    evidence:
      "Export prohibition, query and result caps, controlled temporary storage, deletion proof, and egress policy",
    stop:
      "A connector, user, or agent attempts a corpus export, unrestricted synchronization, or undeclared destination",
  },
  {
    control: "5. Client-data isolation",
    design:
      "Separate tenants, projects, indexes, keys, memory, evaluation sets, logs, and support access according to risk",
    evidence:
      "Data-flow map, processor list, residency, encryption, backup, support, retention, deletion, and recovery settings",
    stop:
      "Client data can enter shared memory, cross-client training, an unapproved region, or an unowned store",
  },
  {
    control: "6. Provider terms",
    design:
      "Verify training, fine-tuning, human review, abuse monitoring, retention, deletion, ownership, and breach-notice terms",
    evidence:
      "Executed agreement, edition and feature inventory, configuration export, exceptions, and contract review date",
    stop:
      "The actual edition, feature, connector, subprocessor, or setting falls outside the reviewed terms",
  },
  {
    control: "7. Traceable citations",
    design:
      "Every material legal assertion links to an authorized source with jurisdiction, date, document, and location",
    evidence:
      "Citation schema, source snapshot or version, quote boundary, retrieval time, and attorney verification result",
    stop:
      "The source is missing, inaccessible, stale, outside the jurisdiction, or does not support the proposition",
  },
  {
    control: "8. Accuracy and redaction",
    design:
      "Test hallucinations, omitted authority, quotation fidelity, document boundaries, PII, privilege, and layered redactions",
    evidence:
      "Versioned gold set, adversarial cases, false-positive and false-negative thresholds, and regression history",
    stop:
      "A fabricated authority, material omission, failed redaction, or unsupported factual claim reaches review",
  },
  {
    control: "9. Attorney approval",
    design:
      "A qualified lawyer reviews the exact artifact before advice, filing, negotiation, execution, or disclosure",
    evidence:
      "Named reviewer, approval scope, artifact hash, source check, exceptions, timestamp, and final disposition",
    stop:
      "The output changes after approval or the reviewer cannot reproduce its controlling sources and assumptions",
  },
  {
    control: "10. Access and action logs",
    design:
      "Record identity, client and matter reference, model, skill, connector, sources, actions, denials, approvals, and result",
    evidence:
      "Complete, time-synchronized, access-controlled logs that avoid duplicating confidential payloads",
    stop:
      "An access, action, denial, or downstream handoff cannot be traced to its task and accountable owner",
  },
  {
    control: "11. Incident and notice",
    design:
      "Contain access, preserve evidence, assess privilege and confidentiality impact, reconcile outputs, and decide notifications",
    evidence:
      "Incident owner, legal and ethics counsel, insurer and vendor contacts, notice criteria, deadlines, and tested tabletop",
    stop:
      "The team cannot identify affected clients, matters, data, jurisdictions, recipients, or downstream artifacts",
  },
  {
    control: "12. Change revalidation",
    design:
      "Treat model, skill, prompt, connector, permission, source, policy, region, and provider-term changes as controlled releases",
    evidence:
      "Version diff, renewed risk decision, targeted regression tests, canary, monitoring window, and rollback target",
    stop:
      "An unreviewed change alters access, retention, citations, redaction, side effects, or professional-review behavior",
  },
];

// Presents legal-agent controls as an acceptance contract without making the
// article depend on an unreadable image or a desktop-only comparison layout.
export function LegalAIAgentReadinessTable() {
  return (
    <div className="not-prose">
      <p className="mb-2 text-xs text-text-dim md:hidden" aria-hidden="true">
        Swipe the table sideways to review every legal-agent control →
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--card-line)] bg-card">
        <table className="w-full min-w-[1160px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Twelve-control readiness checklist for legal AI agents, including
            minimum design, acceptance evidence, and stop conditions.
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
                Minimum design
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Acceptance evidence
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-dim">
                Stop condition
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
                  {item.design}
                </td>
                <td className="px-4 py-3 align-top text-text-secondary">
                  {item.evidence}
                </td>
                <td className="px-4 py-3 align-top text-itecs-blue">
                  {item.stop}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
