"use client"
import {useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {Textarea} from "@/shared/ui/textarea";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select";
import {useUpdateAccommodationUnit} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/api/useUpdateAccommodationUnit";
import {updateAccommodationUnitSchema, UpdateAccommodationUnitFormData} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/schema";
import {unitTypes} from "@/entities/accommodation-unit/model/constants";

interface EditUnitMainInfoModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    unitId: string;
    initialData: {
        unitType: string;
        name: string;
        description: string;
        capacity: number;
        area: number;
        floor: number;
        isAvailable: boolean;
    };
}

export function EditUnitMainInfoModal({
    open,
    setOpen,
    unitId,
    initialData
}: EditUnitMainInfoModalProps) {
    const {mutate, isPending} = useUpdateAccommodationUnit();

    const form = useForm<UpdateAccommodationUnitFormData>({
        resolver: zodResolver(updateAccommodationUnitSchema),
        defaultValues: {
            unitType: "",
            name: "",
            description: "",
            capacity: 0,
            area: 0,
            floor: 0,
            isAvailable: true,
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                unitType: initialData.unitType || "",
                name: initialData.name || "",
                description: initialData.description || "",
                capacity: initialData.capacity || 0,
                area: initialData.area || 0,
                floor: initialData.floor || 0,
                isAvailable: initialData.isAvailable ?? true,
            });
        }
    }, [open, initialData.unitType, initialData.name, initialData.description, initialData.capacity, initialData.area, initialData.floor, initialData.isAvailable, form]);

    const onSubmit = (data: UpdateAccommodationUnitFormData) => {
        mutate({
            id: unitId,
            ...data,
        }, {
            onSuccess: () => {
                setOpen(false);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[95vw] sm:w-full max-w-2xl break-all max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Редактировать основную информацию</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name" className="text-sm sm:text-base">Название</Label>
                        <Input
                            id="name"
                            placeholder="Название"
                            {...form.register("name")}
                            className={form.formState.errors.name ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                        />
                        {form.formState.errors.name && (
                            <p className="text-sm text-red-500">{form.formState.errors.name.message as string}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description" className="text-sm sm:text-base">Описание</Label>
                        <Textarea
                            id="description"
                            placeholder="Описание"
                            {...form.register("description")}
                            className={form.formState.errors.description ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                        />
                        {form.formState.errors.description && (
                            <p className="text-sm text-red-500">{form.formState.errors.description.message as string}</p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <div className="flex flex-col w-full gap-2">
                            <Label htmlFor="capacity" className="text-sm sm:text-base">Вместительность</Label>
                            <Input
                                id="capacity"
                                type="number"
                                placeholder="Количество"
                                {...form.register("capacity", { valueAsNumber: true })}
                                className={form.formState.errors.capacity ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                            />
                            {form.formState.errors.capacity && (
                                <p className="text-sm text-red-500">{form.formState.errors.capacity.message as string}</p>
                            )}
                        </div>

                        <div className="flex flex-col w-full gap-2">
                            <Label htmlFor="area" className="text-sm sm:text-base">Площадь</Label>
                            <Input
                                id="area"
                                type="number"
                                step="0.1"
                                placeholder="Площадь"
                                {...form.register("area", { valueAsNumber: true })}
                                className={form.formState.errors.area ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                            />
                            {form.formState.errors.area && (
                                <p className="text-sm text-red-500">{form.formState.errors.area.message as string}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <div className="flex flex-col w-full gap-2">
                            <Label htmlFor="floor" className="text-sm sm:text-base">Этаж</Label>
                            <Input
                                id="floor"
                                type="number"
                                placeholder="Этаж"
                                {...form.register("floor", { valueAsNumber: true })}
                                className={form.formState.errors.floor ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                            />
                            {form.formState.errors.floor && (
                                <p className="text-sm text-red-500">{form.formState.errors.floor.message as string}</p>
                            )}
                        </div>

                        <div className="flex flex-col w-full gap-2">
                            <Label className="text-sm sm:text-base">Тип юнита</Label>
                            <Controller
                                name="unitType"
                                control={form.control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className={`w-full ${form.formState.errors.unitType ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}>
                                            <SelectValue placeholder="Выберите тип" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {unitTypes?.map((item) => (
                                                    <SelectItem value={String(item.key)} key={item.key}>
                                                        {item.value}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {form.formState.errors.unitType && (
                                <p className="text-sm text-red-500">{form.formState.errors.unitType.message as string}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Controller
                                name="isAvailable"
                                control={form.control}
                                render={({ field }) => (
                                    <input
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                )}
                            />
                            <Label htmlFor="isAvailable" className="text-sm sm:text-base">Доступен</Label>
                        </div>
                    </div>

                    <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" disabled={isPending} className="w-full sm:w-auto">
                                Отмена
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                            {isPending ? "Сохранение..." : "Сохранить"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

