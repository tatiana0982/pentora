// components/HeroSearch.tsx

"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { Search, Eye, X, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

// --- SCAN MODAL COMPONENT (MODIFIED) ---
const ScanModal = ({ isOpen, onClose, domain }) => {
  const [stage, setStage] = useState("scanning");
  const [checks, setChecks] = useState([]);
  const [results, setResults] = useState({ passed: 0, failed: 0 });

  // Simplified form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    contact: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetFormState = () => {
    setStage("scanning");
    setChecks([]);
    setFormData({ name: "", email: "", company: "", contact: "" });
  };

  useEffect(() => {
    if (isOpen) {
      resetFormState();
      const allChecks = [
        "DNSSEC Record Analysis",
        "SSL/TLS Certificate Chain Validation",
        "HTTP Security Headers Audit",
        "Open Port & Service Banner Enumeration",
        "Subdomain Hijacking Vulnerability Check",
        "Mail Server Security (SPF, DKIM, DMARC)",
        "Firewall Configuration & Egress Filtering Test",
        "Known Vulnerabilities Scan (CVE)",
        "Threat Intelligence Feed Cross-Reference",
      ];
      const runScan = () => {
        allChecks.forEach((check, index) => {
          setTimeout(
            () =>
              setChecks((prev) => [
                ...prev,
                { text: check, status: "running" },
              ]),
            (index + 1) * 600
          );
        });
        setTimeout(async () => {
          const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ domain }),
          });

          const data = await res.json();
          const { passed, failed } = data.data ;
          setResults({ passed, failed: failed });
          setStage("results");
        }, (allChecks.length + 1) * 600);
      };
      runScan();
    }
  }, [isOpen]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, company, contact } = formData;
    // Updated validation for the four required fields
    if (!name || !email || !company || !contact) {
      toast.error("Please fill in all the required details.");
      return;
    }

    await fetch("/api/analyzed-contact-details", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ domain , name , email , company , contact }),
          });

    setStage("submitted");
    // Close modal after showing success message
    onClose()
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-3xl rounded-2xl border border-purple-800/60 bg-[#0d0517] p-8 text-white shadow-2xl shadow-purple-500/10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-20"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Security Posture Assessment
            </h2>
            <p className="text-center text-gray-400 mt-1">
              Scanning:{" "}
              <span className="font-mono text-purple-300">{domain}</span>
            </p>
            <div className="mt-6 max-h-[70vh] overflow-y-auto pr-3 custom-scrollbar">
              {stage === "scanning" && (
                <div className="h-[320px] overflow-hidden space-y-3">
                  <p className="text-center text-sm text-gray-400 mb-4">
                    Running {checks.length} of 9 checks...
                  </p>
                  <AnimatePresence>
                    {checks.map((check, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-3 text-sm"
                      >
                        <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                        <span className="text-gray-300">{check.text}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
              {stage === "results" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <h3 className="text-xl font-bold">Scan Complete</h3>
                  <div className="flex justify-center gap-8 my-4">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle2 size={24} />
                      <span className="text-2xl font-bold">
                        {results.passed}
                      </span>
                      <span>Checks Passed</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-400">
                      <XCircle size={24} />
                      <span className="text-2xl font-bold">
                        {results.failed}
                      </span>
                      <span>Risks Found</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm max-w-md mx-auto">
                    Your high-level report is ready. Provide your details to
                    receive the full, comprehensive vulnerability assessment.
                  </p>
                  <button
                    onClick={() => setStage("form")}
                    className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-colors"
                  >
                    Download Full Report
                  </button>
                </motion.div>
              )}
              {(stage === "form" || stage === "submitted") && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {stage === "submitted" ? (
                    // --- SUCCESS MODAL ---
                    <div className="text-center py-12">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                      >
                        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                      </motion.div>
                      <h3 className="mt-4 text-2xl font-bold">Thank You!</h3>
                      <p className="text-gray-400 text-lg">
                        Your submission has been received. Our team will get in
                        touch with you shortly.
                      </p>
                    </div>
                  ) : (
                    // --- SIMPLIFIED FORM ---
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-400">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full mt-1 bg-gray-900/50 border border-purple-800/60 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-400">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full mt-1 bg-gray-900/50 border border-purple-800/60 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-400">
                            Company Name
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full mt-1 bg-gray-900/50 border border-purple-800/60 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-400">
                            Contact Number
                          </label>
                          <input
                            type="tel"
                            name="contact"
                            value={formData.contact}
                            onChange={handleInputChange}
                            className="w-full mt-1 bg-gray-900/50 border border-purple-800/60 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full !mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- HERO SEARCH SECTION COMPONENT (NO CHANGES NEEDED HERE) ---
const HeroSearch = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scanDomain, setScanDomain] = useState("");
  const [scanError, setScanError] = useState("");

  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleDomainSubmit = (e) => {
    e.preventDefault();
    const domainInput = e.target.elements.domain.value;
    const domainRegex =
      /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    const cleanedDomain = domainInput
      .replace(/^(https?:\/\/)?(www\.)?/, "")
      .split("/")[0];

    if (cleanedDomain && domainRegex.test(cleanedDomain)) {
      setScanDomain(cleanedDomain);
      setIsModalOpen(true);
      setScanError("");
    } else {
      setScanError("Please enter a valid domain name.");
      setTimeout(() => setScanError(""), 3000);
    }
  };

  return (
    <div className="relative w-full bg-[#0a0710] text-white font-sans overflow-hidden">
      {/* --- ADDED BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 grid-background"></div>
      <div className="absolute top-0 left-0 w-1/2 h-48 bg-gradient-to-br from-purple-700 to-transparent opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-48 bg-gradient-to-tl from-indigo-700 to-transparent opacity-30 blur-3xl"></div>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1d1238",
            color: "#e2e8f0",
            border: "1px solid #581c87",
          },
        }}
      />
      {/* This original mouse-follow effect is kept */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.3), transparent 80%)`,
        }}
      />

      <ScanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        domain={scanDomain}
      />

      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center pt-16 pb-20 sm:pt-20 sm:pb-24"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-500 to-purple-600">
                PENTORA
              </span>
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-3xl font-black tracking-tighter uppercase">
              <span className="block text-gray-400">
                Pentesting-Over-Recon & Analysis
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-400">
              A curated & proprietary arsenal of advanced tools and services
              designed to fortify your digital defenses and ensure robust
              cybersecurity for your enterprise.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12"
            >
              <form
                onSubmit={handleDomainSubmit}
                className="relative max-w-2xl mx-auto"
              >
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  name="domain"
                  type="text"
                  placeholder="Check your domain's security posture (e.g., example.com)"
                  className="w-full rounded-full border border-purple-800/60 bg-gray-900/50 py-4 pl-14 pr-32 text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition-colors"
                >
                  Scan
                </button>
              </form>
              {scanError && (
                <p className="text-center text-red-400 mt-2 text-sm animate-pulse">
                  {scanError}
                </p>
              )}
            </motion.div>
            <Link href="/threat-monitoring" passHref>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 30px rgba(168, 85, 247, 0.7)",
                }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 relative inline-flex items-center gap-2 rounded-full bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300"
              >
                <Eye className="h-5 w-5" />
                Visit Live Threat Monitor
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
