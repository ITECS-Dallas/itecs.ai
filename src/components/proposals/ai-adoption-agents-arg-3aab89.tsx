"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  Bot,
  BrainCircuit,
  Calculator,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Coins,
  Database,
  Download,
  Eye,
  FileSearch,
  FileSpreadsheet,
  FileText,
  Gauge,
  GraduationCap,
  Layers,
  LineChart,
  Lock,
  MapPin,
  Network,
  PackageSearch,
  Scale,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";

const pdfHref = "/api/proposals/ai-adoption-agents-arg-3aab89/pdf";

type ProposalDecision = "approve" | "decline";
type ProposalSubmitState = "idle" | "submitting" | "success" | "error";

/* ----------------------------------------------------------------------------
 * Layout primitives
 * ------------------------------------------------------------------------- */

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
    <span className="mb-4 inline-block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent-bright">
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

/* ----------------------------------------------------------------------------
 * Structured proposal content (from the ARG AI proposal — no pricing)
 * ------------------------------------------------------------------------- */

const metadataRows = [
  ["Prepared for", "ARG Companies — Principals & Practice Leads"],
  ["Prepared by", "ITECS — Brian Desmot, Founder & CIO"],
  ["Scope", "AI adoption & workforce training · custom AI agent development"],
  ["Engagement model", "Phased & gated — orientation → readiness → first build"],
  ["Foundation", "ITECS managed-security practice · SOC 2 Type II · ISO 27001 · CMMC-aligned"],
  ["Confidentiality", "ITECS Confidential — prepared exclusively for ARG Companies"],
] as const;

const heroStats = [
  ["2", "Tracks — adoption + agents"],
  ["13", "Agent opportunities mapped"],
  ["~80%", "Of a cash flow model already exists"],
] as const;

const platformStack = [
  {
    type: "logo" as const,
    src: "/images/proposals/arg/claude.svg",
    name: "Claude — Anthropic",
    width: 150,
    height: 32,
    role: "Long-document & financial-statement reasoning",
  },
  {
    type: "logo" as const,
    src: "/images/proposals/arg/openai.svg",
    name: "ChatGPT — OpenAI",
    width: 132,
    height: 32,
    role: "Versatile research, summarization & drafting",
  },
  {
    type: "logo" as const,
    src: "/images/proposals/arg/copilot.svg",
    name: "Microsoft 365 Copilot",
    width: 38,
    height: 34,
    role: "Native to Excel, Word, Outlook & Teams",
    label: "Microsoft 365 Copilot",
  },
  {
    type: "chip" as const,
    name: "ITECS — platform-agnostic",
    icon: Scale,
    role: "The right fit per use case, never vendor lock-in",
  },
] as const;

const thesisInputs = [
  "Forecasted balance sheet",
  "Projected P&L & EBITDA",
  "Working-capital roll-forward",
  "AR · inventory · AP",
  "Borrowing-base availability",
  "Prior exams & workpapers",
] as const;

const reallocation = [
  {
    key: "today",
    label: "Today",
    sublabel: "Senior judgment buried under data prep",
    assembly: 70,
    judgment: 30,
  },
  {
    key: "withAgents",
    label: "With governed agents",
    sublabel: "Professionals move straight to findings",
    assembly: 20,
    judgment: 80,
  },
] as const;

const platformCards = [
  {
    logo: "/images/proposals/arg/claude.svg",
    width: 132,
    height: 28,
    name: "Claude",
    vendor: "Anthropic",
    bestFor: "Reading the hard, messy documents",
    points: [
      "Long-document analysis across borrower files",
      "Financial-statement & contract reading",
      "Structured reasoning over large, messy data",
      "Drafting reports in ARG's voice",
    ],
  },
  {
    logo: "/images/proposals/arg/openai.svg",
    width: 120,
    height: 28,
    name: "ChatGPT",
    vendor: "OpenAI",
    bestFor: "The versatile everyday assistant",
    points: [
      "Research, summarization & ad-hoc analysis",
      "Quick drafting and ideation",
      "Broad ecosystem and custom GPTs",
      "Fast, general-purpose support",
    ],
  },
  {
    logo: "/images/proposals/arg/copilot.svg",
    width: 30,
    height: 30,
    name: "Microsoft 365 Copilot",
    vendor: "Microsoft",
    bestFor: "Where ARG already works",
    points: [
      "Inside Excel — models, roll-forwards, BBC math",
      "Inside Word — Executive Reports & workpapers",
      "Grounded in ARG's own documents",
      "Best fit on a qualifying M365 plan",
    ],
  },
] as const;

const securityQuestions = [
  {
    icon: Lock,
    q: "Is our data used to train the AI?",
    a: "No. On business / enterprise accounts, prompts, the files the AI reads, and responses stay inside the provider's protected boundary, are never used to train the models, and are never shared with other customers.",
  },
  {
    icon: Eye,
    q: "Can the AI see data a staffer shouldn't?",
    a: "It only surfaces what that user can already open — it enforces existing permissions rather than bypassing them. The real risk is internal oversharing, which ITECS reviews and tightens before rollout.",
  },
  {
    icon: ShieldCheck,
    q: "How is a business account different?",
    a: "Business accounts contractually isolate ARG's data, add audit logging and admin governance, and keep content in a protected boundary. Confidential engagement data goes only into approved business tools.",
  },
] as const;

const adoptionPhases = [
  {
    id: "01",
    name: "Executive AI Orientation",
    weight: 2,
    icon: GraduationCap,
    text: "Half-day leadership session: how AI works, where it creates value in ARG's specific workflows, and the governance overview — tailored to ARG.",
  },
  {
    id: "02",
    name: "AI Readiness Assessment",
    weight: 3,
    icon: FileSearch,
    text: "Current-state audit, shadow-AI exposure scan, prioritized use-case map, recommended platform stack, and a 12-month roadmap with an executive readout.",
  },
  {
    id: "03",
    name: "Foundation — AUP + Shadow AI",
    weight: 3,
    icon: ShieldCheck,
    text: "A custom Acceptable Use Policy and governance framework, plus an endpoint + M365 scan for unsanctioned AI usage with a risk-ranked remediation playbook.",
  },
  {
    id: "04",
    name: "Production Pilot",
    weight: 3,
    icon: Sparkles,
    text: "A multi-use-case pilot in the highest-volume practice — Transaction Services is the natural first home — with role-based prompt libraries and audit-trail documentation.",
  },
  {
    id: "05",
    name: "Champion + Managed AI",
    weight: 2,
    icon: BadgeCheck,
    text: "Train an internal AI champion and sustain momentum with ongoing optimization, prompt-library maintenance, and standing access to ITECS's AI team.",
  },
] as const;

