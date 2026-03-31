import {api} from "@/shared/api/axiosInstance";
import {ClientRegisterCredentials} from "@/features/auth/register/client/model/types";

export const createClient = async (data: ClientRegisterCredentials) => {
    const response = await api.post("/auth/client/register", data);

    return response.data;
}