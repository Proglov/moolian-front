'use client'
import NavigationMenuWithDropdown from './Menu'
import { ModeToggle } from './toggle-theme'
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Header() {
    return (
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1 block md:hidden" />
            <ModeToggle />
            <NavigationMenuWithDropdown />
        </header>
    )
}
