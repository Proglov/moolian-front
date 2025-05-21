import useCart from "@/hooks/use-cart"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Button from "../shared/Button"
import ShoppingCartIcon from "./ShoppingCartIcon"
import AddButtons from "../shared/AddButtons"
import Spinner from "../shared/Spinner"
import Link from "next/link"


export default function ShoppingCart() {
    const { open, setOpen, products, isLoading, totalPrice, totalDiscount, isLoggedIn } = useCart()
    const endPrice = totalDiscount ? totalPrice - totalDiscount : totalPrice

    return (
        <Drawer open={open && !!products.length} onOpenChange={setOpen}>
            <DrawerTrigger className="hover:cursor-pointer">
                <Button asChild>
                    {
                        products.length &&
                        <ShoppingCartIcon />
                    }
                </Button>
            </DrawerTrigger>
            <DrawerContent className="mb-5">
                <DrawerHeader className="pr-10 w-full max-w-2xl mx-auto">
                    <DrawerTitle>سبد خرید</DrawerTitle>
                </DrawerHeader>

                <div className="mb-5 overflow-y-auto" dir="ltr">
                    <div dir="rtl">
                        {
                            isLoading ?
                                <div className="flex justify-center items-center min-h-[50vh]">
                                    <Spinner />
                                </div>
                                :
                                products.length ? (
                                    <div className="m-5">
                                        <div>
                                            {
                                                products.map((product) => (
                                                    <div key={product._id}>
                                                        <AddButtons product={product} isShoppingCart={true} />
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <div className="w-full max-w-xl mx-auto mt-5 bg-success/10 p-2 rounded-md">
                                            {
                                                totalDiscount !== 0 && (
                                                    <div className="text-sm text-muted-foreground">
                                                        جمع تخفیف:
                                                        {totalDiscount.toLocaleString('fa-IR')} تومان
                                                    </div>
                                                )
                                            }
                                            <div className="mt-1">
                                                مبلغ نهایی:
                                                {endPrice.toLocaleString('fa-IR')} تومان
                                            </div>
                                        </div>

                                        <div className="flex justify-center items-center mt-5">
                                            <Button asChild>
                                                {
                                                    isLoggedIn ?
                                                        <Link href='/checkout' >
                                                            تایید و ادامه
                                                        </Link>
                                                        :
                                                        <Link href='/auth/signin' >
                                                            ورود به حساب کاربری
                                                        </Link>
                                                }
                                            </Button>
                                        </div>
                                    </div>
                                )
                                    :
                                    <>سبد شما خالیست</>
                        }
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
