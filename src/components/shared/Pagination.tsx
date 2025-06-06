'use client';
import Spinner from '@/components/shared/Spinner';
import { PaginationWithLinks } from '../ui/pagination-with-link';
import React, { useState } from 'react';



interface PaginationProps<T> {
    queryHook: any;
    children: (data: T[], page: number, perPage: number) => React.JSX.Element;
    extraOptions?: any
}

export default function Pagination<T>({ queryHook, children, extraOptions }: PaginationProps<T>) {
    const [currenPage, setCurrenPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data, isError, isLoading, isUninitialized, error } = queryHook({ limit, page: currenPage, ...extraOptions });


    if (isLoading || isUninitialized) return <div className='flex justify-center mt-10'><Spinner /></div>;
    if (isError) return <div>{error.toString()}</div>;


    const content = !data || !data.items || !data.items.length ?
        <div>
            موردی یافت نشد
        </div>
        :
        children(data.items, currenPage, limit)

    return (
        <div>
            {content}
            <br />
            <PaginationWithLinks page={currenPage} totalCount={data.count} pageSize={limit} setCurrentPage={setCurrenPage} setLimit={setLimit} />
        </div>
    );
}
