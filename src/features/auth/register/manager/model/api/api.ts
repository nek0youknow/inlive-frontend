import {RegisterCredentials} from "@/features/auth/register/manager/model/types";
import {api} from "@/shared/api/axiosInstance";

export const managerRegisterApi = {
    register: (data: RegisterCredentials) => (
        api.post("/auth/manager/register", data)
    )
}