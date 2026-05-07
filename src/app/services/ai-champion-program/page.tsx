import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";

const bookingHref =
  "https://outlook.office.com/bookwithme/user/a2b6e699aac2490e9b9020bb762b2ac3@itecsmsp.com/meetingtype/k4ly0cvm8ky5RtRVi9SrvQ2";

export const metadata = generatePageMetadata({
  title: "Internal AI Champion Enablement Program",
  description:
    "Build durable in-house AI capability with ITECS's 4-6 week structured program that turns one employee into your internal AI lead.",
  path: "/services/ai-champion-program",
  keywords: [
    "internal AI champion program",
    "AI training for SMB",
    "AI enablement",
    "internal AI lead",
    "AI champion certification",
    "in-house AI capability",
    "Dallas AI training",
  ],
  ogImage: "/images/team/team-office.webp",
});

const fitSignals = [
  {
    title: "Growing past the pilot",
    description:
      "You have piloted Claude, ChatGPT, Gemini, Microsoft Copilot, or another AI tool in one team. Now leadership wants to expand AI across departments with an internal owner who can keep the work moving.",
  },
  {
    title: "Building governance and trust",
    description:
      "Legal, compliance, or security teams need clear rules for acceptable use, audit trails, vendor selection, and shadow AI controls without slowing practical adoption.",
  },
  {
    title: "Reducing long-term consulting cost",
    description:
      "Outside expertise still matters for strategy and complex builds, but routine prompt refinement, employee onboarding, and daily optimization should not consume senior consulting hours forever.",
  },
] as const;

const outcomes = [
  "Lead AI platform adoption across multiple departments without constant external dependency.",
  "Build, test, and refine production-grade prompts and prompt libraries for daily workflows.",
  "Design and document AI-driven workflows employees can use without confusion.",
  "Train new employees using a curriculum tailored to the organization's tools and policies.",
  "Prioritize new AI use cases based on business impact, risk, cost, and feasibility.",
  "Support an AI Acceptable Use Policy and identify shadow AI usage before it becomes a larger risk.",
  "Compare Claude, ChatGPT, Gemini, Copilot, and other tools without locking into one vendor.",
  "Bring ITECS or another outside expert back in only when senior judgment is truly needed.",
] as const;

const curriculum = [
  {
    week: "Week 1",
    theme: "Foundation and goal-setting",
    details:
      "AI fundamentals in the context of your industry, selected platform orientation, workspace review, governance walkthrough, and Champion goals.",
  },
  {
    week: "Week 2",
    theme: "Real-work prompt engineering",
    details:
      "The Champion shadows an ITECS AI Strategist and builds the first three production-quality prompts for a real workflow with testing and documentation.",
  },
  {
    week: "Week 3",
    theme: "Workflow and library design",
    details:
      "Organize source documents, structure project workspaces, and build reusable prompt libraries that scale by role, department, and process.",
  },
  {
    week: "Week 4",
    theme: "Train-the-trainer",
    details:
      "Practice onboarding new users, answering non-technical questions, preparing executive updates, and running a supervised training session.",
  },
  {
    week: "Week 5",
    theme: "Expansion and measurement",
    details:
      "For the six-week track, the Champion learns use-case prioritization, ROI measurement, and practical expansion planning for the next two quarters.",
  },
  {
    week: "Week 6",
    theme: "Governance and sustainability",
    details:
      "For the six-week track, the Champion learns shadow AI monitoring, vendor evaluation, tool review, and a clear 90-day handoff plan.",
  },
] as const;

const deliverables = [
  "Custom curriculum document tailored to your industry and selected AI platforms.",
  "Prompt library with 10 to 15 production-quality prompts ready for rollout.",
  "Internal training deck the Champion can use to onboard new employees.",
  "AI Operations Playbook covering governance, escalation paths, and expansion process.",
  "Documented 90-day expansion roadmap for the Champion's first quarter as internal AI lead.",
  "90-day post-program support window with the assigned ITECS AI Strategist.",
  "Certificate of Completion for the Champion's professional record.",
] as const;

const pricingOptions = [
  {
    name: "AI Champion - Standard",
    price: "$8,500",
    duration: "4 weeks",
    bestFor:
      "Organizations with an established AI deployment ready to formalize internal ownership.",
    coverage: "Weeks 1-4 of the curriculum",
    coaching: "About 12-20 synchronous coaching hours",
    deliverables: "Full deliverable set",
    featured: false,
  },
  {
    name: "AI Champion - Extended",
    price: "$12,000",
    duration: "6 weeks",
    bestFor:
      "Organizations early in their AI journey or expanding quickly across departments.",
    coverage: "Full 6-week curriculum",
    coaching: "About 18-30 synchronous coaching hours",
    deliverables: "Full set plus expansion roadmap and governance playbook",
    featured: true,
  },
] as const;

