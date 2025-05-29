import { getChangedFields, isEmail } from "@/lib/utils";
import { phoneNumberValidator } from "@persian-tools/persian-tools";
import { useGetMeQuery, useUpdateUserMutation } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { IUser } from "@/types/user.type";
import { useAddNewEmailOTPMutation, useIsEmailOTPSentQuery } from "@/services/emailOTP";
import useError from "./useError";

export default function useMySpecification() {
    const { data, isLoading, isError, error } = useGetMeQuery()
    const { isUserUpdateLoading, dialogIsOpen, form, setDialogIsOpen, submit } = useUserUpdate(data)
    const { isEmailOTPSent, isEmailOTPSentLoading } = useIsEmailSent();
    const { createEmailOTP } = useAddEmailOTP();

    useError(error, isError)

    return {
        data,
        isLoading,
        isUserUpdateLoading,
        dialogIsOpen,
        setDialogIsOpen,
        form,
        submit,
        isEmailOTPSent,
        isEmailOTPSentLoading,
        createEmailOTP
    }
}


const updateUserFormSchema = z.object({
    name: z.string({ message: 'نام باید رشته متنی باشد' }).optional(),
    username: z.string({ message: 'نام کاربری باید رشته متنی باشد' })
        .min(8, { message: "نام کاربری حداقل شامل 8 حرف میباشد" })
        .max(15, { message: "نام کاربری حداکثر شامل 15 حرف میباشد" })
        .refine(val => !isEmail(val), { message: "نام کاربری نمیتواند ایمیل باشد" })
        .optional(),
    email: z.string({ message: 'ایمیل باید رشته متنی باشد' }).email({ message: 'ایمیل وارد شده صحیح نیست' }).optional(),
    phone: z.string({ message: 'شماره باید رشته متنی باشد' })
        .refine(val => phoneNumberValidator(val), { message: "شماره همراه صحیح نمیباشد" })
        .optional(),

})
export type TUpdateUserForm = z.infer<typeof updateUserFormSchema>;
const updateUserResolver = zodResolver(updateUserFormSchema)

const useUserUpdate = (user: IUser | undefined) => {
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const updateUserDefaultValues: TUpdateUserForm = {
        name: user?.name ?? '',
        username: user?.username ?? '',
        email: user?.email ?? '',
        phone: user?.phone ?? '',
    }
    const form = useForm<TUpdateUserForm>({ resolver: updateUserResolver, defaultValues: updateUserDefaultValues })
    const [updateUser, { isLoading, isError, error, isSuccess }] = useUpdateUserMutation()

    useError(error, isError)

    const submit = (data: TUpdateUserForm) => {
        if (!user) return
        const newObj = getChangedFields(user, data)
        if (!Object.keys(newObj).length) return
        updateUser(newObj)
    }

    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name ?? '',
                username: user.username ?? '',
                email: user.email ?? '',
                phone: user.phone ?? '',
            });
        }
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('اطلاعات شما با موفقیت ویرایش شد')
            setDialogIsOpen(false)
        }
    }, [isSuccess])


    return {
        isUserUpdateLoading: isLoading,
        form,
        dialogIsOpen,
        setDialogIsOpen,
        submit
    }
}


const useIsEmailSent = () => {
    const { data, isLoading, isError, error } = useIsEmailOTPSentQuery()

    useError(error, isError)

    return {
        isEmailOTPSent: data,
        isEmailOTPSentLoading: isLoading
    }
}

const useAddEmailOTP = () => {
    const [createEmailOTP, { isError, error, isSuccess }] = useAddNewEmailOTPMutation();

    useError(error, isError)


    useEffect(() => {
        if (isSuccess) {
            toast.success('لینک تایید به ایمیل شما ارسال شد')
        }
    }, [isSuccess])

    return {
        createEmailOTP
    }
}