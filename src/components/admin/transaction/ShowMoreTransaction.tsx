import Button from "@/components/shared/Button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { ITransaction } from "@/types/transaction";
import { formattedTime, timeAGO } from "@/lib/utils";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";



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

                        <div>
                            آدرس مقصد<span className="text-destructive ml-2">:</span>

                            {transaction.address}
                        </div>

                        <div>
                            زمان خریداری شده<span className="text-destructive ml-2">:</span>

                            {formattedTime(new Date(parseInt(transaction.shouldBeSentAt)))}
                            {' '}
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
                                        <div key={p.productId._id}>
                                            {p.productId.nameFA}
                                            {' '}
                                            {p.quantity}
                                            {' '}
                                            عدد
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
