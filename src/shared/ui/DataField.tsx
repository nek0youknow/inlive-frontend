import { Label } from "@/shared/ui/label";
import {Dictionary} from "@/entities/dictionary/model/types";

interface DataFieldProps {
    icon: React.ElementType;
    label: string;
    value: string;
}

export function DataField({ icon: Icon, label, value }: DataFieldProps) {
    return (
        <div className="flex flex-col w-full gap-2">
            <Label className="text-sm sm:text-base">{label}</Label>
            <div className="w-full gap-2 sm:gap-3 min-h-12 items-center flex flex-row p-1 sm:p-2 px-3 sm:px-4 h-fit bg-white rounded-lg sm:rounded-xl border">
                <Icon className="min-w-4 h-4 sm:min-w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                <p className={"break-all text-sm sm:text-base"}>{value}</p>
            </div>
        </div>
    );
}

interface DictionaryFieldProps {
    label: string;
    values?: Dictionary[];
}

export function DictionaryField({ label, values }: DictionaryFieldProps) {
    return (
        <div className="flex flex-col w-full gap-2">
            <Label className="text-sm sm:text-base">{label}</Label>
            <div className="w-full gap-2 sm:gap-3 items-center flex flex-row p-3 sm:p-4 min-h-12 flex-wrap bg-white rounded-lg sm:rounded-xl border">
                {values ? values.map((value) => (
                    <p className={"text-xs sm:text-sm border rounded-full px-3 sm:px-4 py-1 bg-[#D1E1FF] border-[#355694]"} key={value?.id}>{value?.value}</p>
                )): (
                    <p className={"opacity-50 text-sm sm:text-base"}>Пока пусто</p>
                )}
            </div>
        </div>
    )
}
