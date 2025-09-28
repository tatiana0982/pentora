'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Book, Briefcase, ChevronDown, FileText, GitBranch, LifeBuoy, Rocket, Shield,
  Target
} from 'lucide-react';
import AnimatedHamburgerIcon from './AnimatedHamburgerIcon';

// 🔒 Premium rebranding of product & company items
const menuItems = {
  product: [
    { title: "Cognitive AI Suite", description: "Generative intelligence for secure systems", href: "#", icon: <Rocket size={16} /> },
    { title: "IntelliGuard LLM", description: "Production-grade LLM observability", href: "#", icon: <BarChart size={16} /> },
    { title: "Data Integrity Matrix", description: "Precision testing for critical data pipelines", href: "#", icon: <Shield size={16} /> },
    { title: "Predictive ML Stack", description: "Secure infrastructure for traditional models", href: "#", icon: <GitBranch size={16} /> },
    { title: "ML Command Center", description: "Real-time visibility for ML operations", href: "#", icon: <BarChart size={16} /> },
    { title: "AI Compliance Vault", description: "Enterprise governance & regulatory alignment", href: "#", icon: <Briefcase size={16} /> },
  ],
  company: [
    { title: "Our Legacy", description: "Excellence in global cybersecurity", href: "/threat-monitoring", icon: <LifeBuoy size={16} /> },
    { title: "Elite Careers", description: "Work with the industry's best minds", href: "/careers", icon: <Briefcase size={16} /> },
    { title: "Fortress Security", description: "Zero-trust by design, always", href: "#", icon: <Shield size={16} /> },
    { title: "Download Brochure", description: "All in One, visual insights", href: "PENTORA-Cybersecurity.pdf", icon: <Book size={16} /> },

  ]
};

const DropdownMenu = ({ items }: { items: { href: string; title: string; description: string, icon: React.ReactNode }[] }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="absolute top-full mt-2 w-max max-w-lg bg-[#100D1B] rounded-lg border border-white/10 shadow-lg p-4"
  >
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, index) => (
        <Link key={item.title + index} href={item.href} className="block p-3 rounded-md hover:bg-white/5">
          <div className="flex items-center space-x-3">
            <div className="text-purple-400">{item.icon}</div>
            <div>
              <p className="font-bold text-white text-sm">{item.title}</p>
              <p className="text-xs text-gray-400">{item.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </motion.div>
);

// ====================================================================
// =========== ENHANCED & AESTHETIC MOBILE MENU COMPONENT =============
// ====================================================================
const MobileMenu = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const handleLinkClick = () => setIsOpen(false);

  // Animation variants for a smoother, staggered effect
  const menuVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 bg-[#04010E]/50 backdrop-blur-xl z-40"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col h-full p-6 pt-24 overflow-y-auto"
      >
        {Object.keys(menuItems).map((key) => (
          <motion.div variants={itemVariants} key={key} className="border-b border-white/10 last:border-b-0">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpenAccordion(openAccordion === key ? null : key)}
              className="w-full flex justify-between items-center py-4 text-lg font-medium text-gray-200"
            >
              <span className="capitalize">{key === 'product' ? 'Solutions' : 'Company'}</span>
              <motion.div animate={{ rotate: openAccordion === key ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown size={22} />
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {openAccordion === key && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden pl-4"
                >
                  <div className="flex flex-col space-y-1 my-2">
                    {menuItems[key as keyof typeof menuItems].map(item => (
                       <motion.div whileTap={{ scale: 0.97 }} key={item.title}>
                         <Link href={item.href} onClick={handleLinkClick} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-white/5">
                           <span className="text-purple-400">{item.icon}</span>
                           <span className="text-gray-300">{item.title}</span>
                         </Link>
                       </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        <motion.div variants={itemVariants} className="border-b border-white/10">
          <Link href="/tools" onClick={handleLinkClick} className="block py-4 text-lg font-medium text-gray-200">Platform Tools</Link>
        </motion.div>
        <motion.div variants={itemVariants} className="border-b border-white/10">
          <Link href="/threat-monitoring" onClick={handleLinkClick} className="block py-4 text-lg font-medium text-gray-200">Threat Monitoring</Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="/contact" onClick={handleLinkClick} className="block py-4 text-lg font-medium text-gray-200">Global Contact</Link>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-10 mt-auto flex flex-col space-y-4">
            <Link href="#login" onClick={handleLinkClick} className="text-center py-3 text-lg font-bold text-white bg-white/10 rounded-full transition-colors hover:bg-white/20">
              Login
            </Link>
            <Link href="/request-form" onClick={handleLinkClick}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 text-lg font-bold text-white bg-gradient-to-b from-purple-600 to-indigo-700 rounded-full"
                >
                  Get a Quote
                </motion.button>
            </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ====================================================================
// ================= END ENHANCED MOBILE MENU COMPONENT ===============
// ====================================================================

const Navbar = () => {
  const [activeDropdowns, setActiveDropdowns] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleMouseEnter = (key: string) => setActiveDropdowns(prev => [...prev, key]);
  const handleMouseLeave = (key: string) => setActiveDropdowns(prev => prev.filter(item => item !== key));

  return (
    <>
      {/* Top banner */}
      <div className="sticky top-0 z-50 flex items-center justify-center w-full h-10 bg-black/70 backdrop-blur-lg text-white/80 px-4">
        <Link href="/threat-monitoring" className="hover:underline text-center text-xs sm:text-sm">
          Announcing our threat monitoring global security dashboard →
        </Link>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-10 z-50 flex items-center justify-center w-full h-16 bg-[#04010E]/50 border-b border-t border-white/10 backdrop-blur-md">
        <div className="flex items-center justify-between w-full h-full max-w-screen-xl px-4 md:px-8 mx-auto">
          
          {/* Logo */}
          <Link href="/" className="cursor-pointer z-50">
            <Image src="/pentora-logo.png" alt="Pentora Logo" width={100} height={100} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {Object.keys(menuItems).map((key) => (
              <div
                key={key}
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={() => handleMouseLeave(key)}
              >
                <button className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors capitalize h-full">
                  {key === 'product' ? 'Solutions' : 'Company'}
                </button>
                <AnimatePresence>
                  {activeDropdowns.includes(key) && (
                    <DropdownMenu items={menuItems[key as keyof typeof menuItems]} />
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Static links */}
            <Link href="/tools" className="h-full flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors">
              Platform Tools
            </Link>
            <Link href="/threat-monitoring" className="h-full flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors">
              Threat Monitoring
            </Link>
            <Link href="/contact" className="h-full flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors">
              Global Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="#login" className="text-sm text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/request-form">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 text-sm font-bold text-white bg-gradient-to-b from-purple-600 to-indigo-700 rounded-full transition-transform"
              >
                Get a Quote
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <AnimatedHamburgerIcon isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
          </div>
        </div>
      </nav>
      
      {/* MOBILE MENU RENDER */}
      <AnimatePresence>
        {isMenuOpen && <MobileMenu setIsOpen={setIsMenuOpen} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;