'use client';
import React from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from '../components/dashboard/Dashboard';
import KpiCard from '../components/dashboard/KpiCard';
import SecurityEventsLog from '../components/dashboard/SecurityEventsLog';
import ThreatMap from '../components/dashboard/ThreatMap';
import AlertsBySeverityChart from '../components/dashboard/AlertsBySeverityChart';
import EventsOverTimeChart from '../components/dashboard/EventsOverTimeChart';
import { kpiData } from '@/lib/threat-monitoring-data';

// This is the main component that assembles the entire dashboard.
export default function Dashboard() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0514] to-[#110f19]">
            {/* FIX: Made the header sticky below the main navbar (6.5rem = 104px)
                and set its z-index to 30 to sit below the mobile menu (z-40). */}
            <div className="sticky top-[6.5rem] z-30">
                <DashboardHeader />
            </div>

            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                >
                    {/* KPI Cards */}
                    {kpiData.map((data, index) => (
                        <KpiCard key={index} {...data} />
                    ))}

                    {/* Events Over Time Chart */}
                    <div className="md:col-span-2 lg:col-span-4 xl:col-span-3">
                        <EventsOverTimeChart />
                    </div>
                    
                    {/* Alerts by Severity Chart */}
                    <div className="md:col-span-2 lg:col-span-4 xl:col-span-2">
                         <AlertsBySeverityChart />
                    </div>

                    {/* Threat Map */}
                    <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
                        <ThreatMap />
                    </div>
                    
                    {/* Security Events Log */}
                    <div className="md:col-span-2 lg:col-span-2 xl:col-span-3">
                        <SecurityEventsLog />
                    </div>

                </motion.div>
            </main>
        </div>
    );
}