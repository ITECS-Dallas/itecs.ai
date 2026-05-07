import { NextRequest, NextResponse } from "next/server";
import {
  createAccessCookieToken,
  getProposalConfig,
  proposalAccessCookieMaxAge,
  proposalCookieName,
  verifyProposalToken,
} from "@/lib/proposals/access";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") || "";
  const payload = verifyProposalToken(token, "magic-link");

  if (!payload) {
    return NextResponse.redirect(new URL("/p", request.url));
  }

  const proposal = getProposalConfig(payload.slug);

  if (!proposal) {
    return NextResponse.redirect(new URL("/p", request.url));
  }

  const destination = new URL(`/p/${proposal.slug}`, request.url);
  const response = NextResponse.redirect(destination);
  const isSecureRequest =
    request.headers.get("x-forwarded-proto") === "https" ||
    request.nextUrl.protocol === "https:";

  response.cookies.set({
    name: proposalCookieName(proposal.slug),
    value: createAccessCookieToken(proposal.slug, payload.email),
    httpOnly: true,
    sameSite: "lax",
    secure: isSecureRequest,
    path: "/",
    maxAge: proposalAccessCookieMaxAge(),
  });

  return response;
}
