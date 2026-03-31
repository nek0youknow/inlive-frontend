import {useMutation} from "@tanstack/react-query";
import {RegisterCredentials} from "@/features/auth/register/manager/model/types";
import {managerRegisterApi} from "@/features/auth/register/manager/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useManagerRegister() {
    return useMutation({
        mutationFn: (data: RegisterCredentials) => managerRegisterApi.register(data),
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
        onSettled: () => {
            console.log("settled");
        },
    })
}