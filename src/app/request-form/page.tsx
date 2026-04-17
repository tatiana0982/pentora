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

const FormInput = ({
  icon: Icon,
  name,
  label,
  ...props
}: {
  icon: React.ElementType;
  name: string;
  label: string;
  [key: string]: any;
}) => (
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
    name: '', email: '', phone: '', company: '', employees: '', message: '', services: [] as string[]
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(true), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleDropdownSelect = (option: string) => {
    setFormData(prev => ({ ...prev, employees: option }));
    setDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, company, employees, services } = formData;

    if (!name.trim()) return toast.error('Full Name is required.');
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error('Enter a valid email.');
    if (!phone.trim()) return toast.error('Phone is required.');
    if (!company.trim()) return toast.error('Company is required.');
    if (!employees) return toast.error('Select number of employees.');
    if (services.length === 0) return toast.error('Select at least one service.');

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }

    toast.success('Submitted successfully!');

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
        <ToastContainer position="bottom-right" autoClose={5000} theme="dark" />

        <main className={`relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          
          <div className="text-center md:text-left mt-4">
            <h1 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Secure Your Digital Frontier.
            </h1>
            <p className="mt-4 text-sm text-slate-300 max-w-md">
              Get a tailored quote to see how our cybersecurity platform protects your business.
            </p>
          </div>

          <div className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
            {isSubmitted ? (
              <div className="text-center py-10">
                <h3 className="font-bold text-2xl text-green-400">Thank You!</h3>
                <p className="text-slate-300 mt-2">Your request has been sent.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput icon={FaUser} name="name" label="Full Name *" type="text" value={formData.name} onChange={handleInputChange} />
                  <FormInput icon={FaEnvelope} name="email" label="Email *" type="email" value={formData.email} onChange={handleInputChange} />
                  <FormInput icon={FaPhone} name="phone" label="Phone *" type="tel" value={formData.phone} onChange={handleInputChange} />
                  <FormInput icon={FaBuilding} name="company" label="Company *" type="text" value={formData.company} onChange={handleInputChange} />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-6 rounded-md text-sm transition-all disabled:opacity-50">
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