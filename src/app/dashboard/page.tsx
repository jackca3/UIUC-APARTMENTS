"use client";

import { useAuth } from "@/contexts/auth-context";
import { getUserDashboardReviews, UserDashboardReview } from "@/lib/api";
import { getLaunchAnalyticsSummary, type LaunchAnalyticsSummary } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/star-rating";
import { Building, ShieldCheck, Mail, Calendar, Settings, FileText, Edit, Activity, TrendingUp, AlertTriangle, MousePointerClick } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [userReviews, setUserReviews] = useState<UserDashboardReview[]>([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [analyticsSummary, setAnalyticsSummary] = useState<LaunchAnalyticsSummary | null>(null);
    const [loadingAnalytics, setLoadingAnalytics] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        async function loadReviews() {
            if (!user) return;
            setLoadingReviews(true);
            setUserReviews(await getUserDashboardReviews(user.id));
            setLoadingReviews(false);
        }

        if (user) {
            loadReviews();
        }
    }, [user]);

    useEffect(() => {
        async function loadAnalytics() {
            try {
                setLoadingAnalytics(true);
                setAnalyticsSummary(await getLaunchAnalyticsSummary());
            } catch (error) {
                setAnalyticsSummary(null);
            } finally {
                setLoadingAnalytics(false);
            }
        }

        loadAnalytics();
    }, []);

    if (loading || !user) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uiuc-navy" />
            </div>
        );
    }

    const reviewCount = userReviews.length;
    const averageRating = useMemo(() => {
        if (!userReviews.length) return null;
        return userReviews.reduce((sum, review) => sum + review.overall_rating, 0) / userReviews.length;
    }, [userReviews]);

    return (
        <div className="container mx-auto px-4 py-10 max-w-5xl text-gray-900">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-uiuc-navy mb-2">My Dashboard</h1>
                    <p className="text-lg text-gray-600">Manage your profile and contributions</p>
                </div>
                <Button variant="outline" className="gap-2 shrink-0 border-gray-300">
                    <Settings className="h-4 w-4" /> Account Settings
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Profile Card Sidebar */}
                <div className="md:col-span-1 space-y-6">
                    <Card className="border-t-4 border-t-uiuc-navy">
                        <CardHeader className="text-center pb-2">
                            <div className="w-20 h-20 bg-uiuc-navy text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold shadow-sm">
                                {user.email?.substring(0, 1).toUpperCase()}
                            </div>
                            <CardTitle className="text-xl">Student User</CardTitle>
                            <CardDescription className="flex items-center justify-center gap-1 mt-1 text-green-600 font-medium">
                                <ShieldCheck className="h-4 w-4" /> Verified Student
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4 text-sm mt-4 border-t border-gray-50">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="truncate">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span>Joined August 2025</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg">Your Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                <span className="text-gray-600 flex items-center gap-2"><FileText className="h-4 w-4" /> Reviews</span>
                                <span className="font-bold text-uiuc-navy text-lg">{reviewCount}</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                <span className="text-gray-600 flex items-center gap-2"><Building className="h-4 w-4" /> Places lived</span>
                                <span className="font-bold text-uiuc-navy text-lg">{reviewCount}</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                <span className="text-gray-600 flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Avg rating</span>
                                <span className="font-bold text-uiuc-navy text-lg">{averageRating ? averageRating.toFixed(1) : "—"}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-2">
                    <Card className="min-h-[500px]">
                        <Tabs defaultValue="reviews" className="w-full">
                            <CardHeader className="border-b bg-gray-50/50 pb-0 pt-0 px-0 rounded-t-xl overflow-hidden">
                                <TabsList className="w-full justify-start h-14 rounded-none bg-transparent">
                                    <TabsTrigger
                                        value="reviews"
                                        className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-b-uiuc-navy data-[state=active]:shadow-none rounded-none py-4 px-6 font-medium text-base"
                                    >
                                        My Reviews
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="comments"
                                        className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-b-uiuc-navy data-[state=active]:shadow-none rounded-none py-4 px-6 font-medium text-base"
                                    >
                                        Comments & Votes
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="launch"
                                        className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-b-uiuc-navy data-[state=active]:shadow-none rounded-none py-4 px-6 font-medium text-base"
                                    >
                                        Launch Funnel
                                    </TabsTrigger>
                                </TabsList>
                            </CardHeader>
                            <CardContent className="pt-6">

                                <TabsContent value="reviews" className="mt-0 space-y-4 focus-visible:outline-none focus-visible:ring-0">
                                    {loadingReviews ? (
                                        <div className="space-y-4">
                                            {[1, 2].map((item) => (
                                                <div key={item} className="h-36 animate-pulse rounded-xl border border-gray-100 bg-gray-50" />
                                            ))}
                                        </div>
                                    ) : userReviews.length === 0 ? (
                                        <div className="text-center py-20 text-gray-500">
                                            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                            <p>You haven&apos;t posted any reviews yet.</p>
                                            <Button asChild className="mt-4 bg-uiuc-orange hover:bg-uiuc-orange/90 text-white">
                                                <Link href="/apartments">Find an Apartment to Review</Link>
                                            </Button>
                                        </div>
                                    ) : (
                                        userReviews.map(review => (
                                            <div key={review.id} className="border border-gray-100 rounded-xl p-5 hover:border-gray-300 transition-colors shadow-sm bg-white">
                                                <div className="flex justify-between items-start mb-3 border-b pb-3">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Badge className="bg-uiuc-navy">{review.apartment_name}</Badge>
                                                            <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                        <h3 className="text-lg font-bold">Verified apartment review</h3>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-gray-500 hover:text-uiuc-orange">
                                                            <Link href={`/apartments/${review.apartment_slug}/write-review?edit=${review.id}`}>
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <StarRating rating={review.overall_rating} size="sm" />
                                                    <span className="text-sm font-semibold">{review.overall_rating.toFixed(1)} Overall</span>
                                                </div>
                                                <p className="text-gray-700 text-sm mb-4">{review.written_review}</p>

                                                <div className="flex flex-wrap gap-2">
                                                    {review.monthly_rent_paid && (
                                                        <div className="text-xs text-uiuc-navy font-semibold bg-blue-50 py-1.5 px-3 rounded-full inline-block">
                                                            Paid ${Math.round(review.monthly_rent_paid)}/mo
                                                        </div>
                                                    )}
                                                    <Button asChild variant="outline" className="h-8 px-3 text-xs">
                                                        <Link href={`/apartments/${review.apartment_slug}`}>View apartment page</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </TabsContent>

                                <TabsContent value="comments" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                                    <div className="text-center py-20 text-gray-500 border border-dashed rounded-xl bg-gray-50/50">
                                        <p className="font-medium">Comments and helpful votes will appear here once that part of the product is active.</p>
                                        <p className="mt-3 text-sm text-gray-400">Right now, Apt.ly&apos;s live contribution system is centered on verified apartment reviews.</p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="launch" className="mt-0 space-y-6 focus-visible:outline-none focus-visible:ring-0">
                                    {loadingAnalytics ? (
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {[1, 2, 3, 4].map((item) => (
                                                <div key={item} className="h-32 animate-pulse rounded-xl border border-gray-100 bg-gray-50" />
                                            ))}
                                        </div>
                                    ) : analyticsSummary?.available === false ? (
                                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
                                                <div>
                                                    <p className="font-bold uppercase tracking-wider text-sm">Analytics setup still pending</p>
                                                    <p className="mt-2 text-sm leading-6">
                                                        {analyticsSummary.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : analyticsSummary ? (
                                        <>
                                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                                <MetricCard
                                                    icon={<MousePointerClick className="h-5 w-5" />}
                                                    label="Review CTA clicks"
                                                    value={analyticsSummary.totals.reviewCtaClicks}
                                                />
                                                <MetricCard
                                                    icon={<FileText className="h-5 w-5" />}
                                                    label="Review forms opened"
                                                    value={analyticsSummary.totals.reviewFormOpens}
                                                />
                                                <MetricCard
                                                    icon={<TrendingUp className="h-5 w-5" />}
                                                    label="Successful review submits"
                                                    value={analyticsSummary.totals.reviewSubmitSucceeded}
                                                />
                                                <MetricCard
                                                    icon={<AlertTriangle className="h-5 w-5" />}
                                                    label="Failed submits"
                                                    value={analyticsSummary.totals.reviewSubmitFailed}
                                                />
                                            </div>

                                            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center gap-2">
                                                            <Activity className="h-5 w-5 text-uiuc-orange" />
                                                            Launch funnel, last {analyticsSummary.windowDays} days
                                                        </CardTitle>
                                                        <CardDescription>
                                                            A simple view of where students are clicking, opening forms, and successfully contributing.
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="space-y-5">
                                                        <FunnelRow
                                                            label="CTA to successful review"
                                                            value={analyticsSummary.conversionRates.ctaToSubmitPercent}
                                                        />
                                                        <FunnelRow
                                                            label="Form open to successful review"
                                                            value={analyticsSummary.conversionRates.formToSubmitPercent}
                                                        />
                                                        <FunnelRow
                                                            label="Successful add-building submissions"
                                                            value={analyticsSummary.totals.addBuildingSubmitSucceeded}
                                                            suffix=""
                                                        />
                                                        <FunnelRow
                                                            label="Failed add-building submissions"
                                                            value={analyticsSummary.totals.addBuildingSubmitFailed}
                                                            suffix=""
                                                        />
                                                    </CardContent>
                                                </Card>

                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>Top apartment interest</CardTitle>
                                                        <CardDescription>
                                                            Which apartment pages are generating the most launch-funnel activity.
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent>
                                                        {analyticsSummary.topApartmentInterest.length === 0 ? (
                                                            <p className="text-sm text-gray-500">No tracked apartment activity yet.</p>
                                                        ) : (
                                                            <div className="space-y-3">
                                                                {analyticsSummary.topApartmentInterest.map((item) => (
                                                                    <div key={item.apartmentSlug} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                                                                        <span className="font-medium text-uiuc-navy">{item.apartmentSlug}</span>
                                                                        <Badge variant="secondary">{item.count} events</Badge>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </div>

                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Recent friction signals</CardTitle>
                                                    <CardDescription>
                                                        The latest failed review or add-building attempts captured by the app.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    {analyticsSummary.recentFailures.length === 0 ? (
                                                        <p className="text-sm text-gray-500">No recent failures recorded.</p>
                                                    ) : (
                                                        <div className="space-y-3">
                                                            {analyticsSummary.recentFailures.map((failure, index) => (
                                                                <div key={`${failure.createdAt}-${index}`} className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                                                                    <div className="flex flex-wrap items-center gap-2">
                                                                        <Badge className="bg-red-600">{failure.eventName}</Badge>
                                                                        {failure.apartmentSlug && (
                                                                            <span className="text-xs font-semibold uppercase tracking-wider text-red-700">
                                                                                {failure.apartmentSlug}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <p className="mt-2 text-sm font-medium text-red-900">{failure.reason}</p>
                                                                    <p className="mt-1 text-xs text-red-700">
                                                                        {new Date(failure.createdAt).toLocaleString()}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </>
                                    ) : (
                                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
                                            Launch analytics could not be loaded right now.
                                        </div>
                                    )}
                                </TabsContent>

                            </CardContent>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
    return (
        <Card>
            <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-uiuc-orange/10 text-uiuc-orange">
                    {icon}
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
                    <p className="mt-1 text-3xl font-black text-uiuc-navy">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}

function FunnelRow({ label, value, suffix = "%" }: { label: string; value: number | null; suffix?: string }) {
    return (
        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
            <span className="text-sm font-medium text-gray-600">{label}</span>
            <span className="text-lg font-black text-uiuc-navy">
                {value === null ? "—" : `${value}${suffix}`}
            </span>
        </div>
    );
}
