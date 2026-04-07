"use client"
import {
    useCreateAccommodationUnit
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/model/api/useCreateAccommodationUnit";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {
    CreateAccommodationUnitFormData, createAccommodationUnitSchema
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/model/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {Textarea} from "@/shared/ui/textarea";
import {useRouter} from "next/navigation";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select";
import {unitTypes} from "@/entities/accommodation-unit/model/constants";
import {Button} from "@/shared/ui/button";
import {
    SelectDictionary
} from "@/widgets/select-dictionary/ui/SelectDictionary";
import {ImageUploader} from "@/widgets/images-uploader/ui/ImageUploader";
import {useCallback, useState} from "react";

interface Props {
    accommodationId: string;
}

export function CreateAccommodationUnitFormFields({accommodationId}:Props) {
    const {mutate} = useCreateAccommodationUnit();
    const router = useRouter();

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const form = useForm<CreateAccommodationUnitFormData>({
        resolver: zodResolver(createAccommodationUnitSchema),
        defaultValues: {
            unitType: "",
            name: "",
            description: "",
            capacity: 0,
            area: 0,
            floor: 0,
            serviceDictionaryIds: [],
            conditionDictionaryIds: [],
        },
    });

    const handleImagesChange = useCallback((files: File[]) => {
        const currentImages = form.getValues("images") || [];
        const newImages = [...currentImages, ...files];

        form.setValue("images", newImages, { shouldValidate: true });

        // Создаем превью для новых изображений
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews((prev) => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    }, [form]);

    const removeImage = useCallback((index: number) => {
        const currentImages = form.getValues("images");
        const newImages = currentImages.filter((_, i) => i !== index);
        form.setValue("images", newImages, { shouldValidate: true });

        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }, [form]);

    const onSubmit: SubmitHandler<CreateAccommodationUnitFormData> = async (data) => {
        console.log("data", data);
        try {
            const payload = { accommodationId, ...data };
            await mutate(payload);
            form.reset();
            router.push("/manager/accommodations");
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <form className={"my-8 sm:my-12 md:my-20 flex break-all flex-col mx-auto gap-4 sm:gap-5"} onSubmit={form.handleSubmit(onSubmit)}>
            <ImageUploader
                images={imagePreviews}
                onImagesChange={handleImagesChange}
                onImageRemove={removeImage}
                error={form.formState.errors.images?.message as string}
                maxImages={10}
            />
            <fieldset className="flex flex-col gap-2">
                <Label className="text-sm sm:text-base">Имя</Label>
                <Input
                    placeholder="Имя"
                    {...form.register("name")}
                    className={form.formState.errors.name ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.name && (
                    <p className="text-sm text-red-500">{form.formState.errors.name.message as string}</p>
                )}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <Label className="text-sm sm:text-base">Описание</Label>
                <Textarea
                    placeholder="Описание"
                    {...form.register("description")}
                    className={form.formState.errors.description ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.description && (
                    <p className="text-sm text-red-500">{form.formState.errors.description.message as string}</p>
                )}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <Label className="text-sm sm:text-base">Кол-во людей могут жить</Label>
                <Input
                    placeholder="Количество"
                    {...form.register("capacity", { valueAsNumber: true })}
                    className={form.formState.errors.capacity ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.capacity && (
                    <p className="text-sm text-red-500">{form.formState.errors.capacity.message as string}</p>
                )}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <Label className="text-sm sm:text-base">Площадь</Label>
                <Input
                    placeholder="Площадь"
                    {...form.register("area", { valueAsNumber: true })}
                    className={form.formState.errors.area ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.area && (
                    <p className="text-sm text-red-500">{form.formState.errors.area.message as string}</p>
                )}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <Label className="text-sm sm:text-base">Этаж</Label>
                <Input
                    placeholder="Этаж"
                    {...form.register("floor", { valueAsNumber: true })}
                    className={form.formState.errors.floor ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.floor && (
                    <p className="text-sm text-red-500">{form.formState.errors.floor.message as string}</p>
                )}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
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
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <Label className="text-sm sm:text-base">Услуги</Label>
                <Controller
                    name="serviceDictionaryIds"
                    control={form.control}
                    render={({ field }) => (
                        <SelectDictionary
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Выберите услуги"
                            type="ACC_SERVICE"
                        />
                    )}
                />
                {form.formState.errors.serviceDictionaryIds && (
                    <p className="text-sm text-red-500">{form.formState.errors.serviceDictionaryIds.message as string}</p>
                )}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <Label className="text-sm sm:text-base">Условия</Label>
                <Controller
                    name={"conditionDictionaryIds"}
                    control={form.control}
                    render={({ field }) => (
                        <SelectDictionary
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder={"Выберите условия"}
                            type={"ACC_CONDITION"} />
                    )}
                 />
                {form.formState.errors.conditionDictionaryIds && (
                    <p className="text-sm text-red-500">{form.formState.errors.conditionDictionaryIds.message as string}</p>
                )}
            </fieldset>
            <fieldset className="flex flex-col sm:flex-row self-center gap-2 sm:gap-3 w-full sm:w-auto">
                <Button type={"submit"} className="w-full sm:w-auto">Создать</Button>
                <Button onClick={() => history.back()} variant={"outline"} className="w-full sm:w-auto">Отмена</Button>
            </fieldset>
        </form>
        )

}