"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
    ShieldCheck, 
    Bot,
    Target,
    Activity,
    CloudCog,
    Lock,
    Cog
} from 'lucide-react';
import { Chart, registerables } from 'chart.js/auto';

// -- DYNAMIC BACKGROUND ANIMATION --
const BackgroundAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight * 2; // Make canvas taller

        const columns = Math.floor(width / 20);
        const drops: number[] = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#4c1d95';
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = Math.random() > 0.5 ? '0' : '1';
                ctx.fillText(text, i * 20, drops[i] * 20);
                if (drops[i] * 20 > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        const interval = setInterval(draw, 40);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight * 2;
        };
        window.addEventListener('resize', handleResize);
        
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 opacity-20" />;
};

// -- LIVE THREAT CHART COMPONENT --
const LiveThreatChart = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        Chart.register(...registerables);
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['SQLi', 'XSS', 'DDoS', 'Malware', 'Phishing', 'Ransomware'],
                datasets: [{
                    label: 'Threats Detected (Last Hour)',
                    data: [120, 190, 300, 50, 200, 30].map(d => d + Math.floor(Math.random() * 50)),
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.5)',
                        'rgba(249, 115, 22, 0.5)',
                        'rgba(234, 179, 8, 0.5)',
                        'rgba(132, 204, 22, 0.5)',
                        'rgba(59, 130, 246, 0.5)',
                        'rgba(168, 85, 247, 0.5)',
                    ],
                    borderColor: [
                        '#ef4444', '#f97316', '#eab308', '#84cc16', '#3b82f6', '#a855f7'
                    ],
                    borderWidth: 1.5,
                    borderRadius: 4,
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { 
                        ticks: { color: '#9ca3af', font: { size: 10 } }, 
                        grid: { color: 'rgba(255,255,255,0.05)' } 
                    },
                    y: { 
                        ticks: { color: '#e5e7eb', font: { size: 10 } }, 
                        grid: { color: 'rgba(255,255,255,0.05)' } 
                    }
                }
            }
        });
        
        const interval = setInterval(() => {
            chart.data.datasets[0].data = chart.data.datasets[0].data.map(d => Math.max(0, (d as number) + (Math.random() > 0.5 ? 1 : -1) * 5));
           chart.update('none');
        }, 1500);

        return () => {
            clearInterval(interval);
            chart.destroy();
        }
    }, []);
    
    return <canvas ref={chartRef} />;
};


// -- SERVICE CARD COMPONENT --
const ServiceCard: React.FC<{ icon: React.ElementType; title: string; description: string; delay: number; }> = ({ icon: Icon, title, description, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay }}
            className="group relative bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 transition-all duration-300 hover:border-purple-400 hover:bg-white/10"
        >
            <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-lg group-hover:bg-purple-600 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-purple-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
            </div>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed">{description}</p>
        </motion.div>
    );
};

// -- CARD COMPONENT --
const Card: React.FC<{ children: React.ReactNode; className?: string; }> = ({ children, className = '' }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: cardRef, offset: ["0 1", "1.33 1"] });
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        };
        el.addEventListener('mousemove', handleMouseMove);
        return () => el.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            ref={cardRef}
            style={{ scale: scaleProgress, opacity: opacityProgress }}
            className={`card-container group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10 transition-all duration-300 ease-out h-full ${className}`}
        >
            {children}
        </motion.div>
    );
};

// -- MAIN COMPONENT --
const SuperCard: React.FC = () => {
    const services = [
        { icon: Target, title: "Penetration Testing", description: "We identify vulnerabilities and assess the overall security posture." },
        { icon: Activity, title: "Threat Monitoring", description: "We monitor and analyse your company and respond to security threats in real-time." },
        { icon: ShieldCheck, title: "Response Assessment", description: "We evaluate security incidents and develop effective response plans." },
        { icon: CloudCog, title: "Cloud-Native Security", description: "Secure cloud environments to protect data and applications during migration and beyond." },
        { icon: Lock, title: "Data Security", description: "Comprehensive solutions to safeguard sensitive data, including encryption and access control." },
        { icon: Cog, title: "Security Automation", description: "Streamlined security operations to help you respond to threats quickly and effectively." }
    ];
    
    return (
        <section className="relative bg-black text-gray-200 min-h-screen py-20 sm:py-24 px-4 sm:px-6 md:px-8 font-sans overflow-hidden">
            <BackgroundAnimation />
             <style jsx global>{`
                 @property --mouse-x { syntax: '<length>'; initial-value: 0px; inherits: false; }
                 @property --mouse-y { syntax: '<length>'; initial-value: 0px; inherits: false; }
                 .card-container::before {
                     content: "";
                     position: absolute; inset: -1.5px;
                     border-radius: inherit;
                     opacity: 0;
                     background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(168, 85, 247, 0.25), transparent 40%);
                     transition: opacity 0.4s;
                     pointer-events: none;
                 }
                 .group:hover::before { opacity: 1; }
                 .no-scrollbar::-webkit-scrollbar { display: none; }
                 .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
             `}</style>
            
            <div className="max-w-screen-2xl mx-auto relative z-10">
                <motion.div 
                    initial={{opacity: 0, y: 20}} 
                    animate={{opacity: 1, y: 0}} 
                    transition={{duration: 0.8}} 
                    className="text-center mb-20 md:mb-28"
                >
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 leading-tight">
                        PENTORA
                    </h1>
                    <p className="text-purple-400 mt-4 max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-semibold">
                        Secure Your Data, Secure Your Future.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                    
                    <Card className="lg:col-span-8 lg:row-span-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Live Global Threat Analysis</h3>
                        <p className="text-gray-400 mb-6 text-sm sm:text-base">Our Security Operations Center (SOC) monitors global threats 24/7, providing real-time insights and immediate response capabilities.</p>
                        <div className="h-[350px] sm:h-[400px] lg:h-[450px]">
                           <LiveThreatChart />
                        </div>
                    </Card>

                    <Card className="lg:col-span-4">
                        <motion.div 
                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} 
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }} 
                            className="p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-[length:200%_200%]"
                        >
                            <ShieldCheck className="h-6 w-6 text-white" />
                        </motion.div>
                        <h3 className="font-semibold text-xl md:text-2xl text-white">Why Choose Us?</h3>
                        <p className="text-gray-400 mt-2 text-sm sm:text-base leading-relaxed">
                             We prioritize security from the start to ensure customer workloads are always protected. Our expert services offer a security-first approach to safeguard your valuable assets.
                        </p>
                    </Card>

                    <Card className="lg:col-span-4">
                        <div className="p-3 bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                             <Bot className="h-6 w-6 text-purple-400" />
                        </div>
                        <h3 className="font-semibold text-xl md:text-2xl text-white">AI Analyst Co-Pilot</h3>
                        <p className="text-gray-400 mt-2 text-sm sm:text-base leading-relaxed">
                             Leverage our generative AI to automate investigation summaries, write response plans, and query data with natural language.
                        </p>
                    </Card>

                </div>

                 <motion.div 
                    initial={{opacity: 0, y: 20}} 
                    whileInView={{opacity: 1, y: 0}} 
                    viewport={{once: true, amount: 0.2}} 
                    transition={{duration: 0.8}} 
                    className="text-center my-20 md:my-28"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Our Unique Approach To Security</h2>
                    <p className="text-gray-400 mt-4 max-w-3xl mx-auto text-base sm:text-lg">
                        We offer a comprehensive suite of cybersecurity services designed to protect your organization's critical assets and reputation.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={service.title} {...service} delay={index * 0.1} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default SuperCard;