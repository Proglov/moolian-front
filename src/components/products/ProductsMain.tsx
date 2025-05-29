'use client'
import Spinner from "../shared/Spinner"
import useGetProducts from "@/hooks/use-getProducts"
import { FilterWrapper } from "./FilterWrapper";
import { SortWrapper } from "./SortWrapper";
import ProductCard from "./ProductCard";

export default function ProductsMain() {
    const { isFinished, products, ref, filterForm, filterSubmit, sortForm, sortSubmit, brandId } = useGetProducts()
    console.log(products[0]?.brandId.nameFA);
    return (
        <div>
            <div className="mx-5 mt-5 flex gap-2">
                <FilterWrapper form={filterForm} submit={filterSubmit} />
                <SortWrapper form={sortForm} submit={sortSubmit} />
            </div>

            <div className="m-5">

                {
                    (brandId && products && products.length > 0) &&
                    <h1 className="text-lg w-full text-center text-shadow-lg text-shadow-primary mb-1">
                        {products[0].brandId.nameFA}
                    </h1>
                }

                {
                    (!products || products.length === 0) && isFinished ?
                        <div className='w-full flex justify-center'>نتیجه ای یافت نشد</div>
                        :
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-1 gap-y-4 border-2 border-muted rounded-xl p-4'>
                            {
                                products.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            }
                        </div>
                }
            </div>

            {!isFinished && <div className="w-full flex justify-center" ref={ref}><Spinner /></div>}
        </div>
    )
}
