"use client"
import Email from "@/components/profile/Email"
import Password from "@/components/profile/Password"
import Specification from "@/components/profile/Specification"
import Transactions from "@/components/profile/Transactions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


const TABS = ["transactions", "specification", "email", "password"] as const;

export default function ProfilePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab");
    const initialTab = TABS.includes(tabParam as any) ? tabParam! : "transactions";
    const [tab, setTab] = useState(initialTab);

    useEffect(() => {
        if (tab !== initialTab) setTab(initialTab)
        // eslint-disable-next-line
    }, [tabParam]);

    const handleTabChange = (value: string) => {
        setTab(value);
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set("tab", value);
        router.replace(`?${params.toString()}`);
    };

    return (
        <div className='w-full max-w-xl mx-auto mt-5'>
            <Tabs className="w-full" value={tab} onValueChange={handleTabChange} dir="rtl">
                <TabsList>
                    <TabsTrigger value="transactions">سفارشات من</TabsTrigger>
                    <TabsTrigger value="specification">اطلاعات من</TabsTrigger>
                    <TabsTrigger value="email">فعال کردن ایمیل</TabsTrigger>
                    <TabsTrigger value="password">رمز عبور</TabsTrigger>
                </TabsList>
                <div className="border border-muted-foreground/50 rounded-lg w-full p-4">
                    <TabsContent value="specification">
                        <Specification />
                    </TabsContent>
                    <TabsContent value="transactions">
                        <Transactions />
                    </TabsContent>
                    <TabsContent value="email">
                        <Email />
                    </TabsContent>
                    <TabsContent value="password">
                        <Password />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}
