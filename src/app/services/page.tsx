import { generatePageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = generatePageMetadata({
  title: "AI Services for Dallas Small Businesses",
  description:
    "AI consulting, workflow automation, custom ChatGPT development, and employee AI training for Dallas businesses with 10–300 employees. Practical AI that saves time and money.",
  path: "/services",
  keywords: [
    "small business AI services Dallas",
    "AI automation Dallas",
    "custom ChatGPT Dallas",
    "AI consulting Dallas",
    "AI training Dallas",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <div className="pt-32 pb-8 mx-auto max-w-7xl px-6 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
          ]}
        />
        <h1 className="text-4xl md:text-6xl font-extralight tracking-[-0.03em] mt-4">
          AI Services for Dallas Businesses
        </h1>
        <p className="mt-4 text-lg text-text-secondary max-w-2xl">
          Practical AI tools that save your team time and cut operational costs.
          Every service is backed by 22 years of IT operations experience —
          built for businesses with 10–300 employees.
        </p>
      </div>

      <ServicesGrid />
      <CTASection />

    </>
  );
}
