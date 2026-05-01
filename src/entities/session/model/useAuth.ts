"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { sessionService } from "@/entities/session/model/sessionService";

export const sessionKeys = {
    session: () => ["session"] as const,
};

function setUserRoleCookie(role: string | null) {
    if (typeof document === "undefined") return;

    const base = "path=/; samesite=lax";
    const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; secure" : "";

    if (!role) {
        document.cookie = `USER_ROLE=; ${base}; max-age=0${secure}`;
        return;
    }

    document.cookie = `USER_ROLE=${encodeURIComponent(role)}; ${base}; max-age=604800${secure}`; // 7 days
}

function deriveRoleForRouting(roles: string[] | undefined | null) {
    if (!roles?.length) return null;
    if (roles.includes("SUPER_MANAGER")) return "SUPER_MANAGER";
    if (roles.includes("ADMIN")) return "ADMIN";
    if (roles.includes("CLIENT")) return "CLIENT";
    return roles[0] ?? null;
}

export const useAuth = () => {
    const queryClient = useQueryClient();

    const getAuthState = useCallback(() => {
        const token = sessionService.getToken();

        if (!token || sessionService.isTokenExpired(token)) {
            sessionService.removeTokens();
            return { isAuthenticated: false, user: null };
        }

        const user = sessionService.getUserFromToken(token);
        return { isAuthenticated: !!user, user };
    }, []);

    const { data, refetch } = useQuery({
        queryKey: sessionKeys.session(),
        queryFn: getAuthState,
        staleTime: 0,
    });

    const login = useCallback(
        async (accessToken: string) => {
            sessionService.setTokens(accessToken);

            const user = sessionService.getUserFromToken(accessToken);
            setUserRoleCookie(deriveRoleForRouting(user?.role));

            const newState = getAuthState();
            queryClient.setQueryData(sessionKeys.session(), newState); // ✅ сразу обновляем кэш

            await refetch();
        },
        [refetch, queryClient, getAuthState]
    );

    const logout = useCallback(async () => {
        sessionService.removeTokens();
        setUserRoleCookie(null);

        queryClient.setQueryData(sessionKeys.session(), { isAuthenticated: false, user: null }); // ✅ мгновенно чистим
        await queryClient.invalidateQueries({ queryKey: sessionKeys.session() });
        await refetch();
    }, [queryClient, refetch]);

    return {
        isAuthenticated: data?.isAuthenticated ?? false,
        user: data?.user ?? null,
        login,
        logout,
        refetch,
    };
};
