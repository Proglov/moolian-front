import Button from "@/components/shared/Button";
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



export default function CancelTransaction({ _id, status }: { _id: string, status: TXStatus }) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [cancelTX, { isSuccess, isLoading }] = useCancelTransactionBySellerMutation()

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
        }
    }, [isSuccess])

    if (status === TXStatus.Canceled || status === TXStatus.Received)
        return null

    return (
        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="m-3 border-destructive text-destructive" variant='outline' size='sm'>
                    کنسل کردن
                </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-auto max-h-screen">
                <DialogHeader>
                    <DialogTitle className="mb-3">کنسل کردن تراکنش</DialogTitle>
                    <DialogDescription className="text-center" asChild>
                        <div>
                            <div className="text-base">
                                آیا از کنسل کردن این تراکنش مطمئن هستید؟
                            </div>

                            <div className="flex gap-2 mt-2 justify-center">
                                <Button variant='destructive' disabled={isLoading} onClick={() => { cancelTX(_id) }}>
                                    کنسل شود
                                </Button>
                                <Button variant='outline' disabled={isLoading} onClick={() => setDialogIsOpen(false)}>
                                    کنسل نشود
                                </Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
