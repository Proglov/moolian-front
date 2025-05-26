'use client'
import { useIsAdminQuery } from '@/services/users'
import React from 'react'
import Spinner from './Spinner'

export default function AdminOnly({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data, isLoading, isError } = useIsAdminQuery()

    if (isLoading) return (
        <div className='w-full h-full mx-auto'>
            <Spinner />
        </div>
    )
    if (isError || !data)
        return null
    return (
        <>{children}</>
    )
}
