'use client'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { isFetchBaseQueryError } from "@/lib/utils";
import { useGetAllProductsByIdsMutation } from "@/services/products";
import { useEffect } from "react";
import { toast } from "sonner";
import ProductCard from "../products/ProductCard";
import Spinner from "../shared/Spinner";
import { Card, CardContent } from "../ui/card";
import { MotionDiv } from "../shared/MotionDiv";


export default function ProductsCarousel() {
    const [getProductsByIds, { isLoading, isError, error, data, isSuccess }] = useGetAllProductsByIdsMutation()
    const productIds = (process.env.NEXT_PUBLIC_HomeProductIds || '').split(',');


    useEffect(() => {
        if (isFetchBaseQueryError(error)) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError, error])

    useEffect(() => {
        getProductsByIds({ ids: productIds })
    }, [getProductsByIds])

    if (isLoading || !data) return (
        <div className="w-full flex justify-center">
            <Spinner />
        </div>
    )

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

            <Carousel className="w-[calc(100%-200px)] max-w-4xl">
                <Card className="p-0 md:p-2">
                    <CardContent className="p-0">
                        <CarouselContent>
                            {
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
