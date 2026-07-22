import { CHAT_LIMITS } from "./contract";

interface DailyBucket {
  day: string;
  count: number;
  lastSeenAt: number;
}

interface SessionBucket {
  clientId: string;
  count: number;
  lastRequestAt: number;
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number; reason: "session" | "daily" | "debounce" };

const dailyBuckets = new Map<string, DailyBucket>();
const sessionBuckets = new Map<string, SessionBucket>();
let checksSinceCleanup = 0;

function utcDay(timestamp: number) {
  return new Date(timestamp).toISOString().slice(0, 10);
}

function cleanup(now: number) {
  checksSinceCleanup += 1;

  if (checksSinceCleanup < 100) return;
  checksSinceCleanup = 0;

  const currentDay = utcDay(now);

  for (const [key, bucket] of dailyBuckets) {
    if (bucket.day !== currentDay || now - bucket.lastSeenAt > 2 * 86_400_000) {
      dailyBuckets.delete(key);
    }
  }

  for (const [key, bucket] of sessionBuckets) {
    if (now - bucket.lastRequestAt > 6 * 60 * 60 * 1_000) {
      sessionBuckets.delete(key);
    }
  }
}

export function checkIntelligenceRateLimit(
  clientId: string,
  sessionId: string,
  now = Date.now(),
): RateLimitResult {
  cleanup(now);

  const day = utcDay(now);
  const daily = dailyBuckets.get(clientId);

  if (daily?.day === day && daily.count >= CHAT_LIMITS.maxMessagesPerIpPerDay) {
    const nextDay = Date.parse(`${day}T00:00:00.000Z`) + 86_400_000;
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((nextDay - now) / 1_000)),
      reason: "daily",
    };
  }

  const session = sessionBuckets.get(sessionId);

  if (session && session.clientId !== clientId) {
    return { allowed: false, retryAfterSeconds: 60, reason: "session" };
  }

  if (
    session &&
    now - session.lastRequestAt < CHAT_LIMITS.minimumClientIntervalMs
  ) {
    return {
      allowed: false,
      retryAfterSeconds: 1,
      reason: "debounce",
    };
  }

  if (session && session.count >= CHAT_LIMITS.maxMessagesPerSession) {
    return { allowed: false, retryAfterSeconds: 60 * 60, reason: "session" };
  }

  dailyBuckets.set(clientId, {
    day,
    count: daily?.day === day ? daily.count + 1 : 1,
    lastSeenAt: now,
  });

  sessionBuckets.set(sessionId, {
    clientId,
    count: (session?.count ?? 0) + 1,
    lastRequestAt: now,
  });

  return { allowed: true };
}

export function resetIntelligenceRateLimitsForTests() {
  dailyBuckets.clear();
  sessionBuckets.clear();
  checksSinceCleanup = 0;
}
