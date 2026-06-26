"use client";

import { FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  Cloud,
  Download,
  FileCheck2,
  FileText,
  HeartPulse,
  KeyRound,
  Lock,
  MapPin,
  Network,
  RefreshCw,
  Server,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";

const pdfHref = "/api/proposals/star-sleep-wellness-01ea28/pdf";
const mspInfoHref = "/proposals/itecs-msp-information.pdf";

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
      proposal:
        "Star Sleep & Wellness Managed Services Proposal (ITECS-2026-SSW-001)",
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
            ? "Star Sleep & Wellness Proposal Approval"
            : "Star Sleep & Wellness Proposal Decline",
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
          ? "Approval received. ITECS will follow up with Master Services Agreement, Exhibit A, and HIPAA BAA next steps within two business days."
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
      } p-5 text-left shadow-[0_0_45px_var(--accent-cyan-subtle)] md:p-6`}
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
              ? "Confirm the approval details below and ITECS will issue the Master Services Agreement, Exhibit A, and HIPAA BAA via DocuSign."
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

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor={`${decision}-term`} className="mb-1.5 block text-sm text-text-dim">
            Preferred Term Length
          </label>
          <select
            id={`${decision}-term`}
            name="termPreference"
            className="w-full rounded-lg border border-[var(--border-subtle)] bg-bg-void px-4 py-3 text-text-primary transition-colors focus:border-brand-accent focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              Select a term
            </option>
            <option value="1 year">1 Year</option>
            <option value="3 years">3 Years</option>
            <option value="5 years (Recommended)">5 Years (Recommended)</option>
            <option value="Undecided">Undecided / Discuss in follow-up</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${decision}-kickoff`} className="mb-1.5 block text-sm text-text-dim">
            Target Kickoff Window
          </label>
          <input
            id={`${decision}-kickoff`}
            name="kickoffWindow"
            type="text"
            className="w-full rounded-lg border border-[var(--border-subtle)] bg-bg-void px-4 py-3 text-text-primary placeholder:text-text-dim/50 transition-colors focus:border-brand-accent focus:outline-none"
            placeholder="e.g., week of June 15, 2026"
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
              ? "Optional: CFO availability for follow-up, preferred onboarding kickoff date, or asset inventory notes."
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

function StickyProposalDownload() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.8, ease: "easeOut" }}
      className="fixed bottom-5 right-6 z-50 print:hidden md:right-12 lg:right-[max(6rem,calc((100vw-72rem)/2+1.5rem))]"
    >
      <a
        href={pdfHref}
        download
        className="group flex items-center justify-center gap-2 rounded-xl border border-violet-200/55 bg-violet-400/95 px-3.5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-950 shadow-[0_14px_44px_var(--accent-cyan-subtle)] backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-bg-void md:px-4"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-950/10 text-slate-950 transition-colors group-hover:bg-slate-950/15">
          <Download className="h-4 w-4" aria-hidden="true" />
        </span>
        <span>Download Proposal</span>
      </a>
    </motion.div>
  );
}

const glanceRows = [
  ["Prepared for", "Star Sleep & Wellness — Taylor Fortney, VP of Operations"],
  ["Prepared by", "Brian Desmot, Founder & CIO — ITECS Outsourcing, LLC"],
  ["Proposal date", "May 22, 2026"],
  ["Valid through", "June 30, 2026"],
  ["Reference", "ITECS-2026-SSW-001"],
  ["Recommended program", "MSP Elite / Extended Coverage / Multi-Year Term"],
] as const;

const headlineStats = [
  ["$26,284", "Monthly recurring (Elite Extended)"],
  ["5-yr", "Recommended term ($72,675 saved)"],
  ["~30 days", "Onboarding to steady-state"],
] as const;

const strategicPriorities = [
  {
    icon: KeyRound,
    title: "Identity & access modernization",
    text: "Enterprise SSO and enforced multi-factor authentication that scale beyond app-by-app access management.",
  },
  {
    icon: Server,
    title: "Asset visibility",
    text: "Accurate, accessible inventory of servers, endpoints, and network devices that leadership can query at any time.",
  },
  {
    icon: RefreshCw,
    title: "Lifecycle hygiene",
    text: "Tight employee onboarding and offboarding so terminated users lose access on a defined timeline, every time.",
  },
  {
    icon: Cloud,
    title: "Backup & resilience",
    text: "Verified redundant internet at every clinic and tested backups across servers and Microsoft 365.",
  },
  {
    icon: Users,
    title: "Co-managed operating model",
    text: "Internal field technician empowered with M365, ticketing, and tooling access so internal and external teams operate as one.",
  },
  {
    icon: Activity,
    title: "EHR transition support",
    text: "Athena Health pilot and potential enterprise migration delivered without introducing IT-side blockers.",
  },
  {
    icon: TrendingUp,
    title: "Pace of change",
    text: "Consolidated, meaningful change pushes rather than a prolonged trickle — paced to organizational capacity.",
  },
  {
    icon: Sparkles,
    title: "Responsible AI adoption",
    text: "Continued AI rollout with appropriate governance — no HIPAA or operational risk introduced.",
  },
] as const;

const includedServices = [
  "Sophos MDR — 24/7 expert-led threat monitoring and response",
  "Sophos XDR next-generation antivirus",
  "Cisco DUO multi-factor authentication for all users",
  "Check Point Harmony AI email security for Microsoft 365",
  "Cybersecurity awareness training & quarterly phishing simulations",
  "Network monitoring, SIEM, and critical-asset alerting",
  "Commvault Microsoft 365 backup with unlimited storage",
  "Endpoint backup (Windows / macOS / Linux) with unlimited storage",
  "Quarterly backup & disaster recovery audits",
  "Preventative maintenance and patch management (RMM)",
  "Procurement services for hardware and software",
  "Four-person assigned MSP Elite team",
  "Dedicated Technical Account Manager",
  "Quarterly Business Reviews and strategic planning",
  "Semi-annual network and cybersecurity assessments",
  "Asset tagging and lifecycle management",
  "Unlimited technical support during coverage hours",
  "Technical consulting (excluding Special Projects)",
  "15 project hours included per Special Project",
] as const;

const monthlyComparison = [
  ["Endpoint management — 150 endpoints", "$17,812.50", "$24,225.00"],
  ["Server / VM management — 8 servers", "$475.00", "$646.00"],
  ["Managed network devices — 15 devices", "$600.00", "$1,125.00"],
  ["Sophos MDR — endpoint 24/7 SOC (150 users)", "+ $3,000.00 add-on", "Included"],
  ["Sophos MDR — server protection (8 servers)", "+ $288.00 add-on", "$288.00"],
  ["Cisco DUO MFA (150 users)", "+ $750.00 add-on", "Included"],
  ["Check Point Harmony AI Email (150 users)", "+ $825.00 add-on", "Included"],
  ["Commvault M365 Backup (150 users)", "+ $525.00 add-on", "Included"],
  ["Endpoint backup (150 endpoints)", "+ $1,500.00 add-on", "Included"],
] as const;

