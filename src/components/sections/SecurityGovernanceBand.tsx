import {
  ClipboardCheck,
  DatabaseZap,
  FileCheck2,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import {
  CERTIFICATION_BADGES,
  SECURITY_GOVERNANCE_BAND,
} from "@/lib/constants";
import { CertificationStrip } from "@/components/ui/CertificationStrip";
import { SectionHeading } from "@/components/ui/SectionHeading";

const frameworkIcons = [ShieldCheck, FileCheck2, Scale, ClipboardCheck];
const controlIcons = [DatabaseZap, ShieldCheck, UserCheck, FileCheck2];

export function SecurityGovernanceBand() {
  const badges = [...CERTIFICATION_BADGES];
  const frameworks = [...SECURITY_GOVERNANCE_BAND.frameworks];
  const controls = [...SECURITY_GOVERNANCE_BAND.controls];

  if (badges.length === 0 || frameworks.length === 0 || controls.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-[var(--border-subtle)] bg-bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading
              align="left"
              eyebrow={SECURITY_GOVERNANCE_BAND.eyebrow}
              title={SECURITY_GOVERNANCE_BAND.title}
              description={SECURITY_GOVERNANCE_BAND.description}
            />

            <CertificationStrip badges={badges} className="mt-10" />
          </div>

          <div className="grid gap-5">
            <div className="rounded-lg border border-[var(--border-default)] bg-bg-base p-5 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-accent-cyan">
                Framework alignment
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {frameworks.map((framework, index) => {
                  const Icon = frameworkIcons[index % frameworkIcons.length];

                  return (
                    <article
                      key={framework.name}
                      className="rounded-md border border-[var(--border-subtle)] bg-bg-surface p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-subtle text-brand">
                          <Icon aria-hidden="true" className="h-4 w-4" />
                        </span>
                        <h3 className="text-sm font-semibold text-text-primary">
                          {framework.name}
                        </h3>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-text-secondary">
                        {framework.detail}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {controls.map((control, index) => {
                const Icon = controlIcons[index % controlIcons.length];

                return (
                  <article
                    key={control.title}
                    className="rounded-lg border border-[var(--border-default)] bg-bg-base p-5 shadow-e1 [box-shadow:var(--elev-1-inset),var(--elev-1)]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-cyan-subtle text-accent-cyan">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-text-primary">
                          {control.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                          {control.detail}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
