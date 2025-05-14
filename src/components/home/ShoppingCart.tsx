'use client'
import { useEffect, useState } from "react";
import { ShoppingCartIcon } from 'lucide-react'
import { Badge } from '../ui/badge'
import Link from 'next/link';
import { useAppSelector } from "@/store/store";
import { selectCartTotalQuantity } from "@/store/CartProductsSlice";

function ShoppingCart() {
    const count = useAppSelector(selectCartTotalQuantity);
    const [hasMounted, setHasMounted] = useState(false);

    //? this is for encountering the hydration error
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return (
        <Link href='/' className='relative flex flex-col justify-center'>
            {hasMounted && count !== 0 && (
                <Badge variant={'destructive'} className='absolute bottom-[50%] left-[50%] pt-1.5'>
                    {count}
                </Badge>
            )}
            <ShoppingCartIcon />
        </Link>
    )
}

export default ShoppingCart
