import Brands from '@/components/admin/brands/Brands';
import Products from '@/components/admin/Products'
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
            <Tabs defaultValue="products" className='max-w-5xl mx-auto'>
                <TabsList dir='rtl'>
                    <TabsTrigger value="products">محصولات</TabsTrigger>
                    <TabsTrigger value="users">کاربران</TabsTrigger>
                    <TabsTrigger value="brands">برندها</TabsTrigger>
                </TabsList>
                <TabsContent value="products"> <Products /> </TabsContent>
                <TabsContent value="users"> <Users /> </TabsContent>
                <TabsContent value="brands"> <Brands /> </TabsContent>
            </Tabs>

        </div>
    )
}
