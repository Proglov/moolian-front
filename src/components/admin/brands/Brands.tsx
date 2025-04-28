'use client';
import { useGetAllBrandsQuery } from '@/services/brands';
import { IBrand } from '@/types/brand.type';
import Pagination from '../../shared/Pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image';
import AddBrand from './AddBrand';



export default function Brands() {
    const queryHook = useGetAllBrandsQuery;

    return (
        <main dir='rtl'>
            <AddBrand />

            <Pagination<IBrand>
                queryHook={queryHook}
            >
                {(data: IBrand[]) => <ChildComponent data={data} />}
            </Pagination>
        </main>
    );
}


function ChildComponent({ data }: { data: IBrand[] | [] }) {
    if (!data) return <div>محصولی یافت نشد</div>;

    return (
        <Table dir='rtl'>
            <TableHeader>
                <TableRow>
                    <TableHead>نام</TableHead>
                    <TableHead>تصویر</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(p => (
                    <TableRow key={p._id}>
                        <TableCell>{p.nameEN} - {p.nameFA}</TableCell>
                        <TableCell>
                            <Image width={200} height={200} src={p.imageKey} alt={p.nameEN} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}