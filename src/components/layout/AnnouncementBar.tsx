"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";

// Navy utility strip; re-scope tokens so child text/border utilities read on-dark.
const barDarkScope = {
  background: "var(--itecs-navy)",
  "--text-primary": "#ffffff",
  "--text-secondary": "#aebfcb",
  "--text-tertiary": "rgba(255,255,255,0.35)",
  "--border-subtle": "rgba(255,255,255,0.10)",
} as CSSProperties;

// Focused cross-site/utility links only — primary nav (Insights, Contact) and
// the parent MSP's security-incident CTA live where they belong, not here.
const utilityLinks = [
  { label: "Customer Portal", href: "https://portal.itecs.io/", external: true },
  { label: "Whitepapers", href: "https://itecsonline.com/white-papers-case-studies", external: true },
  { label: "ITECS MSP", href: "https://itecsonline.com", external: true },
] as const;

export function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-site-announcement-bar
      aria-hidden={hidden}
      style={barDarkScope}
      className={`fixed top-0 left-0 right-0 z-[60] h-8 border-b border-[var(--border-subtle)] text-text-secondary text-xs transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full pointer-events-none" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-8">
        {/* Left: email + phone */}
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="hover:text-text-primary transition-colors truncate"
          >
            {SITE_CONFIG.email}
          </a>
          <span className="text-text-tertiary" aria-hidden="true">|</span>
          <a
            href={`tel:${SITE_CONFIG.phoneE164}`}
            className="hover:text-text-primary transition-colors whitespace-nowrap"
          >
            {SITE_CONFIG.phone}
          </a>
        </div>

        {/* Right: utility links — desktop only */}
        <nav className="hidden md:flex items-center gap-5" aria-label="Utility links">
          {utilityLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-text-primary transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </div>
  );
}
