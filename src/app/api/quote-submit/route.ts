import { FirestoreService } from "@/firebase/firestoreService";
import { dump } from "@/helper/helper";
import { QuoteRequestDoc } from "@/types/types";
import { Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data: Omit<QuoteRequestDoc, 'createadAt'> = await req.json();

    await FirestoreService.addDoc<QuoteRequestDoc>("Quotes", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      employees: data.employees,
      message: data.message,
      services: data.services,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({
      success: true,
      message: "Quote submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting quote:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit quote",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
