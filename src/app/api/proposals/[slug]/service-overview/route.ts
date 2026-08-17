import { readFile } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import {
  SERVICE_OVERVIEW_FILE,
  getProposalConfig,
  hasProposalAccess,
} from "@/lib/proposals/access";
import { getPublicRequestBaseUrl } from "@/lib/proposals/url";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const proposal = getProposalConfig(slug);

  if (!proposal) {
    return NextResponse.json({ message: "Proposal not found." }, { status: 404 });
  }

  if (!(await hasProposalAccess(slug))) {
    return NextResponse.redirect(
      new URL(`/p/${slug}/access`, getPublicRequestBaseUrl(request)),
    );
  }

  const filePath = join(
    process.cwd(),
    "private",
    "proposals",
    SERVICE_OVERVIEW_FILE.fileName,
  );
  const file = await readFile(filePath);

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${SERVICE_OVERVIEW_FILE.downloadName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
