import { mkdir, open, readFile, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { SafeError } from "./errors.js";
import type { SessionRepository } from "./types.js";

type SessionEntry = {
  threadId: string;
  updatedAt: string;
};

type StateDocument = {
  version: 1;
  sessions: Record<string, SessionEntry>;
};

function validateDocument(value: unknown): StateDocument {
  if (typeof value !== "object" || value === null) {
    throw new SafeError("state_corrupt", "Session state is not an object");
  }
  const candidate = value as Record<string, unknown>;
  if (candidate.version !== 1) {
    throw new SafeError("state_corrupt", "Session state version is invalid");
  }
  const sessionsValue = candidate.sessions;
  if (typeof sessionsValue !== "object" || sessionsValue === null) {
    throw new SafeError("state_corrupt", "Session state map is invalid");
  }
  for (const [key, entry] of Object.entries(sessionsValue)) {
    const entryRecord =
      typeof entry === "object" && entry !== null
        ? (entry as Record<string, unknown>)
        : null;
    if (
      key.length === 0 ||
      entryRecord === null ||
      typeof entryRecord.threadId !== "string" ||
      entryRecord.threadId.length === 0 ||
      typeof entryRecord.updatedAt !== "string" ||
      Number.isNaN(Date.parse(entryRecord.updatedAt))
    ) {
      throw new SafeError("state_corrupt", "Session state entry is invalid");
    }
  }
  return {
    version: 1,
    sessions: sessionsValue as Record<string, SessionEntry>,
  };
}

async function readDocument(filePath: string): Promise<StateDocument> {
  try {
    const text = await readFile(filePath, "utf8");
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      throw new SafeError(
        "state_corrupt",
        "Session state contains invalid JSON",
        { cause: error },
      );
    }
    return validateDocument(parsed);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return { version: 1, sessions: {} };
    }
    throw error;
  }
}

export class AtomicSessionStore implements SessionRepository {
  private writeTail: Promise<void> = Promise.resolve();

  private constructor(
    private readonly filePath: string,
    private document: StateDocument,
  ) {}

  static async open(filePath: string): Promise<AtomicSessionStore> {
    const document = await readDocument(filePath);
    return new AtomicSessionStore(filePath, document);
  }

  get(key: string): string | null {
    return this.document.sessions[key]?.threadId ?? null;
  }

  async set(key: string, threadId: string): Promise<void> {
    await this.mutate((next) => {
      next.sessions[key] = {
        threadId,
        updatedAt: new Date().toISOString(),
      };
    });
  }

  async delete(key: string): Promise<boolean> {
    let deleted = false;
    await this.mutate((next) => {
      deleted = key in next.sessions;
      Reflect.deleteProperty(next.sessions, key);
    });
    return deleted;
  }

  private async mutate(change: (next: StateDocument) => void): Promise<void> {
    const operation = this.writeTail.then(async () => {
      const next = structuredClone(this.document);
      change(next);
      await this.writeAtomic(next);
      this.document = next;
    });
    this.writeTail = operation.catch(() => undefined);
    await operation;
  }

  private async writeAtomic(document: StateDocument): Promise<void> {
    const directory = path.dirname(this.filePath);
    const basename = path.basename(this.filePath);
    await mkdir(directory, { recursive: true, mode: 0o700 });
    const temporary = path.join(
      directory,
      `.${basename}.${String(process.pid)}.${randomUUID()}.tmp`,
    );
    let handle;
    try {
      handle = await open(temporary, "wx", 0o600);
      await handle.writeFile(`${JSON.stringify(document)}\n`, "utf8");
      await handle.sync();
      await handle.close();
      handle = undefined;
      await rename(temporary, this.filePath);
      const directoryHandle = await open(directory, "r");
      try {
        await directoryHandle.sync();
      } finally {
        await directoryHandle.close();
      }
    } catch (error) {
      if (handle !== undefined) {
        await handle.close().catch(() => undefined);
      }
      await unlink(temporary).catch(() => undefined);
      throw error;
    }
  }
}
