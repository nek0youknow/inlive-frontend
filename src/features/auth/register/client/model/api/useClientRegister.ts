"use client"
import {ClientRegisterCredentials} from "@/features/auth/register/client/model/types";
import {createClient} from "@/features/auth/register/client/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {useMutation} from "@tanstack/react-query";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useClientRegister() {
    return useMutation({
        mutationFn: (data: ClientRegisterCredentials) => createClient(data),
        onSuccess: (response) => {
            localStorage.setItem("accessToken", response?.data?.accessToken);
            toast.success("Успешный вход в систему.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });
        },
        onError: (error) => {
            const formattedError = formatErrorForToast(error);
            toast.error(formattedError.message, {
                position: "top-right",
                richColors: true,
                description: formattedError.description || "Проверьте данные и попробуйте снова"
            })
        },
        onSettled: () => (
            console.log("settled")
        )
    })
}