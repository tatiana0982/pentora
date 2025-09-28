"use client";

import React from 'react';
import { motion } from 'framer-motion';

const TrustedBy: React.FC = () => {
    return (
        <section className="relative bg-[#0a0710] text-gray-300 py-24 md:py-32 overflow-hidden">
            {/* --- ADDED BACKGROUND ELEMENTS --- */}
            <div className="absolute inset-0 grid-background"></div>
            <div className="absolute top-0 left-0 w-1/2 h-48 bg-gradient-to-br from-purple-700 to-transparent opacity-30 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-48 bg-gradient-to-tl from-indigo-700 to-transparent opacity-30 blur-3xl"></div>

            {/* Centered Content */}
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    {/* Added py-2 to prevent font clipping */}
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 py-2">
                        Trusted By Leading Companies
                    </h2>
                    <p className="text-purple-400 mt-4 text-base md:text-lg max-w-2xl mx-auto">
                        Our track record is a testament to the trust global organizations place in our expertise and commitment to cybersecurity.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default TrustedBy;