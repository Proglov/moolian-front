'use client'
import useMySpecification from "@/hooks/use-mySpecification"
import Spinner from "../shared/Spinner"
import SemiColon from "../shared/SemiColon"
import Button from "../shared/Button"
import SpecificationDialog from "./SpecificationDialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"


export default function Specification() {
    const { data: user, isLoading, dialogIsOpen, form, isUserUpdateLoading, setDialogIsOpen, submit, createEmailOTP, isEmailOTPSent, isEmailOTPSentLoading } = useMySpecification()

    if (isLoading) return (
        <div className="w-full flex justify-center">
            <Spinner />
        </div>
    )
    if (!user) return (
        <div className="w-full flex justify-center">
            کاربری یافت نشد!
        </div>
    )


    return (
        <div>
            {/* email verification check */}
            {
                (!user.isEmailVerified) &&
                <Alert variant='destructive'>
                    {
                        isEmailOTPSentLoading ?
                            <Spinner />
                            :
                            isEmailOTPSent ?
                                <>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>ایمیل خود را بررسی کنید</AlertTitle>
                                    <AlertDescription>
                                        لینک تایید به ایمیل شما ارسال شد
                                    </AlertDescription>
                                </>
                                :
                                <>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>ایمیل خود را فعال کنید</AlertTitle>
                                    <AlertDescription>
                                        <div>
                                            در صورت فراموشی رمز عبور، رمز جدید فقط برای ایمیل های فعال ارسال خواهد شد
                                        </div>
                                        <Button
                                            variant='ghost'
                                            className="text-purple-700 underline hover:text-[1rem] hover:text-purple-800"
                                            onClick={() => createEmailOTP()}
                                        >
                                            {'< '} فعال کردن {' >'}
                                        </Button>
                                    </AlertDescription>
                                </>
                    }
                </Alert>

            }

            <div className="flex flex-col gap-2 m-2">
                <div>
                    نام
                    <SemiColon />
                    {user.name || 'فاقد نام'}
                </div>

                <div>
                    نام کاربری
                    <SemiColon />
                    {user.username}
                </div>

                <div>
                    ایمیل
                    <SemiColon />
                    {user.email}
                </div>

                <div>
                    شماره همراه
                    <SemiColon />
                    {user.phone}
                </div>

                <div className="self-center">
                    <Button
                        onClick={() => setDialogIsOpen(true)}
                    >
                        ویرایش اطلاعات
                    </Button>
                </div>

                <SpecificationDialog dialogIsOpen={dialogIsOpen} form={form} isLoading={isUserUpdateLoading} setDialogIsOpen={setDialogIsOpen} submit={submit} />
            </div>
        </div>
    )
}
