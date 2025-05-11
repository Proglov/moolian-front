'use client';
import { useGetAllTransactionsQuery } from '@/services/transaction';
import Pagination from '../../shared/Pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ITransaction } from '@/types/transaction';
import { formattedTime, statusObject, timeAGO } from '@/lib/utils';
import { addCommas, digitsEnToFa } from '@persian-tools/persian-tools';
import ShowMoreTransaction from './ShowMoreTransaction';
import ToggleTransactionStatus from './ToggleTransactionStatus';
import CancelTransaction from './CancelTransaction';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';



export default function Transactions() {
    const queryHook = useGetAllTransactionsQuery;
    const [onlyRequested, setOnlyRequested] = useState<boolean>(false)

    return (
        <main dir='rtl'>

            <div className="flex items-center space-x-2 mb-5">
                <Checkbox id="terms"
                    checked={onlyRequested}
                    onCheckedChange={(v) => setOnlyRequested(!!v)} />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    فقط سفارشات تایید
                    <span className='text-destructive mx-1'>نشده</span>
                    را نشان بده
                </label>
            </div>

            <Pagination<ITransaction>
                queryHook={queryHook}
                extraOptions={{ onlyRequested }}
            >
                {(data: ITransaction[]) => <ChildComponent data={data} />}
            </Pagination>
        </main>
    );
}


function ChildComponent({ data }: { data: ITransaction[] | [] }) {
    if (!data) return <div>تراکنشی یافت نشد</div>;

    return (
        <Table dir='rtl'>
            <TableHeader>
                <TableRow>
                    <TableHead>نام خریدار</TableHead>
                    <TableHead>شماره خریدار</TableHead>
                    <TableHead>زمان ارسال</TableHead>
                    <TableHead>
                        قیمت نهایی
                        <br />
                        (تومان)
                    </TableHead>
                    <TableHead>وضعیت ارسال</TableHead>
                    <TableHead>عملیات</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(transaction => (
                    <TableRow key={transaction._id}>
                        <TableCell>{transaction.userId.name || 'فاقد نام'}</TableCell>
                        <TableCell>{transaction.userId.phone}</TableCell>
                        <TableCell>
                            {formattedTime(new Date(parseInt(transaction.shouldBeSentAt)))}
                            <br />
                            {timeAGO(new Date(parseInt(transaction.shouldBeSentAt)))}
                        </TableCell>
                        <TableCell>{digitsEnToFa(addCommas(transaction.totalPrice))}</TableCell>
                        <TableCell className={`text-${statusObject[transaction.status].color}`}>{statusObject[transaction.status].fa}</TableCell>
                        <TableCell className='flex flex-col'>
                            <ToggleTransactionStatus _id={transaction._id} object={statusObject[transaction.status]} />
                            <CancelTransaction _id={transaction._id} status={transaction.status} />
                            <ShowMoreTransaction transaction={transaction} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}