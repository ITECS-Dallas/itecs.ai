"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  FileCheck2,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  UserCheck,
  Workflow,
} from "lucide-react";
import styles from "./intelligence-os.module.css";
import type {
  IncidentController,
  IncidentPhase,
  IncidentTraceItem,
} from "./types";

interface SOCAppProps {
  incident: IncidentController;
  onRun: () => void;
  compact?: boolean;
}

interface DecisionCopy {
  signal: string;
  action: string;
  value: string;
}

const RESPONSE_STAGES = [
  { phase: "detect", label: "Detect" },
  { phase: "correlate", label: "Correlate" },
  { phase: "review", label: "Review" },
  { phase: "contain", label: "Contain" },
  { phase: "verify", label: "Verify" },
  { phase: "brief", label: "Brief" },
] as const;

const PHASE_INDEX: Record<IncidentPhase, number> = {
  ready: -1,
  detect: 0,
  correlate: 1,
  review: 2,
  contain: 3,
  verify: 4,
  brief: 5,
  resolved: 5,
};

const DECISION_COPY: Record<IncidentPhase, DecisionCopy> = {
  ready: {
    signal: "An approved AI workflow has a known identity, data boundary, and response owner.",
    action: "Stage the policy checks, evidence capture, and human authorization path before an alert arrives.",
    value: "The response begins with accountable decisions instead of improvised escalation.",
  },
  detect: {
    signal: "A risky sign-in and out-of-policy export request touch the same finance workflow.",
    action: "Correlate identity, workflow, permission, and protected-data context.",
    value: "Disconnected alerts become one understandable business-risk picture.",
  },
  correlate: {
    signal: "Two synthetic signals point to one identity and one approved workflow path.",
    action: "Test shared scope and identify the smallest safe containment boundary.",
    value: "The analyst sees intent and potential impact before taking action.",
  },
  review: {
    signal: "A targeted plan can revoke the session and pause only the affected workflow.",
    action: "Present the recommendation, evidence, and expected impact for human authorization.",
    value: "Automation accelerates the decision; an accountable person controls the consequence.",
  },
  contain: {
    signal: "The authorized action is limited to the risky session and workflow path.",
    action: "Revoke the synthetic session, pause the affected workflow, and preserve its evidence trail.",
    value: "Risk is reduced without shutting down unrelated business operations.",
  },
  verify: {
    signal: "Post-containment evidence shows no second identity, token, or workflow path.",
    action: "Check persistence, token reuse, related identities, and workflow integrity.",
    value: "Recovery is based on verified scope, not an assumption that the alert is over.",
  },
  brief: {
    signal: "The response now has a complete timeline, decision rationale, evidence set, and owners.",
    action: "Package the record, recovery steps, and follow-up controls for review.",
    value: "Leadership can see what happened, what changed, and what must happen next.",
  },
  resolved: {
    signal: "The risky path is contained and the synthetic evidence set has been reviewed.",
    action: "Return an executive-ready outcome with the decision trail and follow-up ownership.",
    value: "Control is retained: unaffected work stays available and every consequential action is accountable.",
  },
};

const severityClasses: Record<IncidentTraceItem["severity"], string> = {
  INFO: "border-[#5ba8d8]/45 bg-[#5ba8d8]/10 text-[#c8e4f5]",
  MEDIUM: "border-amber-300/45 bg-amber-300/10 text-amber-100",
  HIGH: "border-orange-300/45 bg-orange-300/10 text-orange-100",
  CRITICAL: "border-red-300/50 bg-red-300/10 text-red-100",
  RESOLVED: "border-emerald-300/45 bg-emerald-300/10 text-emerald-100",
};

function cx(...values: Array<string | false | undefined>): string {
  return values.filter(Boolean).join(" ");
}

