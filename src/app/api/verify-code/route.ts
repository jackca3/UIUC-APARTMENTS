import { NextRequest, NextResponse } from 'next/server';
import { decodeVerificationToken } from '../send-verification/route';

export async function POST(req: NextRequest) {
    try {
        const { email, code, verificationToken } = await req.json();

        if (!email || !code || !verificationToken) {
            return NextResponse.json({ error: 'Email, code, and verification token are required.' }, { status: 400 });
        }

        const entry = decodeVerificationToken(verificationToken);
        if (!entry || entry.email !== email.toLowerCase()) {
            return NextResponse.json({ error: 'Verification session is invalid. Please request a new code.' }, { status: 400 });
        }

        if (Date.now() > entry.expiresAt) {
            return NextResponse.json({ error: 'Code expired. Please request a new one.' }, { status: 400 });
        }

        if (entry.code !== code.trim()) {
            return NextResponse.json({ error: 'Incorrect code. Please try again.' }, { status: 400 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
