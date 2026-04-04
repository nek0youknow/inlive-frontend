"use client"
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/ui/dialog";
import {FileText, Home, MapPin, Package, Star, User} from "lucide-react";
import {ImageGallery} from "@/shared/ui/image-gallery";
import InfoItem from "@/shared/ui/info-item";
import {
    useGetAccommodationById
} from "@/features/admin/approve-accommodation/accommodation-table/model/api/useGetAccommodationById";
import {RatingStars} from "@/shared/ui/rating-stars";
import {Dictionary} from "@/entities/dictionary/model/types";
import {Badge} from "@/shared/ui/badge";

interface Props {
    id: string;
    openModal: boolean;
    setOpenModal: (openModal: boolean) => void;
}

export function AccommodationModal({openModal, setOpenModal, id} : Props) {



    const {data} = useGetAccommodationById(id)




    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogContent className="max-w-4xl max-h-[90vh] break-all overflow-y-auto">
                <>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            <Home className="w-7 h-7 text-primary" />
                            {data?.name}
                        </DialogTitle>
                    </DialogHeader>

                    {data?.imageUrls ? <ImageGallery images={data?.imageUrls} /> : null}

                    <div className="mt-6 space-y-6">
                        <InfoItem icon={MapPin} label="Адрес">
                            <p className="text-base">
                                {data?.address}, {data?.districtName},{" "}
                                {data?.cityName}
                            </p>
                        </InfoItem>

                        <InfoItem icon={FileText} label="Описание">
                            <p className="text-base text-gray-700 leading-relaxed">
                                {data?.description}
                            </p>
                        </InfoItem>

                        <InfoItem icon={Star} label="Рейтинг">
                            <div className="flex items-center gap-2">
                                <RatingStars rating={data?.rating || 0} />
                                <span className="text-lg font-semibold">
                                    {data?.rating.toFixed(1)} / 5.0
                                </span>
                            </div>
                        </InfoItem>

                        <InfoItem icon={User} label="ID Владельца">
                            <p className="text-base">{data?.ownerId}</p>
                        </InfoItem>
                        <InfoItem icon={Package} label="Услуги">
                            <div className="flex flex-wrap gap-2">
                                {data?.services.map((service:Dictionary) => {
                                    return (
                                        <Badge key={service.id} variant="secondary" className="flex items-center gap-1">
                                            {service.value}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </InfoItem>

                        <InfoItem icon={Package} label="Условия">
                            <div className="flex flex-wrap gap-2">
                                {data?.conditions.map((condition:Dictionary) => {
                                    return (
                                        <Badge key={condition.id} variant="secondary" className="flex items-center gap-1">
                                            {condition.value}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </InfoItem>
                    </div>
                </>
            </DialogContent>
        </Dialog>
    )
}