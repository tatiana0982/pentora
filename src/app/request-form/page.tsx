'use client';
import React, { useState, useEffect } from 'react';
import {
    FaUser, FaEnvelope, FaPhone, FaBuilding, FaUsers, FaRegListAlt, FaCommentAlt, FaChevronDown
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const servicesList = [
    "Application Security", "Network VAPT", "Cloud Security", "Data Compliance",
    "Infra Security", "Threat Intelligence", "Audits & Compliance", "Cyber Consulting",
    "Red Teaming", "Managed Services", "RF/Mesh VAPT", "SCADA/IOT",
    "Security Training", "Others"
];

const employeeOptions = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

const FormInput = ({ icon: Icon, name, label, ...props }) => (
    <div>
        <label htmlFor={name} className="flex items-center gap-2 text-xs font-medium text-slate-300 mb-1">
            <Icon className="text-purple-400 text-sm" />
            {label}
        </label>
        <input
            id={name}
            name={name}
            className="w-full text-sm bg-slate-800/50 border border-slate-700 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white px-3 py-2 outline-none transition-all duration-300"
            {...props}
        />
    </div>
);

export default function RequestDemoPage() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', company: '', employees: '', message: '', services: []
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => setIsVisible(true), []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleServiceToggle = (service) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service],
        }));
    };

    const handleDropdownSelect = (option) => {
        setFormData(prev => ({ ...prev, employees: option }));
        setDropdownOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, phone, company, employees, services } = formData;
        if (!name.trim()) return toast.error('Full Name is required.');
        if (!/\S+@\S+\.\S+/.test(email)) return toast.error('Enter a valid email.');
        if (!phone.trim()) return toast.error('Phone is required.');
        if (!company.trim()) return toast.error('Company is required.');
        if (!employees) return toast.error('Select number of employees.');
        if (services.length === 0) return toast.error('Select at least one service.');

        setIsSubmitting(true);
        toast.success('Submitted successfully!');
        console.log('Form Data:', formData);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', phone: '', company: '', employees: '', message: '', services: [] });
            }, 4000);
        }, 1000);
    };

    return (
        <>
            <Navbar />
            <div className="aurora-background font-sans bg-[#110f19] text-white min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
                <style jsx global>{`
                    .aurora-background::before, .aurora-background::after {
                        content: ''; position: absolute; z-index: 0;
                    }
                    .aurora-background::before {
                        top: 50%; left: 50%; transform: translate(-50%, -50%);
                        width: 150%; padding-bottom: 150%;
                        background-image: radial-gradient(circle at 15% 25%, rgba(168, 85, 247, 0.15), transparent 40%),
                                          radial-gradient(circle at 85% 75%, rgba(109, 40, 217, 0.2), transparent 40%);
                        animation: rotateAurora 25s linear infinite; filter: blur(60px);
                    }
                    .aurora-background::after {
                        inset: -10px;
                        background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                                          linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px);
                        background-size: 40px 40px; opacity: 0.8;
                    }
                    @keyframes rotateAurora {
                        from { transform: translate(-50%, -50%) rotate(0deg); }
                        to   { transform: translate(-50%, -50%) rotate(360deg); }
                    }
                `}</style>

                <ToastContainer position="bottom-right" autoClose={5000} theme="dark" />

                <main className={`relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Left Text */}
                    <div className="text-center md:text-left mt-4">
                        <h1 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                            Secure Your Digital Frontier.
                        </h1>
                        <p className="mt-4 text-sm text-slate-300 max-w-md">
                            Get a tailored quote to see how our cybersecurity platform protects your business.
                        </p>
                    </div>

                    {/* Right Form */}
                    <div className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
                        {isSubmitted ? (
                            <div className="text-center py-10">
                                <h3 className="font-bold text-2xl text-green-400">Thank You!</h3>
                                <p className="text-slate-300 mt-2">Your request has been sent.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormInput icon={FaUser} name="name" label="Full Name *" type="text" placeholder="John Doe" value={formData.name} onChange={handleInputChange} />
                                    <FormInput icon={FaEnvelope} name="email" label="Email *" type="email" placeholder="john@company.com" value={formData.email} onChange={handleInputChange} />
                                    <FormInput icon={FaPhone} name="phone" label="Phone *" type="tel" placeholder="+1 555-1234" value={formData.phone} onChange={handleInputChange} />
                                    <FormInput icon={FaBuilding} name="company" label="Company *" type="text" placeholder="Acme Inc." value={formData.company} onChange={handleInputChange} />
                                </div>

                                {/* Custom Dropdown */}
                                <div className="relative">
                                    <label className="flex items-center gap-2 text-xs font-medium text-slate-300 mb-1">
                                        <FaUsers className="text-purple-400 text-sm" />
                                        Number of Employees *
                                    </label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                            className="w-full text-left bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-md text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 flex justify-between items-center"
                                        >
                                            {formData.employees || 'Select...'}
                                            <FaChevronDown className="ml-2 text-xs" />
                                        </button>
                                        {dropdownOpen && (
                                            <ul className="absolute z-20 mt-1 w-full bg-slate-800 border border-slate-600 rounded-md text-sm shadow-lg">
                                                {employeeOptions.map((opt) => (
                                                    <li
                                                        key={opt}
                                                        className="px-3 py-2 hover:bg-purple-600 hover:text-white cursor-pointer"
                                                        onClick={() => handleDropdownSelect(opt)}
                                                    >
                                                        {opt}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                {/* Services */}
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-medium text-slate-300 mb-2">
                                        <FaRegListAlt className="text-purple-400" />
                                        Select Services *
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {servicesList.map((service) => (
                                            <button
                                                key={service}
                                                type="button"
                                                onClick={() => handleServiceToggle(service)}
                                                className={`px-2 py-1 text-xs rounded-full transition ${
                                                    formData.services.includes(service)
                                                        ? 'bg-purple-600 text-white'
                                                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                                }`}
                                            >
                                                {service}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="flex items-center gap-2 text-xs font-medium text-slate-300 mb-1">
                                        <FaCommentAlt className="text-purple-400" />
                                        Additional Message (optional)
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder="Your message..."
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white px-3 py-2 outline-none text-sm resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-6 rounded-md text-sm transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                                </button>
                            </form>
                        )}
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}
