import { NextRequest, NextResponse } from 'next/server';
import { codeStore } from '../send-verification/route';

export async function POST(req: NextRequest) {
    try {
        const { email, code } = await req.json();

        if (!email || !code) {
            return NextResponse.json({ error: 'Email and code are required.' }, { status: 400 });
        }

        const entry = codeStore.get(email.toLowerCase());

        if (!entry) {
            return NextResponse.json({ error: 'No verification code found for this email. Please request a new one.' }, { status: 400 });
        }

        if (Date.now() > entry.expiresAt) {
            codeStore.delete(email.toLowerCase());
            return NextResponse.json({ error: 'Code expired. Please request a new one.' }, { status: 400 });
        }

        if (entry.code !== code.trim()) {
            return NextResponse.json({ error: 'Incorrect code. Please try again.' }, { status: 400 });
        }

        // Consume the code
        codeStore.delete(email.toLowerCase());
        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
