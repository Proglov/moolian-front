import { useRouter } from "next/navigation"
import { useEffect } from "react"
import useError from "./useError"

export default function useAuth(hook: any) {
    const [func, { isError, error, isLoading, isSuccess }] = hook()
    const router = useRouter()

    useError(error, isError)

    useEffect(() => {
        if (isSuccess) router.push('/')
    }, [isSuccess, router])


    return {
        func,
        isLoading
    }
}