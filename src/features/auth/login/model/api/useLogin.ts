import {useMutation} from "@tanstack/react-query";
import {LoginCredentials} from "@/features/auth/login/model/types";
import {loginApi} from "@/features/auth/login/model/api/api";
import {useAuth} from "@/entities/session/model/useAuth";

export function useLogin()  {
    const { login } = useAuth();

    return useMutation({
        mutationFn: (data: LoginCredentials) => loginApi.login(data),
        onSuccess: async (response) => {
            await login(response.data.accessToken);
        },
        onError: (error) => {
            console.log(error.message);
        },
        onSettled: () => {
            console.log("settled");
        },
    })
};