function controlValues(phase: IncidentPhase, awaitingApproval: boolean) {
  const authorized = ["contain", "verify", "brief", "resolved"].includes(phase);
  const evidenceReady = phase === "brief" || phase === "resolved";

  return [
    {
      label: "Risky path",
      value:
        phase === "ready"
          ? "Boundary armed"
          : authorized
            ? "Paused in scenario"
            : phase === "review"
              ? "Decision ready"
              : "Under review",
      tone: phase === "detect" || phase === "correlate" ? "risk" : authorized ? "safe" : "neutral",
    },
    {
      label: "Other operations",
      value: phase === "ready" ? "Baseline available" : "Available in scenario",
      tone: "safe",
    },
    {
      label: "Human review",
      value:
        awaitingApproval
          ? "Authorization required"
          : phase === "ready"
          ? "Owner assigned"
          : authorized
            ? "Authorized in scenario"
            : phase === "review"
              ? "Authorization gate"
              : "Triage underway",
      tone: phase === "review" ? "review" : authorized ? "safe" : "neutral",
    },
    {
      label: "Evidence & owners",
      value: evidenceReady ? "Review packet ready" : phase === "ready" ? "Capture armed" : "Context preserved",
      tone: evidenceReady ? "safe" : "neutral",
    },
  ] as const;
}

