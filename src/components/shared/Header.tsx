'use client'
import Image from 'next/image'
import { Account } from '../home/Account'
import NavigationMenuWithDropdown from '../home/Menu'
import Searchbar from '../home/Searchbar'
import ShoppingCart from '../home/ShoppingCart'
import { ModeToggle } from '../home/toggle-theme'
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from 'next/link'
import { useTheme } from 'next-themes'

export default function Header() {
    const { theme } = useTheme()
    const imageSrc = theme === 'dark' ? "/img/logo-white.png" : "/img/logo.svg";

    return (
        <header>
            <div className="sticky z-50 bg-background top-0 flex justify-around h-16 items-center gap-2 border-b px-4 shadow-lg">
                <SidebarTrigger className="-ml-1 block md:hidden" />
                <div className='flex gap-2 grow'>
                    <ModeToggle />
                    <Searchbar />
                </div>
                <div className='flex items-center gap-2'>
                    <ShoppingCart />
                    <Link href='/'>
                        <Image
                            width={48}
                            height={48}
                            src={imageSrc}
                            alt="Hero"
                            className="inset-0 object-cover w-12 h-12"
                        />
                    </Link>
                    <Account />
                </div>
            </div>
            <div className="bg-primary top-0 hidden md:flex justify-center h-16 shrink-0 items-center gap-2 border-b px-4 z-40">
                <NavigationMenuWithDropdown />
            </div>
        </header>
    )
}
