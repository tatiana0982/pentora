'use client';
import React from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Bell, UserCircle, Settings } from 'lucide-react';

// The header provides top-level navigation and controls for the dashboard.
export default function DashboardHeader() {
    return (
        // FIX: Reduced header height on mobile (h-16 = 64px)
        <header className="sticky top-16 z-40 flex h-16 items-center justify-between border-b border-purple-900/50 bg-black/30 px-4 backdrop-blur-lg sm:h-20 md:px-8">
            <div className="flex items-center gap-4">
                 <div className="flex flex-col">
                    {/* FIX: Further reduced font size, with smoother scaling */}
                    <h1 className="font-headline text-lg font-bold text-white sm:text-xl md:text-2xl">
                        Threat Monitoring
                    </h1>
                    <p className="hidden text-sm text-purple-300 sm:block">Global Security Operations Center</p>
                 </div>
            </div>
            {/* FIX: Further reduced the gap for mobile */}
            <div className="flex items-center gap-0.5 sm:gap-2">
                <Select defaultValue="24h">
                    {/* FIX: Narrower width and smaller text for mobile */}
                    <SelectTrigger className="h-9 w-[110px] border-purple-800/60 bg-card text-xs sm:h-10 sm:w-[180px] sm:text-sm">
                        <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1h">Last Hour</SelectItem>
                        <SelectItem value="24h">Last 24 Hours</SelectItem>
                        <SelectItem value="7d">Last 7 Days</SelectItem>
                        <SelectItem value="30d">Last 30 Days</SelectItem>
                    </SelectContent>
                </Select>
                {/* FIX: Made icon buttons smaller on mobile (h-9 w-9) */}
                <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                    <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                    <UserCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
            </div>
        </header>
    );
}