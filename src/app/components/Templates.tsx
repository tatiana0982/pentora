'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Network, Cloud, DatabaseZap, BrainCircuit,
  ClipboardCheck, BookUser, Target, RadioTower,
  ToyBrick, Server, Users, Settings
} from 'lucide-react';

// NOTE: For the mobile horizontal menu, you'll want to hide the scrollbar for a cleaner look.
// Add this to your global CSS file (e.g., globals.css):
/*
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
*/

const services = [
  { title: "Application Security & VAPT", description: "Identify and remediate vulnerabilities in your applications before they can be exploited by malicious actors.", icon: Shield, image: "/assets/services/1.png" },
  { title: "Network Security & VAPT", description: "Secure your network infrastructure against internal and external threats with continuous monitoring and penetration testing.", icon: Network, image: "/assets/services/2.png" },
  { title: "Cloud-Native Security", description: "Comprehensive security for your cloud environments, from configuration management to container security.", icon: Cloud, image: "/assets/services/3.png" },
  { title: "Data Security & Privacy Compliance", description: "Protect sensitive data and ensure compliance with regulations like GDPR and CCPA through robust data governance.", icon: DatabaseZap, image: "/assets/services/4.png" },
  { title: "Infrastructure Security", description: "Defend your infrastructure from cyber threats with advanced monitoring and hardening.", icon: Server, image: "/assets/services/5.png" },
  { title: "Cyber Threat Intelligence (CTI)", description: "Stay ahead of attackers with proactive threat hunting, IOC analysis, and dark web monitoring.", icon: BrainCircuit, image: "/assets/services/6.png" },
  { title: "Security Audits & Compliance Readiness", description: "Achieve and maintain compliance with industry standards like ISO 27001, SOC 2, and PCI-DSS.", icon: ClipboardCheck, image: "/assets/services/7.png" },
  { title: "Cybersecurity Consulting Services", description: "Expert guidance to help you build, optimize, and mature your security strategy.", icon: Users, image: "/assets/services/8.png" },
  { title: "Red Team Assessments", description: "Simulate real-world, objective-based attacks to test your organization’s detection and response capabilities.", icon: Target, image: "/assets/services/9.png" },
  { title: "Managed Security Services (MSS)", description: "End-to-end managed security operations to monitor, detect, and respond to threats in real-time.", icon: Settings, image: "/assets/services/10.png" },
  { title: "Radio Frequency - Mesh VAPT", description: "Advanced vulnerability testing for RF mesh networks, including smart grids and industrial comms.", icon: RadioTower, image: "/assets/services/11.png" },
  { title: "Scada/IOT Devices VAPT", description: "Specialized security testing for industrial control systems and Internet of Things (IoT) devices.", icon: ToyBrick, image: "/assets/services/12.png" },
  { title: "Security Awareness & Training Programs", description: "Empower your employees to be the first line of defense against phishing, social engineering, and other threats.", icon: BookUser, image: "/assets/services/13.png" },
];

const Templates = () => {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <section className="relative bg-[#0A0514] text-white py-20 sm:py-28 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none z-0" />
      <div className="absolute -left-48 -top-48 w-96 h-96 bg-gradient-to-br from-purple-900 to-transparent opacity-20 blur-3xl rounded-full z-0" />
      <div className="absolute -right-48 -bottom-48 w-96 h-96 bg-gradient-to-tl from-blue-900 to-transparent opacity-20 blur-3xl rounded-full z-0" />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <h3 className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-3 tracking-wider uppercase">Our Expertise</h3>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">Comprehensive Solutions</h2>
          <p className="text-md md:text-lg text-gray-400 leading-relaxed">
            Full-spectrum services: assessments, threat intel, compliance & response readiness.
          </p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Column - Service Menu */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {/* Desktop Vertical Menu */}
            <div className="lg:flex hidden flex-col gap-2 max-h-[660px] overflow-y-auto pr-2">
              {services.map(service => (
                <button
                  key={service.title}
                  onClick={() => setActiveService(service)}
                  className={`group p-4 rounded-lg border transition-all duration-300 text-left text-base
                    ${activeService.title === service.title
                      ? 'bg-white/10 border-purple-500 shadow-lg shadow-purple-500/20'
                      : 'bg-white/5 border-white/10 hover:border-purple-500/50 hover:bg-white/10 hover:-translate-y-1'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <service.icon className={`w-6 h-6 shrink-0 transition-colors duration-300 ${activeService.title === service.title ? 'text-purple-400' : 'text-gray-400 group-hover:text-white'}`} />
                    <span className="font-semibold">{service.title}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile Horizontal Scroll Menu */}
            <div className="lg:hidden flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
              {services.map(service => (
                <button
                  key={service.title}
                  onClick={() => setActiveService(service)}
                  className={`group shrink-0 snap-start whitespace-nowrap px-4 py-2 rounded-lg border text-sm font-medium
                    ${activeService.title === service.title
                      ? 'bg-purple-500/20 border-purple-500 text-white'
                      : 'bg-white/5 border-white/10 hover:bg-white/20'
                    }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Content Display */}
          <div className="lg:col-span-8">
            <div className="bg-gradient-to-br from-white/[.07] to-transparent border border-white/10 rounded-2xl p-6 md:p-8 h-full flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="flex flex-col flex-grow"
                >
                  {/* Text Content */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{activeService.title}</h3>
                    <p className="text-base text-gray-300 leading-relaxed max-w-2xl">{activeService.description}</p>
                  </div>

                  {/* Image Content - Pushed to the bottom */}
                  <div className="mt-auto pt-6">
                    <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 group">
                      <img
                        src={activeService.image}
                        alt={activeService.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Templates;