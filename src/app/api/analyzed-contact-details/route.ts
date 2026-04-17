export const dynamic = 'force-dynamic';

import { AnalyzedContactsDoc, AnalyzedDomainsDoc } from "@/types/types";
import { Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EmailTemplate } from "../../components/EmailTemplate";
import { render } from "@react-email/components";
import dns from "node:dns/promises";

export async function POST(req: NextRequest) {
  try {
    const { FirestoreService } = await import("@/firebase/firestoreService");

    const body = await req.json();
    const { domain, name, email, company, contact } = body;

    if (!domain || !name || !email || !company || !contact) {
      return NextResponse.json(
        { success: false, message: "Domain , name , email , company and contact details are required" },
        { status: 400 }
      );
    }

    const docs = await FirestoreService.getByConditions<AnalyzedDomainsDoc>("Analyzed-Domains", [
      { field: 'domain', operator: "==", value: domain }
    ]);

    if (docs.length === 0) {
      return NextResponse.json(
        { success: false, message: "Domain has not been scanned" },
        { status: 400 }
      );
    }

    const analyzedDomain = docs[0];

    await FirestoreService.addDoc<AnalyzedContactsDoc>("Analyzed-Contacts", {
      domain,
      name,
      email,
      company,
      contact,
      createdAt: Timestamp.now()
    });

    const ipAddress = await dns.lookup(domain, 4);

    const html = await render(
      EmailTemplate({
        companyLogo: "https://www.trypentora.com/pentora-logo.png",
        recipientName: name,
        recipientEmail: email,
        domain,
        assetDomain: domain,
        assetIp: ipAddress.address,
        criticalCount: analyzedDomain.criticalCount,
        highCount: analyzedDomain.highCount,
        mediumLowCount: analyzedDomain.mediumCount,
      })
    );

    await sendMail(email, "Pentora", html);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error in POST /api/analyzed-contact-details:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

async function sendMail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Pentora" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}