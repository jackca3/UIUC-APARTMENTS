import { NextRequest, NextResponse } from "next/server";
import { verifyCodeToken } from "@/lib/server/email-verification";
import { createXServerSession } from "@/lib/server/x-session";

export async function POST(req: NextRequest) {
  try {
    const { email, code, verificationToken } = await req.json();

    if (!email || !code || !verificationToken) {
      return NextResponse.json(
        { error: "Email, code, and verification token are required." },
        { status: 400 }
      );
    }

    const isValid = verifyCodeToken(verificationToken, email, code);
    if (!isValid) {
      return NextResponse.json(
        { error: "The verification code is invalid or expired." },
        { status: 400 }
      );
    }

    await createXServerSession(email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Apt.ly] X session verify error:", error);
    return NextResponse.json(
      { error: "Failed to verify code. Please try again." },
      { status: 500 }
    );
  }
}
