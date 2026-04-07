"use client"
import {SettingsIcon} from "lucide-react";
import {
    useGetAccommodationById
} from "@/features/manager/accommodations/accommodation-profile/model/api/useGetAccommodationById";
import {Badge} from "@/shared/ui/badge";
import Link from "next/link";

interface AccommodationHeaderProps {
    accommodationId: string
}

export function AccommodationHeader({accommodationId}: AccommodationHeaderProps) {

    const {data, isLoading, error} = useGetAccommodationById(accommodationId)

    if(isLoading) return <p>Loading...</p>

    if(error) return <p>{error.message}</p>

    return (
        <article>
            <section className={"p-4 sm:p-5 md:p-6 flex flex-col gap-3 sm:gap-4"}>
                <header className={"flex items-center justify-between gap-3 sm:gap-4"}>
                    <div className={"flex flex-row gap-2 sm:gap-4 items-center flex-1 min-w-0"}>
                        <h1 className={"text-xl sm:text-2xl font-semibold truncate"}>{data?.name}</h1>
                        {
                            data?.approved ? (
                                <Badge className="text-xs sm:text-sm flex-shrink-0">Подтвержден</Badge>
                            ) : null
                        }
                    </div>
                    <Link href={`/manager/accommodations/${accommodationId}/profile`} className="flex-shrink-0">
                        <SettingsIcon className={"opacity-60"} width={18} height={18} />
                    </Link>
                </header>
            </section>
        </article>
    )
}