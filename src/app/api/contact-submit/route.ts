import { FirestoreService } from "@/firebase/firestoreService";
import { dump } from "@/helper/helper";
import { ContactRequest } from "@/types/types";
import { Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data: Omit<ContactRequest, 'createadAt'> = await req.json();

    dump(data)

    await FirestoreService.addDoc<ContactRequest>("Contacts", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      company: data.company,
      message: data.message,
      createadAt: Timestamp.now(),
    });

    return NextResponse.json({
      success: true,
      message: "Contact submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting Contact:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit Contact",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
