'use client'

import Cards from "./Cards";
import Spinner from "../shared/Spinner"
import useGetProducts from "@/hooks/use-getProducts"
import { FilterWrapper } from "./FilterWrapper";
import { SortWrapper } from "./SortWrapper";

export default function ProductsMain() {
    const { isFinished, products, ref, filterForm, filterSubmit, sortForm, sortSubmit } = useGetProducts()

    return (
        <div>
            <div className="mx-5 mt-5 flex gap-2">
                <FilterWrapper form={filterForm} submit={filterSubmit} />
                <SortWrapper form={sortForm} submit={sortSubmit} />
            </div>

            <div className="m-5">
                <Cards products={products} />
            </div>

            {!isFinished && <div className="w-full flex justify-center" ref={ref}><Spinner /></div>}
        </div>
    )
}
