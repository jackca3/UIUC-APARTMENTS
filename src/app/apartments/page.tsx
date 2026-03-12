"use client";

import { useEffect, useState } from "react";
import { getApartments } from "@/lib/api";
import { getUserReviews } from "@/lib/store";
import { Apartment } from "@/lib/types";
import { ApartmentCard } from "@/components/apartment-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Search, SlidersHorizontal, MapPin, X, Check } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SortOption = "newest" | "highest" | "most-reviews";

export default function ApartmentsDirectory() {
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Filter State
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());

    // Precomputed derived data
    const mockReviews = require('@/lib/mock-data').mockReviews;
    const allReviews = [...getUserReviews(), ...mockReviews];
    const companies = Array.from(new Set(apartments.filter(a => a.management_company).map(a => a.management_company!))).sort();


    useEffect(() => {
        async function load() {
            const data = await getApartments();
            setApartments(data);
            setLoading(false);
        }
        load();
    }, []);

    // 1. Calculate stats for each apartment (needed for filtering and sorting)
    const aptsWithStats = apartments.map(apt => {
        const aptReviews = allReviews.filter(r => r.apartment_id === apt.id);
        const reviewCount = aptReviews.length;
        const avgRating = reviewCount > 0 
            ? aptReviews.reduce((acc, r) => acc + (r.management_rating + r.maintenance_rating + r.value_rating + r.noise_rating) / 4, 0) / reviewCount
            : 0;
        return { ...apt, reviewCount, avgRating };
    });

    // 2. Filter
    let filtered = aptsWithStats.filter(a => {
        const matchesSearch = 
            a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (a.management_company && a.management_company.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesCompany = selectedCompanies.size === 0 || (a.management_company && selectedCompanies.has(a.management_company));

        return matchesSearch && matchesCompany;
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
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-5xl font-black text-uiuc-navy mb-4 tracking-tighter uppercase leading-none">
                        Discover <span className="text-uiuc-orange">Apt.ly</span>
                    </h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Browse {filtered.length} Residential Buildings near UIUC campus</p>
                </div>
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
                        variant={selectedCompanies.size > 0 ? "default" : "outline"} 
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn("h-14 px-6 gap-2 rounded-xl font-bold transition-all", 
                            selectedCompanies.size > 0 ? "bg-uiuc-navy hover:bg-black text-white" : "border-gray-100 hover:bg-gray-50"
                        )}
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        <span className="hidden sm:inline">Filters</span>
                        {selectedCompanies.size > 0 && (
                            <Badge className="ml-2 bg-uiuc-orange text-white border-none rounded-full px-2">
                                {selectedCompanies.size}
                            </Badge>
                        )}
                    </Button>
                </div>
            </div>

            {/* Expanded Filters Panel */}
            {showFilters && (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium mb-10 animate-in slide-in-from-top-4 fade-in duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black uppercase tracking-widest text-uiuc-navy">Filter by Company</h3>
                        <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)} className="rounded-full">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
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
                    {selectedCompanies.size > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                            <Button 
                                variant="ghost" 
                                onClick={() => setSelectedCompanies(new Set())}
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
                        <div className="flex flex-col items-center text-center py-24 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200 gap-6">
                            <div className="bg-white p-6 rounded-3xl shadow-premium">
                                <Building className="h-14 w-14 text-uiuc-orange" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-uiuc-navy uppercase tracking-tight">Can't find this apartment on Apt.ly yet?</h3>
                                <p className="text-gray-500 font-medium max-w-md">
                                    Be the first to add <span className="font-black text-uiuc-navy">"{searchQuery}"</span> to our database and leave the first review.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    asChild
                                    className="bg-uiuc-orange hover:bg-uiuc-orange/90 text-white h-14 px-10 rounded-2xl font-black uppercase tracking-widest shadow-premium transition-all hover:scale-[1.02] text-sm"
                                >
                                    <Link href={`/apartments/add-building?name=${encodeURIComponent(searchQuery)}`}>
                                        + Add This Building
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setSearchQuery("")}
                                    className="h-14 px-8 rounded-2xl font-bold border-gray-200 text-gray-500"
                                >
                                    Clear Search
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
