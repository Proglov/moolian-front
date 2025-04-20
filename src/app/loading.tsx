import Spinner from "@/components/shared/Spinner";



export default function Loading() {
    return (
        <div className='w-full text-center relative' style={{ height: '100vh' }}>
            <div className='w-full absolute top-1/3 flex justify-center'>
                <p className='m-3'>لطفا منتظر بمانید</p>
                <Spinner />
            </div>
        </div>
    )
}