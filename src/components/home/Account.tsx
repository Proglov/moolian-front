import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogIn, LogOut, User } from "lucide-react"
import Link from "next/link";
import Button from "../shared/Button";

export function Account() {
    const isLoggedIn = true;
    const userName = 'محمد پرویزی'

    if (!isLoggedIn)
        return (
            <Button asChild variant='outline'>
                <Link href='/' className="flex gap-2">
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
                <DropdownMenuLabel>{userName}</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        پروفایل من
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        سفارشات من
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex gap-2">
                        خروج
                        <LogOut className="text-destructive" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
