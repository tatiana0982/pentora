'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils"; // You will need to create this utility file, see below.

// Step 1: Create a utility file for classnames at `src/lib/utils.ts`
//
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]);

  return (
    <motion.div ref={ref} className={cn("relative w-full max-w-4xl mx-auto h-full", className)}>
      <div className="absolute -left-20 top-3">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{ boxShadow: scrollYProgress.get() > 0 ? "none" : "rgba(147, 51, 234, 0.5) 0px 0px 30px 5px" }}
          className="ml-[27px] h-4 w-4 rounded-full border border-purple-500 shadow-sm flex items-center justify-center"
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            animate={{ backgroundColor: scrollYProgress.get() > 0 ? "white" : "var(--emerald-500)", borderColor: "white" }}
            className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{ duration: 10 }}
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            className="motion-reduce:hidden"
            transition={{ duration: 10 }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#592FEA" stopOpacity="0"></stop>
              <stop stopColor="#592FEA"></stop>
              <stop offset="0.325" stopColor="#7A58EE"></stop>
              <stop offset="1" stopColor="#C4B5F8" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};


const FeatureCard = ({ subtitle, title, description, animationComponent }: { subtitle: string; title: string; description: string; animationComponent: React.ReactNode }) => (
    <div className="grid md:grid-cols-2 gap-16 items-center mb-40">
        <div className="text-left">
            <h3 className="text-md font-normal bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-500 mb-4">{subtitle}</h3>
            <h2 className="text-5xl font-bold text-white leading-tight mb-6">{title}</h2>
            <p className="text-lg text-gray-300 opacity-65">{description}</p>
        </div>
        <div>
            {animationComponent}
        </div>
    </div>
);

const Features = () => {
    return (
        <section className="relative py-32 w-full">
            <div className="absolute inset-0 grid-background"></div>
            <TracingBeam className="px-6">
                <FeatureCard
                    subtitle="Development"
                    title="From prototype to production. Safely."
                    description="Pentora supports you from day one, ensuring a smooth transition from prototype to production through ongoing testing."
                    animationComponent={<div>{/* Add your animated visual for this section */}</div>}
                />
                <FeatureCard
                    subtitle="Monitoring"
                    title="Monitor production requests with ease"
                    description="Observe and monitor your AI systems in real-time with Pentora. Catch issues in production and fix your AI within a matter of minutes."
                    animationComponent={<div>{/* Add your animated visual for this section */}</div>}
                />
                <FeatureCard
                    subtitle="Data quality"
                    title="Automated checks for data quality"
                    description="Connect your data pipelines and automatically test for schema changes, drift, and anomalies, so you catch bad data before it reaches your models."
                    animationComponent={<div>{/* Add your animated visual for this section */}</div>}
                />
                <FeatureCard
                    subtitle="Compliance"
                    title="Effortless governance"
                    description="Align AI systems with standards like ISO/IEC 42001, OWASP, NIST, and the EU AI Act for worry-free compliance."
                    animationComponent={<div>{/* Add your animated visual for this section */}</div>}
                />
            </TracingBeam>
        </section>
    );
};

export default Features;