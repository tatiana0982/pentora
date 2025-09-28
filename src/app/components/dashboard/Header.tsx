'use client';
import React from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Bell, UserCircle, Settings } from 'lucide-react';

// The header provides top-level navigation and controls for the dashboard.
export default function DashboardHeader() {
    return (
        <header className="sticky top-16 z-40 flex h-20 items-center justify-between border-b border-purple-900/50 bg-black/30 px-4 backdrop-blur-lg md:px-8">
            <div className="flex items-center gap-4">
                 <div className="flex flex-col">
                    <h1 className="font-headline text-2xl font-bold text-white">
                        Threat Monitoring
                    </h1>
                    <p className="text-sm text-purple-300">Global Security Operations Center</p>
                 </div>
            </div>
            <div className="flex items-center gap-2">
                <Select defaultValue="24h">
                    <SelectTrigger className="w-[180px] bg-card border-purple-800/60">
                        <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1h">Last Hour</SelectItem>
                        <SelectItem value="24h">Last 24 Hours</SelectItem>
                        <SelectItem value="7d">Last 7 Days</SelectItem>
                        <SelectItem value="30d">Last 30 Days</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <UserCircle className="h-6 w-6" />
                </Button>
            </div>
        </header>
    );
}

