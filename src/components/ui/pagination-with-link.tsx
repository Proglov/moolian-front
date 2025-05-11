"use client";
import { type ReactNode, useCallback } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

export interface PaginationWithLinksProps {
    totalCount: number;
    pageSize: number;
    page: number;
    setCurrentPage: (n: number) => void;
    setLimit: (n: number) => void;
}

export function PaginationWithLinks({
    pageSize,
    totalCount,
    page,
    setCurrentPage,
    setLimit
}: PaginationWithLinksProps) {

    const totalPageCount = Math.ceil(totalCount / pageSize);

    const handleNextPage = useCallback(() => ((page < totalPageCount) && setCurrentPage(page + 1)), [page, totalPageCount, setCurrentPage])
    const handlePreviousPage = useCallback(() => ((page > 1) && setCurrentPage(page - 1)), [page, setCurrentPage])


    const renderPageNumbers = () => {
        const items: ReactNode[] = [];
        const maxVisiblePages = 5;

        if (totalPageCount <= maxVisiblePages) {
            for (let i = 1; i <= totalPageCount; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink onClick={() => setCurrentPage(i)} isActive={page === i}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>,
                );
            }
        } else {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink onClick={() => setCurrentPage(1)} isActive={page === 1}>
                        1
                    </PaginationLink>
                </PaginationItem>,
            );

            if (page > 3) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>,
                );
            }

            const start = Math.max(2, page - 1);
            const end = Math.min(totalPageCount - 1, page + 1);

            for (let i = start; i <= end; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink onClick={() => setCurrentPage(i)} isActive={page === i}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>,
                );
            }

            if (page < totalPageCount - 2) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>,
                );
            }

            items.push(
                <PaginationItem key={totalPageCount}>
                    <PaginationLink onClick={() => setCurrentPage(totalPageCount)} isActive={page === totalPageCount}>
                        {totalPageCount}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        return items;
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-3 w-full">
            <div className="flex flex-col gap-4 flex-1">
                <SelectRowsPerPage
                    options={[10, 20, 30]}
                    setPageSize={setLimit}
                    pageSize={pageSize}
                />
            </div>
            {
                totalPageCount > 1 &&
                <Pagination dir="ltr" className={"md:justify-end"}>
                    <PaginationContent className="max-sm:gap-0">
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={handlePreviousPage}
                                aria-disabled={page === 1}
                                tabIndex={page === 1 ? -1 : undefined}
                                className={page === 1 ? "pointer-events-none opacity-50" : undefined}
                            />
                        </PaginationItem>
                        {renderPageNumbers()}
                        <PaginationItem>
                            <PaginationNext
                                onClick={handleNextPage}
                                aria-disabled={page === totalPageCount}
                                tabIndex={page === totalPageCount ? -1 : undefined}
                                className={page === totalPageCount ? "pointer-events-none opacity-50" : undefined}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            }
        </div>
    );
}

function SelectRowsPerPage({
    options,
    setPageSize,
    pageSize,
}: {
    options: number[];
    setPageSize: (newSize: number) => void;
    pageSize: number;
}) {
    return (
        <div className="flex items-center gap-4">
            <span className="whitespace-nowrap text-sm">ردیف ها</span>

            <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
                <SelectTrigger>
                    <SelectValue placeholder="Select page size">{String(pageSize)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={String(option)}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}