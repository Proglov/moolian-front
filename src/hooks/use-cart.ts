import { useEffect, useMemo, useState } from "react"
import { useAppSelector } from "@/store/store"
import { toast } from "sonner"
import { isFetchBaseQueryError } from "@/lib/utils"
import { useGetAllProductsByIdsMutation } from "@/services/products"
import { IProductGetByIdsWithDetails } from "@/types/product.type"


export default function useCart() {
    const [open, setOpen] = useState(false)
    const cart = useAppSelector(state => state.CartProducts)
    const [getProductsByIds, { isLoading, isError, error, data, isSuccess }] = useGetAllProductsByIdsMutation()
    const [products, setProducts] = useState<IProductGetByIdsWithDetails[]>([])


    const cartProductIdsKey = useMemo(() => Array.from(new Set(cart.map(item => item._id))).sort().join(','), [cart]);


    useEffect(() => {
        console.log(cartProductIdsKey);
        if (cart && cart.length) getProductsByIds({ ids: cart.map(item => item._id) })
        else setProducts([])
    }, [cartProductIdsKey])

    useEffect(() => {
        if (isSuccess) {
            const productsMap = new Map();
            cart.forEach(item => productsMap.set(item._id, item))
            setProducts(data.map(product => ({ ...productsMap.get(product._id), ...product })))
        }
    }, [data, isSuccess])

    useEffect(() => {
        if (isFetchBaseQueryError(error)) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError, error])

    return {
        open,
        setOpen,
        products,
        isLoading
    }
}