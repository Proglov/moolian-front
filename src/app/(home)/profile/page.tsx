import Specification from "@/components/profile/Specification"
import Transactions from "@/components/profile/Transactions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function page() {
    return (
        <div className='w-full max-w-xl mx-auto mt-5'>
            <Tabs className="w-full" defaultValue="transactions" dir="rtl">
                <TabsList>
                    <TabsTrigger value="specification">اطلاعات من</TabsTrigger>
                    <TabsTrigger value="transactions">سفارشات من</TabsTrigger>
                    <TabsTrigger value="password">رمز عبور</TabsTrigger>
                </TabsList>


                <div className="border border-muted-foreground/50 rounded-lg w-full p-1">

                    <TabsContent value="specification">
                        <Specification />
                    </TabsContent>

                    <TabsContent value="transactions">
                        <Transactions />
                    </TabsContent>

                    <TabsContent value="password">
                        hiii
                    </TabsContent>

                </div>
            </Tabs>

        </div>
    )
}
