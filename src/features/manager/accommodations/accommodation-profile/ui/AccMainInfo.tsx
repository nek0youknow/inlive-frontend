import {DataField} from "@/shared/ui/DataField";
import {Building, Building2, Captions, MapPin, ScrollText, Star, Pencil} from "lucide-react";
import {Button} from "@/shared/ui/button";

interface AccMainInfoProps {
    name: string;
    description: string;
    address: string,
    cityName: string,
    districtName: string,
    rating: number,
    onEdit?: () => void;
}

export function AccMainInfo({name, description, address, cityName, districtName, rating, onEdit}:AccMainInfoProps) {
    return (
        <div className={"flex flex-col mt-6 sm:mt-8 md:mt-10 gap-2"}>
            <div className="flex flex-row items-center justify-between">
                <p className={"opacity-50 text-sm sm:text-base"}>Основная информация</p>
                {onEdit && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onEdit}
                        className="h-8 w-8"
                        aria-label="Редактировать основную информацию"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <div className={"bg-gray-100 flex px-4 sm:px-6 md:px-7 py-4 sm:py-5 flex-col gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl border w-full h-fit"}>
                <DataField
                    icon={Captions}
                    label="Название"
                    value={name}
                />
                <DataField
                    icon={ScrollText}
                    label="Описание"
                    value={description}
                />
                <DataField
                    icon={MapPin}
                    label="Адрес"
                    value={address}
                />
                <div className={"flex flex-col sm:flex-row w-full gap-3 sm:gap-3 items-stretch sm:items-center"}>
                    <DataField
                        icon={Building2}
                        label="Город"
                        value={cityName}
                    />
                    <DataField
                        icon={Building}
                        label="Округ"
                        value={districtName}
                    />
                </div>
                <DataField
                    icon={Star}
                    label="Рейтинг"
                    value={String(rating)}
                />
            </div>
        </div>
    )
}