import { TForm } from '@/hooks/use-getProducts'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import Button from "@/components/shared/Button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { categoriesObject, flavorsObject, seasonsObject } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";


export default function FilterForm({ form, submit }: { form: UseFormReturn<TForm>, submit: (data: TForm) => void }) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-6 max-w-md mx-auto p-1">
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                جنسیت مصرف کننده محصول
                            </FormLabel>
                            <FormControl>
                                <RadioGroup
                                    dir="rtl"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
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
                                        <FormLabel>یونیسکس</FormLabel>
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
                                طعم
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                                <FormControl className="w-full">
                                    <SelectTrigger>
                                        <SelectValue placeholder="انتخاب طعم" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        Object.entries(flavorsObject).map(flavor => (
                                            <SelectItem key={flavor[0]} value={flavor[0]}>{flavor[1]}</SelectItem>
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
                    name="season"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                فصل
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                                <FormControl className="w-full">
                                    <SelectTrigger>
                                        <SelectValue placeholder="انتخاب فصل" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        Object.entries(seasonsObject).map(season => (
                                            <SelectItem key={season[0]} value={season[0]}>{season[1]}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="w-full flex justify-center">
                    <Button type="submit">اعمال فیلتر</Button>
                </div>
            </form>
        </Form>
    )
}
