import Link from "next/link";
import { ArrowUpRight, BookOpen, ExternalLink, ShieldCheck } from "lucide-react";
import { PROOF_CASE_STUDIES, PROOF_METRICS } from "./data";
import styles from "./intelligence-os.module.css";

const KNOWLEDGE_ROUTES = [
  {
    eyebrow: "Choose a starting point",
    title: "AI services",
    summary: "Assessments, pilots, custom agents, training, governance, and ongoing operations.",
    href: "/services",
  },
  {
    eyebrow: "Published bands",
    title: "Transparent pricing",
    summary: "Compare current planning ranges before a scope call.",
    href: "/pricing",
  },
  {
    eyebrow: "Executive guide",
    title: "AI adoption resources",
    summary: "Practical guidance for responsible, business-led adoption.",
    href: "/insights",
  },
] as const;

export function ResourceVaultApp() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-[#7fb4d8]/20 pb-3">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#7fb4d8]">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Proof & resource vault
        </div>
        <p className="mt-1.5 max-w-3xl text-xs leading-relaxed text-slate-400">
          Published ITECS proof points and direct source links. Historic MSP outcomes below demonstrate operational delivery; they are not presented as AI-project results.
        </p>
      </div>

      <div className={`${styles.scrollArea} min-h-0 flex-1 overflow-y-auto pt-4`}>
        <section aria-labelledby="vault-proof-title">
          <h3 id="vault-proof-title" className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">ITECS at a glance</h3>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {PROOF_METRICS.map((metric) => (
              <div key={metric.value} className={`${styles.chamferSmall} border border-[#7fb4d8]/20 bg-[#061728]/80 p-3 sm:p-4`}>
                <p className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{metric.value}</p>
                <p className="mt-1 text-[10px] leading-snug text-slate-300 sm:text-xs">{metric.label}</p>
                <p className="mt-2 hidden font-mono text-[8px] uppercase tracking-wide text-slate-600 sm:block">{metric.source}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5" aria-labelledby="vault-cases-title">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h3 id="vault-cases-title" className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">Public managed-services case studies</h3>
              <p className="mt-1 text-[10px] text-slate-500">Each card links to the original ITECS Online source.</p>
            </div>
            <span className={`${styles.chamferSmall} border border-amber-400/25 bg-amber-400/5 px-2 py-1 font-mono text-[8px] uppercase text-amber-100`}>Historic MSP evidence</span>
          </div>
          <div className="mt-2 grid gap-3 xl:grid-cols-3">
            {PROOF_CASE_STUDIES.map((study) => (
              <article key={study.client} className={`${styles.chamfer} flex flex-col border border-[#7fb4d8]/20 bg-[#061728]/80 p-4`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#7fb4d8]">{study.industry}</p>
                    <h4 className="mt-1 text-base font-semibold text-white">{study.client}</h4>
                  </div>
                  <span className="h-3 w-3 shrink-0 rotate-45 border border-[#5ba8d8] bg-[#326189]" aria-hidden="true" />
                </div>
                <p className="mt-3 font-display text-xl font-semibold text-[#a9d5f1]">{study.outcome}</p>
                <p className="mt-2 flex-1 text-[11px] leading-relaxed text-slate-400">{study.summary}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {study.metrics.map((metric) => (
                    <li key={metric} className={`${styles.chamferSmall} border border-[#326189]/55 bg-[#0a2134] px-2 py-1 font-mono text-[8px] text-slate-300`}>{metric}</li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#7fb4d8]/15 pt-3">
                  <span className="font-mono text-[8px] text-slate-600">Published {study.sourceDate}</span>
                  <a href={study.href} target="_blank" rel="noreferrer" className="inline-flex min-h-9 items-center gap-1.5 font-mono text-[9px] font-semibold uppercase text-[#a9d5f1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5ba8d8]">
                    Original source <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-5 pb-2" aria-labelledby="vault-resources-title">
          <h3 id="vault-resources-title" className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            Continue your evaluation
          </h3>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {KNOWLEDGE_ROUTES.map((resource) => (
              <Link key={resource.href} href={resource.href} className={`${styles.chamferSmall} group border border-[#7fb4d8]/20 bg-[#0a2134]/65 p-3 hover:border-[#7fb4d8]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5ba8d8]`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-[#7fb4d8]">{resource.eyebrow}</p>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-600 group-hover:text-[#7fb4d8]" aria-hidden="true" />
                </div>
                <p className="mt-1.5 text-sm font-semibold text-white">{resource.title}</p>
                <p className="mt-1 text-[10px] leading-relaxed text-slate-400">{resource.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
