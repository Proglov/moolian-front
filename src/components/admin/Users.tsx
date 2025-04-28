'use client';
import { useGetAllUsersQuery } from '@/services/users';
import { IUser } from '@/types/user.type';
import Pagination from '../shared/Pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



export default function Users() {
    const queryHook = useGetAllUsersQuery;

    return (
        <Pagination<IUser>
            queryHook={queryHook}
        >
            {(data: IUser[]) => <ChildComponent data={data} />}
        </Pagination>
    );
}


function ChildComponent({ data }: { data: IUser[] | [] }) {
    if (!data) return <div>محصولی یافت نشد</div>;

    return (
        <Table dir='rtl'>
            <TableHeader>
                <TableRow>
                    <TableHead>نام</TableHead>
                    <TableHead>نام کاربری</TableHead>
                    <TableHead>ایمیل</TableHead>
                    <TableHead>شماره همراه</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(user => (
                    <TableRow key={user._id}>
                        <TableCell>{user.name || 'فاقد نام'}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}