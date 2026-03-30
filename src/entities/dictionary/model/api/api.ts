import { api } from "@/shared/api/axiosInstance";
import { DictionaryCredentials } from "@/entities/dictionary/model/types";

    export const getDictionaries = async (data: Partial<DictionaryCredentials>) => {
        const response = await api.get("/dictionaries/search", {
            params: {
                isDeleted: data.isDeleted ?? false,
                keys: data.keys?.length ? data.keys : "",
                value: data.value ??  "",
                page: data.page ?? 0,
                size: data.size ?? 20,
            },
        });

        return response.data;
    };
