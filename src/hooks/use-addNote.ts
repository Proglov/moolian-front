import { useAddNewNoteMutation } from "@/services/notes"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { isFetchBaseQueryError } from "@/lib/utils"
import { useAddImage } from "./use-addImage"


const FormSchema = z.object({
    name: z.string().nonempty({ message: 'نام نوت الزامیست' })
})
type TForm = z.infer<typeof FormSchema>;
const defaultValues: TForm = { name: '' }
const resolver = zodResolver(FormSchema)


export function useAddNote() {
    const form = useForm<TForm>({ resolver, defaultValues })
    const [addNewNote, { isError, error, isLoading, isSuccess }] = useAddNewNoteMutation()
    const { data, uploadImage, fileState, setFileState } = useAddImage()
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
            toast.success('نوت با موفقیت افزوده شد')
        }
    }, [isSuccess])

    useEffect(() => {
        if (isFetchBaseQueryError(error)) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError, error])

    useEffect(() => {
        if (data) {
            const values = form.getValues()
            addNewNote({ ...values, imageKey: data })
        }
    }, [data, addNewNote, form])


    //first we send the image, the rest of the process is handled in the useEffect
    const submit = () => uploadImage(fileState);

    return {
        isLoading,
        fileState,
        setFileState,
        dialogIsOpen,
        setDialogIsOpen,
        form,
        submit,
        data
    }
}