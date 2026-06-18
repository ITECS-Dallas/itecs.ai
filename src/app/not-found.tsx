import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Motifs";
import { HeroGlyph } from "@/components/ui/HeroGlyph";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const quickLinks = [
  { label: "AI Services", href: "/services" },
  { label: "Managed Intelligence", href: "/managed-intelligence-provider" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-36 md:pb-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow className="mb-5">Error 404</Eyebrow>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-[-0.025em] leading-[1.05] text-ink">
            This page isn&apos;t part of the{" "}
            <span className="text-itecs-blue">stack.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-body">
            The page you&apos;re looking for moved or never existed. Head back
            home, or jump straight to what most visitors come here for.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/" size="lg">
              Back to home
            </Button>
            <Button href="/assessment" variant="secondary" size="lg">
              Book a free AI assessment
            </Button>
          </div>

          <div className="mt-10 border-t border-hairline pt-6">
            <p className="eyebrow mb-4">Popular pages</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-itecs-blue hover:text-itecs-blue-bright"
                  >
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hidden justify-center lg:flex">
          <HeroGlyph size={400} />
        </div>
      </div>
    </section>
  );
}
