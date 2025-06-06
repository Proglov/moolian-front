import { IProductRate } from "@/types/product.type"
import { StarRating } from "../profile/TransactionOpinion"


export default function ProductStars({ rates = [] }: { rates?: IProductRate[] }) {
    if (!rates || !rates.length) return null
    const avgRate = rates.reduce((prev, curr) => prev + curr.count, 0) / rates.length
    return (
        <StarRating value={avgRate} onChange={() => { }} disabled={true} />
    )
}