import { generatePageMetadata } from "@/lib/metadata";
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema, generateHowToSchema } from "@/lib/seo";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ServiceFeatures } from "@/components/sections/ServiceFeatures";
import { Integrations } from "@/components/sections/Integrations";
import { ServiceStats } from "@/components/sections/ServiceStats";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import Link from "next/link";

const service = SERVICES.find((s) => s.slug === "training")!;

export const metadata = generatePageMetadata({
  title: service.title,
  description: service.description,
  path: service.href,
  keywords: service.keywords,
});

export default function TrainingPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: service.shortTitle, href: service.href },
        ]} />
      </div>
      <ServiceHero service={service} />
      <HowItWorks steps={service.howItWorks} heading={service.howItWorksHeading} />
      <ServiceFeatures features={service.features} />
      <Integrations tools={service.integrations} />
      <ServiceStats stats={service.stats} />

      <section className="py-12 mx-auto max-w-7xl px-6 md:px-8">
        <h2 className="text-2xl font-light text-text-primary mb-4">Related</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/consulting" className="text-brand-accent hover:text-brand-accent-bright transition-colors text-sm">AI Consulting &rarr;</Link>
          <Link href="/custom-chatgpt" className="text-brand-accent hover:text-brand-accent-bright transition-colors text-sm">Custom ChatGPT &rarr;</Link>
          <Link href="/automation" className="text-brand-accent hover:text-brand-accent-bright transition-colors text-sm">AI Automation &rarr;</Link>
        </div>
      </section>

      <FAQ items={service.faq} heading="AI Training FAQ" />
      <CTASection />

      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQSchema(service.faq)} />
      <JsonLd data={generateHowToSchema(service)} />
      <JsonLd data={generateBreadcrumbSchema([
        { name: "Home", url: SITE_CONFIG.url },
        { name: service.shortTitle, url: `${SITE_CONFIG.url}${service.href}` },
      ])} />
    </>
  );
}
