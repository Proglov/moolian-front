import Image from "next/image"
import Link from "next/link"
import Button from "../shared/Button"

export default function Hero() {
    return (
        <div className="relative w-full h-[50rem]">
            <Image width={1000} height={1000} src="/img/5.jpg" alt="Hero" className="absolute inset-0 object-cover w-full h-full rounded-b-sm" />
            <div className="absolute inset-0 flex flex-col justify-center gap-4 p-4 md:gap-10">
                <div className="grid gap-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        مولیان پرفیوم
                    </h1>
                    <p className="max-w-[700px]">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
                    </p>
                </div>
                <Button asChild variant={'default'}>
                    <Link
                        href="#"
                        className="inline-flex h-10 items-center justify-center rounded-md shadow-sm w-24 transition-colors"
                        prefetch={false}
                    >
                        دکمه
                    </Link>
                </Button>
            </div>
        </div>
    )
}