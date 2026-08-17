import { LIMITS } from "./constants.js";

export class EventDeduplicator {
  private readonly seen = new Map<string, number>();

  constructor(
    private readonly ttlMs = LIMITS.dedupeTtlMs,
    private readonly maxEntries = LIMITS.dedupeMaxEntries,
  ) {}

  claim(eventId: string, now = Date.now()): boolean {
    this.prune(now);
    const existing = this.seen.get(eventId);
    if (existing !== undefined && now - existing < this.ttlMs) {
      return false;
    }
    this.seen.set(eventId, now);
    if (this.seen.size > this.maxEntries) {
      const oldest = this.seen.keys().next().value;
      if (oldest !== undefined) {
        this.seen.delete(oldest);
      }
    }
    return true;
  }

  private prune(now: number): void {
    for (const [eventId, seenAt] of this.seen) {
      if (now - seenAt < this.ttlMs) {
        break;
      }
      this.seen.delete(eventId);
    }
  }
}
