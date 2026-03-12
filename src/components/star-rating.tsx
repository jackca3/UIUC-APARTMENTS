import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    max?: number;
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
    size?: "sm" | "md" | "lg";
}

export function StarRating({
    rating,
    max = 5,
    interactive = false,
    onRatingChange,
    size = "md"
}: StarRatingProps) {

    const sizeClasses = {
        sm: "h-3 w-3",
        md: "h-5 w-5",
        lg: "h-8 w-8"
    };

    return (
        <div className="flex items-center gap-1">
            {[...Array(max)].map((_, i) => {
                const value = i + 1;
                const filled = value <= rating;

                return (
                    <button
                        key={i}
                        type={interactive ? "button" : undefined}
                        onClick={() => interactive && onRatingChange?.(value)}
                        disabled={!interactive}
                        className={`
              ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}
              ${interactive && !filled ? "hover:text-yellow-400" : ""}
            `}
                    >
                        <Star
                            className={`
                ${sizeClasses[size]}
                ${filled ? "fill-yellow-400 text-yellow-500" : "fill-transparent text-gray-300"}
                transition-colors
              `}
                        />
                    </button>
                );
            })}
        </div>
    );
}
