import { Card, CardContent } from '../ui/card'
import Countdown from './Countdown'
import AddButton from './AddButton'
import { addCommas, digitsEnToFa } from '@persian-tools/persian-tools'
import { IProduct, IProductGetByIdsWithDetails } from '@/types/product.type'
import { volumeMultipliers } from '@/types/transaction'
import Link from 'next/link'


interface IAddButtonsProps {
    product: IProduct | IProductGetByIdsWithDetails | undefined
    isShoppingCart?: boolean
}

export default function AddButtons({ product, isShoppingCart = false }: IAddButtonsProps) {
    if (!product) return null

    return (
        <Card className="w-full h-fit max-w-xl mx-auto p-4 mt-2 sm:mt-5 border-success">
            <CardContent className="p-3">
                <span className="text-success">
                    {
                        isShoppingCart ?
                            <Link href={`/products/${product._id}`} className="text-success hover:underline">
                                {product.nameFA} | {product.nameEN}
                            </Link>
                            :
                            'خرید محصول'
                    }
                </span>

                {/* countdown */}
                {
                    (product.festival && !isShoppingCart) &&
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
    )
}
