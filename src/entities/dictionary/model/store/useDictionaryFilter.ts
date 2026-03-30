import { create } from "zustand";
import { DictionaryCredentials } from "@/entities/dictionary/model/types";

interface ConditionsFilterStore {
    filters: Partial<DictionaryCredentials> & { page: number; size: number };
    setFilter: (key: keyof DictionaryCredentials | "page" | "size", value: number | string) => void;
    setFilters: (newFilters: Partial<DictionaryCredentials> &  Partial<{ page: number; size: number }>) => void;
    resetFilters: () => void;
}

export const useDictionaryFilter = create<ConditionsFilterStore>((set) => ({
    filters: {
        isDeleted: false,
        value: null,
        page: 0,
        size: 20,
    },

    setFilter: (key, value) =>
        set((state) => ({
            filters: { ...state.filters, [key]: value },
        })),

    setFilters: (newFilters) =>
        set((state) => ({
            filters: { ...state.filters, ...newFilters  },
        })),
    resetFilters: () =>
        set({
            filters: {
                isDeleted: false,
                value: null,
                page: 0,
                size: 20,
            },
        }),
}));
