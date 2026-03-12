"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, GraduationCap } from "lucide-react";

export default function SignupPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.toLowerCase().endsWith("@illinois.edu")) {
            toast.error("You must use an @illinois.edu email.");
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);
        toast.success("Verification code sent to " + email);
        setStep(2);
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        setLoading(false);
        if (code !== "123456" && code.length !== 6) { // Simple mock validation
             toast.error("Invalid verification code.");
             return;
        }
        setStep(3);
    };

    const handleFinalize = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);
        toast.success("Account created successfully!");
        router.push("/");
    };

    return (
        <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[70vh]">
            <Card className="w-full max-w-lg shadow-premium border-none rounded-3xl overflow-hidden bg-white">
                <CardHeader className="text-center pb-8 pt-10">
                    <div className="w-16 h-16 bg-uiuc-navy rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-black text-uiuc-navy tracking-tighter uppercase leading-none">
                        Join <span className="text-uiuc-orange">Apt.ly</span>
                    </CardTitle>
                    <CardDescription className="font-bold uppercase tracking-widest text-[10px] text-gray-400 mt-2">
                        {step === 1 && "Start with your university email"}
                        {step === 2 && "Enter verification code"}
                        {step === 3 && "Complete your profile"}
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-8 pb-10">
                    {step === 1 && (
                        <form onSubmit={handleSendCode} className="space-y-6">
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex gap-4">
                                <Mail className="h-6 w-6 shrink-0 text-uiuc-orange" />
                                <p className="text-sm font-medium text-gray-600 leading-relaxed">
                                    Apt.ly is for <strong className="text-uiuc-navy">verified UIUC students</strong>. Please use your academic email.
                                </p>
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="email" className="font-black uppercase tracking-widest text-[10px] text-uiuc-navy/60">University Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="netid@illinois.edu"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white text-lg font-bold"
                                />
                            </div>
                            <Button type="submit" disabled={loading} className="w-full bg-uiuc-navy hover:bg-black text-white h-14 rounded-2xl text-lg font-black uppercase tracking-widest shadow-lg transition-transform hover:scale-[1.02]">
                                {loading ? "Sending..." : "Send Verification Code"}
                            </Button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleVerifyCode} className="space-y-6">
                            <p className="text-center text-sm font-bold text-gray-500">We sent a 6-digit code to <br/><span className="text-uiuc-navy">{email}</span></p>
                            <div className="space-y-3">
                                <Label htmlFor="code" className="font-black uppercase tracking-widest text-[10px] text-uiuc-navy/60">Verification Code</Label>
                                <Input
                                    id="code"
                                    placeholder="000000"
                                    required
                                    maxLength={6}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white text-2xl font-black tracking-[1em] text-center pl-7"
                                />
                            </div>
                            <Button type="submit" disabled={loading} className="w-full bg-uiuc-navy hover:bg-black text-white h-14 rounded-2xl text-lg font-black uppercase tracking-widest shadow-lg transition-transform hover:scale-[1.02]">
                                {loading ? "Verifying..." : "Verify Code"}
                            </Button>
                            <button type="button" onClick={() => setStep(1)} className="w-full text-xs font-black uppercase tracking-widest text-uiuc-orange hover:underline text-center">Change Email</button>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleFinalize} className="space-y-6">
                            <div className="space-y-5">
                                <div className="space-y-3">
                                    <Label htmlFor="username" className="font-black uppercase tracking-widest text-[10px] text-uiuc-navy/60">Choose Username</Label>
                                    <Input
                                        id="username"
                                        placeholder="e.g. illini_renter"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white text-lg font-bold"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="password" className="font-black uppercase tracking-widest text-[10px] text-uiuc-navy/60">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white text-lg font-bold"
                                    />
                                </div>
                            </div>
                            <Button type="submit" disabled={loading} className="w-full bg-uiuc-orange hover:bg-uiuc-orange/90 text-white h-14 rounded-2xl text-lg font-black uppercase tracking-widest shadow-lg transition-transform hover:scale-[1.02]">
                                {loading ? "Creating Account..." : "Create Account"}
                            </Button>
                        </form>
                    )}
                </CardContent>

                <CardFooter className="bg-gray-50/50 px-8 py-6 border-t border-gray-50 justify-center">
                    <div className="text-[10px] uppercase font-black tracking-widest text-center text-gray-400">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-uiuc-navy hover:text-uiuc-orange transition-colors">
                            Log in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
