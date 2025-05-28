'use client'
import { useGetSingleProductQuery } from "@/services/products"
import Spinner from "../../shared/Spinner"
import { useRouter } from "next/navigation"
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel as CarouselShadCn,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Gender, IProduct } from "@/types/product.type";
import { MdOutlineMan, MdOutlineWoman } from "react-icons/md";
import { Separator } from "../../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Comments from "./Comments";
import Details from "./Details";
import Charts from "./Charts";
import AddButtons from "@/components/shared/AddButtons";


export default function SingleProduct({ id }: { id: string }) {
    const router = useRouter();
    const { data: product, isLoading } = useGetSingleProductQuery(id)

    if (isLoading) return <Spinner />
    if (!product) {
        router.replace('/not-found');
        return null
    }

    return (
        <div className="max-w-6xl mx-auto px-2">

            <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 mt-6 lg:p-10">
                <div>
                    {/* images */}
                    <div className="flex justify-center mt-4">
                        <ImagesComponent product={product} />
                    </div>

                    {/* basic info */}
                    <Card className="w-[calc(100%-6rem)] sm:w-full lg:w-[calc(100%-6rem)] max-w-xl mx-auto p-4 mt-2 sm:mt-5 border-purple-900">
                        <CardContent className="p-3 grid gap-4 sm:grid-cols-[2fr_1fr] sm:items-center">

                            {/* name */}
                            <div className="flex justify-start gap-2 text-purple-800">
                                <span className="text-center">
                                    عطر
                                    {' '}
                                    {product.nameFA}
                                </span>
                                <span>
                                    <Separator orientation='vertical' className="border-1" />
                                </span>
                                <span>
                                    {product.nameEN}
                                </span>
                            </div>

                            {/* gender */}
                            <div className='flex justify-start sm:justify-end gap-1 text-2xl'>
                                <span className="text-sm text-muted-foreground mt-1">
                                    جنسیت:
                                </span>
                                {
                                    (product.gender === Gender.female || product.gender === Gender.unisex) && <MdOutlineWoman className='text-purple-400' />
                                }
                                {
                                    (product.gender === Gender.unisex) &&
                                    <div>
                                        <Separator orientation='vertical' className="border-1" />
                                    </div>
                                }
                                {
                                    (product.gender === Gender.male || product.gender === Gender.unisex) && <MdOutlineMan className='text-sky-400' />
                                }
                            </div>

                            {/* brand */}
                            <div className='flex items-center justify-start gap-1 text-teal-400 mt-2 w-full sm:col-span-3'>
                                <Image src={product.brandId.imageKey} width={40} height={40} alt={product.brandId.nameEN} className='rounded-full w-10 h-10' />
                                <h4 className='flex justify-center gap-2'>
                                    <span className="text-center">
                                        {product.brandId.nameFA}
                                    </span>
                                    <span>
                                        <Separator orientation='vertical' className="border-1" />
                                    </span>
                                    <span>
                                        {product.brandId.nameEN}
                                    </span>
                                </h4>
                            </div>

                        </CardContent>
                    </Card>
                </div>

                {/* add buttons */}
                <AddButtons product={product} />
            </div>

            {/* tabs */}
            <CustomTabs product={product} />

        </div>
    )
}


const ImagesComponent = ({ product }: { product: IProduct }) => {
    if (product.imageKeys.length === 0) return (
        <div className="w-full max-w-xl lg:w-[calc(100%-6rem)] rounded-xl border shadow-sm overflow-hidden">
            <Image alt={product.nameFA} src={product.imageKeys[0]} width={800} height={600} />
        </div>
    )
    return (
        <CarouselShadCn className="w-[calc(100%-6rem)] max-w-xl">
            <CarouselContent >
                {product.imageKeys.map((src, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card className="py-0 overflow-hidden">
                                <CardContent className="flex justify-center px-0">
                                    <Image width={800} height={600} alt={product.nameFA} src={src} className='w-full aspect-[4/3] object-cover' />
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

const CustomTabs = ({ product }: { product: IProduct }) => (
    <Tabs defaultValue="details" className="w-full items-start max-w-xl lg:max-w-6xl lg:p-10 lg:pt-0 mx-auto mt-5" dir="rtl">
        <TabsList>
            <TabsTrigger value="details">اطلاعات بیشتر</TabsTrigger>
            <TabsTrigger value="comments">نظرات</TabsTrigger>
        </TabsList>
        <Card className="w-full">
            <TabsContent value="details">
                <CardContent>
                    <Details product={product} />
                    <Charts product={product} />
                </CardContent>
            </TabsContent>

            <TabsContent value="comments">
                <CardContent>
                    <Comments productId={product._id} />
                </CardContent>
            </TabsContent>
        </Card>
    </Tabs>
)