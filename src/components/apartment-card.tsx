"use client";

import { Apartment } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Building, MapPin, MessageSquare, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toggleFavorite } from "@/lib/api";
import { cn } from "@/lib/utils";

interface ApartmentCardProps {
    apartment: Apartment;
    reviewCount?: number;
}

export function ApartmentCard({ apartment, reviewCount = 0 }: ApartmentCardProps) {
    const [isFavorited, setIsFavorited] = useState(apartment.is_favorited || false);
    const [imgError, setImgError] = useState(false);

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        await toggleFavorite(apartment.id);
        setIsFavorited(!isFavorited);
    };

    const hasImage = apartment.image_url && !imgError;

    return (
        <Card className="overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500 group cursor-pointer h-full flex flex-col border-none bg-white rounded-3xl">
            <Link href={`/apartments/${apartment.slug}`} className="flex flex-col h-full relative">

                {/* Building photo — shown when image_url is set */}
                {hasImage && (
                    <div className="relative h-44 overflow-hidden bg-gray-100 rounded-t-3xl">
                        <img
                            src={apartment.image_url!}
                            alt={apartment.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            onError={() => setImgError(true)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                )}

                <CardContent className={cn("p-7 flex-1", hasImage ? "pt-5" : "pt-9")}>
                    {/* Favorite Button */}
                    <button
                        onClick={handleToggleFavorite}
                        className="absolute top-6 right-6 p-2 rounded-2xl hover:bg-gray-100 transition-all z-10 group/fav"
                        aria-label="Toggle favorite"
                    >
                        <Heart className={cn(
                            "h-5 w-5 transition-colors",
                            isFavorited ? "fill-red-500 text-red-500" : "text-gray-400 group-hover/fav:text-red-400"
                        )} />
                    </button>

                    <h3 className="text-xl font-black text-uiuc-navy group-hover:text-uiuc-orange transition-colors mb-2 pr-8 tracking-tight leading-tight">
                        {apartment.name}
                    </h3>
                    <p className="text-[10px] text-uiuc-navy/40 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-uiuc-orange" /> {apartment.address}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-medium italic">
                        {apartment.description || "No description provided."}
                    </p>
                </CardContent>

                <CardFooter className="p-7 pt-0 items-center justify-between flex-none mt-auto border-t border-gray-50 mt-4 pt-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-uiuc-navy/60">
                        <Building className="h-3.5 w-3.5" />
                        {apartment.management_company || "Independent"}
                    </div>
                    {reviewCount > 0 ? (
                        <div className="flex items-center gap-1.5 font-black text-[10px] text-uiuc-orange uppercase tracking-widest">
                            <MessageSquare className="h-4 w-4" />
                            {reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'}
                        </div>
                    ) : (
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No reviews</span>
                    )}
                </CardFooter>
            </Link>
        </Card>
    );
}
