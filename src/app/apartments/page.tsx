"use client";

import { useEffect, useState } from "react";
import { getApartments } from "@/lib/api";
import { Apartment } from "@/lib/types";
import { ApartmentCard } from "@/components/apartment-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Search, SlidersHorizontal, MapPin } from "lucide-react";

export default function ApartmentsDirectory() {
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function load() {
            const data = await getApartments();
            setApartments(data);
            setLoading(false);
        }
        load();
    }, []);

    const filtered = apartments.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.management_company && a.management_company.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-5xl font-black text-uiuc-navy mb-4 tracking-tighter uppercase leading-none">
                    Discover <span className="text-uiuc-orange">Apt.ly</span>
                </h1>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Browse {apartments.length} Residential Buildings near UIUC campus</p>
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
                    <Select defaultValue="newest">
                        <SelectTrigger className="w-full md:w-[180px] h-14 rounded-xl border-gray-100 font-bold">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-none shadow-xl">
                            <SelectItem value="highest" className="font-bold">Highest Rated</SelectItem>
                            <SelectItem value="most-reviews" className="font-bold">Most Reviews</SelectItem>
                            <SelectItem value="newest" className="font-bold">Newly Added</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" className="h-14 px-6 gap-2 border-gray-100 rounded-xl font-bold hover:bg-gray-50">
                        <SlidersHorizontal className="h-4 w-4" />
                        <span className="hidden sm:inline">Filters</span>
                    </Button>
                </div>
            </div>

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
                                    reviewCount={apt.id === 'a1' ? 1 : 0}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
                            <Building className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                            <h3 className="text-2xl font-black text-uiuc-navy mb-2 uppercase tracking-tight">No buildings found</h3>
                            <p className="text-gray-500 font-medium">Try adjusting your search criteria or explore other areas.</p>
                            <Button
                                variant="link"
                                onClick={() => setSearchQuery("")}
                                className="text-uiuc-orange mt-4 font-black uppercase text-sm tracking-widest"
                            >
                                Clear all search
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
