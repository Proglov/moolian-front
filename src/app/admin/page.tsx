import Products from '@/components/admin/Products'

interface props {
    searchParams: { [key: string]: string | undefined }
}

export default async function page({ searchParams }: props) {
    const params = await searchParams;
    const currentPage = parseInt(params['page'] || '') || 1;

    return (
        <div className='m-5'>
            <Products currenPage={currentPage} />
        </div>
    )
}
