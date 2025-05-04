import Brands from '@/components/admin/brands/Brands';
import Notes from '@/components/admin/notes/Notes';
import Products from '@/components/admin/products/Products'
import Users from '@/components/admin/Users';
import Button from '@/components/shared/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Undo } from 'lucide-react';
import Link from 'next/link';



export default async function page() {
    return (
        <div className='m-5'>
            <Button asChild variant='secondary' className='text-destructive'>
                <Link href={'/'}>
                    <Undo />
                    بازگشت
                </Link>
            </Button>
            <Tabs defaultValue="products" className='max-w-5xl mx-auto relative'>
                <TabsList dir='rtl' className='z-20 mb-3'>
                    <TabsTrigger value="products">محصولات</TabsTrigger>
                    <TabsTrigger value="users">کاربران</TabsTrigger>
                    <TabsTrigger value="brands">برندها</TabsTrigger>
                    <TabsTrigger value="notes">نوت ها</TabsTrigger>
                </TabsList>

                <div className='border-t-4 border-gray-300 w-full rounded-[100%] h-16 absolute top-4' />

                <TabsContent value="products"> <Products /> </TabsContent>
                <TabsContent value="users"> <Users /> </TabsContent>
                <TabsContent value="brands"> <Brands /> </TabsContent>
                <TabsContent value="notes"> <Notes /> </TabsContent>
            </Tabs>

        </div>
    )
}
