import {
  Activity,
  Bot,
  ChartNoAxesColumnIncreasing,
  Gauge,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { MIP_DEFINITION_CAPABILITIES } from "@/lib/constants";
import { AIOperationsConsole } from "@/components/ui/AIOperationsConsole";
import { SectionHeading } from "@/components/ui/SectionHeading";

const capabilityIcons = [
  Bot,
  Activity,
  SlidersHorizontal,
  ShieldCheck,
  Gauge,
  ChartNoAxesColumnIncreasing,
] as const;

export function MIPDefinitionCapabilities() {
  return (
    <section
      id="what-managed-intelligence-means"
      className="border-y border-[var(--border-subtle)] bg-bg-surface/45 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow={MIP_DEFINITION_CAPABILITIES.eyebrow}
              title={MIP_DEFINITION_CAPABILITIES.title}
              description={MIP_DEFINITION_CAPABILITIES.definition}
            />

            <div className="mt-8 rounded-lg border border-[var(--border-default)] bg-bg-base p-5 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]">
              <p className="font-mono text-xs font-semibold uppercase text-accent-cyan">
                managed-AI workforce
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {MIP_DEFINITION_CAPABILITIES.workforce}
              </p>
            </div>
          </div>

          <AIOperationsConsole />
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {MIP_DEFINITION_CAPABILITIES.capabilities.map((capability, index) => {
            const Icon = capabilityIcons[index] ?? Bot;

            return (
              <article
                key={capability.title}
                className="rounded-lg border border-[var(--border-default)] bg-bg-base p-5 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-subtle text-brand">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary">
                      {capability.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
