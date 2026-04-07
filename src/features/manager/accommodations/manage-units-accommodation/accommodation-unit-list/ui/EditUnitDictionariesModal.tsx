"use client"
import {useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {Label} from "@/shared/ui/label";
import {useUpdateAccommodationUnitDictionaries} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/api/useUpdateAccommodationUnitDictionaries";
import {updateAccommodationUnitDictionariesSchema, UpdateAccommodationUnitDictionariesFormData} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/schema";
import {SelectDictionary} from "@/widgets/select-dictionary/ui/SelectDictionary";

interface EditUnitDictionariesModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    unitId: string;
    initialServiceIds?: number[];
    initialConditionIds?: number[];
}

export function EditUnitDictionariesModal({
    open,
    setOpen,
    unitId,
    initialServiceIds = [],
    initialConditionIds = [],
}: EditUnitDictionariesModalProps) {
    const {mutate, isPending} = useUpdateAccommodationUnitDictionaries();

    const form = useForm<UpdateAccommodationUnitDictionariesFormData>({
        resolver: zodResolver(updateAccommodationUnitDictionariesSchema),
        defaultValues: {
            serviceDictionaryIds: initialServiceIds || [],
            conditionDictionaryIds: initialConditionIds || [],
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                serviceDictionaryIds: initialServiceIds || [],
                conditionDictionaryIds: initialConditionIds || [],
            });
        }
    }, [initialServiceIds, initialConditionIds, open, form]);

    const onSubmit = (data: UpdateAccommodationUnitDictionariesFormData) => {
        mutate({
            unitId: unitId,
            serviceDictionaryIds: data?.serviceDictionaryIds,
            conditionDictionaryIds: data?.conditionDictionaryIds,
        }, {
            onSuccess: () => {
                setOpen(false);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[95vw] sm:w-full max-w-4xl break-all max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Редактировать словари</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm sm:text-base">Услуги</Label>
                        <Controller
                            name="serviceDictionaryIds"
                            control={form.control}
                            render={({field}) => (
                                <SelectDictionary
                                    value={field.value || []}
                                    onChange={field.onChange}
                                    placeholder="Выберите услуги"
                                    type="ACC_SERVICE"
                                />
                            )}
                        />
                        {form.formState.errors.serviceDictionaryIds && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.serviceDictionaryIds.message as string}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label className="text-sm sm:text-base">Условия</Label>
                        <Controller
                            name="conditionDictionaryIds"
                            control={form.control}
                            render={({field}) => (
                                <SelectDictionary
                                    value={field.value || []}
                                    onChange={field.onChange}
                                    placeholder="Выберите условия"
                                    type="ACC_CONDITION"
                                />
                            )}
                        />
                        {form.formState.errors.conditionDictionaryIds && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.conditionDictionaryIds.message as string}
                            </p>
                        )}
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

