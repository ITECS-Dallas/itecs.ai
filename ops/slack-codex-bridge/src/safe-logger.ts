import { LogLevel, type Logger } from "@slack/logger";

type LogWriter = (line: string) => void;

const severity: Record<LogLevel, number> = {
  [LogLevel.DEBUG]: 10,
  [LogLevel.INFO]: 20,
  [LogLevel.WARN]: 30,
  [LogLevel.ERROR]: 40,
};

export class SafeMetadataLogger implements Logger {
  private level = LogLevel.INFO;
  private name = "itecs-ai-codex-slack";

  constructor(private readonly write: LogWriter = console.error) {}

  debug(...message: unknown[]): void {
    void message;
    this.emit(LogLevel.DEBUG);
  }

  info(...message: unknown[]): void {
    void message;
    this.emit(LogLevel.INFO);
  }

  warn(...message: unknown[]): void {
    void message;
    this.emit(LogLevel.WARN);
  }

  error(...message: unknown[]): void {
    void message;
    this.emit(LogLevel.ERROR);
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }

  getLevel(): LogLevel {
    return this.level;
  }

  setName(name: string): void {
    this.name = name.replaceAll(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 64);
  }

  lifecycle(event: string): void {
    const safeEvent = event.replaceAll(/[^a-z0-9_.-]/g, "_").slice(0, 64);
    this.write(
      JSON.stringify({
        level: "info",
        logger: this.name,
        event: safeEvent,
        at: new Date().toISOString(),
      }),
    );
  }

  private emit(level: LogLevel): void {
    if (severity[level] < severity[this.level]) {
      return;
    }
    this.write(
      JSON.stringify({
        level,
        logger: this.name,
        event: "sdk_log",
        at: new Date().toISOString(),
      }),
    );
  }
}
