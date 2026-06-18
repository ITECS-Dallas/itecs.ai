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

  useEffect(() => {
    if (consent !== "granted" || !hasAnalyticsConsent()) {
      return;
    }

    function handleCtaClick(event: MouseEvent) {
      if (event.defaultPrevented || !(event.target instanceof Element)) {
        return;
      }

      const target = event.target.closest<HTMLElement>(
        "[data-cta-type][data-cta-destination]",
      );

      if (!target) {
        return;
      }

      trackConversionEvent(ANALYTICS_EVENTS.ctaClick, {
        cta_type: target.dataset.ctaType,
        destination: target.dataset.ctaDestination,
        page_path: pagePath,
      });
    }

    document.addEventListener("click", handleCtaClick);

    return () => {
      document.removeEventListener("click", handleCtaClick);
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
          className="chamfer-md fixed bottom-4 left-4 right-4 z-[120] mx-auto max-w-2xl border border-[var(--border-strong)] bg-card p-3.5 shadow-e3 md:left-auto md:right-6 md:max-w-md"
          role="dialog"
          aria-label="Analytics consent"
          data-consent-key={ITECS_ANALYTICS_CONSENT}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="text-[13px] leading-relaxed text-ink-body">
              We use privacy-conscious analytics — no form details or personal
              identifiers are sent to analytics providers. See our{" "}
              <a
                href="https://itecsonline.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-itecs-blue underline underline-offset-2 hover:text-itecs-blue-bright"
              >
                Privacy Policy
              </a>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => chooseConsent("granted")}
                className="min-h-10 rounded-[10px] bg-itecs-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              >
                Allow
              </button>
              <button
                type="button"
                onClick={() => chooseConsent("denied")}
                className="min-h-10 rounded-[10px] border border-[var(--border-strong)] bg-card px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-itecs-steel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
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
