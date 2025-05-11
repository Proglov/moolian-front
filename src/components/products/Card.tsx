import { Gender, IProduct } from '@/types/product.type'
import { addCommas, digitsEnToFa } from '@persian-tools/persian-tools'
import Image from 'next/image'
import React from 'react'
import { Separator } from '../ui/separator'
import { MdOutlineWoman, MdOutlineMan } from 'react-icons/md'
import { motion } from 'framer-motion'

export default function Card({ product }: { product: IProduct }) {


    return (
        <motion.div
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
            className='flex flex-col gap-4 border border-gray-300 rounded-2xl overflow-hidden hover:border-purple-900 hover:cursor-pointer transition-all duration-300 text-center relative h-[28rem]'
        >

            {
                product?.festival && <div className='absolute top-0 left-0 bg-red-500 text-white p-1 rounded-br-lg'>{digitsEnToFa(product.festival.offPercentage)}%</div>
            }

            <Image width={200} height={200} src={product.imageKeys[0]} alt={product.nameFA} className='w-full h-48 object-cover' />

            <div className='p-2 flex flex-col gap-2'>

                <span className='flex justify-center gap-1 text-2xl'>
                    {
                        (product.gender === Gender.female || Gender.unisex) && <MdOutlineWoman className='text-purple-400' />
                    }
                    {
                        (product.gender === Gender.unisex) && <Separator orientation='vertical' />
                    }
                    {
                        (product.gender === Gender.male || Gender.unisex) && <MdOutlineMan className='text-sky-400' />
                    }
                </span>

                <div className='flex items-center justify-center gap-1 text-teal-400'>
                    <Image src={product.brandId.imageKey} width={40} height={40} alt={product.brandId.nameEN} className='rounded-full w-10 h-10' />
                    <h4 className='flex justify-center gap-1'>
                        {product.brandId.nameFA} | {product.brandId.nameEN}
                    </h4>
                </div>

                <h3 className='text-lg text-sky-800'>{product.nameFA} | {product.nameEN}</h3>

                <div className='text-xl bottom-4 absolute flex gap-2 text-success'>
                    {
                        product.festival?._id ?
                            <>
                                <span className='text-base rotate-10 line-through text-gray-500'>{digitsEnToFa(addCommas(product.price))}</span>
                                <span className=''>{digitsEnToFa(addCommas(product.price))}</span>
                            </>
                            :
                            <span>{digitsEnToFa(addCommas(product.price))}</span>
                    }
                    تومان
                </div>

            </div>
        </motion.div>
    )
}
