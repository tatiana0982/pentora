'use client';
import React from 'react';
import { motion } from 'framer-motion';

// --- SVG Icon Components for Cybersecurity ---
const ApplicationSecurityIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
);

const NetworkSecurityIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="9" width="20" height="12" rx="2"></rect>
        <path d="M6 13H6.01"></path>
        <path d="M10 13H10.01"></path>
        <path d="M14 13H14.01"></path>
        <path d="M18 13H18.01"></path>
        <path d="M12 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"></path>
        <path d="M8 9V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4"></path>
    </svg>
);

const CloudSecurityIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
);

const DataSecurityIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <rect x="8" y="13" width="8" height="6" rx="1"></rect>
        <path d="M12 13v-2a2 2 0 1 0-4 0v2"></path>
    </svg>
);

const AutomationIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8"></path>
        <rect x="4" y="4" width="16" height="16" rx="2"></rect>
        <path d="M2 14h2"></path>
        <path d="M20 14h2"></path>
        <path d="M14 2v2"></path>
        <path d="M14 20v2"></path>
    </svg>
);

const InfrastructureIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
);

// --- Background Thematic Assets ---
const CodeSnippetBg = ({ className }: { className?: string }) => (
    <svg width="100%" height="100%" className={className}>
        <defs>
            <pattern id="code" patternUnits="userSpaceOnUse" width="120" height="120" patternTransform="scale(1) rotate(0)">
                <path d="M10 10 L110 10 M10 30 L90 30 M10 50 L110 50 M10 70 L80 70 M10 90 L100 90 M10 110 L90 110" stroke="currentColor" strokeWidth="2" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#code)" />
    </svg>
);
const NetworkLinesBg = ({ className }: { className?: string }) => (
    <svg width="100%" height="100%" className={className}>
        <defs>
            <pattern id="net" patternUnits="userSpaceOnUse" width="80" height="80">
                <circle cx="10" cy="10" r="2" fill="currentColor" />
                <circle cx="50" cy="50" r="2" fill="currentColor" />
                <circle cx="10" cy="50" r="2" fill="currentColor" />
                <circle cx="50" cy="10" r="2" fill="currentColor" />
                <path d="M10 10 L50 50 M10 50 L50 10" stroke="currentColor" strokeWidth="1" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#net)" />
    </svg>
);
const ShieldLockBg = ({ className }: { className?: string }) => (
    <svg width="100%" height="100%" viewBox="0 0 100 100" className={className}>
        <path d="M50 10 L90 30 L90 60 C90 80 50 100 50 100 C50 100 10 80 10 60 L10 30 Z M50 50 L50 70 M40 60 L60 60" stroke="currentColor" fill="none" strokeWidth="2" transform="scale(0.8) translate(12, -10)" />
        <path d="M50 10 L90 30 L90 60 C90 80 50 100 50 100 C50 100 10 80 10 60 L10 30 Z M50 50 L50 70 M40 60 L60 60" stroke="currentColor" fill="none" strokeWidth="2" transform="scale(0.4) translate(10, 80)" />
    </svg>
);

// --- Data for Template Cards ---
const cardData = [
    {
        icon: <ApplicationSecurityIcon />,
        title: 'Application Security',
        description: 'Comprehensive solutions to protect against external threats and prevent unauthorized access to sensitive data.',
        glowColor: 'from-blue-500',
        tags: ['SAST', 'DAST', 'API Security'],
        backgroundAsset: <CodeSnippetBg className="absolute inset-0 w-full h-full text-white/5 opacity-50"/>
    },
    {
        icon: <NetworkSecurityIcon />,
        title: 'Network Security',
        description: 'Customized solutions to prevent unauthorized access, monitor network activity, and respond to threats in real-time.',
        glowColor: 'from-green-500',
        tags: ['Firewall', 'IDS/IPS', 'VPN'],
        backgroundAsset: <NetworkLinesBg className="absolute inset-0 w-full h-full text-white/5 opacity-50" />
    },
    {
        icon: <CloudSecurityIcon />,
        title: 'Cloud-native Security',
        description: 'Secure cloud environments to protect data and applications during migration and beyond.',
        glowColor: 'from-sky-400',
        tags: ['CSPM', 'CWPP', 'Kubernetes'],
        backgroundAsset: <ShieldLockBg className="absolute inset-0 w-full h-full text-white/5 opacity-40" />
    },
    {
        icon: <DataSecurityIcon />,
        title: 'Data Security',
        description: 'Comprehensive solutions to safeguard sensitive data, including data classification, encryption, and access control.',
        glowColor: 'from-red-500',
        tags: ['DLP', 'Encryption', 'IAM'],
        backgroundAsset: <CodeSnippetBg className="absolute inset-0 w-full h-full text-white/5 opacity-50 rotate-90"/>
    },
    {
        icon: <AutomationIcon />,
        title: 'Security Automation',
        description: 'Streamlined security operations to help you respond to threats quickly and effectively.',
        glowColor: 'from-purple-500',
        tags: ['SOAR', 'SIEM', 'Threat Intelligence'],
        backgroundAsset: <NetworkLinesBg className="absolute inset-0 w-full h-full text-white/5 opacity-30" />
    },
    {
        icon: <InfrastructureIcon />,
        title: 'Infrastructure Security',
        description: 'Secure infrastructure solutions to protect against external and internal threats.',
        glowColor: 'from-orange-500',
        tags: ['Vulnerability Mgmt', 'Hardening', 'IaC'],
        backgroundAsset: <ShieldLockBg className="absolute inset-0 w-full h-full text-white/5 opacity-40" />
    },
];


