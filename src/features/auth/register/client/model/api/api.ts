import type { ClientRegisterCredentials } from "@/features/auth/register/client/model/types";
import { apiPost } from "@/shared/api/request";

type RegisterResponse = {
    accessToken: string;
};

export const createClient = (data: ClientRegisterCredentials) =>
    apiPost<RegisterResponse, ClientRegisterCredentials>("/auth/client/register", data);