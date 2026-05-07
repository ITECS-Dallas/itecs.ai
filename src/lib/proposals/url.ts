import { NextRequest } from "next/server";
import { SITE_CONFIG } from "@/lib/constants";

export function getPublicRequestBaseUrl(request: NextRequest) {
  const canonicalUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || SITE_CONFIG.url;
  const requestHost =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    request.nextUrl.host;
  const protocol =
    request.headers.get("x-forwarded-proto") ||
    request.nextUrl.protocol.replace(":", "") ||
    "https";

  if (
    requestHost?.startsWith("localhost") ||
    requestHost?.startsWith("127.0.0.1")
  ) {
    return `${protocol}://${requestHost}`;
  }

  return canonicalUrl;
}
