"use client";

import React from 'react';
import { motion } from 'framer-motion';

const TrustedBy: React.FC = () => {
    return (
        <section className="relative bg-gray-950 text-gray-300 py-24 md:py-32 overflow-hidden">
            {/* Background Dot Pattern with Radial Mask */}
            <div
                className="absolute inset-0 z-0 bg-dot-purple-500/[0.15]"
                style={{
                    maskImage: 'radial-gradient(ellipse at center, white, transparent 60%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, white, transparent 60%)'
                }}
            />

            {/* Centered Content */}
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        Trusted By Leading Companies
                    </h2>
                    <p className="text-purple-400 mt-4 text-base md:text-lg max-w-2xl mx-auto">
                        Our track record is a testament to the trust global organizations place in our expertise and commitment to cybersecurity.
                    </p>
                </motion.div>
            </div>

            {/* Minimal Required Styles */}
            <style jsx>{`
                .bg-dot-purple-500\\[\\[0.15\\]\\] {
                    background-image: radial-gradient(circle at center, rgba(168, 85, 247, 0.15) 1px, transparent 1px);
                    background-size: 1.5rem 1.5rem;
                }
            `}</style>
        </section>
    );
};

export default TrustedBy;