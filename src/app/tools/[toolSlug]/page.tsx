// This file acts as the default content before a file is selected.
import { Loader2 } from "lucide-react";

export default function ToolFileDefaultPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-gray-500 rounded-lg bg-[#1E1E1E] border border-white/10">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p className="font-semibold">Select a file from the explorer</p>
            <p className="text-sm">File content will be displayed here.</p>
        </div>
    );
}
