import { ThemeProvider } from '@/components/shared/theme-provider';
import React from 'react'

export default function BaseProviders({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider >
    )
}
