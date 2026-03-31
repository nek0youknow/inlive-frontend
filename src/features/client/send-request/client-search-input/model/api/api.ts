import {SearchRequestCredientials} from "@/features/client/send-request/client-search-input/model/types";
import {api} from "@/shared/api/axiosInstance";


export const postSearchRequest = async (data:SearchRequestCredientials) => {
    const response = await api.post("/search-requests",  data);

    return response.data;
}