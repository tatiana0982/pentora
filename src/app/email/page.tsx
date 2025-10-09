"use client";

import { EmailTemplate } from "../components/EmailTemplate";



export default function Page() {
  return (
    <EmailTemplate
      companyLogo="/pentora-logo.png"
      scanDate="9 Oct 2025"
      recipientName="Saurojit"
      scopeOrEnvironment="Production Server"
      criticalCount={3}
      highCount={5}
      mediumLowCount={8}
      asset1Name="api.trypentora.com"
      asset1Host="192.168.1.24"
      asset1Critical={2}
      asset1High={3}
      asset1Medium={1}
      recipientEmail="user@example.com"
    />
  );
}
