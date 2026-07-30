import Link from "next/link";
import { ArrowUpRight, BookOpen, ShieldCheck } from "lucide-react";
import { PROOF_METRICS } from "./data";
import styles from "./intelligence-os.module.css";

const KNOWLEDGE_ROUTES = [
  {
    eyebrow: "Choose a starting point",
    title: "AI services",
    summary:
      "Assessments, guided and local agents, custom builds, training, governance, and ongoing operations.",
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
          Published company-level proof points and direct routes to current ITECS AI resources. Client identities and private engagement details are not included in this experience.
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
