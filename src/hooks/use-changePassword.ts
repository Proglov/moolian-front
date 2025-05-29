import { useChangePasswordMutation } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import useError from "./useError";


const changePasswordFormSchema = z.object({
    currentPassword: z.string({ message: 'رمزعبور فعلی الزامیست' })
        .min(8, { message: "رمزعبور فعلی حداقل شامل 8 حرف میباشد" })
        .max(20, { message: "رمزعبور فعلی حداکثر شامل 20 حرف میباشد" }),
    password: z.string({ message: 'رمزعبور الزامیست' })
        .min(8, { message: "رمزعبور حداقل شامل 8 حرف میباشد" })
        .max(20, { message: "رمزعبور حداکثر شامل 20 حرف میباشد" }),

})
export type TChangePasswordForm = z.infer<typeof changePasswordFormSchema>;
const changePasswordResolver = zodResolver(changePasswordFormSchema)
const changePasswordDefaultValues: TChangePasswordForm = { currentPassword: '', password: '' }

export default function useChangePassword() {
    const form = useForm<TChangePasswordForm>({ resolver: changePasswordResolver, defaultValues: changePasswordDefaultValues })
    const [changePassword, { isLoading, isError, error, isSuccess }] = useChangePasswordMutation()

    useError(error, isError)

    useEffect(() => {
        if (isSuccess) {
            toast.success('اطلاعات شما با موفقیت ویرایش شد')
            form.reset();
        }
    }, [isSuccess])

    const submit = (data: TChangePasswordForm) => {
        if (data.currentPassword === data.password) {
            toast.error('رمز فعلی و قبلی نمیتواند یکسان باشد')
            return
        }
        changePassword(data);
    }

    return {
        isLoading,
        form,
        submit
    }
}