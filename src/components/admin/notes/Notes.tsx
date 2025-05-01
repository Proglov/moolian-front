'use client';
import { useGetAllNotesQuery } from '@/services/notes';
import { INote } from '@/types/note.type';
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
import AddNote from './AddNote';



export default function Notes() {
    const queryHook = useGetAllNotesQuery;

    return (
        <main dir='rtl'>
            <AddNote />

            <Pagination<INote>
                queryHook={queryHook}
            >
                {(data: INote[]) => <ChildComponent data={data} />}
            </Pagination>
        </main>
    );
}


function ChildComponent({ data }: { data: INote[] | [] }) {
    if (!data) return <div>نوتی یافت نشد</div>;

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
                        <TableCell>{p.name}</TableCell>
                        <TableCell>
                            <Image width={200} height={200} src={p.imageKey} alt={p.name} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}