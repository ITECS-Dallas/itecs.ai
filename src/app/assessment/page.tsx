import { ArrowRight, ClipboardCheck, LockKeyhole, MailCheck, ShieldCheck } from "lucide-react";
import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { GridBackground } from "@/components/effects/GridBackground";
import { TrustBar } from "@/components/sections/TrustBar";
import { SecurityGovernanceBand } from "@/components/sections/SecurityGovernanceBand";
import { AIReadinessAssessmentForm } from "@/components/forms/AIReadinessAssessmentForm";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "AI Readiness Assessment for Dallas Organizations",
  description:
    "Start ITECS's AI Readiness Assessment for 10-300 employee organizations evaluating secure AI adoption, automation, governance, and managed intelligence.",
  path: "/assessment",
  keywords: [
    "AI Readiness Assessment Dallas",
    "managed AI assessment",
    "AI governance assessment",
    "enterprise AI consulting Dallas",
    "mid-market AI readiness",
  ],
});

const assessmentOutcomes = [
  {
    icon: ClipboardCheck,
    title: "Use-case priority",
    description:
      "Rank the workflows where AI has a real operating case instead of chasing a tool demo.",
  },
  {
    icon: LockKeyhole,
    title: "Data boundaries",
    description:
      "Identify sensitive systems, approval points, and governance constraints before rollout.",
  },
  {
    icon: ShieldCheck,
    title: "Managed path",
    description:
      "Leave with a practical recommendation for secure adoption, automation, training, or managed AI operations.",
  },
] as const;

export default function AssessmentPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "AI Readiness Assessment", href: "/assessment" },
          ]}
        />
      </div>

      <section className="relative overflow-hidden pb-20 pt-8 md:pb-28">
        <GridBackground opacity={0.035} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_48%_at_76%_20%,var(--brand-subtle)_0%,transparent_72%)]"
        />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="pt-4 lg:pt-12">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent-cyan">
              Dallas managed intelligence intake
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-normal text-text-primary md:text-6xl">
              AI Readiness Assessment for governed adoption.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              A short intake for 10-300 employee organizations that want a
              practical path into AI without guessing at platforms, exposing
              sensitive data, or funding work that operations cannot support.
              No tool demo, no obligation.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {assessmentOutcomes.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-lg border border-[var(--border-default)] bg-bg-surface/75 p-4 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]"
                  >
                    <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                    <h2 className="mt-4 text-sm font-semibold text-text-primary">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-text-tertiary">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-lg border border-[var(--border-default)] bg-bg-elevated p-5">
              <div className="flex items-start gap-3">
                <MailCheck className="mt-0.5 h-5 w-5 text-accent-cyan" aria-hidden="true" />
                <div>
                  <h2 className="text-base font-semibold text-text-primary">
                    Routed to the ITECS team by email
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    Submissions go to ITECS for review. If timing is urgent,
                    call {SITE_CONFIG.phone} or use the architect contact path.
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <Button
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Talk to an architect
                </Button>
              </div>
            </div>
          </div>

          <AIReadinessAssessmentForm />
        </div>
      </section>

      <TrustBar />
      <SecurityGovernanceBand />
    </>
  );
}
