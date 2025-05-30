'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Logo({ length, defaultTheme }: { length: number; defaultTheme?: 'dark' | 'light' }) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = defaultTheme ?? theme;

    // Render nothing on server to avoid mismatch
    if (!mounted) return null;

    const imageSrc = currentTheme === 'dark' ? '/img/logo-white.png' : '/img/logo.svg';

    return (
        <Link href="/">
            <Image
                width={4 * length}
                height={4 * length}
                src={imageSrc}
                alt="moolian perfume logo"
                className={`inset-0 object-cover w-${length} h-${length}`}
            />
        </Link>
    );
}
