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
import { TForm } from "@/hooks/use-getProducts"
import { UseFormReturn } from "react-hook-form"
import FilterForm from "./FilterForm"

export function FilterWrapper({ form, submit }: { form: UseFormReturn<TForm>, submit: (data: TForm) => void }) {
    const [open, setOpen] = React.useState(false)
    const isMobile = useIsMobile()

    if (!isMobile) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">فیلتر ها</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>فیلتر ها</DialogTitle>
                        <DialogDescription>
                            فیلتر محصولات
                        </DialogDescription>
                    </DialogHeader>

                    <div className="m-5">
                        <FilterForm form={form} submit={submit} />
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">فیلتر ها</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="mr-4">
                    <DrawerTitle>فیلتر ها</DrawerTitle>
                    <DrawerDescription>
                        فیلتر محصولات
                    </DrawerDescription>
                </DrawerHeader>

                <div className="m-5">
                    <FilterForm form={form} submit={submit} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}