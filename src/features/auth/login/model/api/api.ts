import type { LoginCredentials } from "@/features/auth/login/model/types";
import { apiPost } from "@/shared/api/request";

type LoginResponse = {
    accessToken: string;
};

export const loginApi = {
    login: (data: LoginCredentials) => apiPost<LoginResponse, LoginCredentials>("/auth/login", data),
};