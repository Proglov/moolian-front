import Button from "@/components/shared/Button";
import { useToggleTransactionStatusMutation } from "@/services/transaction";
import { TStatusValues } from "@/types/transaction";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useCancelTransactionBySellerMutation } from "@/services/transaction";
import { TXStatus } from "@/types/transaction";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";




export default function ToggleTransactionStatus({ _id, object }: { _id: string, object?: TStatusValues }) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [toggleTransactionStatus, { isLoading, isSuccess }] = useToggleTransactionStatusMutation()

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
        }
    }, [isSuccess])

    if (!object?.next || !object.nextColor || !object.nextFA)
        return null

    const nextStatus = object.next;

    return (

        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className={`m-3 border-${object.nextColor} text-${object.nextColor}`} variant='outline' size='sm'>
                    {object.nextFA}
                </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-auto max-h-screen">
                <DialogHeader>
                    <DialogTitle className="mb-3">{object.nextFA} تراکنش</DialogTitle>
                    <DialogDescription className="text-center" asChild>
                        <div>
                            <div className="text-base">
                                آیا از {object.nextFA} این تراکنش مطمئن هستید؟
                            </div>

                            <div className="flex gap-2 mt-2 justify-center">
                                <Button disabled={isLoading} onClick={() => { toggleTransactionStatus({ _id, status: nextStatus }) }}>
                                    {object.nextFA}
                                </Button>
                                <Button variant='outline' disabled={isLoading} onClick={() => setDialogIsOpen(false)}>
                                    کنسل
                                </Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}