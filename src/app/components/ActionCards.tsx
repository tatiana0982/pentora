'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

// --- SVG Icon Components ---
const ArrowLeftIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6"/>
    </svg>
);
const ArrowRightIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6"/>
    </svg>
);
const EnvironmentIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8"></path>
        <rect x="4" y="4" width="16" height="16" rx="2"></rect>
    </svg>
);

const TaskIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const CreatorLogoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="url(#grad)" />
        <path d="M9.5 12.5L11.5 14.5L14.5 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs><linearGradient id="grad" x1="6" y1="4" x2="18" y2="20" gradientUnits="userSpaceOnUse"><stop stopColor="#A855F7"/><stop offset="1" stopColor="#6366F1"/></linearGradient></defs>
    </svg>
);
const ExternalLinkIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);


// --- Expanded Data Structure with Static Images Per Tab ---
const cybersecurityData = [
    {
        industry: 'Threat Intelligence',
        creator: 'AI Threat Matrix',
        image: '/assets/services/2.png',
        slides: [
            { objective: 'Predictive Threat Modeling', description: 'Leveraged AI to analyze global networks, predicting and neutralizing zero-day exploits targeting SWIFT transfers.', stats: [{ value: '99.7%', label: 'Predictive Accuracy', details: 'Achieved near-perfect accuracy in identifying potential zero-day exploits.' }, { value: '<1 Min', label: 'Global Alert Time', details: 'Threat intelligence disseminated to all clients in under 60 seconds.' }] },
            { objective: 'Dark Web Monitoring', description: 'Proactively monitored dark web marketplaces for stolen credentials of a major retail client, leading to the takedown of a major phishing operation.', stats: [{ value: '2.1M', label: 'Credentials Secured', details: 'Identified and secured over 2.1 million compromised customer credentials.' }, { value: '15+', label: 'Marketplaces Disrupted', details: 'Facilitated the disruption of over 15 illicit online marketplaces.' }] },
            { objective: 'Geopolitical Risk Analysis', description: 'Provided real-time threat intelligence on geopolitical events for a global logistics company, avoiding supply chain disruptions.', stats: [{ value: '98%', label: 'Disruption Avoidance', details: 'Successfully predicted and helped avoid 98% of potential disruptions.' }, { value: '$50M+', label: 'Potential Savings', details: 'Client estimated savings of over $50 million by avoiding cargo loss and delays.' }] }
        ],
    },
    {
        industry: 'Penetration Testing',
        creator: 'Project Chimera',
        image: '/assets/services/6.png',         slides: [
            { objective: 'Multi-Vector Attack Simulation', description: 'Conducted a comprehensive red team exercise for a Fortune 500 tech giant, identifying critical vulnerabilities in their new flagship cloud product pre-launch.', stats: [{ value: '47', label: 'Critical Risks Found', details: 'Identified vulnerabilities missed by automated scanners.' }, { value: '82%', label: 'Security Uplift', details: 'Post-remediation security posture score increased significantly.' }] },
            { objective: 'Social Engineering Test', description: 'Executed a sophisticated social engineering campaign against a major financial institution to test human-factor vulnerabilities.', stats: [{ value: '63%', label: 'Initial Breach Rate', details: 'Successfully deceived 63% of targeted high-level employees.' }, { value: '95%', label: 'Awareness Increase', details: 'Employee security awareness and reporting increased dramatically.' }] },
            { objective: 'IoT & Embedded Device Testing', description: 'Performed in-depth hardware and firmware analysis on medical IoT devices, preventing potential remote exploitation that could have compromised patient safety.', stats: [{ value: '5', label: 'Zero-Day Exploits', details: 'Discovered five new zero-day vulnerabilities in the device firmware.' }, { value: 'FDA', label: 'Compliance Assured', details: 'Ensured full FDA cybersecurity compliance prior to market release.' }] }
        ],
    },
    {
        industry: 'Cloud Security',
        creator: 'Project Stratus',
        image: '/assets/services/5.png',         slides: [
            { objective: 'Secure Multi-Cloud Migration', description: 'Orchestrated the secure migration of a leading e-commerce platform to a multi-cloud environment (AWS, Azure, GCP), ensuring zero downtime.', stats: [{ value: '100%', label: 'Data Integrity', details: 'Achieved zero data loss across 50 petabytes of migrated data.' }, { value: '40%', label: 'Cost Reduction', details: 'Optimized cloud security configurations, reducing related overheads.' }] },
            { objective: 'Kubernetes Security Hardening', description: 'Secured the container orchestration platform for a FinTech startup, implementing policies and monitoring to prevent container escape.', stats: [{ value: '99%', label: 'Misconfigurations Fixed', details: 'Remediated 99% of identified security misconfigurations in K8s clusters.' }, { value: '3x', label: 'Faster Deployments', details: 'Secure-by-design approach enabled a 3x increase in deployment velocity.' }] },
            { objective: 'Serverless Security Architecture', description: 'Designed a secure serverless architecture for a media streaming service, protecting against injection attacks and ensuring proper IAM permissions.', stats: [{ value: '100%', label: 'Injection-Proof', details: 'Successfully mitigated all OWASP Top 10 serverless vulnerabilities.' }, { value: '60%', label: 'Cost Savings', details: 'Reduced compute costs by 60% while enhancing security posture.' }] }
        ],
    },
    {
        industry: 'Incident Response',
        creator: 'Case File #73-A',
        image: '/assets/services/3.png',         slides: [
            { objective: 'Nation-State Actor Neutralization', description: 'Led the incident response for a national infrastructure provider targeted by a state-sponsored APT group, successfully containing the breach within 72 hours.', stats: [{ value: '<3 hrs', label: 'Containment Time', details: 'Breach contained and lateral movement stopped in under 3 hours.' }, { value: 'Full', label: 'Asset Recovery', details: 'Full recovery of all encrypted assets with complete forensic evidence.' }] },
            { objective: 'Ransomware Recovery', description: 'Managed a large-scale ransomware attack on a healthcare system. Led recovery efforts and strategic negotiation, restoring critical patient services 90% faster than average.', stats: [{ value: '90%', label: 'Faster Recovery', details: 'Restored critical systems 90% faster than the industry average.' }, { value: '70%', label: 'Ransom Reduction', details: 'Negotiated a 70% reduction in the final ransom payment.' }] },
            { objective: 'Business Email Compromise (BEC)', description: 'Investigated a complex BEC fraud case targeting a private equity firm, tracing the funds through cryptocurrency exchanges and aiding law enforcement in recovery.', stats: [{ value: '$5.2M', label: 'Funds Recovered', details: 'Successfully traced and aided in the recovery of over $5.2 million.' }, { value: '100%', label: 'Attribution', details: 'Provided complete attribution of the threat actor group to the FBI.' }] }
        ],
    },
    {
        industry: 'Vulnerability Mgmt.',
        creator: 'Project Sentinel',
        image: '/assets/services/10.png',         slides: [
            { objective: 'Continuous Risk Assessment', description: 'Deployed a continuous vulnerability management program for a global pharmaceutical company, reducing their attack surface and ensuring regulatory compliance.', stats: [{ value: '98%', label: 'Attack Surface Reduction', details: 'Reduced discoverable critical vulnerabilities by 98% in six months.' }, { value: 'Zero', label: 'Compliance Breaches', details: 'Maintained a perfect record of zero compliance-related breaches.' }] },
            { objective: 'OT & SCADA Systems Security', description: 'Implemented a vulnerability management program for the industrial control systems of a national power grid operator, protecting critical infrastructure.', stats: [{ value: '100%', label: 'Network Segregation', details: 'Achieved complete IT/OT network segregation to protect ICS systems.' }, { value: 'Zero', label: 'Unplanned Downtime', details: 'Zero instances of unplanned downtime related to security events.' }] },
            { objective: 'Application Portfolio Scanning', description: 'Integrated static and dynamic code analysis into the CI/CD pipeline for a software company, scanning over 500 applications and reducing security bugs by 85%.', stats: [{ value: '-85%', label: 'Security Bugs', details: 'Reduced the number of security-related bugs pushed to production.' }, { value: 'Shift-Left', label: 'DevSecOps Culture', details: 'Successfully embedded a "shift-left" security culture in the dev teams.' }] }
        ],
    },
    {
        industry: 'AI in Security',
        creator: 'Project Cerebrum',
        image: '/assets/services/7.png',         slides: [
            { objective: 'AI-Powered SOC Augmentation', description: 'Integrated our AI engine into the SOC of a major telecom provider, automating Level 1 analysis and reducing analyst fatigue.', stats: [{ value: '90%', label: 'Alert Triage Automation', details: 'Automated the initial analysis of 90% of incoming security alerts.' }, { value: '+300%', label: 'Analyst Efficiency', details: 'Freed up senior analysts, tripling their effective output.' }] },
            { objective: 'Insider Threat Detection', description: 'Deployed a user behavior analytics (UBA) platform for an investment bank, using machine learning to detect anomalous activity indicative of insider threats.', stats: [{ value: '100%', label: 'Data Exfil Prevention', details: 'Successfully prevented multiple high-risk data exfiltration attempts.' }, { value: '-75%', label: 'False Positives', details: 'Reduced false positive alerts for insider threats by 75%.' }] },
            { objective: 'AI-Driven Phishing Analysis', description: 'Developed a custom AI model to analyze and categorize phishing emails in real-time for a large enterprise, blocking malicious links with greater accuracy.', stats: [{ value: '99.9%', label: 'Detection Rate', details: 'Achieved a 99.9% detection rate for spear-phishing and BEC attacks.' }, { value: '<1s', label: 'Analysis Time', details: 'Analyzed and blocked threats in real-time, in less than one second.' }] }
        ]
    }
];

