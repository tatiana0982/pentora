"use client";
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { toolsData } from '@/lib/toolData';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ToolCard = ({ tool }: { tool: any }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateYValue = 20 * ((x - width / 2) / (width / 2));
    const rotateXValue = -20 * ((y - height / 2) / (height / 2));
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const typeColor: Record<string, string> = {
    Proprietary: 'bg-fuchsia-500/10 text-fuchsia-400',
    'Open Source': 'bg-green-500/10 text-green-400',
    Commercial: 'bg-blue-500/10 text-blue-400',
    Enterprise: 'bg-purple-500/10 text-purple-400'
  };

  return (
    <Link href={`/tools/${tool.id}`} className="block h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 border rounded-xl"
      >
        <h3>{tool.name}</h3>
        <span className={typeColor[tool.type]}>{tool.type}</span>
      </motion.div>
    </Link>
  );
};

const CyberVFXBackground = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const ToolCategory = ({
  title,
  tools,
  isInitiallyOpen = false,
}: {
  title: string;
  tools: any[];
  isInitiallyOpen?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(isInitiallyOpen);
  const visibleTools = isExpanded ? tools : tools.slice(0, 3);

  return (
    <div>
      <h2>{title}</h2>
      {visibleTools.map((tool: any) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
};

const ToolsPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div>
      <Navbar />
      <CyberVFXBackground>
        {Object.entries(toolsData).map(([title, tools], i) => (
          <ToolCategory key={title} title={title} tools={tools as any[]} isInitiallyOpen={i === 0} />
        ))}
      </CyberVFXBackground>
      <Footer />
    </div>
  );
};

export default ToolsPage;