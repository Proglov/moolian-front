'use client'
import { useGetBrands } from "@/hooks/use-addProduct"
import Spinner from "../shared/Spinner"
import Image from "next/image"
import { IBrand } from "@/types/brand.type"
import Link from "next/link"
import { SkeletonBrand } from "../shared/Skeletons"

export default function MainBrands() {
    const { brands, isBrandQueryLoading } = useGetBrands()

    if (!isBrandQueryLoading && brands.length === 0) return (
        <div className='w-full flex justify-center m-5'>نتیجه ای یافت نشد</div>
    )

    return (
        <div className="m-5">
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-1 gap-y-4 border-2 border-muted rounded-xl p-4'>
                {
                    isBrandQueryLoading ?
                        Array(8).fill(0).map((_, i) => (
                            <SkeletonBrand key={i} />
                        ))
                        :
                        brands.map(brand => (
                            <BrandCard key={brand._id} brand={brand} />
                        ))
                }
            </div>
        </div>
    )
}

const BrandCard = ({ brand }: { brand: IBrand }) => (
    <Link href={'/products?brandId=' + brand._id} className='flex flex-col items-center justify-start gap-1 text-lg hover:text-xl hover:text-purple-700'>
        <Image src={brand.imageKey} width={80} height={80} alt={brand.nameEN} className='rounded-full w-20 h-20' />
        <h4 className='flex justify-start gap-1'>
            {brand.nameFA} | {brand.nameEN}
        </h4>
    </Link>
)