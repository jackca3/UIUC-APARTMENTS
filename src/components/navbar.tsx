"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home, Menu, User } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const { user, loading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Write Review", href: user ? "/apartments" : "/auth/login?redirect=/apartments" },
        { name: "Apartments", href: "/apartments" },
    ];

    return (
        <nav className="border-b bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-uiuc-navy p-1.5 rounded-md group-hover:bg-uiuc-orange transition-colors">
                        <Home className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-black text-2xl text-uiuc-navy tracking-tighter">
                        Apt<span className="text-uiuc-orange">.ly</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-black uppercase tracking-widest transition-colors ${
                                    link.name === "Write Review" 
                                    ? "text-uiuc-orange hover:text-uiuc-navy" 
                                    : "text-uiuc-navy/70 hover:text-uiuc-orange"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="h-6 w-px bg-gray-100 mx-2" />

                    <div className="flex items-center gap-4">
                        {!loading && (
                            user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none">
                                        <div className="h-6 w-6 rounded-full bg-uiuc-navy flex items-center justify-center">
                                            <User className="h-3.5 w-3.5 text-white" />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-tighter text-uiuc-navy">Profile</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 rounded-xl border-none shadow-premium mt-2" align="end">
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel className="font-normal p-4">
                                                <div className="flex flex-col space-y-1">
                                                    <p className="text-sm font-black uppercase tracking-tight">Account</p>
                                                    <p className="text-xs font-medium text-gray-500">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </DropdownMenuLabel>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator className="bg-gray-50" />
                                        <DropdownMenuItem className="p-0 border-none cursor-pointer">
                                            <Link href="/profile" className="flex w-full font-bold p-3">
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-gray-50" />
                                        <DropdownMenuItem className="p-3 text-red-600 font-bold cursor-pointer">
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex gap-3">
                                    <Button variant="ghost" asChild className="h-9 font-black uppercase text-xs tracking-widest text-uiuc-navy">
                                        <Link href="/auth/login">Log in</Link>
                                    </Button>
                                    <Button asChild className="bg-uiuc-navy hover:bg-black text-white h-9 px-6 font-black uppercase text-xs tracking-widest rounded-full shadow-lg transition-transform hover:scale-105">
                                        <Link href="/auth/signup">Sign up</Link>
                                    </Button>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden border-t p-4 bg-white/95 backdrop-blur absolute w-full shadow-lg">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`text-sm font-black uppercase tracking-widest ${
                                    link.name === "Write Review" ? "text-uiuc-orange" : "text-uiuc-navy"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="border-t pt-4">
                            {!loading && (
                                user ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            <span className="text-sm font-medium">{user.email}</span>
                                        </div>
                                        <Link
                                            href="/profile"
                                            onClick={() => setIsOpen(false)}
                                            className="block text-sm font-bold uppercase tracking-widest text-uiuc-navy"
                                        >
                                            Profile
                                        </Link>
                                        <button className="text-sm text-red-600 block w-full text-left font-bold uppercase tracking-widest">
                                            Log out
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <Button variant="outline" asChild className="w-full justify-start font-black uppercase tracking-widest text-xs">
                                            <Link href="/auth/login" onClick={() => setIsOpen(false)}>Log in</Link>
                                        </Button>
                                        <Button asChild className="bg-uiuc-navy hover:bg-black text-white w-full justify-start font-black uppercase tracking-widest text-xs">
                                            <Link href="/auth/signup" onClick={() => setIsOpen(false)}>Sign up</Link>
                                        </Button>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
