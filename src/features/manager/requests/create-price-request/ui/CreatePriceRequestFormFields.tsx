
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {DialogClose, DialogFooter} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    CreatePriceRequestFormData,
    createPriceRequestSchema
} from "@/features/manager/requests/create-price-request/model/schema";
import {RequestAccUnitItem} from "@/features/manager/requests/create-price-request/ui/RequestAccUnitItem";
import {useEffect, useState} from "react";
import {useRelevantAccUnits} from "@/features/manager/requests/create-price-request/model/api/useRelevantAccUnits";
import {usePostPriceRequest} from "@/features/manager/requests/create-price-request/model/api/usePostPriceRequest";
import {AccommodationUnit} from "@/entities/accommodation-unit/model/types";

interface CreatePriceRequestFormFieldsProps {
    price?: number;
    accId: number;
    reqId: number;
}

export function CreatePriceRequestFormFields({
                                                 price,
    accId, reqId
                                             }: CreatePriceRequestFormFieldsProps) {
    const [selectUnitId, setSelectUnitId] = useState<string | undefined>(undefined);

    const { data:units } = useRelevantAccUnits(accId, Number(reqId));
    const {mutate} = usePostPriceRequest();


    const form = useForm({
        resolver: zodResolver(createPriceRequestSchema),
        defaultValues: {
            price: price ?? 0,
            unitId: undefined
        }
    })

    useEffect(() => {
        form.setValue("unitId", selectUnitId as unknown as number);
    }, [selectUnitId, form])

    const handleUnitSelect = (unitId: string) => {
        setSelectUnitId(prevId => prevId === unitId ? undefined : unitId);
    }

    const onSubmit: SubmitHandler<CreatePriceRequestFormData> = (data: CreatePriceRequestFormData) => {
        try{
            mutate({
                price: data.price,
                searchRequestId: Number(reqId),
                accommodationUnitId: data.unitId
            })
        }catch (err){
            console.log(err);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-4 w-full"}>

            <fieldset className={"flex w-full flex-col min-w-0 gap-2"}>
                <Label htmlFor={"price"} className={"text-sm"}>Цена</Label>
                <Input
                    id={"price"}
                    {...form.register("price")}
                    type={"number"}
                    className={`${form.formState.errors.price && "border-red-500"}`}
                    placeholder={"0"}
                    min={0}
                />
                {form.formState.errors.price && (
                    <span className={"text-red-500 text-xs"}>{form.formState.errors.price.message}</span>
                )}
            </fieldset>

            <fieldset className={"flex flex-col gap-2 min-h-0"}>
                <Label htmlFor={"units"} className={"text-sm"}>Юниты</Label>
                <div
                    id={"units"}
                    role={"group"}
                    aria-label={"Выбор юнитов"}
                    className={"border border-gray-200 overflow-y-auto flex flex-col gap-3 rounded-lg py-3 px-3 bg-gray-50 w-full max-h-64"}
                >
                    {units?.length > 0 ? (
                        units?.map((unit:AccommodationUnit) => (
                            <button
                                key={unit.id}
                                type={"button"}
                                onClick={() => handleUnitSelect(unit.id)}
                                className={"text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"}
                                aria-pressed={selectUnitId === unit.id}
                                disabled={!unit.isAvailable}
                            >
                                <RequestAccUnitItem
                                    unitId={unit.id}
                                    name={unit.name}
                                    description={unit.description}
                                    area={unit.area}
                                    capacity={unit.capacity}
                                    floor={unit.floor}
                                    isAvailable={unit.isAvailable}
                                    isSelected={selectUnitId === unit.id}
                                />
                            </button>
                        ))
                    ) : (
                        <p className={"text-gray-500 text-sm text-center py-8"}>Нет доступных юнитов</p>
                    )}
                </div>
                {form.formState.errors.unitId && (
                    <span className={"text-red-500 text-xs"}>{form.formState.errors.unitId.message}</span>
                )}
            </fieldset>

            <DialogFooter className={"gap-2"}>
                <DialogClose asChild>
                    <Button variant={"outline"} size={"sm"}>Отмена</Button>
                </DialogClose>
                <Button
                    disabled={!selectUnitId}
                    type={"submit"}
                    size={"sm"}
                >
                    Создать
                </Button>
            </DialogFooter>
        </form>
    )
}
