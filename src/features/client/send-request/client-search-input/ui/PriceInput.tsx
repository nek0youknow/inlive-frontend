import {Label} from "@/shared/ui/label";
import {DollarSignIcon} from "lucide-react";
import {Input} from "@/shared/ui/input";
import {UseFormReturn} from "react-hook-form";
import {SearchFormData} from "@/features/client/send-request/client-search-input/model/schema";

interface PriceInputProps {
    form: UseFormReturn<SearchFormData>
}

export function PriceInput({form}:PriceInputProps) {
    return (
        <div className="flex flex-col gap-3 flex-1">
            <Label htmlFor="price" className="flex gap-2 items-center text-gray-700 font-medium">
                <DollarSignIcon width={18} height={18} className="text-green-600" />
                Цена
            </Label>
            <Input
                id="price"
                type="number"
                placeholder="От 0 до 1000000"
                value={form.watch("price") ?? ""}
                onChange={(e) => {
                    const value = e.target.value
                    form.setValue("price", value === "" ? 0 : Number(value))
                }}
                className={`h-10 ${form.formState.errors.price ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}
            />

        </div>
    )
}