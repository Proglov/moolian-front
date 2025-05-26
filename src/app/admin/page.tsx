import MainAdmin from "@/components/admin/MainAdmin";
import AdminOnly from "@/components/shared/AdminOnly";


export default async function page() {
    return (
        <div className='m-5'>
            <AdminOnly>
                <MainAdmin />
            </AdminOnly>
        </div>
    )
}
