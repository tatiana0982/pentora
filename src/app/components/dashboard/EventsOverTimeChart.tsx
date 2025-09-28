'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { eventsOverTimeData } from '@/lib/threat-monitoring-data';

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 rounded-lg border bg-card/80 backdrop-blur-sm text-xs shadow-lg">
                <p className="label font-bold text-white">{label}</p>
                {payload.map((pld: any) => (
                    <p key={pld.dataKey} style={{ color: pld.stroke }}>{`${pld.name}: ${pld.value}`}</p>
                ))}
            </div>
        );
    }
    return null;
};

// An area chart showing threat event trends over the last 30 days.
export default function EventsOverTimeChart() {
    return (
        <Card className="h-full bg-card/50 border-purple-900/50 backdrop-blur-sm">
            <CardHeader>
                {/* FIX: Responsive font size for title */}
                <CardTitle className="text-base font-bold text-white md:text-lg">Events Over Time (30 Days)</CardTitle>
                {/* FIX: Hide description on smallest screens to save space */}
                <CardDescription className="hidden sm:block">Trending of high and critical severity alerts.</CardDescription>
            </CardHeader>
            {/* FIX: Responsive height for the chart container */}
            <CardContent className="h-[220px] p-2 md:h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={eventsOverTimeData}
                        // FIX: Reduced right margin for better fit on mobile
                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(124, 58, 237, 0.2)" />
                        {/* FIX: Smaller font size for axis ticks */}
                        <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }} />
                        {/* FIX: Responsive legend text */}
                        <Legend formatter={(value) => <span className="text-xs text-muted-foreground md:text-sm">{value}</span>} />
                        {/* FIX: Added subtle animation for a more "impressive" feel */}
                        <Area type="monotone" dataKey="Critical" stroke="#ef4444" strokeWidth={2} fill="url(#colorCritical)" animationDuration={500} />
                        <Area type="monotone" dataKey="High" stroke="#f97316" strokeWidth={2} fill="url(#colorHigh)" animationDuration={500} />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}