"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { sessionService } from "@/entities/session/model/sessionService";

export const sessionKeys = {
    session: () => ["session"] as const,
};

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

            const newState = getAuthState();
            queryClient.setQueryData(sessionKeys.session(), newState); // ✅ сразу обновляем кэш

            await refetch();
        },
        [refetch, queryClient, getAuthState]
    );

    const logout = useCallback(async () => {
        sessionService.removeTokens();

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
