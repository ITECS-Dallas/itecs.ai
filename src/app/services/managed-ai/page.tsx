import { generatePageMetadata } from "@/lib/metadata";
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ServiceFeatures } from "@/components/sections/ServiceFeatures";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import Link from "next/link";

const service = SERVICES.find((s) => s.slug === "managed-ai")!;

export const metadata = generatePageMetadata({
  title: service.title,
  description: service.description,
  path: service.href,
  keywords: service.keywords,
});

export default function ManagedAIPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.shortTitle, href: service.href },
        ]} />
      </div>
      <ServiceHero service={service} />
      <ServiceFeatures features={service.features} />
      <ServiceStats stats={service.stats} />

      <section className="py-12 mx-auto max-w-7xl px-6 md:px-8">
        <h2 className="text-2xl font-light text-text-primary mb-4">Related Services</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/services/ai-consulting" className="text-brand-accent hover:text-brand-accent-bright transition-colors text-sm">AI Consulting & Strategy &rarr;</Link>
          <Link href="/services/ai-security-compliance" className="text-brand-accent hover:text-brand-accent-bright transition-colors text-sm">AI Security & Compliance &rarr;</Link>
        </div>
      </section>

      <FAQ items={service.faq} heading="Managed AI FAQ" />
      <CTASection />
      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateBreadcrumbSchema([
        { name: "Home", url: SITE_CONFIG.url },
        { name: "Services", url: `${SITE_CONFIG.url}/services` },
        { name: service.shortTitle, url: `${SITE_CONFIG.url}${service.href}` },
      ])} />
    </>
  );
}
