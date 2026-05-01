import type { Metadata } from "next";
import ProposalContent from "@/components/proposals/fcc-proposal-b2630d";

export const metadata: Metadata = {
  title: "First Choice Containers Proposal | ITECS",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default function ProposalPage() {
  return (
    <div className="min-h-screen">
      <ProposalContent />
    </div>
  );
}
