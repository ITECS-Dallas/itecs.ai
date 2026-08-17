"use client";

import { FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Cloud,
  Cpu,
  Database,
  FileCheck2,
  Fingerprint,
  Gauge,
  GraduationCap,
  HardDrive,
  HeartPulse,
  Laptop,
  Layers,
  LifeBuoy,
  Lock,
  Mail,
  MapPin,
  Network,
  Quote,
  Radar,
  RefreshCw,
  Scale,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";
import { StickyProposalDownloads } from "@/components/proposals/StickyProposalDownloads";

const proposalSlug = "purpose-capital-managed-it-e8e515";

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
 * Content
 * ------------------------------------------------------------------------- */

const metadataRows = [
  { label: "Prepared for", value: "Purpose Capital" },
  { label: "Prepared by", value: "ITECS Outsourcing, LLC" },
  { label: "Date", value: "July 13, 2026" },
  { label: "Valid through", value: "August 12, 2026" },
];

const heroStats = [
  { value: "9", label: "Managed endpoints" },
  { value: "7–10", label: "Extended coverage, daily" },
  { value: "24/7", label: "Managed threat response" },
  { value: "4", label: "Integrated practice areas" },
];

const environment = [
  {
    icon: Laptop,
    title: "Nine endpoints, mixed fleet",
    body: "Mac and Windows devices side by side — one managed standard, not two support models.",
  },
  {
    icon: Mail,
    title: "Microsoft 365 tenant",
    body: "Email, identity, and collaboration all live here. It is the control surface that matters most.",
  },
  {
    icon: Smartphone,
    title: "Mostly iPhone users",
    body: "Mobile access to firm data, ready for enrollment and policy where you want it.",
  },
  {
    icon: Sparkles,
    title: "Claude and ChatGPT in use",
    body: "AI is already in the workflow. The question is governance, not adoption.",
  },
  {
    icon: Cpu,
    title: "Microsoft Copilot under consideration",
    body: "Copilot inherits your permissions. It is a readiness decision before it is a licensing one.",
  },
  {
    icon: Database,
    title: "Snowflake footprint",
    body: "A possible foundation for governed data and AI work once the operating base is set.",
  },
];

const comparisonRows = [
  {
    area: "Coverage",
    elite: "7 AM–10 PM, seven days",
    pro: "7 AM–10 PM, seven days",
    impact: "Same support window",
  },
  {
    area: "Managed IT",
    elite: "Unlimited support, consulting, assigned team, QBR",
    pro: "Unlimited support, consulting, assigned team, QBR",
    impact: "Both provide full-service IT",
  },
  {
    area: "Threat operations",
    elite: "Sophos XDR plus Sophos MDR 24/7 expert-led monitoring",
    pro: "Sophos XDR included; MDR optional",
    impact: "Elite reduces separate security decisions",
  },
  {
    area: "Email and identity",
    elite: "Harmony email security, Duo MFA, training, phishing simulations",
    pro: "Purchased à la carte",
    impact: "Elite creates a more complete control baseline",
  },
  {
    area: "Data protection",
    elite: "Microsoft 365 and endpoint backup with unlimited storage; quarterly audits",
    pro: "Purchased à la carte; audits separately scoped",
    impact: "Elite supports repeatable continuity evidence",
  },
  {
    area: "Security governance",
    elite: "Dedicated TAM, semiannual network/security assessments, asset lifecycle management",
    pro: "TAM and tooling optional; assessments separately scoped",
    impact: "Elite provides stronger ownership and review cadence",
  },
  {
    area: "Special projects",
    elite: "Larger included allocation per special project",
    pro: "Smaller included allocation per special project",
    impact: "Elite absorbs more bounded project effort",
  },
  {
    area: "AI benefit",
    elite: "Two annual orientation sessions; preferred rates on eligible AI services",
    pro: "Preferred rates on eligible AI services",
    impact: "AI delivery remains separately scoped under both",
  },
];

/** How much of the control stack arrives bundled versus assembled by the client. */
const controlCoverage = [
  { domain: "Managed IT & support", elite: 100, pro: 100 },
  { domain: "Threat operations", elite: 100, pro: 45 },
  { domain: "Email & identity", elite: 100, pro: 15 },
  { domain: "Data protection", elite: 100, pro: 15 },
  { domain: "Security governance", elite: 100, pro: 10 },
];

const managedItDelivers = [
  {
    icon: Radar,
    title: "Proactive management",
    body: "Remote monitoring and automated patching fix issues before they interrupt work.",
  },
  {
    icon: Users,
    title: "People who answer",
    body: "An assigned technical team and unlimited support during coverage hours — never a stranger in a queue.",
  },
  {
    icon: ShieldCheck,
    title: "Security-first stack",
    body: "Next-generation antivirus (XDR) on every managed endpoint, with advanced layers by plan.",
  },
  {
    icon: Gauge,
    title: "Executive alignment",
    body: "Quarterly Business Reviews and a dedicated Technical Account Manager on MSP Elite.",
  },
  {
    icon: Boxes,
    title: "Procurement done right",
    body: "Hardware and software sourced through our distributor network and quoted transparently.",
  },
  {
    icon: RefreshCw,
    title: "Dynamic billing",
    body: "Your invoice follows the true endpoint count each month — grow or shrink freely within your term.",
  },
];

const defenseLayers = [
  {
    icon: Fingerprint,
    layer: "Identity",
    title: "Multi-factor authentication & least privilege",
    body: "Cisco Duo MFA and scoped access aligned to your applications — the control that stops most intrusions at the door.",
  },
  {
    icon: Mail,
    layer: "Email",
    title: "AI-powered email security",
    body: "Check Point Harmony defends against phishing, impersonation, and business-email compromise ahead of the inbox.",
  },
  {
    icon: Laptop,
    layer: "Endpoint",
    title: "XDR on every managed device",
    body: "Next-generation antivirus and detection across the Mac and Windows fleet, managed and patched continuously.",
  },
  {
    icon: Radar,
    layer: "Detection",
    title: "24/7 expert-led MDR",
    body: "Sophos MDR analysts hunt, triage, and respond around the clock — a staffed response, not an alert queue.",
  },
  {
    icon: Network,
    layer: "Network",
    title: "SIEM & critical-asset alerting",
    body: "Security-event correlation and monitoring on the assets that matter, with posture insight over time.",
  },
  {
    icon: GraduationCap,
    layer: "People",
    title: "Awareness training & phishing simulations",
    body: "Quarterly simulated campaigns with remediation training turn your team into the strongest layer.",
  },
  {
    icon: HardDrive,
    layer: "Data",
    title: "Backup with tested restore paths",
    body: "Microsoft 365 and endpoint backup with unlimited storage — recovery you can rehearse, not hope for.",
  },
  {
    icon: FileCheck2,
    layer: "Assurance",
    title: "Assessments & audits",
    body: "Semiannual network and cybersecurity assessments, plus quarterly backup and DR audits on Elite.",
  },
];

const hostingFlow = [
  {
    icon: Building2,
    title: "Where the workload lives today",
    body: "On-premises, in a closet, or with another provider — inventoried before anything moves.",
  },
  {
    icon: Workflow,
    title: "Rehearsed migration",
    body: "Planned, rehearsed, and executed with continuity. We move workloads without moving your business offline.",
  },
  {
    icon: Cloud,
    title: "ITECS Managed Private Cloud",
    body: "Dallas-based private cloud engineered for line-of-business applications — hardened builds, patching, and monitoring included.",
  },
  {
    icon: LifeBuoy,
    title: "Backup & tested disaster recovery",
    body: "Replication and rehearsed recovery paths, so an office outage never becomes a business outage.",
  },
];

const hostingCapabilities = [
  {
    icon: Server,
    title: "Application hosting",
    body: "ERP, accounting, terminal-server, and database workloads sized correctly and tuned for multi-user performance.",
  },
  {
    icon: Lock,
    title: "Secured by default",
    body: "Every managed VM ships with hardened builds, patch management, backup, and monitoring — not as add-ons.",
  },
  {
    icon: MapPin,
    title: "Dallas infrastructure, named engineers",
    body: "Your data sits on infrastructure we operate — not lost in a hyperscaler support queue.",
  },
];

const caseStudyStats = [
  { value: "100%", label: "Uptime maintained through a cross-country plant relocation" },
  { value: "0", label: "Data loss or downtime while servers were physically in transit" },
  { value: "Ongoing", label: "Applications and databases still hosted with ITECS today" },
];

const readinessMap = [
  {
    control: "Access control & identity",
    operates: "MFA enforcement, conditional access, least-privilege review",
    evidence: "Access policy configuration and periodic review records",
  },
  {
    control: "Threat detection & response",
    operates: "24/7 expert-led MDR with documented triage and escalation",
    evidence: "Incident timeline, response actions, and disposition history",
  },
  {
    control: "Data protection & continuity",
    operates: "Microsoft 365 and endpoint backup with tested restores",
    evidence: "Quarterly backup and disaster-recovery audit results",
  },
  {
    control: "Vulnerability & patch management",
    operates: "Automated patching with monitored compliance across the fleet",
    evidence: "Patch-status reporting per endpoint",
  },
  {
    control: "Security awareness",
    operates: "Quarterly phishing simulations with remediation training",
    evidence: "Campaign results and completion tracking by user",
  },
  {
    control: "Risk assessment cadence",
    operates: "Semiannual network and cybersecurity assessments",
    evidence: "Assessment reports with prioritized findings and closure status",
  },
  {
    control: "Asset management",
    operates: "Asset tagging and lifecycle tracking",
    evidence: "Current device inventory with ownership and status",
  },
  {
    control: "Governance ownership",
    operates: "Dedicated Technical Account Manager and QBR cadence",
    evidence: "Meeting records, roadmap, and decision history",
  },
];

const aiPath = [
  {
    step: "01",
    title: "Secure the Microsoft 365 foundation",
    body: "Review permissions, oversharing, sensitivity labeling, and conditional access. Copilot inherits whatever you have — so we fix it first.",
  },
  {
    step: "02",
    title: "Assess Copilot readiness",
    body: "Determine what Copilot would actually surface today, who should pilot it, and what must be remediated before broad enablement.",
  },
  {
    step: "03",
    title: "Prioritize governed use cases",
    body: "An AI governance baseline for approved tools, acceptable use, data handling, human review, and audit evidence across Copilot, Claude, and ChatGPT.",
  },
  {
    step: "04",
    title: "Pilot, measure, and expand",
    body: "Inventory Snowflake data and permissions, prove value on a bounded use case, then scale only what earns it.",
  },
];

const onboarding = [
  {
    step: "1",
    title: "Agreement & welcome",
    body: "You sign; AP/AR onboarding begins. Your Account Executive sends a welcome email covering exactly what happens next.",
  },
  {
    step: "2",
    title: "Kickoff call",
    body: "Your Technical Account Manager initiates our New Client SOP: credential gathering, tooling plan, and discovery scheduling.",
  },
  {
    step: "3",
    title: "Discovery & rollout",
    body: "Discovery of your environment; our stack deploys with QA checks. We coordinate directly with any existing IT to transfer services.",
  },
  {
    step: "4",
    title: "Consultation",
    body: "ITECS reviews your policies and environment, then presents findings and prioritized recommendations.",
  },
  {
    step: "5",
    title: "Strategic partnership",
    body: "Steady state: proactive management, QBR cadence, and a roadmap that evolves with the firm.",
  },
];

const whyItecs = [
  {
    icon: BadgeCheck,
    title: "A true partner",
    body: "Dedicated teams and transparency — you know your people by name, not a rotating helpdesk queue.",
  },
  {
    icon: Layers,
    title: "Full-service suite",
    body: "Managed IT, cybersecurity, cloud, and AI under one roof, with fractional CIO/CISO leadership on tap.",
  },
  {
    icon: Scale,
    title: "Regulated-environment experience",
    body: "CMMC, HIPAA, PCI DSS, and NIST framework work — including public-company environments.",
  },
  {
    icon: Sparkles,
    title: "AI-ready, not AI-slideware",
    body: "A governed AI practice with published pricing and production agents in the field today.",
  },
];

const commercialNotes = [
  {
    item: "Contract term",
    treatment: "MSP Pro and MSP Elite offer 1-, 3-, or 5-year terms; final term is TBD.",
  },
  {
    item: "Non-renewal notice",
    treatment: "60 days for MSP Pro and MSP Elite.",
  },
  {
    item: "Support targets",
    treatment: "Critical response within 1 hour; standard response within 4 hours.",
  },
  {
    item: "Endpoint quantity",
    treatment:
      "Exactly 9 for this proposal. The final service order confirms the device inventory.",
  },
  {
    item: "Not included in the base",
    treatment:
      "Mobile devices, future servers/VMs, managed network devices, selected Pro add-ons, third-party AI subscriptions, and separately scoped AI/data work.",
  },
  {
    item: "Onboarding",
    treatment: "No onboarding fee for clients enrolling in MSP Pro or MSP Elite.",
  },
  {
    item: "Regulatory boundary",
    treatment:
      "ITECS supports technology controls and evidence; Purpose Capital and its advisors retain responsibility for SEC/legal interpretation and compliance conclusions.",
  },
];

const nextSteps = [
  "Confirm whether Purpose Capital proceeds with MSP Elite Extended or uses MSP Pro Extended as the commercial baseline.",
  "Complete a short service-order inventory: nine managed endpoints, mobile devices, Microsoft 365 licensing, network devices, backup selections, and contract term.",
  "Schedule a proposal walkthrough with Nate and the appropriate compliance, technology, and budget stakeholders.",
  "If Copilot is a near-term priority, authorize a readiness-scoping discussion focused on permissions, data governance, pilot users, and Snowflake use cases.",
];

/* ----------------------------------------------------------------------------
 * WOW visuals
 * ------------------------------------------------------------------------- */

/**
 * 24-hour band showing the Extended Coverage window (7 AM–10 PM) against the
 * always-on MDR band beneath it.
 */
function CoverageTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const startHour = 7;
  const endHour = 22;
  const left = (startHour / 24) * 100;
  const width = ((endHour - startHour) / 24) * 100;

  const ticks = [0, 4, 8, 12, 16, 20, 24];

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[var(--border-subtle)] bg-bg-surface p-6 md:p-8"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-light text-text-primary">
          Your coverage day, and the watch that never stops
        </h3>
        <span className="rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-accent-bright">
          Extended selected
        </span>
      </div>

      {/* Support window */}
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-dim">
        Unlimited support · 7 AM – 10 PM, seven days
      </p>
      <div className="relative h-12 w-full overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-bg-void">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${width}%` } : {}}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ left: `${left}%` }}
          className="absolute top-0 flex h-full items-center justify-center bg-brand-accent/85"
        >
          <span className="whitespace-nowrap px-2 text-[11px] font-semibold uppercase tracking-wide text-bg-void">
            7 AM – 10 PM
          </span>
        </motion.div>
      </div>

      {/* MDR band */}
      <p className="mb-2 mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-text-dim">
        Sophos MDR · expert-led threat response · 24/7
      </p>
      <div className="relative h-12 w-full overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-bg-void">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{ duration: 1.3, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-0 flex h-full items-center justify-center border border-brand-accent-bright/40 bg-brand-accent-bright/20"
        >
          <span className="whitespace-nowrap px-2 text-[11px] font-semibold uppercase tracking-wide text-brand-accent-bright">
            Around the clock
          </span>
        </motion.div>
      </div>

      {/* Hour ticks */}
      <div className="mt-3 flex justify-between font-mono text-[10px] text-text-dim">
        {ticks.map((tick) => (
          <span key={tick}>{tick.toString().padStart(2, "0")}:00</span>
        ))}
      </div>

      <p className="mt-6 border-t border-[var(--border-subtle)] pt-4 text-sm leading-relaxed text-text-secondary">
        People answer during your working day. Threats are watched by analysts every
        hour of it — including the ones nobody is in the office for.
      </p>
    </div>
  );
}

/** Bundled-vs-assembled control coverage across Elite and Pro. */
function ControlCoverageChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[var(--border-subtle)] bg-bg-surface p-6 md:p-8"
    >
      <div className="mb-6">
        <h3 className="text-lg font-light text-text-primary">
          How much of the control stack arrives bundled
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          Both programs deliver full-service IT. The difference is how much security,
          backup, identity, and governance you have to assemble and govern yourself.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-5 font-mono text-[10px] uppercase tracking-[0.14em]">
        <span className="flex items-center gap-2 text-brand-accent-bright">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-accent" aria-hidden="true" />
          MSP Elite — bundled
        </span>
        <span className="flex items-center gap-2 text-text-dim">
          <span
            className="h-2.5 w-2.5 rounded-sm border border-text-dim/50 bg-text-dim/20"
            aria-hidden="true"
          />
          MSP Pro — before add-ons
        </span>
      </div>

      <div className="space-y-5">
        {controlCoverage.map((row, index) => (
          <div key={row.domain}>
            <p className="mb-2 text-sm text-text-primary">{row.domain}</p>

            <div className="space-y-1.5">
              <div className="h-3 w-full overflow-hidden rounded-full bg-bg-void">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${row.elite}%` } : {}}
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full rounded-full bg-brand-accent"
                />
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-bg-void">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${row.pro}%` } : {}}
                  transition={{
                    duration: 0.9,
                    delay: 0.25 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full rounded-full border border-text-dim/40 bg-text-dim/25"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 border-t border-[var(--border-subtle)] pt-4 font-mono text-[11px] leading-relaxed text-text-dim">
        Illustrative comparison of bundled coverage, not a scored benchmark. Under Pro,
        the remaining coverage is available à la carte — Purpose Capital selects,
        prices, and governs each item separately.
      </p>
    </div>
  );
}

