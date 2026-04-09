"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Label } from "@/components/ui/label";

interface StarRatingInputProps {
    label: string;
    value: number;
    onChange: (v: number) => void;
}

export function StarRatingInput({ label, value, onChange }: StarRatingInputProps) {
    const [hovered, setHovered] = useState(0);
    
    const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

    return (
        <div className="space-y-2">
            <Label className="font-bold text-gray-700 text-xs uppercase tracking-wider">{label}</Label>
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                    <button
                        key={s}
                        type="button"
                        onClick={() => onChange(s)}
                        onMouseEnter={() => setHovered(s)}
                        onMouseLeave={() => setHovered(0)}
                        className={`h-11 w-11 rounded-xl flex items-center justify-center transition-all ${
                            (hovered || value) >= s 
                                ? 'bg-uiuc-orange text-white scale-110 shadow-lg z-10' 
                                : 'bg-gray-50 text-gray-300 hover:bg-gray-100'
                        }`}
                    >
                        <Star className={`h-5 w-5 ${(hovered || value) >= s ? 'fill-current' : ''}`} />
                    </button>
                ))}
                {value > 0 && (
                    <span className="self-center ml-2 text-[10px] font-black text-uiuc-orange uppercase tracking-widest animate-in fade-in slide-in-from-left-2 duration-300">
                        {labels[value]}
                    </span>
                )}
            </div>
        </div>
    );
}
