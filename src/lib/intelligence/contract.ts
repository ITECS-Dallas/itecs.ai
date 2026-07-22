export const CHAT_LIMITS = {
  maxMessageCharacters: 900,
  maxHistoryMessages: 8,
  maxHistoryCharacters: 5_000,
  maxRequestBytes: 16_000,
  maxMessagesPerSession: 16,
  maxMessagesPerIpPerDay: 60,
  minimumClientIntervalMs: 900,
} as const;

export type IntelligenceChatRole = "user" | "assistant";

export interface IntelligenceChatMessage {
  role: IntelligenceChatRole;
  content: string;
}

export interface IntelligenceChatRequest {
  message: string;
  history: IntelligenceChatMessage[];
  sessionId: string;
  pagePath: string;
}

export type IntelligenceResourceKind =
  | "service"
  | "pricing"
  | "industry"
  | "proof"
  | "guide";

export interface IntelligenceResource {
  id: string;
  kind: IntelligenceResourceKind;
  eyebrow: string;
  title: string;
  summary: string;
  href: string;
  price: string | null;
  meta: string | null;
}

export type IntelligenceStreamEvent =
  | {
      type: "status";
      stage: "scope" | "grounding" | "thinking";
      label: string;
    }
  | { type: "delta"; text: string }
  | { type: "resources"; resources: IntelligenceResource[] }
  | { type: "suggestions"; suggestions: string[] }
  | { type: "refusal"; text: string }
  | { type: "unavailable"; text: string }
  | { type: "done"; requestId: string }
  | { type: "error"; message: string };

export const OUT_OF_SCOPE_MESSAGE =
  "That is outside my operating lane. I am here exclusively for ITECS AI services, pricing, Managed Intelligence, business AI use cases, and this Intelligence OS. Tell me what your team wants to improve, and I will map the most practical ITECS starting point.";

export const CHAT_UNAVAILABLE_MESSAGE =
  "I could not verify a reliable answer against ITECS' current published information, so I have not displayed one. The linked ITECS resources remain available, and the team can help directly through the scoping form or at (214) 444-7884.";

export const DEFAULT_CHAT_SUGGESTIONS = [
  "Which ITECS AI service should we start with?",
  "Compare pilot and custom agent pricing",
  "How does Managed Intelligence work?",
] as const;
