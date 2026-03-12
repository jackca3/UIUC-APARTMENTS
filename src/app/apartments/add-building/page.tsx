"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, MapPin, Globe, Image as ImageIcon, Star, Send, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddBuilding() {
    const router = useRouter();
    const { user, is_verified } = useAuth();
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);

    const [form, setForm] = useState({
        name: "",
        address: "",
        management: "",
        website: "",
        imageUrl: "",
        review: "",
        rent: ""
    });

    if (!user || !is_verified) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
                <div className="bg-uiuc-orange/10 p-6 rounded-full mb-8">
                    <ShieldCheck className="h-16 w-16 text-uiuc-orange" />
                </div>
                <h1 className="text-4xl font-black text-uiuc-navy mb-4 uppercase">Verification Required</h1>
                <p className="text-xl text-gray-500 max-w-lg mb-10 font-medium">
                    To maintain data integrity, only verified students with an <span className="text-uiuc-orange font-bold">@illinois.edu</span> account can add new buildings to Apt.ly.
                </p>
                <div className="flex gap-4">
                    <Button asChild className="bg-uiuc-navy text-white h-14 px-10 rounded-xl font-bold">
                        <Link href="/login?redirect=/apartments/add-building">
                            {user ? "Verify Your Account" : "Login to Verify"}
                        </Link>
                    </Button>
                    <Button variant="outline" asChild className="h-14 px-8 rounded-xl font-bold border-gray-200">
                        <Link href="/apartments">Back to Directory</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        // In a real app, this would call Supabase
        // For now, we simulate success
        setTimeout(() => {
            setLoading(false);
            router.push("/apartments?added=true");
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Button variant="ghost" asChild className="mb-8 pl-0 hover:bg-transparent -ml-2 text-gray-400 font-bold uppercase tracking-widest text-xs">
                <Link href="/apartments" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back to listings
                </Link>
            </Button>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 w-full">
                    <h1 className="text-5xl font-black text-uiuc-navy mb-2 tracking-tighter uppercase leading-none">
                        Expand <span className="text-uiuc-orange">Apt.ly</span>
                    </h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-10">Add a missing building to the UIUC student database</p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section 1: Building Info */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-uiuc-navy p-2 rounded-lg text-white">
                                    <Building2 className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-black text-uiuc-navy uppercase tracking-tight">Building Details</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Building Name*</Label>
                                    <Input 
                                        required 
                                        placeholder="e.g. 309 Green, The Hub" 
                                        className="h-12 bg-gray-50 border-none rounded-xl"
                                        value={form.name}
                                        onChange={e => setForm({...form, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Street Address*</Label>
                                    <Input 
                                        required 
                                        placeholder="Full address near campus" 
                                        className="h-12 bg-gray-50 border-none rounded-xl"
                                        value={form.address}
                                        onChange={e => setForm({...form, address: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700 text-xs uppercase tracking-wider">Management Company (Optional)</Label>
                                    <Input 
                                        placeholder="e.g. JSM, Green Street Realty" 
                                        className="h-12 bg-gray-50 border-none rounded-xl"
                                        value={form.management}
                                        onChange={e => setForm({...form, management: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700 text-xs uppercase tracking-wider">Official Website (Optional)</Label>
                                    <Input 
                                        type="url"
                                        placeholder="Link to property page" 
                                        className="h-12 bg-gray-50 border-none rounded-xl"
                                        value={form.website}
                                        onChange={e => setForm({...form, website: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Visuals */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-uiuc-orange p-2 rounded-lg text-white">
                                    <ImageIcon className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-black text-uiuc-navy uppercase tracking-tight">Building Photo</h2>
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bold text-gray-700">Image URL</Label>
                                <Input 
                                    type="url"
                                    placeholder="Paste a direct image link from the property website" 
                                    className="h-12 bg-gray-50 border-none rounded-xl"
                                    value={form.imageUrl}
                                    onChange={e => setForm({...form, imageUrl: e.target.value})}
                                />
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">External hero images are preferred for visual appeal.</p>
                            </div>
                        </div>

                        {/* Section 3: The First Review */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-uiuc-navy p-2 rounded-lg text-white">
                                    <Star className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-black text-uiuc-navy uppercase tracking-tight">Your First Review</h2>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Overall Rating</Label>
                                    <div className="flex gap-2">
                                        {[1,2,3,4,5].map(s => (
                                            <button 
                                                key={s}
                                                type="button"
                                                onClick={() => setRating(s)}
                                                className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all ${rating >= s ? 'bg-uiuc-orange text-white' : 'bg-gray-50 text-gray-300 hover:bg-gray-100'}`}
                                            >
                                                <Star className={`h-6 w-6 ${rating >= s ? 'fill-current' : ''}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Write Your Thoughts*</Label>
                                    <Textarea 
                                        required
                                        placeholder="What's it like living here? Security, amenities, value?" 
                                        className="min-h-[150px] bg-gray-50 border-none rounded-xl p-4"
                                        value={form.review}
                                        onChange={e => setForm({...form, review: e.target.value})}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700 text-xs uppercase tracking-wider">Estimated Monthly Rent</Label>
                                    <Input 
                                        type="number"
                                        placeholder="e.g. 1200" 
                                        className="h-12 bg-gray-50 border-none rounded-xl"
                                        value={form.rent}
                                        onChange={e => setForm({...form, rent: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button 
                            disabled={loading || rating === 0}
                            className="w-full bg-uiuc-navy text-white h-20 rounded-3xl font-black uppercase text-xl tracking-tighter hover:bg-uiuc-navy/90 shadow-xl transition-all hover:-translate-y-1 active:scale-[0.98]"
                        >
                            {loading ? (
                                "Submitting to Database..."
                            ) : (
                                <span className="flex items-center gap-3">
                                    Add Building & Submit Review <Send className="h-6 w-6" />
                                </span>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Sidebar Info */}
                <div className="w-full md:w-80 space-y-6">
                    <Card className="rounded-3xl border-gray-100 shadow-premium overflow-hidden">
                        <div className="bg-uiuc-navy p-6 text-white text-center">
                            <ShieldCheck className="h-12 w-12 mx-auto mb-4" />
                            <CardTitle className="uppercase font-black tracking-tight text-xl">Verified Only</CardTitle>
                        </div>
                        <CardContent className="p-6">
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                Apt.ly is built by students, for students. Every building added is vetted by the community. Your `@illinois.edu` account ensures high-quality, trustworthy data.
                            </p>
                        </CardContent>
                    </Card>

                    <div className="p-6 bg-uiuc-orange/5 rounded-3xl border border-uiuc-orange/10">
                        <h4 className="font-black text-uiuc-navy uppercase tracking-tight mb-2">Pro Tip</h4>
                        <p className="text-xs text-gray-600 font-medium">
                            If you have a photo of the building facade, feel free to link it! Real photos help other students find the right place.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
