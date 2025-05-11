"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { phoneNumberValidator } from "@persian-tools/persian-tools";
import { useSignupMutation } from "@/services/auth"
import Button from "@/components/shared/Button"
import { isEmail } from "@/lib/utils"
import { PasswordInput } from "../shared/PasswordInput"
import Link from "next/link"
import useAuth from "@/hooks/use-auth"


const FormSchema = z.object({
    username: z.string({ message: 'نام کاربری الزامیست' })
        .min(8, { message: "نام کاربری حداقل شامل 8 حرف میباشد" })
        .max(15, { message: "نام کاربری حداکثر شامل 15 حرف میباشد" })
        .refine(val => !isEmail(val), { message: "نام کاربری نمیتواند ایمیل باشد" }),
    password: z.string({ message: 'رمزعبور الزامیست' })
        .min(8, { message: "رمزعبور حداقل شامل 8 حرف میباشد" })
        .max(20, { message: "رمزعبور حداکثر شامل 20 حرف میباشد" }),
    passwordRepeat: z.string({ message: 'تکرار رمزعبور الزامیست' })
        .max(20, { message: "رمزعبور حداکثر شامل 20 حرف میباشد" }),
    email: z.string({ message: 'ایمیل الزامیست' }).email({ message: 'ایمیل وارد شده صحیح نیست' }),
    phone: z.string({ message: 'شماره الزامیست' })
        .refine(val => phoneNumberValidator(val), { message: "شماره همراه صحیح نمیباشد" }),

}).superRefine((inp, ctx) => {
    const { passwordRepeat, password } = inp;
    if (passwordRepeat !== password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "تکرار رمزعبور باید با رمزعبور مطابقت داشته باشد",
            path: ['passwordRepeat']
        });
    }
    return true;
})
type TForm = z.infer<typeof FormSchema>;
const defaultValues: TForm = { password: '', passwordRepeat: '', username: '', email: '', phone: '' }
const resolver = zodResolver(FormSchema)


export default function Signup() {
    const form = useForm<TForm>({ resolver, defaultValues })
    const { func: signup, isLoading } = useAuth(useSignupMutation)
    const onSubmit = ({ passwordRepeat: _, ...data }: TForm) => signup(data)


    return (
        <>
            <h2 className="mb-5 text-shadow-lg">
                ثبت نام کاربران
            </h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="username"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    نام کاربری
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
                        name="password"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    رمزعبور
                                    <span className="text-destructive pt-1.5">*</span>
                                </FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="passwordRepeat"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    تکرار رمزعبور
                                    <span className="text-destructive pt-1.5">*</span>
                                </FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    ایمیل
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
                        name="phone"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    شماره همراه
                                    <span className="text-destructive pt-1.5">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="09xxxxxxxxx" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-center">
                        <Button type="submit" loading={isLoading}>ارسال</Button>
                    </div>
                    <FormDescription>
                        قبلا ثبت نام کرده اید؟ از
                        <Link href='/auth/signin' className="text-purple-700 underline text-base mx-1">
                            اینجا
                        </Link>
                        وارد شوید
                    </FormDescription>
                </form>
            </Form>
        </>
    )
}