export function SOCApp({ incident, onRun, compact = false }: SOCAppProps) {
  const activeIndex = PHASE_INDEX[incident.phase];
  const currentStage =
    incident.phase === "ready"
      ? "Response loop ready"
      : incident.phase === "resolved"
        ? "6 of 6 · Outcome ready"
        : activeIndex + 1 + " of 6 · " + RESPONSE_STAGES[activeIndex].label;
  const decision = DECISION_COPY[incident.phase];
  const latestTrace = incident.trace[0];
  const controls = controlValues(incident.phase, incident.awaitingApproval);
  const controlStateLabel = incident.awaitingApproval
    ? "Approval required"
    : incident.paused
      ? "Paused"
      : incident.controlState;

  const handlePrimaryAction = () => {
    if (incident.awaitingApproval) {
      incident.approve();
    } else if (incident.paused) {
      incident.resume();
    } else if (incident.running) {
      incident.pause();
    } else {
      onRun();
    }
  };

  return (
    <div
      className={cx(
        styles.socRoot,
        styles.scrollArea,
        "h-full min-h-0 overflow-y-auto pr-1",
        compact && styles.socCompact,
      )}
    >
      <header className={cx(styles.socHeader, "border-b border-[#7fb4d8]/25 pb-3")}>
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a9d5f1]">
            <span className="h-2 w-2 rotate-45 bg-[#3288b6]" aria-hidden="true" />
            Guided demo · synthetic scenario
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-300">
            No client data or live systems are connected.
          </p>
        </div>
        <div className={styles.socHeaderActions}>
          {(incident.running || incident.completed) && (
            <button
              type="button"
              onClick={incident.reset}
              className={cx(
                styles.chamferSmall,
                "inline-flex min-h-11 items-center gap-2 border border-[#7fb4d8]/35 px-3 font-mono text-[10px] font-semibold uppercase tracking-wide text-slate-200 hover:border-[#7fb4d8]/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5ba8d8]",
              )}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={handlePrimaryAction}
            className={cx(
              styles.chamferSmall,
              "inline-flex min-h-11 items-center justify-center gap-2 px-4 font-mono text-[10px] font-semibold uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fb4d8]",
              incident.awaitingApproval
                ? "bg-amber-400 text-[#04111e] hover:bg-amber-300"
                : "bg-[#27759e] text-white hover:bg-[#246b91]",
            )}
          >
            {incident.awaitingApproval ? (
              <UserCheck className="h-4 w-4" aria-hidden="true" />
            ) : incident.running && !incident.paused ? (
              <Pause className="h-4 w-4" aria-hidden="true" />
            ) : incident.completed ? (
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4" aria-hidden="true" />
            )}
            {incident.awaitingApproval
              ? "Authorize containment"
              : incident.paused
                ? "Resume response"
                : incident.running
                  ? "Pause response"
              : incident.completed
                ? "Replay response"
                : "Run response"}
          </button>
        </div>
      </header>

      <section
        className={cx(
          styles.socScenario,
          styles.chamferSmall,
          "mt-3 border border-[#7fb4d8]/25 bg-[#061728]/90 p-3",
        )}
        aria-labelledby="soc-scenario-title"
      >
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(190px,.65fr)] sm:items-end">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7fb4d8]">
              Managed response loop
            </p>
            <h3 id="soc-scenario-title" className="mt-1.5 max-w-2xl font-display text-base font-semibold leading-snug text-white">
              See how ITECS turns a security signal into an accountable business decision.
            </h3>
          </div>
          <div className="border-l-2 border-[#3288b6] pl-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#a9d5f1]">
              Scenario objective
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-300">
              Stop the risky path, preserve evidence, and keep unaffected work running.
            </p>
          </div>
        </div>
        {!compact && (
          <div className="mt-3 flex items-start gap-2 border-t border-[#7fb4d8]/15 pt-3 text-xs leading-5 text-slate-300">
            <Workflow className="mt-0.5 h-4 w-4 shrink-0 text-[#7fb4d8]" aria-hidden="true" />
            <p>
              <span className="font-semibold text-slate-100">Synthetic scenario:</span>{" "}
              a risky Microsoft 365 sign-in requests a bulk finance export through an approved AI workflow.
            </p>
          </div>
        )}
      </section>

      <section className="mt-3" aria-labelledby="response-lifecycle-title">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 id="response-lifecycle-title" className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-200">
            Managed response lifecycle
          </h3>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-[#a9d5f1]">
            {currentStage}
          </span>
        </div>
        <div
          className="h-1.5 overflow-hidden bg-[#102d43]"
          role="progressbar"
          aria-label="Managed response progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={incident.progress}
          aria-valuetext={currentStage}
        >
          <div
            className={cx(
              incident.running &&
                !incident.paused &&
                !incident.awaitingApproval &&
                styles.progressSheen,
              "h-full bg-[#3288b6] transition-[width] duration-300",
            )}
            style={{ width: incident.progress + "%" }}
          />
        </div>
        <ol className={styles.socStageRail}>
          {RESPONSE_STAGES.map((stage, index) => {
            const active = incident.phase !== "ready" && index === activeIndex;
            const complete = incident.phase === "resolved" || index < activeIndex;
            return (
              <li
                key={stage.phase}
                className={cx(
                  styles.socStage,
                  active && styles.socStageActive,
                  complete && styles.socStageComplete,
                )}
                aria-current={active ? "step" : undefined}
              >
                <span className={styles.socStageMarker} aria-hidden="true">
                  {complete ? <Check className="h-3 w-3" /> : <span>{index + 1}</span>}
                </span>
                <span>{stage.label}</span>
              </li>
            );
          })}
        </ol>
      </section>

      <div className={styles.socWorkspace}>
        <section
          className={cx(
            styles.chamferSmall,
            "flex min-w-0 flex-col border border-[#7fb4d8]/25 bg-[#061728]/90 p-3",
          )}
          aria-labelledby="current-decision-title"
        >
          <div className="flex items-start justify-between gap-3 border-b border-[#7fb4d8]/15 pb-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7fb4d8]">
                Current decision
              </p>
              <h3
                id="current-decision-title"
                className="mt-1.5 text-sm font-semibold leading-5 text-white"
                aria-live="polite"
                aria-atomic="true"
              >
                {incident.status}
              </h3>
            </div>
            <span
              className={cx(
                styles.chamferSmall,
                "shrink-0 border px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide",
                incident.controlState === "verified"
                  ? "border-emerald-300/45 bg-emerald-300/10 text-emerald-100"
                  : incident.controlState === "exposed"
                    ? "border-red-300/50 bg-red-300/10 text-red-100"
                    : incident.controlState === "held"
                      ? "border-amber-300/45 bg-amber-300/10 text-amber-100"
                      : "border-[#7fb4d8]/35 bg-[#7fb4d8]/10 text-[#c8e4f5]",
              )}
            >
              {controlStateLabel}
            </span>
          </div>

          <dl className="mt-1 divide-y divide-[#7fb4d8]/12">
            <div className={styles.socDecisionRow}>
              <dt className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-red-200">
                <span className="h-2 w-2 rotate-45 bg-red-300" aria-hidden="true" />
                Signal
              </dt>
              <dd className="text-xs leading-5 text-slate-200">{decision.signal}</dd>
            </div>
            <div className={styles.socDecisionRow}>
              <dt className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a9d5f1]">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                ITECS action
              </dt>
              <dd className="text-xs leading-5 text-slate-200">{decision.action}</dd>
            </div>
            <div className={styles.socDecisionRow}>
              <dt className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-200">
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                Business value
              </dt>
              <dd className="text-xs leading-5 text-slate-100">{decision.value}</dd>
            </div>
          </dl>

          <div className="mt-auto border-t border-[#7fb4d8]/15 pt-3">
            <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300">
              Who acts
            </p>
            <div className={styles.socResponsibility}>
              <span><Bot className="h-3.5 w-3.5" aria-hidden="true" /> AI-assisted triage</span>
              <ArrowRight className={styles.socResponsibilityArrow} aria-hidden="true" />
              <span><UserCheck className="h-3.5 w-3.5" aria-hidden="true" /> ITECS analyst</span>
              <ArrowRight className={styles.socResponsibilityArrow} aria-hidden="true" />
              <span><FileCheck2 className="h-3.5 w-3.5" aria-hidden="true" /> Client policy</span>
            </div>
          </div>
        </section>

        <aside
          className={cx(
            styles.chamferSmall,
            "min-w-0 border border-[#7fb4d8]/25 bg-[#061728]/90 p-3",
          )}
          aria-labelledby="control-board-title"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#7fb4d8]/15 pb-2">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7fb4d8]">
                Business control board
              </p>
              <h3 id="control-board-title" className="mt-1 text-xs font-semibold text-white">
                What remains under control
              </h3>
            </div>
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#7fb4d8]" aria-hidden="true" />
          </div>

          <dl className="divide-y divide-[#7fb4d8]/12">
            {controls.map((control) => (
              <div key={control.label} className={styles.socControlRow}>
                <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                  {control.label}
                </dt>
                <dd
                  className={cx(
                    "flex items-center gap-2 text-right text-xs font-semibold",
                    control.tone === "risk"
                      ? "text-red-100"
                      : control.tone === "review"
                        ? "text-amber-100"
                        : control.tone === "safe"
                          ? "text-emerald-100"
                          : "text-slate-200",
                  )}
                >
                  <span
                    className={cx(
                      "h-2 w-2 shrink-0 rotate-45",
                      control.tone === "risk"
                        ? "bg-red-300"
                        : control.tone === "review"
                          ? "bg-amber-300"
                          : control.tone === "safe"
                            ? "bg-emerald-300"
                            : "bg-[#7fb4d8]",
                    )}
                    aria-hidden="true"
                  />
                  {control.value}
                </dd>
              </div>
            ))}
          </dl>

          {latestTrace && (
            <div className="mt-3 border-t border-[#7fb4d8]/15 pt-3">
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300">
                  Decision trace
                </p>
                <span className={cx(
                  styles.chamferSmall,
                  "border px-2 py-1 font-mono text-[9px] font-semibold",
                  severityClasses[latestTrace.severity],
                )}>
                  {latestTrace.time}
                </span>
              </div>
              <p className="mt-2 text-xs font-semibold text-white">{latestTrace.title}</p>
              {!compact && (
                <p className="mt-1 text-xs leading-5 text-slate-300">{latestTrace.detail}</p>
              )}
            </div>
          )}
        </aside>
      </div>

      {incident.phase === "resolved" && (
        <section
          className={cx(
            styles.socOutcome,
            styles.chamferSmall,
            "mt-3 border border-emerald-300/35 bg-emerald-300/[0.07] p-3",
          )}
          aria-labelledby="response-outcome-title"
        >
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-200">
                Executive-ready outcome
              </p>
              <h3 id="response-outcome-title" className="mt-1 text-base font-semibold text-white">
                Response complete — control retained.
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-200">
                Risky access is contained in this synthetic scenario. Unaffected operations remain available,
                evidence is preserved, and follow-up owners are assigned.
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2" aria-label="Synthetic evidence packet contents">
                {[
                  "Alert context",
                  "Decision rationale",
                  "Action record",
                  "Verification checks",
                  "Owners and next controls",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-emerald-100">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/contact"
              className={cx(
                styles.chamferSmall,
                "inline-flex min-h-11 items-center justify-center gap-2 bg-emerald-500 px-4 text-xs font-semibold text-[#04111e] hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200",
              )}
            >
              Scope this operating model
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
