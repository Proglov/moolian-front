'use client';
import { useGetAllProductsQuery } from '@/services/products';
import { IProduct } from '@/types/product.type';
import Pagination from '../shared/Pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



export default function Products() {
    const queryHook = useGetAllProductsQuery;

    return (
        <Pagination<IProduct>
            queryHook={queryHook}
        >
            {(data: IProduct[]) => <ChildComponent data={data} />}
        </Pagination>
    );
}


function ChildComponent({ data }: { data: IProduct[] | [] }) {
    if (!data) return <div>محصولی یافت نشد</div>;

    return (
        <Table dir='rtl'>
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
    );
}