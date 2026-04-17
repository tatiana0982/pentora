import { notFound } from 'next/navigation';
import { FileExplorer } from '@/app/components/tools/FileExplorer';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { toolsData } from '@/lib/toolData';

type FileNode = { name: string; path: string; type: 'file' | 'folder'; children?: FileNode[] };

export async function generateStaticParams() {
  const allTools = Object.values(toolsData).flatMap(tools => tools);
  return allTools.map(tool => ({
    toolSlug: tool.id,
  }));
}

async function getToolFileTree(toolSlug: string): Promise<FileNode[] | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.trypentora.com";
  try {
    const res = await fetch(`${baseUrl}/api/repo/${toolSlug}/file-tree`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.fileTree;
  } catch {
    return null;
  }
}

function getToolDetails(toolSlug: string) {
  for (const category in toolsData) {
    const tool = (toolsData as any)[category].find((t: any) => t.id === toolSlug);
    if (tool) return tool;
  }
  return null;
}

export default async function ToolDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ toolSlug: string }>;
}) {
  const { toolSlug } = await params;

  const [fileTree, toolDetails] = await Promise.all([
    getToolFileTree(toolSlug),
    getToolDetails(toolSlug)
  ]);

  if (!fileTree || !toolDetails) {
    return notFound();
  }

  return (
    <div className="bg-[#0a0710] min-h-screen text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            {toolDetails.name}
          </h1>
          <p className="text-lg text-gray-400 mt-2">{toolDetails.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-3 text-purple-300">Codebase Explorer</h2>
              <div className="p-4 rounded-lg bg-black/40 border border-white/10 max-h-[70vh] overflow-auto">
                <FileExplorer repoId={toolSlug} tree={fileTree} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-9">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full min-h-[500px] text-gray-500">
                  <Loader2 className="animate-spin mr-2" />
                  <span>Loading...</span>
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}