'use client'
import { useEffect, useState } from 'react';
import { GiShoppingCart } from "react-icons/gi";
import Button from './Button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { digitsEnToFa } from '@persian-tools/persian-tools';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { DecrementCart, IncrementCart } from '@/store/CartProductsSlice';


interface AddButtonProps {
    productId: string;
    // quantity: number;
    // which: string;
    // profit: number;
}

export default function AddButton({ productId }: AddButtonProps) {
    const dispatch = useAppDispatch();
    const cartProducts = useAppSelector((state) => state.CartProducts);

    const [number, setNumber] = useState(0);

    useEffect(() => {
        const item = cartProducts.find((item) => item._id === productId)
        setNumber(item?.number || 0);
    }, [setNumber, cartProducts, productId]);


    if (number > 0) return (
        <>
            <div className="border border-destructive rounded-lg w-fit flex items-center justify-center mx-auto">
                <Button
                    variant='ghost'
                    className='text-destructive hover:text-destructive'
                    onClick={() => dispatch(IncrementCart(productId))}
                >
                    <Plus />
                </Button>
                <span className="text-destructive">
                    {digitsEnToFa(number)}
                </span>
                <Button
                    className="text-destructive hover:text-destructive"
                    variant='ghost'
                    onClick={() => dispatch(DecrementCart(productId))}
                >
                    {number == 1 ? (
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
                        quantity > number ?
                            <>
                                {digitsEnToFa(quantity - number)}
                                {" "}
                                عدد مونده تا تخفیف!
                            </>
                            :
                            <>
                                {digitsEnToFa(addCommas(profit * number))}
                                {" "}
                                تومان
                                سود!
                            </>
                    }
                </div>
            } */}
        </>
    )

    return (
        <Button
            variant="outline"
            className="text-sm"
            onClick={() => dispatch(IncrementCart(productId))}
        >
            افزودن به سبد
            <GiShoppingCart />
        </Button>)
}
