'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CTA = () => {
  return (
    <section className="relative bg-[#0E091E] text-white py-24 sm:py-32 flex flex-col items-center text-center overflow-hidden">
      {/* Style for the subtle grid background pattern */}
      <style jsx>{`
        .grid-background {
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 2rem 2rem;
        }
      `}</style>

      <div className="absolute inset-0 grid-background"></div>

      {/* Decorative background gradients */}
      <div className="absolute left-1/4 top-0 w-48 h-48 bg-gradient-to-br from-purple-700 to-transparent opacity-50 blur-3xl"></div>
      <div className="absolute right-1/4 bottom-0 w-48 h-48 bg-gradient-to-tl from-indigo-700 to-transparent opacity-50 blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl mx-auto px-4"
      >
        <div className="flex justify-center items-center mb-8">
          <motion.div
            className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center"
            initial={{ y: -50, rotateX: 45, rotateY: 45 }}
            whileInView={{ y: 0, rotateX: 0, rotateY: 0 }}
            transition={{ type: 'spring', stiffness: 100, duration: 2 }}
            viewport={{ once: true }}
          >
            <div className="absolute w-full h-full bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl blur-xl opacity-50"></div>
            <div className="relative w-full h-full bg-gray-900 border-2 border-white/10 rounded-3xl flex flex-col items-center justify-center text-purple-400 p-2 space-y-1">
              <Image
                src="/pentora-logo.png"
                alt="Pentora Logo"
                width={80}
                height={80}
                className="object-contain sm:w-20 sm:h-20"
              />
              <div className="text-xs bg-gradient-to-r from-green-400 to-green-600 text-black font-mono px-2 rounded">
                $ Pentora push
              </div>
            </div>
          </motion.div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          Stop guessing. Ship with confidence.
        </h2>
        <p className="text-base md:text-lg text-gray-300 opacity-65 mb-10">
          The automated AI evaluation and monitoring platform.
        </p>

        <div className="mt-10">
          <a href="/request-form">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 font-bold text-white bg-gradient-to-b from-purple-600 to-indigo-700 rounded-full shadow-lg shadow-purple-500/20"
            >
              Get a Quote
            </motion.button>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
