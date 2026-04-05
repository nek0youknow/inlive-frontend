import {api} from "@/shared/api/axiosInstance";
import {ServiceDictionaryCreateCredentials} from "@/features/admin/manage-services/add-service/model/types";

export const createService = async (data: ServiceDictionaryCreateCredentials) => {
    const response = await api.post("/dictionaries", data);

    return response.data;
};