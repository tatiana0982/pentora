import React from 'react';
import Image from 'next/image';
import {
    FaXTwitter,
    FaGithub,
    FaDiscord,
    FaLinkedin,
    FaInstagram
} from 'react-icons/fa6'; // or use 'react-icons/fa' if FaXTwitter is not available
import { Target } from 'lucide-react';

// Updated footer link sections based on your site content
const footerSections = [
    {
        title: 'Products',
        links: [
            { name: 'Encoderspro', href: 'https://encoderspro.com' },
            { name: 'Pentellia', href: 'https://aistudio.instagram.com/ai/724190743389809?utm_source=ai_agent' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { name: 'Live Threat Feed', href: '/threat-monitoring' },
            { name: 'Security Tools', href: '/tools' },
            { name: 'Get a Quote', href: '/request-form' },
        ],
    },
    {
        title: 'Company',
        links: [
            { name: 'Careers', href: '/careers' },
            { name: 'Contact', href: '/contact' },
        ],
    },
    {
        title: 'Education',
        links: [
            { name: 'Training Programs', href: 'https://encoderspro.com/classes?sort=newest' },
            { name: 'Experts', href: 'https://encoderspro.com/instructor-finder' },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="bg-[#0E091E] text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
                    {/* Left Section: Logo, Socials, and Status */}
                    <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left">
                        <a href="#" className="flex items-center gap-3">
                            <Image
                                src="/pentora-logo.png"
                                alt="Pentora Logo"
                                width={100}
                                height={100}
                                className="object-contain"
                            />
                        </a>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://www.instagram.com/encoderspro/"
                                className="text-gray-400 hover:text-white transition-colors duration-300"
                                aria-label="Instagram"
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaInstagram size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/encoderspro-private-limited/posts/?feedView=all"
                                className="text-gray-400 hover:text-white transition-colors duration-300"
                                aria-label="LinkedIn"
                                target="_blank"
                                rel="noopener noreferrer">
                                <FaLinkedin size={20} />
                            </a>

                        </div>
                        <a
                            href="#"
                            className="border border-gray-700 rounded-full py-2 px-4 flex items-center gap-2 text-sm hover:bg-gray-800 transition-colors duration-300"
                        >
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            All systems operational
                        </a>
                    </div>

                    {/* Right Section: Link Columns */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {footerSections.map((section) => (
                            <div key={section.title}>
                                <h3 className="font-semibold text-gray-200 mb-4">{section.title}</h3>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
