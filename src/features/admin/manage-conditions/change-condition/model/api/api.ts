import {api} from "@/shared/api/axiosInstance";
import {ChangeConditionCredentials} from "@/features/admin/manage-conditions/change-condition/model/types";

export const changeCondition = async (data: ChangeConditionCredentials) => {
    const response = await api.put(`/dictionaries/${data.id}`, {
        key: "ACC_CONDITION",
        value: data.value,
    });

    return response.data;
}

export const getConditions = async (id: number) => {
    const response = await api.get(`/dictionaries/${id}`);
    return response.data;
}