"use client"
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {useForm} from "react-hook-form";
import {ManagerRegisterFormData, managerRegisterSchema} from "@/features/auth/register/manager/model/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {Button} from "@/shared/ui/button";
import {useManagerRegister} from "@/features/auth/register/manager/model/api/useManagerRegister";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {useRouter} from "next/navigation";

export function ManagerRegisterForm() {
    const register = useManagerRegister();
    const [isSubmitting] = useState(false);
    const router = useRouter();


    const form = useForm<ManagerRegisterFormData>({
        resolver: zodResolver(managerRegisterSchema),
        defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phoneNumber: ""
        }
    });

    const onSubmit = async (data: ManagerRegisterFormData) => {
        console.log(data);
        try{
            await register.mutateAsync(data);
            toast.success("Успешный вход в систему.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });
            router.push("/manager");
        }catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"flex mt-5 flex-col w-3/4 sm:w-100 gap-5"}>
                <fieldset className={"flex flex-col gap-2"}>
                    <Label>Никнейм</Label>
                    <Input
                        key={"username"}
                        placeholder={"Введите имя"}
                        {...form.register("username")}
                        className={form.formState.errors.username ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30" : ""}
                    />
                    {form.formState.errors.username && (
                        <p className="text-sm text-red-500">{form.formState.errors.username.message as string}</p>
                    )}
                </fieldset>
                <fieldset className={"flex flex-col gap-2"}>
                    <Label>Имя</Label>
                    <Input
                        key={"name"}
                        placeholder={"Введите имя"}
                        {...form.register("firstName")}
                        className={form.formState.errors.firstName ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30" : ""}
                    />
                    {form.formState.errors.firstName && (
                        <p className="text-sm text-red-500">{form.formState.errors.firstName.message as string}</p>
                    )}
                </fieldset>
                <fieldset className={"flex flex-col gap-2"}>
                    <Label>Фамилию</Label>
                    <Input
                        key={"lastName"}
                        placeholder={"Введите Фамилию"}
                        {...form.register("lastName")}
                        className={form.formState.errors.lastName ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30" : ""}
                    />
                    {form.formState.errors.lastName && (
                        <p className="text-sm text-red-500">{form.formState.errors.lastName.message as string}</p>
                    )}
                </fieldset>
                <fieldset className={"flex flex-col gap-2"}>
                    <Label>Email</Label>
                    <Input
                        key={"email"}
                        placeholder={"Email"}
                        {...form.register("email")}
                        className={form.formState.errors.email ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30" : ""}
                    />
                    {form.formState.errors.email && (
                        <p className="text-sm text-red-500">{form.formState.errors.email.message as string}</p>
                    )}
                </fieldset>
                <fieldset className={"flex flex-col gap-2"}>
                    <Label>Пароль</Label>
                    <Input
                        key={"password"}
                        type="password"
                        placeholder={"Введите пароль"}
                        {...form.register("password")}
                        className={form.formState.errors.password ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30" : ""}
                    />
                    {form.formState.errors.password && (
                        <p className="text-sm text-red-500">{form.formState.errors.password.message as string}</p>
                    )}
                </fieldset>
                <fieldset className={"flex flex-col gap-2"}>
                    <Label>Номер телефона</Label>
                    <Input
                        key={"phoneNumber"}
                        type="number"
                        placeholder={"Введите номер телефона"}
                        {...form.register("phoneNumber")}
                        className={form.formState.errors.phoneNumber ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30" : ""}
                    />
                    {form.formState.errors.phoneNumber && (
                        <p className="text-sm text-red-500">{form.formState.errors.phoneNumber.message as string}</p>
                    )}
                </fieldset>
                <fieldset className={"self-center mt-5"}>
                    <Button type="submit" disabled={isSubmitting} className={"px-2 md:px-5"}>
                        {isSubmitting ? "Отправка..." : "Зарегистрироваться"}
                    </Button>
                </fieldset>
            </form>

        </>
    );
}