"use client";

import type { FormEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Database,
  ExternalLink,
  FileText,
  FolderOpen,
  Globe,
  ImageIcon,
  Layers3,
  Lock,
  MonitorCheck,
  PackageCheck,
  PanelsTopLeft,
  Puzzle,
  Rocket,
  Server,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Store,
  UserCheck,
  X,
  Zap,
} from "lucide-react";

type ProposalDecision = "approve" | "decline";
type ProposalSubmitState = "idle" | "submitting" | "success" | "error";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`py-24 px-6 md:px-12 lg:px-24 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
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
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
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
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === "left" ? -48 : 48 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
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
      proposal: "FCC Marketplace Posting Assistant Proposal",
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
            ? "FCC Marketplace Assistant Proposal Approval"
            : "FCC Marketplace Assistant Proposal Decline",
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
          ? "Approval received. ITECS will follow up to schedule the kickoff conversation."
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
      className={`mt-6 overflow-hidden rounded-2xl border p-5 text-left shadow-[0_0_45px_rgba(6,182,212,0.08)] md:p-6 ${
        isApproval
          ? "border-brand-accent/35 bg-brand-accent/5"
          : "border-red-400/30 bg-red-400/5"
      }`}
    >
      <input
        type="hidden"
        name="proposalAction"
        value={isApproval ? "Approved" : "Declined"}
      />

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
              ? "Confirm the approval details below and ITECS will schedule kickoff."
              : "Share what changed or what needs to be adjusted so ITECS can respond appropriately."}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor={`${decision}-name`}
            className="mb-1.5 block text-sm text-text-dim"
          >
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
          <label
            htmlFor={`${decision}-email`}
            className="mb-1.5 block text-sm text-text-dim"
          >
            Email
          </label>
          <input
            id={`${decision}-email`}
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-[var(--border-subtle)] bg-bg-void px-4 py-3 text-text-primary placeholder:text-text-dim/50 transition-colors focus:border-brand-accent focus:outline-none"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label
            htmlFor={`${decision}-phone`}
            className="mb-1.5 block text-sm text-text-dim"
          >
            Phone
          </label>
          <input
            id={`${decision}-phone`}
            name="phone"
            type="tel"
            className="w-full rounded-lg border border-[var(--border-subtle)] bg-bg-void px-4 py-3 text-text-primary placeholder:text-text-dim/50 transition-colors focus:border-brand-accent focus:outline-none"
            placeholder="(555) 555-5555"
          />
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor={`${decision}-message`}
          className="mb-1.5 block text-sm text-text-dim"
        >
          {isApproval ? "Notes or Kickoff Details" : "Reason for Declining"}
        </label>
        <textarea
          id={`${decision}-message`}
          name="message"
          rows={4}
          required={!isApproval}
          className="w-full resize-none rounded-lg border border-[var(--border-subtle)] bg-bg-void px-4 py-3 text-text-primary placeholder:text-text-dim/50 transition-colors focus:border-brand-accent focus:outline-none"
          placeholder={
            isApproval
              ? "Optional notes, schedule preferences, or kickoff questions..."
              : "Please share why you are declining or what would need to change..."
          }
        />
      </div>

      {isApproval ? (
        <label className="mt-4 flex items-start gap-3 rounded-lg border border-brand-accent/20 bg-brand-accent/5 p-4 text-sm text-text-secondary">
          <input
            name="approvalConfirmation"
            type="checkbox"
            value="Confirmed"
            required
            className="mt-1 h-4 w-4 rounded border-brand-accent/40 bg-bg-void accent-brand-accent"
          />
          <span>
            I confirm approval of the FCC Marketplace Posting Assistant proposal
            and authorize ITECS to schedule the kickoff conversation.
          </span>
        </label>
      ) : null}

      <TurnstileWidget
        resetSignal={turnstileResetSignal}
        onTokenChange={(token) => {
          setTurnstileToken(token);
          if (token && submitState === "error") {
            setSubmitState("idle");
            setFeedback("");
          }
        }}
        onError={() => {
          setSubmitState("error");
          setFeedback("Verification could not load. Please refresh and try again.");
        }}
        className="mt-4 rounded-lg border border-[var(--border-subtle)] bg-bg-void px-4 py-3"
      />

      {feedback ? (
        <p
          role="status"
          className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
            submitState === "success"
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
              : "border-red-400/30 bg-red-400/10 text-red-200"
          }`}
        >
          {feedback}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium uppercase tracking-wide transition-all disabled:cursor-not-allowed disabled:opacity-60 md:w-auto ${
          isApproval
            ? "bg-brand-accent text-bg-void hover:bg-brand-accent-bright hover:shadow-[0_0_30px_var(--glow-cyan)]"
            : "border border-red-400/40 text-red-200 hover:border-red-300/70 hover:bg-red-400/10"
        }`}
      >
        {submitState === "submitting"
          ? "Sending..."
          : isApproval
            ? "Confirm Approval"
            : "Send Decline Notice"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.form>
  );
}

export default function FCCMarketplacePostingAssistantProposal() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [proposalDecision, setProposalDecision] =
    useState<ProposalDecision | null>(null);

  const tracks = [
    {
      icon: <Puzzle className="h-5 w-5" />,
      title: "Chrome Extension Foundation",
      effort: "25-40 hrs",
      cap: "40 hr cap",
      range: "$2,375-$3,800",
      summary:
        "Build the Manifest V3 extension, sidebar or popup interface, scoped permissions, and Chrome Web Store-ready package.",
      items: [
        "Manifest V3 extension setup with React and TypeScript.",
        "Sidebar or popup experience for FCC sales reps.",
        "Content script integration with Facebook Marketplace pages.",
        "Scoped Chrome permissions and secure extension-to-back-end communication.",
        "Development packaging plus Chrome Web Store listing support materials.",
      ],
    },
    {
      icon: <SlidersHorizontal className="h-5 w-5" />,
      title: "Marketplace Posting Workflow",
      effort: "45-75 hrs",
      cap: "75 hr cap",
      range: "$4,275-$7,125",
      summary:
        "Automate the repeatable parts of listing creation while keeping price, location, boost, groups, and final publish in the rep's control.",
      items: [
        "Detect the listing creation flow and fill stable fields where practical.",
        "Assist with photos, title, description, category, condition, and delivery defaults when confirmed.",
        "Pause at human review points for price, city, boosting, group posting, and final publish.",
        "Rotate or suggest approved content to reduce repetitive-looking listings.",
        "Test with Michael, Sarah, and pilot users against the real posting workflow.",
      ],
    },
    {
      icon: <Server className="h-5 w-5" />,
      title: "FCC Back End and Content Controls",
      effort: "35-60 hrs",
      cap: "60 hr cap",
      range: "$3,325-$5,700",
      summary:
        "Create the secure FCC-controlled API, user identity, image metadata, template library, and operational logs used by the extension.",
      items: [
        "API foundation for extension data and posting assistant rules.",
        "User or rep identity with revocable extension access.",
        "Shared FCC templates plus per-rep title and description libraries.",
        "Google Drive and/or Google Sheets integration for curated assets and configuration.",
        "Image metadata, recent-use tracking, activity logs, and basic admin controls.",
      ],
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "Pilot Polish and Release Support",
      effort: "20-35 hrs",
      cap: "35 hr cap",
      range: "$1,900-$3,325",
      summary:
        "Prepare the private or unlisted Chrome Web Store release, pilot installation, support notes, and first-user feedback loop.",
      items: [
        "Chrome Web Store submission support and reviewer instructions.",
        "Privacy language, screenshots, and listing text for the extension package.",
        "Pilot installation support for the first FCC users.",
        "Bug fixes from early pilot usage.",
        "Light training notes for sales reps.",
      ],
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-bg-surface text-text-primary">
      <div className="relative overflow-hidden">
        <GradientOrb color="cyan" size="lg" position={{ top: "-220px", left: "-180px" }} />
        <GradientOrb color="purple" size="md" position={{ bottom: "-140px", right: "-120px" }} />
        <GridBackground opacity={0.025} />

        <div className="relative mx-auto max-w-6xl px-6 pb-8 pt-24 md:px-12 lg:px-24">
          <div className="grid gap-12 pb-16 md:grid-cols-[0.92fr_1.08fr] md:items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
              >
                <SectionLabel>First Choice Containers Proposal</SectionLabel>
                <h1 className="mb-6 text-4xl font-light leading-tight text-text-primary md:text-5xl lg:text-6xl">
                  FCC Marketplace{" "}
                  <span className="bg-gradient-to-r from-brand-accent-bright to-brand-purple bg-clip-text text-transparent">
                    Posting Assistant
                  </span>
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-text-secondary">
                  A Chrome extension and secure back-end service that helps FCC
                  sales reps prepare Facebook Marketplace listings faster, using
                  approved images, approved copy, repeatable controls, and human
                  review before anything is published.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mb-8 flex flex-wrap gap-4"
              >
                <a
                  href="#scope"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-accent px-6 py-3 text-sm font-medium text-bg-void transition-colors hover:bg-brand-accent-bright"
                >
                  VIEW FULL SCOPE <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-6 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-brand-accent/50"
                >
                  SEE INVESTMENT
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
                className="grid grid-cols-3 gap-3"
              >
                {[
                  { value: "30 sec", label: "Target posting flow" },
                  { value: "$95/hr", label: "FCC relationship rate" },
                  { value: "$19,950", label: "First-release cap" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-gray-800/50 bg-gray-900/20 p-4 text-center"
                  >
                    <div className="text-xl font-light text-brand-accent-bright">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-widest text-text-dim">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.22 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl border border-brand-accent/20 bg-bg-void shadow-2xl">
                <Image
                  src="/images/proposals/fcc-marketplace-assistant-hero.png"
                  alt="Generated visual of the FCC Marketplace Posting Assistant deliverables"
                  width={1672}
                  height={941}
                  priority
                  className="h-auto w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-gray-700/50 bg-bg-void/80 p-3 backdrop-blur">
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span className="h-2 w-2 rounded-full bg-brand-accent-bright shadow-[0_0_18px_var(--glow-cyan)]" />
                    Extension workflow, approved content library, secure API,
                    audit logs, and human review gates.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <ChevronDown className="h-5 w-5 text-text-dim" />
          </motion.div>
        </div>
      </div>

      <CircuitTrace variant="section-divider" />

      <Section className="border-t border-gray-800/50">
        <FadeIn>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <SectionLabel>Executive Summary</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              A Practical Sales Enablement Tool, Not Another Portal
            </h2>
            <p className="mt-4 leading-relaxed text-text-secondary">
              The recommended first release keeps reps where they already work:
              Chrome and Facebook Marketplace. The assistant fills repeatable
              listing details from FCC-controlled sources, while sales reps
              continue to own price, city, boost decisions, group posting, and
              final publish.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <Clock className="h-5 w-5 text-amber-400" />,
              title: "Posting Takes Too Long",
              description:
                "Current Marketplace posting can take roughly 3-4 minutes per listing. FCC wants reps to create several posts per day without creating duplicate-looking content.",
              badge: "Current Friction",
            },
            {
              icon: <FolderOpen className="h-5 w-5 text-brand-accent-bright" />,
              title: "Content Needs Control",
              description:
                "Images, titles, and descriptions should come from approved FCC repositories instead of each rep reinventing the post from scratch every time.",
              badge: "Controlled Inputs",
            },
            {
              icon: <UserCheck className="h-5 w-5 text-brand-accent-bright" />,
              title: "Humans Stay In Charge",
              description:
                "The system assists with preparation. It does not store Facebook credentials, decide pricing, spend boost dollars, choose groups, or publish without review.",
              badge: "Human Review",
            },
          ].map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.1}>
              <div className="h-full rounded-xl border border-gray-800/50 bg-gray-900/30 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="rounded-lg bg-gray-800/40 p-2">{item.icon}</div>
                  <span className="rounded-full bg-brand-accent/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand-accent-bright">
                    {item.badge}
                  </span>
                </div>
                <h3 className="mb-2 font-medium text-text-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="border-t border-gray-800/50 bg-bg-void">
        <FadeIn>
          <div className="mb-16 text-center">
            <SectionLabel>Recommended Direction</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Build for Chrome Web Store Release From the Start
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-text-secondary">
              Development can use local unpacked installs for fast testing, but
              the first client-ready package should be prepared for a private
              trusted-tester or unlisted Chrome Web Store release.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          <SlideIn direction="left">
            <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6">
              <div className="mb-4 flex items-center gap-2">
                <X className="h-5 w-5 text-red-300" />
                <h3 className="font-medium text-text-primary">Avoid for First Release</h3>
              </div>
              <ul className="space-y-3 text-sm text-text-secondary">
                {[
                  "A separate portal that reps must remember to open before posting.",
                  "A shared remote desktop or centralized Codex App workflow for normal sales users.",
                  "Every rep running local developer tooling.",
                  "Automated pricing, boost spend, group posting, or final publish in version one.",
                  "Self-hosted CRX installation unless FCC confirms managed browser policies.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-300/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.12}>
            <div className="rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Check className="h-5 w-5 text-brand-accent-bright" />
                <h3 className="font-medium text-text-primary">Build Instead</h3>
              </div>
              <ul className="space-y-3 text-sm text-text-secondary">
                {[
                  "A focused Chrome extension that appears while reps work inside Marketplace.",
                  "A secure FCC-controlled back end for approved images, templates, profiles, and logs.",
                  "Google Drive and/or Sheets integration through the back end, not the browser extension.",
                  "Human-in-the-loop posting controls for cost, account continuity, and sales judgment.",
                  "Private or unlisted Chrome Web Store packaging for clean installation and updates.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-accent-bright" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SlideIn>
        </div>
      </Section>

      <Section className="relative border-t border-gray-800/50" id="architecture">
        <GridBackground opacity={0.025} />
        <FadeIn>
          <div className="mb-16 text-center">
            <SectionLabel>Solution Architecture</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              The Extension Handles the Workflow. The Back End Controls the Data.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="rounded-2xl border border-gray-800/50 bg-gray-900/20 p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-5">
              {[
                {
                  icon: <Globe className="h-6 w-6" />,
                  label: "Rep in Chrome",
                  detail: "Existing browser and Facebook session.",
                },
                {
                  icon: <PanelsTopLeft className="h-6 w-6" />,
                  label: "Extension UI",
                  detail: "Sidebar or popup assistant for listing prep.",
                },
                {
                  icon: <SlidersHorizontal className="h-6 w-6" />,
                  label: "Marketplace Flow",
                  detail: "Fill stable fields and pause for review.",
                },
                {
                  icon: <Database className="h-6 w-6" />,
                  label: "FCC API",
                  detail: "Templates, image metadata, users, and logs.",
                },
                {
                  icon: <Shield className="h-6 w-6" />,
                  label: "Controls",
                  detail: "Revocable access, validation, audit trail.",
                },
              ].map((layer, index) => (
                <div key={layer.label} className="relative">
                  <motion.div
                    whileHover={{ y: -4, borderColor: "rgba(34,211,238,0.35)" }}
                    className="h-full rounded-xl border border-gray-800/50 bg-gray-800/20 p-5 text-center"
                  >
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent-bright">
                      {layer.icon}
                    </div>
                    <h3 className="mb-2 text-sm font-medium text-text-primary">
                      {layer.label}
                    </h3>
                    <p className="text-xs leading-relaxed text-text-dim">
                      {layer.detail}
                    </p>
                  </motion.div>
                  {index < 4 ? (
                    <div className="pointer-events-none absolute left-full top-1/2 hidden h-px w-4 bg-gradient-to-r from-brand-accent/50 to-transparent md:block" />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {[
                {
                  icon: <ImageIcon className="h-5 w-5" />,
                  label: "Approved Images",
                  text: "Curated buckets from FCC-controlled image repositories.",
                },
                {
                  icon: <FileText className="h-5 w-5" />,
                  label: "Approved Copy",
                  text: "Shared and per-rep title and description variations.",
                },
                {
                  icon: <ClipboardCheck className="h-5 w-5" />,
                  label: "Posting Logs",
                  text: "Selected assets, template use, and failure details.",
                },
                {
                  icon: <Bot className="h-5 w-5" />,
                  label: "Optional AI",
                  text: "Later image scoring and copy variation inside guardrails.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-gray-800/40 bg-bg-void/60 p-4"
                >
                  <div className="mb-3 text-brand-accent-bright">{item.icon}</div>
                  <h4 className="mb-1 text-sm font-medium text-text-primary">
                    {item.label}
                  </h4>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      <CircuitTrace variant="section-divider" />

      <Section className="border-t border-gray-800/50" id="scope">
        <FadeIn>
          <div className="mb-16 text-center">
            <SectionLabel>Scope of Work</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Four Capped Build Tracks
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-text-secondary">
              Each track has an effort range and a cap. If a track reaches its
              cap before the intended outcome is complete, ITECS will stop,
              review findings with FCC, and get approval before expanding scope.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-[290px_1fr]">
          <div className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-x-visible md:pb-0">
            {tracks.map((track, index) => (
              <motion.button
                key={track.title}
                type="button"
                onClick={() => setActiveTrack(index)}
                whileHover={{ x: 4 }}
                className={`flex min-w-[240px] items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all md:min-w-0 ${
                  activeTrack === index
                    ? "border-brand-accent/30 bg-brand-accent/10 text-brand-accent-bright"
                    : "border-transparent text-text-dim hover:border-gray-800 hover:text-text-secondary"
                }`}
              >
                {track.icon}
                <span className="font-medium">{track.title}</span>
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeTrack}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-gray-800/50 bg-gray-900/30 p-6 md:p-8"
          >
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <div className="mb-2 flex items-center gap-2 text-brand-accent-bright">
                  {tracks[activeTrack].icon}
                  <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                    Build Track {activeTrack + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-light text-text-primary">
                  {tracks[activeTrack].title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
                  {tracks[activeTrack].summary}
                </p>
              </div>
              <div className="grid min-w-[190px] grid-cols-2 gap-2 text-center">
                <div className="rounded-lg border border-gray-800/50 bg-gray-800/30 p-3">
                  <div className="text-sm text-text-primary">{tracks[activeTrack].effort}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-text-dim">
                    Effort
                  </div>
                </div>
                <div className="rounded-lg border border-brand-accent/20 bg-brand-accent/5 p-3">
                  <div className="text-sm text-brand-accent-bright">
                    {tracks[activeTrack].cap}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-text-dim">
                    Limit
                  </div>
                </div>
              </div>
            </div>

            <ul className="space-y-3">
              {tracks[activeTrack].items.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent/70" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-4">
              <div className="text-xs uppercase tracking-widest text-text-dim">
                Estimated Investment for this Track
              </div>
              <div className="mt-1 text-xl font-light text-text-primary">
                {tracks[activeTrack].range}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section className="border-t border-gray-800/50 bg-bg-void">
        <FadeIn>
          <div className="mb-16 text-center">
            <SectionLabel>Operating Guardrails</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Designed to Assist Reps Without Taking Over the Sale
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Lock className="h-6 w-6" />,
              title: "No Facebook Credentials Stored",
              text: "The extension operates through the rep's existing browser session. The back end does not store Facebook passwords or session cookies.",
            },
            {
              icon: <UserCheck className="h-6 w-6" />,
              title: "Final Publish Stays Manual",
              text: "The rep reviews the listing and makes the final publish decision. Version one does not silently publish listings.",
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: "Spend Decisions Stay Manual",
              text: "Boosting, group posting, and price strategy remain under rep control to avoid accidental spend or poor buyer conversations.",
            },
            {
              icon: <MonitorCheck className="h-6 w-6" />,
              title: "Operational Risk Tracked",
              text: "Facebook UI changes and Marketplace flow changes are support risks that should be monitored, tested, and maintained over time.",
            },
          ].map((guardrail, index) => (
            <FadeIn key={guardrail.title} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -5, borderColor: "rgba(34,211,238,0.3)" }}
                className="h-full rounded-xl border border-gray-800/50 bg-gray-900/30 p-6"
              >
                <div className="mb-4 inline-flex rounded-lg bg-brand-accent/10 p-2 text-brand-accent-bright">
                  {guardrail.icon}
                </div>
                <h3 className="mb-2 font-medium text-text-primary">
                  {guardrail.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {guardrail.text}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="border-t border-gray-800/50">
        <div className="grid gap-16 md:grid-cols-2 md:items-start">
          <SlideIn direction="left">
            <SectionLabel>Release Path</SectionLabel>
            <h2 className="mb-6 text-3xl font-light text-text-primary md:text-4xl">
              Simple Pilot Installation, Clean Update Path
            </h2>
            <p className="mb-8 leading-relaxed text-text-secondary">
              The practical release path is to build toward Chrome Web Store
              distribution. Local unpacked installation is useful for
              development testing, but Chrome Web Store packaging gives FCC a
              cleaner install and update path for pilot users.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "Development Testing",
                  desc: "Use Load unpacked for Brian, Michael, Sarah, and early technical validation.",
                },
                {
                  label: "FCC Test Release",
                  desc: "Use private trusted testers or unlisted Chrome Web Store visibility, depending on rep account reality.",
                },
                {
                  label: "Internal Rollout",
                  desc: "Keep Chrome Web Store auto-updates. If FCC manages Chrome browsers, policies can simplify installation later.",
                },
              ].map((step, index) => (
                <div key={step.label} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-accent/30 bg-brand-accent/10 text-sm text-brand-accent-bright">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-text-primary">{step.label}</h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.12}>
            <div className="rounded-2xl border border-gray-800/50 bg-gray-900/20 p-6">
              <div className="mb-5 flex items-center gap-3">
                <Store className="h-6 w-6 text-brand-accent-bright" />
                <h3 className="text-xl font-light text-text-primary">
                  Chrome Web Store Requirements
                </h3>
              </div>
              <div className="grid gap-3">
                {[
                  "Developer account and extension ownership decision.",
                  "Stable API/admin domain for host permissions.",
                  "Narrow permission list and clear privacy disclosure.",
                  "Screenshots, listing copy, support email, and test instructions.",
                  "Private trusted-tester or unlisted visibility decision.",
                  "Back-end authentication so installation alone does not grant FCC data access.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-lg border border-gray-800/40 bg-bg-void/50 p-3 text-sm text-text-secondary"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </Section>

      <Section className="relative border-t border-gray-800/50 bg-bg-void" id="pricing">
        <GridBackground opacity={0.02} />
        <FadeIn>
          <div className="mb-16 text-center">
            <SectionLabel>Investment</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Discounted FCC Relationship Rate With a Not-to-Exceed Cap
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-text-secondary">
              This is custom software automation against a live browser
              workflow. The pricing is hourly at the discounted FCC rate, with
              capped tracks and a first-release cap unless FCC approves
              expansion.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mx-auto max-w-4xl rounded-2xl border border-brand-accent/20 bg-gradient-to-b from-brand-accent/5 to-transparent p-6 md:p-8">
            <div className="mb-8 grid gap-4 md:grid-cols-3">
              {[
                { value: "$95/hr", label: "FCC relationship rate" },
                { value: "125-210", label: "Expected first-release hours" },
                { value: "$19,950", label: "Not-to-exceed cap" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-gray-800/50 bg-bg-void/60 p-5 text-center"
                >
                  <div className="text-2xl font-light text-brand-accent-bright">
                    {item.value}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-widest text-text-dim">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {tracks.map((track) => (
                <div
                  key={track.title}
                  className="flex flex-col gap-2 rounded-xl border border-gray-800/40 bg-gray-800/20 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-brand-accent-bright">{track.icon}</div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">
                        {track.title}
                      </div>
                      <div className="text-xs text-text-dim">
                        {track.effort} | {track.cap}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-text-secondary">{track.range}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-gray-800/50 pt-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-sm text-text-secondary">
                    Expected First Release Range
                  </div>
                  <div className="mt-1 text-xs text-text-dim">
                    Includes extension, back end, Marketplace workflow,
                    Chrome Web Store packaging, pilot polish, and release support.
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-4xl font-light text-text-primary">
                    $11,875-$19,950
                  </div>
                  <div className="mt-1 text-xs text-brand-accent-bright">
                    First release capped at $19,950 unless FCC approves more scope.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-gray-800/50 bg-gray-800/20 p-5">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-text-primary">
                <Sparkles className="h-4 w-4 text-brand-accent-bright" />
                Relationship-rate context
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                Comparable custom AI and software automation work would normally
                be quoted at $150-$175/hour minimum. At 125-210 hours, that
                normal rate range would be approximately $18,750-$36,750. The
                FCC relationship rate reduces the expected range by roughly
                $6,875-$16,800.
              </p>
            </div>
          </div>
        </FadeIn>
      </Section>

      <Section className="border-t border-gray-800/50">
        <FadeIn>
          <div className="mb-16 text-center">
            <SectionLabel>Delivery Sequence</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Build, Test, Release, Then Expand Based on Pilot Use
            </h2>
          </div>
        </FadeIn>

        <div className="mx-auto max-w-3xl">
          {[
            {
              title: "Kickoff and Source Alignment",
              detail:
                "Confirm pilot users, first image folder, initial posting profiles, title/description examples, API/admin domain, and Web Store ownership.",
              tag: "Start",
            },
            {
              title: "Extension and Back End Build",
              detail:
                "Develop the Manifest V3 extension, secure API, template library, image metadata, and field-fill workflow in parallel.",
              tag: "Build",
            },
            {
              title: "Real Workflow Testing",
              detail:
                "Test against Michael and Sarah's actual Marketplace posting flow, tune selectors, confirm pause points, and validate logging.",
              tag: "Pilot",
            },
            {
              title: "Chrome Web Store Release Support",
              detail:
                "Prepare listing assets, privacy language, screenshots, reviewer instructions, and private or unlisted pilot distribution.",
              tag: "Release",
            },
            {
              title: "Post-Pilot Expansion Review",
              detail:
                "Review bugs, support data, rep adoption, additional profiles, admin UI improvements, AI scoring, and whether SaaS productization is worth separate scope.",
              tag: "Next",
            },
          ].map((milestone, index, list) => (
            <FadeIn key={milestone.title} delay={index * 0.08}>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-accent/30 bg-brand-accent/10 text-sm font-medium text-brand-accent-bright">
                    {index + 1}
                  </div>
                  {index < list.length - 1 ? (
                    <div className="mt-2 h-full w-px bg-gradient-to-b from-brand-accent/30 to-transparent" />
                  ) : null}
                </div>
                <div className="pb-8">
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-accent-bright">
                    {milestone.tag}
                  </div>
                  <h3 className="mb-1 font-medium text-text-primary">
                    {milestone.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {milestone.detail}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mx-auto mt-4 max-w-3xl rounded-xl border border-amber-400/20 bg-amber-400/5 p-5">
            <p className="text-sm leading-relaxed text-amber-100/90">
              Chrome Web Store review time is calendar time outside engineering
              control. ITECS will prepare the package and support submission,
              but review timing is determined by Google.
            </p>
          </div>
        </FadeIn>
      </Section>

      <Section className="border-t border-gray-800/50 bg-bg-void">
        <FadeIn>
          <div className="mb-16 text-center">
            <SectionLabel>Included Deliverables</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              What FCC Receives in the First Release
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <PackageCheck className="h-6 w-6" />,
              title: "Extension Package",
              items: [
                "Manifest V3 extension",
                "Sidebar or popup UI",
                "Scoped permissions",
                "Content script workflow",
                "Store-ready packaging",
              ],
            },
            {
              icon: <Layers3 className="h-6 w-6" />,
              title: "Posting Workflow",
              items: [
                "Marketplace page detection",
                "Image assistance",
                "Title and description assistance",
                "Stable field filling",
                "Human review pause points",
              ],
            },
            {
              icon: <Database className="h-6 w-6" />,
              title: "Back-End Controls",
              items: [
                "Secure extension API",
                "Rep identity",
                "Template libraries",
                "Image metadata",
                "Activity logs",
              ],
            },
            {
              icon: <Globe className="h-6 w-6" />,
              title: "Google Integration",
              items: [
                "Drive image source planning",
                "Sheets/config support if needed",
                "Curated buckets",
                "Recent-use tracking",
                "Least-privilege access",
              ],
            },
            {
              icon: <Shield className="h-6 w-6" />,
              title: "Security and Governance",
              items: [
                "HTTPS API access",
                "Revocable extension access",
                "Payload validation",
                "Audit trail",
                "No Facebook password storage",
              ],
            },
            {
              icon: <BookIconFallback />,
              title: "Release Support",
              items: [
                "Reviewer instructions",
                "Privacy/listing copy",
                "Pilot installation support",
                "Bug-fix window",
                "Light rep training notes",
              ],
            },
          ].map((block, index) => (
            <FadeIn key={block.title} delay={index * 0.06}>
              <div className="h-full rounded-xl border border-gray-800/50 bg-gray-900/30 p-6">
                <div className="mb-4 text-brand-accent-bright">{block.icon}</div>
                <h3 className="mb-3 font-medium text-text-primary">{block.title}</h3>
                <ul className="space-y-2">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-accent/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="border-t border-gray-800/50">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <SlideIn direction="left">
            <SectionLabel>About ITECS</SectionLabel>
            <h2 className="mb-6 text-3xl font-light text-text-primary md:text-4xl">
              24+ Years of IT Operations Behind the AI Build
            </h2>
            <p className="mb-6 leading-relaxed text-text-secondary">
              ITECS has supported Dallas-Fort Worth businesses since 2002,
              combining managed IT, cybersecurity, cloud hosting, software
              implementation, and practical AI consulting.
            </p>
            <p className="leading-relaxed text-text-secondary">
              This proposal applies that operational discipline to FCC&apos;s sales
              workflow: the goal is not automation for its own sake. The goal is
              a supportable tool that helps reps move faster while preserving
              human judgment, data control, and clear accountability.
            </p>
            <div className="mt-8 rounded-xl border border-gray-800/50 bg-gray-900/25 p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent-bright">
                  <ExternalLink className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-text-primary">ITECS Main Website</h3>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                For managed IT services, cybersecurity, cloud hosting, and the
                broader ITECS technology practice, visit the company&apos;s primary
                website.
              </p>
              <a
                href="https://itecsonline.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-accent transition-colors hover:text-brand-accent-bright"
              >
                Visit itecsonline.com
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.12}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2002", label: "Founded in Dallas" },
                { value: "75+", label: "Active Clients" },
                { value: "95%", label: "Client Retention" },
                { value: "99.9%", label: "Uptime Guarantee" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-gray-800/50 bg-gray-900/20 p-5 text-center"
                >
                  <div className="mb-1 text-2xl font-light text-brand-accent-bright">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-text-dim">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </SlideIn>
        </div>
      </Section>

      <CircuitTrace variant="section-divider" />

      <Section className="relative overflow-hidden border-t border-gray-800/50 bg-bg-void">
        <GradientOrb color="cyan" size="md" position={{ top: "-120px", left: "-120px" }} />
        <GradientOrb color="purple" size="sm" position={{ bottom: "-80px", right: "-60px" }} />
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Next Steps</SectionLabel>
            <h2 className="mb-6 text-3xl font-light text-text-primary md:text-4xl">
              Ready to Start the FCC Marketplace Posting Assistant?
            </h2>
            <p className="mb-8 leading-relaxed text-text-secondary">
              Approving this proposal starts the kickoff process. ITECS will
              confirm the pilot users, initial image repository, first posting
              profiles, account ownership decisions, and build sequence before
              active development begins.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                type="button"
                layout
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setProposalDecision((current) =>
                    current === "approve" ? null : "approve",
                  )
                }
                className={`inline-flex items-center gap-2 rounded-lg bg-brand-accent px-8 py-4 text-sm font-medium text-bg-void transition-all hover:bg-brand-accent-bright ${
                  proposalDecision === "approve"
                    ? "shadow-[0_0_35px_var(--glow-cyan)]"
                    : ""
                }`}
              >
                APPROVE PROPOSAL
                <motion.span
                  animate={{ rotate: proposalDecision === "approve" ? 90 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </motion.button>
              <motion.button
                type="button"
                layout
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setProposalDecision((current) =>
                    current === "decline" ? null : "decline",
                  )
                }
                className={`inline-flex items-center gap-2 rounded-lg border px-8 py-4 text-sm font-medium text-text-secondary transition-all ${
                  proposalDecision === "decline"
                    ? "border-red-300/70 bg-red-400/10 text-red-100"
                    : "border-gray-700 hover:border-red-300/50 hover:text-red-100"
                }`}
              >
                DECLINE
                <X className="h-4 w-4" />
              </motion.button>
              <a
                href="tel:+12144447884"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-8 py-4 text-sm font-medium text-text-secondary transition-colors hover:border-brand-accent/50"
              >
                CALL (214) 444-7884
              </a>
            </div>
            <AnimatePresence mode="wait">
              {proposalDecision ? (
                <ProposalDecisionForm
                  key={proposalDecision}
                  decision={proposalDecision}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}

function BookIconFallback() {
  return <FileText className="h-6 w-6" />;
}
