'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table"
import Spinner from "@/components/shared/Spinner";
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetAUserQuery } from "@/services/users";
import { useGetTransactionsOfAUserQuery } from "@/services/transaction";
import useError from "@/hooks/useError";
import Pagination from "@/components/shared/Pagination";
import { ITransaction } from "@/types/transaction";
import { TransactionTable } from "../../transaction/Transactions";
import { IComment } from "@/types/comment.type";
import { CommentsTable } from "../../comments/Comments";
import { useGetCommentsOfAUserQuery } from "@/services/comments";


export default function UserMain({ id }: { id: string }) {
    const { user, isLoading } = useAdminGetAUser(id)

    if (isLoading) return (
        <div className="w-full flex justify-center">
            <Spinner />
        </div>
    )

    if (!user) return (
        <div className="w-full text-center">
            کاربری یافت نشد
        </div>
    )

    return (
        <div className="mt-2">

            <h2 className="text-center">مشخصات کاربر</h2>
            <Table>
                <TableBody>
                    <TableRow className='text-start'>
                        <TableHead className="w-[6rem] border-e">نام</TableHead>
                        <TableCell className='pr-5'>{user.name || 'فاقد نام'}</TableCell>
                    </TableRow>
                    <TableRow className='text-start'>
                        <TableHead className="w-[6rem] border-e">نام کاربری</TableHead>
                        <TableCell className='pr-5'>{user.username}</TableCell>
                    </TableRow>
                    <TableRow className='text-start'>
                        <TableHead className="w-[6rem] border-e">ایمیل</TableHead>
                        <TableCell className='pr-5'>{user.email}</TableCell>
                    </TableRow>
                    <TableRow className='text-start'>
                        <TableHead className="w-[6rem] border-e">شماره همراه</TableHead>
                        <TableCell className='pr-5'>{user.phone}</TableCell>
                    </TableRow>
                    <TableRow className='text-start'>
                        <TableHead className="w-[6rem] border-e">آدرس ها</TableHead>
                        <TableCell className='p-0'>
                            {
                                !user.address.length ?
                                    <>
                                        آدرسی ثبت نکرده است
                                    </>
                                    :
                                    user.address.map((address, i) => (
                                        <div key={i} className={`pr-5 p-1  ${i !== user.address.length - 1 ? 'border-b' : ''}`}>
                                            {address}
                                        </div>
                                    ))
                            }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Tabs defaultValue="transactions" className="w-full items-start lg:max-w-6xl lg:p-10 lg:pt-0 mx-auto mt-5" dir="rtl">
                <TabsList>
                    <TabsTrigger value="transactions">تراکنش ها</TabsTrigger>
                    <TabsTrigger value="comments">نظرات</TabsTrigger>
                </TabsList>
                <Card className="w-full">
                    <TabsContent value="transactions">
                        <CardContent>
                            <Transactions id={id} />
                        </CardContent>
                    </TabsContent>

                    <TabsContent value="comments">
                        <CardContent>
                            <Comments id={id} />
                        </CardContent>
                    </TabsContent>
                </Card>
            </Tabs>
        </div>
    )
}

const Transactions = ({ id }: { id: string }) => {
    const queryHook = useGetTransactionsOfAUserQuery;

    return (
        <div className="mt-2">

            <Pagination<ITransaction>
                queryHook={queryHook}
                extraOptions={{ id }}
            >
                {(data: ITransaction[]) => <TransactionTable data={data} />}
            </Pagination>

        </div>
    )
}

const Comments = ({ id }: { id: string }) => {
    const queryHook = useGetCommentsOfAUserQuery;

    return (
        <div className="mt-2">
            <Pagination<IComment>
                queryHook={queryHook}
                extraOptions={{ id }}
            >
                {(data: IComment[]) => <CommentsTable data={data} />}
            </Pagination>
        </div>
    );
}

const useAdminGetAUser = (id: string) => {
    const { data, isError, isLoading, error } = useGetAUserQuery({ id })
    useError(error, isError)

    return {
        user: data,
        isLoading
    }
}