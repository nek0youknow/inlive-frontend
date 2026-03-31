import { Checkbox } from "@/shared/ui/checkbox"
import { Moon } from "lucide-react"
import { Controller, UseFormReturn } from "react-hook-form"
import { SearchFormData } from "../model/schema"

interface OneNightCheckboxProps {
    form: UseFormReturn<SearchFormData>
}

export function OneNightCheckbox({ form }: OneNightCheckboxProps) {
    return (
        <label className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md cursor-pointer transition-all duration-200">
            <Controller
                name="oneNight"
                control={form.control}
                render={({ field }) => (
                    <Checkbox
                        id="oneNight"
                        checked={field.value}
                        onCheckedChange={(checked) => {
                            field.onChange(checked);
                            // При включении галочки очищаем checkOutDate
                            if (checked) {
                                form.setValue("checkOutDate", "");
                            }
                        }}
                        className="w-5 h-5"
                    />
                )}
            />
            <div className="flex items-center gap-2">
                <Moon width={18} height={18} className="text-green-600" />
                <span className="text-sm font-medium text-gray-700">Только на одну ночь</span>
            </div>
        </label>
    )
}