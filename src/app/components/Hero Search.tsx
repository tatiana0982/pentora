"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { Search, Eye, X, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

const ScanModal = ({ isOpen, onClose, domain }: { isOpen: boolean; onClose: () => void; domain: string }) => {
  const [stage, setStage] = useState("scanning");
  const [checks, setChecks] = useState<{ text: string; status: string }[]>([]);
  const [results, setResults] = useState({ passed: 0, failed: 0 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    contact: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          const { passed, failed } = data.data;
          setResults({ passed, failed: failed });
          setStage("results");
        }, (allChecks.length + 1) * 600);
      };
      runScan();
    }
  }, [isOpen]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, company, contact } = formData;

    if (!name || !email || !company || !contact) {
      toast.error("Please fill in all the required details.");
      return;
    }

    fetch("/api/analyzed-contact-details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain, name, email, company, contact }),
    });

    setStage("submitted");
    onClose();
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
          <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="relative w-full max-w-3xl rounded-2xl border border-purple-800/60 bg-[#0d0517] p-8 text-white shadow-2xl shadow-purple-500/10">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-20"><X size={24} /></button>
            <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Security Posture Assessment</h2>
            <p className="text-center text-gray-400 mt-1">Scanning: <span className="font-mono text-purple-300">{domain}</span></p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const HeroSearch = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scanDomain, setScanDomain] = useState("");
  const [scanError, setScanError] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleDomainSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const domainInput = (e.currentTarget.elements.namedItem("domain") as HTMLInputElement).value;

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
      <ScanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        domain={scanDomain}
      />
    </div>
  );
};

export default HeroSearch;