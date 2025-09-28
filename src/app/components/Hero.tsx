'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Loader, GitCommitHorizontal, MessageSquare, ShieldCheck, Fingerprint, Timer, ShieldAlert, Radar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// --- Type Definitions ---
type Test = {
  name: string;
  status: 'Passing' | 'Failing' | 'Waiting';
  icon: React.ReactNode;
};

type LogStep = { duration: number; type: 'log'; text: string; icon: React.ReactNode };
type ThreatStep = { duration: number; type: 'threat', name: string; status: 'Detected' | 'Neutralized'; ip: string; };
type CardStep = { duration: number; type: 'card'; status: string; progress: string; tests?: Test[] };
type SummaryStep = { duration: number; type: 'summary'; passing: number; failing: number };

type AnimationStep = LogStep | ThreatStep | CardStep | SummaryStep;


// --- Configuration for the animation sequence ---
const animationSteps: AnimationStep[] = [
    { duration: 2500, type: 'log', text: 'Initializing global threat monitoring...', icon: <Radar size={18} /> },
    { duration: 2200, type: 'threat', name: 'DDoS Attempt', status: 'Detected', ip: '203.0.113.45' },
    { duration: 2200, type: 'threat', name: 'DDoS Attempt', status: 'Neutralized', ip: '203.0.113.45' },
    { duration: 2200, type: 'threat', name: 'Malware Signature', status: 'Detected', ip: '198.51.100.82' },
    { duration: 2200, type: 'threat', name: 'Malware Signature', status: 'Neutralized', ip: '198.51.100.82' },
    { duration: 2500, type: 'card', status: 'Initializing secure boot', progress: '1 of 4' },
    { duration: 2500, type: 'card', status: 'Executing validation protocols', progress: '2 of 4' },
    { duration: 2500, type: 'card', status: 'Analyzing threat models', progress: '3 of 4' },
    { duration: 3000, type: 'card', status: 'System diagnostics complete', progress: '4 of 4', tests: [{ name: "99.9% Uptime SLA", status: "Passing", icon: <ShieldCheck size={18}/> }, { name: "High-Precision Threat Detection", status: "Passing", icon: <MessageSquare size={18}/> }, { name: "Zero-Day Vulnerability Analysis", status: "Passing", icon: <Fingerprint size={18}/> }, { name: "P99 Query Response < 250ms", status: "Failing", icon: <Timer size={18}/> }] },
    { duration: 4000, type: 'summary', passing: 341, failing: 1 }
];

const initialTests: Test[] = [
    { name: "99.9% Uptime SLA", status: "Waiting", icon: <ShieldCheck size={18}/> },
    { name: "High-Precision Threat Detection", status: "Waiting", icon: <MessageSquare size={18}/> },
    { name: "Zero-Day Vulnerability Analysis", status: "Waiting", icon: <Fingerprint size={18}/> },
    { name: "P99 Query Response < 250ms", status: "Waiting", icon: <Timer size={18}/> }
];

