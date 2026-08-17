import { constants as fsConstants } from "node:fs";
import { access, mkdir, realpath, stat } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { execFile } from "node:child_process";

import type { BridgeConfig } from "./config.js";
import { EXPECTED } from "./constants.js";
import { CodexSdkDriver, sanitizedCodexEnvironment } from "./codex-driver.js";
import { SafeError } from "./errors.js";
import { AtomicSessionStore } from "./session-store.js";

const execFileAsync = promisify(execFile);

async function ensureParentWritable(filePath: string): Promise<void> {
  const parent = path.dirname(filePath);
  await mkdir(parent, { recursive: true, mode: 0o700 });
  await access(parent, fsConstants.R_OK | fsConstants.W_OK | fsConstants.X_OK);
}

async function runPrerequisite(
  executable: string,
  args: string[],
  config: BridgeConfig,
): Promise<string> {
  const { stdout } = await execFileAsync(executable, args, {
    cwd: config.workingDirectory,
    env: sanitizedCodexEnvironment(process.env),
    timeout: 15_000,
    maxBuffer: 64 * 1024,
  });
  return stdout.trim();
}

export async function runPreflight(
  config: BridgeConfig,
  write: (line: string) => void = console.log,
): Promise<void> {
  const nodeMajor = Number(process.versions.node.split(".")[0]);
  if (!Number.isInteger(nodeMajor) || nodeMajor < 20) {
    throw new SafeError(
      "node_version_unsupported",
      "Node.js 20 or newer is required",
    );
  }
  write("preflight: configuration binding ok");
  write("preflight: Slack token prefixes ok");

  const workingDirectoryStat = await stat(config.workingDirectory);
  if (!workingDirectoryStat.isDirectory()) {
    throw new SafeError(
      "working_directory_invalid",
      "Codex working directory is not a directory",
    );
  }
  const resolvedWorkingDirectory = await realpath(config.workingDirectory);
  if (resolvedWorkingDirectory !== EXPECTED.workingDirectory) {
    throw new SafeError(
      "working_directory_mismatch",
      "Codex working directory resolves outside the authorized root",
    );
  }
  await access(
    config.workingDirectory,
    fsConstants.R_OK | fsConstants.W_OK | fsConstants.X_OK,
  );
  const gitStatus = await runPrerequisite(
    "git",
    ["rev-parse", "--is-inside-work-tree"],
    config,
  );
  if (gitStatus !== "true") {
    throw new SafeError(
      "working_directory_not_git",
      "Codex working directory is not a Git worktree",
    );
  }
  write("preflight: working directory ok");

  await ensureParentWritable(config.stateFile);
  await AtomicSessionStore.open(config.stateFile);
  await ensureParentWritable(config.auditFile);
  await mkdir(config.tempRoot, { recursive: true, mode: 0o700 });
  await access(
    config.tempRoot,
    fsConstants.R_OK | fsConstants.W_OK | fsConstants.X_OK,
  );
  write("preflight: state, audit, and temporary paths ok");

  new CodexSdkDriver();
  const codexVersion = await runPrerequisite("codex", ["--version"], config);
  await runPrerequisite("codex", ["login", "status"], config);
  write(`preflight: Codex SDK and CLI ok (${codexVersion})`);
  write("preflight: PASS");
}
