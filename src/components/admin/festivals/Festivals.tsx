'use client';
import { useGetAllFestivalsQuery } from '@/services/festival';
import Pagination from '../../shared/Pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IFestival } from '@/types/festival';
import DeleteFestival from './DeleteFestival';
import { formattedTime, timeAGO } from '@/lib/utils';
import { digitsEnToFa } from '@persian-tools/persian-tools';
import AddFestival from './AddFestival';



export default function Festivals() {
    const queryHook = useGetAllFestivalsQuery;

    return (
        <main dir='rtl'>
            <AddFestival />

            <Pagination<IFestival>
                queryHook={queryHook}
            >
                {(data: IFestival[]) => <ChildComponent data={data} />}
            </Pagination>
        </main>
    );
}


function ChildComponent({ data }: { data: IFestival[] | [] }) {
    if (!data) return <div>جشنواره ای یافت نشد</div>;


    return (
        <Table dir='rtl'>
            <TableHeader>
                <TableRow>
                    <TableHead>نام محصول</TableHead>
                    <TableHead>تخفیف جشنواره</TableHead>
                    <TableHead>مدت زمان جشنواره</TableHead>
                    <TableHead>عملیات</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(festival => (
                    <TableRow key={festival._id}>
                        <TableCell>{festival.productId.nameFA}</TableCell>
                        <TableCell>{digitsEnToFa(festival.offPercentage)} %</TableCell>
                        <TableCell>
                            {formattedTime(new Date(parseInt(festival.until)))}
                            <br />
                            {timeAGO(new Date(parseInt(festival.until)))}
                        </TableCell>
                        <TableCell>
                            <DeleteFestival _id={festival._id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}