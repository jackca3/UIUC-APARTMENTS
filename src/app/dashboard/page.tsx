"use client";

import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/star-rating";
import { Building, ShieldCheck, Mail, Calendar, Settings, FileText, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/login");
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uiuc-navy" />
            </div>
        );
    }

    // Mock data for dashboard
    const userReviews = [
        {
            id: "r1",
            apartmentName: "112 E Chalmers",
            date: "Oct 15, 2025",
            ratingOverall: 4.0,
            title: "Great location, decent management",
            body: "Loved living here for my junior year. Getting to classes on the quad was super easy.",
            helpfulVotes: 3,
        }
    ];

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
                                <span className="font-bold text-uiuc-navy text-lg">{userReviews.length}</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                <span className="text-gray-600 flex items-center gap-2"><Building className="h-4 w-4" /> Places lived</span>
                                <span className="font-bold text-uiuc-navy text-lg">{userReviews.length}</span>
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
                                </TabsList>
                            </CardHeader>
                            <CardContent className="pt-6">

                                <TabsContent value="reviews" className="mt-0 space-y-4 focus-visible:outline-none focus-visible:ring-0">
                                    {userReviews.length === 0 ? (
                                        <div className="text-center py-20 text-gray-500">
                                            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                            <p>You haven't posted any reviews yet.</p>
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
                                                            <Badge className="bg-uiuc-navy">{review.apartmentName}</Badge>
                                                            <span className="text-xs text-gray-400">{review.date}</span>
                                                        </div>
                                                        <h3 className="text-lg font-bold">{review.title}</h3>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-uiuc-orange">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <StarRating rating={review.ratingOverall} size="sm" />
                                                    <span className="text-sm font-semibold">{review.ratingOverall.toFixed(1)} Overall</span>
                                                </div>
                                                <p className="text-gray-700 text-sm mb-4">{review.body}</p>

                                                <div className="text-xs text-uiuc-navy font-semibold bg-blue-50 py-1.5 px-3 rounded-full inline-block">
                                                    {review.helpfulVotes} people found this helpful
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </TabsContent>

                                <TabsContent value="comments" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                                    <div className="text-center py-20 text-gray-500 border border-dashed rounded-xl bg-gray-50/50">
                                        <p>You haven't left any comments yet.</p>
                                    </div>
                                </TabsContent>

                            </CardContent>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    );
}
