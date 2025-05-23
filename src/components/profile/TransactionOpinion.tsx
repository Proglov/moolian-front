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
import { Controller, UseFormReturn } from "react-hook-form";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { TOpinionTransactionForm } from "@/hooks/use-myTransactions";
import { FaStar } from "react-icons/fa";


interface IProps {
    dialogIsOpen: boolean,
    setDialogIsOpen: Dispatch<SetStateAction<boolean>>,
    form: UseFormReturn<TOpinionTransactionForm>,
    submit: ({ comment, rate }: TOpinionTransactionForm, page: number) => Promise<void>
    isLoading: boolean
    transactionId: string;
    opinionTransactionId: string;
    page: number;
}

export default function TransactionOpinion({ dialogIsOpen, form, isLoading, setDialogIsOpen, submit, transactionId, opinionTransactionId, page }: IProps) {
    const isMobile = useIsMobile()

    const TitleComponent = (
        <>
            ثبت دیدگاه از سفارش
        </>
    )

    const FormComponent = (
        <div className="m-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => submit(data, page))} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="comment"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    نظر خود را از تجربه خود با ما در میان بگذارید
                                    <span className="text-destructive pt-1.5">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rate"
                        disabled={isLoading}
                        render={() => (
                            <FormItem>
                                <FormLabel>
                                    امتیاز خود را ثبت کنید
                                    <span className="text-destructive pt-1.5">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Controller
                                        control={form.control}
                                        name="rate"
                                        render={({ field: { value, onChange } }) => (
                                            <StarRating value={value || 0} onChange={onChange} disabled={isLoading} />
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-2 mt-2 justify-center">
                        <Button type="submit" disabled={isLoading} loading={isLoading}>ثبت دیدگاه</Button>
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
            <Dialog open={dialogIsOpen && transactionId === opinionTransactionId} onOpenChange={setDialogIsOpen}>
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
        <Drawer open={dialogIsOpen && transactionId === opinionTransactionId} onOpenChange={setDialogIsOpen}>
            <DrawerContent>
                <DrawerHeader className="mr-4">
                    <DrawerTitle>{TitleComponent}</DrawerTitle>
                </DrawerHeader>
                {FormComponent}
            </DrawerContent>
        </Drawer>
    )

}


interface StarRatingProps {
    value: number;
    onChange: (value: number) => void;
    disabled?: boolean;
}
function StarRating({ value, onChange, disabled }: StarRatingProps) {
    return (
        <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={disabled}
                    onClick={() => onChange(star)}
                    className="focus:outline-none"
                    aria-label={`امتیاز ${star}`}
                >
                    <FaStar
                        size={28}
                        className={
                            star <= value
                                ? "text-yellow-400"
                                : "text-gray-300"
                        }
                    />
                </button>
            ))}
        </div>
    );
}