const timeline = [
  {
    step: "01",
    title: "Discovery call",
    timing: "Week 0",
    description:
      "A 30-minute conversation with an ITECS AI Strategist to identify the Champion candidate and confirm fit.",
  },
  {
    step: "02",
    title: "Kickoff",
    timing: "Week 0-1",
    description:
      "Engagement letter signed, curriculum customized, platform stack reviewed, and Champion goals confirmed.",
  },
  {
    step: "03",
    title: "Program delivery",
    timing: "Weeks 1-4 or 1-6",
    description:
      "Weekly coaching, real-work shadowing, prompt building, workflow documentation, and applied learning.",
  },
  {
    step: "04",
    title: "Handoff and certification",
    timing: "Final week",
    description:
      "The Champion runs the first internal training session, completes the handoff plan, and receives a Certificate of Completion.",
  },
  {
    step: "05",
    title: "90-day support",
    timing: "Months 2-4",
    description:
      "The Champion has access to the assigned strategist for questions, refinement, and check-ins.",
  },
] as const;

const faqs = [
  {
    question: "What kind of employee should we nominate as our AI Champion?",
    answer:
      "The strongest candidates combine curiosity, clear communication, and respect across the organization. A technical background helps, but it is not required. Operations managers, IT leads, executive assistants, project managers, and line-of-business power users can all be strong candidates.",
  },
  {
    question: "How much time does the Champion need to commit?",
    answer:
      "Plan on 7 to 11 hours per week during the program. About 3 to 5 hours are synchronous coaching and shadowing sessions. The remaining 4 to 6 hours are applied work such as building prompts, drafting documentation, and testing the week's workflow in your environment.",
  },
  {
    question: "What if our Champion leaves the company after the program?",
    answer:
      "The prompt libraries, training decks, operations playbook, governance documentation, and roadmap stay with your organization. Losing the Champion would still be disruptive, but the documented knowledge gives the next owner a clear starting point.",
  },
  {
    question: "Which AI platform should we standardize on?",
    answer:
      "ITECS is platform-agnostic. We work across Anthropic Claude, OpenAI ChatGPT, Google Gemini, Microsoft Copilot, GitHub Copilot, and other commercial AI platforms. The right fit depends on your Microsoft 365 or Google Workspace footprint, use cases, governance needs, and budget.",
  },
  {
    question: "Can we run the program for more than one Champion at once?",
    answer:
      "The program is designed as a 1:1 engagement so the coaching stays focused. For organizations that want to develop multiple internal leaders at the same time, ITECS can scope a parallel-track option during consultation.",
  },
  {
    question: "Is the program delivered onsite or virtually?",
    answer:
      "The program can be delivered virtually, onsite, or as a mix of both. Virtual delivery usually happens through Microsoft Teams or Zoom. Onsite sessions beyond a 20-mile radius from the Plano office may include travel costs.",
  },
  {
    question: "How is this different from sending an employee to an online AI course?",
    answer:
      "Online courses teach general concepts. This program teaches your Champion how to apply AI to your business, using your platforms, your workflows, and your risk controls. The deliverables are built for your environment, and the Champion has a 90-day support window after completion.",
  },
] as const;

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_CONFIG.url}/services/ai-champion-program#service`,
  name: "Internal AI Champion Enablement Program",
  serviceType: "AI Training and Enablement",
  description:
    "A 4-6 week structured enablement program that trains one trusted employee to become the organization's internal AI lead.",
  url: `${SITE_CONFIG.url}/services/ai-champion-program`,
  provider: {
    "@type": "LocalBusiness",
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: SITE_CONFIG.address.country,
    },
  },
  areaServed: [
    { "@type": "City", name: "Dallas" },
    { "@type": "City", name: "Plano" },
    { "@type": "State", name: "Texas" },
  ],
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "8500",
    highPrice: "12000",
    priceCurrency: "USD",
    offerCount: 2,
    url: `${SITE_CONFIG.url}/services/ai-champion-program#pricing`,
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_CONFIG.url}/services/ai-champion-program#course`,
  name: "Internal AI Champion Enablement Program",
  description:
    "A structured 4-6 week curriculum that teaches prompt engineering, AI workflow design, governance, train-the-trainer methods, measurement, and long-term AI operations.",
  provider: {
    "@type": "Organization",
    name: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
  },
  courseMode: ["Online", "Onsite", "Blended"],
  timeRequired: "P6W",
  educationalCredentialAwarded: "Certificate of Completion",
  about: [
    "AI training for SMB",
    "AI enablement",
    "Prompt engineering",
    "AI governance",
    "Internal AI lead development",
  ],
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "8500",
    highPrice: "12000",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: `${SITE_CONFIG.url}/services/ai-champion-program#pricing`,
  },
};

