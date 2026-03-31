import {Controller, UseFormReturn} from "react-hook-form";
import {DateInputs} from "@/features/client/send-request/client-search-input/ui/DateInputs";
import {SearchFormData} from "@/features/client/send-request/client-search-input/model/schema";

interface DateInputControllerProps {
    form: UseFormReturn<SearchFormData>

}

export function DateInputController({form}:DateInputControllerProps) {
    const oneNight = form.watch("oneNight");
    
    return (
        <div className="flex-1">
            <Controller
                name="checkInDate"
                control={form.control}
                render={() => (
                    <DateInputs
                        value={{
                            from: form.watch("checkInDate"),
                            to: form.watch("checkOutDate")
                        }}
                        onChange={(dates) => {
                            form.setValue("checkInDate", dates?.from || "")
                            if (oneNight) {
                                // Если одна ночь, очищаем checkOutDate
                                form.setValue("checkOutDate", "")
                            } else {
                                form.setValue("checkOutDate", dates?.to || "")
                            }
                        }}
                        error={
                            form.formState.errors.checkInDate?.message ||
                            form.formState.errors.checkOutDate?.message
                        }
                        oneNight={oneNight}
                    />
                )}
            />
        </div>
    )
}