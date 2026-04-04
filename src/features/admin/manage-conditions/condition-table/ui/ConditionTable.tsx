"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { useDictionary } from "@/entities/dictionary/model/api/useDictionary";
import { TablePagination } from "@/widgets/pagination/ui/TablePagination";
import { Dictionary } from "@/entities/dictionary/model/types";
import { useDictionaryFilter } from "@/entities/dictionary/model/store/useDictionaryFilter";
import {ConditionChange} from "@/features/admin/manage-conditions/change-condition/ui/ConditionChange";
import {RemoveCondition} from "@/features/admin/manage-conditions/remove-condition/ui/RemoveCondition";
import {Spinner} from "@/shared/ui/spinner";

export function ConditionTable() {
    const { filters, setFilter } = useDictionaryFilter();
    const { data, isLoading, isError } = useDictionary("ACC_CONDITION");

    if(isLoading) return <Spinner className={"w-full mx-auto size-7 my-10"} />
    if (isError) return <p>Error loading services</p>;

    return (
        <>
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Ключ</TableHead>
                        <TableHead>Значение</TableHead>
                        <TableHead>Действие</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content.map((item: Dictionary) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.value}</TableCell>
                            <TableCell className={"flex gap-3"}>
                                <ConditionChange conditionId={Number(item.id)} />
                                <RemoveCondition conditionId={Number(item.id)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {data?.totalElements > 20 && (
                <TablePagination
                    page={filters.page ?? 0}
                    totalPages={data.totalPages}
                    size={filters.size ?? 0}
                    onPageChange={(newPage) => setFilter("page", newPage)} // ✅ вот правильный способ
                />
            )}
        </>
    );
}
