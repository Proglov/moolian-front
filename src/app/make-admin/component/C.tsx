'use client'

import { useMakeAdminQuery } from "@/services/users"
import { useEffect, useState } from "react"

export default function Component() {
    const { isSuccess } = useMakeAdminQuery()
    const [data, setData] = useState(false)
    useEffect(() => {
        setData(true)
    }, [isSuccess])

    if (data)
        return <div>

            موفقیت آمیز بود
        </div>

    return (
        <div>make Admin</div>
    )
}
