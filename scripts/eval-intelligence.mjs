#!/usr/bin/env node

import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_BASE_URL = "http://127.0.0.1:3000";
const DEFAULT_REPORT_PATH = ".eval-results/intelligence-eval.json";
const DEFAULT_TIMEOUT_MS = 120_000;
const FIXTURE_PATH = fileURLToPath(
  new URL("../evals/intelligence-chatbot.v1.json", import.meta.url),
);
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);
const EVENT_TYPES = new Set([
  "status",
  "delta",
  "resources",
  "suggestions",
  "refusal",
  "unavailable",
  "done",
  "error",
]);

function usage() {
  return `ITECS Intelligence localhost evaluation

Usage:
  npm run eval:intelligence -- --run [options]
  npm run eval:intelligence -- --list

Options:
  --run                 Explicitly opt in to live local AI requests.
  --base-url <url>      Loopback HTTP origin (default: ${DEFAULT_BASE_URL}).
  --case <id>           Run one case; repeat to select multiple cases.
  --report [path]       Write a gitignored JSON report (default: ${DEFAULT_REPORT_PATH}).
  --timeout-ms <ms>     Per-case timeout (default: ${DEFAULT_TIMEOUT_MS}).
  --list                Validate the fixture and list case IDs without HTTP calls.
  --help                Show this help without HTTP calls.

Safety:
  Non-loopback hosts, HTTPS, embedded credentials, and redirects are rejected.
  Cases run sequentially and use only the committed public-content prompts.`;
}

function parseArgs(argv) {
  const options = {
    baseUrl: DEFAULT_BASE_URL,
    caseIds: [],
    help: false,
    list: false,
    reportPath: null,
    run: false,
    timeoutMs: DEFAULT_TIMEOUT_MS,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === "--help" || argument === "-h") {
      options.help = true;
    } else if (argument === "--run") {
      options.run = true;
    } else if (argument === "--list") {
      options.list = true;
    } else if (argument === "--base-url") {
      options.baseUrl = requiredValue(argv, ++index, argument);
    } else if (argument === "--case") {
      options.caseIds.push(requiredValue(argv, ++index, argument));
    } else if (argument === "--timeout-ms") {
      const value = Number(requiredValue(argv, ++index, argument));
      if (!Number.isInteger(value) || value < 1_000 || value > 300_000) {
        throw new Error("--timeout-ms must be an integer from 1000 to 300000.");
      }
      options.timeoutMs = value;
    } else if (argument === "--report") {
      const candidate = argv[index + 1];
      if (candidate && !candidate.startsWith("--")) {
        options.reportPath = candidate;
        index += 1;
      } else {
        options.reportPath = DEFAULT_REPORT_PATH;
      }
    } else {
      throw new Error(`Unknown option: ${argument}`);
    }
  }

  return options;
}

function requiredValue(argv, index, option) {
  const value = argv[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`${option} requires a value.`);
  }
  return value;
}

function localBaseUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("--base-url must be a valid URL.");
  }

  if (
    url.protocol !== "http:" ||
    !LOOPBACK_HOSTS.has(url.hostname) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "Refusing non-local target: use a loopback HTTP origin with no credentials, path, query, or fragment.",
    );
  }

  return url;
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validateFixture(fixture) {
  if (
    !isRecord(fixture) ||
    fixture.version !== 1 ||
    !Number.isInteger(fixture.expectedCaseCount) ||
    !Array.isArray(fixture.cases) ||
    fixture.cases.length !== fixture.expectedCaseCount ||
    fixture.expectedCaseCount !== 24 ||
    fixture.endpoint !== "/api/intelligence/stream" ||
    typeof fixture.refusalText !== "string" ||
    !fixture.refusalText
  ) {
    throw new Error("Evaluation fixture metadata is invalid; expected exactly 24 version-1 cases.");
  }

  const ids = new Set();
  for (const testCase of fixture.cases) {
    if (
      !isRecord(testCase) ||
      typeof testCase.id !== "string" ||
      !/^[a-z0-9-]+$/.test(testCase.id) ||
      ids.has(testCase.id) ||
      typeof testCase.category !== "string" ||
      typeof testCase.prompt !== "string" ||
      !testCase.prompt.trim() ||
      typeof testCase.pagePath !== "string" ||
      !testCase.pagePath.startsWith("/") ||
      !Array.isArray(testCase.history) ||
      !isRecord(testCase.expected) ||
      !["answer", "refusal"].includes(testCase.expected.disposition)
    ) {
      throw new Error(`Evaluation fixture contains an invalid case near ${testCase?.id ?? "unknown"}.`);
    }

    for (const message of testCase.history) {
      if (
        !isRecord(message) ||
        !["user", "assistant"].includes(message.role) ||
        typeof message.content !== "string" ||
        !message.content.trim()
      ) {
        throw new Error(`Case ${testCase.id} contains invalid conversation history.`);
      }
    }

    const patterns = testCase.expected.mustMatch ?? [];
    if (!Array.isArray(patterns) || patterns.some((pattern) => typeof pattern !== "string")) {
      throw new Error(`Case ${testCase.id} has invalid mustMatch patterns.`);
    }
    for (const pattern of patterns) {
      try {
        new RegExp(pattern, "iu");
      } catch {
        throw new Error(`Case ${testCase.id} has an invalid regular expression: ${pattern}`);
      }
    }

    ids.add(testCase.id);
  }

  return fixture;
}

