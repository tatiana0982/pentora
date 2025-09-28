import React, { ReactNode } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// This layout provides the main structure, wrapping your dashboard with the site's Navbar and Footer.
export default function ThreatMonitoringLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-black text-foreground">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

