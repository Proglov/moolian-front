import React from 'react'
import { Carousel } from './Carousel';

function MainArticle({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className='flex justify-center'>
                <Carousel />
            </div>
            {children}
        </main>
    )
}

export default MainArticle