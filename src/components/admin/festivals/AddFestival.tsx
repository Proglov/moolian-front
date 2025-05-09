import { CircleFadingPlus } from "lucide-react";
import Button from "@/components/shared/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddFestival } from "@/hooks/use-addFestival";
import Spinner from "@/components/shared/Spinner";
import { Input } from "@/components/ui/input";



export default function AddFestival() {
    const { form, isLoading, dialogIsOpen, setDialogIsOpen, submit, isProductQueryLoading, products } = useAddFestival()

    return (
        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="m-3">
                    <CircleFadingPlus />
                    افزودن جشنواره
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>افزودن جشنواره</DialogTitle>
                    <DialogDescription asChild>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="productId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                محصول
                                                <span className="text-destructive pt-1.5">*</span>
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                                                <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="انتخاب محصول" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        isProductQueryLoading ?
                                                            <div className="w-full flex justify-center">
                                                                <Spinner />
                                                            </div>
                                                            :
                                                            products.map(product => (
                                                                <SelectItem key={product._id} value={product._id}>{product.nameFA}</SelectItem>
                                                            ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="offPercentage"
                                    disabled={isLoading}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                درصد تخفیف
                                                <span className="text-destructive pt-1.5">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="until"
                                    disabled={isLoading}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                تعداد روز تا پایان جشنواره
                                                <span className="text-destructive pt-1.5">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="w-full flex justify-center">
                                    <Button type="submit" loading={isLoading}>ارسال</Button>
                                </div>
                            </form>
                        </Form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
