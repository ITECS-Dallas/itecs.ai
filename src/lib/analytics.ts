"use client";

export const GA_MEASUREMENT_ID = "G-J49FJ2JM1N";
export const ITECS_ANALYTICS_CONSENT = "itecs.analytics.consent";

export const ANALYTICS_EVENTS = {
  ctaClick: "cta_click",
  formStart: "form_start",
  formComplete: "form_complete",
  scrollDepth: "scroll_depth",
} as const;

type AnalyticsConsent = "granted" | "denied";
type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const allowedPayloadKeys = new Set([
  "cta_type",
  "destination",
  "form_id",
  "page_path",
  "percent",
  "step",
]);

function getStoredConsent(): AnalyticsConsent | null {
  try {
    const value = window.localStorage.getItem(ITECS_ANALYTICS_CONSENT);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function honorsGlobalPrivacyControl() {
  const navigatorWithPrivacy = navigator as Navigator & {
    globalPrivacyControl?: boolean;
  };

  return navigatorWithPrivacy.globalPrivacyControl === true;
}

function sanitizePayload(payload: AnalyticsPayload = {}) {
  return Object.fromEntries(
    Object.entries(payload).filter(([key, value]) => {
      if (!allowedPayloadKeys.has(key)) {
        return false;
      }

      return (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      );
    }),
  );
}

export function hasAnalyticsConsent() {
  if (typeof window === "undefined" || honorsGlobalPrivacyControl()) {
    return false;
  }

  return getStoredConsent() === "granted";
}

export function isPrivacyRestricted() {
  return typeof window === "undefined" || honorsGlobalPrivacyControl();
}

// Returns a queue-safe gtag. Google Consent Mode v2 governs what actually
// gets stored/sent — events fired while analytics_storage is denied go out
// as cookieless pings. GPC users get nothing at all.
export function ensureGtag() {
  if (isPrivacyRestricted()) {
    return null;
  }

  if (typeof window.gtag !== "function") {
    window.dataLayer = window.dataLayer || [];
    // gtag.js only replays queued commands pushed as `arguments` objects.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }

  return window.gtag;
}

export function setAnalyticsConsent(value: AnalyticsConsent) {
  window.localStorage.setItem(ITECS_ANALYTICS_CONSENT, value);
}

export function getAnalyticsConsent() {
  if (typeof window === "undefined") {
    return null;
  }

  return getStoredConsent();
}

export function trackConversionEvent(
  eventName: AnalyticsEventName,
  payload: AnalyticsPayload = {},
) {
  const gtag = ensureGtag();

  if (!gtag) {
    return;
  }

  gtag("event", eventName, {
    event_category: "conversion",
    ...sanitizePayload(payload),
  });
}