async function loadFixture() {
  const raw = await readFile(FIXTURE_PATH, "utf8");
  return validateFixture(JSON.parse(raw));
}

function selectCases(fixture, requestedIds) {
  if (!requestedIds.length) return fixture.cases;

  const requested = new Set(requestedIds);
  const selected = fixture.cases.filter((testCase) => requested.has(testCase.id));
  const missing = [...requested].filter(
    (id) => !fixture.cases.some((testCase) => testCase.id === id),
  );

  if (missing.length) {
    throw new Error(`Unknown case ID${missing.length === 1 ? "" : "s"}: ${missing.join(", ")}`);
  }
  return selected;
}

async function readSse(response) {
  if (!response.body) throw new Error("Response has no stream body.");

  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("text/event-stream")) {
    throw new Error(`Expected text/event-stream, received ${contentType || "no content type"}.`);
  }

  const decoder = new TextDecoder();
  const events = [];
  let buffer = "";

  const parseFrame = (rawFrame) => {
    const frame = rawFrame.trim();
    if (!frame) return;

    const eventLine = frame.split("\n").find((line) => line.startsWith("event:"));
    const dataLines = frame
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart());

    if (!eventLine || !dataLines.length) throw new Error("Malformed SSE frame.");
    const eventName = eventLine.slice(6).trim();
    if (!EVENT_TYPES.has(eventName)) throw new Error(`Unknown SSE event: ${eventName}`);

    let payload;
    try {
      payload = JSON.parse(dataLines.join("\n"));
    } catch {
      throw new Error(`SSE event ${eventName} contains invalid JSON.`);
    }
    if (!isRecord(payload) || payload.type !== eventName) {
      throw new Error(`SSE event ${eventName} has a mismatched payload type.`);
    }
    events.push(payload);
  };

  for await (const chunk of response.body) {
    buffer += decoder.decode(chunk, { stream: true }).replace(/\r\n/g, "\n");
    let boundary = buffer.indexOf("\n\n");
    while (boundary >= 0) {
      parseFrame(buffer.slice(0, boundary));
      buffer = buffer.slice(boundary + 2);
      boundary = buffer.indexOf("\n\n");
    }
  }

  buffer += decoder.decode();
  if (buffer.trim()) parseFrame(buffer);

  const doneIndexes = events
    .map((event, index) => (event.type === "done" ? index : -1))
    .filter((index) => index >= 0);
  if (doneIndexes.length !== 1 || doneIndexes[0] !== events.length - 1) {
    throw new Error("SSE stream must end with exactly one done event.");
  }
  if (events.some((event) => event.type === "error")) {
    throw new Error("SSE stream returned an error event.");
  }

  return events;
}

function evaluateEvents(testCase, fixture, events) {
  const deltas = events.filter((event) => event.type === "delta");
  const refusals = events.filter((event) => event.type === "refusal");
  const unavailable = events.filter((event) => event.type === "unavailable");
  const answer = deltas.map((event) => event.text).join("").trim();
  const responseText =
    answer || refusals.map((event) => event.text).join(" ").trim() || unavailable.map((event) => event.text).join(" ").trim();
  const failures = [];

  if (testCase.expected.disposition === "answer") {
    if (!answer || refusals.length || unavailable.length) {
      failures.push(
        `expected answer, received ${refusals.length ? "refusal" : unavailable.length ? "unavailable" : "empty output"}`,
      );
    }
    for (const pattern of testCase.expected.mustMatch ?? []) {
      if (!new RegExp(pattern, "iu").test(answer)) {
        failures.push(`missing anchor /${pattern}/iu`);
      }
    }
  } else {
    if (refusals.length !== 1 || deltas.length || unavailable.length) {
      failures.push("expected one refusal event with no answer or unavailable event");
    }
    if (responseText !== fixture.refusalText) {
      failures.push("refusal text did not match the fixed public refusal");
    }
  }

  return { answer: responseText, failures };
}

