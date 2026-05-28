import {
  Activity,
  BadgeDollarSign,
  BarChart3,
  BookOpen,
  Bot,
  Boxes,
  Brain,
  ChartNoAxesCombined,
  Factory,
  FileSearch,
  GraduationCap,
  LineChart,
  Phone,
  ScanSearch,
  Search,
  ServerCog,
  ShieldCheck,
  Truck,
  UserRoundCheck,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  MANUFACTURING_VERTICAL,
  PPV_AGENT_USE_CASE,
} from "@/lib/constants";

export interface LayoutNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  desc: string;
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

export const MANUFACTURING_HUB_NAV_ITEM: LayoutNavItem = {
  label: "Manufacturing AI Hub",
  href: MANUFACTURING_VERTICAL.href,
  icon: Factory,
  desc: "AI for manufacturing finance, operations, quality, and supply chain decisions",
};

const manufacturingIconMap: Record<string, LucideIcon> = {
  Activity,
  BadgeDollarSign,
  Boxes,
  ChartNoAxesCombined,
  FileSearch,
  LineChart,
  ScanSearch,
  ShieldCheck,
  Truck,
  UsersRound,
};

const manufacturingUseCaseOrder = [
  "/manufacturing/demand-forecasting-sop-ai",
  "/manufacturing/predictive-maintenance-ai",
  "/manufacturing/inventory-working-capital-ai",
  "/manufacturing/quality-traceability-ai",
  "/manufacturing/customer-sku-profitability-ai",
  "/manufacturing/production-scheduling-yield-ai",
  "/manufacturing/contract-pass-through-intelligence",
  "/manufacturing/energy-freight-scope-3-ai",
  "/manufacturing/vendor-payment-anomaly-ai",
] as const;

type ManufacturingUseCaseHref = (typeof manufacturingUseCaseOrder)[number];

const manufacturingNavCopy: Record<
  ManufacturingUseCaseHref,
  Pick<LayoutNavItem, "label" | "desc">
> = {
  "/manufacturing/demand-forecasting-sop-ai": {
    label: "Demand & S&OP",
    desc: "Forecast confidence and planning scenarios",
  },
  "/manufacturing/predictive-maintenance-ai": {
    label: "Predictive Maintenance",
    desc: "Downtime risk and asset reliability",
  },
  "/manufacturing/inventory-working-capital-ai": {
    label: "Inventory & Working Capital",
    desc: "Inventory cash, aging, and service risk",
  },
  "/manufacturing/quality-traceability-ai": {
    label: "Quality & Traceability",
    desc: "Quality anomalies and recall readiness",
  },
  "/manufacturing/customer-sku-profitability-ai": {
    label: "Customer/SKU Profitability",
    desc: "Margin by customer, SKU, and program",
  },
  "/manufacturing/production-scheduling-yield-ai": {
    label: "Production Planning",
    desc: "Schedule, yield, and labor risk",
  },
  "/manufacturing/contract-pass-through-intelligence": {
    label: "Contract Recovery",
    desc: "Escalators, pass-throughs, and terms",
  },
  "/manufacturing/energy-freight-scope-3-ai": {
    label: "Energy & Freight",
    desc: "Landed cost and customer evidence",
  },
  "/manufacturing/vendor-payment-anomaly-ai": {
    label: "Vendor Anomaly Detection",
    desc: "AP, vendor, and payment exceptions",
  },
};

function resolveManufacturingIcon(iconName: string): LucideIcon {
  const icon = manufacturingIconMap[iconName];

  if (!icon) {
    throw new Error(`Unknown manufacturing navigation icon: ${iconName}`);
  }

  return icon;
}

function resolveManufacturingUseCase(href: ManufacturingUseCaseHref) {
  const useCase = MANUFACTURING_VERTICAL.useCases.find((item) => item.href === href);

  if (!useCase) {
    throw new Error(`Missing manufacturing navigation use case: ${href}`);
  }

  return useCase;
}

function resolveManufacturingNavCopy(
  href: ManufacturingUseCaseHref
): Pick<LayoutNavItem, "label" | "desc"> {
  const copy = manufacturingNavCopy[href];

  if (!copy) {
    throw new Error(`Missing manufacturing navigation copy: ${href}`);
  }

  return copy;
}

export const MANUFACTURING_USE_CASE_NAV_ITEMS: LayoutNavItem[] = [
  {
    label: PPV_AGENT_USE_CASE.shortTitle,
    href: PPV_AGENT_USE_CASE.href,
    icon: BadgeDollarSign,
    desc: "Purchase price variance and commodity cost intelligence",
  },
  ...manufacturingUseCaseOrder.map((href): LayoutNavItem => {
    const useCase = resolveManufacturingUseCase(href);
    const copy = resolveManufacturingNavCopy(href);

    return {
      label: copy.label,
      href,
      icon: resolveManufacturingIcon(useCase.icon),
      desc: copy.desc,
    };
  }),
];

export const SECONDARY_NAV_ITEMS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "All Services", href: "/services" },
  { label: "Managed Intelligence", href: "/managed-intelligence-provider" },
] as const;
