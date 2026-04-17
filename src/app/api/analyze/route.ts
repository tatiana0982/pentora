export const dynamic = 'force-dynamic';

import { AnalyzedDomainsDoc } from "@/types/types";
import { Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function analyzeDomainSecurity(domain: string) {
  const { FirestoreService } = await import("@/firebase/firestoreService");

  const docs = await FirestoreService.getByConditions<AnalyzedDomainsDoc>("Analyzed-Domains", [
    {
      field: 'domain', operator: "==", value: domain
    }
  ]);

  const passed = Math.floor(Math.random() * 3) + 6;
  const failed = 9 - passed;

  const criticalCount = getRandomInt(0, 4);
  const highCount = getRandomInt(3, 8);
  const mediumLowCount = getRandomInt(5, 10);

  const data: AnalyzedDomainsDoc = {
    domain: domain,
    passed: passed,
    failed: failed,
    criticalCount: criticalCount,
    highCount: highCount,
    mediumCount: mediumLowCount,
    createdAt: Timestamp.now(),
  };

  if (docs.length === 0) {
    await FirestoreService.addDoc<AnalyzedDomainsDoc>("Analyzed-Domains", data);
  }

  const doc: AnalyzedDomainsDoc = (docs.length === 0) ? data : docs[0];

  return doc;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { domain } = body;

    if (!domain) {
      return NextResponse.json(
        { success: false, message: "Domain is required" },
        { status: 400 }
      );
    }

    const result = await analyzeDomainSecurity(domain);

    return NextResponse.json(
      { success: true, data: result },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in POST /api/analyze:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}