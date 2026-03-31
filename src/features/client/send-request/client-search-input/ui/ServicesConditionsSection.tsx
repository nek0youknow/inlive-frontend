import {Label} from "@/shared/ui/label";
import {Check} from "lucide-react";
import {Controller, UseFormReturn} from "react-hook-form";
import {SelectDictionary} from "@/widgets/select-dictionary/ui/SelectDictionary";
import {SearchFormData} from "@/features/client/send-request/client-search-input/model/schema";

interface ServicesConditionsSectionProps {
    form: UseFormReturn<SearchFormData>
}

export function ServicesConditionsSection({form}:ServicesConditionsSectionProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
                <Label className="flex gap-2 items-center text-gray-700 font-medium">
                    <Check width={18} height={18} className="text-green-600" />
                    Услуги
                </Label>
                <Controller
                    name="serviceDictionaryIds"
                    control={form.control}
                    render={({ field }) => (
                        <SelectDictionary
                            className="w-full"
                            value={field.value || []}
                            onChange={field.onChange}
                            type="ACC_SERVICE"
                        />
                    )}
                />
            </div>

            <div className="flex flex-col gap-3">
                <Label className="flex gap-2 items-center text-gray-700 font-medium">
                    <Check width={18} height={18} className="text-green-600" />
                    Условия
                </Label>
                <Controller
                    name="conditionDictionaryIds"
                    control={form.control}
                    render={({ field }) => (
                        <SelectDictionary
                            className="w-full"
                            value={field.value || []}
                            onChange={field.onChange}
                            type="ACC_CONDITION"
                        />
                    )}
                />
            </div>
        </div>
    )
}