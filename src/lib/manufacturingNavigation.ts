export interface ManufacturingNavigationDataItem {
  label: string;
  href: string;
  iconName: string;
  desc: string;
}

export const MANUFACTURING_HUB_NAV_DATA = {
  label: "Manufacturing AI Hub",
  href: "/manufacturing",
  iconName: "Factory",
  desc: "AI for manufacturing finance, operations, quality, and supply chain decisions",
} as const satisfies ManufacturingNavigationDataItem;

export const MANUFACTURING_USE_CASE_NAV_DATA = [
  {
    label: "PPV Agent",
    href: "/manufacturing/ppv-agent",
    iconName: "BadgeDollarSign",
    desc: "Purchase price variance and commodity cost intelligence",
  },
  {
    label: "Demand & S&OP",
    href: "/manufacturing/demand-forecasting-sop-ai",
    iconName: "LineChart",
    desc: "Forecast confidence and planning scenarios",
  },
  {
    label: "Predictive Maintenance",
    href: "/manufacturing/predictive-maintenance-ai",
    iconName: "Activity",
    desc: "Downtime risk and asset reliability",
  },
  {
    label: "Inventory & Working Capital",
    href: "/manufacturing/inventory-working-capital-ai",
    iconName: "Boxes",
    desc: "Inventory cash, aging, and service risk",
  },
  {
    label: "Quality & Traceability",
    href: "/manufacturing/quality-traceability-ai",
    iconName: "ScanSearch",
    desc: "Quality anomalies and recall readiness",
  },
  {
    label: "Customer/SKU Profitability",
    href: "/manufacturing/customer-sku-profitability-ai",
    iconName: "ChartNoAxesCombined",
    desc: "Margin by customer, SKU, and program",
  },
  {
    label: "Production Planning",
    href: "/manufacturing/production-scheduling-yield-ai",
    iconName: "UsersRound",
    desc: "Schedule, yield, and labor risk",
  },
  {
    label: "Contract Recovery",
    href: "/manufacturing/contract-pass-through-intelligence",
    iconName: "FileSearch",
    desc: "Escalators, pass-throughs, and terms",
  },
  {
    label: "Energy & Freight",
    href: "/manufacturing/energy-freight-scope-3-ai",
    iconName: "Truck",
    desc: "Landed cost and customer evidence",
  },
  {
    label: "Vendor Anomaly Detection",
    href: "/manufacturing/vendor-payment-anomaly-ai",
    iconName: "ShieldCheck",
    desc: "AP, vendor, and payment exceptions",
  },
] as const satisfies readonly ManufacturingNavigationDataItem[];
