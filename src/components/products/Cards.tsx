import { IProduct } from '@/types/product.type'
import Card from './Card'

export default function Cards({ products }: { products: IProduct[] }) {
    if (!products || products.length === 0) return <div className='w-full flex justify-center'>نتیجه ای یافت نشد</div>

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-1 gap-y-4 border-2 border-muted rounded-xl p-4'>
            {
                products.map(product => (
                    <Card key={product._id} product={product} />
                ))
            }
        </div>
    )
}