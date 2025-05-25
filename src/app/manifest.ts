import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Moolian Perfume',
        short_name: 'Moolian',
        description: 'Moolian Perfume Online Shop',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/img/logo192.jpg',
                sizes: '192x192',
                type: 'image/jpeg',
            },
            {
                src: '/img/logo512.jpg',
                sizes: '512x512',
                type: 'image/jpeg',
            }
        ],
    }
}