import type { CSSProperties } from "react";
import { Brain, Building2, Server, ShieldCheck } from "lucide-react";
import { MIP_EVOLUTION_TIMELINE } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stageIcons = [Building2, Server, ShieldCheck, Brain] as const;

const stageColors = {
  heritage: "var(--heritage-amber)",
  muted: "var(--text-tertiary)",
  brand: "var(--brand)",
  cyan: "var(--accent-cyan)",
} as const;

function getStageStyle(tone: keyof typeof stageColors): CSSProperties {
  return {
    "--stage-color": stageColors[tone],
  } as CSSProperties;
}

export function MIPEvolutionDiagram() {
  return (
    <section id="mip-evolution" className="bg-bg-base py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="The Evolution"
          title="From MSP to Managed Intelligence Provider"
          description="The managed-services model evolved from keeping infrastructure online, to defending business systems, to operating the intelligence layer now entering production."
        />

        <ol className="relative mt-14 grid gap-5 lg:grid-cols-4">
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-6 top-8 w-px bg-[var(--border-default)] lg:left-0 lg:right-0 lg:top-8 lg:h-px lg:w-auto"
          />

          {MIP_EVOLUTION_TIMELINE.map((stage, index) => {
            const Icon = stageIcons[index] ?? Brain;
            const isFoundingNode = stage.tone === "heritage";

            return (
              <li
                key={`${stage.year}-${stage.stage}`}
                style={getStageStyle(stage.tone)}
                className="relative grid gap-4 pl-16 lg:pl-0 lg:pt-12"
              >
                <div className="absolute left-0 top-1 lg:left-0 lg:top-0">
                  <span className="flex h-12 w-12 items-center justify-center rounded-pill border border-[var(--stage-color)] bg-[color-mix(in_srgb,var(--stage-color)_14%,transparent)] text-[var(--stage-color)] shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                </div>

                <article
                  className={`rounded-lg border bg-bg-surface p-5 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)] ${
                    isFoundingNode
                      ? "border-[var(--heritage-amber)]"
                      : "border-[var(--border-default)]"
                  }`}
                >
                  <p className="font-mono text-xs font-semibold uppercase text-[var(--stage-color)]">
                    {stage.year}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-text-primary">
                    {stage.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase text-text-tertiary">
                    {stage.stage}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    {stage.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