/** Progressive defense-in-depth layer stack. */
function DefenseInDepth() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="space-y-3">
      {defenseLayers.map((layer, index) => {
        const Icon = layer.icon;

        return (
          <motion.div
            key={layer.layer}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.55,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative flex gap-4 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-bg-surface p-5 transition-colors hover:border-brand-accent/40"
          >
            <motion.span
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              style={{ originY: 0 }}
              className="absolute left-0 top-0 h-full w-[3px] bg-brand-accent"
              aria-hidden="true"
            />

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent-bright">
                Layer {String(index + 1).padStart(2, "0")} · {layer.layer}
              </span>
              <h4 className="mt-1 text-base font-medium text-text-primary">
                {layer.title}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                {layer.body}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/** Migration-to-managed-cloud flow. */
function HostingFlow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative">
      {/* connective spine */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
        className="absolute left-0 top-[38px] hidden h-[2px] w-full bg-gradient-to-r from-brand-accent via-brand-accent/50 to-transparent lg:block"
        aria-hidden="true"
      />

      <div className="grid gap-6 lg:grid-cols-4">
        {hostingFlow.map((node, index) => {
          const Icon = node.icon;

          return (
            <motion.div
              key={node.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.2 + index * 0.14,
                ease: "easeOut",
              }}
              className="relative"
            >
              <div className="relative z-10 mb-5 flex h-[76px] w-[76px] items-center justify-center rounded-2xl border border-brand-accent/30 bg-bg-void text-brand-accent shadow-[0_0_36px_var(--accent-cyan-subtle)]">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>

              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
                Step {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-1 text-base font-medium text-text-primary">
                {node.title}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                {node.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/** Animated four-step AI enablement path. */
function AiEnablementPath() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="grid gap-5 md:grid-cols-2">
      {aiPath.map((phase, index) => (
        <motion.div
          key={phase.step}
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-bg-surface p-6 transition-colors hover:border-brand-accent/40"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + index * 0.12 }}
            style={{ originX: 0 }}
            className="absolute left-0 top-0 h-[3px] w-full bg-brand-accent"
            aria-hidden="true"
          />

          <span className="font-mono text-3xl font-light text-brand-accent/30">
            {phase.step}
          </span>
          <h4 className="mt-2 text-lg font-medium text-text-primary">{phase.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {phase.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Response form
 * ------------------------------------------------------------------------- */

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
      proposal: "Purpose Capital — Managed IT, Security & AI Readiness",
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
            ? "Purpose Capital Proposal — Move Forward"
            : "Purpose Capital Proposal — Request Changes",
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
          ? "Thank you. ITECS will follow up to confirm the service-order inventory and schedule onboarding."
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
              ? "Confirm the details below and ITECS will coordinate the service-order inventory and onboarding kickoff."
              : "Share what needs to be adjusted so ITECS can respond appropriately."}
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
            placeholder="name@purposecapitalmgmt.com"
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
            placeholder="Best callback number"
          />
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor={`${decision}-message`}
          className="mb-1.5 block text-sm text-text-dim"
        >
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
              ? "Optional: preferred program, target start date, or who should attend the walkthrough."
              : "Please share the questions, scope changes, or timing concerns you'd like addressed."
          }
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${decision}-website`}>Website</label>
        <input
          id={`${decision}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
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
            ? "Send & Start Onboarding"
            : "Send Change Request"}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </motion.form>
  );
}

/* ----------------------------------------------------------------------------
 * Page
 * ------------------------------------------------------------------------- */

export default function PurposeCapitalProposal() {
  const [decision, setDecision] = useState<ProposalDecision | null>(null);

  return (
    <div className="min-h-screen overflow-hidden bg-bg-void pb-28 text-text-primary">
      <StickyProposalDownloads slug={proposalSlug} />

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden px-6 py-28 md:px-12 lg:px-24">
        <GradientOrb color="cyan" size="lg" position={{ top: "-240px", right: "-160px" }} />
        <GradientOrb color="brand" size="md" position={{ bottom: "-180px", left: "-120px" }} />
        <GridBackground opacity={0.03} />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <SlideIn direction="left">
            <SectionLabel>Private Proposal · Managed IT, Security & AI Readiness</SectionLabel>
            <h1 className="text-4xl font-light leading-tight tracking-[-0.03em] text-text-primary md:text-6xl lg:text-7xl">
              A managed foundation for{" "}
              <span className="text-brand-accent-bright">Purpose Capital.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
              Purpose Capital is preparing for SEC registration while running a lean,
              nine-endpoint Microsoft 365 environment — and already using AI. This
              proposal establishes the support, security, continuity, and governance
              base first, so Copilot and everything after it lands on solid ground.
            </p>

            <div className="mt-8 rounded-2xl border border-brand-accent/25 bg-brand-accent/5 p-5">
              <p className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
                <Target className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent-bright" aria-hidden="true" />
                <span>
                  <span className="font-medium text-text-primary">Recommendation:</span>{" "}
                  MSP Elite with Extended Coverage — the stronger fit for SEC-registration
                  readiness, Microsoft 365 security, business continuity, and governed AI
                  adoption. MSP Pro Extended is presented as a lower-base alternative.
                </span>
              </p>
            </div>

            <a
              href="#situation"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-brand-accent transition-colors hover:text-brand-accent-bright"
            >
              Review the proposal
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </SlideIn>

          <SlideIn direction="right" delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-bg-surface p-7 md:p-8">
              <CircuitTrace className="absolute inset-0 opacity-[0.06]" />

              <div className="relative z-10">
                <dl className="space-y-4">
                  {metadataRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-4 border-b border-[var(--border-subtle)] pb-3 last:border-b-0 last:pb-0"
                    >
                      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-dim">
                        {row.label}
                      </dt>
                      <dd className="text-right text-sm font-medium text-text-primary">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  {heroStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="rounded-xl border border-[var(--border-subtle)] bg-bg-void p-4"
                    >
                      <p className="font-mono text-2xl font-light text-brand-accent-bright">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-text-dim">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <p className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-dim">
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  Confidential — prepared for Purpose Capital
                </p>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* SITUATION */}
      <Section id="situation" className="border-t border-[var(--border-subtle)]">
        <FadeIn>
          <SectionLabel>Where Purpose Capital stands today</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
            A lean environment with{" "}
            <span className="text-brand-accent-bright">real obligations arriving.</span>
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
            Nine endpoints is a small footprint. SEC registration is not a small
            obligation. The gap between those two facts is exactly what a managed
            foundation closes — repeatable controls, documented evidence, and an
            accountable owner, without hiring an internal IT department to get there.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {environment.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeIn key={item.title} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface p-6 transition-colors hover:border-brand-accent/40">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-medium text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-10 rounded-2xl border border-[var(--border-subtle)] bg-bg-surface p-6 md:p-8">
            <p className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <AlertTriangle
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent-bright"
                aria-hidden="true"
              />
              <span>
                <span className="font-medium text-text-primary">
                  The sequencing matters.
                </span>{" "}
                Begin with a managed operating foundation rather than treating
                SEC-registration readiness, cybersecurity, Microsoft 365, and AI as four
                separate projects. Establish support, security, backup, identity, and
                account governance first — then assess Copilot, define responsible-AI
                policy, and decide whether Snowflake belongs in a governed workflow. This
                order avoids deploying AI before permissions, oversharing, data ownership,
                and support boundaries are understood.
              </span>
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* PILLAR 1 — MANAGED IT */}
      <Section className="border-t border-[var(--border-subtle)] bg-bg-surface/30">
        <FadeIn>
          <SectionLabel>Pillar 01 · Managed IT Services</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
            Your proactive IT department —{" "}
            <span className="text-brand-accent-bright">without the headcount.</span>
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
            ITECS monitors, patches, supports, procures, and plans while Purpose Capital
            runs the business. No hourly billing for support. No tier lock-in. Your
            invoice follows the actual number of endpoints we manage each month, so cost
            scales precisely with headcount.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <CoverageTimeline />
        </FadeIn>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {managedItDelivers.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeIn key={item.title} delay={index * 0.07}>
                <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-medium text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* PROGRAM COMPARISON */}
      <Section className="border-t border-[var(--border-subtle)]">
        <FadeIn>
          <SectionLabel>Program comparison</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
            Elite or Pro —{" "}
            <span className="text-brand-accent-bright">the same support, a different control stack.</span>
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
            Both programs deliver full-service managed IT on the same Extended Coverage
            window. The real decision is whether security, identity, backup, and
            governance arrive bundled and governed by ITECS — or get selected, priced,
            and managed by Purpose Capital as separate line items.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <ControlCoverageChart />
        </FadeIn>

        <FadeIn delay={0.15} className="mt-8">
          <div className="overflow-x-auto rounded-2xl border border-[var(--border-subtle)] bg-bg-surface">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="p-4 font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim">
                    Decision area
                  </th>
                  <th className="p-4 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-accent-bright">
                    MSP Elite Extended — recommended
                  </th>
                  <th className="p-4 font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim">
                    MSP Pro Extended
                  </th>
                  <th className="p-4 font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim">
                    Purpose Capital impact
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr
                    key={row.area}
                    className="border-b border-[var(--border-subtle)] last:border-b-0"
                  >
                    <td className="p-4 align-top text-sm font-medium text-text-primary">
                      {row.area}
                    </td>
                    <td className="bg-brand-accent/[0.04] p-4 align-top text-sm leading-relaxed text-text-secondary">
                      {row.elite}
                    </td>
                    <td className="p-4 align-top text-sm leading-relaxed text-text-secondary">
                      {row.pro}
                    </td>
                    <td className="p-4 align-top text-sm leading-relaxed text-text-dim">
                      {row.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-6 flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-bg-surface p-5 font-mono text-[11px] leading-relaxed text-text-dim">
            <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
            <span>
              Investment tables, per-endpoint rates, à la carte catalogs, and term
              discounts are itemized in the downloadable proposal PDF. This page presents
              the scope and the decision; the PDF carries the numbers.
            </span>
          </p>
        </FadeIn>
      </Section>

      {/* PILLAR 2 — CYBERSECURITY */}
      <Section className="relative overflow-hidden border-t border-[var(--border-subtle)] bg-bg-surface/30">
        <GradientOrb color="cyan" size="md" position={{ top: "-120px", right: "-140px" }} />

        <div className="relative z-10">
          <FadeIn>
            <SectionLabel>Pillar 02 · Cybersecurity</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
              Defense in depth —{" "}
              <span className="text-brand-accent-bright">monitored by experts, proven by audits.</span>
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
              For a firm preparing for SEC registration, reputation is the asset and
              evidence is the deliverable. ITECS layers protection across identity,
              email, endpoint, network, people, and data — then proves it works with
              recurring assessments and audits. Every layer below is bundled in MSP
              Elite.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <DefenseInDepth />

            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-brand-accent/25 bg-brand-accent/5 p-6 md:p-7 lg:sticky lg:top-8">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-accent-bright">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-light text-text-primary">
                  Eight layers, one accountable owner
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Under MSP Elite these are not eight vendors, eight invoices, and eight
                  people to chase. They are one program, one Technical Account Manager,
                  and one review cadence — which is what a registration examiner, an
                  investor, and your own board all actually want to see.
                </p>

                <ul className="mt-5 space-y-3 border-t border-brand-accent/20 pt-5">
                  {[
                    "Works with the infrastructure brands you already own",
                    "Genuine gaps flagged aggressively, not quietly",
                    "Compliance-framework experience: HIPAA, PCI DSS, NIST, CMMC",
                    "Public-company environments supported today",
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* SEC READINESS EVIDENCE MAP */}
      <Section className="border-t border-[var(--border-subtle)]">
        <FadeIn>
          <SectionLabel>Registration readiness</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
            Controls are the work.{" "}
            <span className="text-brand-accent-bright">Evidence is the proof.</span>
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
            Examiners and counsel rarely ask whether you have a tool. They ask what you
            operate, how often, and what record it produces. Each control below runs on a
            cadence under MSP Elite and generates artifacts your compliance advisors can
            use.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <div className="overflow-x-auto rounded-2xl border border-[var(--border-subtle)] bg-bg-surface">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="p-4 font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim">
                    Control area
                  </th>
                  <th className="p-4 font-mono text-[10px] uppercase tracking-[0.14em] text-text-dim">
                    What ITECS operates
                  </th>
                  <th className="p-4 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-accent-bright">
                    Evidence produced
                  </th>
                </tr>
              </thead>
              <tbody>
                {readinessMap.map((row) => (
                  <tr
                    key={row.control}
                    className="border-b border-[var(--border-subtle)] last:border-b-0"
                  >
                    <td className="p-4 align-top text-sm font-medium text-text-primary">
                      {row.control}
                    </td>
                    <td className="p-4 align-top text-sm leading-relaxed text-text-secondary">
                      {row.operates}
                    </td>
                    <td className="bg-brand-accent/[0.04] p-4 align-top text-sm leading-relaxed text-text-secondary">
                      {row.evidence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mt-6 flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-bg-surface p-5 text-sm leading-relaxed text-text-dim">
            <Scale className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
            <span>
              <span className="font-medium text-text-primary">Regulatory boundary.</span>{" "}
              ITECS provides technology operations, security controls, documentation, and
              evidence support. Purpose Capital and its legal and compliance advisors
              retain responsibility for interpreting SEC obligations and reaching
              compliance conclusions. We do not provide legal advice or regulatory
              certification.
            </span>
          </p>
        </FadeIn>
      </Section>

      {/* PILLAR 3 — MANAGED CLOUD HOSTING */}
      <Section className="relative overflow-hidden border-t border-[var(--border-subtle)] bg-bg-surface/30">
        <GridBackground opacity={0.03} />

        <div className="relative z-10">
          <FadeIn>
            <SectionLabel>Pillar 03 · Managed Cloud Hosting</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
              Dallas-based private cloud,{" "}
              <span className="text-brand-accent-bright">ready when you need it.</span>
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
              Purpose Capital does not need a server today — and this proposal does not
              sell you one. But if a future application, AI workload, Snowflake
              integration, or data-governance requirement changes that, the hosting
              practice is already part of the same partner, the same security discipline,
              and the same accountable team.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-14">
            <HostingFlow />
          </FadeIn>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {hostingCapabilities.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeIn key={item.title} delay={index * 0.1}>
                  <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-medium text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {item.body}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Case study proof */}
          <FadeIn delay={0.15} className="mt-10">
            <div className="rounded-2xl border border-brand-accent/25 bg-brand-accent/5 p-7 md:p-9">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent-bright">
                Proof · Cross-country relocation for a food manufacturer
              </span>
              <h3 className="mt-3 max-w-2xl text-xl font-light leading-snug text-text-primary md:text-2xl">
                We moved a manufacturer&apos;s entire operation from Los Angeles to a new
                Texas plant — servers duplicated into the ITECS Managed Private Cloud,
                production never stopped.
              </h3>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {caseStudyStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: index * 0.12 }}
                    className="border-l-2 border-brand-accent/40 pl-4"
                  >
                    <p className="font-mono text-3xl font-light text-brand-accent-bright md:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <p className="mt-8 flex items-center gap-2 border-t border-brand-accent/20 pt-5 text-sm text-text-dim">
                <HeartPulse className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                Business references available on request — including this client&apos;s
                leadership.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* AI ENABLEMENT */}
      <Section className="border-t border-[var(--border-subtle)]">
        <FadeIn>
          <SectionLabel>Copilot & AI enablement path</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
            You are already using AI.{" "}
            <span className="text-brand-accent-bright">Let&apos;s make it governed.</span>
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
            Claude and ChatGPT are in the workflow, Copilot is under consideration, and
            Snowflake is sitting there. The risk is not adoption — it is ungoverned
            adoption. Copilot in particular surfaces whatever a user already has
            permission to see, which turns a quiet oversharing problem into a loud one.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <AiEnablementPath />
        </FadeIn>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Activity,
              title: "Permission & oversharing review",
              body: "Microsoft 365 permissions, sensitivity labeling, and conditional access reviewed before Copilot is enabled broadly.",
            },
            {
              icon: ClipboardCheck,
              title: "AI governance baseline",
              body: "Approved tools, acceptable use, data handling, human review, ownership, and audit evidence across every platform in play.",
            },
            {
              icon: Database,
              title: "Snowflake & data readiness",
              body: "Inventory data and permissions, prioritize governed use cases, and scope guided builds only where warranted.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeIn key={item.title} delay={index * 0.1}>
                <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-medium text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-8 rounded-2xl border border-[var(--border-subtle)] bg-bg-surface p-6 md:p-7">
            <h3 className="text-base font-medium text-text-primary">
              What MSP Elite adds on the AI side
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: GraduationCap,
                  text: "Two complimentary AI orientation sessions per contract year for your team.",
                },
                {
                  icon: Sparkles,
                  text: "Preferred rates on eligible AI services and production-agent builds.",
                },
                {
                  icon: Workflow,
                  text: "Managed Intelligence onboarding credit available on annual terms.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <p
                    key={item.text}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary"
                  >
                    <Icon
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright"
                      aria-hidden="true"
                    />
                    {item.text}
                  </p>
                );
              })}
            </div>
            <p className="mt-5 border-t border-[var(--border-subtle)] pt-4 font-mono text-[11px] leading-relaxed text-text-dim">
              AI delivery sits outside MSP unlimited support and MSP project-hour
              allocations. Copilot deployment, AI governance, and Snowflake/data work are
              separately scoped in writing. Benefit values are itemized in the proposal
              PDF.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* ONBOARDING */}
      <Section className="border-t border-[var(--border-subtle)] bg-bg-surface/30">
        <FadeIn>
          <SectionLabel>Onboarding</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
            From signature to strategic partner —{" "}
            <span className="text-brand-accent-bright">typically inside 30 days.</span>
          </h2>
        </FadeIn>

        <div className="mt-12 space-y-4">
          {onboarding.map((phase, index) => (
            <FadeIn key={phase.step} delay={index * 0.08}>
              <div className="flex gap-5 rounded-2xl border border-[var(--border-subtle)] bg-bg-surface p-6 transition-colors hover:border-brand-accent/40">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-brand-accent/30 bg-brand-accent/10 font-mono text-sm text-brand-accent-bright">
                  {phase.step}
                </div>
                <div>
                  <h3 className="text-base font-medium text-text-primary">
                    {phase.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                    {phase.body}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-brand-accent-bright">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            No onboarding fee for clients enrolling in MSP Pro or MSP Elite.
          </p>
        </FadeIn>
      </Section>

      {/* WHY ITECS */}
      <Section className="border-t border-[var(--border-subtle)]">
        <FadeIn>
          <SectionLabel>Why ITECS</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
            One accountable partner —{" "}
            <span className="text-brand-accent-bright">for two decades and counting.</span>
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
            ITECS is a Dallas-headquartered technology partner serving businesses since
            2002. Managed IT, cybersecurity, cloud hosting, and artificial intelligence
            are delivered as one integrated practice — so Purpose Capital gets an entire
            technology department from a single accountable partner.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {whyItecs.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeIn key={item.title} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-medium text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-10 rounded-2xl border border-[var(--border-subtle)] bg-bg-surface p-7 md:p-9">
            <Quote className="h-7 w-7 text-brand-accent/40" aria-hidden="true" />
            <p className="mt-4 text-lg font-light leading-relaxed text-text-primary md:text-xl">
              &ldquo;A client of ITECS for over 3 years now. Quick response times, always
              willing to tailor their service to our specific needs — would highly
              recommend.&rdquo;
            </p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-text-dim">
              Brendan Orient · Managing Director of Acquisitions, Phoenix Capital
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* COMMERCIAL NOTES */}
      <Section className="border-t border-[var(--border-subtle)] bg-bg-surface/30">
        <FadeIn>
          <SectionLabel>Commercial & service notes</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
            The terms,{" "}
            <span className="text-brand-accent-bright">stated plainly.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-bg-surface">
            {commercialNotes.map((note) => (
              <div
                key={note.item}
                className="grid gap-2 border-b border-[var(--border-subtle)] p-5 last:border-b-0 md:grid-cols-[220px_1fr] md:gap-6 md:p-6"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-accent-bright">
                  {note.item}
                </p>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {note.treatment}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mt-6 flex items-start gap-3 rounded-xl border border-brand-accent/25 bg-brand-accent/5 p-5 text-sm leading-relaxed text-text-secondary">
            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright" aria-hidden="true" />
            <span>
              Full investment detail — program rates, monthly minimums, à la carte
              catalogs, term discounts, and assumptions — is itemized in the proposal PDF.
              Use the <span className="font-medium text-text-primary">Download Proposal</span>{" "}
              button for the complete commercial document, and{" "}
              <span className="font-medium text-text-primary">Download Service Overview</span>{" "}
              for the full ITECS capabilities deck.
            </span>
          </p>
        </FadeIn>
      </Section>

      {/* NEXT STEPS + DECISION */}
      <Section className="relative overflow-hidden border-t border-[var(--border-subtle)]">
        <GradientOrb color="brand" size="lg" position={{ bottom: "-260px", left: "-180px" }} />

        <div className="relative z-10">
          <FadeIn>
            <SectionLabel>Next steps</SectionLabel>
            <h2 className="max-w-3xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
              Ready when{" "}
              <span className="text-brand-accent-bright">you are.</span>
            </h2>
          </FadeIn>

          <div className="mt-10 space-y-3">
            {nextSteps.map((step, index) => (
              <FadeIn key={step} delay={index * 0.08}>
                <div className="flex items-start gap-3.5 rounded-xl border border-[var(--border-subtle)] bg-bg-surface p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-accent/10 font-mono text-[11px] text-brand-accent-bright">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-text-secondary">{step}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="mt-12 rounded-3xl border border-[var(--border-subtle)] bg-bg-surface p-7 text-center md:p-10">
              <h3 className="text-2xl font-light text-text-primary md:text-3xl">
                How would you like to proceed?
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-text-secondary md:text-base">
                Approve the direction and ITECS will confirm the service-order inventory
                and schedule onboarding — or tell us what needs to change and we will
                revise.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setDecision(decision === "approve" ? null : "approve")}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-medium uppercase tracking-wide transition-colors ${
                    decision === "approve"
                      ? "bg-brand-accent-bright text-bg-void"
                      : "bg-brand-accent text-bg-void hover:bg-brand-accent-bright"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Move Forward
                </button>
                <button
                  type="button"
                  onClick={() => setDecision(decision === "decline" ? null : "decline")}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3.5 text-sm font-medium uppercase tracking-wide transition-colors ${
                    decision === "decline"
                      ? "border-red-400/60 bg-red-400/10 text-red-200"
                      : "border-[var(--border-subtle)] text-text-secondary hover:border-red-400/40 hover:text-red-200"
                  }`}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  Request Changes
                </button>
              </div>

              <AnimatePresence mode="wait">
                {decision ? <ProposalDecisionForm decision={decision} /> : null}
              </AnimatePresence>

              <p className="mt-8 border-t border-[var(--border-subtle)] pt-6 text-sm text-text-dim">
                Questions? Contact Brian Desmot ·{" "}
                <a
                  href="mailto:bdesmot@itecsonline.com"
                  className="text-brand-accent transition-colors hover:text-brand-accent-bright"
                >
                  bdesmot@itecsonline.com
                </a>{" "}
                ·{" "}
                <a
                  href="tel:+12144447884"
                  className="text-brand-accent transition-colors hover:text-brand-accent-bright"
                >
                  (214) 444-7884
                </a>
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border-subtle)] px-6 py-10 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-dim">
            ITECS Outsourcing, LLC · Dallas, TX · itecsonline.com
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-dim">
            Confidential — prepared for Purpose Capital · Valid through August 12, 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
