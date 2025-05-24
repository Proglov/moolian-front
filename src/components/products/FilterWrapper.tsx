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
import { TFilterForm } from "@/hooks/use-getProducts"
import { UseFormReturn } from "react-hook-form"
import FilterForm from "./FilterForm"
import { Funnel } from "lucide-react"

export function FilterWrapper({ form, submit }: { form: UseFormReturn<TFilterForm>, submit: (data: TFilterForm) => void }) {
    const [open, setOpen] = React.useState(false)
    const isMobile = useIsMobile()

    const submitHandler = (data: TFilterForm) => {
        submit(data);
        setOpen(false);
    }

    if (!isMobile) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <Funnel />
                        فیلتر ها
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>فیلتر ها</DialogTitle>
                        <DialogDescription>
                            فیلتر محصولات
                        </DialogDescription>
                    </DialogHeader>

                    <div className="m-5">
                        <FilterForm form={form} submit={submitHandler} />
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">
                    <Funnel />
                    فیلتر ها
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="mr-4">
                    <DrawerTitle>فیلتر ها</DrawerTitle>
                    <DrawerDescription>
                        فیلتر محصولات
                    </DrawerDescription>
                </DrawerHeader>

                <div className="m-5">
                    <FilterForm form={form} submit={submitHandler} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}