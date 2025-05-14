import SingleProduct from "@/components/products/single-product/SingleProduct"


export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return <SingleProduct id={id} />
}