const strategicOnlyRows = [
  ["Dedicated Technical Account Manager", "—", "Included"],
  ["Four-person assigned Elite team", "—", "Included"],
  ["Semi-annual network & security assessments", "—", "Included"],
  ["Quarterly backup & DR audits", "—", "Included"],
  ["Asset tagging & lifecycle management program", "—", "Included"],
  ["Network monitoring, SIEM & critical-asset alerts", "—", "Included"],
  ["Cybersecurity training & phishing simulations", "—", "Included"],
  ["Loyalty discount on Special Project overage", "10%", "15%"],
  ["Special Project hours included per project", "4 hrs", "15 hrs"],
] as const;

const monthlyInvestmentRows = [
  ["Managed Endpoints (Windows / macOS workstations)", "150", "$161.50", "$24,225.00"],
  ["Servers / Virtual Machines (50% of endpoint rate)", "8", "$80.75", "$646.00"],
  [
    "Managed Network Devices (firewalls, managed switches, routers, load balancers)",
    "15",
    "$75.00",
    "$1,125.00",
  ],
  ["Sophos MDR — Server Protection", "8", "$36.00", "$288.00"],
] as const;

const termOptions = [
  {
    term: "1 Year",
    endpointRate: "$161.50",
    monthly: "$26,284.00",
    annual: "$315,408.00",
    contract: "$315,408.00",
    accent: false,
  },
  {
    term: "3 Years",
    endpointRate: "$161.50",
    monthly: "$26,284.00",
    annual: "$315,408.00",
    contract: "$946,224.00",
    accent: false,
  },
  {
    term: "5 Years (Recommended)",
    endpointRate: "$153.42 (5% off)",
    monthly: "$25,072.75",
    annual: "$300,873.00",
    contract: "$1,504,365.00",
    accent: true,
  },
] as const;

const onboardingRows = [
  ["Environment discovery, documentation, and topology mapping", "6", "Level 3"],
  ["Asset enrollment — endpoints, servers, network devices", "—", "Included in MSP Elite"],
  [
    "Tool stack deployment (RMM, EDR, MDR, M365 backup, endpoint backup)",
    "—",
    "Included in MSP Elite",
  ],
  ["Initial HIPAA-aligned cybersecurity baseline & gap analysis", "8", "Level 3"],
  ["Backup posture verification and BCDR baseline test", "6", "Level 2"],
  ["Co-managed access setup for internal field technician", "—", "Included in MSP Elite"],
  ["Incumbent provider handoff coordination & credential transfer", "—", "Included in MSP Elite"],
  ["Runbook authoring and internal knowledge base build-out", "—", "Included in MSP Elite"],
] as const;

const projectRoadmap = [
  {
    icon: KeyRound,
    title: "Identity & Access Modernization",
    outcome:
      "Enterprise SSO via Entra ID + Cisco DUO MFA across all users with conditional access policies.",
    hours: "22 – 35 hours",
  },
  {
    icon: Workflow,
    title: "M365 Tenant Hardening & Lifecycle Workflow",
    outcome:
      "Automated onboarding/offboarding, license audit, Intune baseline, terminated-user remediation.",
    hours: "11 – 17 hours",
  },
  {
    icon: HeartPulse,
    title: "Athena Health Migration Enablement",
    outcome:
      "ITECS-side network, identity, and integration support for the EHR pilot and rollout.",
    hours: "17 – 28 hours",
  },
  {
    icon: Network,
    title: "Multi-Site Backup Internet Audit",
    outcome:
      "Confirm and remediate redundant connectivity at every clinic location.",
    hours: "8 – 20 hours",
  },
  {
    icon: ShieldCheck,
    title: "AWS HIPAA Data Warehouse Review",
    outcome:
      "Independent review of the in-house data warehouse for HIPAA control alignment.",
    hours: "8 – 14 hours",
  },
  {
    icon: Building2,
    title: "New Site Stand-Up Package",
    outcome:
      "Standardized clinic launch — ISP, firewall, switching, Wi-Fi, endpoints, M365 onboarding.",
    hours: "11 – 21 hours / site",
  },
] as const;

const whyItecs = [
  {
    icon: MapPin,
    title: "Local Dallas partnership",
    text: "Headquartered in Dallas, Texas — minutes from the Star Sleep & Wellness Dallas corporate facility. Supports in-person QBRs and ad hoc executive cadence.",
  },
  {
    icon: BadgeCheck,
    title: "23 years of focus",
    text: "Founded in 2002 and exclusively focused on serving Dallas–Fort Worth and Texas mid-market organizations, including regulated healthcare clients.",
  },
  {
    icon: Users,
    title: "Co-managed by design",
    text: "Your internal field technician receives a Halo PSA agent license with view, create, assign, close, escalate rights — plus RMM, EDR, MDR, and security dashboard access.",
  },
  {
    icon: ShieldCheck,
    title: "HIPAA & compliance fluency",
    text: "Extensive HIPAA experience, BAA execution as standard practice, and active CMMC Level 2 program. Practices align to NIST, PCI, and HIPAA frameworks.",
  },
  {
    icon: TrendingUp,
    title: "Built to scale alongside you",
    text: "Typical client profile is 75–500 employees. Bench depth, project capacity, and standardized new-site stand-up playbook to support the path to 20+ locations.",
  },
  {
    icon: Sparkles,
    title: "Forward-looking by design",
    text: "Active AI consulting practice supporting law firms, medical practices, and CMMC clients with secure, governed adoption — mainstream AI, custom RAG, and in-house LLMs.",
  },
  {
    icon: Cloud,
    title: "Hosted cloud option",
    text: "ITECS operates a Dallas-area data center near George Bush Turnpike and US-75. Optional path to consolidate on-prem servers into a managed private cloud.",
  },
] as const;

const slaRows = [
  ["Coverage hours (Extended)", "7:00 AM – 10:00 PM CT, 7 days per week"],
  ["Sophos MDR security monitoring", "24 hours per day, 7 days per week, 365 days per year"],
  ["Critical incident response", "Within 1 hour"],
  ["Standard response", "Within 4 hours"],
  ["Uptime commitment", "99.9% target on ITECS-managed infrastructure"],
] as const;

const hourlyRates = [
  ["Level 1 — General support", "$205.00", "$307.50", "$410.00"],
  ["Level 2 — Network / systems", "$260.00", "$390.00", "$520.00"],
  ["Level 3 — Architecture / AI / strategy", "$295.00", "$442.50", "$590.00"],
] as const;

const assumptions = [
  "Recurring monthly investment is based on the asset profile discussed during the May 22, 2026 discovery call. Final counts and pricing are confirmed during onboarding within plus or minus fifteen percent.",
  "Onsite support is included within a 20-mile radius of the ITECS Dallas office. Locations beyond 20 miles, especially beyond 100 miles, may incur travel surcharges per ITECS policy.",
  "Multi-state locations outside the DFW service radius rely on a combination of remote support, the internal field technician, and pre-arranged onsite dispatch.",
  "A HIPAA Business Associate Agreement will be executed alongside the Master Services Agreement before any protected health information is accessed.",
  "Hardware and software procurement, third-party licensing not specifically listed, structured cabling, ISP and telecommunications contracts, EHR vendor support, and any work outside agreed scope are quoted separately.",
  "Special Projects are quoted separately via Statement of Work with the 15 project hours applied as the first deduction against the project estimate.",
] as const;

