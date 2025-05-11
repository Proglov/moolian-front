'use client'

import Cards from "./Cards";
import Spinner from "../shared/Spinner"
import useGetProducts from "@/hooks/use-getProducts"

export default function ProductsMain() {
    const { isFinished, products, ref } = useGetProducts()

    return (
        <div>
            <div className="m-5">
                <Cards products={products} />
            </div>


            {!isFinished && <div className="w-full flex justify-center" ref={ref}><Spinner /></div>}
        </div>
    )
}
