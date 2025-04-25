"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/sonner"
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
import { useSigninPhoneMutation } from "@/services/auth"
import Button from "@/components/shared/Button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { PasswordInput } from "../shared/PasswordInput"
import Link from "next/link"


const FormSchema = z.object({
    password: z.string({ message: 'رمزعبور الزامیست' })
        .min(8, { message: "رمزعبور حداقل شامل 8 حرف میباشد" })
        .max(20, { message: "رمزعبور حداکثر شامل 20 حرف میباشد" }),
    phone: z.string({ message: 'شماره الزامیست' })
        .refine(val => phoneNumberValidator(val), { message: "شماره همراه صحیح نمیباشد" }),

})
type TForm = z.infer<typeof FormSchema>;
const defaultValues: TForm = { password: '', phone: '' }
const resolver = zodResolver(FormSchema)


export default function SigninPhone() {
    const form = useForm<TForm>({ resolver, defaultValues })
    const [signin, { isError, error, isLoading, isSuccess }] = useSigninPhoneMutation()
    const router = useRouter()


    useEffect(() => {
        isSuccess && router.push('/')
    }, [isSuccess])

    useEffect(() => {
        if (isError && 'status' in error && typeof error.data === 'object' && error.data !== null) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError])



    return (
        <>
            <h2 className="mb-5 text-shadow-lg">
                ورود کاربران
            </h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(signin)} className="space-y-6">
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
                    <div className="w-full flex justify-center">
                        <Button type="submit" loading={isLoading}>ارسال</Button>
                    </div>
                    <FormDescription>
                        میخواهید با نام کاربری یا ایمیل وارد شوید؟ از
                        <Link href='/auth/signin?tab=username' className="text-purple-700 underline text-base mx-1">
                            اینجا
                        </Link>
                        وارد شوید
                    </FormDescription>
                    <FormDescription>
                        تاکنون ثبت نام نکرده اید؟ از
                        <Link href='/auth/signup' className="text-purple-700 underline text-base mx-1">
                            اینجا
                        </Link>
                        ثبت نام کنید
                    </FormDescription>
                </form>
            </Form>
        </>
    )
}
