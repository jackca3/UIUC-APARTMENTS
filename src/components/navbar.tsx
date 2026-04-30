"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useAuthModal } from "@/contexts/auth-modal-context";
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
import { Home, Menu, User, ShieldCheck, LogOut } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { user, loading, signOut } = useAuth();
    const { openAuthModal } = useAuthModal();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSignOut = () => {
        signOut();
        setIsOpen(false);
        router.push("/");
    };

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
                        <Link
                            href="/apartments"
                            className="text-sm font-black uppercase tracking-widest text-uiuc-navy/70 hover:text-uiuc-orange transition-colors"
                        >
                            Apartments
                        </Link>
                        <Link
                            href="/reviews"
                            className="text-sm font-black uppercase tracking-widest text-uiuc-navy/70 hover:text-uiuc-orange transition-colors"
                        >
                            Reviews
                        </Link>
                        <Link
                            href="/content-calendar"
                            className="text-sm font-black uppercase tracking-widest text-uiuc-navy/70 hover:text-uiuc-orange transition-colors"
                        >
                            Content
                        </Link>
                    </div>

                    <div className="h-6 w-px bg-gray-100 mx-2" />

                    <div className="flex items-center gap-4">
                        {!loading && (
                            user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none">
                                        <div className="h-6 w-6 rounded-full bg-uiuc-navy flex items-center justify-center">
                                            <span className="text-white text-xs font-black">
                                                {user.username.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-tighter text-uiuc-navy">
                                            @{user.username}
                                        </span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 rounded-xl border-none shadow-premium mt-2" align="end">
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel className="font-normal p-4">
                                                <div className="flex flex-col space-y-1">
                                                    <p className="text-sm font-black uppercase tracking-tight">@{user.username}</p>
                                                    <p className="text-xs font-medium text-gray-500">{user.email}</p>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <ShieldCheck className="h-3 w-3 text-uiuc-orange" />
                                                        <span className="text-[10px] font-black text-uiuc-orange uppercase tracking-wider">Verified Illini</span>
                                                    </div>
                                                </div>
                                            </DropdownMenuLabel>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator className="bg-gray-50" />
                                        <DropdownMenuItem className="p-0 border-none cursor-pointer">
                                            <Link href="/profile" className="flex w-full font-bold p-3 gap-2 items-center">
                                                <User className="h-4 w-4 text-gray-400" /> Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-gray-50" />
                                        <DropdownMenuItem
                                            onClick={handleSignOut}
                                            className="p-3 text-red-500 font-bold cursor-pointer gap-2"
                                        >
                                            <LogOut className="h-4 w-4" /> Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex gap-3">
                                    <Button
                                        variant="ghost"
                                        onClick={() => openAuthModal()}
                                        className="h-9 font-black uppercase text-xs tracking-widest text-uiuc-navy"
                                    >
                                        Log in
                                    </Button>
                                    <Button
                                        onClick={() => openAuthModal()}
                                        className="bg-uiuc-navy hover:bg-black text-white h-9 px-6 font-black uppercase text-xs tracking-widest rounded-full shadow-lg transition-transform hover:scale-105"
                                    >
                                        Sign up
                                    </Button>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden"
                        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div id="mobile-navigation" className="md:hidden border-t p-4 bg-white/95 backdrop-blur absolute w-full shadow-lg z-50">
                    <div className="flex flex-col space-y-4">
                        <Link
                            href="/apartments"
                            onClick={() => setIsOpen(false)}
                            className="text-sm font-black uppercase tracking-widest text-uiuc-navy"
                        >
                            Apartments
                        </Link>
                        <Link
                            href="/reviews"
                            onClick={() => setIsOpen(false)}
                            className="text-sm font-black uppercase tracking-widest text-uiuc-navy"
                        >
                            Reviews
                        </Link>
                        <Link
                            href="/content-calendar"
                            onClick={() => setIsOpen(false)}
                            className="text-sm font-black uppercase tracking-widest text-uiuc-navy"
                        >
                            Content
                        </Link>
                        <div className="border-t pt-4">
                            {!loading && (
                                user ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-uiuc-navy flex items-center justify-center">
                                                <span className="text-white text-sm font-black">
                                                    {user.username.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-uiuc-navy">@{user.username}</p>
                                                <p className="text-xs text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/profile"
                                            onClick={() => setIsOpen(false)}
                                            className="block text-sm font-bold uppercase tracking-widest text-uiuc-navy"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="text-sm text-red-500 block w-full text-left font-bold uppercase tracking-widest"
                                        >
                                            Log out
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => { setIsOpen(false); openAuthModal(); }}
                                            className="w-full justify-start font-black uppercase tracking-widest text-xs"
                                        >
                                            Log in
                                        </Button>
                                        <Button
                                            onClick={() => { setIsOpen(false); openAuthModal(); }}
                                            className="bg-uiuc-navy hover:bg-black text-white w-full justify-start font-black uppercase tracking-widest text-xs"
                                        >
                                            Sign up
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
