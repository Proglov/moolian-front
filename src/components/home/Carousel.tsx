import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel as CarouselShadCn,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export function Carousel({ images = [
    '/img/1.jpg',
    '/img/2.png',
    '/img/3.png',
    '/img/4.jpg',
    '/img/5.jpg',
] }: { images?: string[] }) {
    return (
        <CarouselShadCn className="w-[calc(100%-200px)] max-w-xl mt-3">
            <CarouselContent >
                {images.map((src, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center">
                                    <Image width={100} height={100} alt="pic" src={src} className="w-full h-full inset-0 object-cover rounded-b-sm" />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
        </CarouselShadCn>
    )
}
