"use client";

import { useState, use } from "react";
import { useAuth } from "@/contexts/auth-context";
import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function WriteReviewPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const { user, is_verified, loading } = useAuth();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [ratings, setRatings] = useState({
        management: 0,
        maintenance: 0,
        value: 0,
        noise: 0,
    });
    const [monthlyRent, setMonthlyRent] = useState("");
    const [reviewText, setReviewText] = useState("");

    if (loading) return null;

    if (!user || !is_verified) {
        return (
            <div className="container mx-auto px-4 py-20 flex justify-center">
                <Card className="max-w-md w-full text-center p-6 border-red-100 bg-red-50">
                    <ShieldAlert className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-red-900 mb-2">Verified Student Account Required</h2>
                    <p className="text-red-700 mb-6">You must be logged in with a verified @illinois.edu email to leave a review. This ensures all reviews on Apt.ly come from real students.</p>
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

        if (!reviewText || reviewText.length < 20) {
            toast.error("Please provide a review with at least 20 characters.");
            return;
        }

        setSubmitting(true);
        // Simulate network delay
        await new Promise((r) => setTimeout(r, 1000));
        setSubmitting(false);
        toast.success("Review submitted successfully! Our community thanks you for the transparency.");
        router.push(`/apartments/${resolvedParams.slug}`);
    };

    const handleRatingChange = (category: keyof typeof ratings) => (val: number) => {
        setRatings(prev => ({ ...prev, [category]: val }));
    };

    const criteria = [
        { key: "management", label: "Property Management", desc: "Responsiveness and professionalism" },
        { key: "maintenance", label: "Maintenance", desc: "Speed and quality of repairs" },
        { key: "value", label: "Value for Money", desc: "Is the rent fair for the quality?" },
        { key: "noise", label: "Noise Level", desc: "Soundproofing and neighbor noise" },
    ] as const;

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-3xl font-extrabold text-uiuc-navy mb-8">Review this Apartment</h1>

            <form onSubmit={handleSubmit}>
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
                                    <StarRating
                                        rating={ratings[c.key]}
                                        interactive
                                        onRatingChange={handleRatingChange(c.key)}
                                        size="lg"
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="mb-8 border-none shadow-premium">
                    <CardHeader>
                        <CardTitle>Rent & Written Review</CardTitle>
                        <CardDescription>Reporting your rent helps create a transparent market for everyone.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="rent">Monthly Rent Paid (Optional)</Label>
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
                                placeholder="Describe your experience with management, the physical building, noise, internet, and any hidden costs..."
                                required
                                rows={8}
                                className="resize-none"
                                value={reviewText}
                                onChange={e => setReviewText(e.target.value)}
                            />
                            <div className="flex justify-between items-center text-[10px]">
                                <span className={reviewText.length < 20 ? "text-red-400" : "text-green-500"}>
                                    {reviewText.length < 20 ? `At least ${20 - reviewText.length} more characters needed` : "Good length!"}
                                </span>
                                <span className="text-gray-400">{reviewText.length} characters</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50/50 border-t flex justify-end gap-4 py-6 rounded-b-xl">
                        <Button variant="ghost" type="button" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={submitting} className="bg-uiuc-navy hover:bg-uiuc-navy/90 text-white min-w-[140px] shadow-lg">
                            {submitting ? "Submitting..." : "Submit My Review"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
