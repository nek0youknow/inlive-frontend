"use client";
import { toast } from "sonner";
import { useLogOut } from "@/features/auth/logout/model/api/useLogOut";
import { formatErrorForToast } from "@/shared/lib/error/formatError";
import { sessionService } from "@/entities/session/model/sessionService";

export function useHandleLogout() {
    const logOut = useLogOut();

    const handleLogout = async () => {
        const secure =
            typeof window !== "undefined" && window.location.protocol === "https:"
                ? "; secure"
                : "";
        const base = "path=/; samesite=lax";

        try {
            await logOut.mutateAsync();
        } catch (error) {
            const formattedError = formatErrorForToast(error);
            toast.error(formattedError.message, {
                position: "top-right",
                richColors: true,
                description:
                    formattedError.description ||
                    "Something went wrong. Please try again.",
            });
        } finally {
            // Always clear local auth state, even if server logout fails.
            sessionService.removeTokens();
            document.cookie = `USER_ROLE=; ${base}; max-age=0${secure}`;
            document.cookie = `USER_ROLE=; ${base}; expires=Thu, 01 Jan 1970 00:00:00 GMT${secure}`;

            window.location.assign("/");
        }
    };

    return { handleLogout, logOut };
}
