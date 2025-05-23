'use client'
import useMySpecification from "@/hooks/use-mySpecification"
import Spinner from "../shared/Spinner"
import SemiColon from "../shared/SemiColon"
import Button from "../shared/Button"
import SpecificationDialog from "./SpecificationDialog"

export default function Specification() {
    const { data: user, isLoading, dialogIsOpen, form, isUserUpdateLoading, setDialogIsOpen, submit } = useMySpecification()

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
    )
}
