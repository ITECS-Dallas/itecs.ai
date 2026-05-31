import { STATS } from "@/lib/constants";
import { StatCounter } from "@/components/ui/StatCounter";
import { GridBackground } from "@/components/effects/GridBackground";

export function StatsBar() {
  return (
    <section className="relative bg-bg-surface py-24 md:py-32">
      <GridBackground opacity={0.03} />
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="font-mono text-xs font-semibold uppercase text-brand-accent">
            Approved Proof Points
          </p>
          <h2 className="mt-3 text-[length:var(--fs-h4)] font-semibold text-text-primary">
            Real operating history, carried forward.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-lg border border-[var(--border-default)] bg-bg-elevated p-6 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]"
            >
              <div
                className={`${
                  i < STATS.length - 1
                    ? "md:border-r md:border-[var(--border-subtle)]"
                    : ""
                }`}
              >
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
