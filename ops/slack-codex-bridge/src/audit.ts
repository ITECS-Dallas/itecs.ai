import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import type { BridgeConfig } from "./config.js";
import type { AuditEvent, AuditWriter } from "./types.js";

export class MetadataAuditWriter implements AuditWriter {
  private writeTail: Promise<void> = Promise.resolve();

  constructor(
    private readonly filePath: string,
    private readonly config: Pick<
      BridgeConfig,
      "siteDisplayName" | "workingDirectory"
    >,
  ) {}

  async record(event: AuditEvent): Promise<void> {
    const line = `${JSON.stringify({
      schemaVersion: 1,
      correlationId: event.correlationId,
      site: this.config.siteDisplayName,
      root: this.config.workingDirectory,
      slack: {
        userId: event.userId,
        channelId: event.channelId,
        threadTs: event.threadTs,
        eventId: event.eventId,
        eventType: event.eventType,
      },
      codexThreadId: event.codexThreadId,
      receivedAt: event.receivedAt,
      recordedAt: new Date().toISOString(),
      outcome: event.outcome,
    })}\n`;
    const operation = this.writeTail.then(async () => {
      await mkdir(path.dirname(this.filePath), {
        recursive: true,
        mode: 0o700,
      });
      await appendFile(this.filePath, line, { encoding: "utf8", mode: 0o600 });
    });
    this.writeTail = operation.catch(() => undefined);
    await operation;
  }
}
