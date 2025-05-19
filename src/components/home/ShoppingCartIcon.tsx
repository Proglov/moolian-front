'use client'
import { useEffect, useState } from "react";
import { ShoppingCartIcon as Icon } from 'lucide-react'
import { Badge } from '../ui/badge'
import { useAppSelector } from "@/store/store";
import { selectCartTotalQuantity } from "@/store/CartProductsSlice";

function ShoppingCartIcon() {
    const count = useAppSelector(selectCartTotalQuantity);
    const [hasMounted, setHasMounted] = useState(false);

    //? this is for encountering the hydration error
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return (
        <div className='relative flex flex-col justify-center'>
            {hasMounted && count !== 0 && (
                <Badge variant={'destructive'} className='absolute bottom-[50%] left-[50%] pt-1.5'>
                    {count}
                </Badge>
            )}
            <Icon />
        </div>
    )
}

export default ShoppingCartIcon