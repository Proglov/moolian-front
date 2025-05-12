'use client'
import { GiShoppingCart } from "react-icons/gi";
import Button from './Button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { digitsEnToFa } from '@persian-tools/persian-tools';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { DecrementCart, IncrementCart, selectCartProduct } from '@/store/CartProductsSlice';


interface AddButtonProps {
    productId: string;
    // quantity: number;
    // which: string;
    // profit: number;
}

export default function AddButton({ productId }: AddButtonProps) {
    const dispatch = useAppDispatch();
    const product = useAppSelector((state) => selectCartProduct(state, productId, 10));

    //!!!!!THIS IS A TEMPORARY SOLUTION
    const volume = 10;

    if (!product)
        return (
            <Button
                variant="outline"
                className="text-sm"
                onClick={() => dispatch(IncrementCart({ _id: productId, volume }))}
            >
                افزودن به سبد
                <GiShoppingCart />
            </Button>)


    return (
        <>
            <div className="border border-destructive rounded-lg w-fit flex items-center justify-center mx-auto">
                <Button
                    variant='ghost'
                    className='text-destructive hover:text-destructive'
                    onClick={() => dispatch(IncrementCart({ _id: productId, volume }))}
                >
                    <Plus />
                </Button>
                <span className="text-destructive">
                    {digitsEnToFa(product.number)}
                </span>
                <Button
                    className="text-destructive hover:text-destructive"
                    variant='ghost'
                    onClick={() => dispatch(DecrementCart({ _id: productId, volume }))}
                >
                    {product.number == 1 ? (
                        <Trash2 />
                    ) : (
                        <Minus />
                    )}
                </Button>
            </div>

            {/* {
                which === 'major' &&
                <div className='sm:text-sm text-xs text-teal-600 mt-1'>
                    {
                        quantity > product.number ?
                            <>
                                {digitsEnToFa(quantity - product.number)}
                                {" "}
                                عدد مونده تا تخفیف!
                            </>
                            :
                            <>
                                {digitsEnToFa(addCommas(profit * product.number))}
                                {" "}
                                تومان
                                سود!
                            </>
                    }
                </div>
            } */}
        </>
    )

}
