import Products from '@/components/admin/Products'
import Users from '@/components/admin/Users';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



export default async function page() {

    return (
        <div className='m-5'>
            <Tabs defaultValue="products" className='max-w-5xl mx-auto'>
                <TabsList dir='rtl'>
                    <TabsTrigger value="products">محصولات</TabsTrigger>
                    <TabsTrigger value="users">کاربران</TabsTrigger>
                </TabsList>
                <TabsContent value="products">
                    <Products />
                </TabsContent>
                <TabsContent value="users">
                    <Users />
                </TabsContent>
            </Tabs>

        </div>
    )
}
