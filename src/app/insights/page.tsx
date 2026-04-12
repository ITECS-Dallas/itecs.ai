import { generatePageMetadata } from "@/lib/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { INSIGHTS, SITE_CONFIG } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { ArrowRight } from "lucide-react";

export const metadata = generatePageMetadata({
  title: "AI Insights & Guides for Dallas Small Businesses",
  description:
    "Practical AI guides for small business owners in Dallas. Learn how to use ChatGPT safely, automate lead follow-up, and get started with AI — no technical background needed.",
  path: "/insights",
  keywords: [
    "AI guides for small business",
    "how to use AI small business",
    "ChatGPT for business guide",
    "AI automation guide Dallas",
  ],
});

export default function InsightsPage() {
  return (
    <>
      <div className="pt-32 pb-8 mx-auto max-w-7xl px-6 md:px-8">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
        ]} />
        <h1 className="text-4xl md:text-6xl font-extralight tracking-[-0.03em] mt-4">
          AI Insights for Dallas Businesses
        </h1>
        <p className="mt-4 text-lg text-text-secondary max-w-2xl">
          Practical guides on using AI to save time, cut costs, and grow your
          business. Written for business owners, not engineers.
        </p>
      </div>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSIGHTS.map((insight, i) => (
            <ScrollReveal key={insight.slug} delay={i * 0.1}>
              <Card href={insight.href} className="h-full flex flex-col">
                <h2 className="text-lg font-medium text-text-primary mb-2">
                  {insight.title}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">
                  {insight.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm text-brand-accent group-hover:gap-2 transition-all">
                  Read guide
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <JsonLd data={generateBreadcrumbSchema([
        { name: "Home", url: SITE_CONFIG.url },
        { name: "Insights", url: `${SITE_CONFIG.url}/insights` },
      ])} />
    </>
  );
}
