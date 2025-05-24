'use client'
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Button from "../shared/Button"
import { Label } from "../ui/label"

export default function Searchbar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [search, setSearch] = useState(() => decodeURIComponent(searchParams.get('search') || ''))

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (search.trim()) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('search', encodeURIComponent(search.trim()));
            const url = `/products?${params.toString()}`;
            router.push(url);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center w-full max-w-md space-x-2 rounded-lg border border-gray-300 py-2 h-10">
            <Label htmlFor="search" className="m-0">
                <Button variant={'ghost'} type="submit">
                    <Search className="text-destructive" />
                </Button>
            </Label>
            <Input
                type="search"
                id="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="جست و جو کنید ..."
                className="w-full border-0 px-0 pr-1 text-sm md:text-base"
            />
        </form>
    )
}