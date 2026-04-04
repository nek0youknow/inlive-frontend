import {ConditionDictionaryCreateCredentials} from "@/features/admin/manage-conditions/add-condition/model/types";
import {api} from "@/shared/api/axiosInstance";

export const createCondition = async (data: ConditionDictionaryCreateCredentials) => {
    const response = await api.post("/dictionaries", data);

    return response.data;
}