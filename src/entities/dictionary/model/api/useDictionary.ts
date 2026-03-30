"use client";
import { getDictionaries } from "@/entities/dictionary/model/api/api";
import { useQuery } from "@tanstack/react-query";
import { useDictionaryFilter } from "@/entities/dictionary/model/store/useDictionaryFilter";

export function useDictionary(key: string, size?: number) {
    const { filters } = useDictionaryFilter();

    const payload = {
        keys: key ? [key] : null,
        ...filters,
        size: size ?? filters.size ?? 20,
    };

    return useQuery({
        queryKey: ["dictionary", key, payload.size, filters],
        queryFn: async () => await getDictionaries(payload),
    });
}
