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

const personas = [
  {
    title: "Growing past the pilot",
    description:
      "You have piloted Claude, ChatGPT, Gemini, Microsoft Copilot, or another AI tool in one team. Now leadership wants to expand AI across departments, and you need an internal owner who can guide that rollout without calling a consultant for every new use case.",
  },
  {
    title: "Building governance and trust",
    description:
      "Your legal, compliance, or security team needs clear rules for acceptable use, audit trails, vendor selection, and shadow AI controls. You need an internal lead who understands the tools well enough to enforce policy without slowing the business down.",
  },
  {
    title: "Reducing long-term consulting cost",
    description:
      "Outside expertise still matters for strategy and complex builds, but routine prompt refinement, employee onboarding, and day-to-day optimization should not consume senior consulting hours forever.",
  },
] as const;

const outcomes = [
  "Lead AI platform adoption across multiple departments without constant external dependency.",
  "Build, test, and refine production-grade prompts and prompt libraries for your workflows.",
  "Document AI-driven workflows that employees can use in daily work.",
  "Train new employees on AI tools using a curriculum tailored to your environment.",
  "Prioritize new AI use cases based on business impact, cost, risk, and feasibility.",
  "Support your AI Acceptable Use Policy and identify shadow AI usage before it becomes a larger risk.",
  "Compare Claude, ChatGPT, Gemini, Copilot, and other tools without being locked into one vendor.",
  "Bring ITECS or another outside expert back in only when senior judgment is truly needed.",
] as const;

const curriculum = [
  {
    week: "Week 1",
    theme: "Foundation and goal-setting",
    details:
      "The Champion learns AI fundamentals in the context of your industry, reviews the selected platform stack, completes account and workspace orientation, and walks through the governance rules that will shape adoption.",
  },
  {
    week: "Week 2",
    theme: "Real-work prompt engineering",
    details:
      "The Champion shadows an ITECS AI Strategist on live prompt work. Together they build the first three production-quality prompts for a real workflow, including testing, documentation, and refinement steps.",
  },
  {
    week: "Week 3",
    theme: "Workflow and library design",
    details:
      "The Champion learns how to organize document sets, structure project workspaces, and build reusable prompt libraries that scale by role, department, and business process.",
  },
  {
    week: "Week 4",
    theme: "Train-the-trainer",
    details:
      "The Champion practices onboarding new users, answering practical questions from non-technical staff, writing executive updates, and running a training session with strategist feedback.",
  },
  {
    week: "Week 5",
    theme: "Expansion and measurement",
    details:
      "For the six-week track, the Champion learns how to identify and rank new use cases, measure ROI, and build a practical expansion plan for the next two quarters.",
  },
  {
    week: "Week 6",
    theme: "Governance and sustainability",
    details:
      "For the six-week track, the Champion learns how to monitor shadow AI, evaluate new tools, support vendor decisions, and operate with a clear 90-day handoff plan.",
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
    step: "1",
    milestone: "Discovery call",
    timing: "Week 0",
    description:
      "A 30-minute conversation with an ITECS AI Strategist to identify the Champion candidate and confirm program fit.",
  },
  {
    step: "2",
    milestone: "Kickoff",
    timing: "Week 0-1",
    description:
      "Engagement letter signed, curriculum customized, platform stack reviewed, and Champion goals confirmed.",
  },
  {
    step: "3",
    milestone: "Program delivery",
    timing: "Weeks 1-4 or 1-6",
    description:
      "Weekly coaching, real-work shadowing, prompt building, workflow documentation, and applied learning.",
  },
  {
    step: "4",
    milestone: "Handoff and certification",
    timing: "Final week",
    description:
      "The Champion runs the first internal training session, completes the handoff plan, and receives a Certificate of Completion.",
  },
  {
    step: "5",
    milestone: "90-day support",
    timing: "Months 2-4",
    description:
      "The Champion has access to the assigned strategist for questions, refinement, and quarterly check-ins.",
  },
] as const;

