import {
  Activity,
  BadgeDollarSign,
  BarChart3,
  BookOpen,
  Bot,
  Boxes,
  Brain,
  Building2,
  ChartNoAxesCombined,
  Compass,
  Factory,
  FileSearch,
  GraduationCap,
  LineChart,
  Phone,
  ScanSearch,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Truck,
  UserRoundCheck,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  MANUFACTURING_HUB_NAV_DATA,
  MANUFACTURING_USE_CASE_NAV_DATA,
  type ManufacturingNavigationDataItem,
} from "@/lib/manufacturingNavigation";

export interface LayoutNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  desc: string;
  external?: boolean;
}

export type MenuCategoryAccent = "cyan" | "purple" | "neutral";

export interface MenuCategoryItem {
  label: string;
  desc: string;
  icon: LucideIcon;
  accent: MenuCategoryAccent;
}

export const SERVICE_NAV_ITEMS: LayoutNavItem[] = [
  {
    label: "AI Consulting",
    href: "/consulting",
    icon: Brain,
    desc: "Workflow audit and AI roadmap",
  },
  {
    label: "Custom AI Agents",
    href: "/custom-ai-agents",
    icon: Bot,
    desc: "Claude, Codex, RAG, and app workflows",
  },
  {
    label: "Automation",
    href: "/automation",
    icon: Zap,
    desc: "Connect tools, eliminate handoffs",
  },
  {
    label: "AI DevOps",
    href: "/ai-devops",
    icon: ServerCog,
    desc: "Deploy, monitor, and operate AI",
  },
  {
    label: "AI Training",
    href: "/training",
    icon: GraduationCap,
    desc: "Hands-on workshops for your team",
  },
  {
    label: "AI Champion Program",
    href: "/services/ai-champion-program",
    icon: UserRoundCheck,
    desc: "Develop your internal AI lead",
  },
  {
    label: "AI Receptionist",
    href: "/ai-receptionist",
    icon: Phone,
    desc: "24/7 call answering and booking",
  },
  {
    label: "CRM & Sales AI",
    href: "/crm-sales-ai",
    icon: BarChart3,
    desc: "AI-powered pipeline automation",
  },
  {
    label: "Knowledge Base",
    href: "/ai-knowledge-base",
    icon: BookOpen,
    desc: "Internal RAG search for SOPs",
  },
  {
    label: "Data Audit",
    href: "/data-audit",
    icon: ShieldCheck,
    desc: "Score your AI readiness",
  },
  {
    label: "AI-Optimized SEO",
    href: "/ai-optimized-seo",
    icon: Search,
    desc: "GEO + traditional SEO for Dallas",
  },
];

export const RESOURCE_NAV_ITEMS: LayoutNavItem[] = [
  {
    label: "Insights",
    href: "/insights",
    icon: BookOpen,
    desc: "AI strategy, security, and operations articles",
  },
  {
    label: "AI-Optimized SEO",
    href: "/ai-optimized-seo",
    icon: Search,
    desc: "GEO and traditional SEO for AI-era search",
  },
  {
    label: "Services Overview",
    href: "/services",
    icon: Compass,
    desc: "All ITECS AI services in one place",
  },
];

export const COMPANY_NAV_ITEMS: LayoutNavItem[] = [
  {
    label: "About",
    href: "/about",
    icon: Building2,
    desc: "ITECS AI background and operating model",
  },
  {
    label: "Pricing",
    href: "/pricing",
    icon: BadgeDollarSign,
    desc: "Engagement models and managed AI options",
  },
  {
    label: "Managed Intelligence",
    href: "/managed-intelligence-provider",
    icon: Sparkles,
    desc: "Ongoing AI operations and improvement",
  },
  {
    label: "Contact Us",
    href: "/contact",
    icon: Phone,
    desc: "Start a practical AI conversation",
  },
  {
    label: "ITECS MSP",
    href: "https://itecsonline.com",
    icon: ShieldCheck,
    desc: "Dallas managed IT services from ITECS",
    external: true,
  },
];

export const MENU_CATEGORY_ITEMS: MenuCategoryItem[] = [
  {
    label: "AI Services",
    desc: "Consulting, agents, automation, and AI operations.",
    icon: Brain,
    accent: "cyan",
  },
  {
    label: "Industries",
    desc: "Manufacturing AI hub and use-case pages.",
    icon: Factory,
    accent: "purple",
  },
  {
    label: "Resources",
    desc: "Insights and reference pages.",
    icon: BookOpen,
    accent: "neutral",
  },
  {
    label: "Company",
    desc: "About, pricing, contact, and ITECS MSP.",
    icon: Building2,
    accent: "neutral",
  },
];

const manufacturingIconMap: Record<string, LucideIcon> = {
  Activity,
  BadgeDollarSign,
  Boxes,
  ChartNoAxesCombined,
  Factory,
  FileSearch,
  LineChart,
  ScanSearch,
  ShieldCheck,
  Truck,
  UsersRound,
};

function resolveManufacturingIcon(iconName: string): LucideIcon {
  const icon = manufacturingIconMap[iconName];

  if (!icon) {
    throw new Error(`Unknown manufacturing navigation icon: ${iconName}`);
  }

  return icon;
}

function toLayoutNavItem(item: ManufacturingNavigationDataItem): LayoutNavItem {
  return {
    label: item.label,
    href: item.href,
    icon: resolveManufacturingIcon(item.iconName),
    desc: item.desc,
  };
}

export const MANUFACTURING_HUB_NAV_ITEM: LayoutNavItem = toLayoutNavItem(
  MANUFACTURING_HUB_NAV_DATA
);

export const MANUFACTURING_USE_CASE_NAV_ITEMS: LayoutNavItem[] =
  MANUFACTURING_USE_CASE_NAV_DATA.map(toLayoutNavItem);

export const SECONDARY_NAV_ITEMS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "All Services", href: "/services" },
  { label: "Managed Intelligence", href: "/managed-intelligence-provider" },
] as const;
