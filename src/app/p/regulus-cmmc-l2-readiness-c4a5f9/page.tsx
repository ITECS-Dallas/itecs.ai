import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ProposalContent from "@/components/proposals/regulus-cmmc-l2-readiness-c4a5f9";
import { hasProposalAccess } from "@/lib/proposals/access";

const proposalSlug = "regulus-cmmc-l2-readiness-c4a5f9";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Regulus Industries CMMC Level 2 Readiness Proposal | ITECS",
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
