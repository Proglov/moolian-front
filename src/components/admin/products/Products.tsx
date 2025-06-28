'use client';
import { useGetAllProductsQuery } from '@/services/products';
import { IProduct } from '@/types/product.type';
import Pagination from '../../shared/Pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { categoriesObject } from '@/lib/utils';



export default function Products() {
    const queryHook = useGetAllProductsQuery;

    return (
        <main dir='rtl'>
            <AddProduct />

            <Pagination<IProduct>
                queryHook={queryHook}
            >
                {(data: IProduct[], page, perPage) => <ChildComponent data={data} page={page} perPage={perPage} />}
            </Pagination>
        </main>
    );
}


function ChildComponent({ data, page, perPage }: { data: IProduct[] | [], page: number, perPage: number }) {
    if (!data) return <div>محصولی یافت نشد</div>;

    return (
        <Table dir='rtl'>
            <TableHeader>
                <TableRow>
                    <TableHead>ردیف</TableHead>
                    <TableHead>نام</TableHead>
                    <TableHead>برند</TableHead>
                    <TableHead>دسته بندی</TableHead>
                    <TableHead>قیمت</TableHead>
                    <TableHead>ستاره</TableHead>
                    <TableHead>عملیات</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((p, i) => (
                    <TableRow key={p._id}>
                        <TableCell>{(page - 1) * perPage + (i + 1)}</TableCell>
                        <TableCell>{p.nameEN} - {p.nameFA}</TableCell>
                        <TableCell>{p.brandId.nameFA}</TableCell>
                        <TableCell>{categoriesObject[p.category] || '-'}</TableCell>
                        <TableCell>{p.price}</TableCell>
                        <TableCell>
                            {
                                !p.rates || !p.rates.length ?
                                    '-'
                                    :
                                    p.rates.reduce((prev, curr) => prev + curr.count, 0) / p.rates.length
                            }
                        </TableCell>
                        <TableCell className='flex flex-col gap-2'>
                            <EditProduct product={p} />
                            <Button asChild>
                                <Link href={`/admin/products/${p._id}`}>
                                    مشاهده بیشتر
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}