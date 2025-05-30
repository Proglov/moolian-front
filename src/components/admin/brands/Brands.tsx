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
import DeleteBrand from './DeleteBrand';
import EditBrand from './EditBrand';



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
    if (!data) return <div>برندی یافت نشد</div>;

    return (
        <Table dir='rtl'>
            <TableHeader>
                <TableRow>
                    <TableHead>نام</TableHead>
                    <TableHead>تصویر</TableHead>
                    <TableHead>عملیات</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(brand => (
                    <TableRow key={brand._id}>
                        <TableCell> {brand.nameFA} - {brand.nameEN} </TableCell>
                        <TableCell>
                            <Image width={200} height={200} src={brand.imageKey} alt={brand.nameEN} />
                        </TableCell>
                        <TableCell className='flex flex-col'>
                            <DeleteBrand _id={brand._id} />
                            <EditBrand brand={brand} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}