"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FullscreenNavMenu } from "@/components/layout/FullscreenNavMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMobileOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 h-[72px] border-b transition-[top,background-color,backdrop-filter,border-color] duration-300 ease-out ${
          scrolled || mobileOpen ? "top-0" : "top-8"
        } ${
          scrolled || mobileOpen
            ? "bg-bg-elevated/80 backdrop-blur-xl border-[var(--border-subtle)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-8">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/logos/itecs-horizontal.svg"
              alt="ITECS"
              width={148}
              height={44}
              priority
              className="brightness-0 invert"
              style={{ height: "44px", width: "auto" }}
            />
          </Link>

          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden sm:block">
              <Button href="/contact" size="sm">
                Contact
              </Button>
            </div>
            <button
              type="button"
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-bg-surface/70 focus:outline-none focus:ring-2 focus:ring-brand-accent/60 focus:ring-offset-2 focus:ring-offset-bg-void"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close site menu" : "Open site menu"}
              aria-expanded={mobileOpen}
              aria-haspopup="dialog"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <FullscreenNavMenu
        open={mobileOpen}
        pathname={pathname}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
