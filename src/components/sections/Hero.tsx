import { ArrowRight, ChevronDown } from "lucide-react";
import { STATS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { AIOperationsConsole } from "@/components/ui/AIOperationsConsole";
import { GridBackground } from "@/components/effects/GridBackground";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-28 md:py-32">
      {/* Background layers */}
      <div className="absolute inset-0">
        <GridBackground opacity={0.04} />
        <div className="absolute inset-0 bg-[image:var(--glow-hero)]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_22%,var(--accent-cyan-subtle),transparent_80%)]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5">
          {/* Text - 3/5 width on desktop */}
          <div
            className="lg:col-span-3"
          >
            {/* Eyebrow */}
            <p
              className="text-sm font-medium tracking-[0.05em] uppercase text-brand-accent mb-6 flex items-center gap-2"
            >
              <span className="inline-block w-8 h-px bg-brand-accent" />
              DALLAS MANAGED INTELLIGENCE · SINCE 2002
            </p>

            {/* H1 */}
            <h1
              className="text-[length:var(--fs-display-xl)] font-semibold tracking-normal leading-[1.04]"
            >
              Managed Intelligence for{" "}
              <br />
              <span className="bg-gradient-to-r from-brand to-cyan bg-clip-text text-transparent">
                Secure AI Operations
              </span>
            </h1>

            {/* Zero-click block */}
            <p
              className="mt-6 max-w-xl text-base font-normal leading-relaxed text-text-secondary md:text-[length:var(--fs-body-l)]"
            >
              <strong className="text-text-primary font-medium">
                ITECS helps 10-300 employee organizations turn AI adoption into
                governed, monitored operating systems.
              </strong>{" "}
              Strategy, training, automation, security, and AI DevOps are backed
              by 24 years of managed IT operations.
            </p>

            {/* CTAs */}
            <div
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button href="/assessment" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                Book an AI Readiness Assessment
              </Button>
              <Button href="#managed-ai" variant="secondary" size="lg">
                Explore Managed AI
              </Button>
            </div>

            <div
              aria-label="Approved ITECS proof points"
              className="mt-8 grid max-w-2xl grid-cols-3 gap-2 rounded-lg border border-[var(--border-default)] bg-bg-surface/70 p-2 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-md border border-[var(--border-subtle)] bg-bg-elevated px-3 py-3 text-center"
                >
                  <p className="font-mono text-lg font-semibold leading-none text-brand-hover md:text-2xl">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-[0.68rem] font-medium uppercase leading-tight text-text-tertiary md:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Operations console visual - 2/5 width on desktop */}
          <div
            className="lg:col-span-2"
          >
            <AIOperationsConsole />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-6 w-6 text-text-dim animate-bounce-subtle" />
      </div>
    </section>
  );
}
