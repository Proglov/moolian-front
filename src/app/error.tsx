'use client'
import Button from '@/components/shared/Button'
import { House, RotateCcw } from 'lucide-react'
import Link from 'next/link'

export default function Error({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html dir='rtl'>
            <body>
                <div className='w-full text-center relative' style={{ height: '100vh' }}>
                    <div className='w-full absolute top-1/3'>
                        <p className='m-3 text-red-600'>متاسفم ارور دادم رفت :(</p>
                        <div className='flex flex-col justify-center'>
                            <Button variant='ghost' onClick={() => reset()} className='text-indigo-500 flex justify-center gap-1 text-base'>
                                یبار دیگه امتحان کن خب
                                <RotateCcw />
                            </Button>
                            <Link href="/" className='text-emerald-500 flex justify-center gap-1'>
                                اگه نشد برگرد به خونه اول
                                <House className='text-xs w-4' />
                            </Link>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}