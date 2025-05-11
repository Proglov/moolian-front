import { IProduct } from '@/types/product.type'
import Card from './Card'

export default function Cards({ products }: { products: IProduct[] }) {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 gap-y-4 border-2 border-muted rounded-xl p-4'>
            {
                products.map(product => (
                    <Card key={product._id} product={product} />
                ))
            }
        </div>
    )
}