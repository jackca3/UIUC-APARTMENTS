"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, ShieldCheck, User } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate auth action
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);

        if (email.endsWith("@illinois.edu")) {
            toast.success("Successfully logged in!");
            router.push("/dashboard");
        } else {
            toast.error("Please use a valid @illinois.edu email address.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[70vh]">
            <Card className="w-full max-w-md shadow-lg border-t-4 border-t-uiuc-orange overflow-hidden">
                <CardHeader className="text-center pb-8 pt-10">
                    <div className="w-16 h-16 bg-uiuc-navy rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <User className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-black text-uiuc-navy tracking-tighter uppercase leading-none">
                        Welcome to <span className="text-uiuc-orange">Apt.ly</span>
                    </CardTitle>
                    <CardDescription className="font-bold uppercase tracking-widest text-[10px] text-gray-400 mt-2">
                        Sign in to your student account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2 relative">
                            <Label htmlFor="email">University Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="netid@illinois.edu"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="text-xs text-uiuc-orange hover:underline">Forgot password?</Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-4 border-t bg-gray-50/50 mt-4">
                        <Button type="submit" disabled={loading} className="w-full bg-uiuc-navy hover:bg-uiuc-navy/90 text-white">
                            {loading ? "Logging in..." : "Log In"}
                        </Button>
                        <div className="text-sm text-center text-gray-500">
                            Don't have an account?{" "}
                            <Link href="/auth/signup" className="text-uiuc-orange hover:underline font-semibold">
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
