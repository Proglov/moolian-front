import Button from "@/components/shared/Button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { TAddressForm } from "@/hooks/use-checkout";


interface IProps {
    dialogIsOpen: boolean,
    setDialogIsOpen: Dispatch<SetStateAction<boolean>>,
    form: UseFormReturn<TAddressForm>,
    submit: SubmitHandler<{ address: string; }>,
    isLoading: boolean
}

export default function AddressDialog({ dialogIsOpen, form, isLoading, setDialogIsOpen, submit }: IProps) {
    const isMobile = useIsMobile()

    const TitleComponent = (
        <>
            افزودن آدرس جدید
        </>
    )

    const FormComponent = (
        <div className="m-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="address"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    آدرس جدید
                                    <span className="text-destructive pt-1.5">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription className="text-destructive text-right">
                                    آدرس شما باید شامل نام خیابان، نام ساختمان، شماره واحد ساختمان و شماره پلاک باشد.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-2 mt-2 justify-center">
                        <Button type="submit" variant='destructive' disabled={isLoading} loading={isLoading}>ارسال</Button>
                        <Button type="reset" variant='outline' disabled={isLoading} onClick={() => setDialogIsOpen(false)}>
                            لغو
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )

    if (!isMobile) {
        return (
            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
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
            <DrawerContent>
                <DrawerHeader className="mr-4">
                    <DrawerTitle>{TitleComponent}</DrawerTitle>
                </DrawerHeader>
                {FormComponent}
            </DrawerContent>
        </Drawer>
    )

}
