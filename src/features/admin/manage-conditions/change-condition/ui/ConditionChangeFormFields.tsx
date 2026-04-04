import {useChangeCondition} from "@/features/admin/manage-conditions/change-condition/model/api/useChangeCondition";
import {useForm} from "react-hook-form";
import {
    ChangeConditionFormData,
    changeConditionSchema
} from "@/features/admin/manage-conditions/change-condition/model/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {DialogClose, DialogFooter} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {useGetCondition} from "@/features/admin/manage-conditions/change-condition/model/api/useGetCondition";
import {useEffect} from "react";


interface Props {
    conditionId: number;
    setOpen: (open: boolean) => void;
}

export function ConditionChangeFormFields({setOpen, conditionId}: Props) {
    const {mutate} = useChangeCondition();
    const { data: condition } = useGetCondition(conditionId);

    const form = useForm<ChangeConditionFormData>({
        resolver: zodResolver(changeConditionSchema),
        defaultValues: { value: ""},
    })

    useEffect(() => {
        if (condition) {
            form.reset({
                value: condition.value,
            });
        }
    }, [condition, form]);

    const onSubmit = (data: ChangeConditionFormData) => {
        try{
            mutate({
                id: condition.id,
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
                <Button type="submit">Сохранить</Button>
            </DialogFooter>
        </form>
    )
}