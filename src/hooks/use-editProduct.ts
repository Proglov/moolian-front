import { useUpdateProductMutation } from "@/services/products"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { extractFileName, getChangedFields } from "@/lib/utils"
import { useAddImages } from "./use-addImages"
import { FormSchema, useGetBrands, useGetNotes } from "./use-addProduct"
import { IProduct } from "@/types/product.type"
import _ from "lodash"
import useError from "./useError"

const EditFormSchema = FormSchema.extend({
    _id: z.string(),
    availability: z.boolean().optional()
})
type TForm = z.infer<typeof EditFormSchema>;
const resolver = zodResolver(EditFormSchema)


export function useEditProduct(product: IProduct) {
    const reformedProduct = {
        ...product,
        brandId: product.brandId._id,
        initialNoteObjects: product.initialNoteObjects.map(n => ({ ...n, noteId: n.noteId._id })),
        baseNoteObjects: product.baseNoteObjects.map(n => ({ ...n, noteId: n.noteId._id })),
        midNoteObjects: product.midNoteObjects.map(n => ({ ...n, noteId: n.noteId._id }))
    }
    const form = useForm<TForm>({ resolver, defaultValues: reformedProduct })
    const [updateProduct, { isError, error, isLoading, isSuccess }] = useUpdateProductMutation()
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const { brands, isBrandQueryLoading } = useGetBrands()
    const { notes, isNoteQueryLoading } = useGetNotes()
    const { fileStates, onFilesAdded, setFileStates, uploadRes, onImageDelete, onFinished } = useAddImages()
    const [deletedImages, setDeletedImages] = useState<string[]>([])

    useError(error, isError)

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
            toast.success('محصول با موفقیت ویرایش شد')
            onFinished()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    const onImageRemove = (id: string) => {
        onImageDelete(id);
        setDeletedImages(prev => [...prev, id])
    }

    const isImageDeleted = (id: string): boolean => deletedImages.includes(id)

    const submit = (data: TForm) => {
        const prevImages: string[] = [];
        reformedProduct.imageKeys.forEach(key => {
            const filename = extractFileName(key)
            if (!!filename) prevImages.push(filename)
        })
        const imageKeys = [...uploadRes, ...prevImages];
        _.pull(imageKeys, ...deletedImages)

        const newReformedProduct = { ...reformedProduct, imageKeys: prevImages }
        const newObj = {
            _id: reformedProduct._id,
            ...getChangedFields(newReformedProduct, { ...data, imageKeys } as TForm)
        }
        updateProduct(newObj)
    };

    return {
        isLoading,
        dialogIsOpen,
        setDialogIsOpen,
        form,
        submit,
        brands,
        isBrandQueryLoading,
        notes,
        isNoteQueryLoading,
        fileStates,
        setFileStates,
        onFilesAdded,
        onImageRemove,
        isImageDeleted
    }
}