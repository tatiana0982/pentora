'use client';

import { useState } from 'react';
import Link from 'next/link';
import { File, Folder, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Type definition for FileNode from your types.d.ts
type FileNode = {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

const TreeItem = ({ node, repoId }: { node: FileNode, repoId: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isActive = pathname.endsWith(node.path);

    if (node.type === 'folder') {
        return (
            <div>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer hover:bg-purple-500/10 text-gray-300"
                >
                    <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    <Folder className="w-4 h-4 text-purple-400" />
                    <span>{node.name}</span>
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-4 overflow-hidden"
                        >
                            {node.children?.map(child => <TreeItem key={child.path} node={child} repoId={repoId} />)}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <Link href={`/tools/${repoId}/${node.path}`}>
            <div className={`flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-purple-500/10 ${isActive ? 'bg-purple-500/20 text-white' : 'text-gray-400'}`}>
                <span className="w-4 h-4"></span> {/* Spacer */}
                <File className="w-4 h-4 text-gray-500" />
                <span>{node.name}</span>
            </div>
        </Link>
    );
};

export const FileExplorer = ({ tree, repoId }: { tree: FileNode[], repoId: string }) => {
    return (
        <nav className="text-sm font-mono">
            {tree.map(node => <TreeItem key={node.path} node={node} repoId={repoId} />)}
        </nav>
    );
};