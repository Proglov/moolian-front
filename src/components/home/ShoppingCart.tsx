'use client'
import { ShoppingCartIcon } from 'lucide-react'
import React from 'react'
import { Badge } from '../ui/badge'
import Link from 'next/link';
import { useAppSelector } from "@/store/store";
import { selectCartTotalQuantity } from "@/store/CartProductsSlice";

function ShoppingCart() {
    const count = useAppSelector(selectCartTotalQuantity);
    return (
        <Link href='/' className='relative flex flex-col justify-center'>
            {
                count != 0 &&
                <Badge variant={'destructive'} className='absolute bottom-[50%] left-[50%] pt-1.5'>
                    {count}
                </Badge>
            }
            <ShoppingCartIcon />
        </Link>
    )
}

export default ShoppingCart