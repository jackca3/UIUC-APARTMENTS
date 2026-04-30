import { createHmac, randomBytes } from "crypto";
import { cookies } from "next/headers";

const X_SESSION_COOKIE = "aptly_x_session";
const X_OAUTH_COOKIE = "aptly_x_oauth";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const OAUTH_TTL_MS = 10 * 60 * 1000;

type SignedPayload = Record<string, string | number | boolean | null>;

function getSessionSecret(): string {
  const secret =
    process.env.X_SESSION_SECRET ||
    process.env.EMAIL_VERIFICATION_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    process.env.SMTP_PASS;

  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") return "dev-only-x-session-secret";

  throw new Error("Missing X_SESSION_SECRET for secure X integration.");
}

function signPayload(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

function encodeSignedPayload(data: SignedPayload): string {
  const payload = JSON.stringify(data);
  const signature = signPayload(payload);
  return Buffer.from(`${payload}.${signature}`, "utf8").toString("base64url");
}

function decodeSignedPayload(token: string): SignedPayload | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const separatorIndex = decoded.lastIndexOf(".");
    if (separatorIndex === -1) return null;

    const payload = decoded.slice(0, separatorIndex);
    const signature = decoded.slice(separatorIndex + 1);
    const expectedSignature = signPayload(payload);

    if (signature !== expectedSignature) return null;
    return JSON.parse(payload) as SignedPayload;
  } catch {
    return null;
  }
}

export async function createXServerSession(email: string) {
  const cookieStore = await cookies();
  const expiresAt = Date.now() + SESSION_TTL_MS;

  cookieStore.set(
    X_SESSION_COOKIE,
    encodeSignedPayload({ email: email.toLowerCase(), expiresAt }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(expiresAt),
    }
  );
}

export async function clearXServerSession() {
  const cookieStore = await cookies();
  cookieStore.delete(X_SESSION_COOKIE);
}

export async function getXServerSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(X_SESSION_COOKIE)?.value;
  if (!token) return null;

  const decoded = decodeSignedPayload(token);
  if (!decoded) return null;

  const email = typeof decoded.email === "string" ? decoded.email : null;
  const expiresAt = typeof decoded.expiresAt === "number" ? decoded.expiresAt : null;
  if (!email || !expiresAt || Date.now() > expiresAt) return null;

  return { email };
}

export async function createXOAuthSession(email: string, state: string, codeVerifier: string) {
  const cookieStore = await cookies();
  const expiresAt = Date.now() + OAUTH_TTL_MS;

  cookieStore.set(
    X_OAUTH_COOKIE,
    encodeSignedPayload({
      email: email.toLowerCase(),
      state,
      codeVerifier,
      expiresAt,
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(expiresAt),
    }
  );
}

export async function consumeXOAuthSession(expectedState: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get(X_OAUTH_COOKIE)?.value;
  cookieStore.delete(X_OAUTH_COOKIE);

  if (!token) return null;

  const decoded = decodeSignedPayload(token);
  if (!decoded) return null;

  const email = typeof decoded.email === "string" ? decoded.email : null;
  const state = typeof decoded.state === "string" ? decoded.state : null;
  const codeVerifier = typeof decoded.codeVerifier === "string" ? decoded.codeVerifier : null;
  const expiresAt = typeof decoded.expiresAt === "number" ? decoded.expiresAt : null;

  if (!email || !state || !codeVerifier || !expiresAt) return null;
  if (Date.now() > expiresAt) return null;
  if (state !== expectedState) return null;

  return { email, codeVerifier };
}

export function createRandomState(length = 24) {
  return randomBytes(length).toString("base64url");
}

export { X_SESSION_COOKIE };
