import { Star } from "lucide-react";
import React from "react";

interface RatingStarsProps {
    rating?: number;
    max?: number;
    size?: number;
    color?: string;
    emptyColor?: string;
    className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
                                                            rating = 0,
                                                            max = 5,
                                                            size = 20,
                                                            color = "#facc15", // yellow-400
                                                            emptyColor = "#d1d5db", // gray-300
                                                            className = "",
                                                        }) => {
    const percentage = Math.min((rating / max) * 100, 100);

    return (
        <div className={`relative flex ${className}`}>
            {/* Пустые звезды */}
            <div className="flex">
                {[...Array(max)].map((_, i) => (
                    <Star key={`empty-${i}`} className="flex-shrink-0"
                          style={{ width: size, height: size, color: emptyColor }}
                    />
                ))}
            </div>

            <div
                className="absolute inset-0 flex overflow-hidden"
                style={{ width: `${percentage}%` }}
            >
                {[...Array(max)].map((_, i) => (
                    <Star key={`filled-${i}`} className="flex-shrink-0 fill-current"
                          style={{ width: size, height: size, color }}
                    />
                ))}
            </div>
        </div>
    );
};
