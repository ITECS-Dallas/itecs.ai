"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  CHAT_LIMITS,
  CHAT_UNAVAILABLE_MESSAGE,
  DEFAULT_CHAT_SUGGESTIONS,
  type IntelligenceChatMessage,
  type IntelligenceChatRequest,
} from "@/lib/intelligence/contract";
import { readIntelligenceStream } from "./stream";
import type {
  ChatTurn,
  IntelligenceChatController,
  PendingChatTurn,
} from "./types";

const WELCOME_TURN: ChatTurn = {
  id: "welcome",
  role: "assistant",
  kind: "system",
  content:
    "I am the ITECS AI advisor. Tell me the business process, constraint, or outcome you are evaluating, and I will map it to relevant ITECS services, published pricing, and proof.",
};

interface ActiveRequest {
  abortController: AbortController;
  userTurnId: string;
}

function createId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function buildHistory(turns: ChatTurn[]): IntelligenceChatMessage[] {
  const history = turns
    .filter((turn) => turn.kind !== "system")
    .slice(-CHAT_LIMITS.maxHistoryMessages)
    .map(({ role, content }) => ({ role, content }));

  let characters = 0;
  const withinLimit: IntelligenceChatMessage[] = [];
  for (const message of [...history].reverse()) {
    if (characters + message.content.length > CHAT_LIMITS.maxHistoryCharacters) break;
    characters += message.content.length;
    withinLimit.unshift(message);
  }
  return withinLimit;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function safeServerMessage(value: unknown): string | null {
  if (!isRecord(value) || typeof value.message !== "string") return null;
  const message = value.message
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return message && message.length <= 300 ? message : null;
}

function retryAfterMessage(value: string | null): string | null {
  if (!value) return null;
  let seconds: number;
  if (/^\d{1,5}$/.test(value)) {
    seconds = Number(value);
  } else {
    seconds = Math.ceil((Date.parse(value) - Date.now()) / 1_000);
  }
  if (!Number.isFinite(seconds) || seconds <= 0 || seconds > 3_600) return null;
  return `Try again in about ${seconds} second${seconds === 1 ? "" : "s"}.`;
}

async function responseErrorMessage(response: Response): Promise<string> {
  let serverMessage: string | null = null;
  const mayExposeValidation = [400, 413, 429].includes(response.status);
  if (
    mayExposeValidation &&
    response.headers.get("content-type")?.toLowerCase().includes("application/json")
  ) {
    try {
      serverMessage = safeServerMessage(await response.json());
    } catch {
      serverMessage = null;
    }
  }

  const fallback =
    response.status === 429
      ? "The advisor is receiving many requests. Please wait a moment and try again."
      : CHAT_UNAVAILABLE_MESSAGE;
  const message = serverMessage ?? fallback;
  const retry = response.status === 429
    ? retryAfterMessage(response.headers.get("retry-after"))
    : null;
  return retry ? `${message} ${retry}` : message;
}

export function useIntelligenceChat(): IntelligenceChatController {
  const pathname = usePathname();
  const [turns, setTurns] = useState<ChatTurn[]>([WELCOME_TURN]);
  const [pending, setPending] = useState<PendingChatTurn | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([
    ...DEFAULT_CHAT_SUGGESTIONS,
  ]);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const inFlightRef = useRef<ActiveRequest | null>(null);
  const sessionIdRef = useRef(createId());
  const lastRequestAtRef = useRef(0);

  const cancel = useCallback(() => {
    const active = inFlightRef.current;
    if (!active) return;
    inFlightRef.current = null;
    active.abortController.abort();
    setTurns((current) => current.filter((turn) => turn.id !== active.userTurnId));
    setPending(null);
    setIsStreaming(false);
    setSuggestions([...DEFAULT_CHAT_SUGGESTIONS]);
  }, []);

  useEffect(() => cancel, [cancel]);

  const submit = useCallback(
    async (rawMessage: string) => {
      const message = rawMessage.trim();
      if (!message || inFlightRef.current) return;
      if (message.length > CHAT_LIMITS.maxMessageCharacters) {
        setError(`Keep the request under ${CHAT_LIMITS.maxMessageCharacters} characters.`);
        return;
      }

      const userMessageCount = turns.filter((turn) => turn.role === "user").length;
      if (userMessageCount >= CHAT_LIMITS.maxMessagesPerSession) {
        setError("This demo session has reached its message limit. Reopen Intelligence OS to start again.");
        return;
      }

      const sinceLastRequest = Date.now() - lastRequestAtRef.current;
      if (sinceLastRequest < CHAT_LIMITS.minimumClientIntervalMs) {
        setError("Give the advisor a moment before sending another request.");
        return;
      }

      lastRequestAtRef.current = Date.now();
      const userTurnId = createId();
      const abortController = new AbortController();
      const activeRequest: ActiveRequest = { abortController, userTurnId };
      inFlightRef.current = activeRequest;
      setError(null);
      setSuggestions([]);
      setTurns((current) => [
        ...current,
        { id: userTurnId, role: "user", content: message, kind: "live" },
      ]);
      setPending({ content: "", resources: [], status: "Checking ITECS scope…" });
      setIsStreaming(true);

      let responseText = "";
      let responseResources: PendingChatTurn["resources"] = [];
      let responseSuggestions: string[] = [];

      const request: IntelligenceChatRequest = {
        message,
        history: buildHistory(turns),
        sessionId: sessionIdRef.current,
        pagePath: pathname || "/",
      };

      try {
        const response = await fetch("/api/intelligence/stream", {
          method: "POST",
          headers: {
            Accept: "text/event-stream",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(await responseErrorMessage(response));
        }

        await readIntelligenceStream(response, (event) => {
          if (inFlightRef.current !== activeRequest) return;
          if (event.type === "status") {
            setPending((current) =>
              current ? { ...current, status: event.label } : current,
            );
          } else if (event.type === "delta") {
            responseText += event.text;
            setPending((current) =>
              current ? { ...current, content: responseText } : current,
            );
          } else if (event.type === "resources") {
            responseResources = event.resources;
            setPending((current) =>
              current ? { ...current, resources: responseResources } : current,
            );
          } else if (event.type === "suggestions") {
            responseSuggestions = event.suggestions.slice(0, 3);
          } else if (event.type === "refusal" || event.type === "unavailable") {
            responseText = event.text;
            setPending((current) =>
              current ? { ...current, content: responseText } : current,
            );
          } else if (event.type === "error") {
            throw new Error(event.message);
          }
        });

        if (inFlightRef.current !== activeRequest) return;
        if (!responseText.trim()) throw new Error(CHAT_UNAVAILABLE_MESSAGE);
        setTurns((current) => [
          ...current,
          {
            id: createId(),
            role: "assistant",
            content: responseText.trim(),
            resources: responseResources,
            kind: "live",
          },
        ]);
        setSuggestions(
          responseSuggestions.length > 0
            ? responseSuggestions
            : [...DEFAULT_CHAT_SUGGESTIONS],
        );
      } catch (caught) {
        if (inFlightRef.current !== activeRequest) return;
        setTurns((current) => current.filter((turn) => turn.id !== userTurnId));
        setSuggestions([...DEFAULT_CHAT_SUGGESTIONS]);
        if (abortController.signal.aborted) return;
        setError(caught instanceof Error ? caught.message : CHAT_UNAVAILABLE_MESSAGE);
      } finally {
        if (inFlightRef.current === activeRequest) {
          inFlightRef.current = null;
          setPending(null);
          setIsStreaming(false);
        }
      }
    },
    [pathname, turns],
  );

  return {
    turns,
    pending,
    suggestions,
    error,
    isStreaming,
    submit,
    cancel,
    clearError: () => setError(null),
  };
}
