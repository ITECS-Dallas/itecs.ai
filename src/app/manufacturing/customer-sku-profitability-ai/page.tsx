import { generatePageMetadata } from "@/lib/metadata";
import { getManufacturingSpokePage } from "@/lib/constants";
import { ManufacturingSpokePage } from "@/components/sections/ManufacturingSpokePage";

const page = getManufacturingSpokePage(
  "/manufacturing/customer-sku-profitability-ai"
);

export const metadata = {
  ...generatePageMetadata({
    title: page.title,
    description: page.description,
    path: page.href,
    keywords: page.keywords,
  }),
  title: "Customer and SKU Profitability AI for Manufacturers",
};

export default function CustomerSKUProfitabilityPage() {
  return <ManufacturingSpokePage page={page} />;
}
