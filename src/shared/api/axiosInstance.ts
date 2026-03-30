import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {normalizeImageUrl} from "@/shared/lib/normalizeImageUrl";
import {Accommodation} from "@/entities/accommodation/model/types";

const API_URL = "/api";

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    const language = localStorage.getItem("language") || "en";
    const supportedLanguages = ["kk", "ru", "en"];
    const acceptLanguage = supportedLanguages.includes(language) ? language : "en";
    config.headers["Accept-Language"] = acceptLanguage;
    
    return config;
});

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                refreshPromise = (async () => {
                    try {
                        const response = await api.post("/auth/refresh", null, {
                            withCredentials: true,
                        });
                        const newToken: string = response.data.accessToken;

                        localStorage.setItem("accessToken", newToken);
                        return newToken;
                    } catch (err) {
                        localStorage.removeItem("accessToken");
                        throw err;
                    } finally {
                        isRefreshing = false;
                    }
                })();
            }

            const newToken = await refreshPromise;

            if (originalRequest.headers)
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

            return api(originalRequest);
        }

        return Promise.reject(error);
    }
);

api.interceptors.response.use((response) => {
    const data = response.data;

    if (Array.isArray(data?.content)) {
        data.content = data.content.map((item:Accommodation) => ({
            ...item,
            imageUrls: item.imageUrls?.map(normalizeImageUrl),
        }));
    }

    if (data?.imageUrls) {
        data.imageUrls = data.imageUrls.map(normalizeImageUrl);
    }

    if (data?.photoUrl) {
        data.photoUrl = normalizeImageUrl(data.photoUrl);
    }

    return response;
});
