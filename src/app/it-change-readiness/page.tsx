import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  ClipboardCheck,
  Cog,
  FileCheck2,
  Network,
  Scale,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { CHANGE_ASSURANCE_SERVICE } from "@/lib/constants";
import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema, generateServiceSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChangeAssuranceDecisionModel } from "@/components/sections/ChangeAssuranceDecisionModel";
import { ChangeAssuranceDemonstration } from "@/components/sections/ChangeAssuranceDemonstration";
import { ChangeAssuranceHero } from "@/components/sections/ChangeAssuranceHero";
import { ChangeAssuranceReviewFlow } from "@/components/sections/ChangeAssuranceReviewFlow";
import { FAQ } from "@/components/sections/FAQ";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const service = CHANGE_ASSURANCE_SERVICE;

export const metadata = generatePageMetadata({
  title: "IT Change Readiness Reviews | ITECS Change Assurance",
  description:
    "Stress-test infrastructure change plans, verify critical prerequisites, research vendor requirements, and create auditable readiness verdicts.",
  path: service.href,
  keywords: service.keywords,
});

const audiences = [
  {
    title: "MSP technical and service leaders",
    description:
      "Technical directors, service-delivery leaders, and engineering teams managing change risk across multiple client environments.",
    icon: Network,
  },
  {
    title: "Internal IT and infrastructure teams",
    description:
      "Teams that need consistent senior-review discipline before high-impact work reaches production.",
    icon: Users,
  },
  {
    title: "Regulated or uptime-sensitive organizations",
    description:
      "Organizations that need reviewable evidence while change owners, approvers, and technicians retain authority.",
    icon: ShieldCheck,
  },
] as const;

const engagementSteps = [
  {
    title: "Change-workflow assessment",
    description:
      "Map the current intake, review, approval, execution, and post-change ownership path.",
    icon: ClipboardCheck,
  },
  {
    title: "Rules, scope, templates, and boundaries",
    description:
      "Configure risk treatment, approved documentation scope, evidence expectations, report templates, and explicit limits.",
    icon: Settings2,
  },
  {
    title: "Sanitized acceptance testing",
    description:
      "Exercise the configured review against fictional or sanitized scenarios before team use.",
    icon: FileCheck2,
  },
  {
    title: "Team rollout and operating guidance",
    description:
      "Teach technicians, reviewers, change owners, and approvers how to use the evidence and verdict record.",
    icon: Building2,
  },
  {
    title: "Ongoing tuning and quality review",
    description:
      "Maintain question patterns, rules, documentation boundaries, and report quality as the operating process changes.",
    icon: Cog,
  },
] as const;

export default function ITChangeReadinessPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: service.shortTitle, href: service.href },
          ]}
        />
      </div>

      <ChangeAssuranceHero />
      <ChangeAssuranceReviewFlow />
      <ChangeAssuranceDecisionModel />
      <ChangeAssuranceDemonstration />

      <section className="border-y border-[var(--card-line)] bg-canvas-sunken py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Operating Relationships"
            title="Technical readiness complements the workflow around it"
            description="Change Assurance adds disciplined technical challenge without replacing the systems and people that record, authorize, and perform the change."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="chamfer-md border border-[var(--card-line)] bg-card p-6 md:p-8">
              <div className="flex items-center gap-3">
                <Scale aria-hidden="true" className="h-6 w-6 text-itecs-blue" />
                <h3 className="font-display text-2xl font-semibold text-ink">
                  ITSM, CAB, and change ownership
                </h3>
              </div>
              <p className="mt-5 leading-relaxed text-ink-body">
                The ITSM and change workflow records, routes, schedules, and
                approves a change. ITECS Change Assurance challenges whether
                the technical plan and evidence are ready. The change owner,
                approver, CAB, and technician remain responsible.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                It works alongside an existing process. This page does not claim
                a direct integration with a named ticketing platform.
              </p>
            </article>

            <article className="chamfer-md border border-[var(--card-line)] bg-card p-6 md:p-8">
              <div className="flex items-center gap-3">
                <BookOpenCheck
                  aria-hidden="true"
                  className="h-6 w-6 text-itecs-blue"
                />
                <h3 className="font-display text-2xl font-semibold text-ink">
                  OpsMemory and sourced context
                </h3>
              </div>
              <p className="mt-5 leading-relaxed text-ink-body">
                OpsMemory organizes approved knowledge and source context.
                Change Assurance consults that documentation read-only, flags
                staleness or conflict, and still requires live proof for
                critical facts.
              </p>
              <Link
                href="/ai-knowledge-base"
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-itecs-blue transition-colors hover:text-itecs-blue-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] focus-visible:ring-offset-2"
              >
                Explore OpsMemory source discipline
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Who It Is For"
            title="Infrastructure teams that need reviewable senior discipline"
            description="The managed service fits teams responsible for consequential technical work where evidence must be clear and people must remain accountable."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {audiences.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="chamfer-md border border-[var(--card-line)] bg-card p-6 md:p-7"
              >
                <span className="hex flex h-11 w-11 items-center justify-center bg-brand-subtle text-itecs-blue">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-body md:text-base">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-itecs-navy py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow !text-itecs-blue-pale">Managed Engagement</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-white md:text-[2.75rem]">
              Configure the review around the process people already own
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#c5d2dc]">
              ITECS manages the review lifecycle without replacing the
              customer&apos;s ITSM or governance platform.
            </p>
          </div>

          <ol className="mt-12 grid gap-4 lg:grid-cols-5">
            {engagementSteps.map(({ title, description, icon: Icon }, index) => (
              <li
                key={title}
                value={index + 1}
                className="chamfer-md border border-white/15 bg-white/[0.04] p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="hex flex h-10 w-10 items-center justify-center bg-white/10 text-itecs-blue-pale">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-itecs-blue-pale">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#b8c8d4]">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQ items={service.faq} heading="ITECS Change Assurance FAQ" />

      <section className="bg-itecs-blue py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center md:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
            Challenge your next high-risk plan before the maintenance window
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#d7e7f1]">
            Bring a representative change workflow to a focused workshop. ITECS
            will map the review surface, evidence boundaries, and human approval
            path without asking the agent to perform the change.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              href="/contact"
              variant="ondark"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
              className="w-full whitespace-normal text-center sm:w-auto"
            >
              Schedule a Change Readiness Workshop
            </Button>
            <Button
              href="/custom-ai-agents"
              variant="ghost"
              size="lg"
              className="w-full whitespace-normal text-center sm:w-auto"
            >
              Review the custom-agent approach
            </Button>
          </div>
        </div>
      </section>

      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
    </>
  );
}
