import React from 'react'
import Spinner from '../shared/Spinner'
import useCart from '@/hooks/use-cart'

interface Props {
    address: string | undefined;
}

export default function Info({ address }: Props) {
    const { products, isLoading, totalPrice, totalDiscount } = useCart()
    const endPrice = totalDiscount ? totalPrice - totalDiscount : totalPrice

    return (
        <div className="w-full max-w-xl mx-auto bg-blue-100/50 p-2 sm:rounded-full">
            {
                isLoading ?
                    <div className="flex justify-center items-center">
                        <Spinner />
                    </div>
                    :
                    <div className="m-5">
                        {
                            products.length ? (
                                <div className="mt-1">
                                    مبلغ نهایی:
                                    {endPrice.toLocaleString('fa-IR')} تومان
                                </div>
                            )
                                :
                                <></>
                        }

                        <div>
                            {
                                address ? (
                                    <div>
                                        آدرس:
                                        {address}
                                    </div>
                                )
                                    :
                                    <></>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}
