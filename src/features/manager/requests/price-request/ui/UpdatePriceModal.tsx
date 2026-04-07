"use client"
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {Input} from "@/shared/ui/input";
import {Label} from "@/shared/ui/label";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UpdatePriceFormData, updatePriceSchema} from "@/features/manager/requests/price-request/model/schema";
import {useUpdatePrice} from "@/features/manager/requests/price-request/model/api/useUpdatePrice";

interface UpdatePriceModalProps {
    curPrice: number;
    id: number;
    parentModal: (isOpen:boolean) => void;
}

export function UpdatePriceModal({ curPrice, id, parentModal }: UpdatePriceModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<UpdatePriceFormData>({
        resolver: zodResolver(updatePriceSchema),
        defaultValues: { price: curPrice ?? 0 },
    });

    const { mutate, isPending } = useUpdatePrice(id);

    const onSubmit: SubmitHandler<UpdatePriceFormData> = (data) => {
        mutate(
            { price: data.price, searchRequestId: id },
            {
                onSuccess: () => {
                    setIsOpen(false)
                    parentModal(false)
                },
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Обновить цену</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Обновить цену</DialogTitle>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <fieldset className="flex flex-col gap-2">
                        <Label>Цена</Label>
                        <Input
                            type="number"
                            step="0.01"
                            {...form.register("price", { valueAsNumber: true })}
                        />
                    </fieldset>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isPending}>
                                Отмена
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Сохранение..." : "Сохранить"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}