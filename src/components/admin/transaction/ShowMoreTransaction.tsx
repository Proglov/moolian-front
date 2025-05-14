import Button from "@/components/shared/Button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { ITransaction, TXStatus } from "@/types/transaction";
import { formattedTime, timeAGO } from "@/lib/utils";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import { IoIosStar } from "react-icons/io";



export default function ShowMoreTransaction({ transaction }: { transaction: ITransaction }) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false)

    return (
        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="m-3 border-accent text-border-accent" variant='secondary' size='sm'>
                    نمایش بیشتر
                </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-auto max-h-screen">
                <DialogHeader>
                    <DialogTitle className="mb-3">نمایش تراکنش</DialogTitle>
                    <div>


                        {
                            transaction.status === TXStatus.Canceled && (
                                <div className="my-2">
                                    <div className="text-destructive">
                                        لغو شده توسط
                                        {
                                            transaction.canceled?.didSellerCanceled
                                                ? ' شما'
                                                : ' کاربر'
                                        }
                                    </div>
                                    دلیل لغو<span className="text-destructive ml-2">:</span>

                                    {transaction.canceled?.reason}
                                </div>
                            )
                        }


                        <div>
                            آدرس مقصد<span className="text-destructive ml-2">:</span>

                            {transaction.address}
                        </div>

                        <div>
                            زمان خریداری شده
                            <span className="text-destructive ml-2">:</span>

                            {formattedTime(new Date(transaction.createdAt))}
                            {' ، '}
                            {timeAGO(new Date(transaction.createdAt))}
                        </div>

                        <div>
                            هزینه ارسال<span className="text-destructive ml-2">:</span>

                            {digitsEnToFa(addCommas(transaction.shippingCost))}
                            {' '}
                            تومان
                        </div>

                        <div>
                            محصولات خریداری شده<span className="text-destructive ml-2">:</span>

                            <div className="pr-5">
                                {
                                    transaction.boughtProducts.map(p => (
                                        <div key={p.productId._id + p.volume}>
                                            {p.productId.nameFA}
                                            {' '}
                                            {digitsEnToFa(p.volume)}
                                            {' '}
                                            میل
                                            {' '}
                                            <span className="text-destructive">{'<'}</span>
                                            {digitsEnToFa(p.quantity)}
                                            {' '}
                                            عدد
                                            <span className="text-destructive">{'>'}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        {
                            transaction.opinion && (
                                <div>
                                    نظر کاربر<span className="text-destructive ml-2">:</span>

                                    <div className="pr-5 text-yellow-400 flex">
                                        {
                                            Array.from({ length: transaction.opinion.rate }, (_, i) => <IoIosStar key={i} />)
                                        }
                                    </div>

                                    <div className="pr-5">
                                        {transaction.opinion.comment}
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
