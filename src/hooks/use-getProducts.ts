import { useGetAllProductsQuery } from "@/services/products";
import { IProduct } from "@/types/product.type";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";


export default function useGetProducts() {
    const limit = 20;
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState<IProduct[]>([])
    const [isFinished, setIsFinished] = useState(false)
    const { ref, inView } = useInView()
    const { data, isSuccess } = useGetAllProductsQuery({ onlyAvailable: true, page, limit })

    useEffect(() => {
        if (isSuccess) {
            setProducts(prev => [...prev, ...data.items])
            if (data.count < page * limit) {
                setIsFinished(true)
            }
        }
    }, [data, isSuccess, page])

    useEffect(() => {
        if (inView && !isFinished && products.length) {
            setPage(prev => prev + 1)
        }
    }, [inView, isFinished, products.length])

    return { products, ref, isFinished }
}