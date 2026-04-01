import {SubmitHandler, useForm} from "react-hook-form";
import {
    UpdateRequestPriceFormData,
    updateRequestPriceSchema
} from "@/features/client/requests/client-by-request/update-request-price/model/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";
import {DialogClose, DialogFooter} from "@/shared/ui/dialog";
import {
    useUpdateRequestPrice
} from "@/features/client/requests/client-by-request/update-request-price/model/api/useUpdateRequestPrice";


interface ClientSearchRequestPriceFormProps {
    id: number;
    setOpen: (open: boolean) => void;
}

export function ClientSearchRequestPriceForm({id, setOpen}:ClientSearchRequestPriceFormProps) {

    const {mutate} = useUpdateRequestPrice();

    const form = useForm<UpdateRequestPriceFormData>({
        resolver: zodResolver(updateRequestPriceSchema),
        defaultValues: {
            price: undefined
        },
    })

    const onSubmit:SubmitHandler<UpdateRequestPriceFormData> = (data: UpdateRequestPriceFormData) => {
        try {
            mutate({
                id: id,
                price: data.price
            })

            setOpen(false);

        }catch (error){
            console.error("Form submission error:", error)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-3 w-full "}>
            <fieldset disabled={form.formState.isSubmitting} className={"flex flex-col gap-2"}>
                <Label>Цена</Label>
                <Input placeholder={"Введите цену"} {...form.register("price")} />
                {form.formState.errors.price && (
                    <p className="text-sm text-red-500">{form.formState.errors.price.message as string}</p>
                )}
            </fieldset>
            <DialogFooter>
                <Button type="submit">Сохранить</Button>
                <DialogClose asChild>
                    <Button type="button" variant="outline">
                        Закрыть
                    </Button>
                </DialogClose>
            </DialogFooter>
        </form>
    )
}