const Hero = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [tests, setTests] = useState<Test[]>(initialTests);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextStepIndex = (stepIndex + 1) % animationSteps.length;
      setStepIndex(nextStepIndex);
      
      if (nextStepIndex === 0) { 
        setTests(initialTests);
      }
    }, animationSteps[stepIndex].duration);
    
    const currentStepData = animationSteps[stepIndex];
    if (currentStepData.type === 'card' && currentStepData.tests) {
        setTimeout(() => setTests(currentStepData.tests!), 500);
    }

    return () => clearTimeout(timer);
  }, [stepIndex]);
  
  const currentStep = animationSteps[stepIndex];
  const firstCardStepIndex = animationSteps.findIndex(s => s.type === 'card');
  const cardData = animationSteps.find(s => s.type === 'card' && currentStep.type === 'card' && s.status === currentStep.status) || animationSteps[firstCardStepIndex];
  
  return (
    <section className="relative w-full text-white pt-20 pb-20 lg:pt-24 lg:pb-32 flex justify-center overflow-hidden min-h-[90vh]">
      <div className="absolute inset-0 grid-background"></div>
      <div className="absolute top-0 left-0 w-1/2 h-48 bg-gradient-to-br from-purple-700 to-transparent opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-48 bg-gradient-to-tl from-indigo-700 to-transparent opacity-30 blur-3xl"></div>
      
      <div className="w-full max-w-screen-xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left Side: Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 text-center lg:text-left pt-8 lg:pt-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
              Enterprise-Grade Cybersecurity
            </span>{" "}
            for a Secure Digital Future
          </h1>

          <h3 className="mt-6 text-base md:text-lg text-gray-300 opacity-65 max-w-xl mx-auto lg:mx-0">
            Protect your infrastructure, cloud, and data with next-gen security solutions built to detect, prevent, and respond to threats in real-time. 
            Stay ahead of cyber risks with Pentora the modern alternative to legacy security platforms.
          </h3>

          <div className="mt-10 flex justify-center lg:justify-start">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-3 font-bold text-white bg-gradient-to-b from-purple-600 to-indigo-700 rounded-full shadow-lg shadow-purple-500/20"
            >
              <Link href="/request-form" className="absolute inset-0 w-full h-full"></Link>
              Secure My Company Now
            </motion.button>
          </div>
        </motion.div>
      
        {/* Right Side: Animation Container */}
        <div className="relative h-[550px] lg:h-[600px] w-full mt-12 lg:mt-0">
            <div className="absolute w-[550px] h-full top-[-64px] left-1/2 -translate-x-1/2 lg:left-[20%] lg:translate-x-0 origin-top scale-[0.7] sm:scale-[0.85] md:scale-90 lg:scale-100">
                {/* The Tracing Beam */}
                <div className="absolute top-0 left-0 h-full w-0.5 bg-white/10 z-10">
                </div>

                {/* Top Node & Action Text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute top-[88px] -left-5 flex items-center z-30"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#04010E] border border-white/10 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={stepIndex}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                            >
                                {currentStep.type === 'log' && currentStep.icon}
                                {currentStep.type === 'threat' && <ShieldAlert size={18} className={currentStep.status === 'Detected' ? 'text-amber-400' : 'text-green-400'} />}
                                {(currentStep.type === 'card' || currentStep.type === 'summary') && <GitCommitHorizontal size={18} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                      <div className="ml-4 text-sm text-gray-300 flex items-center space-x-2 whitespace-nowrap">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={stepIndex}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.5 }}
                            >
                                {currentStep.type === 'log' && (
                                    <span className="text-gray-300">{currentStep.text}</span>
                                )}
                                {currentStep.type === 'threat' && (
                                    <div className="flex items-center space-x-3">
                                        <span className="font-mono text-xs bg-white/10 px-2 py-1 rounded">{currentStep.ip}</span>
                                        <span className="text-gray-300">{currentStep.name}</span>
                                        <span className={`font-bold text-xs ${currentStep.status === 'Detected' ? 'text-amber-400' : 'text-green-400'}`}>
                                            {currentStep.status}
                                        </span>
                                    </div>
                                )}
                                {(currentStep.type === 'card' || currentStep.type === 'summary') && (
                                    <span className="text-gray-400">Deploying security configuration...</span>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                  </motion.div>

                {/* Card */}
                <motion.div
                    key="animated-card"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute top-[160px] left-[48px] z-20"
                >
                    <div className="w-[496px] h-[372px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] shadow-2xl shadow-purple-500/10 pt-6 px-2 pb-2">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4 px-2">
                                <div className="flex items-center space-x-2">
                                    <Image src="/encoderspro.png" width={80} height={40} alt="logo" />
                                    <AnimatePresence mode="wait">
                                        <motion.div key={stepIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center space-x-2">
                                            {cardData.type === 'card' && cardData.progress && <span className="text-white text-sm">{cardData.progress}</span>}
                                            {cardData.type === 'card' && cardData.status && <span className={`text-sm text-purple-400`}>{cardData.status}</span>}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {tests.map((test, index) => (
                                    <motion.div 
                                        key={index} 
                                        className="flex justify-between items-center bg-white/5 p-3 rounded-lg"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="text-white/50">{test.icon}</div>
                                            <span className="text-sm text-gray-300">{test.name}</span>
                                        </div>
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={test.status + index}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className={`text-xs px-2 py-1 rounded-full ${ test.status === 'Passing' ? 'bg-green-500/20 text-green-400' : test.status === 'Failing' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400' }`}
                                            >
                                                {test.status}
                                            </motion.span>
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
                
                  {/* Summary Node */}
                  <AnimatePresence>
                    {currentStep.type === 'summary' && (
                        <motion.div
                          key="summary-node"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0}}
                          transition={{delay: 0.5}}
                          className="absolute top-[550px] -left-5 flex items-center z-20"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#04010E] border border-white/10 flex items-center justify-center">
                              <CheckCircle2 size={16} className="text-green-400"/>
                          </div>
                          <div className="ml-4 flex items-center space-x-4">
                              <span className="text-xs flex items-center text-green-400"><CheckCircle2 size={12} className="mr-1"/> {currentStep.passing} tests passing</span>
                              <span className="text-xs flex items-center text-red-400"><XCircle size={12} className="mr-1"/> {currentStep.failing} tests failing</span>
                          </div>
                        </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Loader Node */}
                  <AnimatePresence>
                    {stepIndex >= 5 && stepIndex < 8 && (
                        <motion.div 
                            key="loader-node"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-[350px] -left-5 flex items-center z-20"
                        >
                            <div className="w-10 h-10 rounded-full bg-[#04010E] border border-white/10 flex items-center justify-center">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                                    <Loader size={18} className="text-purple-400"/>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                  </AnimatePresence>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;