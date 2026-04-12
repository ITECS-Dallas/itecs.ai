import { generatePageMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = generatePageMetadata({
  title: "AI Services for Dallas Enterprises",
  description:
    "Explore ITECS AI services: consulting & strategy, managed AI operations, chatbot development, security compliance, and AI-optimized SEO for Dallas businesses.",
  path: "/services",
  keywords: [
    "AI Services Dallas",
    "AI Consulting Dallas",
    "Managed AI Dallas",
    "AI Chatbot Development",
    "AI Security Compliance",
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
          AI Services for Dallas Enterprises
        </h1>
        <p className="mt-4 text-lg text-text-secondary max-w-2xl">
          From strategy to managed operations, every service is backed by 22
          years of production IT experience. Vendor-neutral, security-first, and
          built for regulated industries.
        </p>
      </div>

      <ServicesGrid />
      <CTASection />

      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Services", url: `${SITE_CONFIG.url}/services` },
        ])}
      />
    </>
  );
}
