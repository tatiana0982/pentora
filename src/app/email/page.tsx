"use client";

import { EmailTemplate } from "../components/EmailTemplate";



export default function Page() {
  return (
    <EmailTemplate
      companyLogo="/pentora-logo.png"
      recipientName="Saurojit"
      criticalCount={3}
      highCount={5}
      mediumLowCount={8}
      domain="domain.com"
      assetDomain="api.trypentora.com"
      assetIp="192.168.1.24"
      recipientEmail="user@example.com"
    />
  );
}
