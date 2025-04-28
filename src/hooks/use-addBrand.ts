import { useAddNewBrandMutation } from "@/services/brands"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/sonner"
import { useUploadImageMutation } from "@/services/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { isFetchBaseQueryError } from "@/lib/utils"


const FormSchema = z.object({
    nameEN: z.string().nonempty({ message: 'نام انگلیسی برند الزامیست' }),
    nameFA: z.string().nonempty({ message: 'نام فارسی برند الزامیست' })
})
type TForm = z.infer<typeof FormSchema>;
const defaultValues: TForm = { nameEN: '', nameFA: '' }
const resolver = zodResolver(FormSchema)


export function useAddBrand() {
    const form = useForm<TForm>({ resolver, defaultValues })
    const [addNewBrand, { isError, error, isLoading, isSuccess }] = useAddNewBrandMutation()
    const [uploadImage, { data, isError: isErrorUpload, error: errorUpload }] = useUploadImageMutation()
    const [fileState, setFileState] = useState<File | undefined>(undefined);
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
            toast.success('برند با موفقیت افزوده شد')
        }
    }, [isSuccess])

    useEffect(() => {
        if (isFetchBaseQueryError(error)) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError])

    useEffect(() => {
        if (isFetchBaseQueryError(errorUpload)) {
            const messages = (errorUpload.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isErrorUpload])

    useEffect(() => {
        if (data) {
            const values = form.getValues()
            addNewBrand({ ...values, imageKey: data })
        }
    }, [data])


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