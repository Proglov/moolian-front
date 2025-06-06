'use client'
import { useIsAdminQuery } from '@/services/users'
import React, { useEffect } from 'react'
import Spinner from './Spinner'
import { useRouter } from 'next/navigation';

export default function AdminOnly({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data, isLoading, isError } = useIsAdminQuery()
    const router = useRouter()

    useEffect(() => {
        if (isError || data === false) {
            router.push('/')
        }
    }, [isError, router, data])

    if (isLoading) return (
        <div className='w-full h-full flex justify-center'>
            <Spinner />
        </div>
    )

    return (
        <>{children}</>
    )
}
