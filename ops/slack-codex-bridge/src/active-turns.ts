type ActiveTurn = {
  correlationId: string;
  controller: AbortController;
  done: Promise<void>;
  resolveDone(): void;
};

export class ActiveTurnRegistry {
  private readonly turns = new Map<string, ActiveTurn>();

  start(
    conversationKey: string,
    correlationId: string,
  ): AbortController | null {
    if (this.turns.has(conversationKey)) {
      return null;
    }
    const controller = new AbortController();
    let resolveDone = (): void => undefined;
    const done = new Promise<void>((resolve) => {
      resolveDone = resolve;
    });
    this.turns.set(conversationKey, {
      correlationId,
      controller,
      done,
      resolveDone,
    });
    return controller;
  }

  isBusy(conversationKey: string): boolean {
    return this.turns.has(conversationKey);
  }

  stop(conversationKey: string): boolean {
    const active = this.turns.get(conversationKey);
    if (active === undefined) {
      return false;
    }
    active.controller.abort(new Error("stop_requested"));
    return true;
  }

  finish(conversationKey: string, correlationId: string): void {
    const active = this.turns.get(conversationKey);
    if (active?.correlationId !== correlationId) {
      return;
    }
    this.turns.delete(conversationKey);
    active.resolveDone();
  }

  abortAll(): void {
    for (const active of this.turns.values()) {
      active.controller.abort(new Error("shutdown"));
    }
  }

  async waitForIdle(timeoutMs: number): Promise<boolean> {
    const pending = [...this.turns.values()].map((turn) => turn.done);
    if (pending.length === 0) {
      return true;
    }
    let timeout: NodeJS.Timeout | undefined;
    const timedOut = new Promise<false>((resolve) => {
      timeout = setTimeout(() => resolve(false), timeoutMs);
    });
    const completed = Promise.all(pending).then(() => true as const);
    const result = await Promise.race([completed, timedOut]);
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
    return result;
  }
}
