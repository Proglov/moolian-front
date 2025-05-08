'use client';
import { useGetAllCommentsQuery } from '@/services/comments';
import { IComment } from '@/types/comment.type';
import Pagination from '../../shared/Pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import ToggleComment from './ToggleComment';
import DeleteComment from './DeleteComment';



export default function Comments() {
    const queryHook = useGetAllCommentsQuery;

    return (
        <main dir='rtl'>

            <Pagination<IComment>
                queryHook={queryHook}
            >
                {(data: IComment[]) => <ChildComponent data={data} />}
            </Pagination>
        </main>
    );
}


function ChildComponent({ data }: { data: IComment[] | [] }) {
    if (!data) return <div>نوتی یافت نشد</div>;

    return (
        <Table dir='rtl'>
            <TableHeader>
                <TableRow>
                    <TableHead>نام کاربر</TableHead>
                    <TableHead>نام محصول</TableHead>
                    <TableHead>متن کامنت</TableHead>
                    <TableHead>لایک ها</TableHead>
                    <TableHead>دیسلایک ها</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead>عملیات</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(comment => (
                    <TableRow key={comment._id}>
                        <TableCell>{comment.userId.name || 'فاقد نام'}</TableCell>
                        <TableCell>{comment.productId.nameFA}</TableCell>
                        <TableCell>{comment.body}</TableCell>
                        <TableCell>{comment.likeIds.length}</TableCell>
                        <TableCell>{comment.disLikeIds.length}</TableCell>
                        <TableCell>
                            <div className='h-full w-full flex justify-center'>
                                <div className={`h-2 w-2 rounded-full ${comment.validated ? 'bg-green-600' : 'bg-red-600'}`} />
                            </div>
                        </TableCell>
                        <TableCell>
                            <ToggleComment _id={comment._id} validated={comment.validated} />
                            <DeleteComment _id={comment._id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}