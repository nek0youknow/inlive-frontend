import { Label } from "@/shared/ui/label"
import { MapPin } from "lucide-react"
import { Controller, UseFormReturn } from "react-hook-form"
import { SearchFormData } from "../model/schema"
import { useGetDistricts } from "@/entities/district/model/api/useGetDistricts"
import { District } from "@/entities/district/model/types"
import { Checkbox } from "@/shared/ui/checkbox"
import { ScrollArea } from "@/shared/ui/scroll-area"

interface DistrictMultiSelectProps {
    form: UseFormReturn<SearchFormData>
}

export function DistrictMultiSelect({ form }: DistrictMultiSelectProps) {
    const selectedCityId = form.watch("cityId")
    const { data: districts, isLoading } = useGetDistricts(
        selectedCityId ? Number(selectedCityId) : null
    )

    if (!selectedCityId) {
        return (
            <div className="flex flex-col gap-3 opacity-50">
                <Label className="flex gap-2 items-center text-gray-700 font-medium">
                    <MapPin width={18} height={18} className="text-green-600" />
                    Районы
                </Label>
                <div className="text-sm text-gray-500 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                    Сначала выберите город
                </div>
            </div>
        )
    }

    // Если идет загрузка
    if (isLoading) {
        return (
            <div className="flex flex-col gap-3">
                <Label className="flex gap-2 items-center text-gray-700 font-medium">
                    <MapPin width={18} height={18} className="text-green-600" />
                    Районы
                </Label>
                <div className="text-sm text-gray-500 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 animate-pulse">
                    Загрузка районов...
                </div>
            </div>
        )
    }

    // Если районов нет
    if (!districts || districts.length === 0) {
        return (
            <div className="flex flex-col gap-3">
                <Label className="flex gap-2 items-center text-gray-700 font-medium">
                    <MapPin width={18} height={18} className="text-green-600" />
                    Районы
                </Label>
                <div className="text-sm text-gray-500 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                    Районы не найдены
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            <Label className="flex gap-2 items-center text-gray-700 font-medium">
                <MapPin width={18} height={18} className="text-green-600" />
                Районы
            </Label>

            <Controller
                name="districtIds"
                control={form.control}
                render={({ field }) => {
                    const selectedIds = field.value || []

                    const handleToggle = (districtId: number) => {
                        const newValue = selectedIds.includes(districtId)
                            ? selectedIds.filter(id => id !== districtId)
                            : [...selectedIds, districtId]

                        field.onChange(newValue)
                    }

                    const handleSelectAll = () => {
                        if (selectedIds.length === districts.length) {
                            field.onChange([])
                        } else {
                            field.onChange(districts.map((d: District) => d.id))
                        }
                    }

                    return (
                        <div className="border rounded-lg p-4">
                            {/* Кнопка "Выбрать все" */}
                            <div className="flex items-center gap-3 pb-3 mb-3 border-b border-gray-200">
                                <Checkbox
                                    id="select-all-districts"
                                    checked={selectedIds.length === districts.length && districts.length > 0}
                                    onCheckedChange={handleSelectAll}
                                    className="w-5 h-5"
                                />
                                <label
                                    htmlFor="select-all-districts"
                                    className="text-sm font-medium text-gray-700 cursor-pointer"
                                >
                                    Выбрать все ({districts.length})
                                </label>
                            </div>

                            <ScrollArea className="h-[200px] pr-2">
                                <div className="flex flex-col gap-2">
                                    {districts.map((district: District) => (
                                        <label
                                            key={district.id}
                                            className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-white cursor-pointer transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`district-${district.id}`}
                                                    checked={selectedIds.includes(district.id)}
                                                    onCheckedChange={() => handleToggle(district.id)}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-sm text-gray-700">
                                                    {district.name}
                                                </span>
                                            </div>
                                            {district.averagePrice !== null && district.averagePrice !== undefined && (
                                                <div className="text-xs text-gray-500">
                                                    Средняя цена: {Number(district.averagePrice).toLocaleString("ru-RU")} тг
                                                </div>
                                            )}
                                        </label>
                                    ))}
                                </div>
                            </ScrollArea>

                            {selectedIds.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="text-xs text-gray-600">
                    Выбрано: {selectedIds.length} из {districts.length}
                  </span>
                                </div>
                            )}
                        </div>
                    )
                }}
            />
        </div>
    )
}