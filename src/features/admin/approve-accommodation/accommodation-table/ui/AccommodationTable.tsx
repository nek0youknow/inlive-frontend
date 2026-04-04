"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { useAccommodations } from "@/features/admin/approve-accommodation/accommodation-table/model/api/useAccommodations";
import { Accommodation } from "@/entities/accommodation/model/types";
import { TablePagination } from "@/widgets/pagination/ui/TablePagination";
import { useState } from "react";
import { AccommodationModal } from "@/features/admin/approve-accommodation/accommodation-table/ui/AccommodationModal";
import {Spinner} from "@/shared/ui/spinner";
import {
  useAccommodationFilter
} from "@/features/admin/approve-accommodation/filter-accommodation/model/store/useAccommodationFilter";

export function AccommodationTable() {
  const [selectedId, setSelectedId] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);

  const {
    data,
    isLoading,
    isError,
    approveAccommodation,
    rejectAccommodation,
    approving,
    rejecting,
  } = useAccommodations();

  const {filters, setFilter} = useAccommodationFilter()

  if(isLoading) return <Spinner className={"w-full mx-auto size-7 my-10"} />
  if (isError) return <p>Error loading accommodations</p>;

  return (
      <>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead className="w-[500px]">Адрес</TableHead>
              <TableHead>Рейтинг</TableHead>
              <TableHead className="text-right">Статус</TableHead>
              <TableHead className="w-[300px] text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.content?.map((item: Accommodation) => (
                <TableRow
                    key={item.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => {
                      setSelectedId(item.id);
                      setOpenModal(true);
                    }}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.rating}</TableCell>
                  <TableCell className="text-right">
                    {item.approved === true ? (
                        <Badge>Одобрено</Badge>
                    ) : item.approved === false ? (
                        <Badge variant="destructive">Отменено</Badge>
                    ) : (
                        <Badge variant="waiting">На рассмотрении</Badge>
                    )}
                  </TableCell>

                  <TableCell
                      className="text-right"
                      onClick={(e) => e.stopPropagation()}
                  >
                    {item.approved === null && (
                        <menu className="flex justify-end gap-2">
                          <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                approveAccommodation(item.id);
                              }}
                              size="sm"
                              disabled={approving}
                          >
                            Подтвердить
                          </Button>

                          <Button
                              size="sm"
                              variant="outline"
                              disabled={rejecting}
                              onClick={(e) => {
                                e.stopPropagation();
                                rejectAccommodation(item.id);
                              }}
                          >
                            Отмена
                          </Button>
                        </menu>
                    )}
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

        <AccommodationModal
            id={selectedId}
            openModal={openModal}
            setOpenModal={setOpenModal}

        />
      </>
  );
}
