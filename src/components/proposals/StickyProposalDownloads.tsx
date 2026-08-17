"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";

/**
 * Sticky bottom-right download controls shared by every /p/ proposal page.
 *
 * Renders the proposal's own PDF alongside the standing ITECS service-overview
 * deck. Both links are gated by the same magic-link cookie as the page itself.
 * New proposals should import this rather than hand-rolling a download button.
 */
export function StickyProposalDownloads({ slug }: { slug: string }) {
  const proposalHref = `/api/proposals/${slug}/pdf`;
  const overviewHref = `/api/proposals/${slug}/service-overview`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.8, ease: "easeOut" }}
      className="fixed bottom-5 right-4 z-50 flex items-center gap-2 print:hidden md:right-12 lg:right-[max(6rem,calc((100vw-72rem)/2+1.5rem))]"
    >
      <a
        href={overviewHref}
        download
        aria-label="Download the ITECS Services Overview 2026"
        className="group flex items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/95 px-3.5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-text-primary shadow-[0_14px_44px_rgba(10,22,34,0.16)] backdrop-blur transition-all hover:-translate-y-0.5 hover:border-brand-accent/50 hover:text-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-bg-void md:px-4"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent transition-colors group-hover:bg-brand-accent/15">
          <FileText className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="md:hidden">Overview</span>
        <span className="hidden md:inline">Download Service Overview</span>
      </a>

      <a
        href={proposalHref}
        download
        aria-label="Download the proposal PDF"
        className="group flex items-center justify-center gap-2 rounded-xl border border-brand-accent/40 bg-brand-accent/95 px-3.5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-bg-void shadow-[0_14px_44px_var(--accent-cyan-subtle)] backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-brand-accent-bright focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-bg-void md:px-4"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-bg-void/10 text-bg-void transition-colors group-hover:bg-bg-void/15">
          <Download className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="md:hidden">Proposal</span>
        <span className="hidden md:inline">Download Proposal</span>
      </a>
    </motion.div>
  );
}
