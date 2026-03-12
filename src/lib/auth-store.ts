// Client-side auth store using localStorage
// Passwords are hashed with SHA-256 (Web Crypto API)
// No backend required — verification codes are displayed in UI

const USERS_KEY = 'aptly_users';
const SESSION_KEY = 'aptly_session';
const CODES_KEY = 'aptly_codes';

export interface StoredUser {
    id: string;
    email: string;
    username: string;
    passwordHash: string;
    isVerified: boolean;
    createdAt: string;
}

export interface AuthSession {
    userId: string;
    email: string;
    username: string;
    persistent: boolean;
}

interface VerificationEntry {
    email: string;
    code: string;
    expiresAt: number; // epoch ms
}

// ── Crypto helpers ────────────────────────────────────────────────
async function sha256(text: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function randomId(): string {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function randomCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// ── Storage helpers ───────────────────────────────────────────────
function getUsers(): StoredUser[] {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
    catch { return []; }
}

function saveUsers(users: StoredUser[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ── Public API ────────────────────────────────────────────────────

/** Checks if an @illinois.edu account already exists */
export function emailExists(email: string): boolean {
    return getUsers().some(u => u.email.toLowerCase() === email.toLowerCase());
}

export function usernameExists(username: string): boolean {
    return getUsers().some(u => u.username.toLowerCase() === username.toLowerCase());
}

// Code generation and verification are handled server-side in /api/send-verification
// and /api/verify-code — NOT client-side.

export async function signUp(
    email: string,
    username: string,
    password: string,
    persistent: boolean
): Promise<{ ok: boolean; error?: string; session?: AuthSession }> {
    if (!email.toLowerCase().endsWith('@illinois.edu'))
        return { ok: false, error: 'Email must end with @illinois.edu.' };
    if (emailExists(email))
        return { ok: false, error: 'An account with this email already exists.' };
    if (usernameExists(username))
        return { ok: false, error: 'That username is already taken.' };
    if (password.length < 8)
        return { ok: false, error: 'Password must be at least 8 characters.' };

    const passwordHash = await sha256(password);
    const user: StoredUser = {
        id: randomId(),
        email,
        username,
        passwordHash,
        isVerified: true,
        createdAt: new Date().toISOString(),
    };
    const users = getUsers();
    users.push(user);
    saveUsers(users);

    const session: AuthSession = { userId: user.id, email, username, persistent };
    saveSession(session);
    return { ok: true, session };
}

export async function signIn(
    identifier: string, // email or username
    password: string,
    persistent: boolean
): Promise<{ ok: boolean; error?: string; session?: AuthSession }> {
    const users = getUsers();
    const user = users.find(
        u => u.email.toLowerCase() === identifier.toLowerCase() ||
             u.username.toLowerCase() === identifier.toLowerCase()
    );
    if (!user) return { ok: false, error: 'No account found with that email or username.' };

    const passwordHash = await sha256(password);
    if (user.passwordHash !== passwordHash)
        return { ok: false, error: 'Incorrect password.' };

    const session: AuthSession = { userId: user.id, email: user.email, username: user.username, persistent };
    saveSession(session);
    return { ok: true, session };
}

export function signOut(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
}

export function getSession(): AuthSession | null {
    if (typeof window === 'undefined') return null;
    try {
        const ls = localStorage.getItem(SESSION_KEY);
        if (ls) return JSON.parse(ls);
        const ss = sessionStorage.getItem(SESSION_KEY);
        if (ss) return JSON.parse(ss);
    } catch {}
    return null;
}

function saveSession(session: AuthSession): void {
    const str = JSON.stringify(session);
    if (session.persistent) {
        localStorage.setItem(SESSION_KEY, str);
    } else {
        sessionStorage.setItem(SESSION_KEY, str);
        // Remove any stale localStorage session
        localStorage.removeItem(SESSION_KEY);
    }
}

export function getUserById(id: string): StoredUser | null {
    return getUsers().find(u => u.id === id) ?? null;
}
