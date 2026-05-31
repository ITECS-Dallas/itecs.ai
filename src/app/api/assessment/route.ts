import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email/graphMailer";
import { validateTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

type AssessmentPayload = {
  name?: unknown;
  workEmail?: unknown;
  company?: unknown;
  employeeRange?: unknown;
  topAIGoal?: unknown;
  sourcePath?: unknown;
  turnstileToken?: unknown;
  website?: unknown;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;

const submissionBuckets = new Map<
  string,
  { windowStartedAt: number; count: number }
>();

function normalizeValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value).replace(/\u0000/g, "").trim();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getIpAddress(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "Unavailable"
  );
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = submissionBuckets.get(key);

  if (!current || now - current.windowStartedAt > RATE_LIMIT_WINDOW_MS) {
    submissionBuckets.set(key, { windowStartedAt: now, count: 1 });
    return true;
  }

  if (current.count >= MAX_SUBMISSIONS_PER_WINDOW) {
    return false;
  }

  current.count += 1;
  return true;
}

function collectValidationErrors(payload: AssessmentPayload) {
  const fields = {
    name: normalizeValue(payload.name),
    workEmail: normalizeValue(payload.workEmail),
    company: normalizeValue(payload.company),
    employeeRange: normalizeValue(payload.employeeRange),
    topAIGoal: normalizeValue(payload.topAIGoal),
  };
  const missing = Object.entries(fields)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (!isValidEmail(fields.workEmail)) {
    missing.push("valid workEmail");
  }

  return { fields, missing };
}

export async function POST(request: NextRequest) {
  let payload: AssessmentPayload;

  try {
    payload = (await request.json()) as AssessmentPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }

  if (normalizeValue(payload.website)) {
    return NextResponse.json({ message: "Assessment request received." });
  }

  const ipAddress = getIpAddress(request);

  if (!checkRateLimit(ipAddress)) {
    return NextResponse.json(
      { message: "Too many assessment attempts. Please try again later." },
      { status: 429 },
    );
  }

  const { fields, missing } = collectValidationErrors(payload);

  if (missing.length) {
    return NextResponse.json(
      {
        message:
          "Please include your name, work email, company, employee range, and top AI goal.",
      },
      { status: 400 },
    );
  }

  const turnstileToken = normalizeValue(payload.turnstileToken);

  if (!turnstileToken) {
    return NextResponse.json(
      { message: "Please complete the verification check before submitting." },
      { status: 400 },
    );
  }

  try {
    const turnstile = await validateTurnstileToken(turnstileToken, ipAddress);

    if (!turnstile.success) {
      console.warn("Turnstile validation rejected assessment submission", {
        sourcePath: normalizeValue(payload.sourcePath) || "/assessment",
        errorCodes: turnstile.errorCodes,
      });

      return NextResponse.json(
        { message: "Verification failed. Please refresh and try again." },
        { status: 400 },
      );
    }

    await sendContactEmail({
      formName: "AI Readiness Assessment",
      sourcePath: normalizeValue(payload.sourcePath) || "/assessment",
      submittedAt: new Date().toISOString(),
      fields: [
        { label: "Name", value: fields.name },
        { label: "Work Email", value: fields.workEmail },
        { label: "Company", value: fields.company },
        { label: "Employee Range", value: fields.employeeRange },
        { label: "Top AI Goal", value: fields.topAIGoal },
      ],
      replyToEmail: fields.workEmail,
      metadata: {
        ipAddress,
        userAgent: request.headers.get("user-agent") || "Unavailable",
      },
    });

    return NextResponse.json({
      message: "Assessment request received.",
      nextStep: "ITECS will route the follow-up by email.",
    });
  } catch (error) {
    console.error("Assessment form email failed", error);

    return NextResponse.json(
      { message: "We could not send your assessment. Please call us directly." },
      { status: 502 },
    );
  }
}
