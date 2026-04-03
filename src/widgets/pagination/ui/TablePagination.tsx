import {
    Pagination,
    PaginationContent,
    PaginationItem, PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/shared/ui/pagination";

interface TablePaginationProps {
    page: number,
    totalPages: number,
    size: number,
    onPageChange: (page: number) => void
}

export function TablePagination({ page, totalPages, onPageChange}: TablePaginationProps) {

    const handlePrevious = () => {
        if(page>0) onPageChange(page-1);
    }

    const handleNext = () => {
        if(page<totalPages-1) onPageChange(page+1);
    }

    const pages = Array.from({length: totalPages}, (_, i) => i);

    return (
        <Pagination className={"my-5"}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePrevious();
                        }}
                        className={page === 0 ? "opacity-50 pointer-events-none" : ""}
                    />
                </PaginationItem>
                {pages.map(p => (
                    <PaginationItem key={p}>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(p);
                            }}
                            isActive={p === page}
                        >
                            {p+1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNext();
                        }}
                        className={page === totalPages-1 ? "opacity-50 pointer-events-none" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
