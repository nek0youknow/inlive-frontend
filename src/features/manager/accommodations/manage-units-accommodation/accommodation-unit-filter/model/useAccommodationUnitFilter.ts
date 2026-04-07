import {
    AccommodationUnitSearchCredientials
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/types";
import {create} from "zustand";


interface AccommodationUnitFilterStore {
    filters: Partial<AccommodationUnitSearchCredientials>;
    setFilter: (key: keyof AccommodationUnitSearchCredientials, value: string | number | null | undefined) => void;
    resetFilters: () => void;
}

export const useAccommodationUnitFilter = create<AccommodationUnitFilterStore>((set) => ({
    filters: {
        accommodationId: null,
        unitTypeId: null,
        isAvailable: null,
        isDeleted: "false",
        name: null,
        minCapacity: "0",
        maxCapacity: "10",
        minArea: "0",
        maxArea: "400",
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
                accommodationId: null,
                unitTypeId: null,
                isAvailable: null,
                isDeleted: "false",
                name: null,
                minCapacity: null,
                maxCapacity: null,
                minArea: null,
                maxArea: null,
                page: 0,
                size: 20
            }
        })
}))

