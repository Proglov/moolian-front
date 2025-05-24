import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { MotionDiv } from "../shared/MotionDiv"

export default function Gallery({
    images = [
        "/img/perf1.jpeg",
        "/img/perf2.jpeg",
        "/img/perf3.jpeg",
        "/img/perf5.jpeg",
    ] }: { images?: string[] }) {
    return (
        <div className="w-full flex flex-col items-center justify-center mt-8 gap-1">

            <MotionDiv
                className="text-center text-lg mb-2"
                initial={{ scale: 1, color: "#22c55e" }}
                animate={{
                    scale: [1, 1.08, 1],
                    color: ["#22c55e", "#e7000b", "#22c55e"]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                }}
            >
                کیفیت بالا با نازل ترین قیمت
            </MotionDiv>

            <Carousel className="w-[calc(100%-200px)] max-w-4xl">
                <Card className="p-0 md:p-2">
                    <CardContent className="p-0">
                        <CarouselContent>
                            {images.map((src, index) => (
                                <CarouselItem key={index} className="md:basis-1/2">
                                    <div className="flex aspect-square items-center justify-center">
                                        <Image width={576} height={576} alt="pic" src={src} className="w-full h-full inset-0 object-cover rounded-sm" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                    </CardContent>
                </Card>
                <CarouselNext />
                <CarouselPrevious />
            </Carousel>

        </div>
    )
}