const differentiators = [
  {
    icon: UserRoundCheck,
    title: "Real strategist, not recorded content",
    description:
      "Every program is delivered 1:1 by a senior ITECS AI Strategist. The Champion works with a person who is actively building and supporting AI rollouts for business clients.",
  },
  {
    icon: ClipboardCheck,
    title: "Customized to your platform stack",
    description:
      "Whether your team uses Claude, ChatGPT, Gemini, Microsoft Copilot, or several tools at once, the curriculum is built around the systems your employees actually use.",
  },
  {
    icon: ShieldCheck,
    title: "Grounded in real client work",
    description:
      "The program is shaped by ITECS engagements across construction, healthcare, financial services, professional services, and manufacturing. The Champion learns practical patterns, not theory alone.",
  },
] as const;

const faqs = [
  {
    question: "What kind of employee should we nominate as our AI Champion?",
    answer:
      "The strongest candidates combine curiosity, clear communication, and respect across the organization. Job titles vary. We have worked with operations managers, IT leads, executive assistants, project managers, and line-of-business power users. A technical background helps, but it is not required.",
  },
  {
    question: "How much time does the Champion need to commit?",
    answer:
      "Plan on 7 to 11 hours per week during the program. About 3 to 5 hours are synchronous coaching and shadowing sessions. The remaining 4 to 6 hours are applied work, such as building prompts, drafting documentation, and applying the week's curriculum to your environment.",
  },
  {
    question: "What if our Champion leaves the company after the program?",
    answer:
      "The prompt libraries, training decks, operations playbook, governance documentation, and roadmap stay with your organization. Losing the Champion would still be disruptive, but the documented knowledge gives the next owner a clear starting point. ITECS can also scope a refresher program for a replacement Champion.",
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

function SectionIntro({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase text-[#2E5090]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold leading-tight text-[#14213D] md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-relaxed text-[#42526B]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ConsultationButton({
  children = "Schedule a Consultation",
  compact = false,
}: {
  children?: string;
  compact?: boolean;
}) {
  return (
    <a
      href={bookingHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#2E5090] font-semibold text-white transition-colors hover:bg-[#244374] focus:outline-none focus:ring-2 focus:ring-[#2E5090] focus:ring-offset-2 ${
        compact ? "px-5 py-3 text-sm" : "px-6 py-4 text-sm"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export default function AIChampionProgramPage() {
  return (
    <>
      <div className="bg-[#F5F5F5] pt-[72px] font-[Arial,Helvetica,sans-serif] text-[#14213D]">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
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

        <section className="overflow-hidden border-b border-[#D9E2EC] bg-[#E8F0F8] py-14 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase text-[#2E5090]">
                Internal AI Champion Program
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-[#102033] md:text-6xl">
                Build the AI capability your business will rely on for the next
                decade, inside your own team.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#394A5F] md:text-xl">
                Most organizations adopt AI by hiring outside consultants
                indefinitely. ITECS takes a different approach: in 4 to 6 weeks,
                we train one trusted employee to become the AI leader your
                organization needs, fluent in the platforms, governance, and
                workflows that will scale across your team.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ConsultationButton />
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-[#2E5090] px-6 py-4 text-sm font-semibold text-[#2E5090] transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E5090] focus:ring-offset-2"
                >
                  Request the Program One-Pager
                </Link>
              </div>
              <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["4-6 weeks", "Structured curriculum"],
                  ["1:1", "Senior strategist coaching"],
                  ["90 days", "Post-program support"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-[#C8D6E5] bg-white/70 p-4"
                  >
                    <dt className="text-2xl font-semibold text-[#2E5090]">
                      {value}
                    </dt>
                    <dd className="mt-1 text-sm text-[#52657D]">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[#C8D6E5] bg-white shadow-xl shadow-[#2E5090]/10">
                <Image
                  src="/images/team/team-office.webp"
                  alt="The ITECS team collaborating in the Plano office"
                  fill
                  priority
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-[#C8D6E5] bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#2E5090]">
                    <Award className="h-4 w-4" aria-hidden="true" />
                    Certificate of Completion
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#52657D]">
                    A formal record for the employee who completes the program.
                  </p>
                </div>
                <div className="rounded-lg border border-[#C8D6E5] bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#2E5090]">
                    <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                    Applied Learning
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#52657D]">
                    The Champion builds real prompts, workflows, and training
                    materials during the engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionIntro
              eyebrow="Why This Exists"
              title="The wrong way to adopt AI is forever dependent on outside consultants."
            />
            <div className="space-y-5 text-lg leading-relaxed text-[#42526B]">
              <p>
                Across the SMB and mid-market landscape, organizations are
                rolling out AI tools at unprecedented speed. The challenge is
                not only the technology. The larger challenge is long-term
                capability: who owns AI after the first pilot is complete, and
                who helps employees use it safely every week?
              </p>
              <p>
                Without an internal champion, AI adoption tends to follow a
                familiar pattern: an enthusiastic launch, declining momentum
                after consultants leave, and shadow AI usage as employees
                return to whatever tools they already know.
              </p>
              <p>
                ITECS built the Internal AI Champion Enablement Program to break
                that cycle. We transfer prompt engineering, governance, training,
                and platform knowledge into one trusted employee so your
                organization creates AI capability that compounds over time.
              </p>
              <div className="pt-2">
                <ConsultationButton compact>Discuss Your AI Roadmap</ConsultationButton>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#D9E2EC] bg-[#F5F5F5] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <SectionIntro
              centered
              eyebrow="Program Fit"
              title="Three signs your organization is ready for an AI Champion."
              description="This program is built for leadership teams that want AI adoption to become an internal capability, not a permanent external dependency."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {personas.map((persona) => (
                <article
                  key={persona.title}
                  className="rounded-lg border border-[#D9E2EC] bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-[#14213D]">
                    {persona.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-[#52657D]">
                    {persona.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-8 lg:grid-cols-[0.82fr_1.18fr]">
            <SectionIntro
              eyebrow="What You Get"
              title="By program completion, your AI Champion will be able to lead practical adoption."
              description="The outcome is not a generic course transcript. Your Champion leaves with usable assets, tested workflows, and a better operating rhythm for AI inside the business."
            />
            <div className="grid gap-3 md:grid-cols-2">
              {outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="flex items-start gap-3 rounded-lg border border-[#D9E2EC] bg-[#F8FAFC] p-4"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#2E5090]"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-[#42526B]">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#D9E2EC] bg-[#F5F5F5] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <SectionIntro
                eyebrow="Curriculum"
                title="A structured 4 to 6 week curriculum, tailored to your business."
                description="Every Champion's curriculum is customized to the AI platforms, industry, and use cases that matter to your organization. The six-week version is shown below. The four-week version compresses Weeks 5 and 6 into the existing cadence."
              />
              <div className="rounded-lg border border-[#C8D6E5] bg-white p-5">
                <div className="flex items-start gap-3">
                  <Clock3
                    className="mt-1 h-5 w-5 shrink-0 text-[#2E5090]"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-[#52657D]">
                    Each week includes about 3 to 5 hours of synchronous time
                    with an ITECS AI Strategist plus 4 to 6 hours of applied
                    work in your real environment.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 grid gap-4">
              {curriculum.map((item) => (
                <article
                  key={item.week}
                  className="grid gap-4 rounded-lg border border-[#D9E2EC] bg-white p-5 md:grid-cols-[140px_1fr]"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#2E5090]">
                      {item.week}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-[#14213D]">
                      {item.theme}
                    </h3>
                  </div>
                  <p className="leading-relaxed text-[#52657D]">
                    {item.details}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <ConsultationButton compact>
                Review the Curriculum With ITECS
              </ConsultationButton>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <SectionIntro
              centered
              eyebrow="Deliverables"
              title="What walks out the door with your Champion at program completion."
              description="The program creates working assets that stay with your organization after the coaching engagement ends."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {deliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-[#D9E2EC] bg-[#F8FAFC] p-5"
                >
                  <BookOpenCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#2E5090]"
                    aria-hidden="true"
                  />
                  <p className="leading-relaxed text-[#42526B]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="border-y border-[#D9E2EC] bg-[#E8F0F8] py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <SectionIntro
              centered
              eyebrow="Pricing"
              title="Two program lengths. One outcome."
              description="Both options are designed to create durable in-house AI capability. The right fit depends on how mature your current AI deployment is."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {pricingOptions.map((option) => (
                <article
                  key={option.name}
                  className={`rounded-lg border bg-white p-6 shadow-sm ${
                    option.featured
                      ? "border-[#2E5090] shadow-[#2E5090]/10"
                      : "border-[#C8D6E5]"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-[#14213D]">
                        {option.name}
                      </h3>
                      <p className="mt-2 text-[#52657D]">{option.duration}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-4xl font-semibold text-[#2E5090]">
                        {option.price}
                      </p>
                      <p className="mt-1 text-sm text-[#52657D]">Investment</p>
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
                        className="grid gap-1 border-t border-[#D9E2EC] pt-4 sm:grid-cols-[150px_1fr]"
                      >
                        <p className="text-sm font-semibold text-[#2E5090]">
                          {label}
                        </p>
                        <p className="text-sm leading-relaxed text-[#52657D]">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg border border-[#C8D6E5] bg-white p-5">
                <h3 className="font-semibold text-[#14213D]">
                  Loyalty discount
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657D]">
                  Existing ITECS managed IT clients receive a 10% loyalty
                  discount at the MSP Pro tier and 15% at the MSP Elite tier.
                  The discount is applied at engagement.
                </p>
              </div>
              <div className="rounded-lg border border-[#C8D6E5] bg-white p-5">
                <h3 className="font-semibold text-[#14213D]">
                  What is not included
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52657D]">
                  AI platform licensing, custom agent development, MCP
                  development, full workforce training rollouts, and travel
                  beyond a 20-mile radius from the Plano office are scoped
                  separately.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <SectionIntro
              centered
              eyebrow="How It Works"
              title="From kickoff to internal capability in under two months."
              description="The engagement is structured, practical, and designed around the work your Champion will lead after the program ends."
            />
            <div className="mt-12 grid gap-4 lg:grid-cols-5">
              {timeline.map((item) => (
                <article
                  key={item.step}
                  className="rounded-lg border border-[#D9E2EC] bg-[#F8FAFC] p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2E5090] text-sm font-semibold text-white">
                    {item.step}
                  </div>
                  <p className="mt-5 text-sm font-semibold text-[#2E5090]">
                    {item.timing}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[#14213D]">
                    {item.milestone}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#52657D]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#D9E2EC] bg-[#F5F5F5] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <SectionIntro
                  eyebrow="Why ITECS"
                  title="A regional IT and security partner, not a faceless training platform."
                  description={`ITECS has been a trusted IT and security partner to Dallas-Fort Worth businesses since ${SITE_CONFIG.foundingYear}. Our AI consulting practice is led by senior strategists who work on real production rollouts, so the Champion learns from someone actively practicing the work.`}
                />
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ConsultationButton compact>Schedule a Fit Call</ConsultationButton>
                  <a
                    href={`tel:${SITE_CONFIG.phoneE164}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#2E5090] px-5 py-3 text-sm font-semibold text-[#2E5090] transition-colors hover:bg-white"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
              <div className="grid gap-4">
                {differentiators.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className="rounded-lg border border-[#D9E2EC] bg-white p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E8F0F8] text-[#2E5090]">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#14213D]">
                            {item.title}
                          </h3>
                          <p className="mt-2 leading-relaxed text-[#52657D]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <SectionIntro
              centered
              eyebrow="FAQ"
              title="Frequently asked questions"
              description="These are the questions leadership teams usually ask before choosing an internal AI Champion."
            />
            <div className="mt-12 divide-y divide-[#D9E2EC] rounded-lg border border-[#D9E2EC] bg-white">
              {faqs.map((faq, index) => (
                <details key={faq.question} className="group p-6" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-[#14213D]">
                      {faq.question}
                    </h3>
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C8D6E5] text-[#2E5090] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-[#52657D]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#14213D] py-20 text-white md:py-28">
          <div className="mx-auto max-w-5xl px-6 text-center md:px-8">
            <Sparkles className="mx-auto h-9 w-9 text-[#9CC7F2]" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
              Build the AI capability your business will rely on.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-[#D5E4F5]">
              The organizations that adopt AI most successfully are the ones
              that own their AI capability internally. A 30-minute consultation
              is the best next step. We will discuss your AI roadmap, identify
              the right Champion candidate, and confirm program fit.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={bookingHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 text-sm font-semibold text-[#14213D] transition-colors hover:bg-[#E8F0F8] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#14213D]"
              >
                Schedule a Consultation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/40 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#14213D]"
              >
                Contact the ITECS Team
              </Link>
            </div>
          </div>
        </section>
      </div>

      <JsonLd data={serviceSchema} />
      <JsonLd data={courseSchema} />
      <JsonLd data={generateFAQSchema(faqs)} />
    </>
  );
}
