import {DictionaryField} from "@/shared/ui/DataField";
import {Pencil} from "lucide-react";
import {Button} from "@/shared/ui/button";
import {Dictionary} from "@/entities/dictionary/model/types";

interface AccDictionariesInfoProps {
    services: Dictionary[],
    conditions: Dictionary[],
    onEdit?: () => void;
}

export function AccDictionariesInfo({services, conditions, onEdit}: AccDictionariesInfoProps) {
    return (
        <div className={"flex flex-col mt-6 sm:mt-8 md:mt-10 gap-2"}>
            <div className="flex flex-row items-center justify-between">
                <p className={"opacity-50 text-sm sm:text-base"}>Теги</p>
                {onEdit && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onEdit}
                        className="h-8 w-8"
                        aria-label="Редактировать теги"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <div className={"bg-gray-100 flex px-4 sm:px-6 md:px-7 py-4 sm:py-5 flex-col gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl border w-full h-fit"}>
                <DictionaryField label={"Услуги"} values={services}  />
                <DictionaryField label={"Условия"} values={conditions} />
            </div>
        </div>
    )
}