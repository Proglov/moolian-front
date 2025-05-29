import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonProduct() {
    return (
        <div className="flex flex-col space-y-3" dir="rtl">
            <Skeleton className="h-[300px] w-[300px] rounded-xl" />
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-14 w-14 rounded-full" />
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-4 w-[235px]" />
                        <Skeleton className="h-4 w-[235px]" />
                    </div>
                </div>
                <Skeleton className="h-4 w-[300px]" />
                <Skeleton className="h-4 w-[300px]" />
            </div>
        </div>
    )
}

export function SkeletonBrand() {
    return (
        <div className="flex flex-col items-center justify-center space-y-3 border border-muted rounded-lg m-1 p-1 pb-4" dir="rtl">
            <Skeleton className="h-14 w-14 rounded-full" />
            <Skeleton className="h-4 w-full rounded-xl" />
            <Skeleton className="h-4 w-full rounded-xl" />
        </div>
    )
}