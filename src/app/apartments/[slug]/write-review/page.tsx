"use client";

import { useState, use, useEffect, Suspense } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldAlert, ImagePlus, X, Building2, Camera, UserSquare2, Star, Send, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { addReview, updateReview, getReviewById, getApartmentBySlug } from "@/lib/api";
import { StarRatingInput } from "@/components/star-rating-input";
import { trackLaunchEvent } from "@/lib/analytics";

function WriteReviewForm({ slug }: { slug: string }) {
    const { user, is_verified, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const editReviewId = searchParams?.get("edit");
    
    const [submitting, setSubmitting] = useState(false);
    const [fetchingReview, setFetchingReview] = useState(!!editReviewId);
    const [apartmentName, setApartmentName] = useState("");

    // Form State
    const [company, setCompany] = useState<string>("");
    const [otherCompany, setOtherCompany] = useState("");
    const [ratings, setRatings] = useState({ management: 0, maintenance: 0, value: 0, noise: 0 });
    const [monthlyRent, setMonthlyRent] = useState("");
    const [reviewText, setReviewText] = useState("");

    // Image state
    const [buildingImageUrl, setBuildingImageUrl] = useState("");
    const [reviewImageUrls, setReviewImageUrls] = useState<string[]>([""]);

    const triggerBlueskyReviewPost = async (reviewId: string) => {
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 5000);

        try {
            const response = await fetch("/api/social/bluesky/review-posted", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reviewId }),
                keepalive: true,
                signal: controller.signal,
            });

            if (!response.ok) {
                const payload = await response.json().catch(() => null);
                console.error("[WriteReview] Bluesky automation failed:", payload?.error || response.statusText);
            }
        } catch (error) {
            console.error("[WriteReview] Bluesky automation failed:", error);
        } finally {
            window.clearTimeout(timeout);
        }
    };

    useEffect(() => {
        async function loadData() {
            // Load apartment info
            try {
                const apt = await getApartmentBySlug(slug);
                if (apt) setApartmentName(apt.name);
            } catch (e) { /* ignore */ }

            if (!editReviewId) {
                setFetchingReview(false);
                return;
            };

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

                    const apt = await getApartmentBySlug(review.apartment_id);
                    if (apt?.management_company) {
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
                    router.push(`/apartments/${slug}`);
                }
            } catch (e) {
                toast.error("Failed to load review details.");
            } finally {
                setFetchingReview(false);
            }
        }
        if (!loading) loadData();

        // ── Paste to Upload Logic ──
        const handlePaste = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            const files = e.clipboardData?.files;
            
            if (!items && !files) return;

            const handleFile = (file: File) => {
                if (file.type.indexOf("image") === -1) return;
                
                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target?.result as string;
                    setReviewImageUrls(prev => {
                        // Extract existing valid URLs (either regular ones or Base64)
                        const currentValid = prev.filter(u => u.trim());
                        if (currentValid.length < 5) {
                            return [...currentValid, dataUrl, ""];
                        }
                        toast.warning("Maximum 5 images allowed");
                        return prev;
                    });
                    toast.success("Image pasted!");
                };
                reader.readAsDataURL(file);
            };

            if (items) {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf("image") !== -1) {
                        const file = items[i].getAsFile();
                        if (file) handleFile(file);
                    }
                }
            } else if (files) {
                for (let i = 0; i < files.length; i++) {
                    handleFile(files[i]);
                }
            }
        };

        window.addEventListener("paste", handlePaste);
        return () => window.removeEventListener("paste", handlePaste);
    }, [editReviewId, user, loading, router, slug]);

    useEffect(() => {
        if (loading || !user) return;

        trackLaunchEvent({
            eventName: "review_form_opened",
            userId: user.id,
            apartmentSlug: slug,
            metadata: {
                mode: editReviewId ? "edit" : "create",
            },
        });
    }, [editReviewId, loading, slug, user]);

    if (loading || fetchingReview) return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uiuc-navy" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-uiuc-navy/30">Loading form...</p>
            </div>
    );

    if (!user || !is_verified) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
                <div className="bg-uiuc-orange/10 p-6 rounded-full mb-8">
                    <ShieldAlert className="h-16 w-16 text-uiuc-orange" />
                </div>
                <h1 className="text-4xl font-black text-uiuc-navy mb-4 uppercase">Verification Required</h1>
                <p className="text-xl text-gray-500 max-w-lg mb-10 font-medium">
                    To maintain data integrity, only verified students with an <span className="text-uiuc-orange font-bold">@illinois.edu</span> account can leave reviews.
                </p>
                <div className="flex gap-4 flex-wrap justify-center">
                    <Button asChild className="bg-uiuc-navy text-white h-14 px-10 rounded-xl font-bold">
                        <Link href={`/auth/login?redirect=/apartments/${slug}/write-review`}>
                            {user ? "Verify Your Account" : "Login to Verify"}
                        </Link>
                    </Button>
                    <Button variant="outline" asChild className="h-14 px-8 rounded-xl font-bold border-gray-200">
                        <Link href={`/apartments/${slug}`}>Back to Building</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const allRatingsSet = Object.values(ratings).every(r => r > 0);
        if (!allRatingsSet) {
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
                apartmentSlug: slug,
                user_id: user.id,
                username: user.email?.split("@")[0] || "illini_student",
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
                trackLaunchEvent({
                    eventName: "review_submit_succeeded",
                    userId: user.id,
                    apartmentSlug: slug,
                    metadata: {
                        mode: "edit",
                    },
                });
                toast.success("Review updated successfully!");
                router.push(`/apartments/${slug}?review=updated`);
            } else {
                const createdReview = await addReview(reviewPayload);
                trackLaunchEvent({
                    eventName: "review_submit_succeeded",
                    userId: user.id,
                    apartmentSlug: slug,
                    metadata: {
                        mode: "create",
                    },
                });
                void triggerBlueskyReviewPost(createdReview.id);
                toast.success("Review submitted! Thank you.");
                router.push(`/apartments/${slug}?review=created`);
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            console.error('[WriteReview] Submission failed:', msg, err);
            const friendlyMessage = msg.includes("already reviewed")
                ? "You already have a review for this apartment. You can edit it from the apartment page instead."
                : msg;
            trackLaunchEvent({
                eventName: "review_submit_failed",
                userId: user.id,
                apartmentSlug: slug,
                metadata: {
                    mode: editReviewId ? "edit" : "create",
                    reason: friendlyMessage,
                },
            });
            toast.error(`Submission failed: ${friendlyMessage}`);

        } finally {
            setSubmitting(false);
        }
    };

    const addReviewImage = () => setReviewImageUrls(prev => [...prev, ""]);
    const updateReviewImage = (i: number, val: string) => {
        setReviewImageUrls(prev => prev.map((u, idx) => idx === i ? val : u));
    };
    const removeReviewImage = (i: number) => {
        setReviewImageUrls(prev => prev.filter((_, idx) => idx !== i));
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Button variant="ghost" asChild className="mb-8 pl-0 hover:bg-transparent -ml-2 text-gray-400 font-bold uppercase tracking-widest text-xs">
                <Link href={`/apartments/${slug}`} className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back to {apartmentName || "building"}
                </Link>
            </Button>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 w-full">
            <h1 className="text-4xl md:text-5xl font-black text-uiuc-navy mb-2 tracking-tighter uppercase leading-none">
                        {editReviewId ? "Edit" : "Post"} a <span className="text-uiuc-orange">Review</span>
                    </h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-10">Review for {apartmentName || slug}</p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* ── Management Info ── */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-uiuc-navy p-2 rounded-lg text-white">
                                    <UserSquare2 className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-black text-uiuc-navy uppercase tracking-tight">Management</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Select Leasing Company *</Label>
                                    <Select value={company} onValueChange={(val) => setCompany(val || "")}>
                                        <SelectTrigger className="h-12 bg-gray-50 border-none rounded-xl">
                                            <SelectValue placeholder="Who manages this property?" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-none shadow-xl">
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
                                        <Label className="font-bold text-gray-700">Company Name</Label>
                                        <Input
                                            placeholder="Type the company name..."
                                            className="h-12 bg-gray-50 border-none rounded-xl"
                                            value={otherCompany}
                                            onChange={e => setOtherCompany(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                         {/* ── Ratings ── */}
                         <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-uiuc-orange p-2 rounded-lg text-white">
                                    <Star className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-uiuc-navy uppercase tracking-tight">Student Ratings</h2>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Be honest and specific</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-4">
                                <StarRatingInput label="Management" value={ratings.management} onChange={v => setRatings({ ...ratings, management: v })} />
                                <StarRatingInput label="Maintenance" value={ratings.maintenance} onChange={v => setRatings({ ...ratings, maintenance: v })} />
                                <StarRatingInput label="Value for Money" value={ratings.value} onChange={v => setRatings({ ...ratings, value: v })} />
                                <StarRatingInput label="Noise Level" value={ratings.noise} onChange={v => setRatings({ ...ratings, noise: v })} />
                            </div>
                        </div>

                        {/* ── Written Review & Rent ── */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium">
                             <div className="flex items-center gap-3 mb-6">
                                <div className="bg-green-500 p-2 rounded-lg text-white">
                                    <Send className="h-4 w-4" />
                                </div>
                                <h2 className="text-xl font-black text-uiuc-navy uppercase tracking-tight">Experience & Rent</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700 text-xs uppercase tracking-wider">Monthly Rent You Paid (Optional)</Label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400">$</span>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 950"
                                            className="h-12 bg-gray-50 border-none rounded-xl pl-8"
                                            value={monthlyRent}
                                            onChange={e => setMonthlyRent(e.target.value)}
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total rent per person, per month.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">What should other students know? *</Label>
                                    <Textarea
                                        placeholder="Describe your experience — management response time, condition of the building, noise, internet..."
                                        required
                                        className="min-h-[200px] bg-gray-50 border-none rounded-xl p-4 resize-none"
                                        value={reviewText}
                                        onChange={e => setReviewText(e.target.value)}
                                    />
                                    <div className="flex justify-between items-center px-1">
                                        <span className={reviewText.length < 20 ? "text-[10px] font-bold text-red-400 uppercase tracking-widest" : "text-[10px] font-bold text-green-500 uppercase tracking-widest"}>
                                            {reviewText.length < 20 ? `${20 - reviewText.length} more characters needed` : "Review meets length requirements"}
                                        </span>
                                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{reviewText.length} chars</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Building Photo (Optional) ── */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-500 p-2 rounded-lg text-white">
                                    <Building2 className="h-4 w-4" />
                                </div>
                                <h2 className="text-xl font-black text-uiuc-navy uppercase tracking-tight">Building Photo</h2>
                            </div>
                            <div className="space-y-3">
                                <Label className="font-bold text-gray-700 text-xs uppercase tracking-wider">Image URL (Optional)</Label>
                                <Input
                                    type="url"
                                    placeholder="https://example.com/building.jpg"
                                    className="h-12 bg-gray-50 border-none rounded-xl"
                                    value={buildingImageUrl}
                                    onChange={e => setBuildingImageUrl(e.target.value)}
                                />
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Paste an image link if the current building photo is missing or wrong.</p>
                            </div>
                        </div>

                        {/* ── Review Photos ── */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-purple-500 p-2 rounded-lg text-white">
                                    <Camera className="h-4 w-4" />
                                </div>
                                <h2 className="text-xl font-black text-uiuc-navy uppercase tracking-tight">Review Gallery</h2>
                            </div>
                            
                            {/* Paste Zone */}
                            <div className="mb-8 p-10 border-4 border-dashed border-gray-100 rounded-[30px] bg-gray-50/50 flex flex-col items-center justify-center text-center gap-4 group hover:border-uiuc-orange/20 transition-colors">
                                <div className="bg-white p-4 rounded-2xl shadow-sm text-gray-300 group-hover:text-uiuc-orange transition-colors">
                                    <ImagePlus className="h-8 w-8" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-uiuc-navy uppercase tracking-tight">Paste Your Image</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Press Control V to paste your image</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {reviewImageUrls.map((url, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex gap-2">
                                            <Input
                                                type="url"
                                                placeholder={`Photo URL #${i + 1} (or paste above)`}
                                                className="h-12 bg-gray-50 border-none rounded-xl"
                                                value={url}
                                                onChange={e => updateReviewImage(i, e.target.value)}
                                            />
                                            {reviewImageUrls.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() => removeReviewImage(i)}
                                                    className="h-12 w-12 rounded-xl text-gray-400 hover:text-red-500"
                                                >
                                                    <X className="h-5 w-5" />
                                                </Button>
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
                                        onClick={addReviewImage}
                                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-uiuc-orange hover:text-uiuc-navy transition-colors mt-2"
                                    >
                                        <ImagePlus className="h-4 w-4" /> Add another photo
                                    </button>
                                )}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-uiuc-navy text-white h-16 md:h-20 rounded-3xl font-black uppercase text-base md:text-xl tracking-tighter hover:bg-uiuc-navy/90 shadow-xl transition-all hover:-translate-y-1 active:scale-[0.98] disabled:opacity-50"
                        >
                            {submitting ? (
                                <span className="flex items-center gap-3">
                                    <div className="h-5 w-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    Saving your verified review...
                                </span>
                            ) : (
                                <span className="flex items-center gap-3">
                                    {editReviewId ? "Update Review" : "Post My Review"} <CheckCircle className="h-6 w-6" />
                                </span>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Sidebar */}
                <div className="w-full md:w-72 space-y-6 shrink-0">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium text-center">
                        <div className="bg-uiuc-navy p-4 rounded-3xl text-white inline-block mb-6">
                            <ShieldAlert className="h-10 w-10" />
                        </div>
                        <h4 className="font-black text-uiuc-navy uppercase tracking-tight text-lg mb-2">Student Verification</h4>
                        <p className="text-gray-500 text-xs font-medium leading-relaxed">
                            Your <span className="font-bold text-uiuc-navy">@illinois.edu</span> account ensures every review is from a real UIUC student.
                        </p>
                    </div>

                    <div className="p-8 bg-uiuc-orange/5 rounded-3xl border border-uiuc-orange/10 space-y-4">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-uiuc-orange" />
                            <h4 className="font-black text-uiuc-navy uppercase tracking-tighter text-sm">Review Guidelines</h4>
                        </div>
                        <ul className="text-xs text-gray-600 font-bold uppercase tracking-wider space-y-3 leading-loose">
                            <li>• Must be a current/past tenant</li>
                            <li>• No landlord interaction</li>
                            <li>• One review per building</li>
                            <li>• Honest, non-abusive content</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function WriteReviewPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-32 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uiuc-navy" /></div>}>
            <WriteReviewForm slug={resolvedParams.slug} />
        </Suspense>
    );
}
