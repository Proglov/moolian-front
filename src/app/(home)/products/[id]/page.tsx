import SingleProduct from "@/components/products/SingleProduct"


export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return <SingleProduct id={id} />
}