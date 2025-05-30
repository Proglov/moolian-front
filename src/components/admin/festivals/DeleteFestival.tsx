import { Trash2 } from "lucide-react";
import Button from "@/components/shared/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { useDeleteFestivalMutation } from "@/services/festival";



export default function DeleteFestival({ _id }: { _id: string }) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [deleteFestival, { isSuccess, isLoading }] = useDeleteFestivalMutation()

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
        }
    }, [isSuccess])



    return (
        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="m-3 border-destructive text-destructive" variant='outline' size='sm'>
                    حذف
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-auto max-h-screen">
                <DialogHeader>
                    <DialogTitle className="mb-3">حذف جشنواره</DialogTitle>
                    <DialogDescription className="text-center" asChild>
                        <div>
                            <div className="text-base">
                                آیا از حذف این جشنواره مطمئن هستید؟
                            </div>

                            <div className="flex gap-2 mt-2 justify-center">
                                <Button variant='destructive' disabled={isLoading} onClick={() => { deleteFestival(_id) }}>
                                    حذف
                                </Button>
                                <Button variant='outline' disabled={isLoading} onClick={() => setDialogIsOpen(false)}>
                                    کنسل
                                </Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
