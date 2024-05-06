import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/create-account' || path === '/sign-in' || path === '/'
  const token = request.cookies.get('next-auth.session-token')

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/docs', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/docs', '/docs/:path*', '/create-account', '/sign-in'],
}
