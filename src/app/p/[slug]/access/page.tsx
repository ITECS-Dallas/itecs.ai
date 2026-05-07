import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { ProposalAccessForm } from "@/components/proposals/ProposalAccessForm";
import { getProposalConfig } from "@/lib/proposals/access";

export const metadata: Metadata = {
  title: "Private Proposal Access | ITECS",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default async function ProposalAccessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proposal = getProposalConfig(slug);

  if (!proposal) {
    notFound();
  }

  const heroImageSrc = proposal.heroImageUrl.replace(/^https:\/\/itecs\.ai/, "");

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-void px-6 py-28 text-text-primary md:px-12 lg:px-24">
      <GradientOrb
        color="cyan"
        size="lg"
        position={{ top: "-240px", right: "-160px" }}
      />
      <GradientOrb
        color="purple"
        size="md"
        position={{ bottom: "-180px", left: "-120px" }}
      />
      <GridBackground opacity={0.03} />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent-bright">
            {proposal.accessEyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.03em] text-text-primary md:text-6xl">
            {proposal.accessHeading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            {proposal.accessDescription}
          </p>
          <div className="mt-8 max-w-2xl">
            <ProposalAccessForm slug={proposal.slug} clientName={proposal.clientName} />
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-bg-surface/50 p-3 shadow-2xl shadow-black/30">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
            <Image
              src={heroImageSrc}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 92vw"
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <div className="rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-4">
              <p className="text-sm leading-relaxed text-text-secondary">
                This access step helps ensure the proposal link is delivered to
                the intended business inbox before the private page opens.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
