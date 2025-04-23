'use client'
import React, { useRef } from 'react'
import { ThemeProvider } from '@/components/shared/theme-provider';
import { Provider } from "react-redux"
import { AppStore, makeStore } from '@/store/store';

export default function BaseProviders({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const storeRef = useRef<AppStore>(undefined)
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Provider store={storeRef.current}>
                {children}
            </Provider>
        </ThemeProvider >
    )
}
