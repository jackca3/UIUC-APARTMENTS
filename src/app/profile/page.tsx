"use client";

import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";
import { getFavorites } from "@/lib/api";
import { Apartment } from "@/lib/types";
import { ApartmentCard } from "@/components/apartment-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Mail, Star, Heart, Settings, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const [favorites, setFavorites] = useState<Apartment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFavorites() {
            if (user) {
                const favs = await getFavorites(user.id);
                setFavorites(favs);
            }
            setLoading(false);
        }
        loadFavorites();
    }, [user]);

    if (authLoading || loading) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uiuc-navy" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-uiuc-navy/30">Syncing with Apt.ly...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <h1 className="text-4xl font-black text-uiuc-navy mb-4">Please log in to view your profile</h1>
                <Button asChild className="bg-uiuc-navy">
                    <Link href="/auth/login">Log In</Link>
                </Button>
            </div>
        );
    }

    const username = user.user_metadata?.username || user.email?.split('@')[0] || "illini_user";

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Sidebar / Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-uiuc-navy p-10 rounded-[50px] shadow-premium text-white relative overflow-hidden group">
                            <div className="relative z-10 space-y-8 text-center pt-4">
                                <div className="h-24 w-24 rounded-[30px] bg-white text-uiuc-navy flex items-center justify-center mx-auto text-4xl font-black shadow-2xl transition-transform group-hover:rotate-6">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black tracking-tighter uppercase leading-none mb-1">@{username}</h2>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Verified student</p>
                                </div>
                                <div className="space-y-4 pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-3 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">
                                        <Mail className="h-4 w-4 text-uiuc-orange" />
                                        {user.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">
                                        <GraduationCap className="h-4 w-4 text-uiuc-orange" />
                                        University of Illinois
                                    </div>
                                </div>
                            </div>
                            <Star className="absolute -bottom-10 -left-10 h-48 w-48 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
                        </div>

                        <div className="space-y-4">
                            <ProfileMenuButton label="Account Settings" icon={<Settings className="h-4 w-4" />} />
                            <ProfileMenuButton label="My Reviews" icon={<Star className="h-4 w-4" />} />
                            <ProfileMenuButton label="Log Out" icon={<LogOut className="h-4 w-4" />} variant="danger" />
                        </div>
                    </div>

                    {/* Main Content: Favorites */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-8">
                            <div>
                                <h1 className="text-4xl font-black text-uiuc-navy tracking-tighter uppercase leading-none mb-2">My Favorites</h1>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Hand-picked student housing</p>
                            </div>
                            <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-uiuc-navy font-black text-xs border border-gray-100">
                                {favorites.length}
                            </div>
                        </div>

                        {favorites.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {favorites.map(apt => (
                                    <ApartmentCard key={apt.id} apartment={apt} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 bg-gray-50/50 rounded-[60px] border-4 border-dashed border-gray-200 text-center px-8">
                                <div className="bg-white w-20 h-20 rounded-[30px] flex items-center justify-center mx-auto mb-8 shadow-premium">
                                    <Heart className="h-8 w-8 text-gray-200" />
                                </div>
                                <h3 className="text-3xl font-black text-uiuc-navy mb-4 tracking-tighter uppercase">No favorites yet</h3>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-10 max-w-xs mx-auto leading-relaxed">
                                    Save apartments to your list to compare and track availability.
                                </p>
                                <Button asChild className="bg-uiuc-navy hover:bg-black text-white px-10 h-16 rounded-[25px] font-black uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95 text-xs">
                                    <Link href="/apartments">Explore Apartments</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProfileMenuButton({ label, icon, variant }: { label: string; icon: React.ReactNode; variant?: "danger" }) {
    return (
        <button className={`w-full flex items-center justify-between p-6 rounded-[30px] border transition-all hover:scale-[1.02] active:scale-98 group ${variant === 'danger' ? 'bg-red-50/10 border-red-100 hover:bg-red-50' : 'bg-white border-gray-50 shadow-sm hover:shadow-premium'}`}>
            <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-2xl flex items-center justify-center transition-colors ${variant === 'danger' ? 'bg-red-500 text-white' : 'bg-gray-50 group-hover:bg-uiuc-navy group-hover:text-white'}`}>
                    {icon}
                </div>
                <span className={`text-xs font-black uppercase tracking-widest ${variant === 'danger' ? 'text-red-500' : 'text-uiuc-navy'}`}>{label}</span>
            </div>
            <ChevronRight className={`h-4 w-4 ${variant === 'danger' ? 'text-red-300' : 'text-gray-200 group-hover:text-uiuc-navy'}`} />
        </button>
    );
}
