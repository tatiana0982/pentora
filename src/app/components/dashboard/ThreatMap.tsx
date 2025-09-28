'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Globe } from 'lucide-react';
import { threatMapOrigins } from '@/lib/threat-monitoring-data';

// A visual map displaying the geographic origins of cyber threats.
export default function ThreatMap() {
    return (
        <Card className="h-full bg-card/50 border-purple-900/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold text-white">Global Threat Origins</CardTitle>
                <Globe className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="h-[400px] p-0 flex items-center justify-center">
                <div className="relative w-[500px] h-[250px]">
                     <svg viewBox="0 0 1000 500" className="w-full h-full absolute inset-0">
                        {/* Map Background */}
                        <path d="M500,0 C223.86,0,0,111.93,0,250 S223.86,500,500,500 S1000,388.07,1000,250 S776.14,0,500,0 Z" fill="#1e293b" />
                        {/* Glowing Threat Points */}
                        {threatMapOrigins.map((origin, i) => (
                             <motion.g
                                key={origin.id}
                                transform={`translate(${(origin.coords[1] + 180) * (1000/360)}, ${(-origin.coords[0] + 90) * (500/180)})`}
                            >
                                <motion.circle
                                    r={Math.log(origin.attacks) * 2.5}
                                    fill="rgba(239, 68, 68, 0.7)"
                                    stroke="#f87171"
                                    strokeWidth="1"
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                                />
                            </motion.g>
                        ))}
                    </svg>
                </div>
            </CardContent>
        </Card>
    );
}

