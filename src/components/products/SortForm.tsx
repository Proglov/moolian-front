import { TSortForm } from '@/hooks/use-getProducts'
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
import { OrderBy } from '@/types/product.type';


export default function SortForm({ form, submit }: { form: UseFormReturn<TSortForm>, submit: (data: TSortForm) => void }) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-6 max-w-md mx-auto p-1">
                <FormField
                    control={form.control}
                    name="orderBy"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                مرتب سازی بر اساس
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
                                            <RadioGroupItem value={OrderBy.New} />
                                        </FormControl>
                                        <FormLabel>جدیدترین</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center">
                                        <FormControl>
                                            <RadioGroupItem value={OrderBy.expensive} />
                                        </FormControl>
                                        <FormLabel>گرانترین</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center">
                                        <FormControl>
                                            <RadioGroupItem value={OrderBy.cheap} />
                                        </FormControl>
                                        <FormLabel>ارزانترین</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="w-full flex justify-center">
                    <Button type="submit">اعمال مرتب سازی</Button>
                </div>
            </form>
        </Form>
    )
}
