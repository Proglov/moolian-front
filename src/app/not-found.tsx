import { House } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='w-full text-center relative' style={{ height: '100vh' }}>
            <div className='w-full absolute top-1/3'>
                <h2 className='m-3'>متاسفم :(</h2>
                <p className='m-3'>صفحه ی مورد نظر شما یافت نشد</p>
                <div>
                    <Link href="/" className='text-indigo-500 flex justify-center gap-1'>
                        برگرد به خونه اول
                        <House className='' />
                    </Link>
                </div>
            </div>

        </div>
    )
}