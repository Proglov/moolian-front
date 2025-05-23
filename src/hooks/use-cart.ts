import { useEffect, useMemo, useState } from "react"
import { useAppSelector } from "@/store/store"
import { toast } from "sonner"
import { isFetchBaseQueryError } from "@/lib/utils"
import { useGetAllProductsByIdsMutation } from "@/services/products"
import { IProductGetByIds, IProductGetByIdsWithDetails } from "@/types/product.type"
import { volumeMultipliers } from '@/types/transaction'


export default function useCart() {
    const [open, setOpen] = useState(false)
    const cart = useAppSelector(state => state.CartProducts)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const [getProductsByIds, { isLoading, isError, error, data, isSuccess }] = useGetAllProductsByIdsMutation()
    const [products, setProducts] = useState<IProductGetByIds[]>([])

    const cartProductIdsKey = useMemo(() => Array.from(new Set(cart.map(item => item._id))).sort().join(','), [cart]);

    const productsWithDetailsMap = useMemo(() => {
        const productMap = new Map(products.map(p => [p._id, p]));
        return new Map<string, IProductGetByIdsWithDetails>(
            cart
                .map(cartItem => {
                    const product = productMap.get(cartItem._id);
                    if (!product) return null;
                    return [
                        cartItem._id + cartItem.volume,
                        { ...product, ...cartItem }
                    ];
                })
                .filter(Boolean) as [string, IProductGetByIdsWithDetails][]
        );
    }, [products, cart]);


    const { totalPrice, totalDiscount } = useMemo(() => cart.reduce((acc, cartItem) => {
        const product = productsWithDetailsMap.get(cartItem._id + cartItem.volume);
        if (!product) return acc;

        const price = product.price * volumeMultipliers[product.volume];
        const quantity = cartItem.number;
        const discount = product.festival?.offPercentage || 0;

        return {
            totalPrice: acc.totalPrice + (price * quantity),
            totalDiscount: acc.totalDiscount + (price * quantity * (discount / 100))
        };
    }, { totalPrice: 0, totalDiscount: 0 }), [cart, productsWithDetailsMap]);

    useEffect(() => {
        if (cart && cart.length) getProductsByIds({ ids: cart.map(item => item._id) })
        else setProducts([])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartProductIdsKey])

    useEffect(() => {
        if (isSuccess) {
            const productsMap = new Map();
            cart.forEach(item => productsMap.set(item._id, item));
            setProducts(data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isSuccess])

    useEffect(() => {
        if (isFetchBaseQueryError(error)) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError, error])

    return {
        isLoggedIn,
        open,
        setOpen,
        products,
        isLoading,
        totalPrice,
        totalDiscount
    }
}