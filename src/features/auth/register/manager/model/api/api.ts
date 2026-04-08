import type { RegisterCredentials } from "@/features/auth/register/manager/model/types";
import { apiPost } from "@/shared/api/request";

type RegisterResponse = {
    accessToken: string;
};

export const managerRegisterApi = {
    register: (data: RegisterCredentials) =>
        apiPost<RegisterResponse, RegisterCredentials>("/auth/manager/register", data),
};