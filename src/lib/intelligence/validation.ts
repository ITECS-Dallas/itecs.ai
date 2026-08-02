import {
  CHAT_LIMITS,
  type IntelligenceChatMessage,
  type IntelligenceChatRequest,
} from "./contract";

type ValidationSuccess = {
  ok: true;
  value: IntelligenceChatRequest;
};

type ValidationFailure = {
  ok: false;
  status: 400 | 413;
  message: string;
};

export type ChatRequestValidation = ValidationSuccess | ValidationFailure;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeText(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .trim();
}

function normalizePagePath(value: unknown) {
  const path = normalizeText(value);
  const allowedPrefixes = [
    "/about",
    "/ai-devops",
    "/ai-knowledge-base",
    "/ai-optimized-seo",
    "/ai-receptionist",
    "/assessment",
    "/automation",
    "/case-studies",
    "/chatgpt-codex-training",
    "/claude-cowork-training",
    "/consulting",
    "/contact",
    "/copilot-training",
    "/crm-sales-ai",
    "/custom-ai-agents",
    "/data-audit",
    "/financial-services",
    "/insights",
    "/it-change-readiness",
    "/managed-intelligence-provider",
    "/manufacturing",
    "/pricing",
    "/services",
    "/training",
  ];

  if (!path || path.length > 160 || !/^\/[a-zA-Z0-9/_-]*$/.test(path)) {
    return "/";
  }

  if (
    path !== "/" &&
    !allowedPrefixes.some(
      (prefix) => path === prefix || path.startsWith(`${prefix}/`),
    )
  ) {
    return "/";
  }

  return path;
}

function normalizeHistory(value: unknown): IntelligenceChatMessage[] | null {
  if (!Array.isArray(value) || value.length > CHAT_LIMITS.maxHistoryMessages) {
    return null;
  }

  const messages: IntelligenceChatMessage[] = [];
  let characters = 0;

  for (const item of value) {
    if (!isRecord(item) || (item.role !== "user" && item.role !== "assistant")) {
      return null;
    }

    const content = normalizeText(item.content);

    if (!content || content.length > CHAT_LIMITS.maxMessageCharacters) {
      return null;
    }

    characters += content.length;

    if (characters > CHAT_LIMITS.maxHistoryCharacters) {
      return null;
    }

    messages.push({ role: item.role, content });
  }

  return messages;
}

export function validateIntelligenceChatRequest(
  value: unknown,
): ChatRequestValidation {
  if (!isRecord(value)) {
    return { ok: false, status: 400, message: "Invalid chat request." };
  }

  const message = normalizeText(value.message);

  if (!message) {
    return { ok: false, status: 400, message: "Enter a question for ITECS AI." };
  }

  if (message.length > CHAT_LIMITS.maxMessageCharacters) {
    return {
      ok: false,
      status: 413,
      message: `Keep questions under ${CHAT_LIMITS.maxMessageCharacters} characters.`,
    };
  }

  const history = normalizeHistory(value.history ?? []);

  if (!history) {
    return { ok: false, status: 400, message: "Invalid conversation history." };
  }

  const sessionId = normalizeText(value.sessionId).toLowerCase();

  if (!/^[a-f0-9-]{20,64}$/.test(sessionId)) {
    return { ok: false, status: 400, message: "Invalid chat session." };
  }

  return {
    ok: true,
    value: {
      message,
      history,
      sessionId,
      pagePath: normalizePagePath(value.pagePath),
    },
  };
}
