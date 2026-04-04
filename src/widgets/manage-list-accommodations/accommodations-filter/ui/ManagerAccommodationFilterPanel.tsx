"use client"
import {PlusIcon, Search} from "lucide-react";
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";
import Link from "next/link";
import {useDebounce} from "@/shared/hooks/useDebounce";
import {AccommodationRequest} from "@/widgets/manage-list-accommodations/accommodations-list/model/types";
import {
    useMyAccommodationFilter
} from "@/widgets/manage-list-accommodations/accommodations-filter/model/store/useMyAccommodationFilter";


interface ManagerAccommodationFilterPanelProps {
    hasAddButton?: boolean;
}

export function ManagerAccommodationFilterPanel({hasAddButton} : ManagerAccommodationFilterPanelProps) {
    const {filters, setFilter} = useMyAccommodationFilter();

    const debouncedSearch = useDebounce((value: AccommodationRequest) => {
        Object.entries(value).forEach(([key, value]) => {
            setFilter(key as keyof AccommodationRequest, value);
        });
    }, 400);


    return (
        <section className={"mt-3 sm:mt-5 mb-6 sm:mb-8 md:mb-10 flex flex-col sm:flex-row justify-between gap-3 sm:gap-4"}>
            <form role="search" className="flex-1 w-full sm:max-w-md">
                <fieldset
                    className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    <Input
                        id="accommondation-search"
                        placeholder="Искать объект"
                        className="pl-9 w-full"
                        defaultValue={filters.name ?? ""}
                        onChange={(e) => debouncedSearch({ name: e.target.value })}
                    />
                </fieldset>
            </form>
            {hasAddButton && (
                <Link href={"/manager/accommodations/create"} className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto">
                        <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">Добавить жилье</span>
                    </Button>
                </Link>
            )}
        </section>
    )
}

