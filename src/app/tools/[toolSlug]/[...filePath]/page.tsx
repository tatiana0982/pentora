import { FileViewer } from "@/app/components/tools/FileViewer";

type PageProps = {
  params: Promise<{
    toolSlug: string;
    filePath: string[];
  }>;
};

// This page receives the file path from the URL and renders the FileViewer
export default async function FileDisplayPage({ params }: PageProps) {
  const { toolSlug, filePath } = await params;
  const fullPath = filePath.join('/');

  return <FileViewer repoId={toolSlug} filePath={fullPath} />;
}