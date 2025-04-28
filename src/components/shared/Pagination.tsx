'use client';
import Spinner from '@/components/shared/Spinner';
import { PaginationWithLinks } from '../ui/pagination-with-link';
import { useState } from 'react';



interface PaginationProps<T> {
    queryHook: any;
    children: (data: T[]) => JSX.Element;
}

export default function Pagination<T>({ queryHook, children }: PaginationProps<T>) {
    const [currenPage, setCurrenPage] = useState(1);
    const [limit, setLimit] = useState(2);
    const { data, isError, isLoading, isUninitialized, error } = queryHook({ limit, page: currenPage });


    if (isLoading || isUninitialized) return <div className='flex justify-center mt-10'><Spinner /></div>;
    if (isError) return <div>{error.toString()}</div>;



    let content = !data ?
        <div>
            موردی یافت نشد
        </div>
        :
        children(data.items)

    return (
        <div>
            {content}
            <br />
            <PaginationWithLinks page={currenPage} totalCount={data.count} pageSize={limit} setCurrentPage={setCurrenPage} setLimit={setLimit} />
        </div>
    );
}
