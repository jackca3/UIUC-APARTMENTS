"use client";

import { useEffect, useState, use } from "react";
import { getApartmentBySlug, getReviewsForApartment, toggleFavorite } from "@/lib/api";
import { Apartment, ReviewWithAuthor } from "@/lib/types";
import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Building, ShieldCheck, ThumbsUp, MessageSquare, Heart, ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { getStreetViewUrl, cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { useAuthModal } from "@/contexts/auth-modal-context";

export default function ApartmentPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const [apartment, setApartment] = useState<Apartment | null>(null);
    const [reviews, setReviews] = useState<ReviewWithAuthor[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFavorited, setIsFavorited] = useState(false);
    const { user } = useAuth();
    const { openAuthModal } = useAuthModal();
    const router = useRouter();

    const currentUserReview = user ? reviews.find(r => r.user_id === user.id) : null;

    const handleWriteReview = () => {
        if (!user) {
            openAuthModal("Sign in to leave a verified review");
        } else if (currentUserReview) {
            router.push(`/apartments/${resolvedParams.slug}/write-review?edit=${currentUserReview.id}`);
        } else {
            router.push(`/apartments/${resolvedParams.slug}/write-review`);
        }
    };

    useEffect(() => {
        async function loadData() {
            const apt = await getApartmentBySlug(resolvedParams.slug);
            if (apt) {
                setApartment(apt);
                setIsFavorited(apt.is_favorited || false);
                const revs = await getReviewsForApartment(apt.id);
                setReviews(revs);
            }
            setLoading(false);
        }
        loadData();
    }, [resolvedParams.slug]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uiuc-navy" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-uiuc-navy/30 animate-pulse">Loading verified data...</p>
            </div>
        );
    }

    if (!apartment) return notFound();

    const imageUrl = apartment.image_url || getStreetViewUrl(apartment.address);
    const validRentReviews = reviews.filter(r => r.monthly_rent_paid !== null);
    const avgRent = validRentReviews.length > 0 
        ? validRentReviews.reduce((acc, r) => acc + (r.monthly_rent_paid || 0), 0) / validRentReviews.length 
        : null;

    const categories = [
        { name: "Management", score: reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.management_rating, 0) / reviews.length : 0 },
        { name: "Maintenance", score: reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.maintenance_rating, 0) / reviews.length : 0 },
        { name: "Value", score: reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.value_rating, 0) / reviews.length : 0 },
        { name: "Noise", score: reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.noise_rating, 0) / reviews.length : 0 },
    ];

    const handleToggleFavorite = async () => {
        const newState = await toggleFavorite(apartment.id);
        setIsFavorited(!isFavorited);
    };

    return (
        <div className="bg-white min-h-screen pb-32">
            {/* Nav Path */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-uiuc-navy/40">
                    <Link href="/apartments" className="hover:text-uiuc-orange transition-colors">Apartments</Link>
                    <span>/</span>
                    <span className="text-uiuc-navy">{apartment.name}</span>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                    <div className="space-y-6 max-w-3xl">
                        <div className="flex items-center gap-6">
                            <h1 className="text-6xl md:text-8xl font-black text-uiuc-navy tracking-tighter uppercase leading-[0.85]">
                                {apartment.name.split(' ').map((word, i) => (
                                    <span key={i} className="block">{word}</span>
                                ))}
                            </h1>
                            <button 
                                onClick={handleToggleFavorite}
                                className="p-5 rounded-3xl bg-gray-50 hover:bg-white shadow-premium transition-all hover:scale-110 active:scale-95 group/fav"
                            >
                                <Heart className={cn(
                                    "h-8 w-8 transition-colors",
                                    isFavorited ? "fill-red-500 text-red-500" : "text-gray-300 group-hover/fav:text-red-400"
                                )} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2">
                             <p className="flex items-center text-uiuc-navy/40 font-black uppercase tracking-[0.2em] text-sm">
                                <MapPin className="h-5 w-5 mr-3 text-uiuc-orange" />
                                {apartment.address}
                            </p>
                            <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-xl">
                                {apartment.description || "Premium student housing verified by the Apt.ly community."}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-[320px] shrink-0">
                        <div className="bg-uiuc-navy p-8 rounded-[40px] shadow-premium text-white relative overflow-hidden group">
                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="h-6 w-6 text-uiuc-orange" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Verified Rent</span>
                                </div>
                                {avgRent !== null ? (
                                    <div className="space-y-1">
                                        <div className="text-5xl font-black tracking-tighter">
                                            ${Math.round(avgRent)}
                                            <span className="text-xl text-white/30 ml-1">/mo</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-uiuc-orange/60 uppercase tracking-widest leading-none">
                                            Avg based on {validRentReviews.length} student reports
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-sm font-bold text-white/40 italic leading-relaxed">Rent information not yet reported.</p>
                                )}
                            </div>
                            <Star className="absolute -bottom-10 -right-10 h-40 w-40 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
                        </div>

                        {apartment.official_website && (
                            <Button asChild variant="outline" className="h-20 rounded-[30px] border-uiuc-navy/10 border-2 font-black uppercase tracking-widest text-uiuc-navy hover:bg-uiuc-navy hover:text-white transition-all shadow-xl text-xs">
                                <a href={apartment.official_website} target="_blank" rel="noopener noreferrer">
                                    Official Property Site <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Main Visual - Only show if a real photo has been provided */}
                {apartment.image_url && (
                    <div className="rounded-[60px] overflow-hidden aspect-[21/9] mb-24 shadow-premium group relative bg-gray-100 border-8 border-white">
                        <img
                            src={apartment.image_url}
                            alt={apartment.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </div>
                )}

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-8 space-y-24">
                        {/* Reviews Section */}
                        <div className="space-y-12">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-gray-100 pb-12">
                                <div className="space-y-2">
                                    <h2 className="text-4xl font-black text-uiuc-navy uppercase tracking-tighter">Verified Reports</h2>
                                    <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">What students are saying about life here.</p>
                                </div>
                                <Button onClick={handleWriteReview} className="bg-uiuc-navy hover:bg-black text-white h-20 px-12 rounded-[30px] font-black uppercase tracking-widest shadow-premium transition-transform hover:scale-105 active:scale-95 text-xs">
                                    {currentUserReview ? "Edit Your Review" : "Write a Review"}
                                </Button>
                            </div>

                            {reviews.length > 0 ? (
                                <div className="space-y-10">
                                    {reviews.map(review => (
                                        <Card id={`review-${review.id}`} key={review.id} className="rounded-[40px] border-none bg-gray-50/50 p-10 shadow-premium transition-all hover:bg-white border hover:border-gray-100 group">
                                            <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
                                                <div className="flex items-center gap-5">
                                                    <div className="h-16 w-16 rounded-3xl bg-uiuc-navy flex items-center justify-center text-white font-black text-2xl shadow-xl transition-transform group-hover:rotate-3">
                                                        {(review.profile as any).username?.charAt(0).toUpperCase() || "U"}
                                                    </div>
                                                    <div>
                                                        <p className="text-xl font-black text-uiuc-navy flex items-center gap-2 tracking-tight">
                                                            @{(review.profile as any).username || "anonymous"}
                                                            {review.profile.is_verified && <ShieldCheck className="h-5 w-5 text-uiuc-orange" />}
                                                        </p>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Verified Illini • {new Date(review.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    {review.monthly_rent_paid && (
                                                        <div className="bg-white px-8 py-4 rounded-3xl shadow-sm border border-gray-100 text-center">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Paid</p>
                                                            <p className="text-xl font-black text-uiuc-navy">${Math.round(review.monthly_rent_paid)}<span className="text-sm text-gray-300 ml-1">/mo</span></p>
                                                        </div>
                                                    )}
                                                    {user && user.id === review.user_id && (
                                                        <Button 
                                                            variant="outline" 
                                                            size="icon"
                                                            asChild
                                                            className="rounded-full mt-2 h-10 w-10 text-gray-400 hover:text-uiuc-orange hover:bg-orange-50 transition-colors border-gray-200"
                                                        >
                                                            <Link href={`/apartments/${resolvedParams.slug}/write-review?edit=${review.id}`} title="Edit Review">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                                            </Link>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                <p className="text-xl text-gray-700 font-medium italic leading-relaxed">
                                                    "{review.written_review}"
                                                </p>

                                                {/* Review photos */}
                                                {(review as any).image_urls?.length > 0 && (
                                                    <div className={`grid gap-3 ${(review as any).image_urls.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                                        {(review as any).image_urls.map((url: string, imgIdx: number) => (
                                                            <a key={imgIdx} href={url} target="_blank" rel="noopener noreferrer"
                                                                className="rounded-2xl overflow-hidden block aspect-video bg-gray-100 hover:opacity-90 transition-opacity">
                                                                <img
                                                                    src={url}
                                                                    alt={`Review photo ${imgIdx + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                    onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
                                                                />
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-gray-100">
                                                    <ReviewMetric label="Management" rating={review.management_rating} />
                                                    <ReviewMetric label="Maintenance" rating={review.maintenance_rating} />
                                                    <ReviewMetric label="Value" rating={review.value_rating} />
                                                    <ReviewMetric label="Noise" rating={review.noise_rating} />
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-32 bg-gray-50/50 rounded-[60px] border-4 border-dashed border-gray-200">
                                    <div className="bg-white w-24 h-24 rounded-[30px] flex items-center justify-center mx-auto mb-10 shadow-premium">
                                        <MessageSquare className="h-10 w-10 text-gray-200" />
                                    </div>
                                    <h3 className="text-4xl font-black text-uiuc-navy mb-4 uppercase tracking-tighter">No reviews yet</h3>
                                    <p className="text-gray-400 font-bold mb-12 max-w-sm mx-auto uppercase tracking-widest text-[10px] leading-relaxed">Apt.ly relies on student honesty. Be the first to share your experience with {apartment.name}.</p>
                                    <Button onClick={handleWriteReview} className="bg-uiuc-orange hover:bg-uiuc-orange/90 text-white h-20 px-16 rounded-[30px] font-black uppercase tracking-widest shadow-premium transition-all hover:scale-105 active:scale-95 text-xs">
                                        Write the First Review
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-10">
                            {/* Scoreboard */}
                            {reviews.length > 0 && (
                                <div className="bg-gray-50 p-10 rounded-[50px] space-y-10 border border-gray-100">
                                    <div className="text-center">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-uiuc-navy/40 mb-8">Community Score</h3>
                                        <div className="space-y-8">
                                            {categories.map(cat => (
                                                <div key={cat.name} className="space-y-3">
                                                    <div className="flex justify-between items-end">
                                                        <span className="font-black uppercase tracking-widest text-[10px] text-uiuc-navy">{cat.name}</span>
                                                        <span className="font-black text-lg text-uiuc-orange">{cat.score.toFixed(1)}</span>
                                                    </div>
                                                    <div className="h-2 w-full bg-white rounded-full overflow-hidden shadow-inner">
                                                        <div 
                                                            className="h-full bg-uiuc-navy transition-all duration-1000" 
                                                            style={{ width: `${(cat.score / 5) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Info Card */}
                            <div className="bg-white p-10 rounded-[50px] shadow-premium border border-gray-50 space-y-10">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-uiuc-navy uppercase tracking-tighter">Property Info</h3>
                                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">General details</p>
                                </div>
                                <div className="space-y-8">
                                    <InfoRow label="Management" value={apartment.management_company || "Independent"} />
                                    <InfoRow label="Status" value="Apt.ly Verified" highlight />
                                    <InfoRow label="Location" value="University District" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReviewMetric({ label, rating }: { label: string; rating: number }) {
    return (
        <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">{label}</p>
            <div className="flex justify-start">
                <StarRating rating={rating} size="sm" />
            </div>
        </div>
    );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{label}</span>
            <span className={cn("font-bold text-sm", highlight ? "text-uiuc-orange" : "text-uiuc-navy")}>{value}</span>
        </div>
    );
}
