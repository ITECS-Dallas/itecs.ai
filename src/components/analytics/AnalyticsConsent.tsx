"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import {
  ANALYTICS_EVENTS,
  GA_MEASUREMENT_ID,
  getAnalyticsConsent,
  hasAnalyticsConsent,
  ITECS_ANALYTICS_CONSENT,
  setAnalyticsConsent,
  trackConversionEvent,
} from "@/lib/analytics";

type ConsentState = "granted" | "denied" | null;
const CONSENT_CHANGE_EVENT = "itecs:analytics-consent";

function getServerConsentSnapshot(): ConsentState {
  return "denied";
}

function getClientConsentSnapshot(): ConsentState {
  return getAnalyticsConsent();
}

function subscribeToConsentChanges(callback: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function AnalyticsConsent() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribeToConsentChanges,
    getClientConsentSnapshot,
    getServerConsentSnapshot,
  );
  const pagePath = useMemo(() => pathname || "/", [pathname]);

  useEffect(() => {
    if (consent !== "granted" || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: pagePath,
      send_page_view: true,
    });
  }, [consent, pagePath]);

  useEffect(() => {
    if (consent !== "granted" || !hasAnalyticsConsent()) {
      return;
    }

    const sent = new Set<number>();
    const thresholds = [25, 50, 75, 100];

    function handleScroll() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent =
        scrollable <= 0
          ? 100
          : Math.min(100, Math.round((window.scrollY / scrollable) * 100));

      for (const threshold of thresholds) {
        if (percent >= threshold && !sent.has(threshold)) {
          sent.add(threshold);
          trackConversionEvent(ANALYTICS_EVENTS.scrollDepth, {
            percent: threshold,
            page_path: pagePath,
          });
        }
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [consent, pagePath]);

  function chooseConsent(value: "granted" | "denied") {
    setAnalyticsConsent(value);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  }

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="itecs-analytics-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
            `}
          </Script>
        </>
      ) : null}

      {consent === null ? (
        <div
          className="fixed bottom-4 left-4 right-4 z-[120] mx-auto max-w-3xl rounded-lg border border-[var(--border-strong)] bg-bg-surface p-4 shadow-e3 [box-shadow:var(--elev-1-inset),var(--elev-3)] md:left-auto md:right-6 md:max-w-xl"
          role="dialog"
          aria-label="Analytics consent"
          data-consent-key={ITECS_ANALYTICS_CONSENT}
        >
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <p className="text-sm leading-relaxed text-text-secondary">
              ITECS uses privacy-conscious site analytics to understand which
              pages and calls to action are useful. We do not send form details
              or personal identifiers to analytics providers.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row md:justify-end">
              <button
                type="button"
                onClick={() => chooseConsent("granted")}
                className="min-h-11 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-text-onaccent transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              >
                Allow analytics
              </button>
              <button
                type="button"
                onClick={() => chooseConsent("denied")}
                className="min-h-11 rounded-md border border-[var(--border-strong)] bg-bg-elevated px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:border-[var(--text-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
