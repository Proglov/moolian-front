import React from 'react'

function MainArticle({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            {children}
        </main>
    )
}

export default MainArticle