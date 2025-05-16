import Button from "@/components/shared/Button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCancelTransactionBySellerMutation } from "@/services/transaction";
import { TXStatus } from "@/types/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const FormSchema = z.object({
    reason: z.string().nonempty({ message: 'علت کنسلی الزامیست' })
})
type TForm = z.infer<typeof FormSchema>;
const defaultValues: TForm = { reason: '' }
const resolver = zodResolver(FormSchema)

export default function CancelTransaction({ _id, status }: { _id: string, status: TXStatus }) {
    const form = useForm<TForm>({ resolver, defaultValues })
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [cancelTX, { isSuccess, isLoading }] = useCancelTransactionBySellerMutation()

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
        }
    }, [isSuccess])

    const submit = ({ reason }: TForm) => {
        cancelTX({ _id, reason: reason })
    }

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

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="reason"
                                        disabled={isLoading}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    علت کنسلی
                                                    <span className="text-destructive pt-1.5">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex gap-2 mt-2 justify-center">
                                        <Button type="submit" variant='destructive' disabled={isLoading} loading={isLoading}>کنسل شود</Button>
                                        <Button type='reset' variant='outline' disabled={isLoading} onClick={() => setDialogIsOpen(false)}>
                                            کنسل نشود
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
