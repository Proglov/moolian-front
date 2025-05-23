'use client'
import Button from "@/components/shared/Button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { TCancelTransactionForm } from "@/hooks/use-myTransactions";


interface IProps {
    dialogIsOpen: boolean,
    setDialogIsOpen: Dispatch<SetStateAction<boolean>>,
    form: UseFormReturn<TCancelTransactionForm>,
    submit: ({ reason }: TCancelTransactionForm, page: number) => Promise<void>
    isLoading: boolean
    transactionId: string;
    cancelTransactionId: string;
    page: number;
}

export default function TransactionCancel({ dialogIsOpen, form, isLoading, setDialogIsOpen, submit, transactionId, cancelTransactionId, page }: IProps) {
    const isMobile = useIsMobile()

    const TitleComponent = (
        <>
            لغو سفارش
        </>
    )

    const FormComponent = (
        <div className="m-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => submit(data, page))} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="reason"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    علت لغو سفارش خود را وارد کنید
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
                        <Button type="submit" variant='destructive' disabled={isLoading} loading={isLoading}>لغو سفارش</Button>
                        <Button type="reset" variant='outline' disabled={isLoading} onClick={() => setDialogIsOpen(false)}>
                            بازگشت
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )

    if (!isMobile) {
        return (
            <Dialog open={dialogIsOpen && transactionId === cancelTransactionId} onOpenChange={setDialogIsOpen}>
                <DialogContent className="overflow-y-auto max-h-screen">
                    <DialogHeader>
                        <DialogTitle className="mb-3">  {TitleComponent} </DialogTitle>
                        <DialogDescription className="text-center" asChild>
                            {FormComponent}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={dialogIsOpen && transactionId === cancelTransactionId} onOpenChange={setDialogIsOpen}>
            <DrawerContent>
                <DrawerHeader className="mr-4">
                    <DrawerTitle>{TitleComponent}</DrawerTitle>
                </DrawerHeader>
                {FormComponent}
            </DrawerContent>
        </Drawer>
    )

}
