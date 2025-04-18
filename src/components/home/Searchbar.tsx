'use client'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Button from "../shared/Button"
import { Label } from "../ui/label"


export default function Searchbar() {
    return (
        <div className="flex items-center w-full max-w-md space-x-2 rounded-lg border border-gray-300 py-2 h-10">
            <Button variant={'ghost'} asChild>
                <Label htmlFor="search" className="m-0">
                    <Search className="text-destructive" />
                </Label>
            </Button>
            <Input type="search" id="search" placeholder="جست و جو کنید ..." className="w-full border-0 px-0 pr-1 text-sm md:text-base" />
        </div>
    )
}