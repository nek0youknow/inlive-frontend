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
import {useUpdateAccommodationMainInfo} from "@/features/manager/accommodations/accommodation-profile/model/api/useUpdateAccommodationMainInfo";
import {updateMainInfoSchema, UpdateMainInfoFormData} from "@/features/manager/accommodations/accommodation-profile/model/schema";
import {useGetCities} from "@/entities/city/model/api/useGetCities";
import {useGetDistricts} from "@/entities/district/model/api/useGetDistricts";
import {City} from "@/entities/city/model/types";
import {District} from "@/entities/district/model/types";

interface EditMainInfoModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    accommodationId: number;
    initialData: {
        name: string;
        description: string;
        address: string;
        cityId: string;
        districtId: string;
        rating: number;
    };
}

export function EditMainInfoModal({
    open,
    setOpen,
    accommodationId,
    initialData
}: EditMainInfoModalProps) {
    const {mutate, isPending} = useUpdateAccommodationMainInfo();
    const {data: cities} = useGetCities();

    const form = useForm<UpdateMainInfoFormData>({
        resolver: zodResolver(updateMainInfoSchema),
        defaultValues: {
            name: "",
            description: "",
            address: "",
            cityId: "",
            districtId: "",
            rating: 0,
        },
    });

    const selectedCityId = form.watch("cityId");
    const {data: districts} = useGetDistricts(
        selectedCityId ? Number(selectedCityId) : null
    );

    useEffect(() => {
        if (open && initialData) {
            const cityIdStr = initialData.cityId ? String(initialData.cityId) : "";
            const districtIdStr = initialData.districtId ? String(initialData.districtId) : "";
            
            form.reset({
                name: initialData.name || "",
                description: initialData.description || "",
                address: initialData.address || "",
                cityId: cityIdStr,
                districtId: districtIdStr,
                rating: initialData.rating || 0,
            });
        }
    }, [open, initialData, form]);

    useEffect(() => {
        if (open && districts && initialData.districtId) {
            const initialCityIdStr = initialData.cityId ? String(initialData.cityId) : "";
            const currentCityId = form.getValues("cityId");
            
            if (currentCityId === initialCityIdStr && currentCityId) {
                const districtIdStr = String(initialData.districtId);
                const districtExists = districts.some((d: District) => String(d.id) === districtIdStr);
                const currentDistrictId = form.getValues("districtId");
                
                if (districtExists && currentDistrictId !== districtIdStr) {
                    form.setValue("districtId", districtIdStr, { shouldValidate: false });
                }
            }
        }
    }, [open, districts, initialData, form]);

    const onSubmit = (data: UpdateMainInfoFormData) => {
        mutate({
            id: accommodationId,
            ...data,
        }, {
            onSuccess: () => {
                setOpen(false);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl break-all max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Редактировать основную информацию</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Название</Label>
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
                        <Label htmlFor="description">Описание</Label>
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

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="address">Адрес</Label>
                        <Input
                            id="address"
                            placeholder="Адрес"
                            {...form.register("address")}
                            className={form.formState.errors.address ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                        />
                        {form.formState.errors.address && (
                            <p className="text-sm text-red-500">{form.formState.errors.address.message as string}</p>
                        )}
                    </div>

                    <div className="flex flex-row gap-4 w-full">
                        <div className="flex flex-col w-full gap-2">
                            <Label>Город</Label>
                            <Controller
                                name="cityId"
                                control={form.control}
                                render={({field}) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger className={`w-full ${form.formState.errors.cityId ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}>
                                            <SelectValue placeholder="Выберите город"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {cities?.map((item: City) => (
                                                    <SelectItem value={String(item.id)} key={item.id}>
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {form.formState.errors.cityId && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.cityId.message as string}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col w-full gap-2">
                            <Label>Округ</Label>
                            <Controller
                                name="districtId"
                                control={form.control}
                                render={({field}) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        disabled={!selectedCityId}
                                    >
                                        <SelectTrigger className={`w-full ${form.formState.errors.districtId ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}>
                                            <SelectValue placeholder="Выберите округ"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {districts?.map((item: District) => (
                                                    <SelectItem value={String(item.id)} key={item.id}>
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {form.formState.errors.districtId && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.districtId.message as string}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="rating">Рейтинг</Label>
                        <Input
                            id="rating"
                            type="number"
                            placeholder="Рейтинг"
                            {...form.register("rating", { valueAsNumber: true })}
                            className={form.formState.errors.rating ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                        />
                        {form.formState.errors.rating && (
                            <p className="text-sm text-red-500">{form.formState.errors.rating.message as string}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" disabled={isPending}>
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

