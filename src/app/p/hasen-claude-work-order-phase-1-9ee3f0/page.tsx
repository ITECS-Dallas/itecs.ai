import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ProposalContent from "@/components/proposals/hasen-claude-work-order-phase-1-9ee3f0";
import { hasProposalAccess } from "@/lib/proposals/access";

const proposalSlug = "hasen-claude-work-order-phase-1-9ee3f0";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hasen Phase 1 Claude Work Order Proposal | ITECS",
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
