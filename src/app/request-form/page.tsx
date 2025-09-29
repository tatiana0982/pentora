'use client';
import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaUsers, FaRegListAlt, FaCommentAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const servicesList = [
    "Application Security & VAPT", "Network Security & VAPT",
    "Cloud-Native Security", "Data Security & Privacy Compliance",
    "Infrastructure Security", "Cyber Threat Intelligence (CTI)",
    "Security Audits & Compliance Readiness", "Cybersecurity Consulting Services",
    "Red Team Assessments", "Managed Security Services (MSS)",
    "Radio Frequency - Mesh VAPT", "Scada/IOT Devices VAPT",
    "Security Awareness & Training Programs", "Others"
];

// Helper component for modern, boxy input fields
const FormInput = ({ icon: Icon, name, label, ...props }) => (
    <div>
        <label htmlFor={name} className="flex items-center gap-2.5 text-sm font-medium text-slate-300 mb-2">
            <Icon className="text-purple-400" />
            {label}
        </label>
        <input
            id={name}
            name={name}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white px-4 py-2.5 outline-none transition-all duration-300"
            {...props}
        />
    </div>
);

export default function RequestDemoPage() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', company: '', employees: '', message: '', services: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleServiceToggle = (service) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) return toast.error('Full Name is required.');
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Please enter a valid work email.');
        if (!formData.phone.trim()) return toast.error('Contact Number is required.');
        if (!formData.company.trim()) return toast.error('Company Name is required.');
        if (!formData.employees) return toast.error('Number of Employees is required.');
        if (formData.services.length === 0) return toast.error('Please select at least one service.');
        
        setIsSubmitting(true);
        toast.success('Thank you! Your request has been submitted.');
        console.log('Form Submitted:', formData);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    name: '', email: '', phone: '', company: '', employees: '', message: '', services: []
                });
            }, 4000);
        }, 1000);
    };

    return (
        <>
            <Navbar />
            <div className="aurora-background font-sans bg-[#110f19] text-white min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
                <style jsx global>{`
                    /* Aurora background styles */
                    .aurora-background::before, .aurora-background::after { content: ''; position: absolute; z-index: 0; }
                    .aurora-background::before { top: 50%; left: 50%; transform: translate(-50%, -50%); width: 150%; padding-bottom: 150%; background-image: radial-gradient(circle at 15% 25%, rgba(168, 85, 247, 0.15), transparent 40%), radial-gradient(circle at 85% 75%, rgba(109, 40, 217, 0.2), transparent 40%); animation: rotateAurora 25s linear infinite; filter: blur(60px); }
                    .aurora-background::after { inset: -10px; background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 40px 40px; opacity: 0.8; }
                    @keyframes rotateAurora { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
                `}</style>
                <ToastContainer position="bottom-right" autoClose={5000} theme="dark" />
                
                <main className={`relative z-10 w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center transition-opacity duration-1000 ease-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    
                    {/* Left Column: Text Content */}
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                            Secure Your Digital Frontier.
                        </h1>
                        <p className="mt-6 text-lg text-slate-300">
                            Request a personalized quote to see how our leading cybersecurity platform can protect your organization from evolving threats. Fill out the form to get started.
                        </p>
                    </div>

                    {/* Right Column: Form */}
                    <div className="w-full bg-slate-900/60 border border-slate-700 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
                        {isSubmitted ? (
                            <div className="text-center py-10">
                                <h3 className="font-bold text-2xl text-green-400">Thank You!</h3>
                                <p className="text-slate-300 mt-2">Your quote request has been sent successfully. We'll be in touch soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Get a Quote</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                                    <FormInput icon={FaUser} name="name" label="Full Name *" type="text" placeholder="John Doe" value={formData.name} onChange={handleInputChange} />
                                    <FormInput icon={FaEnvelope} name="email" label="Work Email *" type="email" placeholder="john.doe@company.com" value={formData.email} onChange={handleInputChange} />
                                    <FormInput icon={FaPhone} name="phone" label="Contact Number *" type="tel" placeholder="+1 (555) 123-4567" value={formData.phone} onChange={handleInputChange} />
                                    <FormInput icon={FaBuilding} name="company" label="Company Name *" type="text" placeholder="Your Company Inc." value={formData.company} onChange={handleInputChange} />
                                </div>
                                <FormInput icon={FaUsers} name="employees" label="Number of Employees *" type="number" placeholder="e.g., 500" value={formData.employees} onChange={handleInputChange} />
                                
                                <div>
                                    <label className="flex items-center gap-2.5 text-sm font-medium text-slate-300 mb-3">
                                        <FaRegListAlt className="text-purple-400" />
                                        Select Services *
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {servicesList.map((service) => (
                                            <button type="button" key={service} onClick={() => handleServiceToggle(service)}
                                                className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                                                    formData.services.includes(service)
                                                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                                }`}>
                                                {service}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="flex items-center gap-2.5 text-sm font-medium text-slate-300 mb-2">
                                        <FaCommentAlt className="text-purple-400" />
                                        Tell us about your needs
                                    </label>
                                    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={3}
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white px-4 py-2.5 outline-none transition-all duration-300 resize-none"
                                        placeholder="(Optional) Provide any specific details here..."
                                    ></textarea>
                                </div>
                                
                                <div className="pt-2">
                                    <button type="submit" disabled={isSubmitting}
                                        className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                    
                </main>
            </div>
            <Footer />
        </>
    );
}