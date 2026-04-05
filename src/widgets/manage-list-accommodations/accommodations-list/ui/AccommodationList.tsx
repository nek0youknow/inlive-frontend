"use client"
import {Accommodation} from "@/entities/accommodation/model/types";
import {Spinner} from "@/shared/ui/spinner";
import {
    AccommodationEmptyList
} from "@/widgets/manage-list-accommodations/accommodations-list/ui/AccommodationEmptyList";
import {AccommodationItem} from "@/widgets/manage-list-accommodations/accommodations-list/ui/AccommodationItem";
import {
    useGetMyAccommodations
} from "@/widgets/manage-list-accommodations/accommodations-list/model/api/useGetMyAccommodations";
import {accomodationList} from "@/widgets/manage-list-accommodations/accommodations-list/model/constants";

interface AccommodationListProps {
    hrefPattern?: string;
}

export function AccommodationList({ hrefPattern }: AccommodationListProps) {

    const {data: accommodations, isLoading, isError} = useGetMyAccommodations();

    if(accomodationList.length === 0) {
        return <AccommodationEmptyList />
    }

    if(isLoading) return <Spinner className={"w-full mx-auto size-7 my-10"} />

    if(isError) return <p>Error</p>

    return (
        <section className={"flex flex-wrap justify-center sm:justify-start flex-row gap-3 sm:gap-4 md:gap-5"}>
            {accommodations?.content?.map((accommodation:Accommodation) => {
                // Формируем href на основе шаблона
                const href = hrefPattern
                    ? hrefPattern.replace("{id}", accommodation.id)
                    : undefined;

                return (
                    <AccommodationItem
                        id={accommodation.id}
                        name={accommodation.name}
                        key={accommodation.id}
                        imageURL={accommodation.imageUrls ? accommodation.imageUrls[0] : ""}
                        href={href}
                    />
                );
            })}
        </section>
    )
}