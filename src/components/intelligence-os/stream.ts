import type {
  IntelligenceResource,
  IntelligenceResourceKind,
  IntelligenceStreamEvent,
} from "@/lib/intelligence/contract";

const RESOURCE_KINDS = new Set<IntelligenceResourceKind>([
  "service",
  "pricing",
  "industry",
  "proof",
  "guide",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function hasSafeHref(value: unknown): value is string {
  return (
    isString(value) &&
    ((value.startsWith("/") && !value.startsWith("//")) || value.startsWith("https://"))
  );
}

function parseResource(value: unknown): IntelligenceResource | null {
  if (!isRecord(value)) return null;
  if (
    !isString(value.id) ||
    !isString(value.kind) ||
    !RESOURCE_KINDS.has(value.kind as IntelligenceResourceKind) ||
    !isString(value.eyebrow) ||
    !isString(value.title) ||
    !isString(value.summary) ||
    !hasSafeHref(value.href) ||
    !(value.price === null || isString(value.price)) ||
    !(value.meta === null || isString(value.meta))
  ) {
    return null;
  }

  return value as unknown as IntelligenceResource;
}

export function parseIntelligenceEvent(value: unknown): IntelligenceStreamEvent | null {
  if (!isRecord(value) || !isString(value.type)) return null;

  switch (value.type) {
    case "status":
      if (
        (value.stage === "scope" || value.stage === "grounding" || value.stage === "thinking") &&
        isString(value.label)
      ) {
        return { type: "status", stage: value.stage, label: value.label };
      }
      return null;
    case "delta":
      return isString(value.text) ? { type: "delta", text: value.text } : null;
    case "resources": {
      if (!Array.isArray(value.resources)) return null;
      const resources: IntelligenceResource[] = [];
      for (const resourceValue of value.resources) {
        const resource = parseResource(resourceValue);
        if (!resource) return null;
        resources.push(resource);
      }
      return { type: "resources", resources };
    }
    case "suggestions":
      return Array.isArray(value.suggestions) && value.suggestions.every(isString)
        ? { type: "suggestions", suggestions: value.suggestions }
        : null;
    case "refusal":
      return isString(value.text) ? { type: "refusal", text: value.text } : null;
    case "unavailable":
      return isString(value.text) ? { type: "unavailable", text: value.text } : null;
    case "done":
      return isString(value.requestId)
        ? { type: "done", requestId: value.requestId }
        : null;
    case "error":
      return isString(value.message) ? { type: "error", message: value.message } : null;
    default:
      return null;
  }
}

export async function readIntelligenceStream(
  response: Response,
  onEvent: (event: IntelligenceStreamEvent) => void,
): Promise<void> {
  if (!response.body) throw new Error("The advisor returned an empty response stream.");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let sawDone = false;

  const consumeBlock = (block: string) => {
    const lines = block.split(/\r?\n/);
    const dataLines = lines.filter((line) => line.startsWith("data:"));
    const isCommentOnly = lines.every((line) => !line || line.startsWith(":"));

    if (isCommentOnly) return;
    if (dataLines.length === 0) {
      throw new Error("The advisor returned an invalid response stream.");
    }

    const data = dataLines
      .map((line) => line.slice(5).trimStart())
      .join("\n");
    if (!data || data === "[DONE]") {
      throw new Error("The advisor returned an invalid response stream.");
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(data);
    } catch {
      throw new Error("The advisor returned an invalid response stream.");
    }

    const event = parseIntelligenceEvent(parsed);
    if (!event || sawDone) {
      throw new Error("The advisor returned an invalid response stream.");
    }
    if (event.type === "done") sawDone = true;
    onEvent(event);
  };

  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      const blocks = buffer.split(/\r?\n\r?\n/);
      buffer = blocks.pop() ?? "";
      for (const block of blocks) consumeBlock(block);
      if (done) break;
    }

    if (buffer.trim()) consumeBlock(buffer);
    if (!sawDone) {
      throw new Error("The advisor response ended before it could be verified.");
    }
  } finally {
    try {
      await reader.cancel();
    } catch {
      // The reader may already be closed or aborted; release its lock either way.
    }
    reader.releaseLock();
  }
}