const nextSteps = [
  "Review this proposal with Star Sleep & Wellness leadership, including the Chief Financial Officer.",
  "Schedule a follow-up working session — preferred format is an in-person meeting at ITECS HQ in Dallas with the CFO in attendance.",
  "Confirm preferred term length (1, 3, or 5 years) and any adjustments to the asset profile or Phase 1 project priorities.",
  "Optional technical deep-dive with an ITECS engineer to refine asset counts and project scope before contract execution.",
  "Execute the ITECS Master Services Agreement, Exhibit A (Scope of Services and Compensation), and HIPAA Business Associate Agreement.",
  "Kick off the 30-day onboarding playbook with Star Sleep & Wellness's internal team and the incumbent provider.",
] as const;

// --- Inline SVG charts (no external dependencies) ---

function MonthlyCostChart() {
  // Bar chart comparing Pro+Add-ons vs Elite recurring monthly cost ($25,775.50 vs $26,284)
  const max = 32000;
  const proValue = 25775.5;
  const eliteValue = 26284;
  const proPct = (proValue / max) * 100;
  const elitePct = (eliteValue / max) * 100;

  // Pro stack composition
  const proStack = [
    { label: "Base management", value: 18887.5, color: "var(--text-tertiary)" },
    { label: "Required add-ons", value: 6888, color: "var(--accent-cyan-subtle)" },
  ];
  const proStackPct = proStack.map((s) => (s.value / max) * 100);

  // Elite stack composition
  const eliteStack = [
    { label: "Base management", value: 25996, color: "var(--accent-cyan-subtle)" },
    { label: "MDR — servers", value: 288, color: "var(--brand-subtle)" },
  ];
  const eliteStackPct = eliteStack.map((s) => (s.value / max) * 100);

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-bg-void/50 p-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-brand-accent-bright">
            Figure 1 · Monthly recurring comparison
          </div>
          <h3 className="mt-2 text-xl font-light text-text-primary">
            MSP Pro + à la carte add-ons vs. MSP Elite
          </h3>
        </div>
        <div className="text-right text-xs text-text-dim">
          150 endpoints · 8 servers · 15 network devices
        </div>
      </div>

      <div className="space-y-6">
        {/* Pro bar */}
        <div>
          <div className="mb-2 flex items-baseline justify-between text-sm">
            <span className="text-text-secondary">MSP Pro + 6 add-ons</span>
            <span className="font-medium text-text-primary">$25,775.50 / mo</span>
          </div>
          <div className="relative h-9 overflow-hidden rounded-lg bg-bg-surface/40">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${proStackPct[0]}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-y-0 left-0"
              style={{ backgroundColor: proStack[0].color }}
            />
            <motion.div
              initial={{ width: 0, left: `${proStackPct[0]}%` }}
              whileInView={{ width: `${proStackPct[1]}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
              className="absolute inset-y-0"
              style={{
                left: `${proStackPct[0]}%`,
                backgroundColor: proStack[1].color,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-end pr-3 text-xs text-text-dim">
              {proPct.toFixed(0)}% of $32k axis
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-text-dim">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2 w-3 rounded" style={{ backgroundColor: proStack[0].color }} />
              Base ($18,887.50)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2 w-3 rounded" style={{ backgroundColor: proStack[1].color }} />
              6 required add-ons ($6,888.00)
            </span>
          </div>
        </div>

        {/* Elite bar */}
        <div>
          <div className="mb-2 flex items-baseline justify-between text-sm">
            <span className="text-text-secondary">MSP Elite (recommended)</span>
            <span className="font-medium text-brand-accent-bright">$26,284.00 / mo</span>
          </div>
          <div className="relative h-9 overflow-hidden rounded-lg bg-bg-surface/40">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${eliteStackPct[0]}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-y-0 left-0"
              style={{ backgroundColor: eliteStack[0].color }}
            />
            <motion.div
              initial={{ width: 0, left: `${eliteStackPct[0]}%` }}
              whileInView={{ width: `${eliteStackPct[1]}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
              className="absolute inset-y-0"
              style={{
                left: `${eliteStackPct[0]}%`,
                backgroundColor: eliteStack[1].color,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-end pr-3 text-xs text-text-dim">
              {elitePct.toFixed(0)}% of $32k axis
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-text-dim">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2 w-3 rounded" style={{ backgroundColor: eliteStack[0].color }} />
              Bundled program ($25,996.00)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2 w-3 rounded" style={{ backgroundColor: eliteStack[1].color }} />
              Sophos MDR — server ($288.00)
            </span>
          </div>
        </div>
      </div>

      <p className="mt-6 rounded-lg border border-brand-accent/20 bg-brand-accent/5 p-4 text-sm leading-relaxed text-text-secondary">
        <span className="font-medium text-brand-accent-bright">+$508.50 / mo differential.</span>{" "}
        Pro must assemble six discrete add-ons to reach equivalent security, identity, and backup
        coverage. Elite delivers the same outcome as one bundled program.
      </p>
    </div>
  );
}

function Year1CostChart() {
  // Year 1 total cost: Elite vs Pro+add-ons
  // Pro: $25,775.50 * 12 + $19,188 = $328,494
  // Elite: $26,284 * 12 + $3,536 = $319,944
  // Elite saves ~$9,550 over year 1 (per proposal text after offsetting the +$6,102 annual premium with $15,652 project savings)
  const max = 350000;
  const proAnnual = 25775.5 * 12;
  const proProject = 19188;
  const proTotal = proAnnual + proProject;
  const eliteAnnual = 26284 * 12;
  const eliteProject = 3536;
  const eliteTotal = eliteAnnual + eliteProject;

  const proAnnualPct = (proAnnual / max) * 100;
  const proProjectPct = (proProject / max) * 100;
  const eliteAnnualPct = (eliteAnnual / max) * 100;
  const eliteProjectPct = (eliteProject / max) * 100;

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-bg-void/50 p-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-brand-accent-bright">
            Figure 2 · Year 1 total cost
          </div>
          <h3 className="mt-2 text-xl font-light text-text-primary">
            Elite&apos;s 15 free project hours per Special Project absorb the recurring premium.
          </h3>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest text-text-dim">Elite advantage</div>
          <div className="text-2xl font-light text-brand-accent-bright">~$9,550</div>
          <div className="text-[10px] text-text-dim">less than Pro + add-ons (year 1)</div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex items-baseline justify-between text-sm">
            <span className="text-text-secondary">MSP Pro + add-ons · Year 1</span>
            <span className="font-medium text-text-primary">${proTotal.toLocaleString()}</span>
          </div>
          <div className="relative h-9 overflow-hidden rounded-lg bg-bg-surface/40">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${proAnnualPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-y-0 left-0"
              style={{ backgroundColor: "var(--text-tertiary)" }}
            />
            <motion.div
              initial={{ width: 0, left: `${proAnnualPct}%` }}
              whileInView={{ width: `${proProjectPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="absolute inset-y-0"
              style={{
                left: `${proAnnualPct}%`,
                backgroundColor: "var(--danger)",
              }}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-text-dim">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-3 rounded"
                style={{ backgroundColor: "var(--text-tertiary)" }}
              />
              Recurring ${proAnnual.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-3 rounded"
                style={{ backgroundColor: "var(--danger)" }}
              />
              Phase 1 projects $19,188
            </span>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-baseline justify-between text-sm">
            <span className="text-text-secondary">MSP Elite · Year 1</span>
            <span className="font-medium text-brand-accent-bright">${eliteTotal.toLocaleString()}</span>
          </div>
          <div className="relative h-9 overflow-hidden rounded-lg bg-bg-surface/40">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${eliteAnnualPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-y-0 left-0"
              style={{ backgroundColor: "var(--accent-cyan-subtle)" }}
            />
            <motion.div
              initial={{ width: 0, left: `${eliteAnnualPct}%` }}
              whileInView={{ width: `${eliteProjectPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="absolute inset-y-0"
              style={{
                left: `${eliteAnnualPct}%`,
                backgroundColor: "var(--brand-subtle)",
              }}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-text-dim">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-3 rounded"
                style={{ backgroundColor: "var(--accent-cyan-subtle)" }}
              />
              Recurring ${eliteAnnual.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-3 rounded"
                style={{ backgroundColor: "var(--brand-subtle)" }}
              />
              Phase 1 projects $3,536
            </span>
          </div>
        </div>
      </div>

      <p className="mt-6 rounded-lg border border-brand-accent/20 bg-brand-accent/5 p-4 text-sm leading-relaxed text-text-secondary">
        <span className="font-medium text-brand-accent-bright">+$6,102 annual recurring premium</span>{" "}
        is offset by approximately $15,652 in saved Phase 1 project costs — before accounting for
        strategic services that MSP Pro cannot provide at any price.
      </p>
    </div>
  );
}

function ProjectHourEconomicsChart() {
  // Pro: 24 hrs free, 82 billable @ $234 (260 * 0.9) = $19,188
  // Elite: 90 hrs free, 16 billable @ $221 (260 * 0.85) = $3,536
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-bg-void/50 p-6">
      <div className="mb-6">
        <div className="text-[10px] uppercase tracking-widest text-brand-accent-bright">
          Project hour economics · Phase 1 roadmap (6 projects, 106 hours)
        </div>
        <h3 className="mt-2 text-xl font-light text-text-primary">
          Elite&apos;s 15 hours per Special Project compounds across the Phase 1 roadmap.
        </h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pro donut */}
        <div className="flex flex-col items-center rounded-xl border border-[var(--border-subtle)] bg-bg-surface/30 p-5">
          <div className="text-sm text-text-secondary">MSP Pro</div>
          <div className="my-4 relative">
            <svg viewBox="0 0 120 120" className="h-40 w-40">
              {/* total 106 hrs; free 24/106 = 22.6% */}
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="var(--text-tertiary)"
                strokeWidth="14"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="var(--accent-cyan-subtle)"
                strokeWidth="14"
                strokeDasharray={`${(24 / 106) * 289} 289`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                initial={{ strokeDashoffset: 289 }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-light text-text-primary">24</span>
              <span className="text-[10px] uppercase tracking-widest text-text-dim">free hrs</span>
            </div>
          </div>
          <div className="text-center text-xs text-text-dim">
            82 billable hrs × $234 (10% loyalty)
          </div>
          <div className="mt-2 text-lg font-light text-text-primary">$19,188</div>
        </div>

        {/* Elite donut */}
        <div className="flex flex-col items-center rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-5 shadow-[0_0_45px_var(--accent-cyan-subtle)]">
          <div className="text-sm text-brand-accent-bright">MSP Elite</div>
          <div className="my-4 relative">
            <svg viewBox="0 0 120 120" className="h-40 w-40">
              <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="var(--accent-cyan-subtle)"
                strokeWidth="14"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke="var(--accent-cyan-subtle)"
                strokeWidth="14"
                strokeDasharray={`${(90 / 106) * 289} 289`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                initial={{ strokeDashoffset: 289 }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-light text-brand-accent-bright">90</span>
              <span className="text-[10px] uppercase tracking-widest text-text-dim">free hrs</span>
            </div>
          </div>
          <div className="text-center text-xs text-text-dim">
            16 billable hrs × $221 (15% loyalty)
          </div>
          <div className="mt-2 text-lg font-light text-brand-accent-bright">$3,536</div>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-brand-accent/20 bg-brand-accent/5 p-4 text-center text-sm text-text-secondary">
        <span className="font-medium text-brand-accent-bright">$15,652 saved</span> on Phase 1 project
        work alone before any strategic services are counted.
      </div>
    </div>
  );
}

function AssetProfileCard() {
  const assets = [
    { icon: Server, value: "150", label: "Endpoints" },
    { icon: Cloud, value: "8", label: "Servers / VMs" },
    { icon: Network, value: "15", label: "Network devices" },
    { icon: Users, value: "250", label: "Employees today" },
    { icon: Building2, value: "20+", label: "Target locations" },
    { icon: Stethoscope, value: "DFW", label: "Active market" },
  ];

  return (
    <div className="rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-6">
      <div className="mb-5 flex items-center gap-3">
        <HeartPulse className="h-6 w-6 text-brand-accent-bright" />
        <h3 className="text-xl font-light text-text-primary">
          Star Sleep & Wellness profile
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {assets.map((asset) => {
          const Icon = asset.icon;
          return (
            <div
              key={asset.label}
              className="rounded-xl border border-[var(--border-subtle)] bg-bg-void/60 p-4"
            >
              <Icon className="mb-3 h-5 w-5 text-brand-accent-bright" />
              <div className="text-2xl font-light text-text-primary">
                {asset.value}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-text-dim">
                {asset.label}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-text-secondary">
        Dallas-founded specialty medical practice with rapid expansion. HIPAA-regulated,
        multi-site, with an established DFW presence and a clear 18–24 month path to a
        20-plus-location national footprint.
      </p>
    </div>
  );
}

function TermSavingsChart() {
  // Compares 5-year contract vs 1-year renewals
  // 1Y at $315,408 × 5 = $1,577,040
  // 5Y commit at $300,873 × 5 = $1,504,365
  // Savings $72,675
  const max = 1700000;
  const oneYearTotal = 315408 * 5;
  const fiveYearTotal = 300873 * 5;

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-bg-void/50 p-6">
      <div className="mb-6">
        <div className="text-[10px] uppercase tracking-widest text-brand-accent-bright">
          5-year savings · Contract life comparison
        </div>
        <h3 className="mt-2 text-xl font-light text-text-primary">
          $72,675 saved by locking in the 5-year endpoint rate.
        </h3>
      </div>

      <div className="space-y-5">
        <div>
          <div className="mb-2 flex items-baseline justify-between text-sm">
            <span className="text-text-secondary">5× one-year renewals @ $26,284 / mo</span>
            <span className="font-medium text-text-primary">${oneYearTotal.toLocaleString()}</span>
          </div>
          <div className="relative h-8 overflow-hidden rounded-lg bg-bg-surface/40">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(oneYearTotal / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-y-0 left-0"
              style={{ backgroundColor: "var(--text-tertiary)" }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-baseline justify-between text-sm">
            <span className="text-text-secondary">5-year commit @ $25,072.75 / mo</span>
            <span className="font-medium text-brand-accent-bright">
              ${fiveYearTotal.toLocaleString()}
            </span>
          </div>
          <div className="relative h-8 overflow-hidden rounded-lg bg-bg-surface/40">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(fiveYearTotal / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-y-0 left-0"
              style={{ backgroundColor: "var(--accent-cyan-subtle)" }}
            />
          </div>
        </div>
      </div>

      <p className="mt-5 rounded-lg border border-brand-accent/20 bg-brand-accent/5 p-3 text-center text-sm text-text-secondary">
        Five-year endpoint rate reflects a <span className="font-medium text-brand-accent-bright">5% reduction</span>{" "}
        applied to the workstation line item.
      </p>
    </div>
  );
}

export default function StarSleepWellnessProposal() {
  const [decision, setDecision] = useState<ProposalDecision | null>(null);

  return (
    <div className="min-h-screen overflow-hidden bg-bg-void pb-28 text-text-primary">
      <StickyProposalDownload />

      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden px-6 py-28 md:px-12 lg:px-24">
        <GradientOrb
          color="cyan"
          size="lg"
          position={{ top: "-240px", right: "-160px" }}
        />
        <GradientOrb
          color="brand"
          size="md"
          position={{ bottom: "-180px", left: "-120px" }}
        />
        <GridBackground opacity={0.03} />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SlideIn direction="left">
            <SectionLabel>Private Proposal · ITECS-2026-SSW-001</SectionLabel>
            <h1 className="text-4xl font-light leading-tight tracking-[-0.03em] text-text-primary md:text-6xl lg:text-7xl">
              Strategic IT partnership for Star Sleep & Wellness.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
              A unified, always-on managed services program — MSP Elite with Extended Coverage —
              purpose-built for a HIPAA-regulated, multi-site specialty practice scaling toward a
              20-plus-location national footprint.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {headlineStats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-3 md:p-4"
                >
                  <div className="text-xl font-light text-brand-accent-bright md:text-2xl">
                    {value}
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.14em] text-text-dim md:text-xs md:tracking-widest">
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
            <AssetProfileCard />
          </SlideIn>
        </div>
      </section>

      {/* At a Glance */}
      <Section className="border-y border-[var(--border-subtle)] bg-bg-surface/30">
        <FadeIn>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <SectionLabel>Proposal at a Glance</SectionLabel>
              <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                The engagement parameters in one executive view.
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-text-secondary">
              Following the May 22 discovery conversation with Taylor Fortney, ITECS recommends
              transitioning Star Sleep & Wellness onto the MSP Elite program with Extended
              coverage — purpose-built for regulated, multi-site organizations where security and
              operational consistency are non-negotiable.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {glanceRows.map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-brand-accent/15 bg-brand-accent/5 p-4"
              >
                <div className="text-[10px] uppercase tracking-widest text-brand-accent-bright">
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

      {/* Executive Summary */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SlideIn direction="left">
            <SectionLabel>Executive Summary</SectionLabel>
            <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
              A premium managed services foundation, sized for healthcare growth.
            </h2>
          </SlideIn>
          <SlideIn direction="right" delay={0.08}>
            <div className="space-y-5 text-lg leading-relaxed text-text-secondary">
              <p>
                Star Sleep & Wellness is a Dallas-founded, rapidly expanding specialty medical
                practice. The organization operates as a Management Services Organization with
                strong cultural focus on patient care, a tightly run HIPAA compliance program, and
                an internal systems team building real technical capability around data
                integration, automation, and analytics.
              </p>
              <p>
                The recommended program directly addresses identity and access modernization,
                asset visibility, lifecycle hygiene, multi-site backup and connectivity resilience,
                a true co-managed operating model that empowers the internal field technician, and
                a healthcare-IT partner positioned to scale alongside Star Sleep & Wellness&apos;s
                growth.
              </p>
              <p>
                This proposal includes a fully itemized recurring monthly investment, a fixed-fee
                onboarding bundle, side-by-side term options, a Phase 1 project roadmap, and the
                operating commitments ITECS makes to every Elite client. Pricing reflects the
                discovery asset profile and will be trued up within plus or minus fifteen percent
                following the formal onboarding inventory.
              </p>
            </div>
          </SlideIn>
        </div>
      </Section>

      <CircuitTrace variant="section-divider" />

      {/* Strategic Priorities */}
      <Section className="bg-bg-surface/20">
        <FadeIn>
          <div className="mb-14 text-center">
            <SectionLabel>Understanding Your Priorities</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Eight strategic priorities surfaced during discovery — each addressed in the recommended program.
            </h2>
          </div>
        </FadeIn>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {strategicPriorities.map((priority, index) => {
            const Icon = priority.icon;
            return (
              <FadeIn key={priority.title} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "var(--accent-cyan-subtle)" }}
                  className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-void/55 p-5"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-brand-accent/10 p-2.5 text-brand-accent-bright">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-medium text-text-primary">
                    {priority.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {priority.text}
                  </p>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Recommended Solution */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SlideIn direction="left">
            <SectionLabel>Recommended Solution</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-5xl">
              MSP Elite, Extended Coverage.
            </h2>
            <p className="mt-5 leading-relaxed text-text-secondary">
              ITECS&apos;s premium managed IT and security program — purpose-built for
              organizations like Star Sleep & Wellness. Extended coverage (7:00 AM – 10:00 PM CT,
              7 days per week) cleanly covers daytime clinical operations across every U.S. time
              zone, while Sophos MDR provides true 24/7 security monitoring underneath.
            </p>
            <p className="mt-4 leading-relaxed text-text-secondary">
              A 24/7 coverage upgrade is available at any time should after-hours general IT
              support become a priority.
            </p>
          </SlideIn>

          <SlideIn direction="right" delay={0.1}>
            <div className="rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-6">
              <div className="mb-6 flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-brand-accent-bright" />
                <h3 className="text-xl font-light text-text-primary">
                  Included MSP Elite services
                </h3>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                {includedServices.map((service) => (
                  <div
                    key={service}
                    className="flex items-start gap-2 rounded-lg border border-brand-accent/15 bg-bg-void/55 p-3 text-sm leading-relaxed text-text-secondary"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </Section>

      <CircuitTrace variant="section-divider" />

      {/* Comparison: Elite vs Pro */}
      <Section className="relative border-y border-[var(--border-subtle)] bg-bg-void">
        <GridBackground opacity={0.025} />
        <FadeIn>
          <div className="mb-12 text-center">
            <SectionLabel>Elite vs Pro + Add-Ons</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              The recurring difference is $508 / mo — what Elite adds is harder to replicate.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-text-secondary">
              The comparison below uses Star Sleep & Wellness&apos;s actual asset profile and
              prices MSP Pro with the add-ons required to match Elite&apos;s security, identity,
              and backup posture.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <MonthlyCostChart />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/35">
            <div className="grid gap-3 border-b border-[var(--border-subtle)] bg-bg-surface/50 p-4 text-[10px] uppercase tracking-widest text-text-dim md:grid-cols-[1.6fr_0.7fr_0.7fr]">
              <div>Line item</div>
              <div className="md:text-right">MSP Pro + à la carte</div>
              <div className="md:text-right">MSP Elite (recommended)</div>
            </div>
            <div className="divide-y divide-[var(--border-subtle)]">
              {monthlyComparison.map(([line, pro, elite]) => (
                <div
                  key={line}
                  className="grid gap-3 p-4 text-sm md:grid-cols-[1.6fr_0.7fr_0.7fr]"
                >
                  <div className="text-text-secondary">{line}</div>
                  <div className="text-text-dim md:text-right">{pro}</div>
                  <div className="font-medium text-text-primary md:text-right">{elite}</div>
                </div>
              ))}
              <div className="grid gap-3 bg-brand-accent/10 p-4 text-sm md:grid-cols-[1.6fr_0.7fr_0.7fr]">
                <div className="text-text-primary">Recurring monthly subtotal</div>
                <div className="text-text-secondary md:text-right">$25,775.50</div>
                <div className="font-medium text-brand-accent-bright md:text-right">$26,284.00</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Strategic Services Only Available Under Elite */}
      <Section>
        <FadeIn>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <SectionLabel>Strategic Services Available Only Under Elite</SectionLabel>
              <h2 className="text-3xl font-light text-text-primary md:text-4xl">
                The advisory and assurance layer MSP Pro cannot match at any price.
              </h2>
            </div>
            <p className="leading-relaxed text-text-secondary">
              These services are core to MSP Elite and are not available as à la carte add-ons.
              They represent the strategic, advisory, and assurance layer that distinguishes a
              premium managed engagement from a bundled-tools relationship.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/35">
            <div className="grid gap-3 border-b border-[var(--border-subtle)] bg-bg-surface/50 p-4 text-[10px] uppercase tracking-widest text-text-dim md:grid-cols-[1.6fr_0.5fr_0.5fr]">
              <div>Strategic service</div>
              <div className="md:text-right">MSP Pro</div>
              <div className="md:text-right">MSP Elite</div>
            </div>
            <div className="divide-y divide-[var(--border-subtle)]">
              {strategicOnlyRows.map(([service, pro, elite]) => (
                <div
                  key={service}
                  className="grid gap-3 p-4 text-sm md:grid-cols-[1.6fr_0.5fr_0.5fr]"
                >
                  <div className="text-text-secondary">{service}</div>
                  <div className="text-text-dim md:text-right">{pro}</div>
                  <div className="font-medium text-brand-accent-bright md:text-right">{elite}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Project hour economics + Year 1 */}
      <Section className="border-y border-[var(--border-subtle)] bg-bg-surface/20">
        <FadeIn>
          <div className="mb-12 text-center">
            <SectionLabel>Total Cost of Ownership</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Where Elite&apos;s real advantage compounds — Phase 1 project economics.
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <ProjectHourEconomicsChart />
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="mt-10">
            <Year1CostChart />
          </div>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="mx-auto mt-8 max-w-4xl text-center text-xs leading-relaxed text-text-dim">
            Recurring pricing comparison uses current published ITECS rates: MSP Pro Extended
            endpoint rate of $118.75 (101–200 band), MSP Elite Extended endpoint rate of $161.50
            (101–200 band), and standard à la carte rates for Sophos MDR ($20 user / $36 server),
            Cisco DUO MFA ($5), Check Point Harmony AI Email Security ($5.50 midpoint), Commvault
            M365 Backup ($3.50 per user at 101+ users), and Endpoint Backup ($10). Project hour
            estimates use Level 2 standard rate of $260 per hour with applicable tier loyalty
            discount.
          </p>
        </FadeIn>
      </Section>

      {/* Recurring Monthly Investment */}
      <Section id="investment">
        <FadeIn>
          <div className="mb-12 text-center">
            <SectionLabel>Recurring Monthly Investment</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Itemized monthly cost based on the discovery asset profile.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-text-secondary">
              Final asset counts and the corresponding monthly investment will be trued up
              following the formal asset inventory completed during onboarding, within a plus or
              minus fifteen percent variance from the figures shown here.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-brand-accent/20 bg-gradient-to-b from-brand-accent/5 to-transparent">
            <div className="grid gap-3 border-b border-[var(--border-subtle)] bg-bg-surface/50 p-4 text-[10px] uppercase tracking-widest text-text-dim md:grid-cols-[1.8fr_0.4fr_0.6fr_0.6fr]">
              <div>Description</div>
              <div className="md:text-right">Qty</div>
              <div className="md:text-right">Unit / Month</div>
              <div className="md:text-right">Monthly Total</div>
            </div>
            <div className="divide-y divide-[var(--border-subtle)]">
              {monthlyInvestmentRows.map(([desc, qty, unit, total]) => (
                <div
                  key={desc}
                  className="grid gap-3 p-4 text-sm md:grid-cols-[1.8fr_0.4fr_0.6fr_0.6fr]"
                >
                  <div className="text-text-secondary">{desc}</div>
                  <div className="text-text-dim md:text-right">{qty}</div>
                  <div className="text-text-dim md:text-right">{unit}</div>
                  <div className="font-medium text-text-primary md:text-right">{total}</div>
                </div>
              ))}
              <div className="grid gap-3 bg-brand-accent/10 p-4 text-sm md:grid-cols-[1.8fr_0.4fr_0.6fr_0.6fr]">
                <div className="font-medium text-text-primary md:col-span-3">
                  Recurring Monthly Investment — Extended Coverage
                </div>
                <div className="text-xl font-light text-brand-accent-bright md:text-right">
                  $26,284.00
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/35 p-5 text-sm leading-relaxed text-text-secondary">
            <span className="font-medium text-text-primary">Note on managed network devices: </span>
            per ITECS policy, the Managed Network Device fee applies only to firewalls, managed
            switches, routers, and load balancers. Wireless access points are monitored and
            supported under the program at no additional per-device charge.
          </div>
        </FadeIn>
      </Section>

      {/* Term Options */}
      <Section className="relative border-y border-[var(--border-subtle)] bg-bg-void">
        <GradientOrb color="cyan" size="md" position={{ top: "-160px", left: "-80px" }} />
        <FadeIn>
          <div className="mb-12 text-center">
            <SectionLabel>Term Options</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Three initial term lengths. The 5-year term is the best long-term value.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-text-secondary">
              All three terms include the full MSP Elite scope of services. The 5-year term
              reflects a 5% reduction in endpoint pricing.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="grid gap-4 lg:grid-cols-3">
            {termOptions.map((option, index) => (
              <motion.div
                key={option.term}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-2xl border p-6 ${
                  option.accent
                    ? "border-brand-accent/40 bg-brand-accent/5 shadow-[0_0_60px_var(--accent-cyan-subtle)]"
                    : "border-[var(--border-subtle)] bg-bg-surface/35"
                }`}
              >
                {option.accent ? (
                  <div className="absolute -top-3 left-6 rounded-full bg-brand-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-bg-void">
                    Recommended
                  </div>
                ) : null}
                <div className="text-[10px] uppercase tracking-widest text-text-dim">
                  Term option {index + 1}
                </div>
                <div className="mt-2 text-2xl font-light text-text-primary">{option.term}</div>
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-baseline justify-between">
                    <span className="text-text-dim">Endpoint rate</span>
                    <span className="font-medium text-text-primary">{option.endpointRate}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-text-dim">Monthly</span>
                    <span className="font-medium text-text-primary">{option.monthly}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-text-dim">Annual</span>
                    <span className="font-medium text-text-primary">{option.annual}</span>
                  </div>
                  <div className="border-t border-[var(--border-subtle)] pt-3">
                    <div className="text-[10px] uppercase tracking-widest text-text-dim">
                      Total contract value
                    </div>
                    <div
                      className={`mt-1 text-xl font-light ${
                        option.accent ? "text-brand-accent-bright" : "text-text-primary"
                      }`}
                    >
                      {option.contract}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="mt-12">
            <TermSavingsChart />
          </div>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="mx-auto mt-6 max-w-3xl rounded-xl border border-[var(--border-subtle)] bg-bg-surface/35 p-4 text-center text-sm leading-relaxed text-text-secondary">
            Auto-renewal occurs at the end of the initial term unless either party provides 60
            days&apos; written non-renewal notice. Standard renewals carry forward at the
            then-current pricing.
          </p>
        </FadeIn>
      </Section>

      {/* Onboarding Bundle */}
      <Section>
        <FadeIn>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <SectionLabel>Onboarding & Transition</SectionLabel>
              <h2 className="text-3xl font-light text-text-primary md:text-4xl">
                Fixed-fee 30-day transition with no hourly-billing surprises.
              </h2>
            </div>
            <p className="leading-relaxed text-text-secondary">
              The bundle covers the full transition scope, including coordination with the
              incumbent provider, and avoids hourly-billing surprises during the most operationally
              sensitive phase of the relationship.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="overflow-hidden rounded-2xl border border-brand-accent/20 bg-gradient-to-b from-brand-accent/5 to-transparent">
            <div className="grid gap-3 border-b border-[var(--border-subtle)] bg-bg-surface/50 p-4 text-[10px] uppercase tracking-widest text-text-dim md:grid-cols-[1.7fr_0.4fr_0.7fr]">
              <div>Onboarding workstream</div>
              <div className="md:text-right">Est. hours</div>
              <div className="md:text-right">Service level</div>
            </div>
            <div className="divide-y divide-[var(--border-subtle)]">
              {onboardingRows.map(([workstream, hours, level]) => (
                <div
                  key={workstream}
                  className="grid gap-3 p-4 text-sm md:grid-cols-[1.7fr_0.4fr_0.7fr]"
                >
                  <div className="text-text-secondary">{workstream}</div>
                  <div className="text-text-dim md:text-right">{hours}</div>
                  <div className="text-text-dim md:text-right">{level}</div>
                </div>
              ))}
              <div className="grid gap-3 bg-brand-accent/10 p-4 text-sm md:grid-cols-[1.7fr_0.4fr_0.7fr]">
                <div className="font-medium text-text-primary">
                  Onboarding Bundle — Fixed Fee (One-Time)
                </div>
                <div className="font-medium text-text-primary md:text-right">20</div>
                <div className="font-medium text-brand-accent-bright md:text-right">$5,500.00</div>
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="mt-6 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/35 p-5 text-sm leading-relaxed text-text-secondary">
            ITECS will work professionally and cooperatively with the incumbent provider
            throughout the handoff. All data, documentation, and access{" "}
            <span className="font-medium text-text-primary">
              remain the property of Star Sleep & Wellness at all times
            </span>
            . A documented playbook of milestones, deliverables, and acceptance criteria is shared
            at kickoff for complete leadership visibility.
          </p>
        </FadeIn>
      </Section>

      <CircuitTrace variant="section-divider" />

      {/* Phase 1 Project Roadmap */}
      <Section className="bg-bg-surface/20">
        <FadeIn>
          <div className="mb-14 text-center">
            <SectionLabel>Phase 1 Project Roadmap</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Six discretionary projects directly addressing discovery priorities.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-text-secondary">
              Each project will be scoped via a separate Statement of Work after onboarding, with
              formal hour estimates replacing the planning-grade ranges shown. As an MSP Elite
              client, Star Sleep & Wellness receives the first 15 hours of every Special Project
              at no additional cost.
            </p>
          </div>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projectRoadmap.map((project, index) => {
            const Icon = project.icon;
            return (
              <FadeIn key={project.title} delay={index * 0.04}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "var(--accent-cyan-subtle)" }}
                  className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-void/55 p-5"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-brand-accent/10 p-2.5 text-brand-accent-bright">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {project.outcome}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-brand-accent/25 bg-brand-accent/5 px-3 py-1.5 text-[11px] uppercase tracking-widest text-brand-accent-bright">
                    <Clock3 className="h-3.5 w-3.5" />
                    {project.hours}
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Why ITECS */}
      <Section>
        <FadeIn>
          <div className="mb-14 text-center">
            <SectionLabel>Why ITECS</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              A Dallas-Fort Worth healthcare-IT partner positioned to scale alongside Star Sleep & Wellness.
            </h2>
          </div>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyItecs.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={index * 0.04}>
                <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/35 p-5">
                  <Icon className="mb-4 h-5 w-5 text-brand-accent-bright" />
                  <h3 className="text-base font-medium text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.16}>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["23+", "Years serving DFW"],
              ["75+", "Active clients"],
              ["95%", "Client retention"],
              ["99.9%", "Uptime target"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-xl border border-brand-accent/15 bg-brand-accent/5 p-4 text-center"
              >
                <div className="text-2xl font-light text-brand-accent-bright">{value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-text-dim">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      <CircuitTrace variant="section-divider" />

      {/* Service Level Commitments */}
      <Section className="bg-bg-surface/20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SlideIn direction="left">
            <SectionLabel>Service Level Commitments</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-5xl">
              Priority queue placement. Critical incidents escalate to your assigned Elite team.
            </h2>
            <p className="mt-5 leading-relaxed text-text-secondary">
              MSP Elite clients receive priority queue placement on all support requests. Critical
              incidents — those that materially impact clinical operations, patient access, or
              environment-wide availability — are escalated immediately to the assigned Elite team
              and Technical Account Manager.
            </p>
          </SlideIn>
          <SlideIn direction="right" delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-brand-accent/20 bg-brand-accent/5">
              <div className="divide-y divide-[var(--border-subtle)]">
                {slaRows.map(([metric, target]) => (
                  <div key={metric} className="grid gap-3 p-5 text-sm md:grid-cols-[1fr_1.4fr]">
                    <div className="text-[11px] uppercase tracking-widest text-brand-accent-bright">
                      {metric}
                    </div>
                    <div className="font-light text-text-primary md:text-right">{target}</div>
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </Section>

      {/* Hourly Rates */}
      <Section>
        <FadeIn>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <SectionLabel>Hourly Rates for Work Beyond Included Scope</SectionLabel>
              <h2 className="text-3xl font-light text-text-primary md:text-4xl">
                Standard MSP Elite hourly rates with 15% Elite loyalty discount on overage.
              </h2>
            </div>
            <p className="leading-relaxed text-text-secondary">
              Special Projects are defined as discrete tasks reasonably expected to exceed 16
              hours of effort. Each Special Project SOW identifies the included 15 hours, the
              estimated hour range, and the applicable rate for any overage.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/35">
            <div className="grid gap-3 border-b border-[var(--border-subtle)] bg-bg-surface/50 p-4 text-[10px] uppercase tracking-widest text-text-dim md:grid-cols-[1.5fr_0.6fr_0.6fr_0.6fr]">
              <div>Service level</div>
              <div className="md:text-right">Scheduled</div>
              <div className="md:text-right">After-hours (1.5×)</div>
              <div className="md:text-right">Emergency (2.0×)</div>
            </div>
            <div className="divide-y divide-[var(--border-subtle)]">
              {hourlyRates.map(([level, scheduled, afterHours, emergency]) => (
                <div
                  key={level}
                  className="grid gap-3 p-4 text-sm md:grid-cols-[1.5fr_0.6fr_0.6fr_0.6fr]"
                >
                  <div className="text-text-secondary">{level}</div>
                  <div className="font-medium text-text-primary md:text-right">{scheduled}</div>
                  <div className="text-text-dim md:text-right">{afterHours}</div>
                  <div className="text-text-dim md:text-right">{emergency}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Assumptions */}
      <Section className="border-y border-[var(--border-subtle)] bg-bg-surface/20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SlideIn direction="left">
            <SectionLabel>Assumptions & Exclusions</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-5xl">
              Clear boundaries that protect the fixed monthly investment.
            </h2>
          </SlideIn>
          <SlideIn direction="right" delay={0.1}>
            <CheckList items={assumptions} />
          </SlideIn>
        </div>
      </Section>

      {/* Downloads */}
      <Section id="downloads">
        <FadeIn>
          <div className="mb-10 text-center">
            <SectionLabel>Downloads & Reference</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Complete proposal PDF and ITECS managed services overview.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-text-secondary">
              The proposal PDF is gated by your private access link. The ITECS MSP Information
              overview is a public reference document for internal distribution to leadership and
              the CFO.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            <a
              href={pdfHref}
              download
              className="group rounded-2xl border border-brand-accent/30 bg-brand-accent/5 p-6 transition-all hover:-translate-y-1 hover:border-brand-accent hover:shadow-[0_0_45px_var(--accent-cyan-subtle)]"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-accent-bright">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-widest text-brand-accent-bright">
                    Private · Gated PDF
                  </div>
                  <h3 className="mt-1 text-lg font-light text-text-primary">
                    Star Sleep & Wellness Proposal
                  </h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                The full formal proposal — investment, term options, onboarding bundle, project
                roadmap, SLAs, and assumptions. Authenticated via your magic-link access.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-accent group-hover:text-brand-accent-bright">
                Download proposal
                <Download className="h-4 w-4" />
              </div>
            </a>

            <a
              href={mspInfoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/35 p-6 transition-all hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-[0_0_45px_var(--accent-cyan-subtle)]"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent-bright">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-widest text-text-dim">
                    Public · Reference
                  </div>
                  <h3 className="mt-1 text-lg font-light text-text-primary">
                    ITECS MSP Information
                  </h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                MSP plan overview and ITECS company brief — share internally with leadership and
                the CFO during proposal review.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-accent group-hover:text-brand-accent-bright">
                Download overview
                <Download className="h-4 w-4" />
              </div>
            </a>
          </div>
        </FadeIn>
      </Section>

      {/* Next Steps */}
      <Section className="border-y border-[var(--border-subtle)] bg-bg-surface/20">
        <FadeIn>
          <div className="mb-12 text-center">
            <SectionLabel>Next Steps</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              Six steps from this proposal to a 30-day onboarding kickoff.
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="mx-auto grid max-w-4xl gap-3">
            {nextSteps.map((step, index) => (
              <div
                key={step}
                className="grid gap-4 rounded-xl border border-[var(--border-subtle)] bg-bg-void/55 p-4 md:grid-cols-[56px_1fr]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 text-sm font-medium text-brand-accent-bright">
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">{step}</p>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.14}>
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-6 text-center">
            <p className="text-sm leading-relaxed text-text-secondary">
              Proposal valid through{" "}
              <span className="font-medium text-text-primary">June 30, 2026</span>. Questions or
              revisions: Brian Desmot ·{" "}
              <a
                href="mailto:bdesmot@itecsonline.com"
                className="text-brand-accent hover:text-brand-accent-bright"
              >
                bdesmot@itecsonline.com
              </a>{" "}
              · (214) 444-7884 ext. 700.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Approval form */}
      <Section id="approval" className="relative bg-bg-surface/20">
        <GradientOrb color="cyan" size="md" position={{ top: "-160px", left: "10%" }} />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <FadeIn>
            <SectionLabel>Proposal Response</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-5xl">
              Ready to move forward with MSP Elite Extended?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-text-secondary">
              Approving the proposal confirms the recommended MSP Elite Extended scope and starts
              the contracting workflow — Master Services Agreement, Exhibit A, and HIPAA Business
              Associate Agreement. If the proposal needs changes, use the decline option to send
              the requested adjustment notes.
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

      {/* Private notice */}
      <Section className="bg-bg-void">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-bg-surface/40 px-4 py-2 text-[11px] uppercase tracking-widest text-text-dim">
              <Lock className="h-3.5 w-3.5" />
              Private proposal · Unlisted · Excluded from search indexing
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              This page is delivered to Star Sleep & Wellness via a private access link. It is not
              linked from itecs.ai navigation, is excluded from sitemap and robots indexing, and is
              gated by a verified email magic-link layer for comfort and presentation.
            </p>
          </FadeIn>
        </div>
      </Section>

    </div>
  );
}
