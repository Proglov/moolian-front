'use client'
import { Account } from '../home/Account'
import NavigationMenuWithDropdown from '../home/Menu'
import Searchbar from '../home/Searchbar'
import ShoppingCart from '../home/ShoppingCart'
import { ModeToggle } from '../home/toggle-theme'
import { SidebarTrigger } from "@/components/ui/sidebar"
import Logo from './Logo'

export default function Header() {
    return (
        <header className='sticky top-0 z-50'>
            <div className="bg-background flex justify-around h-16 items-center gap-2 border-b px-4 shadow-lg">
                <SidebarTrigger className="-ml-1 block md:hidden" />
                <div className='flex items-center gap-2 grow'>
                    <Logo length={12} />
                    <Searchbar />
                </div>
                <div className='flex items-center gap-2'>
                    <ShoppingCart />
                    <ModeToggle />
                    <Account />
                </div>
            </div>
            <div className="bg-primary hidden md:flex justify-center h-16 shrink-0 items-center gap-2 border-b px-4 z-40">
                <NavigationMenuWithDropdown />
            </div>
        </header>
    )
}
