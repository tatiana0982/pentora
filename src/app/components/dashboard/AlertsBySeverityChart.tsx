'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { alertsBySeverityData } from '@/lib/threat-monitoring-data';

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 rounded-lg border bg-card/80 backdrop-blur-sm text-xs shadow-lg">
                <p className="font-bold text-white">{`${payload[0].name}: ${payload[0].value.toLocaleString()}`}</p>
            </div>
        );
    }
    return null;
};

// A pie chart showing the distribution of alerts by severity.
export default function AlertsBySeverityChart() {
    return (
        <Card className="h-full bg-card/50 border-purple-900/50 backdrop-blur-sm">
            <CardHeader>
                {/* FIX: Smaller font size on mobile and tablets */}
                <CardTitle className="text-base font-bold text-white md:text-lg">Alerts by Severity</CardTitle>
            </CardHeader>
            {/* FIX: Reduced height for smaller screens */}
            <CardContent className="h-[220px] pb-6 md:h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}/>
                        <Pie
                            data={alertsBySeverityData}
                            // FIX: Centered left to make space for the vertical legend
                            cx="40%"
                            cy="50%"
                            // FIX: Reduced radius to fit smaller container
                            innerRadius={50}
                            outerRadius={70}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                        >
                            {alertsBySeverityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
                            ))}
                        </Pie>
                         {/* FIX: Vertical legend with smaller text for compact screens */}
                         <Legend 
                            iconType="circle" 
                            layout="vertical" 
                            verticalAlign="middle" 
                            align="right"
                            formatter={(value) => <span className="text-xs text-muted-foreground md:text-sm">{value}</span>}
                         />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}