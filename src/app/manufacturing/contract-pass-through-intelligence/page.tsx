import { generatePageMetadata } from "@/lib/metadata";
import { getManufacturingSpokePage } from "@/lib/constants";
import { ManufacturingSpokePage } from "@/components/sections/ManufacturingSpokePage";

const page = getManufacturingSpokePage(
  "/manufacturing/contract-pass-through-intelligence"
);

export const metadata = {
  ...generatePageMetadata({
    title: page.title,
    description: page.description,
    path: page.href,
    keywords: page.keywords,
  }),
  title: "Contract AI and Pass-Through Recovery for Manufacturers",
};

export default function ContractPassThroughIntelligencePage() {
  return <ManufacturingSpokePage page={page} />;
}
