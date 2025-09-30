"use client";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight, Eye, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { toolsData } from '@/lib/toolData';

// --- ENHANCED TOOL CARD with 3D TILT ---
const ToolCard = ({ tool }) => {
    const cardRef = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const rotateYValue = 20 * ((x - width / 2) / (width / 2));
        const rotateXValue = -20 * ((y - height / 2) / (height / 2));
        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    const typeColor = {
        'Proprietary': 'bg-fuchsia-500/10 text-fuchsia-400',
        'Open Source': 'bg-green-500/10 text-green-400',
        'Commercial': 'bg-blue-500/10 text-blue-400',
        'Enterprise': 'bg-purple-500/10 text-purple-400'
    };

    return (
        <Link href={`/tools/${tool.id}`} className="block h-full focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-2xl">
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`,
                    transition: 'transform 0.3s ease-out'
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group relative h-full rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-full h-1/2 bg-[radial-gradient(circle_at_top,_rgba(168,_85,_247,_0.2),_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10">{tool.icon}</div>
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${typeColor[tool.type] || ''}`}>
                            {tool.type}
                        </span>
                    </div>
                    <div className="mt-4 flex-grow">
                        <h3 className="text-xl font-bold text-gray-50">{tool.name}</h3>
                        <p className="mt-1 text-purple-300 text-sm">{tool.category}</p>
                        <p className="mt-3 text-gray-400 text-sm leading-relaxed">{tool.description}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-end">
                        <div className="flex items-center text-sm text-purple-400 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                            Explore Tool <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

const CyberVFXBackground = ({ children }) => {
    const ref = useRef(null);
    return (
        <div ref={ref} className="relative">
            <div className="absolute inset-0 z-[-1] overflow-hidden">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
            {children}
        </div>
    );
};

const ToolCategory = ({ title, tools, isInitiallyOpen = false }) => {
    const [isExpanded, setIsExpanded] = useState(isInitiallyOpen);
    const visibleTools = isExpanded ? tools : tools.slice(0, 3);

    return (
        <div className="relative pl-16">
            <div className="absolute top-2 left-6 h-6 w-6 rounded-full bg-fuchsia-500/50 border-2 border-fuchsia-400 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-fuchsia-300"></div>
            </div>
            <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-8 capitalize bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
            >
                {title}
            </motion.h2>
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {visibleTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                ))}
            </motion.div>
            {tools.length > 3 && (
                <div className="mt-8 text-center">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10"
                    >
                        {isExpanded ? 'Show Less' : 'Show More'}
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                            <ChevronDown className="h-4 w-4" />
                        </motion.div>
                    </button>
                </div>
            )}
        </div>
    );
};

const ToolsPage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#0a0710] text-white font-sans">
            <motion.div
                className="pointer-events-none fixed inset-0 z-0 opacity-20 blur-3xl"
                style={{
                    background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.3), transparent 80%)`,
                }}
            />
            <Navbar />
            <div className="relative z-10 p-4 sm:p-6 md:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-center py-20 sm:py-28"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase">
                            <span className="bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-500 to-purple-600">PENTORA</span>
                            <span className="block text-gray-400">Cyber Toolkit</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-400">
                            A curated & proprietary arsenal of industry-leading tools to elevate your security posture.
                        </p>
                    </motion.div>

                    {/* Tools Sections with Tracing Beam */}
                    <CyberVFXBackground>
                        <div className="space-y-20">
                            {Object.entries(toolsData).map(([sectionTitle, tools], index) => (
                                <ToolCategory 
                                    key={sectionTitle} 
                                    title={sectionTitle} 
                                    tools={tools} 
                                    isInitiallyOpen={index === 0}
                                />
                            ))}
                        </div>
                    </CyberVFXBackground>
                    <div className='mt-20'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolsPage;
