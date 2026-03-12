"use client";

import { useState, use, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldAlert, ImagePlus, X, Building2, Camera, UserSquare2 } from "lucide-react";
import Link from "next/link";
import { addReview, updateReview, getReviewById, getApartmentBySlug } from "@/lib/api";

export default function WriteReviewPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const { user, is_verified, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const editReviewId = searchParams?.get("edit");
    const [submitting, setSubmitting] = useState(false);
    const [fetchingReview, setFetchingReview] = useState(!!editReviewId);

    // Form State
    const [company, setCompany] = useState<string>("");
    const [otherCompany, setOtherCompany] = useState("");
    const [ratings, setRatings] = useState({ management: 0, maintenance: 0, value: 0, noise: 0 });
    const [monthlyRent, setMonthlyRent] = useState("");
    const [reviewText, setReviewText] = useState("");

    // Image state
    const [buildingImageUrl, setBuildingImageUrl] = useState("");
    const [reviewImageUrls, setReviewImageUrls] = useState<string[]>([""]);

    useEffect(() => {
        async function loadEditData() {
            if (!editReviewId) return;
            try {
                const review = await getReviewById(editReviewId);
                if (review && review.user_id === user?.id) {
                    setRatings({
                        management: review.management_rating,
                        maintenance: review.maintenance_rating,
                        value: review.value_rating,
                        noise: review.noise_rating
                    });
                    setMonthlyRent(review.monthly_rent_paid ? review.monthly_rent_paid.toString() : "");
                    setReviewText(review.written_review);
                    
                    if (review.image_urls && review.image_urls.length > 0) {
                        setReviewImageUrls([...review.image_urls, ""]);
                    }

                    // We can optionally load the apt's image_url and management_company too, 
                    // but doing so prevents them from just updating the text.
                    const apt = await getApartmentBySlug(review.apartment_id);
                    if (apt?.management_company) {
                        // Check if it's one of the presets or "Other"
                        const presets = ["Smile Student Living", "JSM Living", "Green Street Realty", "MHM Properties", "American Campus Communities", "Bankier Apartments", "Roland Realty", "University Group", "Campustown Rentals", "Independent"];
                        if (presets.includes(apt.management_company)) {
                            setCompany(apt.management_company);
                        } else {
                            setCompany("Other");
                            setOtherCompany(apt.management_company);
                        }
                    }
                } else if (review) {
                    toast.error("You can only edit your own reviews.");
                    router.push(`/apartments/${resolvedParams.slug}`);
                }
            } catch (e) {
                toast.error("Failed to load review details.");
            } finally {
                setFetchingReview(false);
            }
        }
        if (!loading) loadEditData();
    }, [editReviewId, user, loading, router, resolvedParams.slug]);

    if (loading || fetchingReview) return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uiuc-navy" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-uiuc-navy/30">Loading form...</p>
            </div>
    );

    if (!user || !is_verified) {
        return (
            <div className="container mx-auto px-4 py-20 flex justify-center">
                <Card className="max-w-md w-full text-center p-6 border-red-100 bg-red-50">
                    <ShieldAlert className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-red-900 mb-2">Verified Student Account Required</h2>
                    <p className="text-red-700 mb-6">You must be logged in with a verified @illinois.edu email to leave a review.</p>
                    <Button asChild className="w-full bg-uiuc-navy hover:bg-black">
                        <Link href={`/auth/login?redirect=/apartments/${resolvedParams.slug}/write-review`}>
                            {user ? "Verify Your Account" : "Log In to Review"}
                        </Link>
                    </Button>
                </Card>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!ratings.management || !ratings.maintenance || !ratings.value || !ratings.noise) {
            toast.error("Please provide a star rating for all categories.");
            return;
        }
        if (!company) {
            toast.error("Please select a management company.");
            return;
        }
        if (company === "Other" && !otherCompany.trim()) {
            toast.error("Please type the name of the management company.");
            return;
        }
        if (!reviewText || reviewText.length < 20) {
            toast.error("Please write at least 20 characters.");
            return;
        }

        const validImageUrls = reviewImageUrls.filter(u => u.trim().length > 0);

        setSubmitting(true);
        try {
            const reviewPayload = {
                apartmentSlug: resolvedParams.slug,
                user_id: user.id,
                username: user.username,
                managementCompany: company === "Other" ? otherCompany.trim() : company,
                managementRating: ratings.management,
                maintenanceRating: ratings.maintenance,
                valueRating: ratings.value,
                noiseRating: ratings.noise,
                monthlyRentPaid: monthlyRent ? parseFloat(monthlyRent) : null,
                writtenReview: reviewText,
                imageUrls: validImageUrls,
                buildingImageUrl: buildingImageUrl.trim() || null,
            };

            if (editReviewId) {
                await updateReview(editReviewId, reviewPayload);
                toast.success("Review updated successfully!");
            } else {
                await addReview(reviewPayload);
                toast.success("Review submitted! Thanks for helping other students.");
            }
            router.push(`/apartments/${resolvedParams.slug}`);
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleRatingChange = (category: keyof typeof ratings) => (val: number) => {
        setRatings(prev => ({ ...prev, [category]: val }));
    };

    const addImageField = () => setReviewImageUrls(prev => [...prev, ""]);
    const updateImageUrl = (i: number, val: string) => {
        setReviewImageUrls(prev => prev.map((u, idx) => idx === i ? val : u));
    };
    const removeImageField = (i: number) => {
        setReviewImageUrls(prev => prev.filter((_, idx) => idx !== i));
    };

    const criteria = [
        { key: "management", label: "Property Management", desc: "Responsiveness and professionalism" },
        { key: "maintenance", label: "Maintenance", desc: "Speed and quality of repairs" },
        { key: "value", label: "Value for Money", desc: "Is the rent fair for the quality?" },
        { key: "noise", label: "Noise Level", desc: "Soundproofing and neighbor noise" },
    ] as const;

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-3xl font-extrabold text-uiuc-navy mb-8">
                {editReviewId ? "Edit your Review" : "Review this Apartment"}
            </h1>

            <form onSubmit={handleSubmit}>
                {/* ── Management Company ── */}
                <Card className="mb-8 border-none shadow-premium">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <UserSquare2 className="h-5 w-5 text-uiuc-orange" />
                            <CardTitle>Management Company</CardTitle>
                        </div>
                        <CardDescription>Who manages this property?</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="company">Select Leasing Company</Label>
                            <Select value={company} onValueChange={(val) => setCompany(val || "")}>
                                <SelectTrigger id="company">
                                    <SelectValue placeholder="Select a company" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Smile Student Living">Smile Student Living</SelectItem>
                                    <SelectItem value="JSM Living">JSM Living</SelectItem>
                                    <SelectItem value="Green Street Realty">Green Street Realty</SelectItem>
                                    <SelectItem value="MHM Properties">MHM Properties</SelectItem>
                                    <SelectItem value="American Campus Communities">American Campus Communities (ACC)</SelectItem>
                                    <SelectItem value="Bankier Apartments">Bankier Apartments</SelectItem>
                                    <SelectItem value="Roland Realty">Roland Realty</SelectItem>
                                    <SelectItem value="University Group">University Group</SelectItem>
                                    <SelectItem value="Campustown Rentals">Campustown Rentals</SelectItem>
                                    <SelectItem value="Independent">Independent Landlord</SelectItem>
                                    <SelectItem value="Other">Other...</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        {company === "Other" && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                <Label htmlFor="other-company">Company Name</Label>
                                <Input
                                    id="other-company"
                                    placeholder="Type the company name..."
                                    value={otherCompany}
                                    onChange={e => setOtherCompany(e.target.value)}
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* ── Ratings ── */}
                <Card className="mb-8 overflow-hidden border-none shadow-premium bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-uiuc-navy py-6 text-white">
                        <CardTitle className="text-xl">Student Ratings</CardTitle>
                        <CardDescription className="text-blue-100/80">Be honest and specific. Your ratings help other students find better housing.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8 pt-8 p-6 md:p-8">
                        {criteria.map((c) => (
                            <div key={c.key} className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-4">
                                <div className="space-y-1">
                                    <Label className="text-base font-bold text-uiuc-navy">{c.label}</Label>
                                    <p className="text-sm text-gray-500 max-w-md">{c.desc}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <StarRating rating={ratings[c.key]} interactive onRatingChange={handleRatingChange(c.key)} size="lg" />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* ── Building Photo ── */}
                <Card className="mb-8 border-none shadow-premium">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-uiuc-orange" />
                            <CardTitle>Building Photo <span className="text-gray-400 font-normal text-sm">(Optional)</span></CardTitle>
                        </div>
                        <CardDescription>
                            Add a photo of the building exterior so others can identify it at a glance. This will appear on the apartment card in search results.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Label htmlFor="building-img">Building Image URL</Label>
                        <Input
                            id="building-img"
                            type="url"
                            placeholder="https://example.com/building-photo.jpg"
                            value={buildingImageUrl}
                            onChange={e => setBuildingImageUrl(e.target.value)}
                        />
                        <p className="text-xs text-gray-400">
                            Paste the URL of an image from the official leasing site, a direct screenshot upload (e.g. via <a href="https://imgur.com" target="_blank" className="text-uiuc-orange underline">Imgur</a>), or Google Maps.
                        </p>
                        {buildingImageUrl.trim() && (
                            <div className="mt-3 rounded-2xl overflow-hidden border border-gray-100 aspect-video bg-gray-50">
                                <img
                                    src={buildingImageUrl}
                                    alt="Building preview"
                                    className="w-full h-full object-cover"
                                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* ── Review Text + Rent ── */}
                <Card className="mb-8 border-none shadow-premium">
                    <CardHeader>
                        <CardTitle>Rent & Written Review</CardTitle>
                        <CardDescription>Reporting your rent helps create a transparent market for everyone.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="rent">Monthly Rent Paid <span className="text-gray-400 font-normal">(Optional)</span></Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                                <Input
                                    id="rent"
                                    type="number"
                                    placeholder="e.g. 850"
                                    className="pl-7"
                                    value={monthlyRent}
                                    onChange={e => setMonthlyRent(e.target.value)}
                                />
                            </div>
                            <p className="text-[10px] text-gray-400">Total rent per person, per month.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="review">What should other students know?</Label>
                            <Textarea
                                id="review"
                                placeholder="Describe your experience — management response time, the physical condition of the building, noise levels, internet speed, hidden fees..."
                                required
                                rows={8}
                                className="resize-none"
                                value={reviewText}
                                onChange={e => setReviewText(e.target.value)}
                            />
                            <div className="flex justify-between items-center text-[10px]">
                                <span className={reviewText.length < 20 ? "text-red-400" : "text-green-500"}>
                                    {reviewText.length < 20 ? `${20 - reviewText.length} more characters needed` : "Good length!"}
                                </span>
                                <span className="text-gray-400">{reviewText.length} characters</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ── Review Photos ── */}
                <Card className="mb-8 border-none shadow-premium">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Camera className="h-5 w-5 text-uiuc-orange" />
                            <CardTitle>Review Photos <span className="text-gray-400 font-normal text-sm">(Optional)</span></CardTitle>
                        </div>
                        <CardDescription>
                            Add photos to back up your review — kitchen condition, damage, hallways, amenities. Upload to <a href="https://imgur.com" target="_blank" className="text-uiuc-orange underline">Imgur</a> or any image host and paste the URL here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {reviewImageUrls.map((url, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex gap-2">
                                    <Input
                                        type="url"
                                        placeholder={`https://i.imgur.com/example${i + 1}.jpg`}
                                        value={url}
                                        onChange={e => updateImageUrl(i, e.target.value)}
                                        className="flex-1"
                                    />
                                    {reviewImageUrls.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeImageField(i)}
                                            className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                                {url.trim() && (
                                    <div className="rounded-2xl overflow-hidden border border-gray-100 h-40 bg-gray-50">
                                        <img
                                            src={url}
                                            alt={`Review photo ${i + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                        {reviewImageUrls.length < 5 && (
                            <button
                                type="button"
                                onClick={addImageField}
                                className="flex items-center gap-2 text-sm font-bold text-uiuc-orange hover:text-uiuc-navy transition-colors"
                            >
                                <ImagePlus className="h-4 w-4" /> Add another photo
                            </button>
                        )}
                    </CardContent>
                    <CardFooter className="bg-gray-50/50 border-t flex justify-end gap-4 py-6 rounded-b-xl">
                        <Button variant="ghost" type="button" onClick={() => router.back()}>Cancel</Button>
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="bg-uiuc-navy hover:bg-uiuc-navy/90 text-white min-w-[140px] shadow-lg"
                        >
                            {submitting ? "Saving..." : editReviewId ? "Save Changes" : "Submit My Review"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