// --- Main Card Section Component ---
const CardSection = () => {
    // Quadruple the card data to ensure a seamless loop on all screen sizes
    const extendedCards = [...cardData, ...cardData, ...cardData, ...cardData];

    return (
        <section className="relative bg-[#0E091E] text-white pt-12 pb-24 sm:py-32 flex flex-col items-center text-center overflow-hidden">
            <style jsx>{`
                .grid-background {
                    background-image:
                        linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
                    background-size: 2rem 2rem;
                }
                @keyframes scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 120s linear infinite;
                }
                /* Hide scrollbar for Chrome, Safari and Opera */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                /* Hide scrollbar for IE, Edge and Firefox */
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
            
            <div className="absolute inset-0 grid-background"></div>

            {/* --- Header Content --- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl mx-auto px-4"
            >
                <p className="text-purple-400 font-semibold mb-3">WHAT ALL WE DO</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">Our Unique, Best Approach To Systems Implementation</h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                    We offer a comprehensive suite of cybersecurity services designed to protect your organizations critical assets and reputation.
                </p>
                <div className="flex justify-center items-center gap-4 sm:gap-6">
                    <motion.a href="/contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-5 sm:px-6 py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-b from-purple-600 to-indigo-700 rounded-full shadow-lg shadow-purple-500/20">
                        Get a Quote
                    </motion.a>
                    <motion.a href="/tools" whileHover={{ scale: 1.05 }} className="group text-sm sm:text-base font-semibold text-gray-300 flex items-center gap-2">
                        Our Services
                        <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </motion.a>
                </div>
            </motion.div>

            {/* --- Card Slider --- */}
            <div className="relative w-full mt-24">
                {/* Mobile: Vertical Scroll */}
                <div className="lg:hidden flex flex-col items-center gap-6 px-4">
                    {cardData.map((card, index) => (
                         <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="w-full max-w-sm p-6 bg-gray-900/40 border border-white/10 rounded-2xl backdrop-blur-lg relative overflow-hidden"
                         >
                            <div className="absolute inset-0 pointer-events-none">
                                {card.backgroundAsset}
                            </div>
                            <div className={`absolute -top-1/3 -right-1/3 w-2/3 h-2/3 bg-gradient-to-br ${card.glowColor} to-transparent rounded-full blur-3xl opacity-30`}></div>
                            <div className="relative z-10">
                                <div className="flex flex-col items-start mb-4">
                                    <div className="w-14 h-14 bg-gray-800/80 border border-white/10 rounded-xl flex items-center justify-center mb-4">{card.icon}</div>
                                    <h3 className="text-lg font-bold text-left">{card.title}</h3>
                                </div>
                                <p className="text-sm text-gray-400 text-left my-3">{card.description}</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {card.tags.map(tag => (
                                        <span key={tag} className="text-xs text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-md">{tag}</span>
                                    ))}
                                </div>
                            </div>
                         </motion.div>
                    ))}
                </div>

                {/* Desktop: Infinite Horizontal Scroll */}
                <div className="hidden lg:block group w-full overflow-x-auto py-4 no-scrollbar" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                    <div className="flex w-max gap-10 group-hover:[animation-play-state:paused] animate-scroll">
                        {extendedCards.map((card, index) => (
                            <div key={index} className="w-[520px] flex-shrink-0 p-8 bg-gray-900/40 border border-white/10 rounded-3xl backdrop-blur-lg relative overflow-hidden transition-all duration-300 hover:border-white/20 hover:!scale-[1.04]">
                                <div className="absolute inset-0 pointer-events-none z-0">
                                    {card.backgroundAsset}
                                </div>
                                <div className={`absolute -top-1/4 -right-1/4 w-2/3 h-2/3 bg-gradient-to-br ${card.glowColor} to-transparent rounded-full blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-70`}></div>
                                <div className="relative z-10">
                                    <div className="flex flex-col items-start mb-4">
                                        <div className="w-16 h-16 bg-gray-800/80 border border-white/10 rounded-2xl flex items-center justify-center mb-5">{card.icon}</div>
                                        <h3 className="text-2xl font-bold text-left">{card.title}</h3>
                                    </div>
                                    <p className="text-base text-gray-400 text-left my-4 h-16">{card.description}</p>
                                    <div className="flex flex-wrap gap-3 mt-6">
                                        {card.tags.map(tag => (
                                            <span key={tag} className="text-sm text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-lg">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CardSection;