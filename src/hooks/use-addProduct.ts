import { useAddNewProductMutation } from "@/services/products"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { isFetchBaseQueryError } from "@/lib/utils"
import { Category, Flavor, Gender, Season } from "@/types/product.type"
import { IBrand } from "@/types/brand.type"
import { INote } from "@/types/note.type"
import { useGetAllNotesQuery } from "@/services/notes"
import { useGetAllBrandsQuery } from "@/services/brands"
import { useAddImages } from "./use-addImages"

const noteSchema = z.object({
    noteId: z.string().nonempty({ message: 'نوت محصول الزامیست' }),
    cent: z.coerce.number({ message: 'درصد باید عددی بین 1 تا 99 باشد' }).refine(val => val < 100 && val > 0, { message: "درصد باید عددی بین 1 تا 99 باشد" }),
})

export const FormSchema = z.object({
    nameEN: z.string().nonempty({ message: 'نام انگلیسی محصول الزامیست' }),
    nameFA: z.string().nonempty({ message: 'نام فارسی محصول الزامیست' }),
    price: z.coerce.number({ message: 'قیمت محصول باید عدد مثبت باشد' }).positive({ message: 'قیمت محصول الزامیست' }),
    year: z.coerce.number({ message: 'سال تولید محصول باید عدد مثبت باشد' }).refine(val => val < 2050 && val > 1900, { message: "سال را به میلادی وارد کنید" }).optional(),
    maker: z.string().optional(),
    country: z.string().optional(),
    olfactory: z.string().nonempty({ message: 'گروه بویایی الزامیست' }),
    gender: z.nativeEnum(Gender),
    category: z.nativeEnum(Category),
    flavor: z.nativeEnum(Flavor).array(),
    season: z.nativeEnum(Season).array(),
    desc: z.string().nonempty({ message: 'توضیحات محصول الزامیست' }),
    brandId: z.string().nonempty({ message: 'برند محصول الزامیست' }),
    initialNoteObjects: z.array(noteSchema),
    midNoteObjects: z.array(noteSchema),
    baseNoteObjects: z.array(noteSchema),
})
type TForm = z.infer<typeof FormSchema>;
const defaultValues: TForm = { nameEN: '', nameFA: '', price: 0, year: 0, olfactory: '', gender: Gender.male, category: Category.management, flavor: [], season: [], desc: '', brandId: '', initialNoteObjects: [], midNoteObjects: [], baseNoteObjects: [], country: '', maker: '' }
const resolver = zodResolver(FormSchema)


export function useAddProduct() {
    const form = useForm<TForm>({ resolver, defaultValues })
    const [addNewProduct, { isError, error, isLoading, isSuccess }] = useAddNewProductMutation()
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const { brands, isBrandQueryLoading } = useGetBrands()
    const { notes, isNoteQueryLoading } = useGetNotes()
    const { fileStates, onFilesAdded, setFileStates, uploadRes } = useAddImages()

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
            toast.success('محصول با موفقیت افزوده شد')
        }
    }, [isSuccess])

    useEffect(() => {
        if (isFetchBaseQueryError(error)) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError, error])


    const submit = (data: TForm) => {
        addNewProduct({
            ...data,
            imageKeys: uploadRes,
        })
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
        onFilesAdded
    }
}

export function useGetBrands() {
    const { isError, error, isLoading, isSuccess, data } = useGetAllBrandsQuery({ page: 1, limit: 10000 })
    const [brands, setBrands] = useState<IBrand[]>([]);

    useEffect(() => {
        if (isSuccess) setBrands(data.items)
    }, [isSuccess, data?.items])

    useEffect(() => {
        if (isFetchBaseQueryError(error)) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError, error])


    return {
        isBrandQueryLoading: isLoading,
        brands
    }
}

export function useGetNotes() {
    const { isError, error, isLoading, isSuccess, data } = useGetAllNotesQuery({ page: 1, limit: 10000 })
    const [notes, setNotes] = useState<INote[]>([]);

    useEffect(() => {
        if (isSuccess) setNotes(data.items)
    }, [isSuccess, data?.items])

    useEffect(() => {
        if (isFetchBaseQueryError(error)) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError, error])


    return {
        isNoteQueryLoading: isLoading,
        notes
    }
}
