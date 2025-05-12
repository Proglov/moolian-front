'use client'

import Cards from "./Cards";
import Spinner from "../shared/Spinner"
import useGetProducts from "@/hooks/use-getProducts"
import { FilterWrapper } from "./FilterWrapper";

export default function ProductsMain() {
    const { isFinished, products, ref, form, submit } = useGetProducts()

    return (
        <div>

            <div className="mx-5 mt-5">
                <FilterWrapper form={form} submit={submit} />
            </div>

            <div className="m-5">
                <Cards products={products} />
            </div>

            {!isFinished && <div className="w-full flex justify-center" ref={ref}><Spinner /></div>}
        </div>
    )
}
