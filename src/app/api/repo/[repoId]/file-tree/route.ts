import { NextRequest, NextResponse } from "next/server";
import { generateFileTree } from "@/lib/mockToolData"; // We will create this file next

export async function GET(
  req: NextRequest,
  { params }: { params: { repoId: string } }
) {
  const { repoId } = params;

  // Generate a mock file tree based on the tool's ID (slug)
  const fileTree = generateFileTree(repoId);

  if (!fileTree || fileTree.length === 0) {
    return NextResponse.json(
      { error: `Repository '${repoId}' not found or is empty.` },
      { status: 404 }
    );
  }

  // Successfully return the file tree structure
  return NextResponse.json({ fileTree });
}
