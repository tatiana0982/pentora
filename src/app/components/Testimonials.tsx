'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- SVG Icon Components ---
const AlertTriangleIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);

// --- Animated Counter Component ---
const AnimatedCounter = ({ value, label, details }: { value: number; label: string; details: string; }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const start = 0;
        const duration = 2000; // ms
        const increment = value / (duration / 16); // assuming ~60fps
        let current = start;
        const interval = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(interval);
            } else {
                setCount(Math.round(current));
            }
        }, 16);
        return () => clearInterval(interval);
    }, [value]);

    return (
        <div className="bg-black/20 p-6 rounded-lg border border-white/10 h-full">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">
                {count.toLocaleString()}
            </p>
            <p className="font-semibold text-white mt-2 text-sm sm:text-base">{label}</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-snug">{details}</p>
        </div>
    );
};

// --- Threat Feed Data & Component ---
const threatFeedData = [
    { type: 'APT28 Activity', location: 'EMEA Financial Sector', status: 'Neutralized' },
    { type: 'Zero-Day Exploit', location: 'APAC Cloud Provider', status: 'Patched' },
    { type: 'DDoS Attempt', location: 'NORAM E-commerce', status: 'Mitigated' },
    { type: 'Ransomware Signature', location: 'Global Logistics Network', status: 'Blocked' },
    { type: 'Phishing Campaign', location: 'LATAM Healthcare', status: 'Contained' },
];

const ThreatFeed = () => {
    const extendedFeed = [...threatFeedData, ...threatFeedData];
    return (
        <div className="bg-black/20 p-6 rounded-lg border border-white/10 h-full overflow-hidden">
            <h3 className="font-bold text-lg sm:text-xl mb-4 text-white">Live Threat Feed</h3>
            <div className="relative h-full">
                <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,white_80%,transparent_100%)]">
                    <motion.div
                        className="flex flex-col gap-4"
                        animate={{ y: ['0%', '-50%'] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                        {extendedFeed.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 text-xs sm:text-sm">
                                <AlertTriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-200">{item.type}</p>
                                    <p className="text-xs sm:text-sm text-gray-400">{item.location}</p>
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-green-400">{item.status}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// --- Main Global SOC Component ---
const GlobalSOC = () => {
    return (
        <section className="relative bg-[#0A0514] text-white py-16 sm:py-24 lg:py-32 flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(99,102,241,0.2),transparent_60%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

            <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }} className="text-center">
                    <p className="text-indigo-400 font-semibold mb-3 tracking-wider text-sm sm:text-base">24/7 Global Operations</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">AI-Powered Global Security Operations Center</h2>
                    <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">Our GSOC is the nerve center of our defensive capabilities, providing continuous monitoring, advanced threat detection, and rapid response across the globe.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
                >
                    <AnimatedCounter value={1473281} label="Threats Neutralized Today" details="Real-time analysis and mitigation of malicious activities." />
                    <AnimatedCounter value={28500000} label="Assets Under Protection" details="Endpoints, cloud instances, and networks actively monitored." />
                    <AnimatedCounter value={12} label="Active Incidents" details="High-priority security events currently under investigation." />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 h-[400px] sm:h-[500px]"
                >
                    <div className="lg:col-span-1 h-full">
                        <ThreatFeed />
                    </div>
                    <div className="lg:col-span-2 h-full bg-black/20 p-6 rounded-lg border border-white/10 relative overflow-hidden flex items-center justify-center">
                        <h3 className="absolute top-6 left-6 font-bold text-lg text-white">Global Threat Activity</h3>
                        <img src="globe.png" alt="Globe" className="max-h-full max-w-full object-contain" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GlobalSOC;
