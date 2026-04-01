"use client"
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState, ReactNode} from "react";

interface RequestItemLinkProps {
    requestId: number;
    children: ReactNode;
}

export function RequestItemLink({requestId, children}: RequestItemLinkProps) {
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsNavigating(true);
        router.push(`/client/requests/${requestId}`);
    };

    return (
        <Link 
            href={`/client/requests/${requestId}`}
            prefetch={false}
            onClick={handleClick}
            className={isNavigating ? 'opacity-50 cursor-wait pointer-events-none' : ''}
        >
            <div className="relative">
                {children}
                {isNavigating && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl z-10">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </Link>
    );
}

