'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { securityEventsLogData } from '@/lib/threat-monitoring-data';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const severityConfig = {
    "Critical": "border-red-500/50 bg-red-500/10 text-red-400",
    "High": "border-orange-500/50 bg-orange-500/10 text-orange-300",
    "Medium": "border-yellow-500/50 bg-yellow-500/10 text-yellow-300",
    "Low": "border-blue-500/50 bg-blue-500/10 text-blue-300",
};

const statusConfig = {
    "Blocked": "bg-red-500/20 text-red-300",
    "Investigating": "bg-yellow-500/20 text-yellow-300",
    "Contained": "bg-blue-500/20 text-blue-300",
    "Resolved": "bg-green-500/20 text-green-300",
}

// A log table showing the most recent security events.
export default function SecurityEventsLog() {
    return (
        <Card className="h-full bg-card/50 border-purple-900/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-white">Recent Security Events</CardTitle>
                <CardDescription>Live feed of the latest security incidents and system events.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden sm:table-cell">Severity</TableHead>
                            <TableHead className="w-[60%]">Description</TableHead>
                            <TableHead>Source IP</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {securityEventsLogData.map((event) => (
                             <TableRow key={event.id} className="hover:bg-purple-900/20">
                                <TableCell className="hidden sm:table-cell">
                                    <Badge variant="outline" className={cn("text-xs", severityConfig[event.severity])}>{event.severity}</Badge>
                                </TableCell>
                                <TableCell className="font-medium text-white">{event.description}</TableCell>
                                <TableCell className="font-mono text-xs text-muted-foreground">{event.sourceIp}</TableCell>
                                <TableCell className="text-right">
                                     <Badge className={cn("text-xs", statusConfig[event.status])} variant="secondary">{event.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

