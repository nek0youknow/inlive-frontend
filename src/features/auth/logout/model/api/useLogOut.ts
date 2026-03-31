"use client"
import { useAuth } from "@/entities/session/model/useAuth";
import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "@/features/auth/logout/model/api/api";

export function useLogOut() {
    const { logout } = useAuth();

    return useMutation({
        mutationFn: async () => {
            logoutApi.logout();
        },
        onSuccess: async () => {
            await logout();
        },
        onError: (error) => {
            console.log(error.message);
        },
        onSettled: () => {
            console.log("settled");
        },
    });
}
