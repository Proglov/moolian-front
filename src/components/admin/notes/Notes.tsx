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
                {(data: INote[], page, perPage) => <ChildComponent data={data} page={page} perPage={perPage} />}
            </Pagination>
        </main>
    );
}


function ChildComponent({ data, page, perPage }: { data: INote[] | [], page: number, perPage: number }) {
    if (!data) return <div>نوتی یافت نشد</div>;

    return (
        <Table dir='rtl'>
            <TableHeader>
                <TableRow>
                    <TableHead>ردیف</TableHead>
                    <TableHead>نام</TableHead>
                    <TableHead>تصویر</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((note, i) => (
                    <TableRow key={note._id}>
                        <TableCell>{(page - 1) * perPage + (i + 1)}</TableCell>
                        <TableCell>{note.name}</TableCell>
                        <TableCell>
                            <Image width={200} height={200} src={note.imageKey} alt={note.name} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}