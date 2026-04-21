import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function randomCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function getVerificationSecret(): string {
    const secret =
        process.env.EMAIL_VERIFICATION_SECRET ||
        process.env.NEXTAUTH_SECRET ||
        process.env.SMTP_PASS;

    if (secret) return secret;
    if (process.env.NODE_ENV !== 'production') return 'dev-only-email-verification-secret';

    throw new Error('Missing EMAIL_VERIFICATION_SECRET for email verification.');
}

function signPayload(payload: string): string {
    return createHmac('sha256', getVerificationSecret()).update(payload).digest('hex');
}

function encodeVerificationToken(email: string, code: string, expiresAt: number): string {
    const payload = `${email.toLowerCase()}|${code}|${expiresAt}`;
    const signature = signPayload(payload);
    return Buffer.from(`${payload}|${signature}`, 'utf8').toString('base64url');
}

export function decodeVerificationToken(token: string): { email: string; code: string; expiresAt: number } | null {
    try {
        const decoded = Buffer.from(token, 'base64url').toString('utf8');
        const [email, code, expiresAtRaw, signature] = decoded.split('|');

        if (!email || !code || !expiresAtRaw || !signature) return null;

        const payload = `${email.toLowerCase()}|${code}|${expiresAtRaw}`;
        const expectedSignature = signPayload(payload);
        const provided = Buffer.from(signature, 'utf8');
        const expected = Buffer.from(expectedSignature, 'utf8');

        if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
            return null;
        }

        const expiresAt = Number(expiresAtRaw);
        if (!Number.isFinite(expiresAt)) return null;

        return { email: email.toLowerCase(), code, expiresAt };
    } catch {
        return null;
    }
}

// ---------- Nodemailer transporter ----------
function createTransporter() {
    // Requires these env vars — set them in .env.local
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) return null;

    return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });
}

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email || typeof email !== 'string') {
            return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
        }

        if (!email.toLowerCase().endsWith('@illinois.edu')) {
            return NextResponse.json(
                { error: 'Apt.ly reviews are limited to verified UIUC students.' },
                { status: 400 }
            );
        }

        const code = randomCode();
        const expiresAt = Date.now() + 10 * 60 * 1000;
        const verificationToken = encodeVerificationToken(email, code, expiresAt);

        const transporter = createTransporter();

        if (!transporter) {
            // SMTP not configured — log to console for local dev
            console.log(`\n[Apt.ly] Verification code for ${email}: ${code}\n`);
            return NextResponse.json({
                ok: true,
                dev: true,
                verificationToken,
                message: 'SMTP not configured. Check the server console for the code.',
            });
        }

        await transporter.sendMail({
            from: `"Apt.ly" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Your Apt.ly Verification Code',
            html: `
                <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
                    <h1 style="color:#13294B;font-size:28px;font-weight:900;letter-spacing:-1px;margin:0 0 8px">
                        Apt<span style="color:#E84A27">.ly</span>
                    </h1>
                    <p style="color:#666;font-size:13px;margin:0 0 32px;font-weight:700;text-transform:uppercase;letter-spacing:2px">
                        UIUC Apartment Reviews
                    </p>
                    <p style="color:#333;font-size:16px;font-weight:600;margin:0 0 24px">
                        Your verification code is:
                    </p>
                    <div style="background:#13294B;border-radius:16px;padding:24px;text-align:center;margin:0 0 24px">
                        <span style="color:#fff;font-size:40px;font-weight:900;letter-spacing:0.4em">${code}</span>
                    </div>
                    <p style="color:#999;font-size:13px;line-height:1.6;margin:0">
                        This code expires in <strong>10 minutes</strong>. If you did not request this, you can ignore this email.
                    </p>
                    <hr style="border:none;border-top:1px solid #eee;margin:32px 0">
                    <p style="color:#ccc;font-size:11px;text-align:center">
                        Apt.ly · For UIUC students, by UIUC students
                    </p>
                </div>
            `,
        });

        return NextResponse.json({ ok: true, verificationToken });
    } catch (err) {
        console.error('[Apt.ly] Email send error:', err);
        return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 });
    }
}