type AgentPool = {
  code: string;
  name: string;
  practice: string;
  agents: {
    id: string;
    icon: typeof FileSearch;
    name: string;
    flagship?: boolean;
    text: string;
    metric: string;
  }[];
};

const agentPools: AgentPool[] = [
  {
    code: "A",
    name: "Field Exam & Due Diligence",
    practice: "ARG Transaction Services",
    agents: [
      {
        id: "A1",
        icon: FileSearch,
        name: "Field Examination Analyzer & Collateral Roll-Forward",
        flagship: true,
        text: "Ingests borrower AR/AP agings, inventory, GL, and bank statements and produces the standard working-capital exam — roll-forward, dilution, turnover, ineligibles, concentrations, and a first-draft Executive Report in ARG's format.",
        metric: "Senior hours per exam · exam turnaround · capacity per associate",
      },
      {
        id: "A2",
        icon: ClipboardCheck,
        name: "Borrowing Base Certificate & Eligibility Agent",
        text: "Validates borrower-submitted BBCs against underlying detail, recomputes eligible collateral and advance rates, and flags ineligibles, over-advances, and formula errors — on a recurring cadence, not just at exam time.",
        metric: "Over-advance risk caught early · reporting-review time",
      },
      {
        id: "A3",
        icon: Gauge,
        name: "Portfolio Monitoring & Covenant Early-Warning",
        text: "Continuously watches borrower reporting for negative trends, covenant-breach risk, and deteriorating collateral — turning periodic review into continuous signal and surfacing the enhanced-scope trigger early.",
        metric: "Time-to-detection of troubled credits · lender exposure",
      },
    ],
  },
  {
    code: "B",
    name: "Cash Flow Modeling & Advisory",
    practice: "ARG Partners",
    agents: [
      {
        id: "B1",
        icon: LineChart,
        name: "Comprehensive Cash Flow Model Builder",
        flagship: true,
        text: "Assembles the full financial-statement forecast ARG Partners is known for — balance sheet, P&L with EBITDA, working-capital roll-forward, and borrowing-base availability — drawing on the field exam and prior reports that already supply ~80% of the inputs.",
        metric: "Model build time · speed from engagement to advice",
      },
      {
        id: "B2",
        icon: BarChart3,
        name: "13-Week Cash Flow & Variance Agent",
        text: "Builds and maintains the 13-week model used in CRO/CFO and bankruptcy engagements — weekly cash roll, matching working-capital and borrowing-base math, and budget-to-actual variance with draft commentary.",
        metric: "Weekly reporting effort during live engagements",
      },
      {
        id: "B3",
        icon: Workflow,
        name: "Restructuring Scenario & Sources-and-Uses",
        text: "Models the cost/benefit of restructuring options — refinance, recapitalization, asset sale, right-sizing, or wind-down — projecting liquidity under each so principals show stakeholders a defensible path.",
        metric: "Scenario turnaround · quality of stakeholder communication",
      },
    ],
  },
  {
    code: "C",
    name: "Appraisal & Asset Recovery",
    practice: "Recovery · Industrial · Asset Recovery",
    agents: [
      {
        id: "C1",
        icon: PackageSearch,
        name: "Inventory Appraisal (NOLV) Accelerator",
        text: "Structures inventory listings, itemizes slow-moving and obsolete stock, runs sales and gross-margin trend analysis, and computes recovery scenarios — feeding ARG's Benchmarking Risk Algorithm with fresh, structured data.",
        metric: "Appraisal prep time · monitoring cadence between reappraisals",
      },
      {
        id: "C2",
        icon: FileText,
        name: "M&E Appraisal Comparable-Research",
        text: "Researches current market and auction comparables for machinery and equipment by industry to support FLV, OLV, FMV, and in-use opinions — accelerating desktop and inspected appraisals while keeping the appraiser central.",
        metric: "Comp-research time per appraisal",
      },
      {
        id: "C3",
        icon: ScrollText,
        name: "Wind-Down & Liquidation Reporting",
        text: "Drafts the recurring reporting wind-downs generate — DIP/cash-collateral budgets, budget-to-plan tracking, loan-to-value tracking, and bankruptcy schedules — as first drafts for the responsible-party team.",
        metric: "Reporting effort during wind-downs · timeliness",
      },
    ],
  },
  {
    code: "D",
    name: "AR Management",
    practice: "ARG AR Management",
    agents: [
      {
        id: "D1",
        icon: Coins,
        name: "AR Collections Intelligence & Ledgered-Receivables",
        text: "Indexes collection days against industry averages, surfaces systemic credit/process issues, prioritizes accounts, and maintains the weekly AR roll-forward and full collateral-to-cash reconciliation — even when the legacy accounting system is gone.",
        metric: "Diagnosis speed · ledgered-receivable reconciliation effort",
      },
    ],
  },
  {
    code: "E",
    name: "Firmwide Knowledge & Market",
    practice: "Cross-practice",
    agents: [
      {
        id: "E1",
        icon: TrendingUp,
        name: "Commodity Report Research & Drafting",
        text: "Gathers monthly commodity pricing, computes trailing trends, and drafts the recurring ARG Commodity Report for client distribution — turning a standing monthly production task into a reviewed draft.",
        metric: "Monthly production time · consistency & reach",
      },
      {
        id: "E2",
        icon: BookOpenCheck,
        name: "Engagement Knowledge Base (RAG) + Proposal Drafter",
        text: "A searchable, permissioned memory across ARG's past exams, models, and appraisals — operationalizing the 80% advantage — plus a drafting assistant that produces scoped proposals and engagement letters from a short brief.",
        metric: "Time re-finding prior work · proposal turnaround",
      },
      {
        id: "E3",
        icon: Calculator,
        name: "Executive / Engagement Briefing",
        text: "A governed daily or weekly digest for principals across all active engagements — borrowers trending negative, upcoming deadlines, covenant and collateral risks — with every figure traceable to its source.",
        metric: "Principal time · decision latency across the portfolio",
      },
    ],
  },
];

