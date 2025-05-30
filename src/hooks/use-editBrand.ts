import { useUpdateBrandMutation } from "@/services/brands"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { getChangedFields } from "@/lib/utils"
import { FormSchema } from "./use-addBrand"
import { IBrand } from "@/types/brand.type"
import _ from "lodash"
import useError from "./useError"
import { useAddImage } from "./use-addImage"

const EditFormSchema = FormSchema
type TForm = z.infer<typeof EditFormSchema>;
const resolver = zodResolver(EditFormSchema)


export function useEditBrand(brand: IBrand) {
    const form = useForm<TForm>({ resolver, defaultValues: brand })
    const [updateBrand, { isError, error, isLoading, isSuccess }] = useUpdateBrandMutation()
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const { data, uploadImage, fileState, setFileState } = useAddImage()

    useError(error, isError)

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
            toast.success('برند با موفقیت ویرایش شد')
        }
    }, [isSuccess, setDialogIsOpen])

    const updateBrandHandler = (newImageKey?: string) => {
        const values = form.getValues()
        const valuesWithImage = { ...values, imageKey: newImageKey ?? brand.imageKey }
        const newObj = {
            _id: brand._id,
            ...getChangedFields(brand, valuesWithImage)
        }
        updateBrand(newObj)
    }

    useEffect(() => {
        if (data) updateBrandHandler(data)
    }, [data, updateBrand, form])

    //? if there is new image added, upload it and update the brand in its useEffect, else wise, update the brand here
    const submit = () => {
        if (fileState) uploadImage(fileState);
        else updateBrandHandler()
    }

    const handleOpenChange = (open: boolean) => {
        setDialogIsOpen(open);
        if (!open) {
            form.reset();
            setFileState(undefined);
        }
    };

    return {
        isLoading,
        dialogIsOpen,
        handleOpenChange,
        form,
        submit,
        fileState,
        setFileState,
    }
}