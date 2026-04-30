"use client";

import { useEffect, useState } from "react";
import { getApartments } from "@/lib/api";
import { Apartment, ReviewWithAuthor } from "@/lib/types";
import { ApartmentCard } from "@/components/apartment-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Search, SlidersHorizontal, X, Check } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StarRatingInput } from "@/components/star-rating-input";

type SortOption = "newest" | "highest" | "most-reviews";

export default function ApartmentsDirectory() {
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [allReviews, setAllReviews] = useState<ReviewWithAuthor[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Filter State
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());
    const [minRatings, setMinRatings] = useState({
        management: 0,
        maintenance: 0,
        value: 0,
        noise: 0
    });

    const activeFiltersCount = selectedCompanies.size + Object.values(minRatings).filter(v => v > 0).length;
    const companies = Array.from(new Set(apartments.filter(a => a.management_company).map(a => a.management_company!))).sort();

    useEffect(() => {
        async function load() {
            // Load apartments from Supabase (or mock fallback)
            const apts = await getApartments();
            setApartments(apts);

            // Load all reviews — Supabase or mock fallback
            if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
                // Fetch reviews for all apartments in parallel
                const { createClient } = await import('@/lib/supabase');
                const supabase = createClient();
                const { data } = await supabase
                    .from('reviews')
                    .select('*');
                setAllReviews(data ?? []);
            } else {
                const { mockReviews } = await import('@/lib/mock-data');
                setAllReviews(mockReviews);
            }

            setLoading(false);
        }
        load();
    }, []);

    // 1. Calculate stats for each apartment (needed for filtering and sorting)
    const aptsWithStats = apartments.map(apt => {
        const aptReviews = allReviews.filter(r => r.apartment_id === apt.id);
        const reviewCount = aptReviews.length;
        
        let avgManagement = 0;
        let avgMaintenance = 0;
        let avgValue = 0;
        let avgNoise = 0;
        let avgRating = 0;

        if (reviewCount > 0) {
            avgManagement = aptReviews.reduce((acc, r) => acc + r.management_rating, 0) / reviewCount;
            avgMaintenance = aptReviews.reduce((acc, r) => acc + r.maintenance_rating, 0) / reviewCount;
            avgValue = aptReviews.reduce((acc, r) => acc + r.value_rating, 0) / reviewCount;
            avgNoise = aptReviews.reduce((acc, r) => acc + r.noise_rating, 0) / reviewCount;
            avgRating = (avgManagement + avgMaintenance + avgValue + avgNoise) / 4;
        }

        return { ...apt, reviewCount, avgRating, avgManagement, avgMaintenance, avgValue, avgNoise };
    });

    // 2. Filter
    let filtered = aptsWithStats.filter(a => {
        const matchesSearch = 
            a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (a.management_company && a.management_company.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesCompany = selectedCompanies.size === 0 || (a.management_company && selectedCompanies.has(a.management_company));
        
        const meetsRatings = 
            a.avgManagement >= minRatings.management &&
            a.avgMaintenance >= minRatings.maintenance &&
            a.avgValue >= minRatings.value &&
            a.avgNoise >= minRatings.noise;

        return matchesSearch && matchesCompany && meetsRatings;
    });

    // 3. Sort
    filtered = filtered.sort((a, b) => {
        if (sortBy === "highest") return b.avgRating - a.avgRating;
        if (sortBy === "most-reviews") return b.reviewCount - a.reviewCount;
        // newest (by id hack since we don't have created_at on all mock data reliably)
        return b.id.localeCompare(a.id);
    });

    const toggleCompany = (company: string) => {
        const newSet = new Set(selectedCompanies);
        if (newSet.has(company)) newSet.delete(company);
        else newSet.add(company);
        setSelectedCompanies(newSet);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-black text-uiuc-navy mb-4 tracking-tighter uppercase leading-none">
                        Discover <span className="text-uiuc-orange">Apt.ly</span>
                    </h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Browse {filtered.length} Residential Buildings near UIUC campus</p>
                    <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-gray-500">
                        Can't find your building yet? Add it once and leave the first verified review so the next student does not have to search in the dark.
                    </p>
                </div>
                <Button asChild className="bg-uiuc-navy hover:bg-black text-white px-8 h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-premium transition-all hover:scale-105 active:scale-95">
                    <Link href="/apartments/add-building">
                        + Add a Missing Building
                    </Link>
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-premium mb-10 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for your next building..."
                        className="pl-14 h-16 text-lg w-full rounded-2xl border-none bg-gray-50 focus:bg-white transition-colors"
                    />
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <Select value={sortBy} onValueChange={(val) => setSortBy(val as SortOption)}>
                        <SelectTrigger className="w-full md:w-[180px] h-14 rounded-xl border-gray-100 font-bold">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-none shadow-xl">
                            <SelectItem value="highest" className="font-bold">Highest Rated</SelectItem>
                            <SelectItem value="most-reviews" className="font-bold">Most Reviews</SelectItem>
                            <SelectItem value="newest" className="font-bold">Newly Added</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button 
                        variant={activeFiltersCount > 0 ? "default" : "outline"} 
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn("h-14 px-6 gap-2 rounded-xl font-bold transition-all", 
                            activeFiltersCount > 0 ? "bg-uiuc-navy hover:bg-black text-white" : "border-gray-100 hover:bg-gray-50"
                        )}
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        <span className="hidden sm:inline">Filters</span>
                        {activeFiltersCount > 0 && (
                            <Badge className="ml-2 bg-uiuc-orange text-white border-none rounded-full px-2">
                                {activeFiltersCount}
                            </Badge>
                        )}
                    </Button>
                </div>
            </div>

            {/* Expanded Filters Panel */}
            {showFilters && (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium mb-10 animate-in slide-in-from-top-4 fade-in duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black uppercase tracking-widest text-uiuc-navy">Refine Your Search</h3>
                        <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)} className="rounded-full">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Company Filter */}
                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">By Management Company</h4>
                            <div className="flex flex-wrap gap-3">
                                {companies.map(company => {
                                    const isSelected = selectedCompanies.has(company);
                                    return (
                                        <button
                                            key={company}
                                            onClick={() => toggleCompany(company)}
                                            className={cn(
                                                "px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all flex items-center gap-2",
                                                isSelected 
                                                    ? "border-uiuc-navy bg-uiuc-navy text-white" 
                                                    : "border-gray-100 bg-white text-gray-500 hover:border-gray-300"
                                            )}
                                        >
                                            {isSelected && <Check className="h-4 w-4" />}
                                            {company}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Ratings Filter */}
                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Minimum Student Ratings</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                <StarRatingInput label="Management" value={minRatings.management} onChange={v => setMinRatings(prev => ({...prev, management: v === prev.management ? 0 : v}))} />
                                <StarRatingInput label="Maintenance" value={minRatings.maintenance} onChange={v => setMinRatings(prev => ({...prev, maintenance: v === prev.maintenance ? 0 : v}))} />
                                <StarRatingInput label="Value" value={minRatings.value} onChange={v => setMinRatings(prev => ({...prev, value: v === prev.value ? 0 : v}))} />
                                <StarRatingInput label="Noise" value={minRatings.noise} onChange={v => setMinRatings(prev => ({...prev, noise: v === prev.noise ? 0 : v}))} />
                            </div>
                            <p className="text-[10px] text-gray-400 mt-3 font-medium italic">Click a star rating again to clear it.</p>
                        </div>
                    </div>

                    {activeFiltersCount > 0 && (
                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                            <Button 
                                variant="ghost" 
                                onClick={() => {
                                    setSelectedCompanies(new Set());
                                    setMinRatings({ management: 0, maintenance: 0, value: 0, noise: 0 });
                                }}
                                className="text-red-500 font-bold hover:bg-red-50 hover:text-red-600"
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="h-[420px] bg-white animate-pulse rounded-2xl border border-gray-50" />
                    ))}
                </div>
            ) : (
                <>
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filtered.map(apt => (
                                <ApartmentCard
                                    key={apt.id}
                                    apartment={apt}
                                    reviewCount={apt.reviewCount}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-20">
                            {/* Prominent CTA for adding new data */}
                            <div className="relative overflow-hidden bg-uiuc-navy p-12 md:p-20 rounded-[40px] shadow-premium text-white text-center group">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                                <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
                                    <div className="bg-uiuc-orange/20 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-md border border-uiuc-orange/30">
                                        <Building className="h-12 w-12 text-uiuc-orange" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                                            Missing a Building?
                                        </h3>
                                        <p className="text-xl text-white/60 font-medium leading-relaxed italic">
                                            "Be the visionary who adds the first verified report for this location."
                                        </p>
                                    </div>
                                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <Button
                                            asChild
                                            className="bg-uiuc-orange hover:bg-white hover:text-uiuc-navy text-white h-20 px-12 rounded-[30px] font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95 text-sm"
                                        >
                                            <Link href={`/apartments/add-building?name=${encodeURIComponent(searchQuery)}`}>
                                                + Add "{searchQuery || "New Building"}"
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => setSearchQuery("")}
                                            className="h-20 px-10 rounded-[30px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                                        >
                                            Clear search
                                        </Button>
                                    </div>
                                </div>
                                <Search className="absolute -bottom-10 -left-10 h-64 w-64 text-white/5 rotate-12 pointer-events-none" />
                            </div>

                            {/* Recommendations Section */}
                            <div className="space-y-10">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-8">
                                    <div>
                                        <h2 className="text-3xl font-black text-uiuc-navy uppercase tracking-tighter">Recommended Alternatives</h2>
                                        <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">Highest rated student favorites on campus</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {aptsWithStats
                                        .sort((a, b) => b.avgRating - a.avgRating)
                                        .slice(0, 4)
                                        .map(apt => (
                                            <ApartmentCard
                                                key={apt.id}
                                                apartment={apt}
                                                reviewCount={apt.reviewCount}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
