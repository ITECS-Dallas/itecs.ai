import type {
  IntelligenceChatMessage,
  IntelligenceResource,
} from "@/lib/intelligence/contract";

export type IntelligenceAppId = "soc" | "terminal" | "configurator" | "vault";

export type IncidentPhase =
  | "idle"
  | "detecting"
  | "classifying"
  | "isolating"
  | "remediating"
  | "verifying"
  | "resolved";

export type DemoNodeState = "healthy" | "at-risk" | "isolated" | "recovering";

export interface IncidentFeedItem {
  id: string;
  atMs: number;
  time: string;
  severity: "INFO" | "MEDIUM" | "HIGH" | "CRITICAL" | "RESOLVED";
  title: string;
  detail: string;
}
export interface IncidentTerminalLine {
  id: string;
  atMs: number;
  label: string;
  text: string;
  tone: "neutral" | "warning" | "danger" | "success";
}

export interface IncidentStep {
  atMs: number;
  phase: IncidentPhase;
  status: string;
  nodeState: DemoNodeState;
  progress: number;
  feed?: IncidentFeedItem;
  terminal?: IncidentTerminalLine;
}

export interface IncidentController {
  running: boolean;
  completed: boolean;
  elapsedMs: number;
  phase: IncidentPhase;
  status: string;
  nodeState: DemoNodeState;
  progress: number;
  feed: IncidentFeedItem[];
  terminalLines: IncidentTerminalLine[];
  start: () => void;
  reset: () => void;
}

export interface WindowFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IntelligenceWindowState {
  id: IntelligenceAppId;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  frame: WindowFrame;
  restoreFrame: WindowFrame | null;
}

export interface ChatTurn extends IntelligenceChatMessage {
  id: string;
  resources?: IntelligenceResource[];
  kind?: "live" | "system";
}

export interface PendingChatTurn {
  content: string;
  resources: IntelligenceResource[];
  status: string;
}

export interface IntelligenceChatController {
  turns: ChatTurn[];
  pending: PendingChatTurn | null;
  suggestions: string[];
  error: string | null;
  isStreaming: boolean;
  submit: (message: string) => Promise<void>;
  cancel: () => void;
  clearError: () => void;
}

export interface ConfiguratorSelection {
  useCase: string;
  scale: string;
  integrations: string;
  deployment: string;
  managed: boolean;
}

export interface ConfiguratorRecommendation {
  title: string;
  summary: string;
  buildRange: string;
  buildLabel: string;
  discoveryRange: string | null;
  operationsRange: string | null;
  phases: string[];
  controls: string[];
}
