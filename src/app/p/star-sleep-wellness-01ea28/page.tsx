import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ProposalContent from "@/components/proposals/star-sleep-wellness-01ea28";
import { hasProposalAccess } from "@/lib/proposals/access";

const proposalSlug = "star-sleep-wellness-01ea28";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Star Sleep & Wellness Managed Services Proposal | ITECS",
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
