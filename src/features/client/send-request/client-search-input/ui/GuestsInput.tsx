import {Label} from "@/shared/ui/label";
import {User} from "lucide-react";
import {Input} from "@/shared/ui/input";
import {UseFormReturn} from "react-hook-form";
import {SearchFormData} from "@/features/client/send-request/client-search-input/model/schema";

interface GuestsInputProps {
    form: UseFormReturn<SearchFormData>
}

export function GuestsInput({form}:GuestsInputProps) {
    return (
        <div className="flex flex-col gap-3 flex-1">
            <Label htmlFor="countOfPeople" className="flex gap-2 items-center text-gray-700 font-medium">
                <User width={18} height={18} className="text-green-600" />
                Кол-во гостей
            </Label>
            <Input
                id="countOfPeople"
                type="number"
                placeholder="От 1 до 20"
                className={`h-10 ${form.formState.errors.countOfPeople ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}
                {...form.register("countOfPeople", { valueAsNumber: true })}
            />
        </div>
    )
}