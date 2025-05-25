'use client'
import useMyTransactions, { TCancelTransactionForm, TOpinionTransactionForm } from "@/hooks/use-myTransactions"
import { ITransactionWithPage, TXStatus } from "@/types/transaction"
import Spinner from "../shared/Spinner"
import { MotionDiv } from "../shared/MotionDiv"
import { Card, CardContent } from "../ui/card"
import { formattedTime, statusObjectUser, timeFromNow } from "@/lib/utils"
import { digitsEnToFa } from "@persian-tools/persian-tools"
import TransactionCancel from "./TransactionCancel"
import { UseFormReturn } from "react-hook-form"
import { Dispatch, SetStateAction } from "react"
import Button from "../shared/Button"
import TransactionOpinion from "./TransactionOpinion"
import SemiColon from "../shared/SemiColon"

const CancellationLimit = 60 * 60 * 1000;

export default function Transactions() {
    const { transactions, isFinished, ref, CancelTransactionForm, isCancelTransactionLoading, cancelTransactionDialogIsOpen, setCancelTransactionDialogIsOpen, cancelTransactionSubmit, onCancelDialogOpen, cancelTransactionId, OpinionTransactionForm, isOpinionTransactionLoading, onOpinionDialogOpen, opinionTransactionDialogIsOpen, opinionTransactionId, opinionTransactionSubmit, setOpinionTransactionDialogIsOpen } = useMyTransactions()

    return (
        <div>
            <div>
                {
                    (!transactions || transactions.length === 0) && isFinished ?
                        <div className='w-full flex justify-center'>نتیجه ای یافت نشد</div>
                        :
                        <div className='flex flex-col gap-x-4 gap-y-4'>
                            {
                                transactions.map(transaction => (
                                    <TransactionCard key={transaction._id} transaction={transaction} CancelTransactionForm={CancelTransactionForm} isCancelTransactionLoading={isCancelTransactionLoading} setCancelTransactionDialogIsOpen={setCancelTransactionDialogIsOpen} cancelTransactionDialogIsOpen={cancelTransactionDialogIsOpen} cancelTransactionSubmit={cancelTransactionSubmit} onCancelDialogOpen={onCancelDialogOpen} cancelTransactionId={cancelTransactionId} OpinionTransactionForm={OpinionTransactionForm} isOpinionTransactionLoading={isOpinionTransactionLoading} onOpinionDialogOpen={onOpinionDialogOpen} opinionTransactionDialogIsOpen={opinionTransactionDialogIsOpen} opinionTransactionId={opinionTransactionId} opinionTransactionSubmit={opinionTransactionSubmit} setOpinionTransactionDialogIsOpen={setOpinionTransactionDialogIsOpen} />
                                ))
                            }
                        </div>
                }
            </div>

            {!isFinished && <div className="w-full flex justify-center" ref={ref}><Spinner /></div>}
        </div>
    )
}

interface ITransactionCard {
    transaction: ITransactionWithPage;

    CancelTransactionForm: UseFormReturn<TCancelTransactionForm>;
    isCancelTransactionLoading: boolean;
    cancelTransactionDialogIsOpen: boolean;
    setCancelTransactionDialogIsOpen: Dispatch<SetStateAction<boolean>>;
    cancelTransactionSubmit: ({ reason }: TCancelTransactionForm, page: number) => Promise<void>;
    onCancelDialogOpen: (cancelTransactionId: string) => void;
    cancelTransactionId: string;

