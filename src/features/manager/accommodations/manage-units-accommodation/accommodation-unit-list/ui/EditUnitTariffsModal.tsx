"use client"
import {useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select";
import {useCreateTariff} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/api/useCreateTariff";
import {createTariffSchema, CreateTariffFormData} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/schema";
import {SelectDictionary} from "@/widgets/select-dictionary/ui/SelectDictionary";

interface EditUnitTariffsModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    unitId: string;
}

const currencies = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "RUB", label: "RUB" },
    { value: "KZT", label: "KZT" },
];

export function EditUnitTariffsModal({
    open,
    setOpen,
    unitId
}: EditUnitTariffsModalProps) {
    const {mutate, isPending} = useCreateTariff(unitId);

    const form = useForm<CreateTariffFormData>({
        resolver: zodResolver(createTariffSchema),
        defaultValues: {
            price: 0,
            currency: "",
            rangeTypeId: 0,
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                price: 0,
                currency: "",
                rangeTypeId: 0,
            });
        }
    }, [open, form]);

    const onSubmit = (data: CreateTariffFormData) => {
        mutate({
            price: data.price,
            currency: data.currency,
            rangeTypeId: data.rangeTypeId,
        }, {
            onSuccess: () => {
                setOpen(false);
                form.reset();
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[95vw] sm:w-full max-w-2xl break-all max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Добавить тариф</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="price" className="text-sm sm:text-base">Цена</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...form.register("price", { valueAsNumber: true })}
                            className={form.formState.errors.price ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                        />
                        {form.formState.errors.price && (
                            <p className="text-sm text-red-500">{form.formState.errors.price.message as string}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label className="text-sm sm:text-base">Валюта</Label>
                        <Controller
                            name="currency"
                            control={form.control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className={`w-full ${form.formState.errors.currency ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}>
                                        <SelectValue placeholder="Выберите валюту" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {currencies.map((item) => (
                                                <SelectItem value={item.value} key={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {form.formState.errors.currency && (
                            <p className="text-sm text-red-500">{form.formState.errors.currency.message as string}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label className="text-sm sm:text-base">Тип диапазона</Label>
                        <Controller
                            name="rangeTypeId"
                            control={form.control}
                            render={({ field }) => (
                                <SelectDictionary
                                    type="RANGE_TYPE"
                                    placeholder="Выберите тип диапазона"
                                    onChange={(values) => {
                                        if (values.length > 0) {
                                            field.onChange(values[0]);
                                        } else {
                                            field.onChange(0);
                                        }
                                    }}
                                    value={field.value && field.value > 0 ? [field.value] : []}
                                    multiple={false}
                                    className={form.formState.errors.rangeTypeId ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                                />
                            )}
                        />
                        {form.formState.errors.rangeTypeId && (
                            <p className="text-sm text-red-500">{form.formState.errors.rangeTypeId.message as string}</p>
                        )}
                    </div>

                    <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" disabled={isPending} className="w-full sm:w-auto">
                                Отмена
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                            {isPending ? "Создание..." : "Создать"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

