import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email/graphMailer";

export const runtime = "nodejs";

type ContactPayload = {
  formName?: unknown;
  sourcePath?: unknown;
  website?: unknown;
  fields?: unknown;
  [key: string]: unknown;
};

const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  company: "Company",
  email: "Email",
  phone: "Phone",
  message: "Message",
  service: "Service Interest",
};

function normalizeValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map(normalizeValue).filter(Boolean).join(", ");
  }

  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value).replace(/\u0000/g, "").trim();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
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

function collectFields(payload: ContactPayload) {
  const source = isRecord(payload.fields) ? payload.fields : payload;
  const ignored = new Set(["fields", "formName", "sourcePath", "website"]);

  return Object.entries(source)
    .filter(([key]) => !ignored.has(key))
    .map(([key, value]) => ({
      label: FIELD_LABELS[key] || key,
      value: normalizeValue(value),
    }))
    .filter((field) => field.value.length > 0);
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }

  if (normalizeValue(payload.website)) {
    return NextResponse.json({ message: "Message received." });
  }

  const fields = collectFields(payload);
  const email = fields.find((field) => field.label === "Email")?.value || "";
  const name = fields.find((field) => field.label === "Name")?.value || "";
  const message = fields.find((field) => field.label === "Message")?.value || "";

  if (!name || !isValidEmail(email) || !message) {
    return NextResponse.json(
      { message: "Please include your name, email address, and message." },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail({
      formName: normalizeValue(payload.formName) || "Website Contact Form",
      sourcePath: normalizeValue(payload.sourcePath) || "/contact",
      submittedAt: new Date().toISOString(),
      fields,
      replyToEmail: email,
      metadata: {
        ipAddress: getIpAddress(request),
        userAgent: request.headers.get("user-agent") || "Unavailable",
      },
    });

    return NextResponse.json({ message: "Message sent." });
  } catch (error) {
    console.error("Contact form email failed", error);

    return NextResponse.json(
      { message: "We could not send your message. Please call us directly." },
      { status: 502 },
    );
  }
}

