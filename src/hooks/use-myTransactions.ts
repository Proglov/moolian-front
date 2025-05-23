import { isFetchBaseQueryError } from "@/lib/utils";
import { useAddOpinionTransactionMutation, useCancelTransactionByUserMutation, useGetMyTransactionsQuery } from "@/services/transaction";
import { ITransaction, ITransactionWithPage } from "@/types/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import { z } from "zod";



export default function useMyTransactions() {
    const limit = 2;
    const [page, setPage] = useState(1)
    const [refetchPage, setRefetchPage] = useState(0)
    const [transactions, setTransactions] = useState<ITransactionWithPage[]>([])
    const [isFinished, setIsFinished] = useState(false)
    const { ref, inView } = useInView()
    const { data, isSuccess, isFetching } = useGetMyTransactionsQuery({ page: refetchPage || page, limit })
    const { CancelTransactionForm, isCancelTransactionLoading, setCancelTransactionDialogIsOpen, cancelTransactionDialogIsOpen, onCancelDialogOpen, cancelTransactionId, cancelTransaction } = useCancelTransaction()
    const { OpinionTransactionForm, isOpinionTransactionLoading, setOpinionTransactionDialogIsOpen, opinionTransactionDialogIsOpen, onOpinionDialogOpen, opinionTransactionId, opinionTransaction } = useOpinionTransaction()

    const setTransactionsHelper = (transactions: ITransaction[]) => setTransactions(prev => {
        const prevMap = new Map(prev.map(item => [item._id, item]));
        transactions.forEach(item => prevMap.set(item._id, { ...item, page }));
        return Array.from(prevMap.values());
    });

    const cancelTransactionSubmit = async ({ reason }: TCancelTransactionForm, page: number) => {
        try {
            await cancelTransaction({ _id: cancelTransactionId, reason, limit, page })
            setRefetchPage(page)
        } catch (error) {
            return
        }
    }

    const opinionTransactionSubmit = async ({ comment, rate }: TOpinionTransactionForm, page: number) => {
        try {
            await opinionTransaction({ _id: opinionTransactionId, comment, rate, limit, page })
            setRefetchPage(page)
        } catch (error) {
            return
        }
    }


    useEffect(() => {
        if (isSuccess) {
            setTransactionsHelper(data.items);
            setIsFinished(data.count <= page * limit);
            setRefetchPage(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isSuccess, setTransactions, setIsFinished]);

    useEffect(() => {
        if (inView && !isFinished && transactions.length && !isFetching) {
            setPage(prev => prev + 1)
        }
    }, [inView, isFinished, transactions.length, isFetching, setPage]);

    return {
        transactions,
        isFinished,
        ref,
        CancelTransactionForm,
        isCancelTransactionLoading,
        setCancelTransactionDialogIsOpen,
        cancelTransactionDialogIsOpen,
        cancelTransactionSubmit,
        onCancelDialogOpen,
        cancelTransactionId,
        OpinionTransactionForm,
        isOpinionTransactionLoading,
        setOpinionTransactionDialogIsOpen,
        opinionTransactionDialogIsOpen,
        opinionTransactionSubmit,
        onOpinionDialogOpen,
        opinionTransactionId
    }
}


//* cancel transaction
const CancelTransactionFormSchema = z.object({
    reason: z.string().nonempty({ message: 'علت لغو الزامیست' }),
})
export type TCancelTransactionForm = z.infer<typeof CancelTransactionFormSchema>;
const cancelTransactionDefaultValues: TCancelTransactionForm = { reason: '' }
const cancelTransactionResolver = zodResolver(CancelTransactionFormSchema)

const useCancelTransaction = () => {
    const form = useForm<TCancelTransactionForm>({ resolver: cancelTransactionResolver, defaultValues: cancelTransactionDefaultValues })
    const [cancelTransaction, { isError, error, isSuccess, isLoading, data }] = useCancelTransactionByUserMutation()
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const [cancelTransactionId, setCancelTransactionId] = useState<string>('');

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
            toast.success('با موفقیت انجام شد')
        }
    }, [isSuccess, data])

    useEffect(() => {
        if (isFetchBaseQueryError(error)) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError, error])


    const onDialogOpen = (cancelTransactionId: string) => {
        setDialogIsOpen(true);
        form.reset();
        setCancelTransactionId(cancelTransactionId)
    }

    return { cancelTransactionDialogIsOpen: dialogIsOpen, CancelTransactionForm: form, setCancelTransactionDialogIsOpen: setDialogIsOpen, isCancelTransactionLoading: isLoading, onCancelDialogOpen: onDialogOpen, cancelTransactionId, cancelTransaction }
}


//* add opinion to transaction
const OpinionTransactionFormSchema = z.object({
    comment: z.string().nonempty({ message: 'علت لغو الزامیست' }),
    rate: z.number().min(1, { message: 'حداقل امتیاز 1 است' }).max(5, { message: 'حداکثر امتیاز 5 است' })
})
export type TOpinionTransactionForm = z.infer<typeof OpinionTransactionFormSchema>;
const opinionTransactionDefaultValues: TOpinionTransactionForm = { comment: '', rate: 0 }
const opinionTransactionResolver = zodResolver(OpinionTransactionFormSchema)

const useOpinionTransaction = () => {
    const form = useForm<TOpinionTransactionForm>({ resolver: opinionTransactionResolver, defaultValues: opinionTransactionDefaultValues })
    const [opinionTransaction, { isError, error, isSuccess, isLoading, data }] = useAddOpinionTransactionMutation()
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const [opinionTransactionId, setOpinionTransactionId] = useState<string>('');

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
            toast.success('سپاس از نظر شما')
        }
    }, [isSuccess, data])

    useEffect(() => {
        if (isFetchBaseQueryError(error)) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError, error])


    const onDialogOpen = (opinionTransactionId: string) => {
        setDialogIsOpen(true);
        form.reset();
        setOpinionTransactionId(opinionTransactionId)
    }

    return { opinionTransactionDialogIsOpen: dialogIsOpen, OpinionTransactionForm: form, setOpinionTransactionDialogIsOpen: setDialogIsOpen, isOpinionTransactionLoading: isLoading, onOpinionDialogOpen: onDialogOpen, opinionTransactionId, opinionTransaction }
}
