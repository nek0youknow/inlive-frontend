import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {DialogClose, DialogFooter} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";

import {useEffect} from "react";
import {useChangeService} from "@/features/admin/manage-services/change-service/model/api/useChangeService";
import {useGetService} from "@/features/admin/manage-services/change-service/model/api/useGetService";
import {ChangeServiceFormData, changeServiceSchema} from "@/features/admin/manage-services/change-service/model/schema";


interface Props {
    serviceId: number;
    setOpen: (open: boolean) => void;
}

export function ServiceChangeFormFields({setOpen, serviceId}: Props) {
    const {mutate} = useChangeService();
    const { data: service } = useGetService(serviceId);

    const form = useForm<ChangeServiceFormData>({
        resolver: zodResolver(changeServiceSchema),
        defaultValues: { value: ""},
    })

    useEffect(() => {
        if (service) {
            form.reset({
                value: service.value,
            });
        }
    }, [service, form]);

    const onSubmit = (data: ChangeServiceFormData) => {
        try{
            mutate({
                id: service.id,
                value: data.value
            });
            setOpen(false);
        }catch (error){
            console.log(error);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center my-5 gap-2">
                <div className="flex flex-col w-full gap-4">
                    <div className={"flex gap-2 flex-col"}>
                        <Label htmlFor={"value"}>Значение</Label>
                        <Input
                            id="value"
                            placeholder="Значение"
                            {...form.register("value")}
                        />
                        {form.formState.errors.value && (
                            <p className="text-sm text-red-500">{form.formState.errors.value.message as string}</p>
                        )}
                    </div>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
                <Button type="submit" >Сохранить</Button>
            </DialogFooter>
        </form>
    )
}