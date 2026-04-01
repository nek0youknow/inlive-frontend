"use client";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {useUpdateMe} from "@/entities/user/model/api/useUpdateMe";
import {updateProfileSchema, UpdateProfileFormData} from "@/widgets/user-profile/model/schema";
import {User} from "@/entities/user/model/types";

interface EditProfileModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    initialData: User;
}

export function EditProfileModal({
    open,
    setOpen,
    initialData
}: EditProfileModalProps) {
    const {mutate, isPending} = useUpdateMe();

    const form = useForm<UpdateProfileFormData>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            firstName: initialData.firstName,
            lastName: initialData.lastName,
            email: initialData.email,
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                firstName: initialData.firstName,
                lastName: initialData.lastName,
                email: initialData.email,
            });
        }
    }, [open, initialData, form]);

    const onSubmit = (data: UpdateProfileFormData) => {
        mutate(data, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[95vw] sm:w-full max-w-md max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Редактировать профиль</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="firstName" className="text-sm sm:text-base">Имя</Label>
                        <Input
                            id="firstName"
                            placeholder="Имя"
                            {...form.register("firstName")}
                            className={`text-sm sm:text-base ${form.formState.errors.firstName ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}
                        />
                        {form.formState.errors.firstName && (
                            <p className="text-xs sm:text-sm text-red-500">{form.formState.errors.firstName.message as string}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="lastName" className="text-sm sm:text-base">Фамилия</Label>
                        <Input
                            id="lastName"
                            placeholder="Фамилия"
                            {...form.register("lastName")}
                            className={`text-sm sm:text-base ${form.formState.errors.lastName ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}
                        />
                        {form.formState.errors.lastName && (
                            <p className="text-xs sm:text-sm text-red-500">{form.formState.errors.lastName.message as string}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email"
                            {...form.register("email")}
                            className={`text-sm sm:text-base ${form.formState.errors.email ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}
                        />
                        {form.formState.errors.email && (
                            <p className="text-xs sm:text-sm text-red-500">{form.formState.errors.email.message as string}</p>
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
