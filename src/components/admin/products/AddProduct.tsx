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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { useAddProduct } from "@/hooks/use-addProduct";
import { categoriesObject, flavorsObject, numberToWords, seasonsObject } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import CustomQuill from "@/components/ui/CustomQuil";
import Spinner from "@/components/shared/Spinner";
import { MultiSelectWithCent } from "@/components/ui/multi-select-with-cent";
import { MultiFileDropzone } from "@/components/shared/multi-image-dropzone";



export default function AddProduct() {
    const { form, isLoading, fileStates, setFileStates, dialogIsOpen, setDialogIsOpen, submit, brands, isBrandQueryLoading, notes, isNoteQueryLoading, onFilesAdded } = useAddProduct()


    return (
        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="m-3">
                    <CircleFadingPlus />
                    افزودن محصول
                </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-auto max-h-screen">
                <DialogHeader>
                    <DialogTitle className="mb-3">افزودن محصول</DialogTitle>
                    <DialogDescription asChild>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(submit)} className="space-y-6 max-w-md">
                                <FormField
                                    control={form.control}
                                    name="nameEN"
                                    disabled={isLoading}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                نام محصول به انگلیسی
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
                                                نام محصول به فارسی
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
                                    name="price"
                                    disabled={isLoading}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                قیمت محصول (تومان)
                                                <span className="text-destructive pt-1.5">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            <FormDescription>{numberToWords(field.value)} تومان</FormDescription>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="brandId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                برند
                                                <span className="text-destructive pt-1.5">*</span>
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                                                <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="انتخاب برند" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        isBrandQueryLoading ?
                                                            <div className="w-full flex justify-center">
                                                                <Spinner />
                                                            </div>
                                                            :
                                                            brands.map(brand => (
                                                                <SelectItem key={brand._id} value={brand._id}>{brand.nameFA}</SelectItem>
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
                                    name="initialNoteObjects"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                نوت های ابتدایی
                                                <span className="text-destructive pt-1.5">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                {
                                                    isNoteQueryLoading ?
                                                        <div className="w-full flex justify-center">
                                                            <Spinner />
                                                        </div>
                                                        :
                                                        <MultiSelectWithCent
                                                            options={notes.map(note => ({ value: note._id, label: note.name }))}
                                                            value={field.value.map(({ noteId, cent }) => ({ value: noteId, cent }))}
                                                            onValueChange={opts => field.onChange(
                                                                opts.map(({ value, cent }) => ({ noteId: value, cent }))
                                                            )}
                                                            placeholder="انتخاب نوت های ابتدایی"
                                                            variant="secondary"
                                                            modalPopover={true}
                                                            maxCount={3}
                                                        />
                                                }
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="midNoteObjects"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                نوت های میانی
                                                <span className="text-destructive pt-1.5">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                {
                                                    isNoteQueryLoading ?
                                                        <div className="w-full flex justify-center">
                                                            <Spinner />
                                                        </div>
                                                        :
                                                        <MultiSelectWithCent
                                                            options={notes.map(note => ({ value: note._id, label: note.name }))}
                                                            value={field.value.map(({ noteId, cent }) => ({ value: noteId, cent }))}
                                                            onValueChange={opts => field.onChange(
                                                                opts.map(({ value, cent }) => ({ noteId: value, cent }))
                                                            )}
                                                            placeholder="انتخاب نوت های میانی"
                                                            variant="secondary"
                                                            modalPopover={true}
                                                            maxCount={3}
                                                        />
                                                }
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="baseNoteObjects"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                نوت های پایه
                                                <span className="text-destructive pt-1.5">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                {
                                                    isNoteQueryLoading ?
                                                        <div className="w-full flex justify-center">
                                                            <Spinner />
                                                        </div>
                                                        :
                                                        <MultiSelectWithCent
                                                            options={notes.map(note => ({ value: note._id, label: note.name }))}
                                                            value={field.value.map(({ noteId, cent }) => ({ value: noteId, cent }))}
                                                            onValueChange={opts => field.onChange(
                                                                opts.map(({ value, cent }) => ({ noteId: value, cent }))
                                                            )}
                                                            placeholder="انتخاب نوت های پایه"
                                                            variant="secondary"
                                                            modalPopover={true}
                                                            maxCount={3}
                                                        />
                                                }
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="year"
                                    disabled={isLoading}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                سال تولید محصول
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
                                    name="maker"
                                    disabled={isLoading}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                عطار محصول
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
                                    name="country"
                                    disabled={isLoading}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                کشور محصول
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
                                    name="olfactory"
                                    disabled={isLoading}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                گروه بویایی محصول
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
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                جنسیت مصرف کننده محصول
                                                <span className="text-destructive pt-1.5">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    dir="rtl"
                                                    onValueChange={field.onChange}
                                                    defaultValue='male'
                                                    className="flex flex-col sm:flex-row"
                                                >
                                                    <FormItem className="flex items-center">
                                                        <FormControl>
                                                            <RadioGroupItem value="male" />
                                                        </FormControl>
                                                        <FormLabel>مردانه</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center">
                                                        <FormControl>
                                                            <RadioGroupItem value='female' />
                                                        </FormControl>
                                                        <FormLabel>زنانه</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center">
                                                        <FormControl>
                                                            <RadioGroupItem value='unisex' />
                                                        </FormControl>
                                                        <FormLabel>اسپورت</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                دسته بندی
                                                <span className="text-destructive pt-1.5">*</span>
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                                                <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="انتخاب دسته بندی" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        Object.entries(categoriesObject).map(category => (
                                                            <SelectItem key={category[0]} value={category[0]}>{category[1]}</SelectItem>
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
                                    name="flavor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                طبع‌ها
                                                <span className="text-destructive pt-1.5">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <MultiSelect
                                                    options={Object.entries(flavorsObject).map(([value, label]) => ({ value, label }))}
                                                    onValueChange={field.onChange}
                                                    value={field.value || []}
                                                    placeholder="انتخاب طبع ها"
                                                    variant="secondary"
                                                    modalPopover={true}
                                                    maxCount={3}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="season"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                فصل ها
                                                <span className="text-destructive pt-1.5">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <MultiSelect
                                                    options={Object.entries(seasonsObject).map(([value, label]) => ({ value, label }))}
                                                    onValueChange={field.onChange}
                                                    value={field.value || []}
                                                    placeholder="انتخاب فصل ها"
                                                    variant="secondary"
                                                    modalPopover={true}
                                                    maxCount={3}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="desc"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                توضیحات محصول
                                                <span className="text-destructive pt-1.5">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <CustomQuill
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    disabled={false}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="max-w-md">
                                    <label
                                        className="block mt-2 mb-1 text-right" htmlFor="inline-image-upload">
                                        آپلود تصاویر
                                        <span className="text-destructive pt-1.5">*</span>
                                    </label>
                                    <MultiFileDropzone
                                        value={fileStates}
                                        onChange={(files) => {
                                            setFileStates(files);
                                        }}
                                        onFilesAdded={onFilesAdded}
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
