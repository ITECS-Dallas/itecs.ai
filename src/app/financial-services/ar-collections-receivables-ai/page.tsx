import { generatePageMetadata } from "@/lib/metadata";
import { getFinancialServicesSpokePage } from "@/lib/constants";
import { FinancialServicesSpokePage } from "@/components/sections/FinancialServicesSpokePage";

const page = getFinancialServicesSpokePage(
  "/financial-services/ar-collections-receivables-ai"
);

export const metadata = generatePageMetadata({
  title: page.title,
  description: page.description,
  path: page.href,
  keywords: page.keywords,
});

export default function ARCollectionsReceivablesPage() {
  return <FinancialServicesSpokePage page={page} />;
}
