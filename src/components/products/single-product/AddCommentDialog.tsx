import Button from "@/components/shared/Button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TAddCommentForm } from "@/hooks/use-comment";
import { useIsMobile } from "@/hooks/use-mobile";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Funnel } from "lucide-react"

interface IProps {
    dialogIsOpen: boolean,
    setDialogIsOpen: Dispatch<SetStateAction<boolean>>,
    form: UseFormReturn<TAddCommentForm>,
    submit: SubmitHandler<{ body: string; }>,
    isLoading: boolean,
    parentName?: string
}

export default function AddCommentDialog({ dialogIsOpen, form, isLoading, setDialogIsOpen, submit, parentName }: IProps) {
    const isMobile = useIsMobile()

    const TitleComponent = (
        <>
            {
                parentName ?
                    <>
                        پاسخ به دیدگاه {parentName}
                    </>
                    :
                    <>
                        دیدگاه خود را با ما به اشتراک بگذارید
                    </>
            }
        </>
    )

    const FormComponent = (
        <div className="m-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="body"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    دیدگاه شما
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
