import ProductMain from "@/components/admin/reports/products/ProductMain"

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return (
        <ProductMain id={id} />
    )
}