import { ActiveTurnRegistry } from "./active-turns.js";
import { MetadataAuditWriter } from "./audit.js";
import { BridgeService } from "./bridge.js";
import { CodexSdkDriver } from "./codex-driver.js";
import { loadConfig } from "./config.js";
import { LIMITS } from "./constants.js";
import { EventDeduplicator } from "./dedupe.js";
import { SafeError } from "./errors.js";
import { runPreflight } from "./preflight.js";
import { SafeMetadataLogger } from "./safe-logger.js";
import { AtomicSessionStore } from "./session-store.js";
import { createSlackApp } from "./slack-app.js";
import { BoundedSlackFileStager } from "./slack-files.js";

function removeBootstrapSecrets(): void {
  delete process.env.OP_SERVICE_ACCOUNT_TOKEN;
  delete process.env.OP_CONNECT_TOKEN;
  delete process.env.CREDENTIALS_DIRECTORY;
  for (const name of Object.keys(process.env)) {
    if (name.startsWith("OP_SESSION_")) {
      Reflect.deleteProperty(process.env, name);
    }
  }
}

async function main(): Promise<void> {
  const logger = new SafeMetadataLogger();
  try {
    const config = loadConfig(process.env);
    removeBootstrapSecrets();

    if (process.argv.includes("--check")) {
      await runPreflight(config);
      return;
    }

    const sessions = await AtomicSessionStore.open(config.stateFile);
    const audit = new MetadataAuditWriter(config.auditFile, config);
    const activeTurns = new ActiveTurnRegistry();
    const bridge = new BridgeService({
      config,
      sessions,
      audit,
      activeTurns,
      deduplicator: new EventDeduplicator(),
      files: new BoundedSlackFileStager(config.tempRoot),
      codex: new CodexSdkDriver(),
    });
    const app = createSlackApp({ config, bridge, logger });

    const authentication = await app.client.auth.test();
    if (authentication.team_id !== config.teamId) {
      throw new SafeError(
        "runtime_team_mismatch",
        "Slack bot token is bound to the wrong workspace",
      );
    }

    let shuttingDown = false;
    const shutdown = async (signal: string): Promise<void> => {
      if (shuttingDown) {
        return;
      }
      shuttingDown = true;
      logger.lifecycle(`shutdown_${signal.toLowerCase()}`);
      activeTurns.abortAll();
      await activeTurns.waitForIdle(LIMITS.shutdownTimeoutMs);
      await app.stop();
      logger.lifecycle("service_stopped");
    };

    process.once("SIGTERM", () => {
      void shutdown("SIGTERM").catch(() => {
        logger.error();
        process.exitCode = 1;
      });
    });
    process.once("SIGINT", () => {
      void shutdown("SIGINT").catch(() => {
        logger.error();
        process.exitCode = 1;
      });
    });

    await app.start();
    logger.lifecycle("service_started");
  } catch (error) {
    const code = error instanceof SafeError ? error.code : "unexpected";
    logger.lifecycle(`fatal_${code}`);
    process.exitCode = 1;
  }
}

await main();
