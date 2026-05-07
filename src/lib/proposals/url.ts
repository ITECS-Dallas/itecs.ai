import { NextRequest } from "next/server";

export function getPublicRequestBaseUrl(request: NextRequest) {
  const protocol =
    request.headers.get("x-forwarded-proto") ||
    request.nextUrl.protocol.replace(":", "") ||
    "https";
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    request.nextUrl.host;

  return `${protocol}://${host}`;
}
