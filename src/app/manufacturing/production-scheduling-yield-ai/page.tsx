import { generatePageMetadata } from "@/lib/metadata";
import { getManufacturingSpokePage } from "@/lib/constants";
import { ManufacturingSpokePage } from "@/components/sections/ManufacturingSpokePage";

const page = getManufacturingSpokePage(
  "/manufacturing/production-scheduling-yield-ai"
);

export const metadata = generatePageMetadata({
  title: page.title,
  description: page.description,
  path: page.href,
  keywords: page.keywords,
});

export default function ProductionSchedulingYieldPage() {
  return <ManufacturingSpokePage page={page} />;
}
