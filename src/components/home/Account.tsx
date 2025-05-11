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
import { LogIn, LogOut, User } from "lucide-react"
import Link from "next/link";
import Button from "../shared/Button";
import { useGetMeQuery } from "@/services/users";
import Spinner from "../shared/Spinner";
import { useLogoutMutation } from "@/services/auth";

export function Account() {
    const { isError, isLoading, isUninitialized, data } = useGetMeQuery();
    const [logout, { isSuccess: isLogoutSuccess }] = useLogoutMutation();

    useEffect(() => {
        if (isLogoutSuccess) window.location.reload();
    }, [isLogoutSuccess])


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
                    <DropdownMenuItem>
                        پروفایل من
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        سفارشات من
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex gap-2" onClick={() => logout()}>
                        خروج
                        <LogOut className="text-destructive" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
