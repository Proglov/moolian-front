'use client'
import { useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogIn, LogOut as LogOutIcon, User } from "lucide-react"
import Link from "next/link";
import Button from "../shared/Button";
import { useGetMeQuery } from "@/services/users";
import Spinner from "../shared/Spinner";
import { useLogoutMutation } from "@/services/auth";
import { useAppDispatch } from "@/store/store";
import { LogOut, SetUserInfo } from "@/store/auth";

export function Account() {
    const dispatch = useAppDispatch();
    const { isError, isLoading, isUninitialized, data, isSuccess } = useGetMeQuery();
    const [logoutQuery, { isSuccess: isLogoutSuccess }] = useLogoutMutation();

    useEffect(() => {
        if (isLogoutSuccess) {
            window.location.reload();
            dispatch(LogOut())
        }
    }, [isLogoutSuccess, dispatch])

    useEffect(() => {
        if (isSuccess && data)
            dispatch(SetUserInfo({ _id: data._id, name: data.name }))
        else if (isError)
            dispatch(SetUserInfo({ _id: '', name: '' }))
    }, [data, dispatch, isError, isSuccess])

    if (isUninitialized || isLoading) return <Spinner />

    if (isError || !data) return (
        <Button asChild variant='outline'>
            <Link href='/auth/signin' className="flex gap-2">
                ورود
                <LogIn className="text-emerald-600" />
            </Link>
        </Button>
    )

    return (
        <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <User />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 ml-4">
                <DropdownMenuLabel>
                    {data.name ? data.name : data.username}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href='/profile?tab=specification'>
                            پروفایل من
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href='/profile?tab=tx'>
                            سفارشات من
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex gap-2" onClick={() => logoutQuery()}>
                        خروج
                        <LogOutIcon className="text-destructive" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
