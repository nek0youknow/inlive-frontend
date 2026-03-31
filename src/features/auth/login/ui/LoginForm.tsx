"use client";
import { useForm } from "react-hook-form";
import { AdminLoginFormData, adminLoginSchema } from "@/features/auth/login/model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import {useHandleLogin} from "@/features/auth/login/model/useHandleLogin";

export function LoginForm() {
    const { handleLogin, login } = useHandleLogin();

    const form = useForm<AdminLoginFormData>({
        resolver: zodResolver(adminLoginSchema),
        defaultValues: { email: "", password: "" },
    });

    return (
        <form
            className="flex flex-col w-3/4 md:w-100 mx-auto gap-3"
            onSubmit={form.handleSubmit(handleLogin)}
        >
            <fieldset className="flex flex-col gap-2">
                <Label>Email</Label>
                <Input
                    type="email"
                    placeholder="Email"
                    {...form.register("email")}
                    className={form.formState.errors.email ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.email && (
                    <p className="text-sm text-red-500">{form.formState.errors.email.message as string}</p>
                )}
            </fieldset>

            <fieldset className="flex flex-col gap-2">
                <Label>Password</Label>
                <Input
                    type="password"
                    placeholder="Password"
                    {...form.register("password")}
                    className={form.formState.errors.password ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.password && (
                    <p className="text-sm text-red-500">{form.formState.errors.password.message as string}</p>
                )}
            </fieldset>

            <fieldset className="self-center mt-5">
                <Button className="w-30" disabled={login.isPending}>
                    {login.isPending ? "Входим..." : "Войти"}
                </Button>
            </fieldset>
        </form>
    );
}
