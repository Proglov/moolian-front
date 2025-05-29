import { useEffect, useState } from "react"
import { toast } from "@/components/ui/sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAddNewFestivalMutation } from "@/services/festival"
import { IProduct } from "@/types/product.type"
import { useGetAllProductsQuery } from "@/services/products"
import useError from "./useError"


const FormSchema = z.object({
    productId: z.string().nonempty({ message: 'محصول جشنواره الزامیست' }),
    offPercentage: z.coerce.number({ message: 'تخفیف جشنواره باید عدد مثبت باشد' }).refine(val => val < 100 && val > 0, { message: "درصد خفیف باید از 1 تا 99 باشد" }),
    until: z.coerce.number({ message: 'مدت زمان جشنواره الزامیست' }).positive({ message: 'مدت زمان جشنواره الزامیست' }),
})
type TForm = z.infer<typeof FormSchema>;
const defaultValues: TForm = { productId: '', offPercentage: 0, until: 0 }
const resolver = zodResolver(FormSchema)


export function useAddFestival() {
    const form = useForm<TForm>({ resolver, defaultValues })
    const [addNewFestival, { isError, error, isLoading, isSuccess }] = useAddNewFestivalMutation()
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const { isProductQueryLoading, products } = useGetProducts()

    useError(error, isError)

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
            toast.success('جشنواره با موفقیت افزوده شد')
        }
    }, [isSuccess])


    const submit = (data: TForm) => {
        const until = new Date();
        until.setDate(until.getDate() + data.until)
        addNewFestival({ ...data, until: until.getTime().toString() })
    };

    return {
        isLoading,
        dialogIsOpen,
        setDialogIsOpen,
        form,
        submit,
        products,
        isProductQueryLoading
    }
}


export function useGetProducts() {
    const { isError, error, isLoading, isSuccess, data } = useGetAllProductsQuery({ page: 1, limit: 10000 })
    const [products, setProducts] = useState<IProduct[]>([]);

    useError(error, isError)

    useEffect(() => {
        if (isSuccess) setProducts(data.items)
    }, [isSuccess, data?.items])


    return {
        isProductQueryLoading: isLoading,
        products
    }
}