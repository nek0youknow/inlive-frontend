import { create } from "zustand";

interface RequestFilterStore {
    filters: {
        page: number;
        size: number;
    };
    setFilter: (key: keyof RequestFilterStore["filters"], value: string | number | null | undefined) => void;
    resetFilters: () => void;
}

export const useRequestFilter = create<RequestFilterStore>((set) => ({
    filters: {
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
                page: 0,
                size: 20
            }
        })
}))