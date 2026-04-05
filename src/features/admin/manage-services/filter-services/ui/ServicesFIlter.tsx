"use client"
import { Input } from "@/shared/ui/input";
import { Search} from "lucide-react";
import {ServiceAdd} from "@/features/admin/manage-services/add-service/ui/ServiceAdd";
import {useDictionaryFilter} from "@/entities/dictionary/model/store/useDictionaryFilter";
import {useDebounce} from "@/shared/hooks/useDebounce";

export function ServicesFilter() {
    const { filters, setFilters } = useDictionaryFilter();

    const debouncedSearch = useDebounce((value: string) => {
        setFilters({ page: 0, value });
    }, 400);

    return (
        <section className={"my-5 flex md:flex-row flex-col gap-3 md:justify-between"}>
            <form role="search" className="flex-1 max-w-md">
                <fieldset className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    <Input
                        id="service-search"
                        name="q"
                        placeholder="Найти сервис..."
                        className="pl-9"
                        defaultValue={filters.value ?? ""}
                        onChange={e => debouncedSearch(e.target.value)}
                    />
                </fieldset>
            </form>
            <ServiceAdd />
        </section>
    );
}
