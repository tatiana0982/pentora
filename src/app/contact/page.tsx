'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation on mount
    setIsVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Form Data Submitted:', formData);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after a few seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            company: '',
            message: '',
        });
      }, 3000);
    }, 2000);
  };

  return (
    <><Navbar/>
    <div className={`aurora-background font-sans bg-[#110f19] text-white min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden`}>
      {/* Background effects */}
      <style jsx global>{`
        .aurora-background::before, .aurora-background::after {
            content: '';
            position: absolute;
            z-index: 0;
        }

        /* Animated aurora/glitter effect */
        .aurora-background::before {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 150%;
            padding-bottom: 150%;
            background-image:
                radial-gradient(circle at 15% 25%, rgba(168, 85, 247, 0.2), transparent 40%),
                radial-gradient(circle at 85% 75%, rgba(109, 40, 217, 0.25), transparent 40%);
            animation: rotateAurora 25s linear infinite;
            filter: blur(60px);
        }

        /* Static background grid */
        .aurora-background::after {
            inset: -10px; /* Extend grid beyond viewport to avoid edge issues */
            background-image:
                linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
                linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
            background-size: 40px 40px;
            opacity: 0.8;
        }

        @keyframes rotateAurora {
            from {
                transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }
      `}</style>
      
      <div className={`w-full max-w-6xl mx-auto z-10 transition-opacity duration-1000 ease-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Main Content */}
        <main className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center p-4">
          {/* Form Section */}
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Contact us</h1>
            {isSubmitted ? (
                <div className="text-center bg-green-500/20 border border-green-500 text-green-300 p-4 rounded-lg">
                    <h3 className="font-bold text-xl">Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full bg-transparent border-b border-gray-600 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 text-white py-2 outline-none transition-all duration-300 rounded-t-md" placeholder="Your first name*" />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full bg-transparent border-b border-gray-600 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 text-white py-2 outline-none transition-all duration-300 rounded-t-md" placeholder="Your last name*" />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-transparent border-b border-gray-600 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 text-white py-2 outline-none transition-all duration-300 rounded-t-md" placeholder="Your email" />
                </div>
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full bg-transparent border-b border-gray-600 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 text-white py-2 outline-none transition-all duration-300 rounded-t-md" placeholder="Your company name" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} required className="w-full bg-transparent border-b border-gray-600 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 text-white py-2 outline-none transition-all duration-300 resize-none rounded-t-md" placeholder="Please provide more information"></textarea>
                </div>
                <div>
                    <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </div>
                </form>
            )}
          </div>

          {/* Text Section */}
<div className="flex flex-col justify-center h-full text-left px-4 sm:px-6 md:px-8 lg:px-0">
  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
    We are dedicated to protecting what matters most to you.
  </h2>
  <p className="mt-4 sm:mt-5 text-base sm:text-lg text-gray-400 max-w-3xl">
    Whether you have questions, seek expert guidance, or need immediate assistance, we're only a click away.
  </p>
</div>

        </main>
      </div>
    </div>
    <Footer/>
    </>
  );
}

