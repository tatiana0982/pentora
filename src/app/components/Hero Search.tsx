// components/HeroSearch.tsx

"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import {
    Search, Eye, X, CheckCircle2, XCircle, Loader2, ChevronDown
} from 'lucide-react';
import Link from 'next/link';

// --- CUSTOM SELECT/DROPDOWN COMPONENT (REDESIGNED) ---
const CustomSelect = ({ options, selected, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={selectRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full mt-1 flex items-center justify-between bg-gray-900/50 border border-purple-800/60 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            >
                <span className={selected ? 'text-white' : 'text-gray-400'}>{selected || placeholder}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={20} className="text-gray-400" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-20 w-full mt-1 bg-[#1a112f] border border-purple-800/60 rounded-lg shadow-lg max-h-48 overflow-y-auto custom-scrollbar"
                    >
                        {options.map(option => (
                            <div
                                key={option}
                                onClick={() => { onChange(option); setIsOpen(false); }}
                                className={`p-2.5 text-gray-300 hover:bg-purple-900/40 cursor-pointer transition-colors ${selected === option ? 'bg-purple-900/60' : ''}`}
                            >
                                {option}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- SCAN MODAL COMPONENT (UPDATED) ---
const ScanModal = ({ isOpen, onClose, domain }) => {
    const [stage, setStage] = useState('scanning');
    const [checks, setChecks] = useState([]);
    const [results, setResults] = useState({ passed: 0, failed: 0 });
    
    // Form state management
    const [formData, setFormData] = useState({ name: '', email: '', company: '', contact: '' });
    const [employeeSize, setEmployeeSize] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const newServiceOptions = [
        "Application Security & VAPT", "Network Security & VAPT", "Cloud-Native Security",
        "Data Security & Privacy Compliance", "Infrastructure Security", "Cyber Threat Intelligence (CTI)",
        "Security Audits & Compliance", "Cybersecurity Consulting", "Red Team Assessments",
        "Managed Security (MSS)", "RF - Mesh VAPT", "Scada/IOT Devices VAPT",
        "Security Awareness & Training"
    ];

    const employeeOptions = ["1-10", "11-50", "51-200", "201-1000", "1000+"];

    const handleServiceChange = (service) => {
        setSelectedServices(prev =>
            prev.includes(service)
                ? prev.filter(s => s !== service)
                : [...prev, service]
        );
    };

    const resetFormState = () => {
        setStage('scanning');
        setChecks([]);
        setFormData({ name: '', email: '', company: '', contact: '' });
        setEmployeeSize(null);
        setSelectedServices([]);
    };

    useEffect(() => {
        if (isOpen) {
            resetFormState();
            const allChecks = [ "DNSSEC Record Analysis", "SSL/TLS Certificate Chain Validation", "HTTP Security Headers Audit", "Open Port & Service Banner Enumeration", "Subdomain Hijacking Vulnerability Check", "Mail Server Security (SPF, DKIM, DMARC)", "Firewall Configuration & Egress Filtering Test", "Known Vulnerabilities Scan (CVE)", "Threat Intelligence Feed Cross-Reference" ];
            const runScan = () => {
                allChecks.forEach((check, index) => {
                    setTimeout(() => setChecks(prev => [...prev, { text: check, status: 'running' }]), (index + 1) * 600);
                });
                setTimeout(() => {
                    const passed = Math.floor(Math.random() * 3) + 6;
                    setResults({ passed, failed: allChecks.length - passed });
                    setStage('results');
                }, (allChecks.length + 1) * 600);
            };
            runScan();
        }
    }, [isOpen]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { name, email, company, contact } = formData;
        if (!name || !email || !company || !contact) { toast.error("Please complete all personal and company details."); return; }
        if (selectedServices.length === 0) { toast.error("Please select at least one service of interest."); return; }
        if (!employeeSize) { toast.error("Please select your company's employee size."); return; }
        setStage('submitted');
        setTimeout(() => onClose(), 3500);
    };

    const modalVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 } };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="relative w-full max-w-3xl rounded-2xl border border-purple-800/60 bg-[#0d0517] p-8 text-white shadow-2xl shadow-purple-500/10">
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-20"><X size={24} /></button>
                        <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Security Posture Assessment</h2>
                        <p className="text-center text-gray-400 mt-1">Scanning: <span className="font-mono text-purple-300">{domain}</span></p>
                        <div className="mt-6 max-h-[70vh] overflow-y-auto pr-3 custom-scrollbar">
                            {stage === 'scanning' && (
                                <div className="h-[320px] overflow-hidden space-y-3">
                                    <p className="text-center text-sm text-gray-400 mb-4">Running {checks.length} of 9 checks...</p>
                                    <AnimatePresence>
                                        {checks.map((check, index) => (
                                            <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="flex items-center gap-3 text-sm">
                                                <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                                                <span className="text-gray-300">{check.text}</span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                            {stage === 'results' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                                    <h3 className="text-xl font-bold">Scan Complete</h3>
                                    <div className="flex justify-center gap-8 my-4"><div className="flex items-center gap-2 text-green-400"><CheckCircle2 size={24} /><span className="text-2xl font-bold">{results.passed}</span><span>Checks Passed</span></div><div className="flex items-center gap-2 text-red-400"><XCircle size={24} /><span className="text-2xl font-bold">{results.failed}</span><span>Risks Found</span></div></div>
                                    <p className="text-gray-400 text-sm max-w-md mx-auto">Your high-level report is ready. Provide your details to receive the full, comprehensive vulnerability assessment.</p>
                                    <button onClick={() => setStage('form')} className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-colors">Download Full Report</button>
                                </motion.div>
                            )}
                            {(stage === 'form' || stage === 'submitted') && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    {stage === 'submitted' ? (
                                        <div className="text-center py-12"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}><CheckCircle2 className="mx-auto h-16 w-16 text-green-500" /></motion.div><h3 className="mt-4 text-2xl font-bold">Report Generation in Progress</h3><p className="text-gray-400 text-lg">It could take up to an hour. Please check your mail for the detailed report.</p></div>
                                    ) : (
                                        <form onSubmit={handleFormSubmit} className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div><label className="text-sm font-medium text-gray-400">Name</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full mt-1 bg-gray-900/50 border border-purple-800/60 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
                                                <div><label className="text-sm font-medium text-gray-400">Email</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full mt-1 bg-gray-900/50 border border-purple-800/60 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
                                                <div><label className="text-sm font-medium text-gray-400">Company</label><input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full mt-1 bg-gray-900/50 border border-purple-800/60 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
                                                <div><label className="text-sm font-medium text-gray-400">Contact Number</label><input type="tel" name="contact" value={formData.contact} onChange={handleInputChange} className="w-full mt-1 bg-gray-900/50 border border-purple-800/60 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" /></div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-400">Services of Interest</label>
                                                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                    {newServiceOptions.map(service => (
                                                        <label key={service} className="group flex items-center h-full p-3 rounded-lg bg-gray-900/50 border-2 border-transparent has-[:checked]:border-purple-600 has-[:checked]:bg-purple-900/20 cursor-pointer transition-all">
                                                            <input type="checkbox" checked={selectedServices.includes(service)} onChange={() => handleServiceChange(service)} className="sr-only peer" />
                                                            <div className="w-4 h-4 rounded-sm border-2 border-gray-500 group-hover:border-purple-500 peer-checked:bg-purple-600 peer-checked:border-purple-600 flex-shrink-0 flex items-center justify-center transition-all">
                                                                {selectedServices.includes(service) && <div className="w-2 h-2 bg-purple-200 rounded-sm"></div>}
                                                            </div>
                                                            <span className="ml-3 text-sm text-gray-300 select-none">{service}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-400">Number of Employees</label>
                                                <CustomSelect options={employeeOptions} selected={employeeSize} onChange={setEmployeeSize} placeholder="Select a range"/>
                                            </div>
                                            <button type="submit" className="w-full !mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">Submit & Download</button>
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

// --- HERO SEARCH SECTION COMPONENT (No changes) ---
const HeroSearch = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scanDomain, setScanDomain] = useState("");
    const [scanError, setScanError] = useState("");

    useEffect(() => {
        const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleDomainSubmit = (e) => {
        e.preventDefault();
        const domainInput = e.target.elements.domain.value;
        const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
        const cleanedDomain = domainInput.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];

        if (cleanedDomain && domainRegex.test(cleanedDomain)) {
            setScanDomain(cleanedDomain); setIsModalOpen(true); setScanError("");
        } else {
            setScanError("Please enter a valid domain name.");
            setTimeout(() => setScanError(""), 3000);
        }
    };

    return (
        <div className="relative w-full bg-[#0a0710] text-white font-sans">
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: '#1d1238',
                        color: '#e2e8f0',
                        border: '1px solid #581c87',
                    },
                }}
            />
            <motion.div className="pointer-events-none fixed inset-0 z-0 opacity-20 blur-3xl" style={{ background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.3), transparent 80%)`}}/>
            <ScanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} domain={scanDomain}/>
            <div className="relative z-10 p-4 sm:p-6 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-center pt-16 pb-20 sm:pt-20 sm:pb-24">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase">
                            <span className="bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-500 to-purple-600">Enterprise</span>
                            <span className="block text-gray-400">Cyber Solutions</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-400">
                            A curated & proprietary arsenal of advanced tools and services designed to fortify your digital defenses and ensure robust cybersecurity for your enterprise.
                        </p>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-12">
                            <form onSubmit={handleDomainSubmit} className="relative max-w-2xl mx-auto">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input name="domain" type="text" placeholder="Check your domain's security posture (e.g., example.com)" className="w-full rounded-full border border-purple-800/60 bg-gray-900/50 py-4 pl-14 pr-32 text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition-colors">Scan</button>
                            </form>
                            {scanError && <p className="text-center text-red-400 mt-2 text-sm animate-pulse">{scanError}</p>}
                        </motion.div>
                        <Link href="/threat-monitoring" passHref>
                            <motion.button whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(168, 85, 247, 0.7)" }} whileTap={{ scale: 0.95 }} className="mt-8 relative inline-flex items-center gap-2 rounded-full bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300">
                                <Eye className="h-5 w-5" />
                                Visit Live Threat Monitor
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeroSearch;