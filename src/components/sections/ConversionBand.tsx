import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

export function ConversionBand() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--border-subtle)] bg-bg-surface py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_50%_35%,var(--brand-subtle)_0%,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent-cyan">
          Final step
        </p>
        <h2 className="mt-5 text-3xl font-semibold leading-tight text-text-primary md:text-5xl">
          Start with an AI Readiness Assessment.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
          Identify the workflows, risks, data boundaries, and operating model
          before AI spend turns into another unmanaged tool rollout.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            href="/contact"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            AI Readiness Assessment
          </Button>
          <Button
            href="/contact"
            variant="secondary"
            size="lg"
            icon={<PhoneCall className="h-4 w-4" />}
          >
            Talk to an architect
          </Button>
        </div>

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.1em] text-text-tertiary">
          30 minutes | no obligation | DFW-based team | {SITE_CONFIG.phone}
        </p>
      </div>
    </section>
  );
}
