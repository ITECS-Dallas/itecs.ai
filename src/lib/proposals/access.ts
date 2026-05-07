import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const MAGIC_LINK_TTL_SECONDS = 30 * 60;
const ACCESS_COOKIE_TTL_SECONDS = 7 * 24 * 60 * 60;

type ProposalTokenPurpose = "magic-link" | "access-cookie";

type ProposalTokenPayload = {
  slug: string;
  email: string;
  purpose: ProposalTokenPurpose;
  exp: number;
};

export type ProposalAccessConfig = {
  slug: string;
  title: string;
  clientName: string;
  clientGreeting: string;
  accessEyebrow: string;
  accessHeading: string;
  accessDescription: string;
  allowedEmails: readonly string[];
  allowedDomains: readonly string[];
  fromEmail: string;
  heroImageUrl: string;
  pdfFileName: string;
};

export const PROPOSAL_ACCESS: Record<string, ProposalAccessConfig> = {
  "hasen-claude-work-order-phase-1-9ee3f0": {
    slug: "hasen-claude-work-order-phase-1-9ee3f0",
    title: "Hasen Holdings Phase 1 Claude AI Work Order Drafting Workflow",
    clientName: "Hasen Holdings",
    clientGreeting: "Hi Brenda,",
    accessEyebrow: "Private Proposal",
    accessHeading: "Check your email to open the Hasen Holdings proposal.",
    accessDescription:
      "Enter your business email and we will send a private access link for the Phase 1 Claude AI Work Order Drafting Workflow proposal.",
    allowedEmails: [
      "bdesmot@itecsonline.com",
      "mdunbar@itecsmsp.com",
      "jemerle@itecsmsp.com",
    ],
    allowedDomains: ["hasenconstruction.com", "itecsonline.com", "itecsmsp.com"],
    fromEmail: "bdesmot@itecsonline.com",
    heroImageUrl:
      "https://itecs.ai/images/proposals/hasen-claude-work-order-hero.png",
    pdfFileName: "hasen-phase-1-claude-work-order-proposal-v3.pdf",
  },
};

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function base64UrlEncode(value: string | Buffer) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signValue(value: string) {
  return createHmac("sha256", requiredEnv("PROPOSAL_MAGIC_LINK_SECRET"))
    .update(value)
    .digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function createProposalToken(
  slug: string,
  email: string,
  purpose: ProposalTokenPurpose,
  ttlSeconds: number,
) {
  const payload: ProposalTokenPayload = {
    slug,
    email: email.toLowerCase(),
    purpose,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signValue(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyProposalToken(
  token: string,
  purpose: ProposalTokenPurpose,
) {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature || !safeEqual(signValue(encodedPayload), signature)) {
    return null;
  }

  let payload: ProposalTokenPayload;

  try {
    payload = JSON.parse(base64UrlDecode(encodedPayload)) as ProposalTokenPayload;
  } catch {
    return null;
  }

  if (
    payload.purpose !== purpose ||
    !payload.slug ||
    !payload.email ||
    payload.exp < Math.floor(Date.now() / 1000)
  ) {
    return null;
  }

  return payload;
}

export function getProposalConfig(slug: string) {
  return PROPOSAL_ACCESS[slug] || null;
}

export function isProposalEmailAllowed(
  proposal: ProposalAccessConfig,
  email: string,
) {
  const normalized = email.trim().toLowerCase();
  const domain = normalized.split("@")[1] || "";

  return (
    proposal.allowedEmails.includes(normalized) ||
    proposal.allowedDomains.includes(domain)
  );
}

export function createMagicLinkToken(slug: string, email: string) {
  return createProposalToken(slug, email, "magic-link", MAGIC_LINK_TTL_SECONDS);
}

export function createAccessCookieToken(slug: string, email: string) {
  return createProposalToken(
    slug,
    email,
    "access-cookie",
    ACCESS_COOKIE_TTL_SECONDS,
  );
}

export function proposalCookieName(slug: string) {
  return `proposal_access_${slug.replace(/[^a-z0-9]/gi, "_")}`;
}

export async function hasProposalAccess(slug: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get(proposalCookieName(slug))?.value;

  if (!token) {
    return false;
  }

  const payload = verifyProposalToken(token, "access-cookie");

  return payload?.slug === slug;
}

export function proposalAccessCookieMaxAge() {
  return ACCESS_COOKIE_TTL_SECONDS;
}

export function proposalMagicLinkTtlMinutes() {
  return Math.floor(MAGIC_LINK_TTL_SECONDS / 60);
}
