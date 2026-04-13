import { generatePageMetadata } from "@/lib/metadata";
import { generateFAQSchema } from "@/lib/seo";
import { INSIGHTS } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import Link from "next/link";

const insight = INSIGHTS.find((i) => i.slug === "secure-business-data-chatgpt")!;

export const metadata = generatePageMetadata({
  title: insight.title,
  description: insight.description,
  path: insight.href,
  keywords: insight.keywords,
});

export default function SecureDataPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-24">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: "Secure Business Data", href: insight.href },
        ]} />
      </div>

      <section className="relative pt-8 pb-16 overflow-hidden">
        <GridBackground opacity={0.03} />
        <GradientOrb color="purple" size="md" position={{ top: "10%", right: "10%" }} />
        <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-8">
          <h1 className="text-3xl md:text-5xl font-extralight tracking-[-0.03em] leading-[1.1]">
            {insight.h1}
          </h1>
          <p className="mt-4 text-text-secondary">
            {insight.description}
          </p>
        </div>
      </section>

      <article className="pb-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8 space-y-6">
          {insight.content.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <p
                className="text-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: paragraph
                    .replace(/\*\*(.*?)\*\*/g, "<strong class='text-text-primary font-medium'>$1</strong>")
                    .replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' class='text-brand-accent hover:text-brand-accent-bright transition-colors underline'>$1</a>"),
                }}
              />
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <div className="mt-8 p-6 rounded-xl border border-[var(--border-active)] bg-brand-accent/5">
              <p className="text-text-primary font-medium">
                Want a private ChatGPT for your business?{" "}
                <Link href={insight.hubHref} className="text-brand-accent hover:text-brand-accent-bright underline">
                  Learn about our {insight.hubLabel} service
                </Link>{" "}
                or{" "}
                <Link href="/contact" className="text-brand-accent hover:text-brand-accent-bright underline">
                  schedule a free AI assessment
                </Link>.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </article>

      <FAQ items={insight.faq} heading="ChatGPT Data Security FAQ" />
      <CTASection />

      <JsonLd data={generateFAQSchema(insight.faq)} />
    </>
  );
}
