import {api} from "@/shared/api/axiosInstance";
import {User, UpdateUserRequest} from "@/entities/user/model/types";

export const getMe = async (): Promise<User> => {
    const response = await api.get("/users/me");
    return response.data;
};

export const updateMe = async (data: UpdateUserRequest): Promise<User> => {
    const response = await api.put("/users/me", data);
    return response.data;
};

export const updateMyPhoto = async (photo: File): Promise<User> => {
    const formData = new FormData();
    formData.append("photo", photo);

    const response = await api.put("/users/me/photo", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const deleteMyPhoto = async (): Promise<User> => {
    const response = await api.delete("/users/me/photo");
    return response.data;
};

