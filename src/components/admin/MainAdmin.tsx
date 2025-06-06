import Brands from '@/components/admin/brands/Brands';
import Comments from '@/components/admin/comments/Comments';
import Festivals from '@/components/admin/festivals/Festivals';
import Notes from '@/components/admin/notes/Notes';
import Products from '@/components/admin/products/Products'
import Transactions from '@/components/admin/transaction/Transactions';
import Users from '@/components/admin/users/Users';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MainAdmin() {
    return (
        <Tabs defaultValue="products" className='relative mt-2'>
            <TabsList dir='rtl' className='z-20 mb-3'>
                <TabsTrigger value="products">محصولات</TabsTrigger>
                <TabsTrigger value="users">کاربران</TabsTrigger>
                <TabsTrigger value="brands">برندها</TabsTrigger>
                <TabsTrigger value="notes">نوت ها</TabsTrigger>
                <TabsTrigger value="comments">کامنت ها</TabsTrigger>
                <TabsTrigger value="transactions">تراکنش ها</TabsTrigger>
                <TabsTrigger value="festivals">جشنواره ها</TabsTrigger>
            </TabsList>

            <div className='border-t-4 border-gray-300 w-full rounded-[100%] h-16 absolute top-4' />

            <TabsContent value="products"> <Products /> </TabsContent>
            <TabsContent value="users"> <Users /> </TabsContent>
            <TabsContent value="brands"> <Brands /> </TabsContent>
            <TabsContent value="notes"> <Notes /> </TabsContent>
            <TabsContent value="comments"> <Comments /> </TabsContent>
            <TabsContent value="transactions"> <Transactions /> </TabsContent>
            <TabsContent value="festivals"> <Festivals /> </TabsContent>
        </Tabs>
    )
}
