"use client"
import { Input } from "@/shared/ui/input";
import {useForm,} from "react-hook-form";
import {DialogClose, DialogFooter, DialogHeader, DialogTitle} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/shared/ui/label";
import {AddConditionFormData, addConditionSchema} from "@/features/admin/manage-conditions/add-condition/model/schema";
import {useAddCondition} from "@/features/admin/manage-conditions/add-condition/model/api/useAddCondition";


interface Props {
    setOpen: (open: boolean) => void;
}

export function ConditionAddFormFields({setOpen}:Props) {
    const {mutate} = useAddCondition();
    const form = useForm<AddConditionFormData>({
        resolver: zodResolver(addConditionSchema),
        defaultValues: { value: "" },
    });

    const onSubmit = (data: AddConditionFormData) => {
        try{
            mutate(data.value);
            setOpen(false);
        }catch (error){
           console.log(error)
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>

            <DialogHeader>
                <DialogTitle>Добавить условие</DialogTitle>
            </DialogHeader>
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
    );
}
