"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  CheckCircle2,
  Check,
  ClipboardCheck,
  Cloud,
  Compass,
  Database,
  Download,
  FileCheck2,
  FileSearch,
  Fingerprint,
  GanttChartSquare,
  HardDrive,
  KeyRound,
  Laptop,
  Layers,
  Lock,
  Mail,
  MapPin,
  Printer,
  ScanLine,
  Server,
  ShieldCheck,
  Target,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";

const pdfHref = "/api/proposals/regulus-cmmc-l2-readiness-c4a5f9/pdf";

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
 * Structured proposal content (from the Regulus CMMC L2 proposal — no pricing)
 * ------------------------------------------------------------------------- */

const metadataRows = [
  ["Prepared for", "Regulus Industries — Max Khozozian, Chief of Staff"],
  ["Prepared by", "ITECS — Brian Desmot, CIO / CISO"],
  ["Engagement", "Fixed-fee, milestone-based project (implementation to assessment-ready)"],
  ["Standard", "CMMC Level 2 · NIST SP 800-171 (110 controls)"],
  ["Target", "Assessment-ready in ~12 weeks from kickoff"],
  ["Confidentiality", "ITECS Confidential — prepared exclusively for Regulus Industries"],
] as const;

const platformStack = [
  {
    type: "logo" as const,
    src: "/images/proposals/regulus/secureframe.svg",
    name: "Secureframe",
    width: 150,
    height: 21,
    role: "Compliance automation & evidence",
  },
  {
    type: "logo" as const,
    src: "/images/proposals/regulus/microsoft.svg",
    name: "Microsoft 365 GCC High",
    width: 132,
    height: 28,
    role: "Sovereign government cloud (GCC High)",
  },
  {
    type: "logo" as const,
    src: "/images/proposals/regulus/azure.svg",
    name: "Azure Virtual Desktop",
    width: 118,
    height: 28,
    role: "CUI enclave (VDI)",
  },
  {
    type: "logo" as const,
    src: "/images/proposals/regulus/sentinelone.svg",
    name: "SentinelOne",
    width: 140,
    height: 26,
    role: "Endpoint protection (EDR)",
  },
  {
    type: "logo" as const,
    src: "/images/proposals/regulus/rippling.svg",
    name: "Rippling",
    width: 118,
    height: 24,
    role: "Device management (MDM)",
  },
  {
    type: "chip" as const,
    name: "Defense Navigator",
    icon: Compass,
    role: "SSP authoring · Comply AI · monitoring",
  },
] as const;

const goals = [
  {
    icon: Building2,
    title: "A net-new defense subsidiary",
    text: "Regulus is an independent Dallas-based subsidiary of a larger defense enterprise, standing up its own IT from a clean slate.",
  },
  {
    icon: Target,
    title: "Contract with the U.S. government",
    text: "The driver is the ability to manufacture under controlled technical data packages (TDPs) involving export-controlled (ITAR) information — work that requires CMMC Level 2.",
  },
  {
    icon: Users,
    title: "A deliberately tight boundary",
    text: "~10 people today, scaling toward ~100, but only ~25 users need the CUI enclave. Keeping that boundary small is a shared priority — it reduces both risk and cost.",
  },
  {
    icon: ShieldCheck,
    title: "CUI contained, non-CUI free",
    text: "CUI stays inside the Secureframe / Azure Virtual Desktop enclave, with as much non-CUI work as possible kept outside it for performance and simplicity.",
  },
  {
    icon: Workflow,
    title: "ITECS leads, hands-free for your team",
    text: "ITECS runs Defense Navigator, authors documentation, and configures the environment — with weekly progress updates and leadership sign-off on major changes.",
  },
  {
    icon: KeyRound,
    title: "Independence over time",
    text: "Your stated preference is to operate the environment independently as you mature, with optional ITECS support during the transition.",
  },
] as const;

const assessmentReady = [
  {
    title: "CUI boundary defined & documented",
    text: "Scope, data flows, and asset categorization agreed and recorded.",
  },
  {
    title: "System Security Plan (SSP) complete",
    text: "Authored in Defense Navigator and approved by Regulus leadership.",
  },
  {
    title: "All 110 NIST SP 800-171 controls addressed",
    text: "Each control fully implemented or covered by an accepted POA&M consistent with CMMC rules.",
  },
  {
    title: "Evidence compiled in Secureframe",
    text: "Validated evidence assembled for each applicable control.",
  },
  {
    title: "SPRS score posted",
    text: "Supplier Performance Risk System score reflecting the implemented state.",
  },
  {
    title: "ITECS pre-assessment (mock audit) passed",
    text: "Findings remediated or formally accepted before the C3PAO engages.",
  },
] as const;

