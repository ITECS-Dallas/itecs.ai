import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  ClipboardCheck,
  ShieldCheck,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const audiences = [
  {
    title: "MSPs and multi-client IT service teams",
    description:
      "Keep client-specific procedures distinct while giving technicians a dependable way to find and maintain operational knowledge.",
    icon: Users,
  },
  {
    title: "Internal IT and security departments",
    description:
      "Make approved policies, standards, and runbooks easier to use without bypassing existing permissions or review paths.",
    icon: ShieldCheck,
  },
  {
    title: "Documentation-heavy or regulated operations teams",
    description:
      "Surface source-backed guidance and keep consequential documentation changes inside established approval processes.",
    icon: ClipboardCheck,
  },
] as const;

const boundaries = [
  "Does not turn unverified internet content into company truth",
  "Does not store secrets in its knowledge base",
  "Does not make autonomous compliance judgments",
  "Does not perform unapproved infrastructure changes",
] as const;

export function OpsMemoryOverview() {
  return (
    <section className="border-y border-[var(--card-line)] py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="eyebrow">Managed Knowledge &amp; Document Operations Agent</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-5xl">
            Meet ITECS OpsMemory
          </h2>
          <p className="mt-6 max-w-3xl text-xl font-medium leading-relaxed text-ink">
            Your company&apos;s operational memory—organized, source-backed, and
            ready to use.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-body md:text-lg">
            ITECS OpsMemory turns approved company knowledge, client-specific
            documentation, and authoritative vendor guidance into cited answers
            and maintained SOPs, runbooks, and operational documentation. ITECS
            manages source priority, permissions, human review, freshness, and
            ongoing quality—helping employees work faster without treating
            AI-generated guesses as company truth.
          </p>

          <aside className="chamfer-md mt-8 border-l-2 border-itecs-blue bg-canvas-sunken p-5">
            <div className="flex items-start gap-4">
              <span className="hex flex h-10 w-10 shrink-0 items-center justify-center bg-brand-subtle text-itecs-blue">
                <BookOpenCheck aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-ink">Capability boundary</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">
                  OpsMemory is the managed offering described here. Separate
                  custom knowledge-base projects may use different repositories,
                  connectors, or deployment patterns; those capabilities are
                  scoped and verified for each engagement.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <Building2 aria-hidden="true" className="h-5 w-5 text-itecs-blue" />
            <h3 className="font-display text-2xl font-semibold text-ink">
              Who It Is For
            </h3>
          </div>
          <div className="mt-6 grid gap-4">
            {audiences.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="chamfer-md border border-[var(--card-line)] bg-card p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="hex flex h-10 w-10 shrink-0 items-center justify-center bg-brand-subtle text-itecs-blue">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-ink">{title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function OpsMemoryBoundaries() {
  return (
    <section className="bg-canvas-sunken py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Trust Boundaries"
          title="Clear limits keep company knowledge trustworthy."
          description="OpsMemory does not turn unverified internet content into company truth, store secrets in its knowledge base, make autonomous compliance judgments, or perform unapproved infrastructure changes."
        />

        <ul className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {boundaries.map((boundary) => (
            <li
              key={boundary}
              className="chamfer-sm flex items-start gap-4 border border-[var(--card-line)] bg-card p-5 text-ink-body"
            >
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-itecs-blue"
              />
              <span>{boundary}</span>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-ink-muted">
          For pre-change review, see how{" "}
          <Link
            href="/it-change-readiness"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-itecs-blue transition-colors hover:text-itecs-blue-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2"
          >
            ITECS Change Assurance uses OpsMemory context read-only
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          , flags staleness or conflict, and still requires technician-reported
          live verification for critical facts.
        </p>
      </div>
    </section>
  );
}
