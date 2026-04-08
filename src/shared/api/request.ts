import type { AxiosRequestConfig } from "axios";
import { api } from "@/shared/api/axiosInstance";

export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.get<T>(url, config);
    return response.data;
}

export async function apiPost<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig
): Promise<TResponse> {
    const response = await api.post<TResponse>(url, body, config);
    return response.data;
}
