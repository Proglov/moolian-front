import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { TSortForm } from "@/hooks/use-getProducts"
import { UseFormReturn } from "react-hook-form"
import SortForm from "./SortForm"
import { ArrowDownNarrowWide } from "lucide-react"

export function SortWrapper({ form, submit }: { form: UseFormReturn<TSortForm>, submit: (data: TSortForm) => void }) {
    const [open, setOpen] = React.useState(false)
    const isMobile = useIsMobile()

    const submitHandler = (data: TSortForm) => {
        submit(data);
        setOpen(false);
    }

    if (!isMobile) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <ArrowDownNarrowWide />
                        مرتب سازی
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>مرتب سازی</DialogTitle>
                        <DialogDescription>
                            مرتب سازی محصولات
                        </DialogDescription>
                    </DialogHeader>

                    <div className="m-5">
                        <SortForm form={form} submit={submitHandler} />
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">
                    <ArrowDownNarrowWide />
                    مرتب سازی
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="mr-4">
                    <DrawerTitle>مرتب سازی</DrawerTitle>
                    <DrawerDescription>
                        مرتب سازی محصولات
                    </DrawerDescription>
                </DrawerHeader>

                <div className="m-5">
                    <SortForm form={form} submit={submitHandler} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}