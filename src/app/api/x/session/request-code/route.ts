import { NextRequest, NextResponse } from "next/server";
import {
  createVerificationToken,
  sendVerificationCodeEmail,
} from "@/lib/server/email-verification";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    if (!email.toLowerCase().endsWith("@illinois.edu")) {
      return NextResponse.json(
        { error: "X integration is limited to verified UIUC student emails." },
        { status: 400 }
      );
    }

    const { token, code } = createVerificationToken(email);
    const mailResult = await sendVerificationCodeEmail(
      email,
      code,
      "Your Apt.ly X Studio Verification Code"
    );

    return NextResponse.json({
      ok: true,
      verificationToken: token,
      dev: mailResult.dev,
      message: mailResult.message ?? null,
    });
  } catch (error) {
    console.error("[Apt.ly] X session request-code error:", error);
    return NextResponse.json(
      { error: "Failed to send verification code. Please try again." },
      { status: 500 }
    );
  }
}
