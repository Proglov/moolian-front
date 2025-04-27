'use client';
import Spinner from '@/components/shared/Spinner';
import { PaginationWithLinks } from '../ui/pagination-with-link';



interface PaginationProps<T> {
    queryHook: any;
    currenPage: number;
    children: (data: T[]) => JSX.Element;
}

export default function Pagination<T>({ queryHook, children, currenPage }: PaginationProps<T>) {
    const limit = 2;
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
            <PaginationWithLinks page={currenPage} totalCount={data.count} pageSize={limit} />
        </div>
    );
}
