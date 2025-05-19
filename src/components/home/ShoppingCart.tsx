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
    const { open, setOpen, products, isLoading } = useCart()

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
            <DrawerContent>
                <DrawerHeader className="mr-4">
                    <DrawerTitle>سبد خرید</DrawerTitle>
                </DrawerHeader>

                {
                    isLoading ?
                        <div className="flex justify-center items-center h-[50vh]">
                            <Spinner />
                        </div>
                        :
                        products.length ? (
                            <div className="m-5">
                                <div>
                                    {
                                        products.map((product) => (
                                            <div key={product._id + product.volume}>
                                                <AddButtons product={product} isShoppingCart={true} />
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="flex justify-center items-center mt-5">
                                    <Button asChild>
                                        <Link href='/checkout' >
                                            تایید و ادامه
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )
                            :
                            <>سبد شما خالیست</>
                }
            </DrawerContent>
        </Drawer>
    )
}
