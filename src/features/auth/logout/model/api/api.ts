import {api} from "@/shared/api/axiosInstance";

export const logoutApi = {
    logout: () => {
        api.post("/auth/logout")
    }
}