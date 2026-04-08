import { apiGet } from "@/shared/api/request";
import type { City } from "@/entities/city/model/types";

export const getCities = () => apiGet<City[]>("/cities");