"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Info, SlidersHorizontal } from "lucide-react";
import {
  CONFIGURATOR_OPTIONS,
  DEFAULT_CONFIGURATOR_SELECTION,
  buildConfiguratorRecommendation,
} from "./data";
import styles from "./intelligence-os.module.css";
import type { ConfiguratorSelection } from "./types";

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  onChange: (value: string) => void;
}

function SelectField({ id, label, value, options, onChange }: SelectFieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-[#a9d5f1]">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 w-full border border-[#7fb4d8]/30 bg-[#061728] px-3 text-xs text-white outline-none focus:border-[#5ba8d8] focus:ring-2 focus:ring-[#5ba8d8]/25"
      >
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

export function ConfiguratorApp() {
  const [selection, setSelection] = useState<ConfiguratorSelection>(DEFAULT_CONFIGURATOR_SELECTION);
  const recommendation = useMemo(() => buildConfiguratorRecommendation(selection), [selection]);

  const update = <Key extends keyof ConfiguratorSelection>(
    key: Key,
    value: ConfiguratorSelection[Key],
  ) => setSelection((current) => ({ ...current, [key]: value }));

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-[#7fb4d8]/20 pb-3">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#7fb4d8]">
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Deterministic solution configurator
        </div>
        <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-slate-400">
          Change the operating profile to map your use case to a current published ITECS engagement band. The same inputs always produce the same result.
        </p>
      </div>

      <div className={`${styles.scrollArea} grid min-h-0 flex-1 gap-4 overflow-y-auto pt-4 lg:grid-cols-[minmax(230px,.78fr)_minmax(310px,1.22fr)]`}>
        <form className={`${styles.chamferSmall} border border-[#7fb4d8]/20 bg-[#061728]/80 p-4`} onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <SelectField
              id="config-use-case"
              label="Primary use case"
              value={selection.useCase}
              options={CONFIGURATOR_OPTIONS.useCases}
              onChange={(value) => update("useCase", value)}
            />
            <SelectField
              id="config-scale"
              label="Expected users"
              value={selection.scale}
              options={CONFIGURATOR_OPTIONS.scales}
              onChange={(value) => update("scale", value)}
            />
            <SelectField
              id="config-integrations"
              label="Connected systems"
              value={selection.integrations}
              options={CONFIGURATOR_OPTIONS.integrations}
              onChange={(value) => update("integrations", value)}
            />
            <SelectField
              id="config-deployment"
              label="Deployment intent"
              value={selection.deployment}
              options={CONFIGURATOR_OPTIONS.deployments}
              onChange={(value) => update("deployment", value)}
            />
          </div>
          <label className="mt-4 flex min-h-11 cursor-pointer items-start gap-3 border border-[#7fb4d8]/20 bg-[#0a2134]/70 p-3">
            <input
              type="checkbox"
              checked={selection.managed}
              onChange={(event) => update("managed", event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#3288b6]"
            />
            <span>
              <span className="block text-xs font-semibold text-slate-100">Include Managed Agent Operations</span>
              <span className="mt-1 block text-[10px] leading-relaxed text-slate-400">Monitoring, quality evaluation, drift checks, and lifecycle support.</span>
            </span>
          </label>
          <button
            type="button"
            onClick={() => setSelection(DEFAULT_CONFIGURATOR_SELECTION)}
            className="mt-3 min-h-9 font-mono text-[9px] uppercase tracking-wide text-slate-400 underline decoration-[#326189] underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5ba8d8]"
          >
            Restore example profile
          </button>
        </form>

        <section className={`${styles.chamfer} relative overflow-hidden border border-[#5ba8d8]/40 bg-[#0a2134]/90 p-4 sm:p-5`} aria-live="polite">
          <div className="absolute right-0 top-0 h-px w-1/2 bg-[#5ba8d8]" aria-hidden="true" />
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#7fb4d8]">Recommended starting band</p>
          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">{recommendation.title}</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-300">{recommendation.summary}</p>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <div className="border-l-2 border-[#5ba8d8] bg-[#061728]/80 p-3 sm:col-span-1">
              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-500">Build</p>
              <p className="mt-1 font-display text-lg font-semibold text-white">{recommendation.buildRange}</p>
              <p className="mt-1 text-[9px] text-slate-500">{recommendation.buildLabel}</p>
            </div>
            <div className="border-l-2 border-[#326189] bg-[#061728]/80 p-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-500">Discovery / spec</p>
              <p className="mt-1 font-display text-lg font-semibold text-white">{recommendation.discoveryRange ?? "Included in prototype path"}</p>
              <p className="mt-1 text-[9px] text-slate-500">when separately scoped</p>
            </div>
            <div className="border-l-2 border-[#326189] bg-[#061728]/80 p-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-500">Managed operations</p>
              <p className="mt-1 font-display text-lg font-semibold text-white">{recommendation.operationsRange ?? "Not selected"}</p>
              <p className="mt-1 text-[9px] text-slate-500">optional recurring service</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="font-mono text-[9px] uppercase tracking-[0.13em] text-slate-400">Suggested sequence</h4>
              <ol className="mt-2 space-y-2">
                {recommendation.phases.map((phase, index) => (
                  <li key={phase} className="flex items-start gap-2 text-[11px] leading-relaxed text-slate-300">
                    <span className={`${styles.hex} flex h-5 w-5 shrink-0 items-center justify-center bg-[#326189] font-mono text-[8px] text-white`}>{index + 1}</span>
                    {phase}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h4 className="font-mono text-[9px] uppercase tracking-[0.13em] text-slate-400">Operating controls</h4>
              <ul className="mt-2 space-y-2">
                {recommendation.controls.map((control) => (
                  <li key={control} className="flex items-start gap-2 text-[11px] leading-relaxed text-slate-300">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                    {control}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 border-t border-[#7fb4d8]/15 pt-3 text-[10px] leading-relaxed text-slate-400">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7fb4d8]" aria-hidden="true" />
            <p>
              Planning guidance, not a quote. These are current published ITECS service ranges; provider fees, software licenses, data readiness, compliance, and final requirements can change the scope after assessment.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/contact" className={`${styles.chamferSmall} inline-flex min-h-10 items-center gap-2 bg-[#3288b6] px-4 text-xs font-semibold text-white hover:bg-[#27759e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fb4d8]`}>
              Scope this with ITECS <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link href="/pricing" className={`${styles.chamferSmall} inline-flex min-h-10 items-center border border-[#7fb4d8]/30 px-4 text-xs font-semibold text-slate-200 hover:border-[#7fb4d8]/65 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fb4d8]`}>
              See all pricing
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
