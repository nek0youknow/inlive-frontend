import { create } from "zustand";
import { AccommodationSearchCredentials } from "@/features/admin/approve-accommodation/accommodation-table/model/types";

interface AccommodationFilterStore {
    filters: Partial<AccommodationSearchCredentials>;
    setFilter: (key: keyof AccommodationSearchCredentials, value: string | number | null | undefined) => void;

    resetFilters: () => void;
}

export const useAccommodationFilter = create<AccommodationFilterStore>((set) => ({
    filters: {
        cityId: null,
        districtId: null,
        approved: null,
        isDeleted: "false",
        minRating: null,
        ownerId: null,
        name: null,
        page: 0,
        size: 20
    },

    setFilter: (key, value) =>
        set((state) => ({
            filters: { ...state.filters, [key]: value },
        })),

    resetFilters: () =>
        set({
            filters: {
                cityId: null,
                districtId: null,
                approved: null,
                isDeleted: "false",
                minRating: null,
                ownerId: null,
                name: null,
                page: 0,
                size: 5
            },
        }),
}));
