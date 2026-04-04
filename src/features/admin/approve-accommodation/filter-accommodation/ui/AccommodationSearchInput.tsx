"use client"
import { Input } from "@/shared/ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import {
    useAccommodationFilter
} from "@/features/admin/approve-accommodation/filter-accommodation/model/store/useAccommodationFilter";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";
import { AccommodationSearchCredentials } from "@/features/admin/approve-accommodation/accommodation-table/model/types";
import {Tabs, TabsList, TabsTrigger} from "@/shared/ui/tabs";

export function AccommodationSearchInput() {
    const { filters, setFilter } = useAccommodationFilter();

    const debouncedSearch = useDebounce((value: AccommodationSearchCredentials) => {
        Object.entries(value).forEach(([key, value]) => {
            setFilter(key as keyof AccommodationSearchCredentials, value);
        });
    }, 400);

    return (
        <section
            aria-labelledby="accommodation-search-title"
            className="my-5 space-y-4"
        >
            <Tabs  defaultValue={"false"} onValueChange={(value) => debouncedSearch({ isDeleted: value })}>
                <TabsList>
                    <TabsTrigger value={"false"} >Активные</TabsTrigger>
                    <TabsTrigger value={"true"}>Архив</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className={"flex flex-wrap items-end justify-between gap-4"}>
                <form role="search" className="w-full" aria-label="Поиск размещений">
                    <fieldset className="relative w-full">
                        <legend className="sr-only">Поиск по названию</legend>
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                            aria-hidden="true"
                        />
                        <Input
                            id="accommodation-search"
                            placeholder="Найти размещение..."
                            className="pl-9 w-full"
                            defaultValue={filters.name ?? ""}
                            onChange={(e) => debouncedSearch({ name: e.target.value })}
                        />
                    </fieldset>
                </form>

                <div className={"flex gap-10 max-md:flex-col max-md:gap-4"}>
                    <form aria-label="Фильтр по статусу" className="flex flex-row items-center gap-2">
                        <Label htmlFor="status-select">Статус:</Label>
                        <Select onValueChange={(value) => debouncedSearch({ approved: value })}>
                            <SelectTrigger id="status-select" className="w-[180px]">
                                <SelectValue placeholder="Статус" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value=" ">Все</SelectItem>
                                <SelectItem value="true">Одобрено</SelectItem>
                                <SelectItem value="false">Отменено</SelectItem>
                            </SelectContent>
                        </Select>
                    </form>

                    <form aria-label="Фильтр по рейтингу" className="flex flex-row items-center gap-2">
                        <Label htmlFor="rating-select">Рейтинг:</Label>
                        <Select
                            defaultValue=" "
                            onValueChange={(value) => debouncedSearch({ minRating: value })}
                        >
                            <SelectTrigger id="rating-select" className="w-[80px]">
                                <SelectValue placeholder="Все" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value=" ">Все</SelectItem>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                            </SelectContent>
                        </Select>
                    </form>
                </div>
            </div>
        </section>
    );
}
