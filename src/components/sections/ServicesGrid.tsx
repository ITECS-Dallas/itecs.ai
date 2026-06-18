import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bot,
  Brain,
  GraduationCap,
  Search,
  Server,
  ServerCog,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import {
  AI_SEO_OVERVIEW,
  HOMEPAGE_SERVICE_BLURBS,
  SERVICES,
  SITE_CONFIG,
} from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap = LucideIcons as unknown as Record<string, LucideIcon>;

const homepageSolutions = [
  {
    title: "Managed Intelligence Provider",
    href: "/managed-intelligence-provider",
    description:
      "Operate AI like managed infrastructure: monitored workflows, governance, reporting, and continuous improvement.",
    icon: ServerCog,
  },
  {
    title: "AI Consulting & Strategy",
    href: "/consulting",
    description:
      "Prioritize the workflows, business case, guardrails, and adoption roadmap before investing in tools.",
    icon: Brain,
  },
  {
    title: "Custom AI Agents",
    href: "/custom-ai-agents",
    description:
      "Build governed agents around approved data, retrieval, human review, tool access, and audit trails.",
    icon: Bot,
  },
  {
    title: "Workflow Automation",
    href: "/automation",
    description:
      "Connect CRM, inbox, service, finance, and operating systems so repetitive work moves with control.",
    icon: Workflow,
  },
  {
    title: "AI Training",
    href: "/training",
    description:
      "Train teams on safe prompting, approved use cases, role-based workflows, and responsible AI habits.",
    icon: GraduationCap,
  },
  {
    title: "AI DevOps",
    href: "/ai-devops",
    description:
      "Version, test, monitor, and improve prompts, agents, retrieval systems, and model costs after launch.",
    icon: ShieldCheck,
  },
] as const;

const blurbsBySlug = Object.fromEntries(
  HOMEPAGE_SERVICE_BLURBS.map((blurb) => [blurb.slug, blurb]),
);

type ServiceCardItem = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  cta?: string;
  external?: boolean;
};

function ServiceCard({ item }: { item: ServiceCardItem }) {
  const Icon = item.icon;

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group chamfer-md flex h-full flex-col border border-dashed border-[var(--border-strong)] bg-brand-subtle p-6 transition-[transform,border-color] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-itecs-blue"
      >
        <CardContent item={item} icon={Icon} />
      </a>
    );
  }

  return (
    <Card href={item.href} className="flex h-full flex-col">
      <CardContent item={item} icon={Icon} />
    </Card>
  );
}

function CardContent({
  item,
  icon: Icon,
}: {
  item: ServiceCardItem;
  icon: LucideIcon;
}) {
  return (
    <>
      <div className="chamfer-sm mb-5 flex h-12 w-12 items-center justify-center bg-brand-subtle text-itecs-blue">
        <Icon aria-hidden="true" className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-body">
        {item.description}
      </p>
      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-itecs-blue-bright transition-colors group-hover/card:text-itecs-blue">
        {item.cta ?? "Learn more"}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </div>
    </>
  );
}

function getExpandedServices(showSisterSiteCard: boolean): ServiceCardItem[] {
  const serviceCards = SERVICES.map((service) => {
    const blurb = blurbsBySlug[service.slug];
    const Icon = iconMap[service.icon] ?? LucideIcons.Cpu;

    return {
      title: service.shortTitle,
      href: service.href,
      description: blurb
        ? `${blurb.blurb}${blurb.anchorText}${blurb.afterAnchor}`
        : service.longDescription,
      icon: Icon,
    };
  });

  const cards: ServiceCardItem[] = [
    ...serviceCards,
    {
      title: "AI-Optimized SEO",
      href: AI_SEO_OVERVIEW.href,
      description:
        "Generative Engine Optimization for ChatGPT, Google AI Overviews, Claude, and Perplexity visibility.",
      icon: Search,
      cta: "Explore AI-SEO tiers",
    },
  ];

  if (showSisterSiteCard) {
    cards.push({
      title: "Looking for Managed IT, Cybersecurity, or Cloud?",
      href: SITE_CONFIG.mainSiteUrl,
      description:
        "For day-to-day IT support, Microsoft 365, cybersecurity monitoring, Azure, and managed cloud, visit the main ITECS site.",
      icon: Server,
      cta: "Visit itecsonline.com",
      external: true,
    });
  }

  return cards;
}

export function ServicesGrid({
  showSisterSiteCard = false,
}: {
  showSisterSiteCard?: boolean;
} = {}) {
  const cards: ServiceCardItem[] = showSisterSiteCard
    ? getExpandedServices(showSisterSiteCard)
    : homepageSolutions.map((item) => ({ ...item }));

  return (
    <section id="managed-ai" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Managed AI Services"
          title="Six ways ITECS moves AI from strategy to operations."
          description="Focused AI services for leadership teams that need useful systems, controlled data, and an operating model after launch."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((item) => (
            <ServiceCard key={`${item.href}-${item.title}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
