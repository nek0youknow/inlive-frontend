import { apiPost } from "@/shared/api/request";

export const logoutApi = {
    logout: () => {
        return apiPost<void, void>("/auth/logout");
    }
};