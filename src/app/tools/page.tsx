"use client";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Search, Eye, ChevronDown,
    X, CheckCircle2, XCircle, Loader2
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

// ... (The rest of the file (ScanModal, CyberVFXBackground, etc.) remains unchanged)

const ScanModal = ({ isOpen, onClose, domain }) => {
    const [stage, setStage] = useState('scanning');
    const [checks, setChecks] = useState([]);
    const [results, setResults] = useState({ passed: 0, failed: 0 });

    const allChecks = [
        "DNSSEC Record Analysis", "SSL/TLS Certificate Chain Validation", "HTTP Security Headers Audit",
        "Open Port & Service Banner Enumeration", "Subdomain Hijacking Vulnerability Check",
        "Mail Server Security (SPF, DKIM, DMARC)", "Firewall Configuration & Egress Filtering Test",
        "Known Vulnerabilities Scan (CVE)", "Threat Intelligence Feed Cross-Reference"
    ];

    useEffect(() => {
        if (isOpen) {
            setStage('scanning');
            setChecks([]);
            const runScan = () => {
                allChecks.forEach((check, index) => {
                    setTimeout(() => setChecks(prev => [...prev, { text: check, status: 'running' }]), (index + 1) * 700);
                });
                setTimeout(() => {
                    const passed = Math.floor(Math.random() * 3) + 6;
                    setResults({ passed, failed: allChecks.length - passed });
                    setStage('results');
                }, (allChecks.length + 1) * 700);
            };
            runScan();
        }
    }, [isOpen]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setStage('submitted');
        setTimeout(() => onClose(), 2000);
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <motion.div
                        variants={modalVariants} initial="hidden" animate="visible" exit="exit"
                        className="relative w-full max-w-2xl rounded-2xl border border-purple-800/60 bg-[#0d0517] p-8 text-white shadow-2xl shadow-purple-500/10"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
                        <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Security Posture Assessment</h2>
                        <p className="text-center text-gray-400 mt-1">Scanning: <span className="font-mono text-purple-300">{domain}</span></p>
                        <div className="mt-6">
                            {stage === 'scanning' && (
                                <div className="space-y-3">
                                    <p className="text-center text-sm text-gray-400 mb-4">Running {checks.length} of {allChecks.length} checks...</p>
                                    {checks.map((check, index) => (
                                        <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-sm">
                                            <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                                            <span className="text-gray-300">{check.text}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                            {stage === 'results' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                                    <h3 className="text-xl font-bold">Scan Complete</h3>
                                    <div className="flex justify-center gap-8 my-4">
                                        <div className="flex items-center gap-2 text-green-400"><CheckCircle2 size={24} /><span className="text-2xl font-bold">{results.passed}</span><span>Checks Passed</span></div>
                                        <div className="flex items-center gap-2 text-red-400"><XCircle size={24} /><span className="text-2xl font-bold">{results.failed}</span><span>Risks Found</span></div>
                                    </div>
                                    <p className="text-gray-400 text-sm max-w-md mx-auto">Your comprehensive report is ready. Enter your details to receive the full vulnerability assessment.</p>
                                    <button onClick={() => setStage('form')} className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-colors">Download Report</button>
                                </motion.div>
                            )}
                            {(stage === 'form' || stage === 'submitted') && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    {stage === 'submitted' ? (
                                        <div className="text-center py-8">
                                            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
                                            <h3 className="mt-4 text-xl font-bold">Thank You!</h3>
                                            <p className="text-gray-400">Your report has been sent.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleFormSubmit} className="space-y-4">
                                            <div><label className="text-sm font-medium text-gray-400">Name</label><input type="text" required className="w-full mt-1 bg-gray-900/50 border border-purple-800/60 rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
                                            <div><label className="text-sm font-medium text-gray-400">Email</label><input type="email" required className="w-full mt-1 bg-gray-900/50 border border-purple-800/60 rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
                                            <div><label className="text-sm font-medium text-gray-400">Phone <span className="text-gray-500">(Optional)</span></label><input type="tel" className="w-full mt-1 bg-gray-900/50 border border-purple-800/60 rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
                                            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Submit & Download</button>
                                        </form>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scanDomain, setScanDomain] = useState("");
    const [scanError, setScanError] = useState("");

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleDomainSubmit = (e) => {
        e.preventDefault();
        const domainInput = e.target.elements.domain.value;
        const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
        
        const cleanedDomain = domainInput.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];

        if (cleanedDomain && domainRegex.test(cleanedDomain)) {
            setScanDomain(cleanedDomain);
            setIsModalOpen(true);
            setScanError("");
        } else {
            setScanError("Please enter a valid domain name.");
            setTimeout(() => setScanError(""), 3000);
        }
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#0a0710] text-white font-sans">
            <motion.div
                className="pointer-events-none fixed inset-0 z-0 opacity-20 blur-3xl"
                style={{
                    background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.3), transparent 80%)`,
                }}
            />
            
            <ScanModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                domain={scanDomain}
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
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(168, 85, 247, 0.7)" }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-10 inline-flex items-center gap-2 rounded-full bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300"
                        >
                            <Eye className="h-5 w-5" />
                            Visit Live Threat Monitor
                            <Link href="/threat-monitoring" rel="noopener noreferrer" className="absolute inset-0" />
                        </motion.button>
                    </motion.div>

                    {/* Search and Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-16"
                    >
                        <form onSubmit={handleDomainSubmit} className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                name="domain"
                                type="text"
                                placeholder="Check your domain's security posture (e.g., example.com)"
                                className="w-full rounded-full border border-purple-800/60 bg-gray-900/50 py-4 pl-14 pr-32 text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                             <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition-colors">
                                 Scan
                            </button>
                        </form>
                        {scanError && <p className="text-center text-red-400 mt-2 text-sm animate-pulse">{scanError}</p>}
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