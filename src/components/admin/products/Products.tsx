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



export default function Products() {
    const queryHook = useGetAllProductsQuery;

    return (
        <main dir='rtl'>
            <AddProduct />

            <Pagination<IProduct>
                queryHook={queryHook}
            >
                {(data: IProduct[]) => <ChildComponent data={data} />}
            </Pagination>
        </main>
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
                    <TableHead>عملیات</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(p => (
                    <TableRow key={p._id}>
                        <TableCell>{p.nameEN} - {p.nameFA}</TableCell>
                        <TableCell>{p.brandId.nameFA}</TableCell>
                        <TableCell>{p.category}</TableCell>
                        <TableCell>{p.price}</TableCell>
                        <TableCell>
                            <EditProduct product={p} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}