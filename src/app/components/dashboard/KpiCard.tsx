'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { KpiData } from '@/lib/threat-monitoring-data';

// This component displays a single Key Performance Indicator.
export default function KpiCard({ title, value, trend, trendType, Icon }: KpiData) {
    const trendConfig = {
        up: { icon: ArrowUp, color: 'text-red-400' },
        down: { icon: ArrowDown, color: 'text-green-400' },
        neutral: { icon: null, color: 'text-gray-400' },
    };
    
    const { icon: TrendIcon, color: trendColor } = trendConfig[trendType];

    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(124, 58, 237, 0.2)" }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            className="h-full"
        >
            <Card className="h-full bg-card/50 border-purple-900/50 backdrop-blur-sm">
                {/* FIX: Reduced padding on smaller screens for a more compact header */}
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2 sm:p-6 sm:pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                    {/* FIX: Smaller icon on mobile */}
                    <Icon className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
                </CardHeader>
                {/* FIX: Reduced padding for more compact content area */}
                <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                    {/* FIX: Responsive font size for the main value */}
                    <div className="text-2xl font-bold font-headline text-white sm:text-3xl lg:text-4xl">{value}</div>
                    <div className={cn("text-xs flex items-center", trendColor)}>
                        {TrendIcon && <TrendIcon className="h-4 w-4 mr-1" />}
                        <span>{trend}</span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}