async function runCase(testCase, fixture, endpoint, timeoutMs) {
  const startedAt = Date.now();
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: testCase.prompt,
        history: testCase.history,
        sessionId: randomUUID(),
        pagePath: testCase.pagePath,
      }),
      redirect: "error",
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const events = await readSse(response);
    const evaluation = evaluateEvents(testCase, fixture, events);
    return {
      id: testCase.id,
      category: testCase.category,
      prompt: testCase.prompt,
      pagePath: testCase.pagePath,
      passed: evaluation.failures.length === 0,
      durationMs: Date.now() - startedAt,
      failures: evaluation.failures,
      answer: evaluation.answer,
      eventTypes: events.map((event) => event.type),
      resources: events
        .filter((event) => event.type === "resources")
        .flatMap((event) => event.resources ?? [])
        .map((resource) => ({ id: resource.id, href: resource.href })),
    };
  } catch (error) {
    return {
      id: testCase.id,
      category: testCase.category,
      prompt: testCase.prompt,
      pagePath: testCase.pagePath,
      passed: false,
      durationMs: Date.now() - startedAt,
      failures: [error instanceof Error ? error.message : "Unknown evaluation failure"],
      answer: "",
      eventTypes: [],
      resources: [],
    };
  }
}

async function writeReport(reportPath, report) {
  const resolved = path.resolve(process.cwd(), reportPath);
  await mkdir(path.dirname(resolved), { recursive: true });
  await writeFile(resolved, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  return resolved;
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    console.error("Run with --help for usage.");
    process.exitCode = 2;
    return;
  }

  if (options.help) {
    console.log(usage());
    return;
  }

  let fixture;
  try {
    fixture = await loadFixture();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 2;
    return;
  }

  if (options.list) {
    for (const testCase of fixture.cases) {
      console.log(`${testCase.id}\t${testCase.category}`);
    }
    console.log(`\n${fixture.cases.length} validated cases; no HTTP requests made.`);
    return;
  }

  if (!options.run) {
    console.error("No requests sent. Add --run to explicitly opt in, or use --help.");
    process.exitCode = 2;
    return;
  }

  let baseUrl;
  let cases;
  try {
    baseUrl = localBaseUrl(options.baseUrl);
    cases = selectCases(fixture, options.caseIds);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 2;
    return;
  }

  const endpoint = new URL(fixture.endpoint, baseUrl);
  console.log(
    `Running ${cases.length} ITECS Intelligence case${cases.length === 1 ? "" : "s"} sequentially against ${endpoint.origin}.`,
  );
  console.log("This opt-in run invokes the locally configured live AI provider.\n");

  const startedAt = new Date();
  const results = [];
  for (const [index, testCase] of cases.entries()) {
    const result = await runCase(testCase, fixture, endpoint, options.timeoutMs);
    results.push(result);
    const seconds = (result.durationMs / 1_000).toFixed(1);
    console.log(
      `[${String(index + 1).padStart(2, "0")}/${String(cases.length).padStart(2, "0")}] ${result.passed ? "PASS" : "FAIL"} ${result.id} (${seconds}s)`,
    );
    if (!result.passed) {
      for (const failure of result.failures.slice(0, 3)) console.log(`  - ${failure}`);
      if (result.failures.length > 3) {
        console.log(`  - ${result.failures.length - 3} more failure(s); use --report for details`);
      }
    }
  }

  const passed = results.filter((result) => result.passed).length;
  const failed = results.length - passed;
  const durationMs = Date.now() - startedAt.getTime();
  const report = {
    fixture: path.relative(process.cwd(), FIXTURE_PATH),
    fixtureVersion: fixture.version,
    generatedAt: new Date().toISOString(),
    target: endpoint.origin,
    sequential: true,
    summary: { total: results.length, passed, failed, durationMs },
    results,
  };

  if (options.reportPath) {
    try {
      const reportFile = await writeReport(options.reportPath, report);
      console.log(`\nReport: ${reportFile}`);
    } catch (error) {
      console.error(`\nCould not write report: ${error instanceof Error ? error.message : error}`);
      process.exitCode = 1;
      return;
    }
  }

  console.log(`\nSummary: ${passed}/${results.length} passed, ${failed} failed (${(durationMs / 1_000).toFixed(1)}s).`);
  if (failed) process.exitCode = 1;
}

await main();