    opinionTransactionDialogIsOpen: boolean,
    setOpinionTransactionDialogIsOpen: Dispatch<SetStateAction<boolean>>,
    OpinionTransactionForm: UseFormReturn<TOpinionTransactionForm>,
    opinionTransactionSubmit: ({ comment, rate }: TOpinionTransactionForm, page: number) => Promise<void>
    isOpinionTransactionLoading: boolean;
    opinionTransactionId: string;
    onOpinionDialogOpen: (opinionTransactionId: string) => void;
}
const TransactionCard = ({ transaction, CancelTransactionForm, isCancelTransactionLoading, setCancelTransactionDialogIsOpen, cancelTransactionDialogIsOpen, cancelTransactionSubmit, onCancelDialogOpen, cancelTransactionId, OpinionTransactionForm, isOpinionTransactionLoading, onOpinionDialogOpen, opinionTransactionDialogIsOpen, opinionTransactionId, opinionTransactionSubmit, setOpinionTransactionDialogIsOpen }
    : ITransactionCard) => {
    return (
        <MotionDiv
            initial='hidden'
            whileInView='visible'
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
            }}
            transition={{
                ease: 'easeInOut',
                duration: 0.5,
            }}
            viewport={{ amount: 0.25, once: true }}
        >
            <Card className="h-full p-4 overflow-hidden">
                <CardContent className="flex flex-col gap-4 relative h-full p-0">

                    {/* status */}
                    <div className="flex justify-start items-center text-xs sm:text-base">
                        <p className="text-base">
                            وضعیت سفارش<SemiColon />
                        </p>

                        <div className="ml-0.5" style={{ color: statusObjectUser[transaction.status].color }}>{statusObjectUser[transaction.status].fa}</div>

                        {
                            (transaction.status !== TXStatus.Received && transaction.status !== TXStatus.Canceled) &&
                            <div style={{ color: statusObjectUser[transaction.status].nextColor }}>
                                (
                                مرحله بعد
                                <SemiColon />
                                {' '}
                                {
                                    statusObjectUser[transaction.status].nextFA
                                }
                                )
                            </div>
                        }
                    </div>

                    {/* canceled TX */}
                    {
                        transaction.canceled &&
                        <div>
                            <div className="text-destructive">
                                لغو شده توسط
                                {
                                    transaction.canceled.didSellerCanceled
                                        ? ' فروشگاه'
                                        : ' شما'
                                }
                            </div>
                            دلیل لغو<SemiColon /> {transaction.canceled.reason}
                        </div>
                    }

                    {/* totalDiscount */}
                    {
                        transaction.totalDiscount &&
                        <div>تخفیف<SemiColon /> {transaction.totalDiscount.toLocaleString('fa-IR')} تومان</div>
                    }

                    {/* shippingCost */}
                    {
                        <div>هزینه ارسال<SemiColon /> {transaction.shippingCost.toLocaleString('fa-IR')} تومان</div>
                    }

                    {/* totalPrice */}
                    <div>قیمت نهایی<SemiColon /> {transaction.totalPrice.toLocaleString('fa-IR')} تومان</div>

                    {/* createdAt */}
                    <div>
                        زمان خریداری شده<SemiColon />

                        {' '}
                        {formattedTime(new Date(transaction.createdAt))}
                        {' ، '}
                        {timeFromNow(new Date(transaction.createdAt))}
                    </div>

                    {/* address */}
                    <div>آدرس ارسال<SemiColon /> {transaction.address}</div>

                    {/* boughtProducts */}
                    <div>
                        محصولات خریداری شده<SemiColon />

                        <div className="pr-5">
                            {transaction.boughtProducts.map(bp => (
                                <div key={transaction._id + bp.productId._id + bp.quantity + bp.volume} className="flex justify-start gap-1">
                                    <div>
                                        {bp.productId.nameFA}
                                    </div>

                                    <div>
                                        {digitsEnToFa(bp.volume)}

                                        میل
                                    </div>

                                    <div>
                                        <span className="text-destructive">{'<'}</span>
                                        {digitsEnToFa(bp.quantity)}

                                        عدد
                                        <span className="text-destructive">{'>'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* cancel and opinion buttons */}
                    <div className="flex justify-center gap-2">
                        {
                            (!!transaction.opinion && (transaction.status === TXStatus.Received || transaction.status === TXStatus.Canceled)) &&
                            <Button
                                onClick={() => onOpinionDialogOpen(transaction._id)}
                            >
                                ثبت نظر
                            </Button>
                        }
                        {
                            (transaction.status === TXStatus.Requested && Date.now() - new Date(transaction.createdAt).getTime() <= CancellationLimit) &&
                            <Button
                                variant='destructive'
                                onClick={() => onCancelDialogOpen(transaction._id)}
                            >
                                لغو سفارش
                            </Button>
                        }
                    </div>

                    {/* cancel dialog */}
                    <TransactionCancel dialogIsOpen={cancelTransactionDialogIsOpen} form={CancelTransactionForm} isLoading={isCancelTransactionLoading} setDialogIsOpen={setCancelTransactionDialogIsOpen} submit={cancelTransactionSubmit} transactionId={transaction._id} cancelTransactionId={cancelTransactionId} page={transaction.page} />

                    {/* opinion dialog */}
                    <TransactionOpinion dialogIsOpen={opinionTransactionDialogIsOpen} form={OpinionTransactionForm} isLoading={isOpinionTransactionLoading} setDialogIsOpen={setOpinionTransactionDialogIsOpen} submit={opinionTransactionSubmit} transactionId={transaction._id} opinionTransactionId={opinionTransactionId} page={transaction.page} />

                </CardContent>
            </Card>
        </MotionDiv>
    )
}