const ObjectiveCard = ({ objective, description, isActive } : {objective: string, description: string, isActive: boolean}) => (
    <div className="bg-black/20 border border-white/10 rounded-2xl p-4 sm:p-6 h-full flex flex-col transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-start gap-4">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TaskIcon className="w-6 h-6 text-purple-400"/>
                </div>
                <h3 className="font-bold text-sm sm:text-base md:text-lg text-white">{objective}</h3>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 text-green-400 text-xs sm:text-sm font-semibold bg-green-500/10 px-2 sm:px-3 py-1.5 rounded-full">
                <motion.div className="w-2 h-2 bg-green-400 rounded-full" animate={isActive ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}/>
                Passing
            </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 my-4 pl-14">
            <span className="text-xs font-semibold text-gray-400 flex items-center gap-2"><EnvironmentIcon /> Development</span>
            <span className="text-xs font-semibold text-gray-400 flex items-center gap-2"><EnvironmentIcon /> Production</span>
        </div>
        <hr className="border-white/10 my-2 sm:my-4"/>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed"><strong className="text-gray-200">Objective:</strong> {description}</p>
    </div>
);

// --- Main Component ---
const ActionCards = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        setActiveSlide(0);
        if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    };

    const handleSlideChange = (index: number) => {
        setActiveSlide(index);
        if (scrollContainerRef.current) {
            const card = scrollContainerRef.current.children[index] as HTMLDivElement;
            if (card) {
                const scrollLeft = card.offsetLeft - (scrollContainerRef.current.offsetWidth - card.offsetWidth) / 2;
                scrollContainerRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        }
    };
    
    const handlePrev = () => handleSlideChange(activeSlide === 0 ? cybersecurityData[activeTab].slides.length - 1 : activeSlide - 1);
    const handleNext = () => handleSlideChange(activeSlide === cybersecurityData[activeTab].slides.length - 1 ? 0 : activeSlide + 1);
    
    const currentData = cybersecurityData[activeTab];

    return (
        <section className="relative bg-[#0A0514] text-white py-24 sm:py-32 md:py-48 flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(128,0,128,0.25),rgba(10,5,20,0))]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
            
            <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }} className="text-center">
                    <p className="text-purple-400 font-semibold mb-3 tracking-wider text-sm">OUR IMPACT</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">AI-Driven Security in Action</h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto">See how our tailored solutions help global leaders in finance, tech, and critical infrastructure defend against the most advanced cyber threats.</p>
                </motion.div>

                <div className="w-full mt-16 sm:mt-20 mb-12 sm:mb-16 flex justify-center">
                    <div className="rounded-full border border-white/[.12] p-1.5" style={{ background: 'linear-gradient(90deg, rgba(91, 47, 234, 0.05) 0%, rgba(228, 207, 255, 0.03) 100%), #04010E', maxWidth: '90vw' }}>
                        <div className="flex overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}><style jsx>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                            <div className="flex p-1 no-scrollbar">
                                {cybersecurityData.map((item, index) => (
                                    <button key={index} onClick={() => handleTabClick(index)} className={`relative px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm rounded-full transition-colors duration-300 outline-none flex-shrink-0 ${activeTab === index ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                                        {activeTab === index && ( <motion.div layoutId="active-tab-pill" className="absolute inset-0 bg-[#110D20] rounded-full" transition={{ type: 'spring', stiffness: 300, damping: 30 }}/> )}
                                        <span className="relative z-10 tracking-wide">{item.industry}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full max-w-7xl mx-auto p-4 sm:p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl shadow-black/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="w-full h-full flex flex-col lg:col-span-5">
                        <div className="flex justify-between items-center mb-6 px-2">
                            <div className="flex items-center gap-3">
                                <CreatorLogoIcon />
                                <span className="text-xs sm:text-sm font-semibold tracking-wider text-gray-300">{currentData.creator}</span>
                                <a href="#" className="text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 transition-colors">View Site <ExternalLinkIcon /></a>
                            </div>
                            <p className="text-xs sm:text-sm font-semibold text-gray-300 ml-auto">{activeSlide + 1} of {currentData.slides.length}</p>
                        </div>
                        
                        <div className="flex-grow overflow-hidden relative h-[450px]">
                            <div ref={scrollContainerRef} className="absolute inset-0 flex gap-6 pb-4 overflow-x-auto snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                <style jsx>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                                {currentData.slides.map((slide, index) => (
                                    <div key={index} className="snap-center w-full flex-shrink-0">
                                        <ObjectiveCard objective={slide.objective} description={slide.description} isActive={index === activeSlide} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flex justify-center items-center gap-4 mb-8">
                                <button onClick={handlePrev} className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors"><ArrowLeftIcon className="w-5 h-5" /></button>
                                <div className="flex gap-2.5">
                                    {currentData.slides.map((_, i) => (<div key={i} onClick={() => handleSlideChange(i)} className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${i === activeSlide ? 'bg-white w-8' : 'bg-gray-600 w-2 hover:bg-gray-400'}`} />))}
                                </div>
                                <button onClick={handleNext} className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors"><ArrowRightIcon className="w-5 h-5" /></button>
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div key={activeSlide} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="grid grid-cols-2 gap-4 sm:gap-6 text-left">
                                    {currentData.slides[activeSlide].stats.map(stat => (
                                        <div key={stat.label} className="bg-black/20 p-4 rounded-lg">
                                            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300">{stat.value}</p>
                                            <p className="font-semibold text-white mt-1 text-xs sm:text-sm">{stat.label}</p>
                                            <p className="text-xs text-gray-400 mt-1.5 leading-snug">{stat.details}</p>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="w-full h-full lg:col-span-7 flex flex-col">
                        <div className="w-full h-[300px] sm:h-[450px] lg:h-full rounded-2xl overflow-hidden shadow-lg shadow-black/30">
                            <AnimatePresence mode="wait">
                                <motion.img key={currentData.image} src={currentData.image} alt={currentData.industry} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.8, ease: 'easeInOut' }} className="w-full h-full object-cover object-center"/>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0514] to-transparent pointer-events-none"></div>
        </section>
    );
};

export default ActionCards;