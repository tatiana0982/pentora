'use client';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Loader2, AlertTriangle } from 'lucide-react';

// A helper to guess the language from the file extension
const getLanguage = (filePath: string) => {
    const extension = filePath.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'js': return 'javascript';
        case 'jsx': return 'jsx';
        case 'ts': return 'typescript';
        case 'tsx': return 'tsx';
        case 'py': return 'python';
        case 'css': return 'css';
        case 'json': return 'json';
        case 'md': return 'markdown';
        case 'sh': return 'bash';
        default: return 'plaintext';
    }
};

export const FileViewer = ({ repoId, filePath }: { repoId: string, filePath: string }) => {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        
        fetch(`/api/file-content?repoId=${repoId}&filePath=${encodeURIComponent(filePath)}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch file: ${res.statusText}`);
                }
                return res.json();
            })
            .then(data => {
                setContent(data.content);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [repoId, filePath]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[500px] text-gray-500">
                <Loader2 className="animate-spin mr-2" />
                <span>Loading file...</span>
            </div>
        );
    }
    
    if (error) {
        return (
             <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-red-400">
                <AlertTriangle className="w-12 h-12 mb-4" />
                <p className="font-semibold">Could not load file content.</p>
                <p className="text-sm text-gray-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg bg-[#1E1E1E] border border-white/10 overflow-hidden">
            <div className="px-4 py-2 bg-black/30 border-b border-white/10 text-sm text-gray-400 font-mono">
                {filePath}
            </div>
             <SyntaxHighlighter
                language={getLanguage(filePath)}
                style={vscDarkPlus}
                showLineNumbers
                customStyle={{ margin: 0, background: 'transparent' }}
             >
                {content}
            </SyntaxHighlighter>
        </div>
    );
};