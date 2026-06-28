import { generatePageMetadata } from "@/lib/metadata";
import { getFinancialServicesSpokePage } from "@/lib/constants";
import { FinancialServicesSpokePage } from "@/components/sections/FinancialServicesSpokePage";

const page = getFinancialServicesSpokePage(
  "/financial-services/portfolio-monitoring-covenant-ai"
);

export const metadata = generatePageMetadata({
  title: page.title,
  description: page.description,
  path: page.href,
  keywords: page.keywords,
});

export default function PortfolioMonitoringCovenantPage() {
  return <FinancialServicesSpokePage page={page} />;
}
