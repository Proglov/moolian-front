import { Edit2 } from "lucide-react";
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
import { Input } from "@/components/ui/input"
import { SingleImageDropzone } from "@/components/shared/single-image-dropzone";
import { IProduct } from "@/types/product.type";
import { useEditProduct } from "@/hooks/use-editProduct";



export default function EditProduct({ product }: { product: IProduct }) {
    const { form, isLoading, fileState, setFileState, dialogIsOpen, setDialogIsOpen, submit } = useEditProduct(product)

    return (
        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button variant='outline'>
                    ویرایش
                    <Edit2 />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>افزودن برند</DialogTitle>
                    <DialogDescription asChild>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="nameEN"
                                    disabled={isLoading}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                نام برند به انگلیسی
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
                                    name="nameFA"
                                    disabled={isLoading}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                نام برند به فارسی
                                                <span className="text-destructive pt-1.5">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div>

                                    <label
                                        className="block mt-2 mb-1 text-right" htmlFor="inline-image-upload">
                                        آپلود تصویر
                                    </label>

                                    <SingleImageDropzone
                                        value={fileState}
                                        onChange={file => {
                                            setFileState(file);
                                        }}
                                    />
                                </div>
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
