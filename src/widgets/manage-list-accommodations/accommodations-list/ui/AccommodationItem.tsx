"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AccommodationItemProps {
    id: string;
    name: string;
    imageURL: string;
    href?: string;
}

export function AccommodationItem({ imageURL, name, id, href }: AccommodationItemProps) {
    const linkHref = href || `/manager/accommodations/${id}`;
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsNavigating(true);
        router.push(linkHref);
    };

    return (
        <Link 
            href={linkHref} 
            className="w-full sm:w-[280px] md:w-[280px]"
            prefetch={false}
            onClick={handleClick}
        >
            <div
                className={`py-2 px-4 w-full h-32 sm:h-36 md:h-40 rounded-lg shadow-md/20 relative flex flex-col justify-end bg-cover bg-center hover:shadow-lg transition-shadow ${isNavigating ? 'opacity-50 cursor-wait' : ''}`}
                style={{ backgroundImage: `url(${imageURL})` }}
            >
                <div className={"absolute inset-0 rounded-lg bg-gradient-to-t from-black/50 to-transparent"}></div>
                <h3 className={"relative z-10 font-semibold text-base sm:text-lg md:text-xl text-white mb-1 line-clamp-2"}>{name}</h3>
                {isNavigating && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </Link>
    );
}