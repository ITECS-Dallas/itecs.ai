import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ProposalContent from "@/components/proposals/ai-adoption-agents-arg-3aab89";
import { hasProposalAccess } from "@/lib/proposals/access";

const proposalSlug = "ai-adoption-agents-arg-3aab89";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ARG Companies — AI Adoption & Agent Development Proposal | ITECS",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default async function ProposalPage() {
  if (!(await hasProposalAccess(proposalSlug))) {
    redirect(`/p/${proposalSlug}/access`);
  }

  return (
    <div className="min-h-screen">
      <ProposalContent />
    </div>
  );
}
