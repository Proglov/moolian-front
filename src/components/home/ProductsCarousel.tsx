'use client'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useGetAllProductsByIdsMutation } from "@/services/products";
import { useEffect } from "react";
import ProductCard from "../products/ProductCard";
import { Card, CardContent } from "../ui/card";
import { MotionDiv } from "../shared/MotionDiv";
import useError from "@/hooks/useError";
import { SkeletonProduct } from "../shared/Skeletons";


export default function ProductsCarousel() {
    const [getProductsByIds, { isLoading, isError, error, data }] = useGetAllProductsByIdsMutation()
    const productIds = (process.env.NEXT_PUBLIC_HomeProductIds || '').split(',');

    useError(error, isError)

    useEffect(() => {
        getProductsByIds({ ids: productIds })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getProductsByIds])

    return (
        <div className="w-full flex flex-col items-center justify-center mt-8 gap-1">

            <MotionDiv
                className="text-center text-lg mb-2"
                initial={{ scale: 1, color: "#6f9cad", y: 0 }}
                animate={{
                    scale: [1, 1.08, 1],
                    color: ["#6f9cad", "#22c55e", "#6f9cad"],
                    y: 5
                }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                }}
            >
                پرفروش ترین ها
            </MotionDiv>

            <Carousel className="max-w-4xl" style={{ width: '70vw' }}>
                <Card className="p-0 md:p-2">
                    <CardContent className="p-0">
                        <CarouselContent>
                            {
                                (isLoading || !data) ?
                                    Array(6).fill(0).map((_, i) => (
                                        <div key={i} className="mx-2 my-5">
                                            <SkeletonProduct />
                                        </div>
                                    ))
                                    :
                                    data.map(product => (
                                        <CarouselItem key={product._id} className="md:basis-1/2" dir="rtl">
                                            <ProductCard product={product} />
                                        </CarouselItem>
                                    ))
                            }
                        </CarouselContent>

                    </CardContent>
                </Card>
                <CarouselNext />
                <CarouselPrevious />
            </Carousel>

        </div>
    )
}
