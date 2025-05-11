import { NextRequest, NextResponse } from 'next/server';


//check the admin jwt
export async function middleware(request: NextRequest) {
    const cookieHeader = request.headers.get('cookie') || '';

    try {
        if (!cookieHeader.includes('Authentication=')) return NextResponse.redirect(new URL('/not-found', request.url));

        const response = await fetch('http://localhost:4500/users/admin', { headers: { Cookie: cookieHeader } });
        const isAdmin = await response.json();
        if (!isAdmin) return NextResponse.redirect(new URL('/not-found', request.url));

        return NextResponse.next();
    } catch (_error) {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }
}


export const config = {
    matcher: ['/admin/:path*'],
};