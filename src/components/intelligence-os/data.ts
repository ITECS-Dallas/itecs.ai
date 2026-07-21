import type { ComponentType, SVGProps } from "react";
import {
  Activity,
  FolderOpen,
  ShieldCheck,
  SlidersHorizontal,
  SquareTerminal,
} from "lucide-react";
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
    label: "SOC Operations",
    shortLabel: "SOC",
    description: "Scripted incident-response simulation",
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

export const INCIDENT_DURATION_MS = 30_000;

export const INCIDENT_STEPS: IncidentStep[] = [
  {
    atMs: 0,
    phase: "idle",
    status: "Simulation armed. Baseline healthy.",
    nodeState: "healthy",
    progress: 0,
    feed: {
      id: "baseline",
      atMs: 0,
      time: "00:00",
      severity: "INFO",
      title: "Baseline verified",
      detail: "Six demo zones reporting healthy status.",
    },
    terminal: {
      id: "terminal-baseline",
      atMs: 0,
      label: "SIMULATION",
      text: "Incident rehearsal initialized. All telemetry below is scripted demo data.",
      tone: "neutral",
    },
  },
  {
    atMs: 2_500,
    phase: "detecting",
    status: "Anomalous execution detected on demo endpoint FIN-WS-27.",
    nodeState: "at-risk",
    progress: 14,
    feed: {
      id: "detect",
      atMs: 2_500,
      time: "00:03",
      severity: "CRITICAL",
      title: "Execution anomaly",
      detail: "FIN-WS-27 launched an unsigned process from a temporary path.",
    },
    terminal: {
      id: "terminal-detect",
      atMs: 2_500,
      label: "DETECT",
      text: "Correlating endpoint behavior, identity context, and recent file activity.",
      tone: "danger",
    },
  },
  {
    atMs: 6_000,
    phase: "classifying",
    status: "Behavior classified with simulated 96% confidence.",
    nodeState: "at-risk",
    progress: 28,
    feed: {
      id: "classify",
      atMs: 6_000,
      time: "00:06",
      severity: "HIGH",
      title: "Technique classified",
      detail: "Demo classification: command execution followed by file modification.",
    },
    terminal: {
      id: "terminal-classify",
      atMs: 6_000,
      label: "CLASSIFY",
      text: "Simulated confidence 96%. Recommended response: isolate first, preserve evidence, then remediate.",
      tone: "warning",
    },
  },
  {
    atMs: 10_000,
    phase: "isolating",
    status: "Demo endpoint isolated. Business services remain available.",
    nodeState: "isolated",
    progress: 44,
    feed: {
      id: "isolate",
      atMs: 10_000,
      time: "00:10",
      severity: "HIGH",
      title: "Endpoint quarantined",
      detail: "Network path severed in the simulation; evidence channel retained.",
    },
    terminal: {
      id: "terminal-isolate",
      atMs: 10_000,
      label: "CONTAIN",
      text: "FIN-WS-27 moved to the simulated quarantine segment. No adjacent demo nodes show propagation.",
      tone: "warning",
    },
  },
  {
    atMs: 14_000,
    phase: "remediating",
    status: "Unsigned process terminated; rollback staged.",
    nodeState: "isolated",
    progress: 60,
    feed: {
      id: "terminate",
      atMs: 14_000,
      time: "00:14",
      severity: "MEDIUM",
      title: "Process terminated",
      detail: "Scripted response stopped the demo process and retained its hash.",
    },
    terminal: {
      id: "terminal-terminate",
      atMs: 14_000,
      label: "REMEDIATE",
      text: "Process stopped. Comparing modified files with the known-good demo snapshot.",
      tone: "warning",
    },
  },
  {
    atMs: 18_500,
    phase: "remediating",
    status: "Known-good snapshot restored in the scripted environment.",
    nodeState: "recovering",
    progress: 76,
    feed: {
      id: "restore",
      atMs: 18_500,
      time: "00:19",
      severity: "MEDIUM",
      title: "Files restored",
      detail: "Three simulated files returned to their approved state.",
    },
    terminal: {
      id: "terminal-restore",
      atMs: 18_500,
      label: "RESTORE",
      text: "Three demo files restored. Running integrity and persistence checks before release.",
      tone: "neutral",
    },
  },
  {
    atMs: 23_000,
    phase: "verifying",
    status: "Recovery checks passed. Monitoring for recurrence.",
    nodeState: "recovering",
    progress: 89,
    feed: {
      id: "verify",
      atMs: 23_000,
      time: "00:23",
      severity: "INFO",
      title: "Integrity verified",
      detail: "No simulated persistence or lateral movement detected.",
    },
    terminal: {
      id: "terminal-verify",
      atMs: 23_000,
      label: "VERIFY",
      text: "Integrity checks passed. Preparing a human-review packet and controlled return-to-service recommendation.",
      tone: "neutral",
    },
  },
  {
    atMs: 28_000,
    phase: "resolved",
    status: "Simulation resolved. Zero demo endpoints compromised.",
    nodeState: "healthy",
    progress: 100,
    feed: {
      id: "resolve",
      atMs: 28_000,
      time: "00:28",
      severity: "RESOLVED",
      title: "Incident resolved",
      detail: "Demo endpoint restored; review evidence prepared.",
    },
    terminal: {
      id: "terminal-resolve",
      atMs: 28_000,
      label: "RESOLVED",
      text: "Simulation complete in under 30 seconds: contained, restored, verified, and routed for human review.",
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
    title: "Proof of Concept / Prototype",
    range: "$8,000–$18,000",
    label: "published prototype range",
  },
  single: {
    title: "Single-Workflow Production Agent",
    range: "$18,000–$35,000",
    label: "published single-workflow range",
  },
  integrated: {
    title: "Integrated / Financial Workpaper Agent",
    range: "$35,000–$75,000",
    label: "published integrated-agent range",
  },
  multi: {
    title: "Multi-Agent System / Process Redesign",
    range: "$55,000–$120,000",
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
    discoveryRange: isPrototype ? null : "$4,500–$7,500",
    operationsRange: selection.managed ? "$2,500–$6,500/mo" : null,
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
export const PROOF_CASE_STUDIES = [
  {
    client: "Pegasus Foods",
    industry: "Food manufacturing",
    outcome: "100% uptime maintained",
    summary:
      "ITECS used virtualization, replication, and staged cutover controls to relocate business-critical infrastructure 1,200 miles without production downtime or data loss.",
    metrics: ["Zero data loss", "$2.1M prevented downtime loss"],
    sourceDate: "May 28, 2020",
    href: "https://itecsonline.com/white-papers-case-studies/pegasus-foods-white-paper",
  },
  {
    client: "OpenText",
    industry: "Enterprise software",
    outcome: "99.8% system uptime",
    summary:
      "A dedicated ITECS on-site support program improved local response coverage while operating inside OpenText's central IT standards.",
    metrics: ["52+ weeks of support", "30% faster response"],
    sourceDate: "July 3, 2024",
    href: "https://itecsonline.com/white-papers-case-studies/opentext-success-story",
  },
  {
    client: "PepsiCo",
    industry: "Food and beverage",
    outcome: "99.9% transition uptime",
    summary:
      "ITECS supported acquired subsidiaries with compliant interim infrastructure and managed operations during enterprise transition periods.",
    metrics: ["5 subsidiaries supported", "40% fewer disruptions"],
    sourceDate: "March 25, 2025",
    href: "https://itecsonline.com/white-papers-case-studies/pepsico-success-story-itecs-manages-it-transitions",
  },
] as const;
