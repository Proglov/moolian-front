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
import AddButton from "../../shared/AddButton";
import { volumeMultipliers } from "@/types/transaction";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";
import Countdown from "../../shared/Countdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Comments from "./Comments";
import Details from "./Details";


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
                                    (product.gender === Gender.female || Gender.unisex) && <MdOutlineWoman className='text-purple-400' />
                                }
                                {
                                    (product.gender === Gender.unisex) &&
                                    <div>
                                        <Separator orientation='vertical' className="border-1" />
                                    </div>
                                }
                                {
                                    (product.gender === Gender.male || Gender.unisex) && <MdOutlineMan className='text-sky-400' />
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

                {/* add button */}
                <Card className="w-full h-fit max-w-xl mx-auto p-4 mt-2 sm:mt-5 border-success">
                    <CardContent className="p-3">
                        <span className="text-success">
                            خرید محصول
                        </span>

                        {/* countdown */}
                        {
                            product.festival &&
                            <Countdown targetTime={parseInt(product.festival.until)} offPercentage={product.festival.offPercentage} />
                        }

                        {/* volumes and buttons and prices */}
                        <div className="p-5 pb-0 sm:mr-5">
                            {
                                Object.entries(volumeMultipliers).map(volumeObj => {
                                    const thisPrice = product.price * volumeObj[1]
                                    const volume = parseInt(volumeObj[0])
                                    return (
                                        <div key={product._id + volumeObj[0]} className="flex justify-around items-center gap-2 my-4 border-b-1 pb-2">
                                            <div className="text-sm flex items-center gap-3">
                                                <div>
                                                    {digitsEnToFa(volume)}
                                                    <span className="mr-1 inline sm:hidden">
                                                        میل
                                                    </span>
                                                    <span className="mr-1 hidden sm:inline">
                                                        میلی لیتر
                                                    </span>
                                                    <span className="ml-1 text-destructive">:</span>
                                                </div>
                                                <div className={`text-xl flex justify-center items-end gap-2 text-success ${!!product.festival && '-translate-y-2'}`}>
                                                    {
                                                        !!product.festival ?
                                                            <div className='flex flex-col'>
                                                                <span className='text-base translate-y-2 line-through text-destructive'>{digitsEnToFa(addCommas(thisPrice))}</span>
                                                                <span className=''>{digitsEnToFa(addCommas(thisPrice * ((100 - product.festival.offPercentage) / 100)))}</span>
                                                            </div>
                                                            :
                                                            <span>{digitsEnToFa(addCommas(thisPrice))}</span>
                                                    }

                                                    <span>
                                                        تومان
                                                    </span>
                                                </div>
                                            </div>
                                            <AddButton productId={product._id} volume={volume} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </CardContent>
                </Card>
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