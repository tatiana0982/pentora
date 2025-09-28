import { notFound } from 'next/navigation';
import { FileExplorer } from '@/app/components/tools/FileExplorer';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { toolsData } from '@/lib/toolData';

// Re-creating a simplified type here for clarity
type FileNode = { name: string; path: string; type: 'file' | 'folder'; children?: FileNode[]; };

// ** NEW FUNCTION TO FIX 404 ERRORS ON VERCEL **
// This function tells Next.js which dynamic pages to build ahead of time.
export async function generateStaticParams() {
    // Flatten all tools from all categories into a single array
    const allTools = Object.values(toolsData).flatMap(tools => tools);

    // Map over the tools to create an array of objects with the `toolSlug` key
    return allTools.map(tool => ({
        toolSlug: tool.id,
    }));
}


// Fetch the file tree for a specific tool from our API route
async function getToolFileTree(toolSlug: string): Promise<FileNode[] | null> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.trypentora.com";
    try {
        const res = await fetch(`${baseUrl}/api/repo/${toolSlug}/file-tree`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.fileTree;
    } catch (error) {
        console.error("Failed to fetch file tree:", error);
        return null;
    }
}

// Get static details about the tool
function getToolDetails(toolSlug: string) {
    for (const category in toolsData) {
        const tool = (toolsData as any)[category].find((t: any) => t.id === toolSlug);
        if (tool) return tool;
    }
    return null;
}

export default async function ToolDetailLayout({ children, params }: { children: React.ReactNode; params: { toolSlug: string } }) {
    const { toolSlug } = params;
    const [fileTree, toolDetails] = await Promise.all([
        getToolFileTree(toolSlug),
        getToolDetails(toolSlug)
    ]);

    if (!fileTree || !toolDetails) {
        notFound();
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
                    {/* File Explorer */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-24">
                            <h2 className="text-lg font-semibold mb-3 text-purple-300">Codebase Explorer</h2>
                            <div className="p-4 rounded-lg bg-black/40 border border-white/10 max-h-[70vh] overflow-auto">
                                <FileExplorer repoId={toolSlug} tree={fileTree} />
                            </div>
                        </div>
                    </div>
                    {/* File Viewer Area */}
                    <div className="lg:col-span-9">
                         <Suspense fallback={
                             <div className="flex items-center justify-center h-full min-h-[500px] text-gray-500">
                                 <Loader2 className="animate-spin mr-2" />
                                 <span>Loading...</span>
                             </div>
                         }>
                           {children}
                         </Suspense>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

