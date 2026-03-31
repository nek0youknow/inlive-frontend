import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Star } from "lucide-react"
import { Controller, UseFormReturn } from "react-hook-form"
import { SearchFormData } from "../model/schema"

interface RatingRangeInputProps {
    form: UseFormReturn<SearchFormData>
}

export function RatingRangeInput({ form }: RatingRangeInputProps) {
    return (
        <div className="flex flex-col gap-3">
            <Label className="flex gap-2 items-center text-gray-700 font-medium">
                <Star width={18} height={18} className="text-yellow-500" />
                Рейтинг (от - до)
            </Label>
            <div className="flex gap-4 items-center">
                <Controller
                    name="fromRating"
                    control={form.control}
                    render={({ field }) => (
                        <div className="flex-1">
                            <Input
                                type="number"
                                min={0}
                                max={5}
                                step={0.1}
                                placeholder="От"
                                value={field.value}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                className="h-10"
                            />
                        </div>
                    )}
                />
                <span className="text-gray-500">—</span>
                <Controller
                    name="toRating"
                    control={form.control}
                    render={({ field }) => (
                        <div className="flex-1">
                            <Input
                                type="number"
                                min={0}
                                max={5}
                                step={0.1}
                                placeholder="До"
                                value={field.value}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 5)}
                                className="h-10"
                            />
                        </div>
                    )}
                />
            </div>
            {form.formState.errors.toRating && (
                <p className="text-sm text-red-600">{form.formState.errors.toRating.message}</p>
            )}
        </div>
    )
}