import {LoginCredentials} from "@/features/auth/login/model/types";
import {api} from "@/shared/api/axiosInstance";

export const loginApi = {
    login: (data: LoginCredentials) => (
        api.post("/auth/login", data)
    )
}