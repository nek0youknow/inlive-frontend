import {create} from "zustand";
import {AccommodationRequest} from "@/widgets/manage-list-accommodations/accommodations-list/model/types";

interface AccommodationFilterStore {
    filters: Partial<AccommodationRequest>;
    setFilter: (key: keyof AccommodationRequest, value: string | null | undefined) => void;

    resetFilters: () => void;
}

export const useMyAccommodationFilter = create<AccommodationFilterStore>((set) => ({
    filters: {
        cityId: null,
        districtId: null,
        approved: "true",
        isDeleted: "false",
        minRating: null,
        ownerId: null,
        name: null,
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
                approved: "true",
                isDeleted: "false",
                minRating: null,
                ownerId: null,
                name: null,
            },
        }),
}))