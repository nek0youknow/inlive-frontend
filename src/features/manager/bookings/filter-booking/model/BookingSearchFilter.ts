import { create } from "zustand";

interface BookingSearchFilterStore {
    filters: {
        page: number;
        size: number;
    };
    setFilter: (key: keyof BookingSearchFilterStore["filters"], value: number) => void;
    resetFilters: () => void;
}

export const useBookingSearchFilter = create<BookingSearchFilterStore>((set) => ({
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