const agentPrinciples = [
  {
    icon: Target,
    title: "Tied to a real ARG deliverable",
    text: "An exam, a model, an appraisal, a report. No AI for its own sake — every agent moves a deliverable you already bill.",
  },
  {
    icon: ShieldCheck,
    title: "Read broadly, act carefully",
    text: "Agents read across borrower data and draft and recommend — they never send communications, alter collateral records, or finalize a valuation without a professional's review and an audit trail.",
  },
  {
    icon: Lock,
    title: "Confidential by design",
    text: "Built for a firm that handles distressed-company financials, lender collateral data, and bankruptcy-sensitive information.",
  },
] as const;

const flagshipInputs = [
  { icon: FileSpreadsheet, label: "AR / AP agings" },
  { icon: PackageSearch, label: "Inventory listings" },
  { icon: Database, label: "General ledger" },
  { icon: Coins, label: "Bank statements" },
  { icon: FileText, label: "Prior ARG workpapers" },
] as const;

const flagshipOutputs = [
  "AR collateral roll-forward, turnover & dilution",
  "Ineligibles, past-dues & concentrations",
  "Inventory turnover & gross-margin testing",
  "Structured workpaper set + first-draft Executive Report",
] as const;

const flagshipFeeds = [
  { id: "B1", label: "Comprehensive Cash Flow Model" },
  { id: "A2", label: "BBC & Eligibility Agent" },
  { id: "A3", label: "Portfolio Monitoring" },
] as const;

const flagshipReasons = [
  {
    icon: BarChart3,
    title: "Highest volume, most standardized",
    text: "The standard-scope working-capital exam repeats across every engagement, so one well-built agent pays back across the whole portfolio.",
  },
  {
    icon: Database,
    title: "The data already arrives",
    text: "Borrowers and prior ARG workpapers supply the inputs — no greenfield integration required to start.",
  },
  {
    icon: Network,
    title: "Feeds the franchise",
    text: "The same structured output shortens the comprehensive cash flow model — which ARG notes is ~80% built once a fresh exam exists.",
  },
  {
    icon: ClipboardCheck,
    title: "Governed by default",
    text: "The agent drafts; the examiner reviews, adjusts, and signs. Every figure traces back to its source document.",
  },
] as const;

const governance = [
  {
    icon: ShieldCheck,
    title: "Read broadly, act carefully",
    text: "No autonomous client communications, no changes to collateral records, and no finalized valuations or reports without a professional's explicit review and approval.",
  },
  {
    icon: Users,
    title: "Role-based access",
    text: "Aligned to ARG's identity provider — agents only see what their human owner is permitted to see.",
  },
  {
    icon: ScrollText,
    title: "Audit-ready by default",
    text: "Every recommendation preserves its assumptions, source data, and the reviewer's decision — essential when work product may be examined by lenders, courts, or in litigation support.",
  },
  {
    icon: Lock,
    title: "Confidential boundary",
    text: "Business / enterprise tiers that contractually isolate ARG's data and never train on it; credentials and integration secrets managed outside prompts.",
  },
  {
    icon: BadgeCheck,
    title: "Delivered on a managed-security foundation",
    text: "Built on ITECS's practice — SOC 2 Type II, ISO 27001, and CMMC-aligned controls.",
  },
] as const;

const roiPoints = [
  {
    icon: Gauge,
    title: "The right ROI metric is senior capacity",
    text: "ARG bills senior judgment; value shows up as hours freed, faster turnaround for lenders, and more engagements per professional — plus the quality and consistency of workpapers.",
  },
  {
    icon: BarChart3,
    title: "Illustrative now, validated in the assessment",
    text: "Figures here are framed as time and throughput leverage, not promised dollars. The readiness assessment replaces them with ARG's real engagement economics and a defensible baseline.",
  },
  {
    icon: Layers,
    title: "Phased and gated",
    text: "Orientation and the readiness assessment come first; a first agent build is scoped only after the economics are ranked, so spend follows proven payback.",
  },
  {
    icon: Lock,
    title: "Confidentiality is the design constraint",
    text: "Everything is built for a firm that handles lender and distressed-borrower data under strict confidentiality — not bolted on afterward.",
  },
] as const;

const pathSteps = [
  {
    title: "Executive AI Orientation",
    text: "A half-day session with ARG principals to align on where AI helps and where the guardrails go.",
  },
  {
    title: "AI Readiness Assessment",
    text: "Map ARG's workflows and data, scan for shadow AI, and rank the agent menu by payback.",
  },
  {
    title: "Foundation",
    text: "An AI Acceptable Use Policy and Shadow AI Discovery to make adoption safe firmwide.",
  },
  {
    title: "First build",
    text: "An Agent Discovery & Technical Spec, then the Field Examination Analyzer — expanding into the cash flow model builder and portfolio monitoring.",
  },
  {
    title: "Sustain",
    text: "An Internal AI Champion program plus Managed AI retainers to keep adoption and production agents monitored and tuned.",
  },
] as const;

const whyItecs = [
  {
    icon: BadgeCheck,
    title: "A relationship already in place",
    text: "ARG and ITECS already have a working relationship and a security posture established — a shorter, lower-risk path to value than a cold start with a new vendor.",
  },
  {
    icon: Scale,
    title: "Platform-agnostic guidance",
    text: "We recommend the right tool per use case across Claude, ChatGPT, and Microsoft 365 Copilot — never locking ARG into one vendor.",
  },
  {
    icon: ShieldCheck,
    title: "Built on managed security",
    text: "Delivered on ITECS's SOC 2 Type II, ISO 27001, and CMMC-aligned practice — the right foundation for confidential financial work.",
  },
  {
    icon: BrainCircuit,
    title: "AI consulting + agent engineering",
    text: "Not just training. ITECS designs, builds, and operates production agents with human-in-the-loop governance and full audit trails.",
  },
  {
    icon: MapPin,
    title: "Local, and proven",
    text: "ITECS has delivered managed IT, security, and governance from the Dallas–Fort Worth area for more than two decades.",
  },
] as const;

