import AdminOnly from "@/components/shared/AdminOnly";
import Button from '@/components/shared/Button';
import PushNotificationManager from '@/components/shared/Notification';
import { Undo } from 'lucide-react';
import Link from 'next/link';


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AdminOnly>
            <div className='m-5 max-w-5xl mx-auto px-5'>
                <PushNotificationManager />
                <Button asChild variant='outline' className='text-destructive hover:text-destructive hover:bg-destructive/10 border-dashed border-destructive'>
                    <Link href={'/'}>
                        <Undo />
                        بازگشت به خانه
                    </Link>
                </Button>
                {children}
            </div>
        </AdminOnly>
    );
}