function SectionShell({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-8">{children}</div>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-light tracking-[-0.02em] text-text-primary md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-relaxed text-text-secondary">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ConsultationLink({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={bookingHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-brand-accent px-6 py-3 text-sm font-medium uppercase tracking-wide text-bg-void transition-colors hover:bg-brand-accent-bright ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export default function AIChampionProgramPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-24 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            {
              label: "AI Champion Program",
              href: "/services/ai-champion-program",
            },
          ]}
        />
      </div>

      <section className="relative overflow-hidden pb-24 pt-12 md:pb-32 md:pt-20">
        <GridBackground opacity={0.03} />
        <GradientOrb color="cyan" size="lg" position={{ top: "0", right: "5%" }} />
        <GradientOrb
          color="purple"
          size="md"
          position={{ bottom: "10%", left: "8%" }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <ScrollReveal>
            <p className="mb-5 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">
              <span className="h-px w-8 bg-brand-accent" />
              Internal AI Champion Program
            </p>
            <h1 className="max-w-4xl text-4xl font-extralight leading-[1.05] tracking-[-0.03em] text-text-primary md:text-6xl lg:text-7xl">
              Build the AI capability your business will rely on for the next
              decade.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary md:text-xl">
              ITECS trains one trusted employee to become the internal AI lead
              your organization needs. In 4 to 6 weeks, the Champion learns the
              platforms, governance practices, prompt libraries, and workflow
              habits that make AI useful across the business.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ConsultationLink>Schedule a Consultation</ConsultationLink>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-[var(--border-subtle)] px-6 py-3 text-sm font-medium uppercase tracking-wide text-text-secondary transition-colors hover:border-brand-accent hover:text-brand-accent"
              >
                Request Program Details
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4">
              {[
                { value: "4-6", label: "week curriculum" },
                { value: "1:1", label: "strategist coaching" },
                { value: "90", label: "day support window" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[var(--border-subtle)] bg-bg-surface/55 p-3 sm:p-5"
                >
                  <div className="text-2xl font-extralight text-brand-accent-bright sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[0.62rem] uppercase leading-snug tracking-[0.12em] text-text-dim sm:text-xs sm:tracking-[0.16em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.12}>
            <div className="relative rounded-3xl border border-[var(--border-subtle)] bg-bg-surface/55 p-3 shadow-2xl shadow-black/30">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src="/images/team/team-office.webp"
                  alt="The ITECS team collaborating in the Plano office"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 92vw"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-3 p-4 md:grid-cols-2">
                {[
                  {
                    icon: Award,
                    title: "Certificate of Completion",
                    text: "A formal record for the employee who completes the program.",
                  },
                  {
                    icon: BookOpenCheck,
                    title: "Applied Learning",
                    text: "The Champion builds prompts, workflows, and training assets during the engagement.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-xl border border-[var(--border-subtle)] bg-bg-void/60 p-4"
                    >
                      <div className="mb-2 flex items-center gap-2 text-brand-accent-bright">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <h2 className="text-sm font-medium text-text-primary">
                          {item.title}
                        </h2>
                      </div>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CircuitTrace variant="section-divider" />

      <SectionShell>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <ScrollReveal>
            <SectionIntro
              eyebrow="Why This Exists"
              title="The wrong way to adopt AI is to stay dependent on outside consultants forever."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="space-y-5 text-lg leading-relaxed text-text-secondary">
              <p>
                Across SMB and mid-market organizations, AI tools are rolling
                out quickly. The harder question is who owns AI after the first
                pilot, who keeps employees using it correctly, and who knows
                when a new use case is worth investment.
              </p>
              <p>
                Without an internal champion, AI adoption often starts with
                excitement, slows after consultants leave, and turns into shadow
                AI usage as employees return to whatever tools they already
                know.
              </p>
              <p>
                ITECS built this program to transfer prompt engineering,
                governance, training, and platform knowledge into one trusted
                employee, creating capability that compounds over time.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </SectionShell>

      <SectionShell className="border-y border-[var(--border-subtle)] bg-bg-surface/25">
        <ScrollReveal>
          <SectionIntro
            centered
            eyebrow="Program Fit"
            title="Three signs your organization is ready for an AI Champion."
            description="This program is built for leadership teams that want AI adoption to become an internal capability, not a permanent external dependency."
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {fitSignals.map((signal, index) => (
            <ScrollReveal key={signal.title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-void/55 p-6 transition-colors hover:border-brand-accent/35">
                <h3 className="text-xl font-light text-text-primary">
                  {signal.title}
                </h3>
                <p className="mt-4 leading-relaxed text-text-secondary">
                  {signal.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <ScrollReveal>
            <SectionIntro
              eyebrow="What You Get"
              title="A Champion who can lead practical adoption."
              description="The outcome is not a generic course transcript. Your Champion leaves with usable assets, tested workflows, and a better operating rhythm for AI inside the business."
            />
          </ScrollReveal>
          <div className="grid gap-3 md:grid-cols-2">
            {outcomes.map((outcome, index) => (
              <ScrollReveal key={outcome} delay={index * 0.035}>
                <div className="flex h-full items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/45 p-4">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent-bright"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {outcome}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell className="relative border-y border-[var(--border-subtle)] bg-bg-void">
        <GridBackground opacity={0.02} />
        <div className="relative">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <ScrollReveal>
              <SectionIntro
                eyebrow="Curriculum"
                title="A structured 4 to 6 week curriculum, tailored to your business."
                description="Every Champion's curriculum is customized to the AI platforms, industry, and use cases that matter to your organization. The six-week version is shown below. The four-week version compresses Weeks 5 and 6 into the existing cadence."
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-5">
                <div className="flex items-start gap-3">
                  <Clock3
                    className="mt-1 h-5 w-5 shrink-0 text-brand-accent-bright"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-text-secondary">
                    Each week includes about 3 to 5 hours of synchronous time
                    with an ITECS AI Strategist plus 4 to 6 hours of applied
                    work in your real environment.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="mt-12 grid gap-4">
            {curriculum.map((item, index) => (
              <ScrollReveal key={item.week} delay={index * 0.05}>
                <article className="grid gap-4 rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/45 p-5 md:grid-cols-[140px_1fr]">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-brand-accent-bright">
                      {item.week}
                    </p>
                    <h3 className="mt-2 text-lg font-light text-text-primary">
                      {item.theme}
                    </h3>
                  </div>
                  <p className="leading-relaxed text-text-secondary">
                    {item.details}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <ScrollReveal>
          <SectionIntro
            centered
            eyebrow="Deliverables"
            title="What walks out the door with your Champion."
            description="The program creates working assets that stay with your organization after the coaching engagement ends."
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {deliverables.map((item, index) => (
            <ScrollReveal key={item} delay={index * 0.04}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-bg-surface/45 p-5">
                <BookOpenCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent-bright"
                  aria-hidden="true"
                />
                <p className="leading-relaxed text-text-secondary">{item}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="pricing"
        className="border-y border-[var(--border-subtle)] bg-bg-surface/25"
      >
        <ScrollReveal>
          <SectionIntro
            centered
            eyebrow="Pricing"
            title="Two program lengths. One outcome."
            description="Both options are designed to create durable in-house AI capability. The right fit depends on how mature your current AI deployment is."
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {pricingOptions.map((option, index) => (
            <ScrollReveal key={option.name} delay={index * 0.08}>
              <article
                className={`h-full rounded-2xl border p-6 ${
                  option.featured
                    ? "border-brand-accent/40 bg-brand-accent/5"
                    : "border-[var(--border-subtle)] bg-bg-void/55"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-light text-text-primary">
                      {option.name}
                    </h3>
                    <p className="mt-2 text-text-dim">{option.duration}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-4xl font-extralight text-brand-accent-bright">
                      {option.price}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.15em] text-text-dim">
                      Investment
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    ["Best for", option.bestFor],
                    ["Curriculum", option.coverage],
                    ["Coaching", option.coaching],
                    ["Deliverables", option.deliverables],
                    ["90-day support", "Included"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="grid gap-2 border-t border-[var(--border-subtle)] pt-4 sm:grid-cols-[150px_1fr]"
                    >
                      <p className="text-sm font-medium uppercase tracking-[0.12em] text-brand-accent">
                        {label}
                      </p>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {[
            {
              title: "Loyalty discount",
              text: "Existing ITECS managed IT clients receive a 10% loyalty discount at the MSP Pro tier and 15% at the MSP Elite tier. The discount is applied at engagement.",
            },
            {
              title: "What is not included",
              text: "AI platform licensing, custom agent development, MCP development, full workforce training rollouts, and travel beyond a 20-mile radius from the Plano office are scoped separately.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[var(--border-subtle)] bg-bg-void/55 p-5"
            >
              <h3 className="font-medium text-text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <ScrollReveal>
          <SectionIntro
            centered
            eyebrow="How It Works"
            title="From kickoff to internal capability in under two months."
            description="The engagement is structured, practical, and designed around the work your Champion will lead after the program ends."
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-4 lg:grid-cols-5">
          {timeline.map((item, index) => (
            <ScrollReveal key={item.step} delay={index * 0.06}>
              <article className="h-full rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/45 p-5">
                <div className="mb-5 inline-flex rounded-lg bg-brand-accent/10 px-3 py-2 text-sm font-medium text-brand-accent-bright">
                  {item.step}
                </div>
                <p className="text-xs uppercase tracking-[0.16em] text-text-dim">
                  {item.timing}
                </p>
                <h3 className="mt-2 text-lg font-light text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </SectionShell>

      <CircuitTrace variant="section-divider" />

      <SectionShell className="bg-bg-surface/25">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <ScrollReveal>
            <SectionIntro
              eyebrow="Why ITECS"
              title="A regional IT and security partner, not a faceless training platform."
              description={`ITECS has been a trusted IT and security partner to Dallas-Fort Worth businesses since ${SITE_CONFIG.foundingYear}. Our AI consulting practice is led by strategists who work on real production rollouts, so the Champion learns from someone actively practicing the work.`}
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ConsultationLink>Schedule a Fit Call</ConsultationLink>
              <a
                href={`tel:${SITE_CONFIG.phoneE164}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border-subtle)] px-6 py-3 text-sm font-medium uppercase tracking-wide text-text-secondary transition-colors hover:border-brand-accent hover:text-brand-accent"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {SITE_CONFIG.phone}
              </a>
            </div>
          </ScrollReveal>
          <div className="grid gap-4">
            {[
              {
                icon: UserRoundCheck,
                title: "Real strategist, not recorded content",
                text: "Every program is delivered 1:1 by a senior ITECS AI Strategist. The Champion works with a person who is actively building and supporting AI rollouts for business clients.",
              },
              {
                icon: ClipboardCheck,
                title: "Customized to your platform stack",
                text: "Whether your team uses Claude, ChatGPT, Gemini, Microsoft Copilot, or several tools at once, the curriculum is built around the systems your employees actually use.",
              },
              {
                icon: ShieldCheck,
                title: "Grounded in real client work",
                text: "The program is shaped by ITECS engagements across construction, healthcare, financial services, professional services, and manufacturing.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={index * 0.06}>
                  <article className="rounded-2xl border border-[var(--border-subtle)] bg-bg-void/55 p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent-bright">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-light text-text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-2 leading-relaxed text-text-secondary">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <ScrollReveal>
          <SectionIntro
            centered
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="These are the questions leadership teams usually ask before choosing an internal AI Champion."
          />
        </ScrollReveal>
        <div className="mx-auto mt-14 max-w-4xl divide-y divide-[var(--border-subtle)] rounded-2xl border border-[var(--border-subtle)] bg-bg-surface/40">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group p-6" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <h3 className="text-lg font-light text-text-primary">
                  {faq.question}
                </h3>
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] text-brand-accent transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-text-secondary">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="relative overflow-hidden border-y border-[var(--border-subtle)] bg-bg-void">
        <GradientOrb color="cyan" size="md" position={{ top: "-160px", left: "12%" }} />
        <div className="relative mx-auto max-w-4xl text-center">
          <Sparkles className="mx-auto mb-5 h-8 w-8 text-brand-accent-bright" />
          <h2 className="text-3xl font-light text-text-primary md:text-5xl">
            Build the AI capability your business will rely on.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
            The organizations that adopt AI most successfully are the ones that
            own their AI capability internally. A 30-minute consultation is the
            best next step to identify the right Champion candidate and confirm
            program fit.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ConsultationLink>Schedule a Consultation</ConsultationLink>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-[var(--border-subtle)] px-6 py-3 text-sm font-medium uppercase tracking-wide text-text-secondary transition-colors hover:border-brand-accent hover:text-brand-accent"
            >
              Contact the ITECS Team
            </Link>
          </div>
        </div>
      </SectionShell>

      <JsonLd data={serviceSchema} />
      <JsonLd data={courseSchema} />
      <JsonLd data={generateFAQSchema(faqs)} />
    </>
  );
}
