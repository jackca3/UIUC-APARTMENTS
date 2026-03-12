"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Building2, Star, Send, ShieldCheck, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { addBuilding, addReview } from "@/lib/api";

function StarRatingInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="space-y-2">
            <Label className="font-bold text-gray-700 text-xs uppercase tracking-wider">{label}</Label>
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                    <button
                        key={s}
                        type="button"
                        onClick={() => onChange(s)}
                        onMouseEnter={() => setHovered(s)}
                        onMouseLeave={() => setHovered(0)}
                        className={`h-11 w-11 rounded-xl flex items-center justify-center transition-all ${
                            (hovered || value) >= s ? 'bg-uiuc-orange text-white scale-110' : 'bg-gray-50 text-gray-300 hover:bg-gray-100'
                        }`}
                    >
                        <Star className={`h-5 w-5 ${(hovered || value) >= s ? 'fill-current' : ''}`} />
                    </button>
                ))}
                {value > 0 && <span className="self-center ml-2 text-xs font-black text-gray-400 uppercase tracking-widest">{['','Poor','Fair','Good','Great','Excellent'][value]}</span>}
            </div>
        </div>
    );
}

function AddBuildingForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, is_verified } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: searchParams.get("name") || "",
        address: "",
        city: "Champaign",
        state: "IL",
        management: "",
        website: "",
        imageUrl: "",
        review: "",
        rent: "",
    });

    const [ratings, setRatings] = useState({
        management: 0,
        maintenance: 0,
        value: 0,
        noise: 0,
    });

    const allRatingsSet = Object.values(ratings).every(r => r > 0);

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
                <div className="flex gap-4 flex-wrap justify-center">
                    <Button asChild className="bg-uiuc-navy text-white h-14 px-10 rounded-xl font-bold">
                        <Link href={`/auth/login?redirect=/apartments/add-building`}>
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
        if (!allRatingsSet) {
            setError("Please rate all four categories before submitting.");
            return;
        }
        setError("");
        setLoading(true);

        try {
            const { apartment, isDuplicate } = await addBuilding({
                name: form.name,
                address: form.address,
                city: form.city,
                state: form.state,
                management_company: form.management || undefined,
                official_website: form.website || undefined,
                image_url: form.imageUrl || undefined,
            });

            if (isDuplicate) {
                // Redirect to the existing apartment instead
                router.push(`/apartments/${apartment.slug}?duplicate=true`);
                return;
            }

            // Add the first review
            await addReview({
                apartmentSlug: apartment.slug,
                user_id: user.id,
                username: user.email?.split("@")[0] || "illini_student",
                writtenReview: form.review,
                managementRating: ratings.management,
                maintenanceRating: ratings.maintenance,
                valueRating: ratings.value,
                noiseRating: ratings.noise,
                monthlyRentPaid: form.rent ? Number(form.rent) : null,
            });

            router.push(`/apartments/${apartment.slug}?added=true`);
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
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
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-10">Add a missing building + leave the first review</p>

                    {error && (
                        <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 rounded-2xl p-4 font-bold text-sm">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            {error}
                        </div>
                    )}

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
                                    <Label className="font-bold text-gray-700">Building Name *</Label>
                                    <Input
                                        required
                                        placeholder="e.g. 310 E Green, The Hub"
                                        className="h-12 bg-gray-50 border-none rounded-xl"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Street Address *</Label>
                                    <Input
                                        required
                                        placeholder="e.g. 310 E Green St"
                                        className="h-12 bg-gray-50 border-none rounded-xl"
                                        value={form.address}
                                        onChange={e => setForm({ ...form, address: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700 text-xs uppercase tracking-wider">City</Label>
                                    <Input
                                        className="h-12 bg-gray-50 border-none rounded-xl"
                                        value={form.city}
                                        onChange={e => setForm({ ...form, city: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700 text-xs uppercase tracking-wider">Management Company (Optional)</Label>
                                    <Input
                                        placeholder="e.g. JSM, Green Street Realty"
                                        className="h-12 bg-gray-50 border-none rounded-xl"
                                        value={form.management}
                                        onChange={e => setForm({ ...form, management: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label className="font-bold text-gray-700 text-xs uppercase tracking-wider">Building Photo URL (Optional)</Label>
                                    <Input
                                        type="url"
                                        placeholder="Paste a direct image link — or we'll use Google Street View automatically"
                                        className="h-12 bg-gray-50 border-none rounded-xl"
                                        value={form.imageUrl}
                                        onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                                    />
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Leave blank to auto-use Google Street View for this address.</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: First Review */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-uiuc-orange p-2 rounded-lg text-white">
                                    <Star className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-uiuc-navy uppercase tracking-tight">Your First Review</h2>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rate all categories to submit</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <StarRatingInput label="Management" value={ratings.management} onChange={v => setRatings({ ...ratings, management: v })} />
                                <StarRatingInput label="Maintenance" value={ratings.maintenance} onChange={v => setRatings({ ...ratings, maintenance: v })} />
                                <StarRatingInput label="Value for Money" value={ratings.value} onChange={v => setRatings({ ...ratings, value: v })} />
                                <StarRatingInput label="Noise Level" value={ratings.noise} onChange={v => setRatings({ ...ratings, noise: v })} />
                            </div>

                            <div className="space-y-2 mb-6">
                                <Label className="font-bold text-gray-700">Write Your Review *</Label>
                                <Textarea
                                    required
                                    placeholder="What's it really like living here? Share what future students need to know — security, amenities, management responsiveness, noise..."
                                    className="min-h-[150px] bg-gray-50 border-none rounded-xl p-4"
                                    value={form.review}
                                    onChange={e => setForm({ ...form, review: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bold text-gray-700 text-xs uppercase tracking-wider">Monthly Rent You Paid (Optional)</Label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400">$</span>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 1200"
                                        className="h-12 bg-gray-50 border-none rounded-xl pl-8"
                                        value={form.rent}
                                        onChange={e => setForm({ ...form, rent: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading || !allRatingsSet || !form.review || !form.name || !form.address}
                            className="w-full bg-uiuc-navy text-white h-20 rounded-3xl font-black uppercase text-xl tracking-tighter hover:bg-uiuc-navy/90 shadow-xl transition-all hover:-translate-y-1 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {loading ? (
                                <span className="flex items-center gap-3">
                                    <div className="h-5 w-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    Submitting to Apt.ly...
                                </span>
                            ) : (
                                <span className="flex items-center gap-3">
                                    Add Building & Submit Review <Send className="h-6 w-6" />
                                </span>
                            )}
                        </Button>

                        {!allRatingsSet && (
                            <p className="text-center text-xs text-gray-400 font-bold uppercase tracking-widest -mt-4">
                                Rate all 4 categories above to enable submission
                            </p>
                        )}
                    </form>
                </div>

                {/* Sidebar */}
                <div className="w-full md:w-72 space-y-6 shrink-0">
                    <Card className="rounded-3xl border-gray-100 shadow-premium overflow-hidden">
                        <div className="bg-uiuc-navy p-6 text-white text-center">
                            <ShieldCheck className="h-12 w-12 mx-auto mb-4" />
                            <CardTitle className="uppercase font-black tracking-tight text-xl">Verified Only</CardTitle>
                        </div>
                        <CardContent className="p-6">
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                Your <span className="font-bold text-uiuc-navy">@illinois.edu</span> account ensures every building added is from a real UIUC student, not a landlord or bot.
                            </p>
                        </CardContent>
                    </Card>

                    <div className="p-6 bg-uiuc-orange/5 rounded-3xl border border-uiuc-orange/10 space-y-3">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-uiuc-orange" />
                            <h4 className="font-black text-uiuc-navy uppercase tracking-tight text-sm">What happens next</h4>
                        </div>
                        <ul className="text-xs text-gray-600 font-medium space-y-2 leading-relaxed">
                            <li>✓ Building added to the Apt.ly directory</li>
                            <li>✓ Your review posted immediately</li>
                            <li>✓ Other students can add their own reviews</li>
                            <li>✓ Building photo set automatically if not provided</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AddBuilding() {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-32 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uiuc-navy" /></div>}>
            <AddBuildingForm />
        </Suspense>
    );
}
