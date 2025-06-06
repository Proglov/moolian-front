'use client'
import Button from "@/components/shared/Button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useIsMobile } from "@/hooks/use-mobile";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Controller } from "react-hook-form";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { StarRating } from "@/components/profile/TransactionOpinion";
import { useAddRate } from "@/hooks/use-addRate";
import { FaStar } from "react-icons/fa";


interface IProps {
    _id: string
}

export default function AddRateDialog({ _id }: IProps) {
    const isMobile = useIsMobile()
    const { dialogIsOpen, form, isLoading, setDialogIsOpen, submit, onDialogOpen } = useAddRate()

    const TitleComponent = (
        <>
            امتیاز به محصول
        </>
    )

    const FormComponent = (
        <div className="m-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => submit(data, _id))} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="count"
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
                                        name="count"
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
                        <Button type="submit" disabled={isLoading} loading={isLoading}>ثبت امتیاز</Button>
                        <Button type="reset" variant='outline' disabled={isLoading} onClick={() => setDialogIsOpen(false)}>
                            بازگشت
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )

    const Trigger = (
        <Button className="flex items-center gap-2 cursor-pointer text-base my-4 border-success text-success hover:text-success" variant='outline' size='lg' onClick={() => onDialogOpen()}>
            <FaStar className="text-yellow-400" />
            ثبت امتیاز
        </Button>
    )

    if (!isMobile) {
        return (
            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                {Trigger}
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
        <Drawer open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            {Trigger}
            <DrawerContent>
                <DrawerHeader className="mr-4">
                    <DrawerTitle>{TitleComponent}</DrawerTitle>
                </DrawerHeader>
                {FormComponent}
            </DrawerContent>
        </Drawer>
    )

}