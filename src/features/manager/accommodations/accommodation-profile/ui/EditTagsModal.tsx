"use client"
import {useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {Label} from "@/shared/ui/label";
import {useUpdateAccommodationTags} from "@/features/manager/accommodations/accommodation-profile/model/api/useUpdateAccommodationTags";
import {updateTagsSchema, UpdateTagsFormData} from "@/features/manager/accommodations/accommodation-profile/model/schema";
import {SelectDictionary} from "@/widgets/select-dictionary/ui/SelectDictionary";

interface EditTagsModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    accommodationId: number;
    initialServiceIds?: number[];
    initialConditionIds?: number[];
}

export function EditTagsModal({
    open,
    setOpen,
    accommodationId,
    initialServiceIds = [],
    initialConditionIds = [],
}: EditTagsModalProps) {
    const {mutate, isPending} = useUpdateAccommodationTags();

    const form = useForm<UpdateTagsFormData>({
        resolver: zodResolver(updateTagsSchema),
        defaultValues: {
            serviceIds: initialServiceIds || [],
            conditionIds: initialConditionIds || [],
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                serviceIds: initialServiceIds || [],
                conditionIds: initialConditionIds || [],
            });
        }
    }, [initialServiceIds, initialConditionIds, open, form]);

    const onSubmit = (data: UpdateTagsFormData) => {
        mutate({
            id: accommodationId,
            serviceIds: data.serviceIds,
            conditionIds: data.conditionIds,
        }, {
            onSuccess: () => {
                setOpen(false);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl break-all max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Редактировать теги</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <Label>Услуги</Label>
                        <Controller
                            name="serviceIds"
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
                        {form.formState.errors.serviceIds && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.serviceIds.message as string}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Условия</Label>
                        <Controller
                            name="conditionIds"
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
                        {form.formState.errors.conditionIds && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.conditionIds.message as string}
                            </p>
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

