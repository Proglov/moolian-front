'use client';
import { useGetAllUsersQuery } from '@/services/users';
import { IUser } from '@/types/user.type';
import Pagination from '../../shared/Pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Button from '@/components/shared/Button';
import Link from 'next/link';



export default function Users() {
    const queryHook = useGetAllUsersQuery;

    return (
        <Pagination<IUser>
            queryHook={queryHook}
        >
            {(data: IUser[], page, perPage) => <ChildComponent data={data} page={page} perPage={perPage} />}
        </Pagination>
    );
}


function ChildComponent({ data, page, perPage }: { data: IUser[] | [], page: number, perPage: number }) {
    if (!data) return <div>کاربری یافت نشد</div>;

    return (
        <Table dir='rtl'>
            <TableHeader>
                <TableRow>
                    <TableHead>ردیف</TableHead>
                    <TableHead>نام</TableHead>
                    <TableHead>نام کاربری</TableHead>
                    <TableHead>ایمیل</TableHead>
                    <TableHead>شماره همراه</TableHead>
                    <TableHead>عملیات</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((user, i) => (
                    <TableRow key={user._id}>
                        <TableCell>{(page - 1) * perPage + (i + 1)}</TableCell>
                        <TableCell>{user.name || 'فاقد نام'}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                            <Button asChild>
                                <Link href={`/admin/users/${user._id}`}>
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