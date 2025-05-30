import { useAddNewBrandMutation } from "@/services/brands"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAddImage } from "./use-addImage"
import useError from "./useError"


export const FormSchema = z.object({
    nameEN: z.string().nonempty({ message: 'نام انگلیسی برند الزامیست' }),
    nameFA: z.string().nonempty({ message: 'نام فارسی برند الزامیست' })
})
type TForm = z.infer<typeof FormSchema>;
const defaultValues: TForm = { nameEN: '', nameFA: '' }
const resolver = zodResolver(FormSchema)


export function useAddBrand() {
    const form = useForm<TForm>({ resolver, defaultValues })
    const [addNewBrand, { isError, error, isLoading, isSuccess }] = useAddNewBrandMutation()
    const { data, uploadImage, fileState, setFileState } = useAddImage()
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

    useError(error, isError)

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
            toast.success('برند با موفقیت افزوده شد')
        }
    }, [isSuccess])


    useEffect(() => {
        if (data) {
            const values = form.getValues()
            addNewBrand({ ...values, imageKey: data })
        }
    }, [data, addNewBrand, form])


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