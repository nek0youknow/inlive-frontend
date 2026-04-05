import {api} from "@/shared/api/axiosInstance";
import {ChangeServiceCredentials} from "@/features/admin/manage-services/change-service/model/types";

export const changeService = async (data: ChangeServiceCredentials) => {
    const response = await api.put(`/dictionaries/${data.id}`, {
        key: "ACC_SERVICE",
        value: data.value,
    });

    return response.data;
}

export const getService = async (id: number) => {
    const response = await api.get(`/dictionaries/${id}`);
    return response.data;
}