const team = [
  ["Brian Desmot", "Founder & CIO — engagement lead"],
  ["ITECS AI Strategy", "Roadmapping, readiness & governance"],
  ["ITECS Agent Engineering", "Agent design, integration & audit trails"],
  ["ITECS Security Practice", "SOC 2 · ISO 27001 · CMMC-aligned delivery"],
] as const;

const nextSteps = [
  "Review this proposal — we're glad to walk ARG's principals and practice leads through it on a brief call.",
  "Pick the first practice for a pilot — we recommend Transaction Services, leading with the Field Examination Analyzer.",
  "Confirm a target date for the Executive AI Orientation so ITECS can tailor it to ARG's workflows.",
] as const;

/* ----------------------------------------------------------------------------
 * Diagram components
 * ------------------------------------------------------------------------- */

function PlatformLogoWall() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {platformStack.map((item) => (
        <div
          key={item.name}
          className="flex flex-col items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/40 p-4 text-center transition-colors hover:border-brand-accent/30"
        >
          <div className="flex h-16 w-full items-center justify-center rounded-lg bg-white/95 px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            {item.type === "logo" ? (
              "label" in item && item.label ? (
                <span className="flex items-center gap-2 text-slate-900">
                  <Image
                    src={item.src}
                    alt={`${item.name} logo`}
                    width={item.width}
                    height={item.height}
                    className="h-7 w-auto object-contain"
                  />
                  <span className="text-xs font-semibold leading-tight tracking-tight">
                    365 Copilot
                  </span>
                </span>
              ) : (
                <Image
                  src={item.src}
                  alt={`${item.name} logo`}
                  width={item.width}
                  height={item.height}
                  className="h-6 w-auto object-contain md:h-7"
                />
              )
            ) : (
              <span className="flex items-center gap-2 text-slate-900">
                <item.icon className="h-5 w-5 text-[#0b3d5c]" aria-hidden="true" />
                <span className="text-sm font-semibold tracking-tight">ITECS</span>
              </span>
            )}
          </div>
          <div>
            <div className="text-sm font-medium text-text-primary">{item.name}</div>
            <div className="mt-0.5 text-xs leading-snug text-text-dim">{item.role}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ThesisRing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const pct = 0.8;

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[260px_1fr]">
      <div className="relative mx-auto flex h-[220px] w-[220px] items-center justify-center">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth="10"
          />
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#3288B6"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: circumference * (1 - pct) } : {}}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-5xl font-semibold leading-none text-text-primary">
            ~80%
          </span>
          <span className="mt-1.5 max-w-[120px] text-center font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
            Already exists
          </span>
        </div>
      </div>
      <div>
        <p className="mb-5 text-sm leading-relaxed text-text-secondary md:text-base">
          ARG&apos;s own model proves the thesis: prior reports supply{" "}
          <span className="text-text-primary">roughly 80% of what&apos;s needed</span> to
          build a comprehensive cash flow model. Agents are how that 80% gets
          assembled in <span className="text-text-primary">hours instead of days</span> —
          so principals review and decide instead of build.
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {thesisInputs.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
              className="flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-bg-void/50 px-3 py-2"
            >
              <Check className="h-3.5 w-3.5 shrink-0 text-brand-accent-bright" />
              <span className="truncate text-xs text-text-secondary">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SeniorTimeReallocation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="grid gap-8">
      {reallocation.map((row, idx) => (
        <div key={row.key}>
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <span className="font-medium text-text-primary">{row.label}</span>
            <span className="text-xs text-text-dim">{row.sublabel}</span>
          </div>
          <div className="flex h-12 overflow-hidden rounded-lg border border-[var(--border-subtle)]">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${row.assembly}%` } : {}}
              transition={{ duration: 1.1, delay: idx * 0.2, ease: "easeOut" }}
              className="flex items-center justify-start overflow-hidden whitespace-nowrap bg-text-dim/25 pl-3"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-secondary">
                Assembly {row.assembly}%
              </span>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${row.judgment}%` } : {}}
              transition={{ duration: 1.1, delay: idx * 0.2 + 0.15, ease: "easeOut" }}
              className="flex items-center justify-end overflow-hidden whitespace-nowrap bg-brand-accent/30 pr-3"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-brand-accent-bright">
                Judgment {row.judgment}%
              </span>
            </motion.div>
          </div>
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-dim">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-text-dim/25" /> Data assembly &
          normalization
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-accent/40" /> Senior judgment
          &amp; findings — what lenders pay for
        </span>
      </div>
      <p className="text-xs leading-relaxed text-text-dim">
        Illustrative split, not a promised figure — the readiness assessment replaces
        it with ARG&apos;s real engagement economics.
      </p>
    </div>
  );
}

function AdoptionRoadmap() {
  return (
    <div>
      {/* Proportional track */}
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim">
        <span>Align &amp; assess</span>
        <span>Pilot &amp; sustain</span>
      </div>
      <div className="flex gap-1.5 overflow-hidden rounded-lg">
        {adoptionPhases.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            style={{ flexGrow: p.weight, transformOrigin: "left" }}
            className="flex h-12 items-center justify-center rounded-md border border-brand-accent/40 bg-brand-accent/10"
          >
            <span className="font-mono text-xs font-semibold text-brand-accent-bright">
              {p.id}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Phase cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {adoptionPhases.map((p, i) => (
          <FadeIn key={p.id} delay={i * 0.06}>
            <div className="h-full rounded-xl border border-[var(--border-subtle)] bg-bg-surface/35 p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10">
                  <p.icon className="h-5 w-5 text-brand-accent-bright" />
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-brand-accent-bright">
                    {p.id}
                  </span>
                  <span className="font-medium leading-tight text-text-primary">
                    {p.name}
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">{p.text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
      <p className="mt-6 rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-4 text-center text-sm leading-relaxed text-text-secondary">
        <span className="text-text-primary">Recommended sequence:</span> Orientation →
        Readiness Assessment → AUP + Shadow AI (run together) → a production pilot in
        Transaction Services → Internal Champion + Managed AI to sustain it.
      </p>
    </div>
  );
}

function AgentMenu() {
  return (
    <div className="grid gap-8">
      {agentPools.map((pool) => (
        <FadeIn key={pool.code}>
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/25 p-5 md:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 font-mono text-base font-semibold text-brand-accent-bright">
                  {pool.code}
                </span>
                <div>
                  <h3 className="font-medium text-text-primary">{pool.name}</h3>
                  <p className="text-xs text-text-dim">{pool.practice}</p>
                </div>
              </div>
              <span className="rounded-full border border-[var(--border-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-text-dim">
                {pool.agents.length} {pool.agents.length === 1 ? "agent" : "agents"}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pool.agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`flex h-full flex-col rounded-xl border bg-bg-void/40 p-5 transition-colors ${
                    agent.flagship
                      ? "border-brand-accent/40 shadow-[0_0_30px_var(--accent-cyan-subtle)]"
                      : "border-[var(--border-subtle)] hover:border-brand-accent/30"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10">
                      <agent.icon className="h-5 w-5 text-brand-accent-bright" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-text-dim">
                      {agent.id}
                    </span>
                  </div>
                  {agent.flagship ? (
                    <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full border border-brand-accent/40 bg-brand-accent/10 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-brand-accent-bright">
                      <Sparkles className="h-3 w-3" /> Flagship build
                    </span>
                  ) : null}
                  <h4 className="mb-2 text-sm font-medium leading-snug text-text-primary">
                    {agent.name}
                  </h4>
                  <p className="mb-4 text-xs leading-relaxed text-text-secondary">
                    {agent.text}
                  </p>
                  <div className="mt-auto border-t border-[var(--border-subtle)] pt-3">
                    <div className="mb-1 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-text-dim">
                      <Gauge className="h-3 w-3 text-brand-accent-bright" /> Metric moved
                    </div>
                    <p className="text-xs leading-relaxed text-text-secondary">
                      {agent.metric}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

function FlagshipPipeline() {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-bg-void/50 p-5 md:p-8">
      {/* Inputs */}
      <div className="mb-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
        Borrower data in
      </div>
      <div className="flex flex-wrap justify-center gap-2.5">
        {flagshipInputs.map((input) => (
          <span
            key={input.label}
            className="flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-bg-surface/40 px-3 py-2 text-xs text-text-secondary"
          >
            <input.icon className="h-4 w-4 text-brand-accent-bright" />
            {input.label}
          </span>
        ))}
      </div>

      <div className="flex flex-col items-center py-3" aria-hidden="true">
        <ArrowDown className="h-6 w-6 text-brand-accent/60" />
      </div>

      {/* Analyzer core */}
      <div className="relative mx-auto max-w-2xl rounded-2xl border-2 border-brand-accent/50 bg-brand-accent/[0.06] p-6 text-center shadow-[0_0_40px_var(--accent-cyan-subtle)]">
        <div className="mb-3 flex items-center justify-center gap-2 text-brand-accent-bright">
          <BrainCircuit className="h-6 w-6" />
          <span className="font-medium text-text-primary">
            Field Examination Analyzer
          </span>
        </div>
        <p className="text-sm leading-relaxed text-text-secondary">
          Normalizes the inputs and runs the standard working-capital exam — roll-forwards,
          dilution, turnover, ineligibles, concentrations, and collateral-to-cash
          reconciliation. The examiner moves straight to interpretation and findings.
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-brand-accent-bright">
          <ClipboardCheck className="h-3.5 w-3.5" /> Human-in-the-loop · audit trail
        </span>
      </div>

      <div className="flex flex-col items-center py-3" aria-hidden="true">
        <ArrowDown className="h-6 w-6 text-brand-accent/60" />
      </div>

      {/* Outputs */}
      <div className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
        Structured work product out
      </div>
      <div className="grid gap-2.5 md:grid-cols-2">
        {flagshipOutputs.map((out) => (
          <div
            key={out}
            className="flex items-start gap-2 rounded-lg border border-[var(--border-subtle)] bg-bg-surface/30 px-4 py-3 text-sm leading-relaxed text-text-secondary"
          >
            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright" />
            <span>{out}</span>
          </div>
        ))}
      </div>

      {/* Feeds downstream */}
      <div className="mt-6 rounded-xl border border-brand-accent/25 bg-brand-accent/5 p-5">
        <div className="mb-3 flex items-center gap-2 text-brand-accent-bright">
          <Network className="h-5 w-5" />
          <span className="text-sm font-medium text-text-primary">
            One clean exam feeds the rest of the franchise
          </span>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {flagshipFeeds.map((feed) => (
            <div
              key={feed.id}
              className="flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-bg-void/50 px-3 py-2.5"
            >
              <span className="font-mono text-xs font-semibold text-brand-accent-bright">
                {feed.id}
              </span>
              <span className="text-xs leading-snug text-text-secondary">
                {feed.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Proposal response form
 * ------------------------------------------------------------------------- */

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
      proposal: "ARG Companies — AI Adoption & Agent Development",
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
            ? "ARG AI Proposal — Move Forward"
            : "ARG AI Proposal — Request Changes",
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
          ? "Thank you. ITECS will follow up to schedule the Executive AI Orientation and tailor it to ARG's workflows."
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
            {isApproval ? "Let's Get Started" : "Request Changes"}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">
            {isApproval
              ? "Confirm the details below and ITECS will coordinate the Executive AI Orientation."
              : "Share what needs to be adjusted so ITECS can respond appropriately."}
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
            placeholder="name@argpartners.com"
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
          {isApproval ? "Notes" : "Requested Changes"}
        </label>
        <textarea
          id={`${decision}-message`}
          name="message"
          rows={4}
          required={!isApproval}
          className="w-full rounded-lg border border-[var(--border-subtle)] bg-bg-void px-4 py-3 text-text-primary placeholder:text-text-dim/50 transition-colors focus:border-brand-accent focus:outline-none"
          placeholder={
            isApproval
              ? "Optional: which practice to pilot first, preferred orientation timing, or who should attend."
              : "Please share the questions, scope changes, or timing concerns you'd like addressed."
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
            ? "Send & Schedule Orientation"
            : "Send Change Request"}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </motion.form>
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
        className="group flex items-center justify-center gap-2 rounded-xl border border-brand-accent/40 bg-brand-accent/95 px-3.5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-bg-void shadow-[0_14px_44px_var(--accent-cyan-subtle)] backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-brand-accent-bright focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-bg-void md:px-4"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-bg-void/10 text-bg-void transition-colors group-hover:bg-bg-void/15">
          <Download className="h-4 w-4" aria-hidden="true" />
        </span>
        <span>Download Proposal</span>
      </a>
    </motion.div>
  );
}

/* ----------------------------------------------------------------------------
 * Page
 * ------------------------------------------------------------------------- */

export default function ArgAiProposal() {
  const [decision, setDecision] = useState<ProposalDecision | null>(null);

  return (
    <div className="min-h-screen overflow-hidden bg-bg-void pb-28 text-text-primary">
      <StickyProposalDownload />

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden px-6 py-28 md:px-12 lg:px-24">
        <GradientOrb color="cyan" size="lg" position={{ top: "-240px", right: "-160px" }} />
        <GradientOrb color="brand" size="md" position={{ bottom: "-180px", left: "-120px" }} />
        <GridBackground opacity={0.03} />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <SlideIn direction="left">
            <SectionLabel>Private Proposal · AI Adoption & Agents</SectionLabel>
            <h1 className="text-4xl font-light leading-tight tracking-[-0.03em] text-text-primary md:text-6xl lg:text-7xl">
              AI adoption & agent development for{" "}
              <span className="text-brand-accent-bright">ARG Companies.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
              A practical path to{" "}
              <span className="text-text-primary">faster turnarounds</span>, freed
              senior capacity, and{" "}
              <span className="text-text-primary">governed AI</span> — built for
              asset-based lending and restructuring work, where every deliverable
              starts from the same raw borrower data.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {heroStats.map(([value, label]) => (
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
                href="#thesis"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-accent px-6 py-3 text-sm font-medium uppercase tracking-wide text-bg-void transition-colors hover:bg-brand-accent-bright"
              >
                Explore the Opportunity
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
            <div className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-bg-surface/50 p-6 shadow-e2">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent/10">
                  <BrainCircuit className="h-6 w-6 text-brand-accent-bright" />
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">
                    Proposal summary
                  </div>
                  <div className="text-xs text-text-dim">
                    Adoption & training · custom AI agents
                  </div>
                </div>
              </div>
              <dl className="divide-y divide-[var(--border-subtle)]">
                {metadataRows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[120px_1fr] gap-3 py-3">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-dim">
                      {label}
                    </dt>
                    <dd className="text-sm leading-relaxed text-text-secondary">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* PLATFORM STACK / LOGO WALL */}
      <Section className="border-y border-[var(--border-subtle)] bg-bg-surface/30">
        <FadeIn>
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <SectionLabel>Fluent Across Every Major Platform</SectionLabel>
              <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                The right AI tool for each job.
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-text-secondary">
              ARG&apos;s staff will get the most from the three leading platforms — each
              with a desktop app and business tiers. ITECS is platform-agnostic: we
              recommend the right fit per use case, grounded in ARG&apos;s Microsoft 365
              footprint and where the confidential data lives.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <PlatformLogoWall />
        </FadeIn>
      </Section>

      <div className="relative">
        <CircuitTrace variant="section-divider" />
      </div>

      {/* EXECUTIVE SUMMARY */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SlideIn direction="left">
            <SectionLabel>Executive Summary</SectionLabel>
            <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-4xl">
              Your product is senior judgment, delivered fast.
            </h2>
          </SlideIn>
          <SlideIn direction="right" delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed text-text-secondary md:text-lg">
              <p>
                Field examinations, cash flow models, NOLV and M&amp;E appraisals,
                wind-down reporting, AR analysis, the monthly commodity report — every
                ARG deliverable is built from the same raw materials: borrower
                financials, agings, inventory and equipment listings, GLs, bank
                statements, and borrowing-base certificates.
              </p>
              <p>
                Today a seasoned professional spends a large share of each engagement{" "}
                <span className="text-text-primary">
                  assembling and normalizing that data
                </span>{" "}
                before the judgment work even begins. That assembly layer is exactly
                where governed AI creates leverage.
              </p>
              <p>
                The payoff ARG should expect:{" "}
                <span className="text-text-primary">
                  shorter exam and model turnaround for lenders, more engagements
                  handled by the same senior bench, and a defensible, audit-ready trail
                </span>{" "}
                behind every number — across two tracks: AI adoption &amp; training, and
                purpose-built AI agents.
              </p>
            </div>
          </SlideIn>
        </div>
      </Section>

      {/* THESIS — 80% ALREADY EXISTS */}
      <Section id="thesis" className="relative border-y border-[var(--border-subtle)] bg-bg-void">
        <GridBackground opacity={0.025} />
        <div className="relative z-10">
          <FadeIn>
            <div className="mb-12 text-center">
              <SectionLabel>The Leverage Thesis</SectionLabel>
              <h2 className="text-3xl font-light text-text-primary md:text-5xl">
                Most of the work is already on the page.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <ThesisRing />
          </FadeIn>
        </div>
      </Section>

      {/* TIME REALLOCATION */}
      <Section>
        <FadeIn>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <SectionLabel>Where Senior Hours Go</SectionLabel>
              <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                Move the bench from build to judgment.
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-text-secondary">
              Agents do the repetitive collateral analysis, roll-forwards,
              reconciliations, and first-draft reporting — so principals review and
              decide instead of build. The scarce resource, senior judgment, is pointed
              at what lenders actually pay ARG for.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/30 p-6 md:p-8">
            <SeniorTimeReallocation />
          </div>
        </FadeIn>
      </Section>

      <div className="relative">
        <CircuitTrace variant="section-divider" />
      </div>

      {/* PART 1 — ADOPTION */}
      <Section className="bg-bg-surface/20">
        <FadeIn>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/10 font-mono text-lg font-semibold text-brand-accent-bright">
              1
            </span>
            <SectionLabel>Part One · AI Adoption & Training</SectionLabel>
          </div>
          <h2 className="mb-6 max-w-3xl text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
            Get every professional fluent — and safe — with AI they can use today.
          </h2>
          <p className="mb-12 max-w-3xl text-lg leading-relaxed text-text-secondary">
            The fastest, lowest-risk value comes from getting the whole team productive
            inside Excel models, Word reports, and Outlook — with a clear acceptable-use
            policy that protects confidential lender and borrower data.
          </p>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-3">
          {platformCards.map((card, i) => (
            <FadeIn key={card.name} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-bg-void/40 p-6 transition-colors hover:border-brand-accent/30">
                <div className="mb-4 flex h-14 items-center justify-start rounded-lg bg-white/95 px-4 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <Image
                    src={card.logo}
                    alt={`${card.name} logo`}
                    width={card.width}
                    height={card.height}
                    className="h-7 w-auto object-contain"
                  />
                </div>
                <div className="mb-3">
                  <div className="text-lg font-light text-text-primary">{card.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim">
                    {card.vendor}
                  </div>
                </div>
                <div className="mb-3 inline-flex w-fit rounded-full border border-brand-accent/30 bg-brand-accent/5 px-3 py-1 text-xs text-brand-accent-bright">
                  {card.bestFor}
                </div>
                <ul className="grid gap-2 border-t border-[var(--border-subtle)] pt-4">
                  {card.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* SECURITY QUESTIONS */}
      <Section>
        <FadeIn>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel>The Questions That Matter</SectionLabel>
              <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                Safe AI for a financial-advisory firm.
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-text-secondary">
              ARG handles lender collateral data, distressed-borrower financials, and
              bankruptcy-sensitive material. Three questions every principal will ask —
              answered plainly.
            </p>
          </div>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-3">
          {securityQuestions.map((item, i) => (
            <FadeIn key={item.q} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/30 p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent/10">
                  <item.icon className="h-5 w-5 text-brand-accent-bright" />
                </div>
                <h3 className="mb-2 text-base font-medium text-text-primary">{item.q}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{item.a}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.1}>
          <div className="mt-6 flex items-start gap-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/20">
              <Bot className="h-5 w-5 text-amber-700" />
            </div>
            <div>
              <h3 className="mb-1 font-medium text-text-primary">
                The single biggest near-term risk: shadow AI
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                Staff pasting borrower financials into free consumer tools. ITECS
                addresses it with a discovery scan, a clear acceptable-use policy, and
                approved business-tier tooling — so confidential engagement data only
                ever goes into governed accounts.
              </p>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* ADOPTION ROADMAP */}
      <Section className="relative border-y border-[var(--border-subtle)] bg-bg-surface/20">
        <GradientOrb color="cyan" size="md" position={{ top: "-120px", right: "-80px" }} />
        <div className="relative z-10">
          <FadeIn>
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <SectionLabel>The Adoption Path</SectionLabel>
                <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                  Phased, with a decision point at every step.
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-text-secondary">
                No big-bang rollout. ARG advances one gated phase at a time — each
                closing with a clear deliverable and a leadership checkpoint before the
                next begins.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <AdoptionRoadmap />
          </FadeIn>
        </div>
      </Section>

      <div className="relative">
        <CircuitTrace variant="section-divider" />
      </div>

      {/* PART 2 — AGENTS */}
      <Section>
        <FadeIn>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/10 font-mono text-lg font-semibold text-brand-accent-bright">
              2
            </span>
            <SectionLabel>Part Two · Custom AI Agent Development</SectionLabel>
          </div>
          <h2 className="mb-6 max-w-3xl text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
            The higher-leverage half: agents tied to real deliverables.
          </h2>
          <p className="mb-12 max-w-3xl text-lg leading-relaxed text-text-secondary">
            Purpose-built agents that do the repetitive collateral analysis,
            roll-forwards, reconciliations, and first-draft reporting. Every one
            follows three principles.
          </p>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-3">
          {agentPrinciples.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/30 p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent/10">
                  <p.icon className="h-5 w-5 text-brand-accent-bright" />
                </div>
                <h3 className="mb-2 text-lg font-light text-text-primary">{p.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{p.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* AGENT MENU */}
      <Section className="border-t border-[var(--border-subtle)] bg-bg-surface/20">
        <FadeIn>
          <div className="mb-12 text-center">
            <SectionLabel>The Full Agent Menu</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-5xl">
              Thirteen agents, mapped to ARG&apos;s practices.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-text-secondary">
              Grouped by practice area. The readiness assessment ranks them by payback,
              so the first build has the cleanest data and the clearest return.
            </p>
          </div>
        </FadeIn>
        <AgentMenu />
      </Section>

      {/* FLAGSHIP DEEP-DIVE */}
      <Section className="relative">
        <GradientOrb color="brand" size="md" position={{ bottom: "-160px", left: "-120px" }} />
        <div className="relative z-10">
          <FadeIn>
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <SectionLabel>Flagship · Recommended First Build</SectionLabel>
                <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                  The Field Examination Analyzer.
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-text-secondary">
                It sits at the{" "}
                <span className="text-text-primary">front door of almost everything else</span>{" "}
                — a clean, structured exam feeds the cash flow model, the BBC agent, and
                portfolio monitoring — and it targets ARG&apos;s scarcest resource: senior
                examiner time.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <FlagshipPipeline />
          </FadeIn>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {flagshipReasons.map((r, i) => (
              <FadeIn key={r.title} delay={i * 0.06}>
                <div className="flex h-full gap-4 rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/30 p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10">
                    <r.icon className="h-5 w-5 text-brand-accent-bright" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-text-primary">{r.title}</h3>
                    <p className="text-sm leading-relaxed text-text-secondary">{r.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* GOVERNANCE */}
      <Section className="border-y border-[var(--border-subtle)] bg-bg-surface/20">
        <FadeIn>
          <div className="mb-12 text-center">
            <SectionLabel>Governance & Security</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-5xl">
              Built for confidential financial work.
            </h2>
          </div>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {governance.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-void/40 p-6 transition-colors hover:border-brand-accent/30">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent/10">
                  <item.icon className="h-5 w-5 text-brand-accent-bright" />
                </div>
                <h3 className="mb-2 text-lg font-light text-text-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ROI FRAMING */}
      <Section>
        <FadeIn>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel>How ITECS Stands Behind ROI</SectionLabel>
              <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                Spend follows proven payback.
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-text-secondary">
              We frame value as time and throughput leverage, not promised dollars —
              then let ARG&apos;s own engagement economics, captured in the readiness
              assessment, set a defensible baseline.
            </p>
          </div>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-2">
          {roiPoints.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <div className="flex h-full gap-4 rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/30 p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10">
                  <item.icon className="h-5 w-5 text-brand-accent-bright" />
                </div>
                <div>
                  <h3 className="mb-1 font-medium text-text-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{item.text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* PATH FROM HERE */}
      <Section className="border-y border-[var(--border-subtle)] bg-bg-surface/20">
        <FadeIn>
          <div className="mb-12 text-center">
            <SectionLabel>The Path From Here</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-5xl">
              Five steps, each gated on the last.
            </h2>
          </div>
        </FadeIn>
        <div className="mx-auto grid max-w-4xl gap-3">
          {pathSteps.map((step, index) => (
            <FadeIn key={step.title} delay={index * 0.05}>
              <div className="grid gap-4 rounded-xl border border-[var(--border-subtle)] bg-bg-void/40 p-5 md:grid-cols-[56px_1fr]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 font-mono text-sm font-semibold text-brand-accent-bright">
                  {index + 1}
                </div>
                <div>
                  <h3 className="mb-1 font-medium text-text-primary">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{step.text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* WHY ITECS */}
      <Section className="relative bg-bg-void">
        <GradientOrb color="brand" size="md" position={{ bottom: "-160px", right: "-120px" }} />
        <div className="relative z-10">
          <FadeIn>
            <div className="mb-12 text-center">
              <SectionLabel>Why ITECS</SectionLabel>
              <h2 className="text-3xl font-light text-text-primary md:text-5xl">
                A mature partner, already in your corner.
              </h2>
            </div>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyItecs.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/30 p-6 transition-colors hover:border-brand-accent/30">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent/10">
                    <item.icon className="h-5 w-5 text-brand-accent-bright" />
                  </div>
                  <h3 className="mb-2 text-lg font-light text-text-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Team */}
          <FadeIn delay={0.1}>
            <div className="mt-10 rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/30 p-6 md:p-8">
              <div className="mb-6 flex items-center gap-2 text-brand-accent-bright">
                <Users className="h-5 w-5" />
                <h3 className="font-mono text-xs uppercase tracking-[0.16em]">
                  Your ITECS team
                </h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {team.map(([name, role]) => (
                  <div
                    key={name}
                    className="flex items-center gap-4 rounded-xl border border-[var(--border-subtle)] bg-bg-void/40 p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-accent/10 font-mono text-sm font-semibold text-brand-accent-bright">
                      {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">{name}</div>
                      <div className="text-sm text-text-secondary">{role}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-[var(--border-subtle)] pt-5 text-sm leading-relaxed text-text-dim">
                Brian Desmot · Founder &amp; CIO, ITECS · bdesmot@itecsonline.com ·
                (214) 444-7884 — ITECS Outsourcing, LLC · AI Consulting · DevOps ·
                Security · Governance · itecs.ai
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* NEXT STEPS */}
      <Section className="border-t border-[var(--border-subtle)]">
        <FadeIn>
          <div className="mb-10 text-center">
            <SectionLabel>Next Steps</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-4xl">
              We&apos;d welcome the chance to help ARG put AI to work.
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="mx-auto mb-10 grid max-w-4xl gap-3">
            {nextSteps.map((step, index) => (
              <div
                key={step}
                className="grid gap-4 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/35 p-4 md:grid-cols-[56px_1fr]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 font-mono text-sm font-medium text-brand-accent-bright">
                  {index + 1}
                </div>
                <p className="flex items-center text-sm leading-relaxed text-text-secondary">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="mx-auto max-w-3xl rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <a
                href={pdfHref}
                download
                className="group rounded-xl border border-[var(--border-subtle)] bg-bg-void/60 p-5 transition-colors hover:border-brand-accent/35"
              >
                <div className="mb-3 flex items-center gap-2 text-brand-accent-bright">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm font-medium text-text-primary">PDF copy</span>
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">
                  Download the formal proposal document for internal review and records.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-brand-accent group-hover:text-brand-accent-bright">
                  Download PDF
                  <ArrowRight className="h-4 w-4" />
                </div>
              </a>
              <a
                href="#respond"
                className="group rounded-xl border border-[var(--border-subtle)] bg-bg-void/60 p-5 transition-colors hover:border-brand-accent/35"
              >
                <div className="mb-3 flex items-center gap-2 text-brand-accent-bright">
                  <Lock className="h-5 w-5" />
                  <span className="text-sm font-medium text-text-primary">Private page</span>
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">
                  This page is private and excluded from search indexing. Respond online
                  and ITECS will follow up.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-brand-accent group-hover:text-brand-accent-bright">
                  Respond Online
                  <ArrowRight className="h-4 w-4" />
                </div>
              </a>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* RESPONSE */}
      <Section id="respond" className="relative bg-bg-surface/20">
        <GradientOrb color="cyan" size="md" position={{ top: "-160px", left: "10%" }} />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <FadeIn>
            <SectionLabel>Proposal Response</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-5xl">
              Ready to take the first step?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-text-secondary">
              Moving forward starts with the half-day Executive AI Orientation and the
              readiness assessment — no commitment to a build until the economics are
              ranked. If the proposal needs changes, send your notes instead.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setDecision("approve")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-accent px-6 py-3 text-sm font-medium uppercase tracking-wide text-bg-void transition-colors hover:bg-brand-accent-bright"
              >
                Let&apos;s Move Forward
                <CheckCircle2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDecision("decline")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border-subtle)] px-6 py-3 text-sm font-medium uppercase tracking-wide text-text-secondary transition-colors hover:border-red-400/50 hover:text-red-200"
              >
                Request Changes
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
