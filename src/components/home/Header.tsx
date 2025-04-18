'use client'
import { Account } from './Account'
import NavigationMenuWithDropdown from './Menu'
import Searchbar from './Searchbar'
import ShoppingCart from './ShoppingCart'
import { ModeToggle } from './toggle-theme'
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Header() {
    return (
        <>
            <header className="sticky top-0 z-50 flex justify-around h-16 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1 block md:hidden" />
                <div className='flex gap-2 grow'>
                    <ModeToggle />
                    <Searchbar />
                </div>
                <div className='flex gap-2 mr-4'>
                    <ShoppingCart />
                    <Account />
                </div>
            </header>
            <header className="bg-primary sticky top-0 hidden md:flex justify-center h-16 shrink-0 items-center gap-2 border-b px-4 z-50">
                <NavigationMenuWithDropdown />
            </header>
        </>
    )
}
