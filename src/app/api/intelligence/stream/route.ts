import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  CHAT_LIMITS,
  CHAT_UNAVAILABLE_MESSAGE,
  OUT_OF_SCOPE_MESSAGE,
  type IntelligenceStreamEvent,
} from "@/lib/intelligence/contract";
import { retrieveItecsKnowledge } from "@/lib/intelligence/knowledge";
import {
  classifyIntelligenceScope,
  createPseudonymousClientId,
  generateVerifiedIntelligenceAnswer,
  getIntelligenceApiKey,
} from "@/lib/intelligence/provider";
import { checkIntelligenceRateLimit } from "@/lib/intelligence/rate-limit";
import { validateIntelligenceChatRequest } from "@/lib/intelligence/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const encoder = new TextEncoder();

function ipAddress(request: NextRequest) {
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ||
    "unavailable"
  );
}

function streamFrame(event: IntelligenceStreamEvent) {
  return encoder.encode(`event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`);
}

function streamHeaders() {
  return {
    "Cache-Control": "no-cache, no-transform",
    "Content-Type": "text/event-stream; charset=utf-8",
    "X-Accel-Buffering": "no",
    "X-Content-Type-Options": "nosniff",
  };
}

function answerChunks(answer: string, maximumCharacters = 36) {
  const characters = Array.from(answer);
  const chunks: string[] = [];
  let start = 0;

  while (start < characters.length) {
    let end = Math.min(start + maximumCharacters, characters.length);

    if (end < characters.length) {
      for (let index = end; index > start + 18; index -= 1) {
        if (/\s/u.test(characters[index - 1])) {
          end = index;
          break;
        }
      }
    }

    chunks.push(characters.slice(start, end).join(""));
    start = end;
  }

  return chunks;
}

export async function POST(request: NextRequest) {
  const declaredLength = Number(request.headers.get("content-length") || "0");

  if (declaredLength > CHAT_LIMITS.maxRequestBytes) {
    return NextResponse.json(
      { message: "Chat request is too large." },
      { status: 413 },
    );
  }

  let input: unknown;

  try {
    const rawBody = await request.text();

    if (Buffer.byteLength(rawBody, "utf8") > CHAT_LIMITS.maxRequestBytes) {
      return NextResponse.json(
        { message: "Chat request is too large." },
        { status: 413 },
      );
    }

    input = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json(
      { message: "Invalid chat request." },
      { status: 400 },
    );
  }

  const validation = validateIntelligenceChatRequest(input);

  if (!validation.ok) {
    return NextResponse.json(
      { message: validation.message },
      { status: validation.status },
    );
  }

  const chat = validation.value;
  const requestId = randomUUID();
  const apiKey = getIntelligenceApiKey();
  const clientId = apiKey
    ? createPseudonymousClientId(ipAddress(request), apiKey)
    : "visitor_unconfigured";

  if (apiKey) {
    const rateLimit = checkIntelligenceRateLimit(clientId, chat.sessionId);

    if (!rateLimit.allowed) {
      console.warn("ITECS Intelligence rate limit reached", {
        clientId,
        reason: rateLimit.reason,
      });

      return NextResponse.json(
        {
          message:
            rateLimit.reason === "debounce"
              ? "Please wait a moment before sending another question."
              : "This Intelligence OS session has reached its question limit. Contact ITECS for a deeper scoping conversation.",
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        },
      );
    }
  }

  const retrievalQuery = [
    ...chat.history
      .filter((message) => message.role === "user")
      .slice(-2)
      .map((message) => message.content),
    chat.message,
  ].join("\n");
  const knowledge = retrieveItecsKnowledge(retrievalQuery, chat.pagePath);

  let cancelled = false;
  const providerAbortController = new AbortController();
  const abortProvider = (reason?: unknown) => {
    if (!providerAbortController.signal.aborted) {
      providerAbortController.abort(reason);
    }
  };
  const handleRequestAbort = () => {
    cancelled = true;
    abortProvider(request.signal.reason);
  };
  const removeRequestAbortListener = () => {
    request.signal.removeEventListener("abort", handleRequestAbort);
  };

  if (request.signal.aborted) {
    handleRequestAbort();
  } else {
    request.signal.addEventListener("abort", handleRequestAbort, { once: true });
  }

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const send = (event: IntelligenceStreamEvent) => {
        if (cancelled) return false;

        try {
          controller.enqueue(streamFrame(event));
          return true;
        } catch (error) {
          cancelled = true;
          abortProvider(error);
          return false;
        }
      };

      void (async () => {
        try {
          if (cancelled) return;

          if (!apiKey) {
            send({ type: "unavailable", text: CHAT_UNAVAILABLE_MESSAGE });
            send({ type: "resources", resources: knowledge.resources });
            send({ type: "suggestions", suggestions: knowledge.suggestions });
            send({ type: "done", requestId });
            return;
          }

          send({
            type: "status",
            stage: "scope",
            label: "Confirming ITECS operating scope",
          });

          const scope = await classifyIntelligenceScope({
            apiKey,
            clientId,
            history: chat.history,
            message: chat.message,
            signal: providerAbortController.signal,
          });

          if (scope.decision !== "allow") {
            console.info("ITECS Intelligence request declined", {
              clientId,
              category: scope.category,
            });
            send({ type: "refusal", text: OUT_OF_SCOPE_MESSAGE });
            send({
              type: "suggestions",
              suggestions: [
                "Which ITECS AI service should we start with?",
                "Show me the public ITECS AI pricing",
                "What does Managed Intelligence include?",
              ],
            });
            send({ type: "done", requestId });
            return;
          }

          send({
            type: "status",
            stage: "grounding",
            label: "Linking current ITECS services and pricing",
          });
          send({ type: "resources", resources: knowledge.resources });
          send({ type: "suggestions", suggestions: knowledge.suggestions });
          send({
            type: "status",
            stage: "thinking",
            label: "Building a grounded recommendation",
          });

          const verifiedAnswer = await generateVerifiedIntelligenceAnswer({
            apiKey,
            clientId,
            history: chat.history,
            message: chat.message,
            pagePath: chat.pagePath,
            trustedContext: knowledge.context,
            signal: providerAbortController.signal,
            onVerificationStart: () => {
              send({
                type: "status",
                stage: "thinking",
                label: "Verifying scope, evidence, and pricing",
              });
            },
          });

          for (const [index, text] of answerChunks(verifiedAnswer).entries()) {
            providerAbortController.signal.throwIfAborted();

            if (index > 0) {
              await new Promise((resolve) => setTimeout(resolve, 12));
            }

            if (!send({ type: "delta", text })) return;
          }

          send({ type: "done", requestId });
        } catch (error) {
          if (cancelled || providerAbortController.signal.aborted) return;

          console.error("ITECS Intelligence provider unavailable", {
            requestId,
            clientId,
            errorName: error instanceof Error ? error.name : "UnknownError",
          });
          send({ type: "unavailable", text: CHAT_UNAVAILABLE_MESSAGE });
          send({ type: "resources", resources: knowledge.resources });
          send({ type: "suggestions", suggestions: knowledge.suggestions });
          send({ type: "done", requestId });
        } finally {
          removeRequestAbortListener();

          if (!cancelled) {
            cancelled = true;
            controller.close();
          }
        }
      })();
    },
    cancel(reason) {
      cancelled = true;
      abortProvider(reason);
      removeRequestAbortListener();
    },
  });

  return new Response(stream, { headers: streamHeaders() });
}
