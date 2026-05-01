"use client";
import { toast } from "sonner";
import {useLogOut} from "@/features/auth/logout/model/api/useLogOut";
import {formatErrorForToast} from "@/shared/lib/error/formatError";

export function useHandleLogout() {
    const logOut = useLogOut();

    const handleLogout = async () => {
        try {
            await logOut.mutateAsync();
            document.cookie = `USER_ROLE=; path=/; samesite=lax; max-age=0${window.location.protocol === "https:" ? "; secure" : ""}`;
            window.location.href = "/";
        } catch (error) {
            const formattedError = formatErrorForToast(error);
            toast.error(formattedError.message, {
                position: "top-right",
                richColors: true,
                description: formattedError.description || "Произошла ошибка. Попробуйте снова.",
            });
        }
    };

    return { handleLogout, logOut };
}
