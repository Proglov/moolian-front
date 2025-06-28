import { Gender, IProduct, IProductGetByIds } from '@/types/product.type'
import { digitsEnToFa } from '@persian-tools/persian-tools'
import Image from 'next/image'
import React from 'react'
import { Separator } from '../ui/separator'
import { MdOutlineWoman, MdOutlineMan } from 'react-icons/md'
import { MotionDiv } from '../shared/MotionDiv'
import Link from 'next/link'
import Button from '../shared/Button'
import { categoriesObject, flavorsObject, seasonsObject } from '@/lib/utils'
import { Card, CardContent } from "@/components/ui/card"

export default function ProductCard({ product }: { product: IProduct | IProductGetByIds }) {
    console.log(product);
    return (
        <MotionDiv
            initial='hidden'
            whileInView='visible'
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
            }}
            transition={{
                ease: 'easeInOut',
                duration: 0.5,
            }}
            viewport={{ amount: 0.25, once: true }}
            className='h-full'
        >
            <Card className="hover:border-purple-900 transition-all duration-300 text-center h-full p-0 overflow-hidden">
                <CardContent className="flex flex-col gap-4 relative h-full p-0">

                    {/* off percentage */}
                    {
                        product?.festival && <div className='absolute top-0 left-0 bg-destructive text-white p-1 rounded-br-lg'>{digitsEnToFa(product.festival.offPercentage)}
                            %
                            تخفیف
                        </div>
                    }

                    <Image width={800} height={600} src={product.imageKeys[0]} alt={product.nameFA} className='w-full aspect-[4/3] object-cover' />

                    {/* gender */}
                    <span className='flex justify-center gap-1 text-2xl'>
                        {
                            (product.gender === Gender.female || product.gender === Gender.unisex) && <MdOutlineWoman className='text-purple-400' />
                        }
                        {
                            (product.gender === Gender.unisex) && <Separator orientation='vertical' className='border-1' />
                        }
                        {
                            (product.gender === Gender.male || product.gender === Gender.unisex) && <MdOutlineMan className='text-sky-400' />
                        }
                    </span>

                    {/* details */}
                    <div className="flex-1 flex flex-col gap-4 p-2">

                        {/* brand */}
                        <Link href={`/products?brandId=${product.brandId._id}`}>
                            <div className='flex items-center justify-start gap-1 text-sm sm:text-base hover:underline'>
                                <Image src={product.brandId.imageKey} width={40} height={40} alt={product.brandId.nameEN} className='rounded-full w-10 h-10 bg-white' />
                                <h4 className='flex justify-start gap-1'>
                                    {product.brandId.nameFA} | {product.brandId.nameEN}
                                </h4>
                            </div>
                        </Link>

                        {/* name */}
                        <h3 className='flex justify-start gap-1 text-sm sm:text-lg'>
                            {product.nameFA}
                            <Separator orientation='vertical' className='border-1' />
                            {product.nameEN}
                        </h3>

                        {/* flavor */}
                        <div className='text-start'>
                            طبع:
                            {' '}
                            {new Intl.ListFormat('fa', { style: 'short', type: 'unit' })
                                .format(product.flavor.map(flavor => flavorsObject[flavor]))}
                        </div>

                        {/* season */}
                        <div className='text-start'>
                            فصل:
                            {' '}
                            {new Intl.ListFormat('fa', { style: 'short', type: 'unit' })
                                .format(product.season.map(season => seasonsObject[season]))}
                        </div>

                        {/* category */}
                        {
                            product.category &&
                            <div className='text-start'>
                                دسته بندی:
                                {' '}
                                {categoriesObject[product.category]}
                            </div>
                        }

                        {/* price */}
                        <div className='text-xl flex justify-center items-end gap-2 text-success'>
                            {
                                product.festival?._id ?
                                    <div className='flex flex-col'>
                                        <span className='text-base translate-y-2 translate-x-1/2 rotate-25 line-through text-destructive'>{product.price.toLocaleString('fa-IR')}</span>
                                        <span className=''>{(product.price * ((100 - product.festival.offPercentage) / 100)).toLocaleString('fa-IR')}</span>
                                    </div>
                                    :
                                    <span>{product.price.toLocaleString('fa-IR')}</span>
                            }

                            <div className='flex flex-col'>
                                <span className="text-destructive text-sm translate-x-1/2">
                                    {product.festival?._id ? 'تخفیف ویژه' : '\u00A0'}
                                </span>

                                <span>
                                    تومان
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* link */}
                    <div>
                        <Button asChild className='mb-3'>
                            <Link href={`/products/${product._id}`} >
                                مشاهده محصول
                            </Link>
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </MotionDiv>
    )
}
