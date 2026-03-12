import { Apartment } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, MessageSquare, Star, Heart } from "lucide-react";
import Link from "next/link";
import { getStreetViewUrl } from "@/lib/utils";
import { useState } from "react";
import { toggleFavorite } from "@/lib/api";
import { cn } from "@/lib/utils";

interface ApartmentCardProps {
    apartment: Apartment;
    reviewCount?: number;
}

export function ApartmentCard({ apartment, reviewCount = 0 }: ApartmentCardProps) {
    const [isFavorited, setIsFavorited] = useState(apartment.is_favorited || false);
    
    // Improved automated image fallback system
    const streetView = getStreetViewUrl(apartment.address);
    const placeholder = `https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800&h=600`;
    
    const [imgSrc, setImgSrc] = useState(apartment.image_url || streetView);
    const [fallbackStep, setFallbackStep] = useState(apartment.image_url ? 0 : 1);

    const handleImageError = () => {
        if (fallbackStep === 0) {
            // First failure: Try Street View
            setImgSrc(streetView);
            setFallbackStep(1);
        } else if (fallbackStep === 1) {
            // Second failure: Try High-res Placeholder
            setImgSrc(placeholder);
            setFallbackStep(2);
        }
    };

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        await toggleFavorite(apartment.id);
        setIsFavorited(!isFavorited);
    };

    return (
        <Card className="overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500 group cursor-pointer h-full flex flex-col border-none bg-white rounded-3xl">
            <Link href={`/apartments/${apartment.slug}`} className="flex flex-col h-full">
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                    <img
                        src={imgSrc}
                        alt={apartment.name}
                        onError={handleImageError}
                        loading="eager"
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Favorite Button */}
                    <button 
                        onClick={handleToggleFavorite}
                        className="absolute top-4 right-4 p-2.5 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg hover:bg-white transition-all z-10 group/fav"
                    >
                        <Heart className={cn(
                            "h-5 w-5 transition-colors",
                            isFavorited ? "fill-red-500 text-red-500" : "text-gray-400 group-hover/fav:text-red-400"
                        )} />
                    </button>
                </div>
                <CardContent className="p-7 flex-1">
                    <h3 className="text-xl font-black text-uiuc-navy group-hover:text-uiuc-orange transition-colors mb-2 tracking-tight leading-tight">
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
