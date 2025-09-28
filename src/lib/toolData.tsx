import React from 'react';
import {
    FaShieldAlt, FaCrosshairs, FaCodeBranch, FaBolt, FaLayerGroup, FaChartBar, FaServer, FaCloud, FaBrain,
    FaCode, FaNetworkWired, FaGlobe
} from 'react-icons/fa';
import { GiDragonHead, GiGhost, GiAges } from 'react-icons/gi'; // CORRECTED: GiCerberus -> GiDragonHead


export const toolsData = {
    "Pentora's Proprietary Arsenal": [
        { id: 'cerberus', name: 'Cerberus', category: 'Threat Correlation Engine', description: 'Our AI-driven platform that ingests, analyzes, and correlates threat data from millions of sources in real-time.', icon: <GiDragonHead className="w-8 h-8 text-fuchsia-400" />, type: 'Proprietary' }, // CORRECTED: GiCerberus -> GiDragonHead
        { id: 'spectre-c2', name: 'Spectre C2', category: 'Red Team C2 Framework', description: 'An elusive and modular command-and-control framework designed for advanced adversary simulation.', icon: <GiGhost className="w-8 h-8 text-fuchsia-400" />, type: 'Proprietary' },
        { id: 'aegis-shield', name: 'Aegis Shield', category: 'Cloud-Native Autonomous Defense', description: 'Automated defense for cloud workloads, providing proactive threat mitigation without human intervention.', icon: <GiAges className="w-8 h-8 text-fuchsia-400" />, type: 'Proprietary' },
    ],
    "Threat Intelligence & Analytics": [
        { id: 'shodan', name: 'Shodan', category: 'Attack Surface Monitoring', description: 'The search engine for everything on the Internet, helping you discover exposed devices and services.', icon: <FaGlobe className="w-8 h-8 text-cyan-300" />, type: 'Commercial' },
        { id: 'misp', name: 'MISP', category: 'Threat Intelligence', description: 'An open-source platform for sharing, storing, and correlating indicators of compromise (IoCs).', icon: <FaBrain className="w-8 h-8 text-cyan-300" />, type: 'Open Source' },
        { id: 'splunk-es', name: 'Splunk ES', category: 'SIEM & Analytics', description: 'A market-leading SIEM for real-time threat monitoring, advanced analytics, and rapid investigation.', icon: <FaChartBar className="w-8 h-8 text-cyan-300" />, type: 'Enterprise' },
    ],
    "Offensive & Red Team Operations": [
        { id: 'metasploit', name: 'Metasploit', category: 'Penetration Testing', description: 'The world’s most used penetration testing framework for developing and executing exploit code.', icon: <FaCrosshairs className="w-8 h-8 text-red-400" />, type: 'Open Source' },
        { id: 'burp-suite-pro', name: 'Burp Suite Pro', category: 'Web Application Testing', description: 'The premier toolkit for web security testers, enabling comprehensive manual and automated testing.', icon: <FaNetworkWired className="w-8 h-8 text-orange-400" />, type: 'Commercial' },
        { id: 'bloodhound', name: 'BloodHound', category: 'Active Directory Security', description: 'Visualize and analyze Active Directory attack paths using graph theory. An essential for red teams.', icon: <FaCodeBranch className="w-8 h-8 text-red-400" />, type: 'Open Source' },
    ],
    "Defense & Incident Response": [
        { id: 'crowdstrike', name: 'CrowdStrike', category: 'Endpoint Detection & Response (EDR)', description: 'A cloud-native platform that unifies next-gen antivirus, EDR, and a 24/7 managed hunting service.', icon: <FaShieldAlt className="w-8 h-8 text-green-300" />, type: 'Enterprise' },
        { id: 'the-hive-project', name: 'TheHive Project', category: 'Security Incident Response (SIRP)', description: 'A scalable, open-source solution to manage, investigate and act upon security incidents.', icon: <FaLayerGroup className="w-8 h-8 text-green-300" />, type: 'Open Source' },
    ],
    "Cloud & DevSecOps": [
       { id: 'wiz', name: 'Wiz', category: 'Cloud Native Application Protection', description: 'A comprehensive cloud security platform that provides full visibility and context into cloud risks.', icon: <FaCloud className="w-8 h-8 text-sky-300" />, type: 'Enterprise' },
       { id: 'trivy', name: 'Trivy', category: 'Vulnerability Scanning', description: 'A simple and comprehensive open-source scanner for vulnerabilities in container images, filesystems, and Git repos.', icon: <FaCode className="w-8 h-8 text-sky-300" />, type: 'Open Source' },
       { id: 'falco', name: 'Falco', category: 'Cloud Threat Detection', description: 'The open-source standard for cloud-native runtime security, detecting unexpected application behavior.', icon: <FaBolt className="w-8 h-8 text-yellow-300" />, type: 'Open Source' },
    ],
};

