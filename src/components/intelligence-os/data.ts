import type { ComponentType, SVGProps } from "react";
import {
  Activity,
  FolderOpen,
  ShieldCheck,
  SlidersHorizontal,
  SquareTerminal,
} from "lucide-react";
import {
  getAIPricingOffering,
  MANAGED_AI_AGENT_OPERATIONS,
} from "@/lib/constants";
import type {
  ConfiguratorRecommendation,
  ConfiguratorSelection,
  IncidentStep,
  IntelligenceAppId,
} from "./types";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const OS_APPS: Array<{
  id: IntelligenceAppId;
  label: string;
  shortLabel: string;
  description: string;
  icon: IconComponent;
}> = [
  {
    id: "soc",
    label: "SOC Response Command",
    shortLabel: "SOC",
    description: "Managed detection, decision, containment, and proof",
    icon: ShieldCheck,
  },
  {
    id: "terminal",
    label: "ITECS AI Terminal",
    shortLabel: "AI",
    description: "Live, scope-locked ITECS service advisor",
    icon: SquareTerminal,
  },
  {
    id: "configurator",
    label: "Solution Configurator",
    shortLabel: "Scope",
    description: "Deterministic engagement scoping",
    icon: SlidersHorizontal,
  },
  {
    id: "vault",
    label: "Proof Vault",
    shortLabel: "Proof",
    description: "Published ITECS evidence and case studies",
    icon: FolderOpen,
  },
];

export const STATUS_ICON = Activity;

export const INCIDENT_DURATION_MS = 17_000;
export const INCIDENT_REVIEW_GATE_MS = 7_000;
export const INCIDENT_CONTAINMENT_MS = 9_500;

export const INCIDENT_STEPS: IncidentStep[] = [
  {
    atMs: 0,
    phase: "ready",
    status: "Response loop ready. Start the synthetic scenario to see each accountable decision.",
    controlState: "ready",
    progress: 0,
    trace: {
      id: "baseline",
      atMs: 0,
      time: "READY",
      severity: "INFO",
      title: "Policy baseline loaded",
      detail: "Finance-workflow boundaries, approval gates, and review owners are staged for this synthetic scenario.",
    },
    terminal: {
      id: "terminal-baseline",
      atMs: 0,
      label: "SIMULATION",
      text: "Managed-response rehearsal initialized. All telemetry below is scripted demo data.",
      tone: "neutral",
    },
  },
  {
    atMs: 2_000,
    phase: "detect",
    status: "Risky sign-in and out-of-policy finance export request detected.",
    controlState: "exposed",
    progress: 14,
    trace: {
      id: "detect",
      atMs: 2_000,
      time: "SIGNAL",
      severity: "HIGH",
      title: "Signals cross a policy boundary",
      detail: "A synthetic Microsoft 365 sign-in requests a bulk finance export through an approved AI workflow.",
    },
    terminal: {
      id: "terminal-detect",
      atMs: 2_000,
      label: "DETECT",
      text: "Synthetic identity and workflow signals crossed the approved finance-export policy boundary.",
      tone: "danger",
    },
  },
  {
    atMs: 4_500,
    phase: "correlate",
    status: "Identity, workflow, and policy context converge on one risky access path.",
    controlState: "exposed",
    progress: 28,
    trace: {
      id: "classify",
      atMs: 4_500,
      time: "CONTEXT",
      severity: "HIGH",
      title: "Context assembled",
      detail: "Two scripted signals point to the same identity and approved finance workflow.",
    },
    terminal: {
      id: "terminal-classify",
      atMs: 4_500,
      label: "CORRELATE",
      text: "The rehearsal links sign-in, workflow, and policy context into one bounded response case.",
      tone: "warning",
    },
  },
  {
    atMs: 7_000,
    phase: "review",
    status: "A targeted containment plan is ready for human authorization.",
    controlState: "held",
    progress: 44,
    trace: {
      id: "review",
      atMs: 7_000,
      time: "DECISION",
      severity: "HIGH",
      title: "Decision gate engaged",
      detail: "AI-assisted triage recommends revoking the session and pausing only the affected workflow path.",
    },
    terminal: {
      id: "terminal-review",
      atMs: 7_000,
      label: "REVIEW",
      text: "Containment plan prepared for human authorization. No response action has executed yet.",
      tone: "warning",
    },
  },
  {
    atMs: 9_500,
    phase: "contain",
    status: "Synthetic identity session revoked; affected workflow path paused.",
    controlState: "contained",
    progress: 60,
    trace: {
      id: "contain",
      atMs: 9_500,
      time: "ACTION",
      severity: "MEDIUM",
      title: "Risky path contained",
      detail: "The scenario severs the risky session while leaving unrelated work available.",
    },
    terminal: {
      id: "terminal-contain",
      atMs: 9_500,
      label: "CONTAIN",
      text: "Authorized scenario action: revoke the synthetic session and pause only the affected workflow path.",
      tone: "warning",
    },
  },
  {
    atMs: 12_000,
    phase: "verify",
    status: "No additional access path appears in the scripted evidence set.",
    controlState: "contained",
    progress: 76,
    trace: {
      id: "verify",
      atMs: 12_000,
      time: "CHECK",
      severity: "INFO",
      title: "Scope checked",
      detail: "Access review finds no second identity, app token, or workflow path in this synthetic scenario.",
    },
    terminal: {
      id: "terminal-verify",
      atMs: 12_000,
      label: "VERIFY",
      text: "Checking the scripted evidence set for adjacent identities, app tokens, and workflow paths.",
      tone: "neutral",
    },
  },
  {
    atMs: 14_500,
    phase: "brief",
    status: "Evidence, decision record, and recovery steps assembled for review.",
    controlState: "contained",
    progress: 89,
    trace: {
      id: "brief",
      atMs: 14_500,
      time: "RECORD",
      severity: "INFO",
      title: "Review packet prepared",
      detail: "The synthetic record preserves evidence, explains each action, and assigns follow-up owners.",
    },
    terminal: {
      id: "terminal-brief",
      atMs: 14_500,
      label: "BRIEF",
      text: "Assembling the evidence trail, decision rationale, recovery steps, and named follow-up owners.",
      tone: "neutral",
    },
  },
  {
    atMs: 17_000,
    phase: "resolved",
    status: "Response complete — control retained.",
    controlState: "verified",
    progress: 100,
    trace: {
      id: "resolve",
      atMs: 17_000,
      time: "OUTCOME",
      severity: "RESOLVED",
      title: "Accountable outcome",
      detail: "Risky access contained, unaffected work available, evidence preserved, and follow-up owners assigned.",
    },
    terminal: {
      id: "terminal-resolve",
      atMs: 17_000,
      label: "RESOLVED",
      text: "Synthetic scenario complete: risky access contained, unaffected work available, evidence preserved, owners assigned.",
      tone: "success",
    },
  },
];

