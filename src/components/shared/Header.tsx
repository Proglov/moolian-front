'use client'
import { Account } from '../home/Account'
import NavigationMenuWithDropdown from '../home/Menu'
import Searchbar from '../home/Searchbar'
import ShoppingCart from '../home/ShoppingCart'
import ShoppingCartIcon from '../home/ShoppingCartIcon'
import { ModeToggle } from '../home/toggle-theme'
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Header() {
    return (
        <header>
            <div className="sticky z-50 bg-background top-0 flex justify-around h-16 items-center gap-2 border-b px-4 shadow-lg">
                <SidebarTrigger className="-ml-1 block md:hidden" />
                <div className='flex gap-2 grow'>
                    <ModeToggle />
                    <Searchbar />
                </div>
                <div className='flex gap-2 mr-4'>
                    <ShoppingCart />
                    <Account />
                </div>
            </div>
            <div className="bg-primary top-0 hidden md:flex justify-center h-16 shrink-0 items-center gap-2 border-b px-4 z-40">
                <NavigationMenuWithDropdown />
            </div>
        </header>
    )
}
