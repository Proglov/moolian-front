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
import { useEditBrand } from "@/hooks/use-editBrand";
import { IBrand } from "@/types/brand.type";
import Image from "next/image";
import { SingleImageDropzone } from "@/components/shared/single-image-dropzone";



export default function EditBrand({ brand }: { brand: IBrand }) {
    const { form, isLoading, dialogIsOpen, handleOpenChange, submit, fileState, setFileState } = useEditBrand(brand);

    return (
        <Dialog open={dialogIsOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="m-3" variant='outline' size='sm'>
                    ویرایش
                    <Edit2 />
                </Button>

            </DialogTrigger>
            <DialogContent className="overflow-y-auto max-h-screen">
                <DialogHeader>
                    <DialogTitle className="mb-3">ویرایش محصول</DialogTitle>
                    <DialogDescription asChild>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(submit)} className="space-y-6 max-w-md mx-auto">
                                <FormField
                                    control={form.control}
                                    name="nameEN"
                                    disabled={isLoading}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                نام محصول به انگلیسی
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
                                                نام محصول به فارسی
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="w-2/3 flex flex-col gap-4 mx-auto relative">
                                    <Image
                                        className={`w-full aspect-[4/3] object-cover ${!!fileState && 'blur-lg'}`}
                                        width={600}
                                        height={600}
                                        alt="picture of the brand"
                                        src={brand.imageKey}
                                    />
                                    {
                                        !!fileState &&
                                        <div className="w-full h-full absolute text-center text-destructive text-shadow-sm text-shadow-white">
                                            تصویر جایگزین انتخاب شد
                                        </div>
                                    }
                                </div>
                                <div>

                                    <label
                                        className="block mt-2 mb-1 text-right" htmlFor="inline-image-upload">
                                        آپلود تصویر جایگزین
                                    </label>

                                    <SingleImageDropzone
                                        value={fileState}
                                        onChange={file => {
                                            setFileState(file);
                                        }}
                                    />
                                </div>

                                <div className="w-full flex justify-center">
                                    <Button type="submit" loading={isLoading}>اعمال تغییرات</Button>
                                </div>
                            </form>
                        </Form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
