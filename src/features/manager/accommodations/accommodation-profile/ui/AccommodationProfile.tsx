"use client"
import {useState} from "react";
import {AccMainInfo} from "@/features/manager/accommodations/accommodation-profile/ui/AccMainInfo";
import {AccDictionariesInfo} from "@/features/manager/accommodations/accommodation-profile/ui/AccDictionariesInfo";
import {
    useGetAccommodationById
} from "@/features/manager/accommodations/accommodation-profile/model/api/useGetAccommodationById";
import {ImageGallery} from "@/shared/ui/image-gallery";
import {EditMainInfoModal, EditTagsModal, EditPhotosModal} from "@/features/manager/accommodations/accommodation-profile/ui";
import {Button} from "@/shared/ui/button";
import {Pencil} from "lucide-react";
import { Spinner } from "@/shared/ui/spinner";
import {Dictionary} from "@/entities/dictionary/model/types";

interface AccommodationProfileProps {
    accommodationId: string
}

export function AccommodationProfile({accommodationId}:AccommodationProfileProps) {
    const [isMainInfoOpen, setIsMainInfoOpen] = useState(false);
    const [isTagsOpen, setIsTagsOpen] = useState(false);
    const [isPhotosOpen, setIsPhotosOpen] = useState(false);

    const {data, isLoading, error} = useGetAccommodationById(accommodationId);

    if(isLoading) return <Spinner className={"w-full mx-auto size-7 my-6 sm:my-8 md:my-10"} />

    if (error) return <p className="px-4 sm:px-6 text-sm sm:text-base text-red-600">{error.message}</p>

    return (
        <div className={"flex flex-col mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-0"}>
            <div className={"flex flex-col gap-2 mt-6 sm:mt-8 md:mt-10"}>
                <div className="flex flex-row items-center justify-between">
                    <p className={"opacity-50 text-sm sm:text-base"}>Фотографии</p>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsPhotosOpen(true)}
                        className="h-8 w-8"
                        aria-label="Редактировать фотографии"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                </div>
                <div className={"flex flex-row w-full mx-auto gap-3 sm:gap-4 md:gap-5"}>
                    <ImageGallery images={data?.imageUrls} />
                </div>
            </div>
            <AccMainInfo
                name={data?.name}
                description={data?.description}
                address={data?.address}
                cityName={data?.cityName}
                districtName={data?.districtName}
                rating={data?.rating}
                onEdit={() => setIsMainInfoOpen(true)}
            />
            <AccDictionariesInfo
                services={data?.services}
                conditions={data?.conditions}
                onEdit={() => setIsTagsOpen(true)}
            />

            <EditMainInfoModal
                open={isMainInfoOpen}
                setOpen={setIsMainInfoOpen}
                accommodationId={Number(accommodationId)}
                initialData={{
                    name: data?.name || "",
                    description: data?.description || "",
                    address: data?.address || "",
                    cityId: data?.cityId ? String(data.cityId) : "",
                    districtId: data?.districtId ? String(data.districtId) : "",
                    rating: data?.rating || 0,
                }}
            />

            <EditTagsModal
                open={isTagsOpen}
                setOpen={setIsTagsOpen}
                accommodationId={Number(accommodationId)}
                initialServiceIds={(data?.services || []).map((s:Dictionary) => Number(s.id))}
                initialConditionIds={(data?.conditions || []).map((c:Dictionary) => Number(c.id))}
            />


            <EditPhotosModal
                open={isPhotosOpen}
                setOpen={setIsPhotosOpen}
                accommodationId={Number(accommodationId)}
                initialImageUrls={data?.imageUrls || []}
            />
        </div>
    )
}