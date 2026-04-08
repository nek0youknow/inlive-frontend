import { apiGet } from "@/shared/api/request";
import type { District } from "@/entities/district/model/types";

export const getDistricts = () => apiGet<District[]>("/districts");

export const getDistrictByCityId = (cityId: number) =>
    apiGet<District[]>(`/districts/by-city/${cityId}`);