const scopeItems = [
  {
    icon: FileSearch,
    title: "CUI scoping & boundary",
    text: "Define the CUI boundary and data flows; categorize assets and engineer the smallest defensible boundary — accounting for export-controlled (ITAR) technical data and US-person access controls.",
    deliverables: [
      "CUI / Security Protection / Out-of-Scope asset categorization",
      "Contract & financial review to determine in- vs. out-of-enclave data",
      "ITAR-aware boundary design with US-person access controls",
    ],
  },
  {
    icon: Server,
    title: "Secureframe & enclave implementation",
    text: "Operate and configure Secureframe as lead implementer/architect, harden the GCC High tenant, and lock down the Azure Virtual Desktop enclave so CUI cannot leave it.",
    deliverables: [
      "GCC High tenant hardened to CMMC / NIST 800-171",
      "AVD enclave locked to keyboard/video/mouse only",
      "Separate multifactor authentication for enclave access",
    ],
  },
  {
    icon: Laptop,
    title: "Access-endpoint configuration",
    text: "Apply a zero-trust baseline to the full-service laptops used to remote into the enclave so they remain Out-of-Scope Assets — leveraging your existing SentinelOne and Rippling.",
    deliverables: [
      "Zero-trust endpoint baseline",
      "SentinelOne (EDR) + Rippling (MDM) leveraged in place",
      "Access laptops kept out of assessment scope",
    ],
  },
  {
    icon: FileCheck2,
    title: "Documentation & control implementation",
    text: "Author the SSP and supporting policies via Defense Navigator / Comply AI, implement controls across the NIST 800-171 families, and drive the POA&M to closure or accepted status.",
    deliverables: [
      "SSP & supporting policy set authored",
      "Technical & administrative controls implemented",
      "POA&M built and managed to closure / accepted",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Evidence, pre-assessment & handoff",
    text: "Assemble and validate control evidence, produce the Customer Responsibility Matrix and ITECS service description, run a mock audit, and deliver the assessment-ready package.",
    deliverables: [
      "Evidence validated in Secureframe",
      "Customer Responsibility Matrix + ITECS service description",
      "Pre-assessment, remediation & C3PAO introduction",
    ],
  },
] as const;

const itecsOwns = [
  "Operate & configure Secureframe as lead architect",
  "Harden the GCC High tenant & lock down the AVD enclave",
  "Author the SSP, policies & POA&M in Defense Navigator",
  "Assemble and validate control evidence",
  "Run the pre-assessment (mock audit) & remediate",
] as const;

const regulusOwns = [
  "Own and access CUI inside the enclave",
  "Provide timely approvals, inputs & a named leadership signer",
  "Maintain the underlying platform licenses & subscriptions",
  "Schedule and fund the independent C3PAO assessment",
  "Operate the environment post-handoff (with optional support)",
] as const;

const milestones = [
  {
    id: "M1",
    name: "Discovery & CUI scoping",
    weeks: 2,
    deliverables: [
      "Boundary definition",
      "Asset categorization",
      "Gap baseline",
      "Project plan",
    ],
  },
  {
    id: "M2",
    name: "Enclave & platform build",
    weeks: 3,
    deliverables: [
      "GCC High hardening",
      "VDI lockdown",
      "Access-endpoint baseline",
      "Secureframe configured",
    ],
  },
  {
    id: "M3",
    name: "Control implementation & documentation",
    weeks: 5,
    deliverables: [
      "110 controls implemented / POA&M'd",
      "SSP complete",
      "Evidence in Secureframe",
    ],
  },
  {
    id: "M4",
    name: "Pre-assessment & handoff",
    weeks: 2,
    deliverables: [
      "Mock audit & remediation",
      "SPRS posted",
      "Customer Responsibility Matrix",
      "Assessment-ready package + C3PAO intro",
    ],
  },
] as const;

const controlFamilies = [
  ["AC", "Access Control"],
  ["AT", "Awareness & Training"],
  ["AU", "Audit & Accountability"],
  ["CM", "Configuration Mgmt"],
  ["IA", "Identification & Auth"],
  ["IR", "Incident Response"],
  ["MA", "Maintenance"],
  ["MP", "Media Protection"],
  ["PS", "Personnel Security"],
  ["PE", "Physical Protection"],
  ["RA", "Risk Assessment"],
  ["CA", "Security Assessment"],
  ["SC", "System & Comms"],
  ["SI", "System Integrity"],
] as const;

const enclaveLocks = [
  { icon: ScanLine, label: "Copy / paste & clipboard" },
  { icon: HardDrive, label: "Drive redirection" },
  { icon: Printer, label: "Printing" },
  { icon: ScanLine, label: "Screenshots" },
  { icon: Download, label: "Downloads" },
] as const;

const assumptions = [
  "The CUI enclave remains approximately ≤ 25 users during the project.",
  "Regulus provides timely access, approvals, representative documents for the CUI determination, and a named approver for leadership sign-offs.",
  "Existing platforms (Secureframe, GCC High, Azure Virtual Desktop, Defense Navigator, SentinelOne, Rippling) remain active and available.",
  "Regulus is responsible for scheduling and funding the independent C3PAO assessment.",
  "Material delays in client inputs or changes in scope may affect the timeline and may require a change order.",
] as const;

const exclusions = [
  "Ongoing managed IT / managed security services (helpdesk, 24/7 monitoring, ongoing administration) after assessment-readiness.",
  "Hardware and mobile device procurement.",
  "The identified add-on capabilities below.",
  "The C3PAO assessment itself and remediation of issues introduced by changes outside ITECS's control.",
] as const;

const addOns = [
  {
    icon: Mail,
    title: "Email security on Microsoft 365",
    status: "Likely required",
    tone: "req" as const,
    text: "Layered email security to satisfy several 800-171 controls.",
  },
  {
    icon: Activity,
    title: "Audit logging & retention / SIEM",
    status: "May be required",
    tone: "req" as const,
    text: "Validate whether native GCC High meets NIST 800-171 audit requirements; an add-on may be required.",
  },
  {
    icon: Database,
    title: "Microsoft 365 backup & recovery",
    status: "Strongly recommended",
    tone: "rec" as const,
    text: "US-based, encrypted in transit and at rest, air-gapped, full-tenant restore — for resilience and continuity controls.",
  },
  {
    icon: Laptop,
    title: "Mobile access strategy",
    status: "Recommended",
    tone: "rec" as const,
    text: "Company-issued managed devices for enclave-adjacent roles, avoiding the intrusiveness of BYOD controls.",
  },
] as const;

const whyItecs = [
  {
    icon: ShieldCheck,
    title: "A clean compliance boundary, by design",
    text: "We understand exactly how an external provider supports a CMMC environment without entering CUI scope — protecting your certification and keeping your assessment footprint (and cost) small.",
  },
  {
    icon: Compass,
    title: "A direct line to certification",
    text: "We work regularly with a local C3PAO and will introduce you at the right moment for a smooth path to assessment.",
  },
  {
    icon: Users,
    title: "One communication bridge",
    text: "Your Technical Account Manager translates between your leadership and our engineers, so updates are clear and executive-ready.",
  },
  {
    icon: BadgeCheck,
    title: "Transparent, non-biased guidance",
    text: "You see every gap and recommendation in plain language, early — never a surprise at the finish line.",
  },
  {
    icon: MapPin,
    title: "Local, and proven",
    text: "ITECS has delivered managed IT and security from the Dallas–Fort Worth area for more than two decades, with the breadth to support you as you scale.",
  },
] as const;

const team = [
  ["Brian Desmot", "CIO / CISO — engagement lead"],
  ["Marc Dunbar", "Director of Operations & Services"],
  ["Jordan Emerle", "Technical Account Manager — your primary point of contact"],
  ["ITECS CMMC team", "Implementation engineers & security specialists"],
] as const;

const nextSteps = [
  "Review this proposal — we're glad to walk through it with you and Sam on a brief call.",
  "Confirm the milestone schedule and target kickoff so ITECS can mobilize the CMMC team.",
] as const;

/* ----------------------------------------------------------------------------
 * Diagram components
 * ------------------------------------------------------------------------- */

function PlatformLogoWall() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {platformStack.map((item) => (
        <div
          key={item.name}
          className="flex flex-col items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/40 p-4 text-center transition-colors hover:border-brand-accent/30"
        >
          <div className="flex h-16 w-full items-center justify-center rounded-lg bg-white/95 px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            {item.type === "logo" ? (
              <Image
                src={item.src}
                alt={`${item.name} logo`}
                width={item.width}
                height={item.height}
                className="h-6 w-auto object-contain md:h-7"
              />
            ) : (
              <span className="flex items-center gap-2 text-slate-900">
                <item.icon className="h-5 w-5 text-[#0b3d5c]" aria-hidden="true" />
                <span className="text-sm font-semibold tracking-tight">
                  {item.name}
                </span>
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

function FlowConnector({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center py-2" aria-hidden="true">
      <span className="rounded-full border border-brand-accent/30 bg-brand-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-accent-bright">
        {label}
      </span>
      <ArrowDown className="mt-1 h-5 w-5 text-brand-accent/60" />
    </div>
  );
}

function CuiBoundaryDiagram() {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-bg-void/50 p-5 md:p-8">
      {/* Tier 1 — access endpoints, out of scope */}
      <div className="rounded-xl border border-text-dim/25 bg-bg-surface/40 p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-text-primary">
            <Laptop className="h-5 w-5 text-text-secondary" />
            <span className="font-medium">Access endpoints — full-service laptops</span>
          </div>
          <span className="rounded-full border border-text-dim/30 bg-bg-void/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-text-dim">
            Out of scope
          </span>
        </div>
        <p className="text-sm leading-relaxed text-text-secondary">
          Zero-trust baseline · SentinelOne (EDR) · Rippling (MDM). Used only to
          remote into the enclave — never to hold CUI.
        </p>
      </div>

      <FlowConnector label="KVM only — remote display" />

      {/* Tier 2 — the assessment boundary */}
      <div className="relative rounded-2xl border-2 border-dashed border-brand-accent/60 bg-brand-accent/[0.04] p-5 md:p-6">
        <span className="absolute -top-3 left-5 rounded-full border border-brand-accent/50 bg-bg-void px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-accent-bright">
          CMMC L2 assessment boundary · CUI scope
        </span>

        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-brand-accent/30 bg-bg-void/70 p-4">
            <div className="mb-2 flex items-center gap-2 text-brand-accent-bright">
              <Lock className="h-5 w-5" />
              <span className="text-sm font-medium text-text-primary">
                Azure Virtual Desktop enclave
              </span>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              The only place CUI / ITAR technical data lives. Hardened, isolated,
              and locked to keyboard / video / mouse.
            </p>
          </div>
          <div className="rounded-xl border border-brand-accent/30 bg-bg-void/70 p-4">
            <div className="mb-2 flex items-center gap-2 text-brand-accent-bright">
              <Cloud className="h-5 w-5" />
              <span className="text-sm font-medium text-text-primary">
                Microsoft 365 GCC High
              </span>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              Sovereign government cloud hardened to CMMC / NIST 800-171, with
              separate multifactor authentication for enclave access.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-md border border-brand-accent/20 bg-brand-accent/5 px-2.5 py-1 text-xs text-text-secondary">
            <Fingerprint className="h-3.5 w-3.5 text-brand-accent-bright" />
            Separate enclave MFA
          </span>
          {enclaveLocks.map((lock) => (
            <span
              key={lock.label}
              className="flex items-center gap-1.5 rounded-md border border-red-400/25 bg-red-400/5 px-2.5 py-1 text-xs text-text-dim line-through decoration-red-400/50"
            >
              <lock.icon className="h-3.5 w-3.5 text-red-300/80" />
              {lock.label}
            </span>
          ))}
        </div>
      </div>

      {/* Tier 3 — ITECS plane, deliberately outside the boundary */}
      <div className="mt-5 flex flex-col items-center">
        <div className="h-5 w-px bg-text-dim/30" aria-hidden="true" />
        <span className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim">
          outside the boundary
        </span>
        <div className="w-full rounded-xl border border-violet-300/30 bg-violet-400/[0.06] p-5">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-text-primary">
              <Compass className="h-5 w-5 text-violet-200" />
              <span className="font-medium">ITECS Security Protection plane</span>
            </div>
            <span className="rounded-full border border-violet-300/35 bg-violet-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-violet-200">
              Never touches CUI
            </span>
          </div>
          <p className="text-sm leading-relaxed text-text-secondary">
            Defense Navigator, configuration, and endpoint management operate
            <span className="text-text-primary"> separately from the CUI enclave</span>.
            ITECS never stores, processes, or transmits your CUI — so our support
            never creates a path into scope, and your assessment footprint stays
            as small as possible.
          </p>
        </div>
      </div>
    </div>
  );
}

function ControlsCoverage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const radius = 84;
  const circumference = 2 * Math.PI * radius;

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
            animate={isInView ? { strokeDashoffset: 0 } : {}}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-5xl font-semibold leading-none text-text-primary">
            110
          </span>
          <span className="mt-1.5 font-mono text-xs uppercase tracking-[0.18em] text-text-dim">
            Controls
          </span>
        </div>
      </div>
      <div>
        <p className="mb-5 text-sm leading-relaxed text-text-secondary md:text-base">
          Every one of the <span className="text-text-primary">110 NIST SP 800-171
          controls</span> across <span className="text-text-primary">14 families</span> is
          either fully implemented or covered by an accepted POA&amp;M — with evidence
          assembled in Secureframe for each applicable control.
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {controlFamilies.map(([code, name], i) => (
            <motion.div
              key={code}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.04 }}
              className="flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-bg-void/50 px-3 py-2"
            >
              <span className="font-mono text-xs font-semibold text-brand-accent-bright">
                {code}
              </span>
              <span className="truncate text-xs text-text-secondary">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MilestoneTimeline() {
  const totalWeeks = milestones.reduce((sum, m) => sum + m.weeks, 0);
  const tones = [
    "border-brand-accent/40 bg-brand-accent/10",
    "border-brand-accent/40 bg-brand-accent/15",
    "border-brand-accent/50 bg-brand-accent/20",
    "border-brand-accent/40 bg-brand-accent/10",
  ];

  return (
    <div>
      {/* Proportional 12-week track */}
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim">
        <span>Week 0 — kickoff</span>
        <span>~{totalWeeks} weeks to assessment-ready</span>
      </div>
      <div className="flex gap-1.5 overflow-hidden rounded-lg">
        {milestones.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            style={{ flexGrow: m.weeks, transformOrigin: "left" }}
            className={`flex h-12 items-center justify-center rounded-md border ${tones[i]}`}
          >
            <span className="font-mono text-xs font-semibold text-brand-accent-bright">
              {m.id}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Milestone cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {milestones.map((m, i) => (
          <FadeIn key={m.id} delay={i * 0.06}>
            <div className="h-full rounded-xl border border-[var(--border-subtle)] bg-bg-surface/35 p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-accent/10 font-mono text-sm font-semibold text-brand-accent-bright">
                    {m.id}
                  </span>
                  <span className="font-medium text-text-primary">{m.name}</span>
                </div>
                <span className="shrink-0 rounded-full border border-[var(--border-subtle)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-text-dim">
                  {m.weeks} wk
                </span>
              </div>
              <ul className="grid gap-2">
                {m.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
      <p className="mt-5 text-center text-xs leading-relaxed text-text-dim">
        Payments are tied to milestone completion, each closing with documented
        deliverables and a leadership checkpoint. Milestone durations are targets;
        the timeline assumes timely client inputs and sign-offs.
      </p>
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
      proposal: "Regulus Industries — CMMC Level 2 Readiness Project",
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
            ? "Regulus CMMC Proposal Approval"
            : "Regulus CMMC Proposal Decline",
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
          ? "Approval received. ITECS will follow up to confirm the milestone schedule and coordinate kickoff."
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
            {isApproval ? "Approve This Proposal" : "Request Changes"}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">
            {isApproval
              ? "Confirm the details below and ITECS will coordinate the CMMC kickoff."
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
          {isApproval ? "Approval Notes" : "Requested Changes"}
        </label>
        <textarea
          id={`${decision}-message`}
          name="message"
          rows={4}
          required={!isApproval}
          className="w-full rounded-lg border border-[var(--border-subtle)] bg-bg-void px-4 py-3 text-text-primary placeholder:text-text-dim/50 transition-colors focus:border-brand-accent focus:outline-none"
          placeholder={
            isApproval
              ? "Optional: preferred kickoff timing, leadership signer, or scheduling notes."
              : "Please share the requested scope changes, questions, or timing concerns."
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

export default function RegulusCmmcProposal() {
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
            <SectionLabel>Private Proposal · CMMC Level 2 Readiness</SectionLabel>
            <h1 className="text-4xl font-light leading-tight tracking-[-0.03em] text-text-primary md:text-6xl lg:text-7xl">
              CMMC Level 2 readiness for{" "}
              <span className="text-brand-accent-bright">Regulus Industries.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
              A focused, milestone-based project to take Regulus to{" "}
              <span className="text-text-primary">assessment-ready</span> status —
              implementing and operating your Secureframe environment so you can
              handle controlled technical data and contract with the U.S.
              government, with minimal demand on your team.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                ["~12 wk", "To assessment-ready"],
                ["110", "NIST 800-171 controls"],
                ["4", "Milestones, payment on delivery"],
              ].map(([value, label]) => (
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
                href="#approach"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-accent px-6 py-3 text-sm font-medium uppercase tracking-wide text-bg-void transition-colors hover:bg-brand-accent-bright"
              >
                Explore the Approach
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
                  <ShieldCheck className="h-6 w-6 text-brand-accent-bright" />
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">
                    Engagement summary
                  </div>
                  <div className="text-xs text-text-dim">
                    Implementation to assessment-ready
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
              <SectionLabel>Built on a Proven Foundation</SectionLabel>
              <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                You already own the right platform.
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-text-secondary">
              Regulus has established a strong foundation — a Secureframe-provisioned
              Microsoft 365 GCC High tenant, an Azure Virtual Desktop enclave for
              CUI, and Defense Navigator for documentation and continuous monitoring.
              ITECS takes the lead on implementing and operating it.
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
              One thing, done exceptionally well.
            </h2>
          </SlideIn>
          <SlideIn direction="right" delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed text-text-secondary md:text-lg">
              <p>
                Regulus is standing up a new defense-manufacturing operation that
                must achieve CMMC Level 2 certification to contract with the U.S.
                government and handle controlled technical data.
              </p>
              <p>
                This proposal covers a focused, milestone-based project to{" "}
                <span className="text-text-primary">
                  take the lead on implementing and operating your Secureframe
                  environment
                </span>{" "}
                and bring Regulus to CMMC Level 2 assessment-ready status —
                efficiently, transparently, and with minimal demand on your team.
              </p>
              <p>
                ITECS operates as your implementation and security-protection
                partner throughout. The formal certification assessment is
                performed by an independent C3PAO, to whom we will introduce you at
                the right time. Ongoing managed services are intentionally out of
                scope — they can be added later, on your timeline, once you have
                seen our work.
              </p>
            </div>
          </SlideIn>
        </div>
      </Section>

      {/* GOALS */}
      <Section className="border-y border-[var(--border-subtle)] bg-bg-surface/20">
        <FadeIn>
          <div className="mb-12 text-center">
            <SectionLabel>Our Understanding of Your Goals</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-5xl">
              We listened closely on the deep dive.
            </h2>
          </div>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, i) => (
            <FadeIn key={goal.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-void/40 p-6 transition-colors hover:border-brand-accent/30">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent/10">
                  <goal.icon className="h-5 w-5 text-brand-accent-bright" />
                </div>
                <h3 className="mb-2 text-lg font-light text-text-primary">
                  {goal.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {goal.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ASSESSMENT-READY DEFINITION */}
      <Section id="approach">
        <FadeIn>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel>What “Assessment-Ready” Means</SectionLabel>
              <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                Six precise, verifiable criteria.
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-text-secondary">
              To keep this engagement precise, ITECS defines assessment-ready as the
              point at which all six of the following are complete. Meeting them
              constitutes completion of the project.
            </p>
          </div>
        </FadeIn>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assessmentReady.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05}>
              <div className="flex h-full gap-4 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/30 p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 font-mono text-sm font-semibold text-brand-accent-bright">
                  {i + 1}
                </span>
                <div>
                  <h3 className="mb-1 font-medium text-text-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {item.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* CONTROLS COVERAGE */}
      <Section className="relative border-y border-[var(--border-subtle)] bg-bg-void">
        <GridBackground opacity={0.025} />
        <div className="relative z-10">
          <FadeIn>
            <div className="mb-12 text-center">
              <SectionLabel>Control Coverage</SectionLabel>
              <h2 className="text-3xl font-light text-text-primary md:text-5xl">
                All 110 controls, across all 14 families.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <ControlsCoverage />
          </FadeIn>
        </div>
      </Section>

      {/* COMPLIANCE BOUNDARY — centerpiece */}
      <Section>
        <FadeIn>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <SectionLabel>The Compliance Boundary</SectionLabel>
              <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                How ITECS works without entering your CUI scope.
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-text-secondary">
              Under the CMMC final rule, an external provider that does not handle
              CUI is not required to hold its own certification. We engineered this
              engagement so ITECS operates as a documented{" "}
              <span className="text-text-primary">Security Protection provider</span>{" "}
              — never storing, processing, or transmitting your CUI. That keeps your
              assessment scope, and your cost, as small as possible.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <CuiBoundaryDiagram />
        </FadeIn>

        {/* Responsibility matrix */}
        <FadeIn delay={0.15}>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-brand-accent/25 bg-brand-accent/5 p-6">
              <div className="mb-4 flex items-center gap-2 text-brand-accent-bright">
                <Boxes className="h-5 w-5" />
                <h3 className="font-medium text-text-primary">ITECS operates</h3>
              </div>
              <ul className="grid gap-2.5">
                {itecsOwns.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/30 p-6">
              <div className="mb-4 flex items-center gap-2 text-text-secondary">
                <Building2 className="h-5 w-5" />
                <h3 className="font-medium text-text-primary">Regulus owns</h3>
              </div>
              <ul className="grid gap-2.5">
                {regulusOwns.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-text-dim" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-center text-xs leading-relaxed text-text-dim">
            A Customer Responsibility Matrix and ITECS service description are
            authored for inclusion in your SSP, making this boundary clean and
            auditable.
          </p>
        </FadeIn>
      </Section>

      <div className="relative">
        <CircuitTrace variant="section-divider" />
      </div>

      {/* SCOPE OF WORK */}
      <Section>
        <FadeIn>
          <div className="mb-12 text-center">
            <SectionLabel>Scope of Work</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-5xl">
              A turnkey project, delivered end to end.
            </h2>
          </div>
        </FadeIn>
        <div className="grid gap-5 lg:grid-cols-2">
          {scopeItems.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/30 p-6 transition-colors hover:border-brand-accent/30">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent/10">
                    <item.icon className="h-5 w-5 text-brand-accent-bright" />
                  </div>
                  <h3 className="text-lg font-light text-text-primary">{item.title}</h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                  {item.text}
                </p>
                <ul className="grid gap-2 border-t border-[var(--border-subtle)] pt-4">
                  {item.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* VDI LOCKDOWN HIGHLIGHT */}
      <Section className="border-y border-[var(--border-subtle)] bg-bg-surface/20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <SlideIn direction="left">
            <SectionLabel>Data-Egress Lockdown</SectionLabel>
            <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-4xl">
              CUI cannot leave the enclave.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
              The Azure Virtual Desktop enclave is locked to keyboard, video, and
              mouse only. Every common path for data to escape is closed — and
              enclave access requires its own multifactor authentication, separate
              from everyday sign-in.
            </p>
          </SlideIn>
          <SlideIn direction="right" delay={0.1}>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-bg-void/50 p-6">
              <div className="mb-4 flex items-center gap-2 text-brand-accent-bright">
                <Lock className="h-5 w-5" />
                <span className="font-mono text-xs uppercase tracking-[0.14em]">
                  Keyboard / Video / Mouse only
                </span>
              </div>
              <div className="grid gap-3">
                {enclaveLocks.map((lock) => (
                  <div
                    key={lock.label}
                    className="flex items-center justify-between rounded-lg border border-red-400/20 bg-red-400/5 px-4 py-3"
                  >
                    <span className="flex items-center gap-2 text-sm text-text-secondary line-through decoration-red-400/50">
                      <lock.icon className="h-4 w-4 text-red-300/80" />
                      {lock.label}
                    </span>
                    <X className="h-4 w-4 text-red-300/80" />
                  </div>
                ))}
                <div className="flex items-center justify-between rounded-lg border border-brand-accent/25 bg-brand-accent/5 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm text-text-primary">
                    <Fingerprint className="h-4 w-4 text-brand-accent-bright" />
                    Separate enclave MFA
                  </span>
                  <Check className="h-4 w-4 text-brand-accent-bright" />
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </Section>

      {/* MILESTONES */}
      <Section className="relative">
        <GradientOrb color="cyan" size="md" position={{ top: "-120px", right: "-80px" }} />
        <div className="relative z-10">
          <FadeIn>
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <SectionLabel>Project Approach & Milestones</SectionLabel>
                <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                  Four milestones, payment on delivery.
                </h2>
              </div>
              <p className="flex items-center gap-3 text-lg leading-relaxed text-text-secondary">
                <GanttChartSquare className="h-8 w-8 shrink-0 text-brand-accent-bright" />
                Your dedicated Technical Account Manager, Jordan Emerle, is your
                single point of contact — delivering weekly updates and
                coordinating sign-offs.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <MilestoneTimeline />
          </FadeIn>
        </div>
      </Section>

      {/* ASSUMPTIONS + EXCLUSIONS */}
      <Section className="border-y border-[var(--border-subtle)] bg-bg-surface/20">
        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <SectionLabel>Assumptions & Dependencies</SectionLabel>
            <h3 className="mb-6 text-2xl font-light text-text-primary md:text-3xl">
              What keeps the plan on track.
            </h3>
            <CheckList items={assumptions} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <SectionLabel>Exclusions</SectionLabel>
            <h3 className="mb-6 text-2xl font-light text-text-primary md:text-3xl">
              Out of scope — available separately.
            </h3>
            <div className="grid gap-3">
              {exclusions.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-[var(--border-subtle)] bg-bg-void/40 p-3 text-sm leading-relaxed text-text-secondary"
                >
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-text-dim" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* GAPS & ADD-ONS */}
      <Section>
        <FadeIn>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel>Identified Gaps & Add-Ons</SectionLabel>
              <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
                Full transparency, no surprises.
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-text-secondary">
              ITECS surfaces every gap we find — with clear, non-biased
              recommendations you are free to fulfill through ITECS or in-house. We
              will confirm during M1 which are required for assessment versus
              genuinely optional.
            </p>
          </div>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-2">
          {addOns.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/30 p-6">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent/10">
                      <item.icon className="h-5 w-5 text-brand-accent-bright" />
                    </div>
                    <h3 className="text-lg font-light text-text-primary">{item.title}</h3>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] ${
                      item.tone === "req"
                        ? "border-amber-600/50 bg-amber-500/20 text-amber-700"
                        : "border-brand-accent/40 bg-brand-accent/10 text-brand-accent"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* OPTIONAL TRANSITION */}
      <Section className="border-y border-[var(--border-subtle)] bg-bg-surface/20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SlideIn direction="left">
            <SectionLabel>Optional — Support & Handoff</SectionLabel>
            <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-4xl">
              Built to hand you the controls.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
              Honoring your goal of running the environment independently, ITECS
              recommends a short, optional transition phase after
              assessment-readiness. CMMC certification carries an ongoing obligation
              to maintain controls and evidence — a brief supported transition
              protects your investment and reduces the risk of control drift.
            </p>
          </SlideIn>
          <SlideIn direction="right" delay={0.1}>
            <div className="grid gap-4">
              {[
                {
                  icon: ClipboardCheck,
                  title: "Handoff training",
                  text: "Hands-on training for your team on operating Secureframe and the enclave.",
                },
                {
                  icon: Activity,
                  title: "Hyper-care support block",
                  text: "A monthly allocation for a defined period as your team takes the controls.",
                },
                {
                  icon: Layers,
                  title: "Optional path to managed services",
                  text: "Ongoing managed IT and security as you scale toward your 100-person footprint.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-xl border border-[var(--border-subtle)] bg-bg-void/40 p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10">
                    <item.icon className="h-5 w-5 text-brand-accent-bright" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-text-primary">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SlideIn>
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
                A mature partner for a mission-critical build.
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
                  <h3 className="mb-2 text-lg font-light text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {item.text}
                  </p>
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
                  Project team
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
              We appreciate the opportunity to help Regulus reach CMMC Level 2.
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
                  <FileCheck2 className="h-5 w-5" />
                  <span className="text-sm font-medium text-text-primary">PDF copy</span>
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">
                  Download the formal proposal document for internal review and
                  records.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-brand-accent group-hover:text-brand-accent-bright">
                  Download PDF
                  <ArrowRight className="h-4 w-4" />
                </div>
              </a>
              <a
                href="#approval"
                className="group rounded-xl border border-[var(--border-subtle)] bg-bg-void/60 p-5 transition-colors hover:border-brand-accent/35"
              >
                <div className="mb-3 flex items-center gap-2 text-brand-accent-bright">
                  <Lock className="h-5 w-5" />
                  <span className="text-sm font-medium text-text-primary">Private page</span>
                </div>
                <p className="text-sm leading-relaxed text-text-secondary">
                  This page is private and excluded from search indexing. Respond
                  online and ITECS will follow up.
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
      <Section id="approval" className="relative bg-bg-surface/20">
        <GradientOrb color="cyan" size="md" position={{ top: "-160px", left: "10%" }} />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <FadeIn>
            <SectionLabel>Proposal Response</SectionLabel>
            <h2 className="text-3xl font-light text-text-primary md:text-5xl">
              Ready to move forward?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-text-secondary">
              Approving confirms the milestone-based scope and starts scheduling for
              the CMMC kickoff. If the proposal needs changes, use the request-changes
              option to send your notes.
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
