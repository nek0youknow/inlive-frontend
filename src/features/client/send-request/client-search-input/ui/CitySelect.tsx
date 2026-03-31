import { Label } from "@/shared/ui/label"
import { User } from "lucide-react"
import { Controller, UseFormReturn } from "react-hook-form"
import { SearchFormData } from "../model/schema"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { City } from "@/entities/city/model/types"
import { useGetCities } from "@/entities/city/model/api/useGetCities"

interface CitySelectProps {
    form: UseFormReturn<SearchFormData>
}

export function CitySelect({ form }: CitySelectProps) {
    const { data: cities } = useGetCities()

    return (
        <div className="flex flex-col gap-3 flex-1">
            <Label htmlFor="cityId" className="flex gap-2 items-center text-gray-700 font-medium">
                <User width={18} height={18} className="text-green-600" />
                Город
            </Label>
            <Controller
                name="cityId"
                control={form.control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger
                            id="cityId"
                            className={`w-full  ${form.formState.errors.cityId ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}
                        >
                            <SelectValue  placeholder="Выберите город" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {cities?.map((item: City) => (
                                    <SelectItem value={String(item.id)} key={item.id}>
                                        {item.name}
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