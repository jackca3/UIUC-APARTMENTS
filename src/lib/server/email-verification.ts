import { createHmac, timingSafeEqual } from "crypto";
import nodemailer from "nodemailer";

function randomCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getVerificationSecret(): string {
  const secret =
    process.env.EMAIL_VERIFICATION_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    process.env.SMTP_PASS;

  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") return "dev-only-email-verification-secret";

  throw new Error("Missing EMAIL_VERIFICATION_SECRET for email verification.");
}

function signPayload(payload: string): string {
  return createHmac("sha256", getVerificationSecret()).update(payload).digest("hex");
}

export function createVerificationToken(email: string) {
  const code = randomCode();
  const expiresAt = Date.now() + 10 * 60 * 1000;
  const payload = `${email.toLowerCase()}|${code}|${expiresAt}`;
  const signature = signPayload(payload);
  const token = Buffer.from(`${payload}|${signature}`, "utf8").toString("base64url");

  return { token, code, expiresAt };
}

export function verifyCodeToken(token: string, email: string, code: string) {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [tokenEmail, tokenCode, expiresAtRaw, signature] = decoded.split("|");
    if (!tokenEmail || !tokenCode || !expiresAtRaw || !signature) return false;

    const payload = `${tokenEmail.toLowerCase()}|${tokenCode}|${expiresAtRaw}`;
    const expectedSignature = signPayload(payload);
    const provided = Buffer.from(signature, "utf8");
    const expected = Buffer.from(expectedSignature, "utf8");

    if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
      return false;
    }

    const expiresAt = Number(expiresAtRaw);
    if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

    return tokenEmail.toLowerCase() === email.toLowerCase() && tokenCode === code.trim();
  } catch {
    return false;
  }
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
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

export async function sendVerificationCodeEmail(email: string, code: string, subject: string) {
  const transporter = createTransporter();

  if (!transporter) {
    console.log(`\n[Apt.ly] Verification code for ${email}: ${code}\n`);
    return {
      dev: true,
      message: "SMTP not configured. Check the server console for the code.",
    };
  }

  await transporter.sendMail({
    from: `"Apt.ly" <${process.env.SMTP_USER}>`,
    to: email,
    subject,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
        <h1 style="color:#13294B;font-size:28px;font-weight:900;letter-spacing:-1px;margin:0 0 8px">
          Apt<span style="color:#E84A27">.ly</span>
        </h1>
        <p style="color:#666;font-size:13px;margin:0 0 32px;font-weight:700;text-transform:uppercase;letter-spacing:2px">
          Secure Verification
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
      </div>
    `,
  });

  return { dev: false };
}
