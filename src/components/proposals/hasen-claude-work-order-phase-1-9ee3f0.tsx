"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Database,
  Download,
  FileCheck2,
  FileSearch,
  FolderInput,
  GanttChartSquare,
  Layers3,
  Lock,
  PenLine,
  Scale,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Workflow,
  X,
} from "lucide-react";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";

const pdfHref = "/proposals/hasen-phase-1-claude-work-order-proposal.pdf";

type ProposalDecision = "approve" | "decline";
type ProposalSubmitState = "idle" | "submitting" | "success" | "error";

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-6 py-24 md:px-12 lg:px-24 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent-bright">
      {children}
    </span>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SlideIn({
  children,
  direction = "left",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function fieldsValue(decision: ProposalDecision) {
  return decision === "approve" ? "Approved" : "Declined";
}

function ProposalDecisionForm({ decision }: { decision: ProposalDecision }) {
  const isApproval = decision === "approve";
  const [submitState, setSubmitState] = useState<ProposalSubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!turnstileToken) {
      setSubmitState("error");
      setFeedback("Please complete the verification check before sending.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const rawFields = Object.fromEntries(formData.entries());
    const message = String(rawFields.message || "").trim();

    const fields = {
      proposal: "Hasen Phase 1 Claude Work Order Drafting Workflow",
      response: isApproval ? "Approved" : "Declined",
      ...rawFields,
      message:
        message ||
        (isApproval
          ? "Proposal approved. No additional notes provided."
          : "Proposal declined."),
    };

    setSubmitState("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formName: isApproval
            ? "Hasen Proposal Approval"
            : "Hasen Proposal Decline",
          sourcePath: window.location.pathname,
          turnstileToken,
          fields,
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to send response.");
      }

      form.reset();
      setSubmitState("success");
      setFeedback(
        isApproval
          ? "Approval received. ITECS will follow up to schedule kickoff and document exchange."
          : "Response received. ITECS will review your notes and follow up.",
      );
    } catch (error) {
      setSubmitState("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Unable to send your response. Please call ITECS directly.",
      );
    } finally {
      setTurnstileToken("");
      setTurnstileResetSignal((current) => current + 1);
    }
  }

  return (
    <motion.form
      key={decision}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, height: 0, y: -16, scale: 0.98 }}
      animate={{ opacity: 1, height: "auto", y: 0, scale: 1 }}
      exit={{ opacity: 0, height: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`mt-6 overflow-hidden rounded-2xl border ${
        isApproval
          ? "border-brand-accent/35 bg-brand-accent/5"
          : "border-red-400/30 bg-red-400/5"
      } p-5 text-left shadow-[0_0_45px_rgba(6,182,212,0.08)] md:p-6`}
    >
      <input type="hidden" name="proposalAction" value={fieldsValue(decision)} />

      <div className="mb-5 flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
            isApproval ? "bg-brand-accent/10" : "bg-red-400/10"
          }`}
        >
          {isApproval ? (
            <CheckCircle2 className="h-5 w-5 text-brand-accent-bright" />
          ) : (
            <X className="h-5 w-5 text-red-300" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-light text-text-primary">
            {isApproval ? "Approve This Proposal" : "Decline This Proposal"}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">
            {isApproval
              ? "Confirm the approval details below and ITECS will schedule the Phase 1 kickoff."
              : "Share what changed or what needs to be adjusted so ITECS can respond appropriately."}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor={`${decision}-name`} className="mb-1.5 block text-sm text-text-dim">
            Full Name
          </label>
          <input
            id={`${decision}-name`}
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-[var(--border-subtle)] bg-bg-void px-4 py-3 text-text-primary placeholder:text-text-dim/50 transition-colors focus:border-brand-accent focus:outline-none"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor={`${decision}-email`} className="mb-1.5 block text-sm text-text-dim">
            Email
          </label>
          <input
            id={`${decision}-email`}
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-[var(--border-subtle)] bg-bg-void px-4 py-3 text-text-primary placeholder:text-text-dim/50 transition-colors focus:border-brand-accent focus:outline-none"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label htmlFor={`${decision}-phone`} className="mb-1.5 block text-sm text-text-dim">
            Phone
          </label>
          <input
            id={`${decision}-phone`}
            name="phone"
            type="tel"
            className="w-full rounded-lg border border-[var(--border-subtle)] bg-bg-void px-4 py-3 text-text-primary placeholder:text-text-dim/50 transition-colors focus:border-brand-accent focus:outline-none"
            placeholder="Best callback number"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`${decision}-message`} className="mb-1.5 block text-sm text-text-dim">
          {isApproval ? "Approval Notes" : "Reason or Requested Changes"}
        </label>
        <textarea
          id={`${decision}-message`}
          name="message"
          rows={4}
          required={!isApproval}
          className="w-full rounded-lg border border-[var(--border-subtle)] bg-bg-void px-4 py-3 text-text-primary placeholder:text-text-dim/50 transition-colors focus:border-brand-accent focus:outline-none"
          placeholder={
            isApproval
              ? "Optional: preferred kickoff timing, pilot user notes, or document exchange preferences."
              : "Please share the reason, requested scope changes, or timing concerns."
          }
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${decision}-website`}>Website</label>
        <input id={`${decision}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <TurnstileWidget
        className="mt-5"
        resetSignal={turnstileResetSignal}
        onTokenChange={setTurnstileToken}
        onError={() => {
          setSubmitState("error");
          setFeedback("Verification failed. Please refresh and try again.");
        }}
      />

      {feedback ? (
        <p
          className={`mt-4 text-sm ${
            submitState === "success" ? "text-brand-accent-bright" : "text-red-300"
          }`}
          role="status"
        >
          {feedback}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-60 md:w-auto ${
          isApproval
            ? "bg-brand-accent text-bg-void hover:bg-brand-accent-bright"
            : "border border-red-400/40 text-red-200 hover:bg-red-400/10"
        }`}
      >
        {submitState === "submitting"
          ? "Sending..."
          : isApproval
            ? "Send Approval"
            : "Send Decline Notice"}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </motion.form>
  );
}

