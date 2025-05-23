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
import { formattedTime, statusObject, timeFromNow } from '@/lib/utils';
import { addCommas, digitsEnToFa } from '@persian-tools/persian-tools';
import ShowMoreTransaction from './ShowMoreTransaction';
import ToggleTransactionStatus from './ToggleTransactionStatus';
import CancelTransaction from './CancelTransaction';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';

type FormFields = {
    onlyRequested: boolean;
};

export default function Transactions() {
    const { control, watch } = useForm<FormFields>({ defaultValues: { onlyRequested: false } });
    const onlyRequested = watch('onlyRequested');

    const queryHook = useGetAllTransactionsQuery;

    return (
        <main dir='rtl'>
            <form>
                <div className="flex items-center space-x-2 mb-5">
                    <Controller
                        name="onlyRequested"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                id="onlyRequested"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        )}
                    />
                    <label
                        htmlFor="onlyRequested"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        فقط سفارشات تایید
                        <span className='text-destructive mx-1'>نشده</span>
                        را نشان بده
                    </label>
                </div>
            </form>

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
                            {timeFromNow(new Date(parseInt(transaction.shouldBeSentAt)))}
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
