"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useAuthModal } from "@/contexts/auth-modal-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Mail, GraduationCap, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { signUp, signIn } from "@/lib/auth-store";
import { cn } from "@/lib/utils";

type ModalTab = "signup" | "login";
type SignupStep = 1 | 2 | 3;

export function AuthModal() {
    const { isOpen, closeAuthModal, modalReason } = useAuthModal();
    const { refreshSession } = useAuth();

    const [tab, setTab] = useState<ModalTab>("signup");
    const [signupStep, setSignupStep] = useState<SignupStep>(1);

    // Signup state
    const [email, setEmail] = useState("");
    const [verificationToken, setVerificationToken] = useState<string | null>(null);
    const [enteredCode, setEnteredCode] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [stayLoggedIn, setStayLoggedIn] = useState(true);

    // Login state
    const [loginIdentifier, setLoginIdentifier] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [loginPersist, setLoginPersist] = useState(true);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const reset = () => {
        setTab("signup");
        setSignupStep(1);
        setEmail(""); setVerificationToken(null); setEnteredCode("");
        setUsername(""); setPassword(""); setError("");
        setLoginIdentifier(""); setLoginPassword("");
    };

    const handleClose = () => { reset(); closeAuthModal(); };

    // ── Signup handlers ──────────────────────────────────────────────

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!email.toLowerCase().endsWith("@illinois.edu")) {
            setError("Apt.ly reviews are limited to verified UIUC students. Please use your @illinois.edu email.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/send-verification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || "Failed to send code."); setLoading(false); return; }
            setVerificationToken(data.verificationToken ?? null);
            setLoading(false);
            setSignupStep(2);
        } catch {
            setError("Network error. Please try again.");
            setLoading(false);
        }
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!verificationToken) {
            setError("Verification session expired. Please request a new code.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code: enteredCode, verificationToken }),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || "Invalid code."); setLoading(false); return; }
            setLoading(false);
            setSignupStep(3);
        } catch {
            setError("Network error. Please try again.");
            setLoading(false);
        }
    };

    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const result = await signUp(email, username, password, stayLoggedIn);
        setLoading(false);
        if (!result.ok) { setError(result.error || "Signup failed."); return; }
        refreshSession();
        handleClose();
    };

    // ── Login handler ────────────────────────────────────────────────

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const result = await signIn(loginIdentifier, loginPassword, loginPersist);
        setLoading(false);
        if (!result.ok) { setError(result.error || "Login failed."); return; }
        refreshSession();
        handleClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={handleClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden z-10"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-uiuc-navy px-8 pt-8 pb-6 relative">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-uiuc-orange p-2 rounded-xl">
                            <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-black text-2xl text-white tracking-tighter">
                            Apt<span className="text-uiuc-orange">.ly</span>
                        </span>
                    </div>
                    {modalReason && (
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">
                            {modalReason}
                        </p>
                    )}
                    {/* Tabs */}
                    <div className="flex bg-white/10 rounded-2xl p-1">
                        <button
                            onClick={() => { setTab("signup"); setError(""); }}
                            className={cn(
                                "flex-1 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all",
                                tab === "signup" ? "bg-white text-uiuc-navy" : "text-white/60 hover:text-white"
                            )}
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => { setTab("login"); setError(""); }}
                            className={cn(
                                "flex-1 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all",
                                tab === "login" ? "bg-white text-uiuc-navy" : "text-white/60 hover:text-white"
                            )}
                        >
                            Log In
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="px-8 py-6 space-y-5">
                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl px-4 py-3 text-sm font-bold">
                            {error}
                        </div>
                    )}

                    {/* ── SIGNUP ─────────────────────────────── */}
                    {tab === "signup" && (
                        <>
                            {/* Step indicators */}
                            <div className="flex gap-2">
                                {([1, 2, 3] as SignupStep[]).map(s => (
                                    <div
                                        key={s}
                                        className={cn(
                                            "h-1.5 flex-1 rounded-full transition-all duration-500",
                                            signupStep >= s ? "bg-uiuc-orange" : "bg-gray-100"
                                        )}
                                    />
                                ))}
                            </div>

                            {/* Step 1 — Email */}
                            {signupStep === 1 && (
                                <form onSubmit={handleSendCode} className="space-y-4">
                                    <div>
                                        <p className="font-black text-uiuc-navy text-sm uppercase tracking-widest mb-1">Step 1 — Verify Your Email</p>
                                        <p className="text-xs text-gray-500 font-medium">Only @illinois.edu addresses are accepted.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold text-xs uppercase tracking-widest text-gray-500">University Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                type="email"
                                                required
                                                placeholder="netid@illinois.edu"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="h-12 pl-10 rounded-2xl bg-gray-50 border-gray-100"
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" disabled={loading} className="w-full h-12 bg-uiuc-navy hover:bg-uiuc-navy/90 text-white rounded-2xl font-black uppercase tracking-widest">
                                        {loading ? "Sending…" : "Send Verification Code →"}
                                    </Button>
                                </form>
                            )}

                            {/* Step 2 — Code */}
                            {signupStep === 2 && (
                                <form onSubmit={handleVerifyCode} className="space-y-4">
                                    <div>
                                        <p className="font-black text-uiuc-navy text-sm uppercase tracking-widest mb-1">Step 2 — Enter Your Code</p>
                                        <p className="text-xs text-gray-500 font-medium">Sent to: <span className="font-bold text-uiuc-navy">{email}</span></p>
                                    </div>

                                    {/* Email sent confirmation */}
                                    <div className="bg-uiuc-navy/5 border border-uiuc-navy/10 rounded-2xl p-4 text-center space-y-1">
                                        <Mail className="h-6 w-6 text-uiuc-orange mx-auto" />
                                        <p className="text-sm font-black text-uiuc-navy">Check your inbox</p>
                                        <p className="text-xs text-gray-500 font-medium">We sent a 6-digit code to <span className="font-bold text-uiuc-navy">{email}</span></p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Expires in 10 minutes</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="font-bold text-xs uppercase tracking-widest text-gray-500">6-Digit Code</Label>
                                        <Input
                                            required
                                            placeholder="000000"
                                            maxLength={6}
                                            value={enteredCode}
                                            onChange={e => setEnteredCode(e.target.value.replace(/\D/g, ''))}
                                            className="h-12 rounded-2xl bg-gray-50 border-gray-100 text-2xl font-black tracking-[0.5em] text-center"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-12 bg-uiuc-navy hover:bg-uiuc-navy/90 text-white rounded-2xl font-black uppercase tracking-widest">
                                        Verify Code →
                                    </Button>
                                    <button type="button" onClick={() => { setSignupStep(1); setVerificationToken(null); setError(""); }}
                                        className="w-full text-xs font-black text-gray-400 hover:text-uiuc-orange uppercase tracking-widest transition-colors">
                                        ← Change Email
                                    </button>
                                </form>
                            )}

                            {/* Step 3 — Account Details */}
                            {signupStep === 3 && (
                                <form onSubmit={handleCreateAccount} className="space-y-4">
                                    <div>
                                        <p className="font-black text-uiuc-navy text-sm uppercase tracking-widest mb-1">Step 3 — Create Your Account</p>
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="h-4 w-4 text-uiuc-orange" />
                                            <p className="text-xs text-gray-500 font-medium">{email} verified ✓</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold text-xs uppercase tracking-widest text-gray-500">Username</Label>
                                        <Input
                                            required
                                            placeholder="e.g. illini_renter"
                                            value={username}
                                            onChange={e => setUsername(e.target.value.replace(/\s/g, '').toLowerCase())}
                                            className="h-12 rounded-2xl bg-gray-50 border-gray-100"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold text-xs uppercase tracking-widest text-gray-500">Password</Label>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                minLength={8}
                                                placeholder="Min. 8 characters"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                className="h-12 pr-10 rounded-2xl bg-gray-50 border-gray-100"
                                            />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <label className="flex items-center gap-3 cursor-pointer select-none">
                                        <input type="checkbox" checked={stayLoggedIn} onChange={e => setStayLoggedIn(e.target.checked)}
                                            className="h-4 w-4 accent-uiuc-orange rounded" />
                                        <span className="text-sm font-bold text-gray-600">Stay logged in</span>
                                    </label>
                                    <Button type="submit" disabled={loading} className="w-full h-12 bg-uiuc-orange hover:bg-uiuc-orange/90 text-white rounded-2xl font-black uppercase tracking-widest">
                                        {loading ? "Creating Account…" : "Create Account & Join →"}
                                    </Button>
                                </form>
                            )}
                        </>
                    )}

                    {/* ── LOGIN ──────────────────────────────── */}
                    {tab === "login" && (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label className="font-bold text-xs uppercase tracking-widest text-gray-500">Email or Username</Label>
                                <Input
                                    required
                                    placeholder="netid@illinois.edu or username"
                                    value={loginIdentifier}
                                    onChange={e => setLoginIdentifier(e.target.value)}
                                    className="h-12 rounded-2xl bg-gray-50 border-gray-100"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold text-xs uppercase tracking-widest text-gray-500">Password</Label>
                                <div className="relative">
                                    <Input
                                        type={showLoginPassword ? "text" : "password"}
                                        required
                                        value={loginPassword}
                                        onChange={e => setLoginPassword(e.target.value)}
                                        className="h-12 pr-10 rounded-2xl bg-gray-50 border-gray-100"
                                    />
                                    <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                <input type="checkbox" checked={loginPersist} onChange={e => setLoginPersist(e.target.checked)}
                                    className="h-4 w-4 accent-uiuc-orange rounded" />
                                <span className="text-sm font-bold text-gray-600">Stay logged in</span>
                            </label>
                            <Button type="submit" disabled={loading} className="w-full h-12 bg-uiuc-navy hover:bg-uiuc-navy/90 text-white rounded-2xl font-black uppercase tracking-widest">
                                {loading ? "Logging in…" : "Log In →"}
                            </Button>
                        </form>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 pb-6">
                    <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-300">
                        Apt.ly is exclusively for verified UIUC students
                    </p>
                </div>
            </div>
        </div>
    );
}
