import UserMain from "@/components/admin/reports/users/UserMain"

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return (
        <UserMain id={id} />
    )
}