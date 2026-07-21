"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MessagesSquare } from "lucide-react";
import styles from "./intelligence-os.module.css";

const IntelligenceOS = dynamic(
  () => import("./IntelligenceOS").then((module) => module.IntelligenceOS),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#020914]/75 backdrop-blur-[3px]" role="status" aria-label="Loading Intelligence OS">
        <div className={`${styles.chamferSmall} border border-[#7fb4d8]/35 bg-[#061728] px-5 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#a9d5f1]`}>
          Initializing Intelligence OS<span className={styles.bootCursor}>_</span>
        </div>
      </div>
    ),
  },
);

function IntelligenceOSLauncher() {
  const launcherRef = useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [consentClearance, setConsentClearance] = useState<number | null>(null);

  useEffect(() => {
    let observedBanner: HTMLElement | null = null;
    const measure = () => {
      const banner = document.querySelector<HTMLElement>("[data-consent-key]");
      if (!banner) {
        setConsentClearance(null);
        return;
      }
      const rect = banner.getBoundingClientRect();
      setConsentClearance(Math.ceil(window.innerHeight - rect.top + 12));
    };
    const bannerObserver = new ResizeObserver(measure);
    const refreshBanner = () => {
      const banner = document.querySelector<HTMLElement>("[data-consent-key]");
      if (banner !== observedBanner) {
        bannerObserver.disconnect();
        observedBanner = banner;
        if (banner) bannerObserver.observe(banner);
      }
      measure();
    };
    const frame = window.requestAnimationFrame(refreshBanner);
    const mutationObserver = new MutationObserver(refreshBanner);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", measure);
    return () => {
      window.cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      bannerObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const launch = () => {
    const rect = launcherRef.current?.getBoundingClientRect();
    setOrigin({
      x: rect ? rect.left + rect.width / 2 : window.innerWidth - 40,
      y: rect ? rect.top + rect.height / 2 : window.innerHeight - 40,
    });
    setLoaded(true);
    setOpen(true);
  };

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={launch}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="intelligence-os-dialog"
        style={consentClearance === null ? undefined : { bottom: consentClearance }}
        className={`${styles.launcher} fixed bottom-4 right-4 z-[45] flex min-h-12 items-center gap-3 border border-[#004775] bg-[#0a1622] px-3.5 py-2 text-left text-white shadow-[0_14px_38px_rgba(10,22,34,.34)] transition-[transform,opacity,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#06314c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3288b6] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:bottom-6 sm:right-6 ${open ? "pointer-events-none translate-y-2 opacity-0" : "opacity-100"}`}
      >
        <span className={`${styles.hex} flex h-8 w-8 shrink-0 items-center justify-center border border-[#5ba8d8]/75 bg-[#06314c]`} aria-hidden="true">
          <MessagesSquare className="h-4 w-4 text-[#a9d5f1]" />
        </span>
        <span>
          <span className="block font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-[#7fb4d8]">Intelligence OS</span>
          <span className="mt-0.5 block text-xs font-semibold">Ask · simulate · scope</span>
        </span>
        <span className="ml-1 grid grid-cols-2 gap-0.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 bg-[#3288b6]" />
          <span className="h-1.5 w-1.5 bg-[#326189]" />
          <span className="h-1.5 w-1.5 bg-[#326189]" />
          <span className="h-1.5 w-1.5 bg-[#5ba8d8]" />
        </span>
      </button>

      {loaded && (
        <IntelligenceOS
          open={open}
          origin={origin}
          onRequestClose={() => setOpen(false)}
          onExited={() => {
            setLoaded(false);
            launcherRef.current?.focus();
          }}
        />
      )}
    </>
  );
}

export function IntelligenceOSMount() {
  const pathname = usePathname();
  const excludedRoute = pathname === "/p" || pathname.startsWith("/p/");

  if (excludedRoute) return null;
  return <IntelligenceOSLauncher />;
}