export const CONFIGURATOR_OPTIONS = {
  useCases: [
    { value: "workflow", label: "Document & workflow automation" },
    { value: "support", label: "Customer-support AI agent" },
    { value: "knowledge", label: "RAG knowledge base" },
    { value: "analytics", label: "Data analysis & BI" },
    { value: "integration", label: "Custom model integration" },
    { value: "process", label: "Multi-agent process redesign" },
  ],
  scales: [
    { value: "1-10", label: "1–10 users" },
    { value: "11-25", label: "11–25 users" },
    { value: "26-50", label: "26–50 users" },
    { value: "51+", label: "51+ users" },
  ],
  integrations: [
    { value: "0-1", label: "0–1 systems" },
    { value: "2-3", label: "2–3 systems" },
    { value: "4+", label: "4+ systems" },
  ],
  deployments: [
    { value: "prototype", label: "Controlled prototype" },
    { value: "production", label: "Production rollout" },
    { value: "unsure", label: "Recommend the path" },
  ],
} as const;

export const DEFAULT_CONFIGURATOR_SELECTION: ConfiguratorSelection = {
  useCase: "workflow",
  scale: "11-25",
  integrations: "2-3",
  deployment: "unsure",
  managed: true,
};

const BUILD_BANDS = {
  prototype: {
    title: getAIPricingOffering("Proof of Concept / Prototype").name,
    range: getAIPricingOffering("Proof of Concept / Prototype").price,
    label: "published prototype range",
  },
  single: {
    title: getAIPricingOffering("Single-Workflow Production Agent").name,
    range: getAIPricingOffering("Single-Workflow Production Agent").price,
    label: "published single-workflow range",
  },
  integrated: {
    title: getAIPricingOffering("Integrated / Line-of-Business Agent").name,
    range: getAIPricingOffering("Integrated / Line-of-Business Agent").price,
    label: "published integrated-agent range",
  },
  multi: {
    title: getAIPricingOffering(
      "Multi-Agent System / AI-Augmented Process Redesign",
    ).name,
    range: getAIPricingOffering(
      "Multi-Agent System / AI-Augmented Process Redesign",
    ).price,
    label: "published multi-agent range",
  },
} as const;

export function buildConfiguratorRecommendation(
  selection: ConfiguratorSelection,
): ConfiguratorRecommendation {
  const isPrototype = selection.deployment === "prototype";
  const isMulti =
    selection.useCase === "process" ||
    (selection.integrations === "4+" && selection.scale === "51+");
  const isIntegrated =
    selection.useCase === "analytics" ||
    selection.useCase === "integration" ||
    selection.integrations === "4+" ||
    selection.scale === "51+";
  const band = isPrototype
    ? BUILD_BANDS.prototype
    : isMulti
      ? BUILD_BANDS.multi
      : isIntegrated
        ? BUILD_BANDS.integrated
        : BUILD_BANDS.single;

  const useCaseLabel =
    CONFIGURATOR_OPTIONS.useCases.find((option) => option.value === selection.useCase)
      ?.label ?? "AI workflow";
  const integrationLabel =
    CONFIGURATOR_OPTIONS.integrations.find(
      (option) => option.value === selection.integrations,
    )?.label ?? "selected systems";

  return {
    title: band.title,
    summary: `${useCaseLabel} for ${selection.scale} across ${integrationLabel.toLowerCase()}, with scoped permissions and human review before consequential actions.`,
    buildRange: band.range,
    buildLabel: band.label,
    discoveryRange: isPrototype
      ? null
      : getAIPricingOffering("Agent Discovery & Technical Specification").price,
    operationsRange: selection.managed
      ? `From ${MANAGED_AI_AGENT_OPERATIONS.prices[0].price}`
      : null,
    phases: isPrototype
      ? ["Confirm success criteria", "Build bounded prototype", "Document production path"]
      : [
          "Agent discovery & technical specification",
          "Build, integrate, and evaluate",
          "Controlled production rollout",
        ],
    controls: [
      "Least-privilege data and tool access",
      "Human approval for sensitive actions",
      "Evaluation evidence and operating runbook",
      ...(selection.managed ? ["Monitoring, quality, and drift checks"] : []),
    ],
  };
}

export const PROOF_METRICS = [
  {
    value: "24+",
    label: "Years of IT operations",
    source: "ITECS public company history",
  },
  {
    value: "92%",
    label: "Client retention rate",
    source: "ITECS published site proof point",
  },
  {
    value: "200+",
    label: "Client engagements",
    source: "ITECS published site proof point",
  },
] as const;
