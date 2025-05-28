import Button from "@/components/shared/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useChangePassword from "@/hooks/use-changePassword";
import { PasswordInput } from "../shared/PasswordInput";

export default function Password() {
    const { submit, form, isLoading } = useChangePassword()

    return (
        <div className="m-5">
            <h2 className="mb-4">
                تغییر رمز عبور
            </h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    رمز فعلی
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
                        name="password"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    رمز جدید
                                </FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-2 mt-2 justify-center">
                        <Button type="submit" variant='destructive' disabled={isLoading} loading={isLoading}>ارسال</Button>
                        <Button type="reset" variant='outline' disabled={isLoading} onClick={() => form.reset()} >
                            لغو
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
