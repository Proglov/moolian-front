'use client';
import { useGetAllProductsQuery } from '@/services/products';
import { IProduct } from '@/types/product.type';
import Pagination from '../shared/Pagination';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



export default function Products({
    currenPage }: {
        currenPage: number;
    }) {
    const queryHook = useGetAllProductsQuery;

    return (
        <Pagination<IProduct>
            queryHook={queryHook}
            currenPage={currenPage}
        >
            {(data: IProduct[]) => <ChildComponent data={data} />}
        </Pagination>
    );
}


function ChildComponent({ data }: { data: IProduct[] | [] }) {
    if (!data) return <div>محصولی یافت نشد</div>;

    return (
        <div className='max-w-5xl mx-auto'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>نام</TableHead>
                        <TableHead>برند</TableHead>
                        <TableHead>دسته بندی</TableHead>
                        <TableHead>قیمت</TableHead>
                        <TableHead>توضیحات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(p => (
                        <TableRow key={p._id}>
                            <TableCell>{p.nameEN} - {p.nameFA}</TableCell>
                            <TableCell>{p.brandId.nameFA}</TableCell>
                            <TableCell>{p.category}</TableCell>
                            <TableCell>{p.price}</TableCell>
                            <TableCell className='text-justify'>{p.desc}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}