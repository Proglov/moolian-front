import React from 'react'
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from './Sidebar';
import Header from '../shared/Header';
import MainArticle from './MainArticle';
import Footer from '../shared/Footer';

function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar side="right" />
            <SidebarInset>
                <Header />
                <MainArticle>
                    {children}
                </MainArticle>
                <Footer />
            </SidebarInset>
        </SidebarProvider>
    )
}

export default HomeLayout