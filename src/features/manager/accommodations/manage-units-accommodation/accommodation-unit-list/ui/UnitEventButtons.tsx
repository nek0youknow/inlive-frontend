"use client"
import {Button} from "@/shared/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/shared/ui/dropdown-menu";
import {ChevronDown, Pencil} from "lucide-react";
import {useState} from "react";
import {
    AccommodationUnitModal
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/ui/AccommodationUnitModal";
import {
    useGetAccommodationUnitById
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/api/useGetAccommodationUnitById";
import {
    EditUnitMainInfoModal
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/ui/EditUnitMainInfoModal";
import {
    EditUnitDictionariesModal
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/ui/EditUnitDictionariesModal";
import {Dictionary} from "@/entities/dictionary/model/types";
import {
    EditUnitPhotosModal
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/ui/EditUnitPhotosModal";
import {
    EditUnitTariffsModal
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/ui/EditUnitTariffsModal";

interface UnitEventButtonsProps {
    unitId: string;
}

export function UnitEventButtons({unitId}:UnitEventButtonsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMainInfoOpen, setIsEditMainInfoOpen] = useState(false);
    const [isEditDictionariesOpen, setIsEditDictionariesOpen] = useState(false)
    const [isPhotosOpen, setIsPhotosOpen] = useState(false);
    const [isTariffsOpen, setIsTariffsOpen] = useState(false);

    const isModalsopen = isEditMainInfoOpen || isEditDictionariesOpen || isPhotosOpen;

    const { data: editUnitData } = useGetAccommodationUnitById(unitId, isModalsopen);


    return (
        <>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button size="sm" onClick={() => {
                    setIsModalOpen(true);
                }} className="w-full sm:w-auto">
                    Посмотреть
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size="sm"
                            variant="outline"
                            className="w-full sm:w-auto"
                        >
                            <Pencil className="h-4 w-4 mr-1" />
                            Изменить
                            <ChevronDown className="h-4 w-4 ml-1" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px] sm:w-auto">
                        <DropdownMenuItem onClick={() => {
                            setIsEditMainInfoOpen(true);
                        }} className="text-sm">
                            Основная информация
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            setIsEditDictionariesOpen(true);
                        }} className="text-sm">
                            Словари
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            setIsPhotosOpen(true);
                        }} className="text-sm">
                            Изображения
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            setIsTariffsOpen(true);
                        }} className="text-sm">
                            Тарифы
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


            <AccommodationUnitModal id={unitId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <EditUnitMainInfoModal
                open={isEditMainInfoOpen}
                setOpen={setIsEditMainInfoOpen}
                unitId={unitId}
                initialData={{
                    unitType: editUnitData?.unitType || "",
                    name: editUnitData?.name || "",
                    description: editUnitData?.description || "",
                    capacity: editUnitData?.capacity || 0,
                    area: editUnitData?.area || 0,
                    floor: editUnitData?.floor || 0,
                    isAvailable: editUnitData?.isAvailable ?? true,
                }}
            />
            <EditUnitDictionariesModal
                open={isEditDictionariesOpen}
                setOpen={setIsEditDictionariesOpen}
                unitId={unitId}
                initialServiceIds={editUnitData?.services?.map((s: Dictionary) => Number(s.id)) || []}
                initialConditionIds={editUnitData?.conditions?.map((c: Dictionary) => Number(c.id)) || []}
            />
            <EditUnitPhotosModal
                open={isPhotosOpen}
                initialImageUrls={editUnitData?.imageUrls || []}
                setOpen={setIsPhotosOpen}
                unitId={Number(unitId)}
            />
            <EditUnitTariffsModal
                open={isTariffsOpen}
                setOpen={setIsTariffsOpen}
                unitId={unitId}
            />
        </>
    )
}