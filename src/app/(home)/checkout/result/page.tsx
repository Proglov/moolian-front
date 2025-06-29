import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { FaClipboardCheck } from "react-icons/fa"
import { GiCancel } from "react-icons/gi";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ res: string }>
}) {
    const { res } = await searchParams;


    if (res === '1') return (
        <Alert className="text-success">
            <FaClipboardCheck />
            <AlertTitle className="text-xl">سپاس از خرید شما!</AlertTitle>
            <AlertDescription className="text-base">
                <div>
                    خرید شما با موفقیت انجام شد و در حال حاضر در حال پردازش است.
                    <br />
                    برای مشاهده وضعیت خرید خود، به صفحه
                    <Link href='/profile' className="text-purple-600 underline mx-1">
                        پروفایل
                    </Link>
                    خود مراجعه کنید.
                    <br />
                    در صورت بروز هرگونه مشکل، با ما تماس بگیرید.
                    <br />
                    <span className="text-destructive text-sm">توجه: پس از تایید سفارش شما توسط فروشگاه، این خرید غیرقابل برگشت خواهد بود.</span>


                </div>
            </AlertDescription>
        </Alert>
    )

    return (
        <Alert className="text-destructive">
            <GiCancel />
            <AlertTitle className="text-xl text-destructive">خرید شما ناموفق بوده است :(</AlertTitle>
            <AlertDescription className="text-base">
                <div>
                    خرید شما ناموفق بوده است. لطفا بار دیگر تلاش کنید
                    <br />
                    چنانچه پس از تلاش های متعدد، مشکلی از طرف سرویس های ما رخ  داده است، با ما در ارتباط باشید
                </div>
            </AlertDescription>
        </Alert>
    )
}