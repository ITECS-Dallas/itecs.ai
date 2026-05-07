import { NextRequest, NextResponse } from "next/server";
import { sendGraphEmail } from "@/lib/email/graphMailer";
import {
  createMagicLinkToken,
  getProposalConfig,
  isProposalEmailAllowed,
  proposalMagicLinkTtlMinutes,
} from "@/lib/proposals/access";

export const runtime = "nodejs";

type AccessRequestPayload = {
  slug?: unknown;
  email?: unknown;
};

function normalizeValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildAccessEmailHtml(input: {
  title: string;
  greeting: string;
  heroImageUrl: string;
  magicLink: string;
}) {
  return `<!doctype html>
    <html>
      <body style="margin:0;background:#030712;color:#e5edf7;font-family:Arial,Helvetica,sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#030712;padding:28px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;background:#07111f;border:1px solid #173247;border-radius:18px;overflow:hidden;">
                <tr>
                  <td style="padding:26px 30px 18px;background:#020711;border-bottom:1px solid #173247;">
                    <img src="https://itecs.ai/images/logos/itecs-horizontal.svg" width="150" alt="ITECS" style="display:block;border:0;max-width:150px;height:auto;" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="${escapeHtml(input.heroImageUrl)}" width="720" alt="" style="display:block;width:100%;max-width:720px;height:auto;border:0;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding:34px 30px 12px;">
                    <div style="color:#22d3ee;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:14px;">Private Proposal Access</div>
                    <h1 style="margin:0;color:#f8fafc;font-size:30px;line-height:1.2;font-weight:400;">${escapeHtml(input.title)}</h1>
                    <p style="margin:18px 0 0;color:#a8b3c7;font-size:16px;line-height:1.7;">${escapeHtml(input.greeting)}</p>
                    <p style="margin:12px 0 0;color:#a8b3c7;font-size:16px;line-height:1.7;">Use the button below to open your private proposal link. This link is valid for ${proposalMagicLinkTtlMinutes()} minutes.</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:22px 30px 34px;">
                    <a href="${escapeHtml(input.magicLink)}" style="display:inline-block;background:#22d3ee;color:#03111d;text-decoration:none;border-radius:10px;padding:15px 24px;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Open Private Proposal</a>
                    <div style="margin-top:16px;color:#7f8ba3;font-size:13px;line-height:1.6;word-break:break-all;">${escapeHtml(input.magicLink)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;
}

export async function POST(request: NextRequest) {
  let payload: AccessRequestPayload;

  try {
    payload = (await request.json()) as AccessRequestPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }

  const slug = normalizeValue(payload.slug);
  const email = normalizeValue(payload.email).toLowerCase();
  const proposal = getProposalConfig(slug);

  if (!proposal) {
    return NextResponse.json({ message: "Proposal not found." }, { status: 404 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Please enter a valid business email address." },
      { status: 400 },
    );
  }

  if (isProposalEmailAllowed(proposal, email)) {
    const token = createMagicLinkToken(slug, email);
    const magicLink = new URL("/api/proposals/access/verify", request.url);
    magicLink.searchParams.set("token", token);

    await sendGraphEmail({
      from: proposal.fromEmail,
      to: email,
      subject: `${proposal.clientName} Private Proposal Access Link`,
      html: buildAccessEmailHtml({
        title: proposal.title,
        greeting: proposal.clientGreeting,
        heroImageUrl: proposal.heroImageUrl,
        magicLink: magicLink.toString(),
      }),
      saveToSentItems: true,
    });
  }

  return NextResponse.json({
    message:
      "If that email is approved for this proposal, an access link has been sent.",
  });
}
