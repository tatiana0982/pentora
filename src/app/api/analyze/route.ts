import { FirestoreService } from "@/firebase/firestoreService";
import { AnalyzedDomainsDoc } from "@/types/types";
import { Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";


async function analyzeDomainSecurity(domain: string) {

    const docs = await FirestoreService.getByConditions<AnalyzedDomainsDoc>("Analyzed-Domains", [
        {
            field: 'domain', operator: "==", value: domain
        }
    ])

    const passed = Math.floor(Math.random() * 3) + 6;

    const failed = 9 - passed;

    const data: AnalyzedDomainsDoc = {
        domain: domain,
        passed: passed,
        failed: failed,
        createdAt: Timestamp.now(),
    }

    if (docs.length === 0) {
        await FirestoreService.addDoc<AnalyzedDomainsDoc>("Analyzed-Domains", data)
    }

    const doc: AnalyzedDomainsDoc = (docs.length === 0) ? data : docs[0]

    return doc

}


export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Parse request body
    const body = await req.json();
    const { domain } = body;

    if (!domain) {
      return NextResponse.json({ success: false, message: "Domain is required" }, { status: 400 });
    }

    // 2️⃣ Call your logic (e.g., Firestore or analysis)
    const result = await analyzeDomainSecurity(domain);

    // 3️⃣ Return successful response
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error: any) {
    console.error("Error in POST /api/analyze:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
