import { toast } from "@/components/ui/sonner"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function useAuth(hook: any) {
    const [func, { isError, error, isLoading, isSuccess }] = hook()
    const router = useRouter()


    useEffect(() => {
        if (isSuccess) router.push('/')
    }, [isSuccess, router])

    useEffect(() => {
        if (isError && 'status' in error && typeof error.data === 'object' && error.data !== null) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError, error])


    return {
        func,
        isLoading
    }
}