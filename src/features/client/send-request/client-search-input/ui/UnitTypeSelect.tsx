import {SearchFormData} from "@/features/client/send-request/client-search-input/model/schema";
import {Label} from "@/shared/ui/label";
import {Controller, UseFormReturn} from "react-hook-form";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select";
import {unitTypes} from "@/entities/accommodation-unit/model/constants";

interface UnitTypeSelectProps {
    form: UseFormReturn<SearchFormData>
}

export function UnitTypeSelect({form}:UnitTypeSelectProps) {
    return (
        <div className="flex flex-col gap-3">
            <Label className="text-gray-700 font-medium">Тип размещения</Label>
            <Controller
                name="unitType"
                control={form.control}
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full h-10">
                            <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {unitTypes?.map((item) => (
                                    <SelectItem value={String(item.key)} key={item.key}>
                                        {item.value}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    )
}