const metadataRows = [
  ["Prepared for", "Brenda F. Hasenzahl, Esq., General Counsel, Hasen Holdings"],
  ["Prepared by", "ITECS Outsourcing, LLC"],
  ["Date", "May 2026"],
  ["Project", "Claude AI Work Order Drafting Workflow"],
  [
    "Confidentiality",
    "Subject to mutual NDA review and execution before document exchange",
  ],
] as const;

const confirmedInputs = [
  "Hasen does not currently have active Prime Contract clauses restricting where project documents may be stored or processed for this use case.",
  "Hasen does not currently have a written internal AI policy. Outside counsel is separately drafting one.",
  "David and Paul Witt will review Work Orders before they are issued to subcontractors.",
  "Hasen would like an audit record of AI-generated drafts.",
  "Current project volume is approximately 1-2 projects every six months, with 20-40 Work Orders per project.",
  "Two projects are expected to start within the next 30-45 days.",
  "Phase 1 source documents are expected to be predominantly PDF files, with limited Excel and JPEG content.",
  "Source documents currently live across Hasen's internal G drive, Procore, Sage, and Microsoft Windows environment.",
  "Initial testing is expected to involve 3-4 users, with possible expansion to 10-20 users.",
] as const;

const scopeItems = [
  {
    icon: ClipboardCheck,
    title: "Kickoff and access planning",
    text: "Confirm Phase 1 boundaries, pilot users, reviewer roles, sample projects, source categories, and the first Work Order scenarios to test.",
    deliverables: [
      "Phase 1 kickoff checklist",
      "Source-document intake checklist",
      "Pilot user and reviewer role confirmation",
      "Access and confidentiality handling notes",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Claude Team workspace and governance setup",
    text: "Guide Hasen through Claude Team setup and define the practical workspace structure for Work Order drafting.",
    deliverables: [
      "Claude Team setup guidance for the initial 5-seat workspace",
      "Project and workspace naming structure",
      "Practical AI usage guardrails",
      "Technical notes for outside counsel policy alignment",
    ],
  },
  {
    icon: FolderInput,
    title: "Document intake and source packaging workflow",
    text: "Define the controlled manual intake process for documents from the G drive, Procore, Sage, and Windows file storage.",
    deliverables: [
      "Standard Work Order source package checklist",
      "File naming and folder structure recommendation",
      "Large plan/specification splitting guidance",
      "PDF, Excel, and image handling notes",
    ],
  },
  {
    icon: PenLine,
    title: "Work Order template mapping and prompt playbook",
    text: "Map Hasen's Work Order templates into repeatable prompts for source-document review, drafting, completeness checks, and reviewer validation.",
    deliverables: [
      "Master Work Order drafting prompt",
      "Source-document review prompt",
      "Trade-specific prompt variations",
      "Work Order completeness checklist",
      "Reviewer checklist for David and Paul Witt",
    ],
  },
  {
    icon: FileSearch,
    title: "Pilot testing and draft quality review",
    text: "Validate the workflow against representative Hasen documents and Work Order scenarios while preserving the separation between AI assistance and final human approval.",
    deliverables: [
      "Pilot run-through for representative scenarios",
      "Defect and adjustment log",
      "Updated prompt playbook",
      "Recommendations for high-risk Work Order review paths",
    ],
  },
  {
    icon: Database,
    title: "Audit record process",
    text: "Design a lightweight audit record for each AI-assisted Work Order as an operational record, not a replacement for formal legal records retention.",
    deliverables: [
      "Audit log template",
      "Audit logging procedure",
      "Reviewer signoff workflow recommendation",
    ],
  },
  {
    icon: UserCheck,
    title: "Training and handoff",
    text: "Train initial users on document preparation, prompt execution, output review, confidentiality, audit logging, and handoff to reviewers.",
    deliverables: [
      "Pilot kickoff training session",
      "Follow-up or expansion training session",
      "Reviewer-focused handoff",
      "Quick-reference workflow guide",
      "Final Phase 1 handoff notes",
    ],
  },
  {
    icon: GanttChartSquare,
    title: "60-day post-launch optimization",
    text: "Refine prompts, tune the workflow, answer user questions, and adjust the audit record process as Hasen applies the workflow to live project needs.",
    deliverables: [
      "Prompt and workflow refinement",
      "Optimization adjustment log",
      "Expansion, API, Enterprise, or Phase 2 recommendations",
    ],
  },
] as const;

const auditFields = [
  "Project name and Work Order number",
  "Subcontractor or trade",
  "Source documents reviewed",
  "Claude project/chat name or export reference",
  "Prompt version used",
  "AI-generated draft date",
  "Reviewer name",
  "Approval status and approval date",
  "Final Work Order file location",
] as const;

const timeline = [
  {
    week: "Week 1",
    milestone: "Kickoff, access planning, Claude Team setup, source-document workflow",
    outcome:
      "Hasen has the workspace structure and intake process needed to begin controlled testing.",
  },
  {
    week: "Week 2",
    milestone: "Template mapping, prompt playbook, audit log design, initial pilot testing",
    outcome:
      "First representative Work Order scenarios are tested and prompt adjustments are made.",
  },
  {
    week: "Week 3",
    milestone: "Final pilot validation, training, documentation, handoff",
    outcome:
      "Pilot users are trained and Hasen has a repeatable Phase 1 workflow for upcoming projects.",
  },
  {
    week: "Days 16-60",
    milestone: "Post-launch optimization",
    outcome:
      "ITECS refines prompts, workflow steps, and audit documentation as Hasen begins using the workflow against live project needs.",
  },
] as const;

const investmentRows = [
  ["Kickoff, NDA coordination, and access planning", "Included", "Included"],
  ["Claude Team setup and governance guidance", "Included", "Included"],
  ["Document intake and source packaging workflow", "Included", "Included"],
  ["Work Order template mapping and prompt playbook", "Included", "Included"],
  ["Pilot testing and draft-quality refinement", "Included", "Included"],
  ["Audit record process and reviewer workflow", "Included", "Included"],
  ["Two training sessions and handoff materials", "Included", "Included"],
  ["60-day post-launch optimization window", "Included", "Included"],
  ["Total Phase 1 Fixed Fee", "AI Pilot Implementation - Production", "$18,500"],
] as const;

const assumptions = [
  "Hasen's statement that current Prime Contracts do not restrict this Phase 1 AI processing path remains accurate for the initial projects.",
  "Hasen's outside counsel will handle the legal AI policy; ITECS will provide technical and workflow input as requested.",
  "Hasen retains final legal, commercial, and operational approval of all Work Orders.",
  "Phase 1 uses Claude Team and manual document packaging, not direct API integrations.",
  "Phase 1 does not include custom software development, private model hosting, or direct integration with Procore, Sage, G drive, or Microsoft 365.",
  "Hasen will provide representative Work Order templates, subcontractor agreement context, Prime Contract excerpts, specifications, drawings, insurance requirements, and other required source documents.",
  "Large plan/spec packages may need to be split or summarized before Claude review due to vendor file, page, and context limits.",
  "Audit logging will be implemented as a practical workflow and template, not as a custom immutable compliance platform.",
  "The Phase 1 fixed fee is based on ITECS's AI Pilot Implementation - Production service offering, adapted to Hasen's Work Order drafting use case.",
] as const;

const outOfScope = [
  "Legal advice, legal drafting services, or legal review of contract enforceability.",
  "Drafting Hasen's formal internal AI policy.",
  "Direct API integrations with Procore, Sage, G drive, Microsoft 365, or document management systems.",
  "Automated extraction from all project files without human source-package selection.",
  "Custom application development or an Anthropic API-based application.",
  "Private AI network, private model hosting, or on-premises model deployment.",
  "COI automation, Procore photo analysis, scheduling automation, daily reporting automation, or operations-team workflows.",
  "Ongoing Work Order production support beyond the pilot scenarios and training included above.",
] as const;

const phaseTwo = [
  "Expanding the workflow to 10-20 users.",
  "Creating role-specific prompt libraries for additional departments.",
  "Evaluating Anthropic API or Enterprise controls.",
  "Integrating document intake with Microsoft 365, Procore, or Sage.",
  "Automating Certificate of Insurance review support.",
  "Assessing whether a private or self-hosted AI architecture is technically and economically justified.",
] as const;

const vendorSources = [
  {
    label: "Claude Team plan, seat minimum, pricing, and plan features",
    href: "https://support.claude.com/en/articles/9266767-what-is-the-team-plan",
  },
  {
    label: "Claude Team billing notes and change-pricing caveat",
    href: "https://support.claude.com/en/articles/9267289-how-is-my-team-plan-bill-calculated",
  },
  {
    label: "Anthropic commercial data controller/processor and model-training statement",
    href: "https://support.claude.com/en/articles/9267385-does-anthropic-act-as-a-data-processor-or-controller",
  },
  {
    label: "Supported file uploads and limits",
    href: "https://support.claude.com/en/articles/8241126-upload-files-to-claude",
  },
  {
    label: "Anthropic commercial certifications",
    href: "https://support.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained",
  },
] as const;

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-start gap-3 rounded-lg border border-[var(--border-subtle)] bg-bg-void/40 p-3 text-sm leading-relaxed text-text-secondary"
        >
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export default function HasenClaudeWorkOrderProposal() {
  const [decision, setDecision] = useState<ProposalDecision | null>(null);

  return (
    <div className="min-h-screen overflow-hidden bg-bg-void text-text-primary">
      <section className="relative min-h-screen overflow-hidden px-6 py-28 md:px-12 lg:px-24">
        <GradientOrb
          color="cyan"
          size="lg"
          position={{ top: "-240px", right: "-160px" }}
        />
        <GradientOrb
          color="purple"
          size="md"
          position={{ bottom: "-180px", left: "-120px" }}
        />
        <GridBackground opacity={0.03} />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SlideIn direction="left">
            <SectionLabel>Private Proposal</SectionLabel>
            <h1 className="text-4xl font-light leading-tight tracking-[-0.03em] text-text-primary md:text-6xl lg:text-7xl">
              Claude AI Work Order Drafting Workflow for Hasen Holdings.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
              A practical Phase 1 implementation that helps Hasen prepare more
              complete subcontractor Work Order drafts with Claude Team, while
              preserving legal and executive review authority before any Work
              Order is issued.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["$18,500", "Fixed Phase 1 fee"],
                ["10-15", "Business day implementation"],
                ["60 days", "Post-launch optimization"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-4"
                >
                  <div className="text-2xl font-light text-brand-accent-bright">
                    {value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-text-dim">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#approval"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-accent px-6 py-3 text-sm font-medium uppercase tracking-wide text-bg-void transition-colors hover:bg-brand-accent-bright"
              >
                Review Decision Options
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={pdfHref}
                download
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-accent/30 px-6 py-3 text-sm font-medium uppercase tracking-wide text-brand-accent-bright transition-colors hover:bg-brand-accent/10"
              >
                Download PDF Proposal
                <Download className="h-4 w-4" />
              </a>
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.12}>
            <div className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-bg-surface/50 p-3 shadow-2xl shadow-black/30">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src="/images/proposals/hasen-claude-work-order-hero.png"
                  alt="Construction project documents and AI work order workflow displayed in a modern executive planning room"
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 92vw"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-3 p-4 md:grid-cols-2">
                {[
                  {
                    icon: <Building2 className="h-5 w-5" />,
                    label: "Built for construction document reality",
                    text: "PDF-heavy source packets, drawings, specifications, insurance requirements, and subcontractor scope language.",
                  },
                  {
                    icon: <Scale className="h-5 w-5" />,
                    label: "Human review preserved",
                    text: "David and Paul Witt retain review authority before Work Orders are issued.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-[var(--border-subtle)] bg-bg-void/70 p-4"
                  >
                    <div className="mb-2 flex items-center gap-2 text-brand-accent-bright">
                      {item.icon}
                      <span className="text-sm font-medium text-text-primary">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      <Section className="border-y border-[var(--border-subtle)] bg-bg-surface/30">
        <FadeIn>
          <div className="grid gap-4 md:grid-cols-5">
            {metadataRows.map(([label, value]) => (
              <div key={label} className="rounded-xl border border-[var(--border-subtle)] bg-bg-void/50 p-4">
                <div className="text-[10px] uppercase tracking-widest text-text-dim">
                  {label}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SlideIn direction="left">
            <SectionLabel>Executive Summary</SectionLabel>
            <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
              A controlled AI pilot for Work Order drafting, not premature
              custom software.
            </h2>
          </SlideIn>
          <SlideIn direction="right" delay={0.08}>
            <div className="space-y-5 text-lg leading-relaxed text-text-secondary">
              <p>
                Hasen Holdings is preparing to start two new projects within
                the next 30-45 days, with each project expected to require
                approximately 20-40 subcontractor Work Orders.
              </p>
              <p>
                ITECS recommends a Phase 1 implementation that configures a
                secure Claude Team workflow, maps Hasen&apos;s Work Order
                templates and review process, creates a repeatable
                document-intake and drafting method, trains the initial 3-4
                users, and preserves a path for later expansion to the broader
                10-20 user group.
              </p>
              <p>
                The immediate objective is not to replace legal or management
                review. The objective is to give David and Paul Witt a more
                complete, structured first draft of each Work Order, supported
                by project-specific source documents and an audit trail showing
                the documents, prompt version, draft output, reviewer, and
                approval status.
              </p>
            </div>
          </SlideIn>
        </div>
      </Section>

      <CircuitTrace variant="section-divider" />

      <Section className="bg-bg-surface/20">
        <FadeIn>
          <div className="mb-14 text-center">
            <SectionLabel>Confirmed Inputs</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Phase 1 is sized around Hasen&apos;s current project timing,
              users, documents, and review model.
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="grid gap-4 md:grid-cols-3">
            {confirmedInputs.map((input) => (
              <div
                key={input}
                className="rounded-xl border border-[var(--border-subtle)] bg-bg-void/55 p-5 text-sm leading-relaxed text-text-secondary"
              >
                <CheckCircle2 className="mb-4 h-5 w-5 text-brand-accent-bright" />
                {input}
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SlideIn direction="left">
            <SectionLabel>Recommended Approach</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-5xl">
              Start with Claude Team Standard seats and a controlled manual
              document workflow.
            </h2>
            <p className="mt-5 leading-relaxed text-text-secondary">
              This gives Hasen the fastest path to a working process while
              keeping flexibility for a later Anthropic API, Enterprise, or
              private-model architecture if Phase 1 proves the workflow value.
            </p>
          </SlideIn>

          <SlideIn direction="right" delay={0.1}>
            <div className="rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-6">
              <div className="mb-6 flex items-center gap-3">
                <Bot className="h-6 w-6 text-brand-accent-bright" />
                <h3 className="text-xl font-light text-text-primary">
                  Claude Team assumptions for Phase 1
                </h3>
              </div>
              <div className="grid gap-3">
                {[
                  "Team plans require a minimum of five members.",
                  "Standard seats are currently listed at $25 per member per month when billed monthly, or $20 per member per month when billed annually.",
                  "Current estimated 5-user cost is $125/month on monthly billing, or $1,200/year on annual billing, plus applicable taxes.",
                  "Hasen would purchase Claude directly. ITECS services are quoted separately.",
                  "Claude Team includes administration, billing management, role-based controls, projects, knowledge bases, workplace connectors, and a 200k context window.",
                  "For commercial Claude for Work products, Anthropic states that customer organizations control user data and Anthropic does not train models on commercial customer data unless the customer opts into the Development Partner Program.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-lg border border-brand-accent/15 bg-bg-void/60 p-4 text-sm leading-relaxed text-text-secondary"
                  >
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </Section>

      <Section className="relative border-y border-[var(--border-subtle)] bg-bg-void">
        <GridBackground opacity={0.025} />
        <FadeIn>
          <div className="mb-16 text-center">
            <SectionLabel>Operating Model</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Source documents become structured drafts, then final decisions
              remain with Hasen.
            </h2>
          </div>
        </FadeIn>
        <div className="grid gap-4 lg:grid-cols-5">
          {[
            {
              icon: <FolderInput className="h-6 w-6" />,
              title: "Package Sources",
              text: "Prepare PDFs, limited Excel files, images, Prime Contract excerpts, specifications, drawings, insurance requirements, and scope context.",
            },
            {
              icon: <FileSearch className="h-6 w-6" />,
              title: "Review With Claude",
              text: "Run source-document review prompts inside the approved Claude Team workflow.",
            },
            {
              icon: <PenLine className="h-6 w-6" />,
              title: "Draft Work Order",
              text: "Generate a structured first draft using Hasen's templates, trade-specific prompts, and completeness checklist.",
            },
            {
              icon: <Scale className="h-6 w-6" />,
              title: "Human Approval",
              text: "David and Paul Witt review the draft before any Work Order is issued to a subcontractor.",
            },
            {
              icon: <Database className="h-6 w-6" />,
              title: "Log the Record",
              text: "Capture source package, prompt version, draft date, reviewer, approval status, and final file location.",
            },
          ].map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/45 p-5">
                <div className="mb-5 inline-flex rounded-lg bg-brand-accent/10 p-3 text-brand-accent-bright">
                  {item.icon}
                </div>
                <h3 className="text-lg font-light text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <FadeIn>
          <div className="mb-16 text-center">
            <SectionLabel>Scope of Work</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Eight workstreams to move from concept to controlled production
              use.
            </h2>
          </div>
        </FadeIn>
        <div className="grid gap-6 lg:grid-cols-2">
          {scopeItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeIn key={item.title} delay={index * 0.04}>
                <motion.article
                  whileHover={{ y: -4, borderColor: "rgba(34,211,238,0.28)" }}
                  className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/35 p-6"
                >
                  <div className="mb-5 flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent-bright">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-light text-text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {item.text}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    {item.deliverables.map((deliverable) => (
                      <div
                        key={deliverable}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                        <span>{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      <CircuitTrace variant="section-divider" />

      <Section className="bg-bg-surface/20">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <SlideIn direction="left">
            <SectionLabel>Audit Record</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-5xl">
              Practical traceability for every AI-assisted Work Order.
            </h2>
            <p className="mt-5 leading-relaxed text-text-secondary">
              ITECS will design a lightweight audit record Hasen can maintain
              for each AI-assisted Work Order. This is an operational record and
              reviewer workflow, not a substitute for Hasen&apos;s legal
              document management or formal records-retention system.
            </p>
          </SlideIn>
          <SlideIn direction="right" delay={0.1}>
            <CheckList items={auditFields} />
          </SlideIn>
        </div>
      </Section>

      <Section>
        <FadeIn>
          <div className="mb-14 text-center">
            <SectionLabel>Timeline</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Initial implementation in 10-15 business days after access and
              source documents are ready.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-text-secondary">
              The schedule can move faster if Hasen provides documents and
              reviewer availability early. The included optimization window
              follows initial delivery.
            </p>
          </div>
        </FadeIn>
        <div className="mx-auto max-w-4xl">
          {timeline.map((item, index) => (
            <FadeIn key={item.week} delay={index * 0.08}>
              <div className="grid gap-4 border-l border-brand-accent/25 pb-10 pl-6 last:pb-0 md:grid-cols-[160px_1fr]">
                <div className="relative">
                  <div className="absolute -left-[33px] flex h-4 w-4 rounded-full border border-brand-accent bg-bg-void shadow-[0_0_20px_rgba(34,211,238,0.4)]" />
                  <div className="text-sm uppercase tracking-widest text-brand-accent-bright">
                    {item.week}
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/40 p-5">
                  <h3 className="text-lg font-light text-text-primary">
                    {item.milestone}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {item.outcome}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section id="investment" className="relative border-y border-[var(--border-subtle)] bg-bg-void">
        <GridBackground opacity={0.02} />
        <FadeIn>
          <div className="mb-16 text-center">
            <SectionLabel>Investment</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Fixed-fee Phase 1 implementation with no expansion without written
              authorization.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-text-secondary">
              ITECS proposes Phase 1 as a fixed-fee AI Pilot Implementation -
              Production engagement. The fee includes scoped implementation,
              pilot testing, audit-trail documentation, two training sessions,
              and the 60-day post-launch optimization window.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-brand-accent/20 bg-gradient-to-b from-brand-accent/5 to-transparent">
            <div className="grid gap-4 border-b border-[var(--border-subtle)] p-6 md:grid-cols-3">
              {[
                {
                  icon: <FileCheck2 className="h-5 w-5" />,
                  value: "$18,500",
                  label: "Total Phase 1 fixed fee",
                },
                {
                  icon: <Clock3 className="h-5 w-5" />,
                  value: "10-15 business days",
                  label: "Initial implementation",
                },
                {
                  icon: <Workflow className="h-5 w-5" />,
                  value: "60 days",
                  label: "Included optimization",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[var(--border-subtle)] bg-bg-void/60 p-5"
                >
                  <div className="mb-3 text-brand-accent-bright">{item.icon}</div>
                  <div className="text-2xl font-light text-text-primary">
                    {item.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-text-dim">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="divide-y divide-[var(--border-subtle)]">
              {investmentRows.map(([workstream, scope, fee]) => (
                <div
                  key={workstream}
                  className="grid gap-3 p-4 text-sm md:grid-cols-[1.2fr_0.7fr_0.5fr]"
                >
                  <div className="text-text-secondary">{workstream}</div>
                  <div className="text-text-dim">{scope}</div>
                  <div className="font-medium text-text-primary md:text-right">
                    {fee}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 lg:grid-cols-2">
          <FadeIn delay={0.12}>
            <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/35 p-6">
              <div className="mb-3 flex items-center gap-2 text-text-primary">
                <Layers3 className="h-5 w-5 text-brand-accent-bright" />
                <h3 className="font-medium">Third-party subscription cost</h3>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                Claude subscription fees are not included in the ITECS services
                cap. Hasen would purchase Claude directly from Anthropic. Based
                on current published Team plan information for U.S. customers,
                the estimated 5-user Standard cost is $125/month on monthly
                billing, or $1,200/year on annual billing, plus applicable
                taxes.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.16}>
            <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/35 p-6">
              <div className="mb-3 flex items-center gap-2 text-text-primary">
                <Sparkles className="h-5 w-5 text-brand-accent-bright" />
                <h3 className="font-medium">Optional post-launch support</h3>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                After the included 60-day optimization window, optional managed
                AI support can continue prompt refinement, training expansion,
                new Work Order templates, or Phase 2 planning. Current managed
                AI options start at $1,950/month for up to 10 users and
                $2,650/month for 11-25 users.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <SlideIn direction="left">
            <SectionLabel>Phase 1 Assumptions</SectionLabel>
            <h2 className="mb-6 text-3xl font-light text-text-primary md:text-4xl">
              The fixed fee depends on clear boundaries.
            </h2>
            <CheckList items={assumptions} />
          </SlideIn>
          <SlideIn direction="right" delay={0.12}>
            <SectionLabel>Out of Scope</SectionLabel>
            <h2 className="mb-6 text-3xl font-light text-text-primary md:text-4xl">
              Items that require written change order or Phase 2 scope.
            </h2>
            <CheckList items={outOfScope} />
          </SlideIn>
        </div>
      </Section>

      <CircuitTrace variant="section-divider" />

      <Section className="bg-bg-surface/20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SlideIn direction="left">
            <SectionLabel>Phase 2 Path</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-5xl">
              The Phase 1 work can carry forward into a more advanced
              architecture.
            </h2>
            <p className="mt-5 leading-relaxed text-text-secondary">
              If Phase 1 is successful, the workflow logic, prompt library,
              source-document structure, audit process, and reviewer
              expectations can be preserved even if Hasen later moves to an API,
              Enterprise, or private architecture.
            </p>
          </SlideIn>
          <SlideIn direction="right" delay={0.1}>
            <CheckList items={phaseTwo} />
          </SlideIn>
        </div>
      </Section>

      <Section>
        <FadeIn>
          <div className="mb-12 text-center">
            <SectionLabel>Acceptance</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Approval starts the Phase 1 kickoff process.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-text-secondary">
              To proceed, Hasen would approve the Phase 1 scope, confirm the
              fixed Phase 1 fee, and identify the initial pilot users and sample
              project documents. ITECS is prepared to begin Phase 1 promptly
              upon approval.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mx-auto max-w-3xl rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: <BookOpenCheck className="h-5 w-5" />,
                  title: "PDF copy",
                  text: "Download the formal proposal document for internal review.",
                  href: pdfHref,
                  label: "Download PDF",
                },
                {
                  icon: <Lock className="h-5 w-5" />,
                  title: "Private page",
                  text: "This page is unlisted and excluded from search indexing, but it is not a login-protected portal.",
                  href: "#approval",
                  label: "Respond Online",
                },
              ].map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  download={item.href === pdfHref}
                  className="group rounded-xl border border-[var(--border-subtle)] bg-bg-void/60 p-5 transition-colors hover:border-brand-accent/35"
                >
                  <div className="mb-3 flex items-center gap-2 text-brand-accent-bright">
                    {item.icon}
                    <span className="text-sm font-medium text-text-primary">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {item.text}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm text-brand-accent group-hover:text-brand-accent-bright">
                    {item.label}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section className="border-y border-[var(--border-subtle)] bg-bg-void">
        <FadeIn>
          <div className="mb-10 text-center">
            <SectionLabel>Vendor Source Notes</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Source references used for Claude plan and security statements.
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="grid gap-3">
            {vendorSources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/35 p-4 text-sm text-text-secondary transition-colors hover:border-brand-accent/30 hover:text-text-primary"
              >
                <span>{source.label}</span>
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
              </a>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section id="approval" className="relative bg-bg-surface/20">
        <GradientOrb
          color="cyan"
          size="md"
          position={{ top: "-160px", left: "10%" }}
        />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <FadeIn>
            <SectionLabel>Proposal Response</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-5xl">
              Ready to move forward with Phase 1?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-text-secondary">
              Approving the proposal confirms the fixed-fee Phase 1 scope and
              starts scheduling for kickoff, access planning, and document
              exchange. If the proposal needs changes, use the decline option to
              send the requested adjustment notes.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setDecision("approve")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-accent px-6 py-3 text-sm font-medium uppercase tracking-wide text-bg-void transition-colors hover:bg-brand-accent-bright"
              >
                Approve Proposal
                <CheckCircle2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDecision("decline")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border-subtle)] px-6 py-3 text-sm font-medium uppercase tracking-wide text-text-secondary transition-colors hover:border-red-400/50 hover:text-red-200"
              >
                Decline
                <X className="h-4 w-4" />
              </button>
            </div>
          </FadeIn>

          <AnimatePresence mode="wait">
            {decision ? <ProposalDecisionForm decision={decision} /> : null}
          </AnimatePresence>
        </div>
      </Section>
    </div>
  );
}
